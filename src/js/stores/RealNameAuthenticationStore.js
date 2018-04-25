var MicroEvent = require('../lib/microevent.js');
var appDispatcher=require('../dispatcher/dispatcher.js');
var ajax=require("../lib/ajax");
var cookie=require("../lib/cookie");

function identityCodeValid(code) {
    var city={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "};
    //var tip = "";
    var pass= true;

    if(!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)){
        // = "身份证号格式错误";
        pass = false;
    }

    else if(!city[code.substr(0,2)]){
        //tip = "地址编码错误";
        pass = false;
    }
    else{
        //18位身份证需要验证最后一位校验位
        if(code.length == 18){
            code = code.split('');
            //∑(ai×Wi)(mod 11)
            //加权因子
            var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
            //校验位
            var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
            var sum = 0;
            var ai = 0;
            var wi = 0;
            for (var i = 0; i < 17; i++)
            {
                ai = code[i];
                wi = factor[i];
                sum += ai * wi;
            }
            var last = parity[sum % 11];
            if(parity[sum % 11] != code[17]){
                //tip = "校验位错误";
                pass =false;
            }
        }
    }
    return pass;
};

var RealNameAuthenticationStore={
    _all:{
        realName:"",
        idCardNo:"",
        hadBindBankCard:false,
        hadSetDealPassword:false
    },
    checkForm(){
        let {
            realName,
            idCardNo
            }=this._all;
        let validationResult={
            success:true,
            msg:""
        };
        if(realName === ""){
            validationResult={
                success:false,
                msg:"姓名不能为空，请输入"
            }
        }else if(decodeURI(realName).length > 30){
            validationResult={
                success:false,
                msg:"姓名包含字符的个数不能超过30，请检查"
            }
        }else if(idCardNo === ""){
            validationResult={
                success:false,
                msg:"身份证不能为空，请输入"
            }
        }
        //可能用于身份证校验的函数缺乏准备性（测试号码：340111196910104539），所以将这个前端验证放开，交由后台来检验
        /*else if(!identityCodeValid(idCardNo)){
            validationResult={
                success:false,
                msg:"身份证有误，请检查"
            }
        }*/
        return validationResult;
    },
    getAll(){
        return this._all;
    },
    updateAll(source){
        this._all=Object.assign(this._all,source);
    }
};
MicroEvent.mixin(RealNameAuthenticationStore);


appDispatcher.register(function(payload){
    switch(payload.actionName){
        case "getInitialData_realNameAuthentication":
            ajax({
                ciUrl:"/user/v2/securityCenter",
                success(rs){
                    if(rs.code === 0){
                        RealNameAuthenticationStore.updateAll({
                            hadBindBankCard:rs.data.bankInfo.bankCardVerified === "yes" ? true : false,
                            hadSetDealPassword:rs.data.dealPassVerifyInfo.isDealPwdSet === "yes" ? true : false
                        })
                    }
                }
            });
            break;
        case "submitAuthenticationForm":
            RealNameAuthenticationStore.updateAll(payload.data);

            let validationResult=RealNameAuthenticationStore.checkForm();
            if(validationResult.success){
                let {
                    realName,
                    idCardNo
                    }=RealNameAuthenticationStore.getAll();
                ajax({
                    ciUrl:"/user/v2/secrurityRealNameAuthen",
                    data:{
                        realName:realName,
                        idCard:idCardNo
                    },
                    success(rs){
                        if(rs.code === 0){
                            RealNameAuthenticationStore.trigger("authenticateSuccess");
                        }else {
                            RealNameAuthenticationStore.trigger("authenticateFailed",rs.description);
                        }
                    }
                })
            }else {
                RealNameAuthenticationStore.trigger("authenticateFailed",validationResult.msg);
            }

            break;
        default:
        //no op
    }
});

module.exports=RealNameAuthenticationStore;
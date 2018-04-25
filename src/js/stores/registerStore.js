var MicroEvent = require('../lib/microevent.js');
var appDispatcher=require('../dispatcher/dispatcher.js');
var ajax=require("../lib/ajax.js");
var cookie=require("../lib/cookie.js");

var RegisterStore={
    _all:{
        inviterCode:""
    },
    registerCheck(data){
        let {
            password,
            verificationCode
            }=data;
        let validationResult={
            success:true,
            msg:""
        };
        let checkPassword_regexp=/^(?!^\d+$)(?!^[a-zA-Z]+$)[0-9a-zA-Z]{6,16}$/;//登录密码和交易密码共用同一个正则表达式来验证
        if(verificationCode === ""){
            validationResult={
                success:false,
                msg:"验证码不能为空，请填写"
            }
        }else if(password === ""){
            validationResult={
                success:false,
                msg:"登录密码不能为空，请填写"
            }
        }else if (password.length < 6){
            validationResult={
                success:false,
                msg:"密码至少设置6位"
            }
        }else if(!checkPassword_regexp.test(password)){
            validationResult={
                success:false,
                msg:"密码必须是字母和数字组合"
            }
        }

        return validationResult;
    },
    setInviterCode(inviterCode){
        this._all.inviterCode=inviterCode;
    },
    getInviterCode(){
        return this._all.inviterCode;
    },
    clearAll(){
        this._all.inviterCode="";
    }

};
MicroEvent.mixin(RegisterStore);


appDispatcher.register(function(payload){
    switch(payload.actionName){
        case "askForShowInviteEntry_register":
            ajax({
                ciUrl:"/user/v2/validatePageUrl",
                data:{
                    ntjrSource:payload.data.ntjrSource
                },
                success:function(rs){
                    if(rs.code === 0 && rs.data && rs.data.isAbleWriteCode === "no"){
                        RegisterStore.trigger("shutdownTheInviteCodeEntry");
                    }
                }
            });
            break;
        case "register":
            let {
                password,
                phoneNo,
                verificationCode
                }=payload.data;
            let registerCheckoutResult=RegisterStore.registerCheck(payload.data);
            if(registerCheckoutResult.success){
                let postData={
                    accountName:phoneNo,
                    onePwd:password,
                    phone:phoneNo,
                    verifyCode:verificationCode
                };
                let inviterCode=RegisterStore.getInviterCode();
                let ntjrSource=sessionStorage.getItem("ntjrSource");
                inviterCode && (postData.inventCode=inviterCode);//如果用户填写了邀请人手机号码，则提交该字段
                ntjrSource && (postData.ntjrSource=ntjrSource);//如果访问来自于第三方，则提交“ntjrSource”字段
                ajax({
                    ciUrl:"/user/v2/userRegister",
                    data:postData,
                    success:function(rs){
                        if(rs.code === 0){
                            cookie.setCookie("phoneNo",phoneNo,180);
                            cookie.setCookie("token",rs.data.token,180);
                            RegisterStore.trigger("registerSuccess");
                        }else {
                            RegisterStore.trigger("registerFailed",rs.description);
                        }
                    }
                })

            }else {
                RegisterStore.trigger("registerFailed",registerCheckoutResult.msg);
            }
            break;
        case "fillInviterCodeFinished":
            RegisterStore.setInviterCode(payload.data.inviterCode);
            break;
        case "changeInviterCode":
            RegisterStore.setInviterCode(payload.data.inviterCode);
            RegisterStore.trigger("inviterCodeChange");
            break;
        default:
        //no op
    }
});

module.exports=RegisterStore;
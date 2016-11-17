var MicroEvent = require('../lib/microevent.js');
var appDispatcher=require('../dispatcher/dispatcher.js');
var ajax=require("../lib/ajax.js");
var cookie=require("../lib/cookie.js");

var OpenZhongJinShortcutStore={
    _all:{
        id:"",//银行卡id
        bankName:"----银行",
        cardno:"**** **** **** ****",
        fullCardNo:"",
        shortIcon:"",
        verifyCode:""
    },
    checkForm(){
        let validationResult={
            success:true,
            msg:""
        };
        let {
            verifyCode,
            bindNo,
            token
            }=this._all;
        if(verifyCode === ""){
            validationResult={
                success:false,
                msg:"验证码不能为空，请输入"
            }
        }else if(bindNo === "" || token === ""){
            validationResult={
                success:false,
                msg:"验证码错误或者过期，请重新获取"
            }
        }
        return validationResult;
    },
    getAll(){
        return this._all;
    },
    updateAll(source){
        Object.assign(this._all,source)
    }
};
MicroEvent.mixin(OpenZhongJinShortcutStore);


appDispatcher.register(function(payload){
    switch(payload.actionName){
        case "getInitialData_OpenZhongJinShortcut":
            ajax({
                ciUrl:"/user/v2/myBankCardInfo",
                success(rs){
                    if(rs.code === 0){
                        OpenZhongJinShortcutStore.updateAll(rs.data);
                        OpenZhongJinShortcutStore.trigger("change");
                    }
                }
            });
            break;
        case "openZhongJinShortcutPay":
            OpenZhongJinShortcutStore.updateAll({
                verifyCode:payload.data.verificationCode,
                bindNo:cookie.getCookie("bindNo_zhongjinShortcut"),
                token:cookie.getCookie("token_zhongjinShortcut")
            });
            let validationResult=OpenZhongJinShortcutStore.checkForm();
            if(validationResult.success){
                let {
                    fullCardNo,
                    id,
                    bindNo,
                    token,
                    verifyCode,
                    }=OpenZhongJinShortcutStore.getAll();
                ajax({
                    ciUrl:"/user/v2/zxkj",
                    data:{
                        bindNo:bindNo,
                        token:token,
                        verifyCode:verifyCode,
                        cardNo:fullCardNo,
                        bankCardId:id
                    },
                    success(rs){
                        if(rs.code === 0){
                            OpenZhongJinShortcutStore.trigger("openZhongJinShortcutSuccess");
                        }else {
                            OpenZhongJinShortcutStore.trigger("openZhongJinShortcutFailed",rs.description);
                        }
                    }
                });
            }else {
                OpenZhongJinShortcutStore.trigger("submitFormCheckFailed",validationResult.msg);
            }
            break;
        default:
        //no op
    }
});

module.exports=OpenZhongJinShortcutStore;
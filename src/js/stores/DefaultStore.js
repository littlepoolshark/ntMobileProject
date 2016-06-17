var MicroEvent = require('../lib/microevent.js');
var appDispatcher=require('../dispatcher/dispatcher.js');
//var superAgent=require("superagent");
var ajax=require("../lib/ajax.js");

var DefaultStore={
    loginCheck(account,password){
        let validationResult={
            success:true,
            msg:""
        }
        if(account === "" || password == ""){
            validationResult={
                success:false,
                msg:"账号或者密码不能为空，请填写！"
            }
        }else if(!this.phoneNoFormatCheck()){
            validationResult={
                success:false,
                msg:"手机号码格式不对，请检查！"
            }
        } else if(account !== "13682330541" || password !== "123456") {
            validationResult={
                success:false,
                msg:"账号或者密码不正确!"
            }
        }
        return validationResult;
    },
    phoneNoFormatCheck(phoneNo){
        return /^(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$/i.test(phoneNo);
    },
    getVerificationCodeCheck(phoneNo){
        let validationResult={
            success:true,
            msg:""
        }
        if(phoneNo === ""){
            validationResult={
                success:false,
                msg:"手机号码不能为空，请填写"
            }
        }else if(!this.phoneNoFormatCheck(phoneNo)){
            validationResult={
                success:false,
                msg:"手机号码格式不正确，请检查"
            }
        }
        return validationResult;
    }

};
MicroEvent.mixin(DefaultStore);


appDispatcher.register(function(payload){
    switch(payload.actionName){
        case "login":
            let loginCheckResult=DefaultStore.loginCheck(payload.data.account,payload.data.password);
            if(loginCheckResult.success){
                ajax({
                    method:"GET",
                    url:"/mock/login.json",
                    success:function(rs){
                        if(rs.success){
                            DefaultStore.trigger("loginSuccess");
                        }else {
                            DefaultStore.trigger("loginFailed",rs.msg);
                        }
                    }
                })
            }else {
                DefaultStore.trigger("loginFailed",loginCheckResult.msg);
            }

            break;
        case "getVerificationCode" :
            let getVerificationCodeCheckResult=DefaultStore.getVerificationCodeCheck(payload.data.phoneNo);
            console.log(getVerificationCodeCheckResult);
            if(getVerificationCodeCheckResult.success){
                console.log("into if");
                DefaultStore.trigger("getVerificationCodeCheckSuccess",payload.data.phoneNo);
            }else {
                DefaultStore.trigger("getVerificationCodeCheckFailed",getVerificationCodeCheckResult.msg);
            }
            break;
        default:
        //no op
    }
});

module.exports=DefaultStore;
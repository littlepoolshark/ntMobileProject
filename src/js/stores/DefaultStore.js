var MicroEvent = require('../lib/microevent.js');
var appDispatcher=require('../dispatcher/dispatcher.js');
var ajax=require("../lib/ajax.js");
var cookie=require("../lib/cookie.js");

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
        }else if(!this.phoneNoFormatCheck(account)){
            validationResult={
                success:false,
                msg:"手机号码格式不对，请检查！"
            }
        }/* else if(account !== "13682330541" || password !== "123456") {
            validationResult={
                success:false,
                msg:"账号或者密码不正确!"
            }
        }*/
        return validationResult;
    },
    phoneNoFormatCheck(phoneNo){
        return (/^(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$/i).test(phoneNo);
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
            let {
                account,
                password
                }=payload.data;
            let loginCheckResult=DefaultStore.loginCheck(account,password);
            if(loginCheckResult.success){
                ajax({
                    ciUrl:"/user/v2/userLogin",
                    data:{
                        accountName:account,
                        password:password
                    },
                    success:function(rs){
                        if(rs.code === 0){
                            cookie.setCookie("token",rs.data.token,59);//用户的登录状态设置为59分钟
                            DefaultStore.trigger("loginSuccess");
                        }else {
                            DefaultStore.trigger("loginFailed","登录失败！"+rs.description);
                        }
                    }
                })
            }else {
                DefaultStore.trigger("loginFailed",loginCheckResult.msg);
            }

            break;
        case "logout" :
            ajax({
                ciUrl:"/user/v2/userLogout",
                success:function(rs){
                    if(rs.code === 0){
                        cookie.setCookie("token","");
                        DefaultStore.trigger("logoutSuccess");
                    }else {
                        DefaultStore.trigger("logoutFailed","退出失败！"+rs.description);
                    }
                }
            })
            break;
        case "getVerificationCode" :
            let getVerificationCodeCheckResult=DefaultStore.getVerificationCodeCheck(payload.data.phoneNo);
            if(getVerificationCodeCheckResult.success){
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
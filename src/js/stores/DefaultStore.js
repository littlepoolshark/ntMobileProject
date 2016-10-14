var MicroEvent = require('../lib/microevent.js');
var appDispatcher=require('../dispatcher/dispatcher.js');
var ajax=require("../lib/ajax.js");
var cookie=require("../lib/cookie.js");

var DefaultStore={
    _all:{
        loginPhoneNo:"",//登录时的手机号码
        loginPassword:"",//登录时的登录密码
        registerPhoneNo:"",//注册时的手机号码
        isAgreement:true//是否同意注册协议
    },
    loginCheck(account,password){
        let validationResult={
            success:true,
            msg:""
        }
        if(account === "" || password == ""){
            validationResult={
                success:false,
                msg:"账号或者密码不能为空，请输入！"
            }
        }else if(!this.phoneNoFormatCheck(account)){
            validationResult={
                success:false,
                msg:"手机号码格式不对，请检查！"
            }
        }
        return validationResult;
    },
    phoneNoFormatCheck(phoneNo){
        return (/1\d{10}$/i).test(phoneNo);
    },
    getVerificationCodeCheck(){
        let phoneNo=this._all.registerPhoneNo;
        let isAgreement=this._all.isAgreement;
        let validationResult={
            success:true,
            msg:""
        }
        if(phoneNo === ""){
            validationResult={
                success:false,
                msg:"手机号码不能为空，请输入"
            }
        }else if(!this.phoneNoFormatCheck(phoneNo)){
            validationResult={
                success:false,
                msg:"手机号码格式不正确，请检查"
            }
        }else if(!isAgreement){
            validationResult={
                success:false,
                msg:"请同意注册服务协议"
            }
        }
        return validationResult;
    },
    getAll(){
        return this._all;
    },
    updateAll(source){
        Object.assign(this._all,source);
    },
    clearAll(){
        //当组件卸载的时候，清除密码变量的值，以此来防止浏览器记住密码
        this._all.loginPassword="";
    }

};
MicroEvent.mixin(DefaultStore);


appDispatcher.register(function(payload){
    switch(payload.actionName){
        case "accountChange_login":
            DefaultStore.updateAll({
                loginPhoneNo:payload.data.account
            });
            DefaultStore.trigger("change");
            break;
        case "passwordChange_login":
            DefaultStore.updateAll({
                loginPassword:payload.data.password
            });
            DefaultStore.trigger("change");
            break;
        case "accountChange_register":
            DefaultStore.updateAll({
                registerPhoneNo:payload.data.account
            });
            DefaultStore.trigger("change");
            break;
        case "login":
            let {
                loginPhoneNo,
                loginPassword
                }=DefaultStore.getAll();
            let loginCheckResult=DefaultStore.loginCheck(loginPhoneNo,loginPassword);
            if(loginCheckResult.success){
                ajax({
                    ciUrl:"/user/v2/userLogin",
                    data:{
                        accountName:loginPhoneNo,
                        password:loginPassword
                    },
                    success:function(rs){
                        if(rs.code === 0){
                            cookie.setCookie("token",rs.data.token,59);//用户的登录状态有效时长设置为59分钟
                            cookie.setCookie("phoneNo",loginPhoneNo);//将用户的手机号码设置到cookie,以备将来使用
                            DefaultStore.trigger("loginSuccess");
                        }else {
                            if(rs.description.indexOf("10") > -1){//登录错误超10次，后台返回的信息过长。前端针对此定制了一下
                                rs.description="登录错误超10次,请找回密码再试!";
                            }
                            DefaultStore.trigger("loginFailed",rs.description);
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
            let registerPhoneNo=DefaultStore.getAll().registerPhoneNo;
            let getVerificationCodeCheckResult=DefaultStore.getVerificationCodeCheck();
            if(getVerificationCodeCheckResult.success){
                ajax({
                    ciUrl:"/platinfo/v2/getVerifyCode",
                    data:{
                        phone:registerPhoneNo,
                        type:1//验证码类型：1: 注册，2：找回登录密码 3:找回交易密码 4:绑定银行卡 5：删除银行卡
                    },
                    success:function(rs){
                        if(rs.code === 0){//发送验证码成功
                            DefaultStore.trigger("getVerificationCodeCheckSuccess",registerPhoneNo);
                            cookie.setCookie("tempUserId",rs.data.userId,59);//将临时userid设置到cookie中，供需要该字段的接口使用
                        }else {//发送验证码失败
                            DefaultStore.trigger("getVerificationCodeCheckFailed",rs.description);
                        }
                    }
                })
            }else {
                DefaultStore.trigger("getVerificationCodeCheckFailed",getVerificationCodeCheckResult.msg);
            }
            break;
        case "toggleAgreementOfProtocol":
            DefaultStore.updateAll({
                isAgreement:payload.data.isAgreement
            });
            break;
        default:
        //no op
    }
});

module.exports=DefaultStore;
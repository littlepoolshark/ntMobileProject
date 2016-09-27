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
        }
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
        }else if(password.length < 6 || password.length > 20){
            validationResult={
                success:false,
                msg:"登录密码的格式不对，请检查"
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
                inviterCode && (postData.inventCode=inviterCode);//如果用户填写了邀请人手机号码，则提交该字段
                ajax({
                    ciUrl:"/user/v2/userRegister",
                    data:postData,
                    success:function(rs){
                        if(rs.code === 0){
                            cookie.setCookie("token",rs.data.token,59);
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
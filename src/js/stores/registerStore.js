var MicroEvent = require('../lib/microevent.js');
var appDispatcher=require('../dispatcher/dispatcher.js');
var ajax=require("../lib/ajax.js");

var RegisterStore={
    _all:{},
    passwordCheck(password){
        let validationResult={
            success:true,
            msg:""
        }
        if(password === ""){
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
            let passwordCheckoutResult=RegisterStore.passwordCheck(password);
            if(passwordCheckoutResult.success){
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
                            RegisterStore.trigger("registerSuccess");
                        }else {
                            RegisterStore.trigger("registerFailed","注册失败！");
                        }
                    }
                })

            }else {
                RegisterStore.trigger("registerFailed",passwordCheckoutResult.msg);
            }
            break;
        case "fillInviterCodeFinished":
            RegisterStore.setInviterCode(payload.data.inviterCode);
            break;
        default:
        //no op
    }
});

module.exports=RegisterStore;
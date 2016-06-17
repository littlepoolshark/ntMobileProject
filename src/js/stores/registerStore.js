var MicroEvent = require('../lib/microevent.js');
var appDispatcher=require('../dispatcher/dispatcher.js');
//var superAgent=require("superagent");
var ajax=require("../lib/ajax.js");

var RegisterStore={
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
    }

};
MicroEvent.mixin(RegisterStore);


appDispatcher.register(function(payload){
    switch(payload.actionName){
        case "register":
            let passwordCheckoutResult=RegisterStore.passwordCheck(payload.data.password);
            if(passwordCheckoutResult.success){
                RegisterStore.trigger("registerSuccess");
            }else {
                RegisterStore.trigger("registerFailed",passwordCheckoutResult.msg);
            }
            break;
        default:
        //no op
    }
});

module.exports=RegisterStore;
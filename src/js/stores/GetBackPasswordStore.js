var MicroEvent = require('../lib/microevent.js');
var appDispatcher=require('../dispatcher/dispatcher.js');
var ajax=require("../lib/ajax.js");

var GetBackPasswordStore={
    checkVerificationCode(verificationCode,idCardNo){
       let validationResult={
           success:true,
           msg:""
       };
       if(verificationCode === ""){
           validationResult={
               success:false,
               msg:"验证码不能为空，请输入！"
           }
       }else if(idCardNo.length !== 4){
           validationResult={
               success:false,
               msg:"请输入身份证末4位！"
           }
       }

       return  validationResult;
    }

};
MicroEvent.mixin(GetBackPasswordStore);


appDispatcher.register(function(payload){
    switch(payload.actionName){
        case "submitVerificationCode":
            let validationResult=GetBackPasswordStore.checkVerificationCode(payload.data.verificationCode,payload.data.idCardNo);
            if(validationResult.success){
                ajax({
                    method:"GET",
                    url:"/mock/submitVerificationCode.json",
                    success:function(rs){
                        if(rs.success){
                            GetBackPasswordStore.trigger("submitSuccess");
                        }else {
                            GetBackPasswordStore.trigger("submitFailed",rs.msg);
                        }
                    }
                })
            }else {
                GetBackPasswordStore.trigger("submitFailed",validationResult.msg);
            }

            break;
        default:
        //no op
    }
});

module.exports=GetBackPasswordStore;
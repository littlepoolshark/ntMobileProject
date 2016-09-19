var MicroEvent = require('../lib/microevent.js');
var appDispatcher=require('../dispatcher/dispatcher.js');
var ajax=require("../lib/ajax");
var cookie=require("../lib/cookie");

var GetBackPasswordStore={
    checkVerificationCode(phoneNo,verificationCode,idCardNo){
       let validationResult={
           success:true,
           msg:""
       };
       if(phoneNo === ""){
           validationResult={
               success:false,
               msg:"手机号码不能为空，请输入！"
           }
       } else if(verificationCode === ""){
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
            let VerificationCodeCheck=GetBackPasswordStore.checkVerificationCode(payload.data.phoneNo,payload.data.verificationCode,payload.data.idCardNo);
            if(VerificationCodeCheck.success){
                ajax({
                    ciUrl:"/platinfo/v2/getPwdBackCheck",
                    data:{
                        userId:cookie.getCookie("tempUserId"),
                        verifyCode:payload.data.verificationCode,
                        idcardNum:payload.data.idCardNo,
                        phone:payload.data.phoneNo
                    },
                    success:function(rs){
                        if(rs.code === 0){
                            GetBackPasswordStore.trigger("VerificationCodeCheckSuccess",payload.data.verificationCode);
                        }else {
                            GetBackPasswordStore.trigger("VerificationCodeCheckFailed",rs.description);
                        }
                    }
                })
            }else {
                GetBackPasswordStore.trigger("submitFailed",VerificationCodeCheck.msg);
            }

            break;
        default:
        //no op
    }
});

module.exports=GetBackPasswordStore;
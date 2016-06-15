var appDispatcher=require("../dispatcher/dispatcher.js");

var GetBackPasswordAction={
    submitVerificationCode (verificationCode,idCardNo){
        appDispatcher.dispatch({
            actionName:"submitVerificationCode",
            data:{
                verificationCode:verificationCode,
                idCardNo:idCardNo
            }
        })

    }
};

module.exports=GetBackPasswordAction;
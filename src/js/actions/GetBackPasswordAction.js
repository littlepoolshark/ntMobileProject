var appDispatcher=require("../dispatcher/dispatcher.js");

var GetBackPasswordAction={
    submitVerificationCode (verificationCode,idCardNo,phoneNo){
        appDispatcher.dispatch({
            actionName:"submitVerificationCode",
            data:{
                verificationCode:verificationCode,
                idCardNo:idCardNo,
                phoneNo:phoneNo
            }
        })

    }
};

module.exports=GetBackPasswordAction;
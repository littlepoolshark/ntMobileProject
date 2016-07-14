var appDispatcher=require("../dispatcher/dispatcher.js");

var SetNewPasswordAction={
    submitNewPassword (newPassword,confirmNewPassword,verificationCode){
        appDispatcher.dispatch({
            actionName:"submitNewPassword",
            data:{
                newPassword:newPassword,
                confirmNewPassword:confirmNewPassword,
                verificationCode:verificationCode
            }
        })

    }
};

module.exports=SetNewPasswordAction;
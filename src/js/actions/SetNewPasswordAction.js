var appDispatcher=require("../dispatcher/dispatcher.js");

var SetNewPasswordAction={
    submitNewPassword (newPassword,confirmNewPassword){
        appDispatcher.dispatch({
            actionName:"submitNewPassword",
            data:{
                newPassword:newPassword,
                confirmNewPassword:confirmNewPassword
            }
        })

    }
};

module.exports=SetNewPasswordAction;
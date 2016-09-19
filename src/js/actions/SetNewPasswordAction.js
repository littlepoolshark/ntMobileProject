var appDispatcher=require("../dispatcher/dispatcher.js");

var SetNewPasswordAction={
    submitLoginPasswordForSetting (newLoginPassword,confirmLoginPassword,verificationCode){
        appDispatcher.dispatch({
            actionName:"submitLoginPassword_setting",
            data:{
                newLoginPassword:newLoginPassword,
                confirmLoginPassword:confirmLoginPassword,
                verificationCode:verificationCode
            }
        })
    },
    submitLoginPasswordForModify(originLoginPassword,newLoginPassword,confirmLoginPassword){
        appDispatcher.dispatch({
            actionName:"submitLoginPassword_modify",
            data:{
                originLoginPassword:originLoginPassword,
                newLoginPassword:newLoginPassword,
                confirmLoginPassword:confirmLoginPassword
            }
        })
    }
};

module.exports=SetNewPasswordAction;
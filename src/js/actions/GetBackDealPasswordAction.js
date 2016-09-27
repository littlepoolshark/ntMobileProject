var appDispatcher=require("../dispatcher/dispatcher.js");

var GetBackDealPasswordAction={
    submitForm (verificationCode,newDealPassword,confirmDealPassword){
        appDispatcher.dispatch({
            actionName:"submitGetBackDealPasswordForm",
            data:{
                verificationCode:verificationCode,
                newDealPassword:newDealPassword,
                confirmDealPassword:confirmDealPassword
            }
        })
    }
};

module.exports=GetBackDealPasswordAction;
var appDispatcher=require("../dispatcher/dispatcher.js");

var DeleteBankCardConfirmAction={
    confirmToDelete (bankCardId,verificationCode){
        appDispatcher.dispatch({
            actionName:"submitDeleteBankCardForm",
            data:{
                bankCardId:bankCardId,
                verificationCode:verificationCode
            }
        })

    }
};

module.exports=DeleteBankCardConfirmAction;
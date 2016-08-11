var appDispatcher=require("../dispatcher/dispatcher.js");

var BindBankCardAction={
    getUserNameFromLocation(userName){
        appDispatcher.dispatch({
            actionName:"getUserNameFromLocation",
            data:{
                userName:userName
            }
        })
    },
    selectBankCard(bankId,bankName){
        appDispatcher.dispatch({
            actionName:"selectbankCard",
            data:{
                bankId:bankId,
                bankName:bankName
            }
        })
    },
    submitBankCardForm(cardNo){
        appDispatcher.dispatch({
            actionName:"submitBankCardForm",
            data:{
                cardNo:cardNo
            }
        })
    }
};

module.exports=BindBankCardAction;
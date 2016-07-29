var appDispatcher=require("../dispatcher/dispatcher.js");

var BindBankCardAction={
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
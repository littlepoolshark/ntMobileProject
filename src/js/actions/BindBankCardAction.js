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
    changeCardNo(cardNo){
        appDispatcher.dispatch({
            actionName:"changeCardNo_bindBankCard",
            data:{
                cardNo:cardNo
            }
        })
    },
    submitBankCardForm(){
        appDispatcher.dispatch({
            actionName:"submitBankCardForm"
        })
    }
};

module.exports=BindBankCardAction;
var appDispatcher=require("../dispatcher/dispatcher.js");

var BindBankCardAction={
    getInitialDataFromLocation(queryData){
        appDispatcher.dispatch({
            actionName:"getInitialDataFromLocation_bindBankCard",
            data:queryData
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
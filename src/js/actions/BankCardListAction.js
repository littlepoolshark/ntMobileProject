var appDispatcher=require("../dispatcher/dispatcher.js");

var BankCardListAction={
    getBankCardListFormServer(){
        appDispatcher.dispatch({
            actionName:"getBankCardListFormServer"
        })
    }
};

module.exports=BankCardListAction;
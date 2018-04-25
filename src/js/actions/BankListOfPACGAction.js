var appDispatcher=require("../dispatcher/dispatcher.js");

var BankListOfPACGAction={
    getBankListOfPACGFormServer(){
        appDispatcher.dispatch({
            actionName:"getBankListFormServer_blopacg"
        })
    }
};

module.exports=BankListOfPACGAction;
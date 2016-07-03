var appDispatcher=require("../dispatcher/dispatcher.js");

var InvestmentRecordAction={
    loadNextPage(){
        appDispatcher.dispatch({
            actionName:"loadNextPage"
        })
    },
    clearAll(){
        appDispatcher.dispatch({
            actionName:"clearAllStoreData"
        })
    }
};

module.exports=InvestmentRecordAction;
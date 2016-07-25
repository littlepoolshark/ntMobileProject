var appDispatcher=require("../dispatcher/dispatcher.js");

var InvestmentRecordAction={
    loadNextPage(type,productId){
        appDispatcher.dispatch({
            actionName:"loadNextPage_"+type,
            data:{
                type:type,
                productId:productId
            }
        })
    },
    clearAll(){
        appDispatcher.dispatch({
            actionName:"clearAllStoreData"
        })
    }
};

module.exports=InvestmentRecordAction;
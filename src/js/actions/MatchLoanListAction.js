var appDispatcher=require("../dispatcher/dispatcher.js");

var MatchLoanListAction={
    getInitialData(purchaseId,productType){
        appDispatcher.dispatch({
            actionName:"getInitialData_matchLoanList",
            data:{
                purchaseId,
                productType
            }
        })
    }
};

module.exports=MatchLoanListAction;
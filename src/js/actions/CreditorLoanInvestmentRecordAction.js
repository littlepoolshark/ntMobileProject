var appDispatcher=require("../dispatcher/dispatcher.js");

var CreditorLoanInvestmentRecordAction={
    getInitialData(){
        appDispatcher.dispatch({
            actionName:"getInitialData_creditorLoanInvestmentRecord"
        })
    },
    getNextPage(currListType){
        appDispatcher.dispatch({
            actionName:"getNextPage_creditorLoanInvestmentRecord",
            data:{
                currListType:currListType
            }
        })
    }
};

module.exports=CreditorLoanInvestmentRecordAction;
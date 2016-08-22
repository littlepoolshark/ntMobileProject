var appDispatcher=require("../dispatcher/dispatcher.js");

var FixedLoanInvestmentRecordAction={
    getInitialData(){
        appDispatcher.dispatch({
            actionName:"getInitialData_fixedLoanInvestmentRecord"
        })
    },
    getNextPage(currListType){
        appDispatcher.dispatch({
            actionName:"getNextPage_fixedLoanInvestmentRecord",
            data:{
                currListType:currListType
            }
        })
    }
};

module.exports=FixedLoanInvestmentRecordAction;
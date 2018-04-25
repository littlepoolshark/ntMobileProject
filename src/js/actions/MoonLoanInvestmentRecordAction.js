var appDispatcher=require("../dispatcher/dispatcher.js");

var MoonLoanInvestmentRecordAction={
    getInitialData(){
        appDispatcher.dispatch({
            actionName:"moonLoanInvestmentRecord_getInitialData"
        })
    },
    getNextPage(currListType){
        appDispatcher.dispatch({
            actionName:"moonLoanInvestmentRecord_getNextPage",
            data:{
                currListType:currListType
            }
        })
    }
};

module.exports=MoonLoanInvestmentRecordAction;
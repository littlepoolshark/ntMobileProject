var appDispatcher=require("../dispatcher/dispatcher.js");

var DailyEarnInvestmentRecordAction={
    getInitialData(){
        appDispatcher.dispatch({
            actionName:"dailyEarnInvestmentRecord_getFirstPage"
        })
    },
    getNextPage(currListType){
        appDispatcher.dispatch({
            actionName:"dailyEarnInvestmentRecord_getNextPage",
            data:{
                currListType:currListType
            }
        })
    }
};

module.exports=DailyEarnInvestmentRecordAction;
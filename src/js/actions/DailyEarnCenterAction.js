var appDispatcher=require("../dispatcher/dispatcher.js");

var DailyEarnCenterAction={
    getDailyEarnCenterInfo(){
        appDispatcher.dispatch({
            actionName:"getDailyEarnCenterInfo"
        })
    },
    extractDailyEarnIncome(){
        appDispatcher.dispatch({
            actionName:"extractDailyEarnIncome"
        })
    }
};

module.exports=DailyEarnCenterAction;
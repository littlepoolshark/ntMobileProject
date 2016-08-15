var appDispatcher=require("../dispatcher/dispatcher.js");

var DailyEarnRollOutAction={
    getDailyEarnRollOutInfo(){
        appDispatcher.dispatch({
            actionName:"getDailyEarnRollOutInfo"
        })
    },
    changeRollOutAmount(rollOutAmount){
        appDispatcher.dispatch({
            actionName:"rollOutAmountChange",
            data:{
                rollOutAmount:rollOutAmount
            }
        })
    },
    rollOutDailyEarn(){
        appDispatcher.dispatch({
            actionName:"rollOutDailyEarn"
        })
    }
};

module.exports=DailyEarnRollOutAction;
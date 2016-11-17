var appDispatcher=require("../dispatcher/dispatcher.js");

var Double11Action={
    getInitialData(){
        appDispatcher.dispatch({
            actionName:"getInitialData_double11"
        })
    },
    getInterestReward(){
        appDispatcher.dispatch({
            actionName:"getInterestReward_double11"
        })
    },
    updateBroadcastList(){
        appDispatcher.dispatch({
            actionName:"updateBroadcastList_double11"
        })
    }
};

module.exports=Double11Action;
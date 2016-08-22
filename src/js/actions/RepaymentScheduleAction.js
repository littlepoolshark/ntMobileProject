var appDispatcher=require("../dispatcher/dispatcher.js");

var RepaymentScheduleAction={
    getRepaymentScheduleData(){
        appDispatcher.dispatch({
            actionName:"getRepaymentScheduleData"
        })
    }
};

module.exports=RepaymentScheduleAction;
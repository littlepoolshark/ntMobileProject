var appDispatcher=require("../dispatcher/dispatcher.js");

var RepaymentScheduleAction={
    getRepaymentScheduleData(loanId,creditorId){
        appDispatcher.dispatch({
            actionName:"getRepaymentScheduleData",
            data:{
                loanId:loanId,
                creditorId:creditorId
            }
        })
    }
};

module.exports=RepaymentScheduleAction;
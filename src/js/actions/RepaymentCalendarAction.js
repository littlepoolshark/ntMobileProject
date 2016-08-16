var appDispatcher=require("../dispatcher/dispatcher.js");

var RepaymentCalendarAction={
    getInitialDashboardData(){
        appDispatcher.dispatch({
            actionName:"getInitialDashboardData_repaymentCalendar"
        })
    },
    getRepaymentDetailList(time){
        appDispatcher.dispatch({
            actionName:"getRepaymentDetailList_repaymentCalendar",
            data:{
                time:time
            }
        })
    }
};

module.exports=RepaymentCalendarAction;
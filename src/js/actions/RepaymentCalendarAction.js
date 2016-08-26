var appDispatcher=require("../dispatcher/dispatcher.js");

var RepaymentCalendarAction={
    getDatePickerCellList(monthTime){
        appDispatcher.dispatch({
            actionName:"getDatePickerCellList",
            data:{
                monthTime:monthTime
            }
        })
    },
    getRepaymentDashboardData(){
        appDispatcher.dispatch({
            actionName:"getRepaymentDashboardData_repaymentCalendar",
        })
    },
    selectDate(date){
        appDispatcher.dispatch({
            actionName:"selectDate_repaymentCalendar",
            data:{
                date:date
            }
        })
    }
};

module.exports=RepaymentCalendarAction;
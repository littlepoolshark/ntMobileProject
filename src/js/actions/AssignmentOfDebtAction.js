var appDispatcher=require("../dispatcher/dispatcher.js");

var AssignmentOfDebtAction={
    getCreditorLoanData(creditorId){
        appDispatcher.dispatch({
            actionName:"getCreditorLoanData_assignmentOfDebt",
            data:{
                creditorId:creditorId
            }
        });
    },
    submitDebtAssignmentForm(dealPassword){
        appDispatcher.dispatch({
            actionName:"submitDebtAssignmentForm",
            data:{
                dealPassword:dealPassword
            }
        });
    }
};

module.exports=AssignmentOfDebtAction;
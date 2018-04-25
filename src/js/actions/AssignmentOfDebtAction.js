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
    submitDebtAssignmentForm(){
        appDispatcher.dispatch({
            actionName:"submitDebtAssignmentForm"
        });
    },
    assignAgreement(){
        appDispatcher.dispatch({
            actionName:"assignAgreement_aod"
        });
    },
    changeDealPassword(dealPassword){
        appDispatcher.dispatch({
            actionName:"changeDealPassword_aod",
            data:{
                dealPassword
            }
        });
    }
};

module.exports=AssignmentOfDebtAction;
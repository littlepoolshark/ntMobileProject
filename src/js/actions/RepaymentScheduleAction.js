var appDispatcher=require("../dispatcher/dispatcher.js");

var RepaymentScheduleAction={
    getRepaymentScheduleData(loanId,creditorId,productType){
        appDispatcher.dispatch({
            actionName:"getRepaymentScheduleData",
            data:{
                loanId:loanId,
                creditorId:creditorId,
                productType:productType
            }
        })
    },
    getOpenPACGInfo(){
        appDispatcher.dispatch({
            actionName:"getOpenPACGInfo_rs"
        })
    },
    transferDebtCheck(){
        appDispatcher.dispatch({
            actionName:"transferDebtCheck_rs"
        })
    }
};

module.exports=RepaymentScheduleAction;
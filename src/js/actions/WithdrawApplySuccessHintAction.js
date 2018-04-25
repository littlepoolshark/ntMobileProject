var appDispatcher=require("../dispatcher/dispatcher.js");

var WithdrawApplySuccessHintAction={
    getInitialData(data){
        appDispatcher.dispatch({
            actionName:"getInitialData_WASH",
            data:data
        })
    },
    selectWithdrawReason(reasonId){
        appDispatcher.dispatch({
            actionName:"selectWithdrawReason_WASH",
            data:{
                reasonId
            }
        })
    },
    submitSurvey(){
        appDispatcher.dispatch({
            actionName:"submitSurvey_WASH"
        })
    }
};

module.exports=WithdrawApplySuccessHintAction;
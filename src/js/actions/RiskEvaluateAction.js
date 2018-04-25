var appDispatcher=require("../dispatcher/dispatcher.js");

var RiskEvaluateAction={
    getInitialData(isEvaluated){
        appDispatcher.dispatch({
            actionName:"getInitialData_re",
            data:{
                isEvaluated
            }
        })

    },
    selectAnswer(questionId,optionId){
        appDispatcher.dispatch({
            actionName:"selectAnswer_re",
            data:{
                questionId,
                optionId
            }
        })
    },
    submitAnswer(questionId,optionId){
        appDispatcher.dispatch({
            actionName:"submitAnswer_re",
            data:{
                questionId,
                optionId
            }
        })
    }
};

module.exports=RiskEvaluateAction;
//@flow
var appDispatcher=require("../dispatcher/dispatcher.js");

var AppFeedbackAction={
    changeFeedbackText(feedbackText:string){
        appDispatcher.dispatch({
            actionName:"changeFeedbackText_appFeedback",
            data:{
                feedbackText
            }
        })
    },
    submitFeedbackText(){
        appDispatcher.dispatch({
            actionName:"submitFeedbackText_appFeedback"
        })
    }
};

module.exports=AppFeedbackAction;
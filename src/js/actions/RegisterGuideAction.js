var appDispatcher=require("../dispatcher/dispatcher.js");

var RegisterGuideAction={
    getInitialData(){
        appDispatcher.dispatch({
            actionName:"getInitialData_registerGuide"
        })
    },
    toggleCheck (){
        appDispatcher.dispatch({
            actionName:"toggleCheck_registerGuide"
        })
    },
    changeFieldValue(fieldValue,fieldName){
        appDispatcher.dispatch({
            actionName:"changeFieldValue_registerGuide",
            data:{
                fieldValue:fieldValue,
                fieldName:fieldName
            }
        })
    },
    changeVerifyCodeImg(){
        appDispatcher.dispatch({
            actionName:"changeVerifyCodeImg_registerGuide"
        })
    },
    submitRegisterForm(){
        appDispatcher.dispatch({
            actionName:"submitRegisterForm_registerGuide"
        })
    }
};

module.exports=RegisterGuideAction;
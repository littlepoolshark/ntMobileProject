var appDispatcher=require("../dispatcher/dispatcher.js");

var PlatformSurveyAction={
    getInitialData(){
        appDispatcher.dispatch({
            actionName:"getInitialData_platformSurvey",
        })
    }
};

module.exports=PlatformSurveyAction;
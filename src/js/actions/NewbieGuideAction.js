var appDispatcher=require("../dispatcher/dispatcher.js");

var NewbieGuideAction={
    getInitialData(){
        appDispatcher.dispatch({
            actionName:"getInitialData_newbieGuide"
        });
    }
};

module.exports=NewbieGuideAction;
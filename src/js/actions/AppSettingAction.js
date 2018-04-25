var appDispatcher=require("../dispatcher/dispatcher.js");

var AppSettingAction={
    getInitialData(){
        appDispatcher.dispatch({
            actionName:"getInitialData_ass"
        });
    },
    logout(){
        appDispatcher.dispatch({
            actionName:"logout"
        });
    }
};

module.exports=AppSettingAction;
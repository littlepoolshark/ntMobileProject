var appDispatcher=require("../dispatcher/dispatcher.js");

var AppSettingAction={
    logout(){
        appDispatcher.dispatch({
            actionName:"logout"
        });
    }
};

module.exports=AppSettingAction;
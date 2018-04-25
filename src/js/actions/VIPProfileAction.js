var appDispatcher=require("../dispatcher/dispatcher.js");

var VIPProfileAction={
    getInitialData(){
        appDispatcher.dispatch({
            actionName:"getInitialData_VIPProfile"
        })
    }
};

module.exports=VIPProfileAction;
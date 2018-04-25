var appDispatcher=require("../dispatcher/dispatcher.js");

var SkipRegisteringZXAction={
    getInitialData(){
        appDispatcher.dispatch({
            actionName:"getInitialData_skipRegisteringZX"
        })
    },
    submitSkipForm (){
        appDispatcher.dispatch({
            actionName:"submitSkipForm_skipRegisteringZX"
        })
    }
};

module.exports=SkipRegisteringZXAction;
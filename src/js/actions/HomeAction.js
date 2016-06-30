var appDispatcher=require("../dispatcher/dispatcher.js");

var HomeAction={
    getDataFromServer(){
        appDispatcher.dispatch({
            actionName:"getDataFromServer"
        })
    }
};

module.exports=HomeAction;
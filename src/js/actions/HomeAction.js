var appDispatcher=require("../dispatcher/dispatcher.js");

var HomeAction={
    getDataFromServer(){
        appDispatcher.dispatch({
            actionName:"home_getDataFromServer"
        })
    }
};

module.exports=HomeAction;
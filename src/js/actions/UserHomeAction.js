var appDispatcher=require("../dispatcher/dispatcher.js");

var UserHOmeAction={
    getInitailDataFromServer (){
        appDispatcher.dispatch({
            actionName:"getInitailDataFromServer_userHome",
        })
    }
};

module.exports=UserHOmeAction;
var appDispatcher=require("../dispatcher/dispatcher.js");

var TotalAccountDetailAction={
    getAccountInfoFromServer (){
        appDispatcher.dispatch({
            actionName:"getAccountInfoFromServer_totalAccountDetail"
        })
    }
};

module.exports=TotalAccountDetailAction;
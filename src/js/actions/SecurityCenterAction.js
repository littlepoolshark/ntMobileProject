var appDispatcher=require("../dispatcher/dispatcher.js");

var SecurityCenterAction={
    getSecurityInfoFromServer(){
        appDispatcher.dispatch({
            actionName:"getSecurityInfoFromServer_securityCenter"
        })
    }
};

module.exports=SecurityCenterAction;
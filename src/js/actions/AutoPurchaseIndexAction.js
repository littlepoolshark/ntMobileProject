var appDispatcher=require("../dispatcher/dispatcher.js");

var AutoPurchaseIndexAction={
    getInitialData(){
        appDispatcher.dispatch({
            actionName:"getInitialData_autoPurchaseIndex"
        })
    },
    toggleAutoPurchaseSwitch(){
        appDispatcher.dispatch({
            actionName:"toggleAutoPurchaseSwitch_autoPurchaseIndex"
        })
    }
};

module.exports=AutoPurchaseIndexAction;
var appDispatcher=require("../dispatcher/dispatcher.js");

var SendRedPackageAction={
    getInitialData(){
        appDispatcher.dispatch({
            actionName:"getInitialData_srp"
        })
    },
    shareRedPackage(){
        appDispatcher.dispatch({
            actionName:"shareRedPackage_srp"
        })
    },
    luckyDraw(){
        appDispatcher.dispatch({
            actionName:"luckyDraw_srp"
        })
    }
};

module.exports=SendRedPackageAction;
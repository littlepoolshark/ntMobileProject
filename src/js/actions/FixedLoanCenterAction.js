var appDispatcher=require("../dispatcher/dispatcher.js");

var FixedLoanCenterAction={
    getFixedLoanCenterData(){
        appDispatcher.dispatch({
            actionName:"getFixedLoanCenterData"
        })
    }
};

module.exports=FixedLoanCenterAction;
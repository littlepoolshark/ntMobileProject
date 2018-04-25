var appDispatcher=require("../dispatcher/dispatcher.js");

var GetRedPackageAction={
    getInitialData(queryObj){
        appDispatcher.dispatch({
            actionName:"getInitialData_getRedPackage",
            data:queryObj
        })
    },
    changeFieldValue(fieldValue,fieldName){
        appDispatcher.dispatch({
            actionName:"changeFieldValue_getRedPackage",
            data:{
                fieldValue:fieldValue,
                fieldName:fieldName
            }
        })
    },
    getRedPackage(){
        appDispatcher.dispatch({
            actionName:"submitGetRedPackageForm_getRedPackage"
        })
    }
};

module.exports=GetRedPackageAction;
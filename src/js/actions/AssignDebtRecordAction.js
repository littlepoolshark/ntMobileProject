var appDispatcher=require("../dispatcher/dispatcher.js");

var AssignDebtRecordAction={
    getInitialData(){
        appDispatcher.dispatch({
            actionName:"getInitialData_assignDebtRecord"
        })
    },
    toggleListType(listType){
        appDispatcher.dispatch({
            actionName:"toggleListType_assignDebtRecord",
            data:{
                listType:listType
            }
        })
    },
    getNextPage(){
        appDispatcher.dispatch({
            actionName:"getNextPage_assignDebtRecord"
        })
    }
};

module.exports=AssignDebtRecordAction;
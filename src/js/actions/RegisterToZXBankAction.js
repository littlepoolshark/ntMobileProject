var appDispatcher=require("../dispatcher/dispatcher.js");

var RegisterToZXBankAction={
    getInitialDataFromServer(query){
        appDispatcher.dispatch({
            actionName:"getInitialData_registerToZXBank",
            data:query
        })
    },
    changeFieldValue(fieldValue,fieldName){
        appDispatcher.dispatch({
            actionName:"changeFieldValue_registerToZXBank",
            data:{
                fieldValue:fieldValue,
                fieldName:fieldName
            }
        })
    },
    submitRegisterForm(){
        appDispatcher.dispatch({
            actionName:"submitRegisterForm_registerToZXBank"
        })
    }
};

module.exports=RegisterToZXBankAction;
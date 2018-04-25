var appDispatcher=require("../dispatcher/dispatcher.js");

var RegisterToPABankAction={
    getInitialDataFromServer(currUserPhoneNo,localData,queryData){
        appDispatcher.dispatch({
            actionName:"getInitialData_registerToPABank",
            data:{
                userPhoneNo:currUserPhoneNo,
                localData,
                queryData
            }
        })
    },
    changeFieldValue(fieldValue,fieldName){
        appDispatcher.dispatch({
            actionName:"changeFieldValue_registerToPABank",
            data:{
                fieldValue:fieldValue,
                fieldName:fieldName
            }
        })
    },
    submitRegisterForm(){
        appDispatcher.dispatch({
            actionName:"submitRegisterForm_registerToPABank"
        })
    },
    submitVerificationCode(verificationCode){
        appDispatcher.dispatch({
            actionName:"submitVerificationCode_registerToPABank",
            data:{
                verificationCode
            }
        })
    }
};

module.exports=RegisterToPABankAction;
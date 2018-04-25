var appDispatcher=require("../dispatcher/dispatcher.js");

var SetNewMobilePhoneNoAction={
    changeFieldValue(fieldName, fieldValue){
        appDispatcher.dispatch({
            actionName:"changeFieldValue_mmpa",
            data:{
                fieldName,
                fieldValue
            }
        })
    },
    changeModifyType(canOldPoneNoReceiveMsg){
        appDispatcher.dispatch({
            actionName:"changeModifyType_mmpa",
            data:{
                canOldPoneNoReceiveMsg
            }
        })
    },
    submitForm (){
        appDispatcher.dispatch({
            actionName:"submitForm_mmpa"
        })

    }
};

module.exports=SetNewMobilePhoneNoAction;
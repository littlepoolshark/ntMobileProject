var appDispatcher=require("../dispatcher/dispatcher.js");

var ModifyMobilePhoneAction={
    changeFieldValue(fieldName,fieldValue){
         appDispatcher.dispatch({
            actionName:"changeFieldValue_mmpa",
            data:{
                fieldName,
                fieldValue
            }
        })
    },
    confirmToModify(){
        appDispatcher.dispatch({
            actionName:"confirmToModify_mmpa",
        })
    }
};

module.exports=ModifyMobilePhoneAction;
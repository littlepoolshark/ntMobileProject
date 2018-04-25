var appDispatcher = require("../dispatcher/dispatcher.js");

var AutoPurchaseFormAction = {
    getInitialData(formData) {
        appDispatcher.dispatch({
            actionName: "getInitialData_autoPurchaseForm",
            data:{
                formData
            }
        })
    },
    changeFieldValue(fieldName, fieldValue) {
        appDispatcher.dispatch({
            actionName: "changeFieldValue_autoPurchaseForm",
            data: {
                fieldName,
                fieldValue
            }
        })
    },
    toggleValidDateTypeTo(validDateType){
        appDispatcher.dispatch({
            actionName: "toggleValidDateTypeTo_autoPurchaseForm",
            data: {
                validDateType
            }
        })
    },
    submitAutoPurchaseForm(){
        appDispatcher.dispatch({
            actionName: "submitAutoPurchaseForm_autoPurchaseForm"
        })
    },
    deleteAutoPurchaseRecord(){
        appDispatcher.dispatch({
            actionName: "deleteAutoPurchaseRecord_autoPurchaseForm"
        })
    },
    openAutoPurchaseSwitch(){
        appDispatcher.dispatch({
            actionName: "openAutoPurchaseSwitch_autoPurchaseForm"
        })
    }
};

module.exports = AutoPurchaseFormAction;
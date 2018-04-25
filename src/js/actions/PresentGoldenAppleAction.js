var appDispatcher=require("../dispatcher/dispatcher.js");

var PresentGoldenAppleAction={
    getInitialData (){
        appDispatcher.dispatch({
            actionName:"getInitialData_pga"
        })
    },
    getPrizeGrade(){
        appDispatcher.dispatch({
            actionName:"getPrizeGrade_pga"
        })
    },
    getRedPackage(){
        appDispatcher.dispatch({
            actionName:"getRedPackage_pga"
        })
    },
    changeFieldValue(fieldValue,fieldName){
        appDispatcher.dispatch({
            actionName:"changeFieldValue_pga",
            data:{
                fieldValue:fieldValue,
                fieldName:fieldName
            }
        })
    },
    submitAddressForm(){
        appDispatcher.dispatch({
            actionName:"submitAddressForm_pga"
        })
    }
};

module.exports=PresentGoldenAppleAction;
var appDispatcher=require("../dispatcher/dispatcher.js");

var CEDLoanIntroductionAction={
    getDataFromServer(productId){
        appDispatcher.dispatch({
            actionName:"cedLoanIntroduction_getDataFromServer",
            data:{
                productId:productId
            }
        })

    },
    getModalData(){
        appDispatcher.dispatch({
            actionName:"cedLoanIntroduction_getModalData"
        })
    }
};

module.exports=CEDLoanIntroductionAction;
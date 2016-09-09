var appDispatcher=require("../dispatcher/dispatcher.js");

var FixedLoanIntroductionAction={
    getDataFromServer(productId){
        appDispatcher.dispatch({
            actionName:"fixedLoanIntroduction_getDataFromServer",
            data:{
                productId:productId
            }
        })

    },
    getModalData(){
        appDispatcher.dispatch({
            actionName:"fixedLoanIntroduction_getModalData"
        })
    }
};

module.exports=FixedLoanIntroductionAction;
var appDispatcher=require("../dispatcher/dispatcher.js");

var CreditorLoanIntroductionAction={
    getDataFromServer(productId){
        appDispatcher.dispatch({
            actionName:"creditorLoanIntroduction_getDataFromServer",
            data:{
                productId:productId
            }
        })

    }
};

module.exports=CreditorLoanIntroductionAction;
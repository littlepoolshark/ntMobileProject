var appDispatcher=require("../dispatcher/dispatcher.js");

var MoonLoanIntroductionAction={
    getDataFromServer(productId){
        appDispatcher.dispatch({
            actionName:"moonLoanIntroductionAction_getDataFromServer",
            data:{
                productId:productId
            }
        })

    }
};

module.exports=MoonLoanIntroductionAction;
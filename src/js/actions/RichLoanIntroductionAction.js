var appDispatcher=require("../dispatcher/dispatcher.js");

var RichLoanIntroductionAction={
    getDataFromServer(productId){
        appDispatcher.dispatch({
            actionName:"richLoanIntroductionAction_getDataFromServer",
            data:{
                productId:productId
            }
        })

    }
};

module.exports=RichLoanIntroductionAction;
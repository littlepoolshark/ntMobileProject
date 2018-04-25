var appDispatcher=require("../dispatcher/dispatcher.js");

var GljLoanIntroductionAction={
    getDataFromServer(productId){
        appDispatcher.dispatch({
            actionName:"gljLoanIntroduction_getDataFromServer",
            data:{
                productId:productId
            }
        })

    },
    getModalData(){
        appDispatcher.dispatch({
            actionName:"gljLoanIntroduction_getModalData"
        })
    }
};

module.exports=GljLoanIntroductionAction;
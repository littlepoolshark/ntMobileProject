var appDispatcher=require("../dispatcher/dispatcher.js");

var NYDLoanIntroduction={
    getDataFromServer(productId){
        appDispatcher.dispatch({
            actionName:"nydLoanIntroduction_getDataFromServer",
            data:{
                productId:productId
            }
        })

    },
    getModalData(){
        appDispatcher.dispatch({
            actionName:"nydLoanIntroduction_getModalData"
        })
    }
};

module.exports=NYDLoanIntroduction;
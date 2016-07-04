var appDispatcher=require("../dispatcher/dispatcher.js");

var EarnSetIntroductionAction={
    getDataFromServer(type,productId){
        appDispatcher.dispatch({
            actionName:"earnSetIntroduction_getDataFromServer",
            data:{
                type:type,
                productId:productId
            }
        })

    }
};

module.exports=EarnSetIntroductionAction;
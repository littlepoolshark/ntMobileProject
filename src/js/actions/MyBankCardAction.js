var appDispatcher=require("../dispatcher/dispatcher.js");

var MyBanKCardAction={
    getMyBankCardDetail(){
        appDispatcher.dispatch({
            actionName:"getMyBankCardDetail_myBankCard"
        })
    }
};

module.exports=MyBanKCardAction;
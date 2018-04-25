var appDispatcher=require("../dispatcher/dispatcher.js");

var MyBanKCardAction={
    getMyBankCardDetail(){
        appDispatcher.dispatch({
            actionName:"getMyBankCardDetail_myBankCard"
        })
    },
    getUserAccountInfo(){
        appDispatcher.dispatch({
            actionName:"getUserAccountInfo_myBankCard"
        })
    },
    addBankCard(){
        appDispatcher.dispatch({
            actionName:"addBankCard_myBankCard"
        })
    },
    unbindBankCard(){
        appDispatcher.dispatch({
            actionName:"unbindBankCard_myBankCard"
        })
    }
};

module.exports=MyBanKCardAction;
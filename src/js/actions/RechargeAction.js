var appDispatcher=require("../dispatcher/dispatcher.js");

var RechargeAction={
    getBankCardInfoFromServer (){
        appDispatcher.dispatch({
            actionName:"getBankCardInfoFromServer",
        })
    },
    recharge(){
        appDispatcher.dispatch({
            actionName:"submitRechargeAmount"
        })
    },
    changeRechargeAmount(amount){
        appDispatcher.dispatch({
            actionName:"rechargeAmountChange",
            data:{
                rechargeAmount:amount
            }
        })
    }
};

module.exports=RechargeAction;
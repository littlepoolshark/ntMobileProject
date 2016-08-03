var appDispatcher=require("../dispatcher/dispatcher.js");

var WithdrawAction={
    submitWithdrawForm (dealPassword){
        appDispatcher.dispatch({
            actionName:"submitWithdrawForm",
            data:{
                dealPassword:dealPassword
            }
        })
    },
    changeWithdrawAmount(withdrawAmount){
        console.log("withdrawAmount:",withdrawAmount);
        appDispatcher.dispatch({
            actionName:"withdrawAmountChange",
            data:{
                withdrawAmount:withdrawAmount
            }
        })
    }
};

module.exports=WithdrawAction;
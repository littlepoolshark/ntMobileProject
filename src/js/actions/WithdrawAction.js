var appDispatcher=require("../dispatcher/dispatcher.js");

var WithdrawAction={
    getBankCardInfoFromServer(){
        appDispatcher.dispatch({
            actionName:"getBankCardInfoFromServer_withdraw"
        })
    },
    getUserBalance(){
        appDispatcher.dispatch({
            actionName:"getUserBalance_withdraw"
        })
    },
    submitWithdrawForm (dealPassword){
        appDispatcher.dispatch({
            actionName:"submitWithdrawForm",
            data:{
                dealPassword:dealPassword
            }
        })
    },
    confirmToSubmit(){
        appDispatcher.dispatch({
            actionName:"confirmToSubmitWithdrawForm"
        })
    },
    changeWithdrawAmount(withdrawAmount){
        appDispatcher.dispatch({
            actionName:"withdrawAmountChange",
            data:{
                withdrawAmount:withdrawAmount
            }
        })
    }
};

module.exports=WithdrawAction;
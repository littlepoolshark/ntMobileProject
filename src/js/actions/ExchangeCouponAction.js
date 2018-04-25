var appDispatcher=require("../dispatcher/dispatcher.js");

var ExchangeCouponAction={
    changeExchangeCode(exchangeCode){
        appDispatcher.dispatch({
            actionName:"exchangeCodeChange_exchangeCoupon",
            data:{
                exchangeCode
            }
        })
    },
    submitExchangeCode(){
        appDispatcher.dispatch({
            actionName:"exchangeCodeSubmit_exchangeCoupon"
        })
    }
};

module.exports=ExchangeCouponAction;
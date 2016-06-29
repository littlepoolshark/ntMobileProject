var appDispatcher=require("../dispatcher/dispatcher.js");

var PaymentAction={
    finishedCouponSelection (id,amount,type,minimumLimit){
        appDispatcher.dispatch({
            actionName:"couponChange",
            data:{
                couponId:id,
                couponAmount:amount,
                couponType:type,
                couponMinimumLimit:minimumLimit
            }
        })

    },
    changePurchaseAmount(purchaseAmount){
        appDispatcher.dispatch({
            actionName:"purchaseAmountChange",
            data:{
                purchaseAmount:purchaseAmount
            }
        })
    },
    doNotUseCoupon(){
        appDispatcher.dispatch({
            actionName:"couponChange",
            data:{
                couponId:"",
                couponAmount:0,
                couponType:""
            }
        })
    }
};

module.exports=PaymentAction;
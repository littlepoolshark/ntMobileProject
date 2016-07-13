var appDispatcher=require("../dispatcher/dispatcher.js");

var PaymentAction={
    storeInitialize(sourceObj){
        appDispatcher.dispatch({
            actionName:"payment_storeInitialization",
            data:sourceObj
        })
    },
    getUnUseCouponCount(type){
        appDispatcher.dispatch({
            actionName:"getUnUseCouponCount",
            data:{
                productType:type
            }
        })
    },
    useAllBalance(){
        appDispatcher.dispatch({
            actionName:"useAllBalance",
        })
    },
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
    },
    pay(){
        appDispatcher.dispatch({
            actionName:"payment"
        })
    }
};

module.exports=PaymentAction;
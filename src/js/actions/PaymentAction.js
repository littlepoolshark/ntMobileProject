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
    pay(productType){
        switch (productType){
            case "new_product":
            case "ttz_product":
            case "yyz_product":
            case "jjz_product":
                appDispatcher.dispatch({
                    actionName:"payment_earnSet"
                });
                break;
            case "loan_product":
                appDispatcher.dispatch({
                    actionName:"payment_fixedLoan"
                });
                break;
            case "creditor_product":
                appDispatcher.dispatch({
                    actionName:"payment_creditorLoan"
                });
                break;
            default:
                break;
        }

    }
};

module.exports=PaymentAction;
var appDispatcher=require("../dispatcher/dispatcher.js");

var CouponListAction={
    getDataFromSever(productType,purchaseAmount){
        appDispatcher.dispatch({
            actionName:"couponList_getDataFromSever",
            data:{
                productType:productType,
                purchaseAmount:purchaseAmount
            }
        })
    }
};

module.exports=CouponListAction;
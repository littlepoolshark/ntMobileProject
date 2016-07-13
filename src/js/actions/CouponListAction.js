var appDispatcher=require("../dispatcher/dispatcher.js");

var CouponListAction={
    getDataFromSever(type){
        appDispatcher.dispatch({
            actionName:"couponList_getDataFromSever",
            data:{
                productType:type
            }
        })
    }
};

module.exports=CouponListAction;
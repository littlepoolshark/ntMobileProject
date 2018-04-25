var appDispatcher=require("../dispatcher/dispatcher.js");

var ShareCouponAction={
    getInitialData (){
        appDispatcher.dispatch({
            actionName:"getInitialData_shareCoupon"
        })
    }
};

module.exports=ShareCouponAction;
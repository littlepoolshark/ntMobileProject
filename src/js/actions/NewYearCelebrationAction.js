var appDispatcher=require("../dispatcher/dispatcher.js");

var NewYearCelebrationAction={
    getInitialData(){
        appDispatcher.dispatch({
            actionName:"getInitialData_nyc"
        })
    },
    getNewestBroadcastList(){
        appDispatcher.dispatch({
            actionName:"getNewestBroadcastList_nyc"
        })
    },
    luckyDraw(){
        appDispatcher.dispatch({
            actionName:"luckyDraw_nyc"
        })
    },
    confirmToGetCashCoupon(cashCouponName,amount){
        appDispatcher.dispatch({
            actionName:"confirmToGetCashCoupon_nyc",
            data:{
                cashCouponName:cashCouponName,
                amount:amount
            }
        })
    },
    submitGetCouponForm(){
        appDispatcher.dispatch({
            actionName:"submitGetCouponForm_nyc"
        })
    },
    inviteMyFriend(){
        appDispatcher.dispatch({
            actionName:"inviteMyFriend_nyc"
        })
    }
};

module.exports=NewYearCelebrationAction;
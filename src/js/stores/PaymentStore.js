var MicroEvent = require('../lib/microevent.js');
var appDispatcher=require('../dispatcher/dispatcher.js');
var ajax=require("../lib/ajax.js");

var PaymentStore={
    _all:{
        purchaseAmount:0,
        couponAmount:0,
        yearRate:0.095,
        expectedReward:0.00
    },
    getAll(){
        return this._all;
    },
    _setAll(source){
        Object.assign(this._all,source);
    },
    _setExpectedReward(){
        let {
            couponType,
            couponAmount,
            expectedReward,
            purchaseAmount,
            yearRate
            }=this._all;
        if(couponType === "interestRate" && couponAmount){
            expectedReward=(purchaseAmount * (yearRate+couponAmount) / 12).toFixed(2);
        }else {
            expectedReward=(purchaseAmount * yearRate / 12).toFixed(2);
        }
        this._all.expectedReward=expectedReward;
    },
    _setCouponAmount(){
        let {
            couponType,
            couponAmount,
            purchaseAmount,
            couponMinimumLimit
            }=this._all;
        if(couponType === "redPackage" && purchaseAmount < couponMinimumLimit){
            couponAmount=0;
        }
        this._all.couponAmount=couponAmount;
    },
    updateAll(data){
        this._setAll(data);
        this._setExpectedReward();
        this._setCouponAmount();
    }

};
MicroEvent.mixin(PaymentStore);


appDispatcher.register(function(payload){
    switch(payload.actionName){
        case "purchaseAmountChange":
            PaymentStore.updateAll({
                purchaseAmount:payload.data.purchaseAmount
            });
            PaymentStore.trigger("change");
            break;
        case "couponChange":
            PaymentStore.updateAll({
                couponId:payload.data.couponId,
                couponAmount:payload.data.couponAmount,
                couponType:payload.data.couponType,
                couponMinimumLimit:payload.data.couponMinimumLimit
            });
            PaymentStore.trigger("change");
            break;
        default:
        //no op
    }
});

module.exports=PaymentStore;
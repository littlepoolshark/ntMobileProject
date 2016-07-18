var MicroEvent = require('../lib/microevent.js');
var appDispatcher=require('../dispatcher/dispatcher.js');
var ajax=require("../lib/ajax.js");

var PaymentStore={
    _all:{
        productName:"--",//产品名称
        purchaseAmount:0,//用户购买金额
        couponType:"",//优惠券的类型，"interestRate"是加息券，"redPackage"是红包
        couponAmount:0,//优惠券的额度，如果优惠券为“加息券”的话，则单位是%；如果优惠券为“红包”的话，则单位是元。
        couponId:"",//优惠券的id
        productApr:0,//年化利率
        expectedReward:0.00,//预期收益，是一个计算属性
        remainAmount:0,//项目可购买金额
        userBalance:0,//用户账户余额
        unUseCouponCount:0//未使用优惠券的数量
    },
    getAll(){
        return this._all;
    },
    _setAll(source){
        Object.assign(this._all,source);
    },
    /*
    * @desc 计算预期收益
    */
    _setExpectedReward(){
        let {
            couponType,
            couponAmount,
            expectedReward,
            purchaseAmount,
            productApr
            }=this._all;
        if(couponType === "interestRate" && couponAmount){//如果用户选择的是加息券
            expectedReward=(purchaseAmount * (productApr+couponAmount) / 12).toFixed(2);
        }else {//其他情况
            expectedReward=(purchaseAmount * productApr / 12).toFixed(2);
        }
        this._all.expectedReward=expectedReward;
    },
    _setCoupon(){
        let {
            couponType,
            couponAmount,
            purchaseAmount,
            couponMinimumLimit
            }=this._all;
        // 如果当前的优惠券的类型是红包并且购买金额小于该红包的使用最小投资额度的话，将优惠券的额度设置为0
        if(couponType === "redPackage" && purchaseAmount < couponMinimumLimit){
            couponAmount=0;
            couponType="";
        }
        this._all.couponAmount=couponAmount;
        this._all.couponType=couponType;
    },
    getUserBalance(){
        return this._all.userBalance - (this._all.userBalance % 100) ;
    },
    paymentCheck(){
        let {
            remainAmount,
            userBalance,
            purchaseAmount
            }=this._all;
        let validationResult={
            success:false,
            msg:""
        };
        if(purchaseAmount === 0){
            validationResult={
                success:false,
                msg:"投资金额不能空，请输入！"
            }
        }else if(purchaseAmount < 100 ){
            validationResult={
                success:false,
                msg:"投资金额不能小于100，100元起投！"
            }
        }else if(purchaseAmount % 100){
            validationResult={
                success:false,
                msg:"投资金额要求是100的整数倍！"
            }
        }else if(purchaseAmount > remainAmount){
            validationResult={
                success:false,
                msg:"投资金额不能大于项目可投金额！"
            }
        }else if(purchaseAmount >  userBalance){
            validationResult={
                success:false,
                msg:"余额不足，前去充值"+ (purchaseAmount - userBalance) + "元？"
            }
        }else {
            validationResult={
                success:true,
                msg:""
            }
        }
        return validationResult;
    },
    updateAll(data){
        this._setAll(data);
        this._setExpectedReward();
        this._setCoupon();

    }

};
MicroEvent.mixin(PaymentStore);

appDispatcher.register(function(payload){
    switch(payload.actionName){
        case "payment_storeInitialization" ://将从url传递的参数存入store
            PaymentStore.updateAll(payload.data);
            break;
        case "useAllBalance":
            PaymentStore.updateAll({
                purchaseAmount:PaymentStore.getUserBalance()
            });
            PaymentStore.trigger("change");
            break;
        case "getUnUseCouponCount" :
            ajax({
                ciUrl:"/user/v2/getRedPackageAndInterestTks",
                data:{
                    reqPageNum:1,
                    maxResults:1000
                },
                success(rs){
                    let type=payload.data.productType;
                    let unUseCouponCount;
                    if(rs.code === 0){
                        if(type === "yyz_product"){//因为月月赚不能使用红包，所以只统计加息券的张数
                            unUseCouponCount=rs.data.list[0].interestList.length;
                        }else {
                            unUseCouponCount=rs.data.list[0].interestList.length + rs.data.list[0].redpackageList.length;
                        }
                        PaymentStore.updateAll({
                            unUseCouponCount:unUseCouponCount
                        });
                        PaymentStore.trigger("change");
                    }
                }
            })
            break;
        case "purchaseAmountChange"://用户填入投资金额
            PaymentStore.updateAll({
                purchaseAmount:payload.data.purchaseAmount
            });
            PaymentStore.trigger("change");
            break;
        case "couponChange"://用户选择优惠券
            PaymentStore.updateAll({
                couponId:payload.data.couponId,
                couponAmount:payload.data.couponAmount,
                couponType:payload.data.couponType,
                couponMinimumLimit:payload.data.couponMinimumLimit
            });
            PaymentStore.trigger("change");
            break;
        case "payment_earnSet"://赚系列的支付
            let paymentCheckResult_earnSet=PaymentStore.paymentCheck();
            if(paymentCheckResult_earnSet.success){
                let {
                    productType,
                    productId,
                    purchaseAmount,
                    couponType,
                    couponAmount,
                    couponId
                    }=PaymentStore.getAll();
                let postData={
                    regularId:productId,
                    amount:purchaseAmount,
                    type:productType,
                    operType:"buy"
                };
                if(couponType && couponAmount){
                    if(couponType === "interestRate"){
                        postData.interestId=couponId;
                    }else if(couponType === "redPackage"){
                        postData.redId=couponId;
                    }
                }
                ajax({
                    ciUrl:"/invest/v2/earnProductInvest",
                    data:postData,
                    success(rs){
                       if(rs.code === 0){
                           PaymentStore.trigger("purchaseSuccess",rs.data)
                       }else {
                           PaymentStore.trigger("purchaseFailed",rs.description);
                       }
                    }
                })
            }else {
                PaymentStore.trigger("paymentCheckFailed",paymentCheckResult_earnSet.msg)
            }
            break;
        case "payment_fixedLoan"://好采投的支付
            let paymentCheckResult_fixedLoan=PaymentStore.paymentCheck();
            if(paymentCheckResult_fixedLoan.success){
                let {
                    productId,
                    purchaseAmount,
                    couponType,
                    couponAmount,
                    couponId
                    }=PaymentStore.getAll();
                let postData={
                    investId:productId,
                    amount:purchaseAmount
                };
                if(couponType && couponAmount){
                    if(couponType === "interestRate"){
                        postData.interestId=couponId;
                    }else if(couponType === "redPackage"){
                        postData.redpackageId=couponId;
                    }
                }
                ajax({
                    ciUrl:"/invest/v2/loanForBuy",
                    data:postData,
                    success(rs){
                        if(rs.code === 0){
                            PaymentStore.trigger("purchaseSuccess",rs.data)
                        }else {
                            PaymentStore.trigger("purchaseFailed",rs.description);
                        }
                    }
                })
            }else {
                PaymentStore.trigger("paymentCheckFailed",paymentCheckResult_fixedLoan.msg)
            }
            break;

        default:
        //no op
    }
});

module.exports=PaymentStore;
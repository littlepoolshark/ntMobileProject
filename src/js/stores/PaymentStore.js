var MicroEvent = require('../lib/microevent.js');
var appDispatcher=require('../dispatcher/dispatcher.js');
var ajax=require("../lib/ajax.js");

var PaymentStore={
    _all:{
        productName:"--",//产品名称
        productType:"",//产品类型，包括new_product,ttz_product,yyz_product,jjz_product,loan_product,creditor_product
        productDeadline:1,//项目期限
        purchaseAmount:0,//用户购买金额
        couponType:"",//优惠券的类型，"interestRate"是加息券，"redPackage"是红包
        couponAmount:0,//优惠券的额度，如果优惠券为“加息券”的话，则单位是%；如果优惠券为“红包”的话，则单位是元。
        couponId:"",//优惠券的id
        incomePeriod:0,//加息券的加息期限，单位是“月”
        productApr:0,//年化利率
        expectedReward:0.00,//预期收益，是一个计算属性
        remainAmount:0,//项目可购买金额
        userBalance:0,//用户账户余额
        unUseCouponCount:0,//未使用优惠券的数量
        rewardRate:0,//标的的奖励利息
        investLimitAmount_ttz:100000,//天天赚最高(初始)投资限额
        userInTotal_ttz:0,//天天赚已购买（已转入）金额
        orderAmount_ttz:0,//天天赚预约中金额
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
        function toFixedTwo(number){
            let number_str=""+number;
            let arr=[];
            let index=number_str.indexOf(".");
            if(index === -1){  //整数
                return parseFloat(number_str+".00");
            }else {
                arr=number_str.split(".");
                if(arr[1].length === 1){  //小数点后面有一位数字
                    return parseFloat([arr[0],arr[1]+"0"].join("."));
                }else if(arr[1].length === 2){ //小数点后面有两位数字
                    return parseFloat([arr[0],arr[1]].join("."));
                }else { //小数点后面大于两位数字
                    return parseFloat([arr[0],arr[1].substring(0,2)].join("."));
                }
            }};
        let {
            productType,
            productDeadline,
            couponType,
            couponAmount,
            expectedReward,
            purchaseAmount,
            productApr,
            incomePeriod,
            rewardRate,
            mainMonth,//剩余未还息期限,计算债权转让预期收益专用
            minNotRateTime,//最低未还息时间,计算债权转让预期收益专用
            maxNotRateTime//最高未还息时间,计算债权转让预期收益专用
            }=this._all;

        let principal_reward= 0,//本金所产生的收益
            rewardRate_reward= 0,//奖励利率所产生的收益
            coupon_reward=0;//加息券所产生的收益


        switch (productType){
            case "new_product"://新手标
                principal_reward=toFixedTwo((purchaseAmount * productApr / 360) * productDeadline);
                if(!!rewardRate){
                    rewardRate_reward=toFixedTwo((purchaseAmount * rewardRate / 360) * productDeadline);
                }
                expectedReward=(principal_reward + rewardRate_reward).toFixed(2);
                break;
            case "yyz_product"://月月赚
                principal_reward=toFixedTwo((purchaseAmount * productApr)/12);
                if(!!couponAmount && couponType === "interestRate"){
                    coupon_reward=toFixedTwo((purchaseAmount * couponAmount)/12);
                }
                if(!!rewardRate){
                    rewardRate_reward=toFixedTwo((purchaseAmount * rewardRate)/12);
                }
                expectedReward=(principal_reward + coupon_reward + rewardRate_reward).toFixed(2);
                break;
            case "jjz_product"://季季赚
                principal_reward=toFixedTwo((purchaseAmount * productApr)/12) * 3;
                if(!!couponAmount && couponType === "interestRate"){
                    coupon_reward=toFixedTwo((purchaseAmount * couponAmount)/12) * 3;
                }
                if(!!rewardRate){
                    rewardRate_reward=toFixedTwo((purchaseAmount * rewardRate)/12) * 3;
                }
                expectedReward=(principal_reward + coupon_reward + rewardRate_reward).toFixed(2);
                break;
            case "loan_product"://好采投
                principal_reward=toFixedTwo((purchaseAmount * productApr)/12) * productDeadline;
                if(!!couponAmount && couponType === "interestRate"){
                    if(incomePeriod !== 0 && productDeadline > incomePeriod){
                        coupon_reward=toFixedTwo((purchaseAmount * couponAmount)/12) * incomePeriod;
                    }else {
                        coupon_reward=toFixedTwo((purchaseAmount * couponAmount)/12) * productDeadline;
                    }
                }
                if(!!rewardRate){
                    rewardRate_reward=toFixedTwo((purchaseAmount * rewardRate)/12) * productDeadline;
                }
                expectedReward=(principal_reward + coupon_reward + rewardRate_reward).toFixed(2);
                break;
            case "creditor_product"://债权转让
                let monthRate=toFixedTwo((purchaseAmount * productApr)/12);
                let dayRate=toFixedTwo((purchaseAmount * productApr)/360);
                let minProfit=toFixedTwo(monthRate  *  mainMonth +  dayRate * minNotRateTime);
                let maxProfit=toFixedTwo(monthRate  *  mainMonth +  dayRate * maxNotRateTime);

                expectedReward=minProfit.toFixed(2) + " ~ " + maxProfit.toFixed(2);
                break;
            default:
                break;
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
    _setTTZInvestLimitAmount(){
        let {
            investLimitAmount_ttz,
            userInTotal_ttz,
            orderAmount_ttz
            }=this._all;
        investLimitAmount_ttz=100000 -  parseFloat(userInTotal_ttz) - parseFloat(orderAmount_ttz);
        this._all.investLimitAmount_ttz=investLimitAmount_ttz < 0 ? 0 : investLimitAmount_ttz;
    },
    getUserBalance(){
        let userBalance=this._all.userBalance - (this._all.userBalance % 100);
        let maxPurchaseAmount;
       /* if(this._all.productType === "ttz_product"){
         maxPurchaseAmount=this._all.remainAmount < this._all.investLimitAmount_ttz ? this._all.remainAmount : this._all.investLimitAmount_ttz;
         }else {
         maxPurchaseAmount=this._all.remainAmount;
         }*/
        maxPurchaseAmount=this._all.remainAmount;
        return userBalance > maxPurchaseAmount ? maxPurchaseAmount : userBalance;
    },
    paymentCheck(){
        let {
            remainAmount,
            userBalance,
            purchaseAmount,
            productType,
            investLimitAmount_ttz,
            hadBindBankCard
            }=this._all;
        let validationResult={
            success:true,
            msg:""
        };
        if(purchaseAmount === 0){
            validationResult={
                success:false,
                msg:"投资金额不能为空，请输入！"
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
        }/*else if(productType === "ttz_product" && purchaseAmount > investLimitAmount_ttz){
            validationResult={
                success:false,
                msg:"投资金额不能大于个人投资限额！"
            }
        }*/ else if(purchaseAmount >  userBalance){
            validationResult={
                success:false,
                msg:"余额不足，前去充值"+ (purchaseAmount - userBalance).toFixed(2) + "元？"
            }
        }

        return validationResult;
    },
    isBindBankCardCheck(){
        return this._all.hadBindBankCard === false ? false : true;
    },
    updateAll(data){
        this._setAll(data);
        this._setExpectedReward();
        this._setTTZInvestLimitAmount();
        //this._setCoupon();

    },
    clearAll(){
        this._all.purchaseAmount=0;
        this._all.expectedReward=0.00;
        this._all.couponAmount=0;
        this._all.couponType="";
    }

};
MicroEvent.mixin(PaymentStore);

appDispatcher.register(function(payload){
    switch(payload.actionName){
        case "payment_storeInitialization" ://将从url传递的参数存入store
            //向后台取回“天天赚持有中金额”和“天天赚预约中金额”两个字段的值,用于天天赚的支付
            if(payload.data.productType === "ttz_product"){
                ajax({
                    ciUrl:"/ttz/v2/account",
                    success(rs){
                        if(rs.code === 0){
                            PaymentStore.updateAll({
                                userInTotal_ttz:rs.data.ttzUseraccountTotal.userInTotal,
                                orderAmount_ttz:rs.data.orderAmount.replace(/\,/g,"")
                            });
                            PaymentStore.trigger("change");
                        }
                    }
                })
            };

            //获取银行卡信息，以此来判断用户是否已经绑卡
            ajax({
                ciUrl:"/user/v2/myBankCardInfo",
                success(rs){
                    if(rs.code === 0){
                        let hadBindBankCard;
                        if(rs.data === null){
                            hadBindBankCard=false;
                        }else{
                            hadBindBankCard=true;
                        }
                        PaymentStore.updateAll({
                            hadBindBankCard:hadBindBankCard
                        });
                    }
                }
            });
            PaymentStore.updateAll(payload.data);
            PaymentStore.trigger("change");
            break;
        case "useAllBalance":
            let userBalance=PaymentStore.getUserBalance();

            if(userBalance !== 0){
                PaymentStore.updateAll({
                    purchaseAmount:PaymentStore.getUserBalance()
                });
                PaymentStore.trigger("change");
            }else {
                PaymentStore.trigger("userBalanceIsNotEnough","账户余额不足100元，请及时充值！");
            }
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
                purchaseAmount:payload.data.purchaseAmount,
                couponAmount:0,
                couponType:""
            });
            PaymentStore.trigger("change");
            break;
        case "couponChange"://用户选择优惠券
            PaymentStore.updateAll({
            couponId:payload.data.couponId,
            couponAmount:payload.data.couponAmount,
            couponType:payload.data.couponType,
            couponMinimumLimit:payload.data.couponMinimumLimit,
            incomePeriod:payload.data.incomePeriod,
            purchaseAmount:payload.data.purchaseAmount
        });

            PaymentStore.trigger("change");
            break;
        case "payment_earnSet"://赚系列的支付
            if(PaymentStore.isBindBankCardCheck()){
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
                    PaymentStore.trigger("paymentRequestIsStart");
                    ajax({
                        ciUrl:"/invest/v2/earnProductInvest",
                        data:postData,
                        success(rs){
                            PaymentStore.trigger("paymentRequestIsEnd");
                            if(rs.code === 0){
                                PaymentStore.trigger("purchaseSuccess",rs.data)
                            }else {
                                PaymentStore.trigger("purchaseFailed",rs.description);
                            }
                        },
                        error(){
                            PaymentStore.trigger("paymentRequestIsEnd");
                        }
                    })
                }else {
                    PaymentStore.trigger("paymentCheckFailed",paymentCheckResult_earnSet.msg)
                }
            }else {
                PaymentStore.trigger("hadNotBindBankCard");
            }

            break;
        case "payment_fixedLoan"://好采投的支付
            if(PaymentStore.isBindBankCardCheck()){
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
                    PaymentStore.trigger("paymentRequestIsStart");
                    ajax({
                        ciUrl:"/invest/v2/loanForBuy",
                        data:postData,
                        success(rs){
                            PaymentStore.trigger("paymentRequestIsEnd");
                            if(rs.code === 0){
                                PaymentStore.trigger("purchaseSuccess",rs.data)
                            }else {
                                PaymentStore.trigger("purchaseFailed",rs.description);
                            }
                        },
                        error(){
                            PaymentStore.trigger("paymentRequestIsEnd");
                        }
                    })
                }else {
                    PaymentStore.trigger("paymentCheckFailed",paymentCheckResult_fixedLoan.msg)
                }
            }else{
                PaymentStore.trigger("hadNotBindBankCard");
            }

            break;
        case "payment_creditorLoan"://债权转让的支付
            if(PaymentStore.isBindBankCardCheck()){
                let paymentCheckResult_creditorLoan=PaymentStore.paymentCheck();
                if(paymentCheckResult_creditorLoan.success){
                    let {
                        productId,
                        purchaseAmount,
                        }=PaymentStore.getAll();
                    let postData={
                        investId:productId,
                        amount:purchaseAmount
                    };
                    PaymentStore.trigger("paymentRequestIsStart");
                    ajax({
                        ciUrl:"/invest/v2/creditorForBuy",
                        data:postData,
                        success(rs){
                            PaymentStore.trigger("paymentRequestIsEnd");
                            if(rs.code === 0){
                                PaymentStore.trigger("purchaseSuccess",rs.data)
                            }else {
                                PaymentStore.trigger("purchaseFailed",rs.description);
                            }
                        },
                        error(){
                            PaymentStore.trigger("paymentRequestIsEnd");
                        }
                    })
                }else {
                    PaymentStore.trigger("paymentCheckFailed",paymentCheckResult_creditorLoan.msg)
                }
            }else {
                PaymentStore.trigger("hadNotBindBankCard");
            }
            break;
        default:
        //no op
    }
});

module.exports=PaymentStore;
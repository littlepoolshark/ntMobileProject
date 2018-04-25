let MicroEvent = require('../lib/microevent.js');
let appDispatcher=require('../dispatcher/dispatcher.js');
let ajax=require("../lib/ajax.js");


let  CreditorLoanIntroductionStore={
    _all:{
        id:"",
        type:"creditor_product",
        productApr:0,
        buyProgress:0,
        remainAmount:0,
        repaymentLimit:0,
        repaymentTypeUnit:"个月",
        totalAmount:0,
        productName:"",
        bidDays:0,
        publishTime:0,//这个值应该是数字类型的时间戳
        repayType:"xxhb"//还款方式，oneOf["xxhb","debx"],分别代表“先息后本”和“等额本息”
    },
    setAll(source){
        Object.assign(this._all,source);
    },
    getAll(){
        return this._all;
    },
    processData(data){
        data.buyProgress=data.buyProgress + "%";
        data.productApr=(data.productApr * 100).toFixed(1);
        data.remainAmount=data.remainAmount.toFixed(2);
        return data;
    }
};
MicroEvent.mixin(CreditorLoanIntroductionStore);


appDispatcher.register(function(payload){
    switch(payload.actionName){
        case "creditorLoanIntroduction_getDataFromServer":
            ajax({
                ciUrl:"/invest/v2/creditorTransferDetail",
                data:{
                    investId:payload.data.productId
                },
                success:function(rs){
                    if(rs.code === 0){
                        let data=rs.data;
                        let source={
                            id:data.creditorId,
                            loanId:data.loanId,
                            type:"creditor_product",
                            productApr:data.yearRate,
                            buyProgress:data.buyProgress,
                            remainAmount:data.amount-data.investAmount,
                            repaymentLimit:data.overplusTime,
                            repaymentTypeUnit:"天",
                            totalAmount:data.amount,
                            productName:data.title,
                            status:data.status,
                            publishTime:data.createTime ,//这是一个时间戳
                            bidDays:7,//债权转让默认是7天后就"流标"
                            mainMonth:data.mainMonth,//剩余未还息期限
                            minNotRateTime:data.minNotRateTime,//最低未还息时间
                            maxNotRateTime:data.maxNotRateTime,//最高未还息时间
                            rewardRate:data.rewardRate || 0,
                            vipRaiseRate:data.vipRaiseRate || 0,
                            repayType:data.repayType,
                            nowPeriodNo:data.nowPeriodNo,//当前期数(整数类型)
                            days:data.days,//当前时间与最近一期还款相差天数(整数类型)
                            sumPeriodNo:data.sumPeriodNo, //投资总期限(整数类型)
                            repaymentPeriod:data.repaymentPeriod
                        };
                        CreditorLoanIntroductionStore.setAll(CreditorLoanIntroductionStore.processData(source));
                        CreditorLoanIntroductionStore.trigger("change");
                    }else {
                        CreditorLoanIntroductionStore.trigger("getDataFailed");
                    }
                }
            });
            break;
        default:
        //no op
    }
});

module.exports=CreditorLoanIntroductionStore;
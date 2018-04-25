let MicroEvent = require('../lib/microevent.js');
let appDispatcher=require('../dispatcher/dispatcher.js');
let ajax=require("../lib/ajax.js");


let  MoonLoanIntroductionStore={
    _all:{
        id:"",
        type:"rich",
        productApr:0,
        buyProgress:0,
        remainAmount:0,
        repaymentLimit:0,
        repaymentTypeUnit:"个月",
        totalAmount:0,
        productName:"",
        publishTime:0//这个值应该是数字类型的时间戳
    },
    setAll(source){
        Object.assign(this._all,source);
    },
    getAll(){
        return this._all;
    },
    clearAll(){
        this._all={
            rateList:[]
        };
    },
    processData(data){
        data.buyProgress=(data.buyProgress * 100).toFixed(2) + "%";
        data.productApr=(data.productApr * 100).toFixed(1);
        data.remainAmount=data.remainAmount.toFixed(2);
        return data;
    }
};
MicroEvent.mixin(MoonLoanIntroductionStore);


appDispatcher.register(function(payload){
    switch(payload.actionName){
        case "moonLoanIntroductionAction_getDataFromServer":
            ajax({
                ciUrl:"/forever/v2/detail.do",
                data:{
                    productId:payload.data.productId
                },
                success:function(rs){
                    if(rs.code === 0){
                        let data=rs.data;
                        let source={
                            id:data.productId,
                            type:"moon",
                            minRate:data.minRate,
                            maxRate:data.maxRate,
                            buyProgress:data.buyProgress,
                            remainAmount:data.remainAmount,
                            totalAmount:data.totalAmount,
                            repaymentLimit:data.repaymentMonths,
                            repaymentTypeUnit:"个月",
                            productName:data.title,
                            status:data.status === "pre_publish" ? "prepublish" : data.status,
                            publishTime:data.publishTimeL,//这是一个时间戳
                            publistTimeStr:data.publishTime,//项目发布时间
                            preInterestDateStr:data.preInterestDate,//预计起息时间
                            preRepayDateStr:data.preRepayDate,//预计还款时间
                            rateList:data.rateList,
                            isZXProduct:data.isZx === "yes" ? true : false,
                            isSupportAdvanceRepayment:data.is_support_advance_repayment === "yes" ? true : false,
                            isTransferedCreditor:data.isTransferCreditor === "yes" ? true : false//这个字段是用来标记是否是债转的月满盈或丰收盈
                        };
                        MoonLoanIntroductionStore.setAll(MoonLoanIntroductionStore.processData(source));
                        MoonLoanIntroductionStore.trigger("change");
                    }else {
                        MoonLoanIntroductionStore.trigger("getDataFailed");
                    }
                }
            });
            break;
        default:
        //no op
    }
});

module.exports=MoonLoanIntroductionStore;
let MicroEvent = require('../lib/microevent.js');
let appDispatcher=require('../dispatcher/dispatcher.js');
let ajax=require("../lib/ajax.js");


let  FixedLoanIntroductionStore={
    _all:{
        id:"",
        type:"loan_product",
        productApr:0,
        buyProgress:0,
        remainAmount:0,
        repaymentLimit:0,
        repaymentTypeUnit:"个月",
        totalAmount:0,
        productName:"",
        bidDays:0,
        publishTime:new Date(),
        status:""
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
MicroEvent.mixin(FixedLoanIntroductionStore);


appDispatcher.register(function(payload){
    switch(payload.actionName){
        case "fixedLoanIntroduction_getDataFromServer":
            ajax({
                ciUrl:"/invest/v2/loanInvestDetail",
                data:{
                    loanId:payload.data.productId
                },
                success:function(rs){
                    if(rs.code === 0){
                        let data=rs.data;
                        let source={
                            id:data.id,
                            type:"loan_product",
                            productApr:data.yearRate,
                            buyProgress:data.proess,
                            remainAmount:data.remainAmount,
                            repaymentLimit:data.repaymentMonths,
                            repaymentTypeUnit:data.loanTypeUnit,
                            totalAmount:data.amount,
                            productName:data.title,
                            status:data.status,
                            bidDays:data.bidDays,
                            publishTime:data.publishTime,
                            rewardRate:data.rewardRate
                        };
                        FixedLoanIntroductionStore.setAll(FixedLoanIntroductionStore.processData(source));
                        FixedLoanIntroductionStore.trigger("change");
                    }else {
                        FixedLoanIntroductionStore.trigger("getDataFailed");
                    }
                }
            });
            break;
        default:
        //no op
    }
});

module.exports=FixedLoanIntroductionStore;
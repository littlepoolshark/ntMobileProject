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
        publishTime:new Date()
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
                            bidDays:7//债权转让默认是7天后就"流标"
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
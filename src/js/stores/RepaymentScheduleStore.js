var MicroEvent = require('../lib/microevent.js');
var appDispatcher=require('../dispatcher/dispatcher.js');
var ajax=require("../lib/ajax.js");


var RepaymentScheduleStore={
    _all:{
        loanInfo:{},
        list:[]
    },
    getAll(){
        return this._all;
    },
    clearAll(){
        this._all={
            loanInfo:{},
            list:[]
        };
    },
    updateAll(source){
        this._all=Object.assign(this._all,source);
    }
};
MicroEvent.mixin(RepaymentScheduleStore);


appDispatcher.register(function(payload){
    switch(payload.actionName){
        case "getRepaymentScheduleData":
            let postData={
                loanId:payload.data.loanId
            };
            if(!!payload.data.creditorId){//加入中的标的，债权转让标的都不需要发送creditorId这个参数
                postData.creditorId=payload.data.creditorId;
            }
            ajax({
                ciUrl:"/invest/v2/myCreditorRecordDetail",
                data:postData,
                success(rs){
                    if(rs.code === 0){
                        RepaymentScheduleStore.updateAll({
                            loanInfo:rs.data.loanInfo,
                            list:!!rs.data.records ? rs.data.records : []
                        });
                        RepaymentScheduleStore.trigger("change");
                    }

                }
            })
            break;
        default:
        //no op
    }
});

module.exports=RepaymentScheduleStore;
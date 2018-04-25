var MicroEvent = require('../lib/microevent.js');
var appDispatcher=require('../dispatcher/dispatcher.js');
var ajax=require("../lib/ajax.js");


var WithdrawApplySuccessHintStore={
    _all:{
        withdrawAmount: "--",
        handlingCharge: "--",
        acctAccount: "--",
        withdrawReasonId:0,
        withdrawId:""
    },
    getAll(){
        return this._all;
    },
    updateAll(source){
        this._all=Object.assign(this._all,source);
    },
    clearAll(){
        this._all={
            withdrawAmount: "--",
            handlingCharge: "--",
            acctAccount: "--",
            withdrawReasonId:0,
            withdrawId:""
        };
    }
};
MicroEvent.mixin(WithdrawApplySuccessHintStore);


appDispatcher.register(function(payload){
    switch(payload.actionName){
        case "getInitialData_WASH":
            WithdrawApplySuccessHintStore.updateAll(payload.data);
            WithdrawApplySuccessHintStore.trigger("change");
            break;
        case "selectWithdrawReason_WASH":
            WithdrawApplySuccessHintStore.updateAll({
                withdrawReasonId:payload.data.reasonId
            });
            WithdrawApplySuccessHintStore.trigger("change");
            break;  
        case "submitSurvey_WASH":

            let {
                withdrawId,
                withdrawReasonId
            }=WithdrawApplySuccessHintStore.getAll();

            ajax({
                ciUrl:"/withdraws/v2/withdrawReason.do",
                data:{
                    reasonId:withdrawReasonId,
                    withdrawId:withdrawId
                },
                success(rs){
                    if(rs.code === 0){
                        WithdrawApplySuccessHintStore.trigger("submitSurveySuccess");
                    }else {
                        WithdrawApplySuccessHintStore.trigger("submitSurveyFailed",rs.description);
                    }
                }
            })
            break;    
        default:
        //no op
    }
});

module.exports=WithdrawApplySuccessHintStore;
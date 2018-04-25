var MicroEvent = require('../lib/microevent.js');
var appDispatcher=require('../dispatcher/dispatcher.js');
var ajax=require("../lib/ajax.js");

var AssignmentOfDebtStore={
    _all:{
        creditorId:"",//债权id
        investAmount:0,//转让的金额
        dealPassword:"",//交易密码
        transferPrice: 0,//转让价格
        leftprincipal: 0,//剩余本金
        sxfee:0,//手续费
        bqdj: 0,//本期待结收益
        loanTitle: 0,//标的名称
        dsbx: 0,//待收本息
        isAutoAssign:false,//是否已经授权平台自动签约
        dealPassword:""
    },
    getAll(){
        return this._all;
    },
    updateAll(source){
        this._all=Object.assign(this._all,source);
    }
};
MicroEvent.mixin(AssignmentOfDebtStore);

appDispatcher.register(function(payload){
    switch(payload.actionName){
        case "getCreditorLoanData_assignmentOfDebt":
            ajax({
                ciUrl:"/invest/v2/creditorTransferConfirm",
                data:{
                  creditorId:payload.data.creditorId
                },
                success(rs){
                    if(rs.code === 0){
                        AssignmentOfDebtStore.updateAll(Object.assign(rs.data,{isAutoAssign:rs.data.autoStamp === "1"}));
                        AssignmentOfDebtStore.trigger("change");
                    }
                }
            });
            break;
        case "submitDebtAssignmentForm":
            let {
                creditorId,
                transferPrice,
                dealPassword
                }=AssignmentOfDebtStore.getAll();
            ajax({
                ciUrl:"/invest/v2/creditorTransfer",
                data:{
                    creditorId:creditorId,
                    amount:transferPrice,
                    dealPwd:dealPassword
                },
                success(rs){
                    if(rs.code === 0){
                        AssignmentOfDebtStore.trigger("DebtAssignmentSuccess");
                    }else {
                        AssignmentOfDebtStore.trigger("DebtAssignmentFailed",rs.description);
                    }
                }
            });
            break;
        case "assignAgreement_aod":
        ajax({
            ciUrl:"/invest/v2/isSign",
            success(rs) {
              if (rs.code === 0) {
                AssignmentOfDebtStore.updateAll({
                  isAutoAssign:true
                });
                AssignmentOfDebtStore.trigger("assignAgreementSuccess");
              } else {
                AssignmentOfDebtStore.trigger("assignAgreementFailed", rs.description);
              }
            }
          });
        break;
        case "changeDealPassword_aod":
            AssignmentOfDebtStore.updateAll({
                dealPassword:payload.data.dealPassword
            });
            AssignmentOfDebtStore.trigger("change");
          break;
        default:
        //no op
    }
});

module.exports=AssignmentOfDebtStore;
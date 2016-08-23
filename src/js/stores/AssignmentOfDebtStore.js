var MicroEvent = require('../lib/microevent.js');
var appDispatcher=require('../dispatcher/dispatcher.js');
var ajax=require("../lib/ajax.js");

var AssignmentOfDebtStore={
    _all:{
        creditorId:"",//债权id
        investAmount:0,//转让的金额
        dealPassword:"",//交易密码
        transferPrice: "----",//转让价格
        leftprincipal: "----",//剩余本金
        sxfee:"----",//手续费
        bqdj: "----",//本期待结收益
        loanTitle: "----",//标的名称
        dsbx: "----"//待收本息
    },
    getAll(){
        return this._all;
    },
    upDateAll(source){
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
                        AssignmentOfDebtStore.upDateAll(rs.data);
                        AssignmentOfDebtStore.trigger("change");
                    }
                }
            });
            break;
        case "submitDebtAssignmentForm":
            AssignmentOfDebtStore.upDateAll({
                dealPassword:payload.data.dealPassword
            });
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
                        AssignmentOfDebtStore.trigger("DebtAssignmentFailed",rs.descriptionnew);
                    }
                }
            });
            break;
        default:
        //no op
    }
});

module.exports=AssignmentOfDebtStore;
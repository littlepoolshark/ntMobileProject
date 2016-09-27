var MicroEvent = require('../lib/microevent.js');
var appDispatcher=require('../dispatcher/dispatcher.js');
var ajax=require("../lib/ajax.js");
var UserHomeStore=require("./UserHomeStore");


var WithdrawStore={
    _all:{
        withdrawAmount:0,
        dealPassword:"",
        handlingCharge:2,//手续费硬编码为2元
        acctAccount:0,//实际到账
        bankCardInfo:{},
        available:0
    },
    getAll(){
        return this._all;
    },
    checkForm(){
        let {
            withdrawAmount,
            dealPassword,
            available
            }=this._all;
        let validationResult={
            success:true,
            msg:""
        };
        if(withdrawAmount < 2){
            validationResult={
                success:false,
                msg:"提现金额不能低于2.00元"
            };
        }else if(withdrawAmount > 2000000){
            validationResult={
                success:false,
                msg:"提现金额不能大于2000000元"
            };
        }else if(dealPassword === ""){
            validationResult={
                success:false,
                msg:"交易密码不能为空"
            };
        }
        return validationResult;
    },
    _figOutAcctAccount(){
        this._all.acctAccount=this._all.withdrawAmount -  this._all.handlingCharge;
    },
    updateAll(source){
       this._all=Object.assign(this._all,source);
       this._figOutAcctAccount();
    },
    clearAll(){
        this._all.withdrawAmount=0;
    }
};
MicroEvent.mixin(WithdrawStore);


appDispatcher.register(function(payload){
    switch(payload.actionName){
        case "getBankCardInfoFromServer_withdraw":
            ajax({
                ciUrl:"/user/v2/myBankCardInfo",
                success(rs){
                    if(rs.code === 0){
                        WithdrawStore.updateAll({
                            bankCardInfo:rs.data
                        });
                        WithdrawStore.trigger("change");
                    }
                }
            });
            break;
        case "getUserBalance_withdraw":
            ajax({
                ciUrl: "/user/v2/myUserInfo",
                success(rs){
                    if (rs.code === 0) {
                        WithdrawStore.updateAll({
                            available: rs.data.available
                        });
                        WithdrawStore.trigger("change");
                    }
                }
            });
            break;
        case "withdrawAmountChange":
            WithdrawStore.updateAll({
                withdrawAmount:payload.data.withdrawAmount
            });
            WithdrawStore.trigger("change");
            break;
        case "submitWithdrawForm":
            WithdrawStore.updateAll({
                dealPassword:payload.data.dealPassword
            });
            let formCheckResult=WithdrawStore.checkForm();
            if(formCheckResult.success){
                WithdrawStore.trigger("confirmSubmit");
            }else {
                WithdrawStore.trigger("formCheckFailed",formCheckResult.msg);
            }
            break;
        case "confirmToSubmitWithdrawForm":
            let {
                withdrawAmount,
                dealPassword
                }=WithdrawStore.getAll();
            ajax({
                ciUrl:"/user/v2/capitalWithdrawCash",
                data:{
                    amount:withdrawAmount,
                    dealPwd:dealPassword
                },
                 success(rs){
                     if(rs.code === 0){
                        WithdrawStore.trigger("withdrawSuccess");
                     }else {
                        WithdrawStore.trigger("withdrawFailed",rs.description);
                     }
                 }
             });
            break;
        default:
        //no op
    }
});

module.exports=WithdrawStore;
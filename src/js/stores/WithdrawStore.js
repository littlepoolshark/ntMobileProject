var MicroEvent = require('../lib/microevent.js');
var appDispatcher=require('../dispatcher/dispatcher.js');
var ajax=require("../lib/ajax.js");
var UserHomeStore=require("./UserHomeStore");


var WithdrawStore={
    _all:{
        withdrawAmount:0,
        dealPassword:"",
        handlingCharge:2,//手续费硬编码为2元
        acctAccount:0//实际到账
    },
    getAll(){
        return this._all;
    },
    checkForm(){
        let {
            withdrawAmount,
            dealPassword
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
    }
};
MicroEvent.mixin(WithdrawStore);


appDispatcher.register(function(payload){
    switch(payload.actionName){
        case "withdrawAmountChange":
            WithdrawStore.updateAll({
                withdrawAmount:payload.data.withdrawAmount
            });
            WithdrawStore.trigger("change");
            break;
        case "submitWithdrawForm":
            appDispatcher.waitFor([UserHomeStore.dispatchToken]);

            if(UserHomeStore.checkDealPasswordSet()){
                WithdrawStore.updateAll({
                    dealPassword:payload.data.dealPassword
                });
                let formCheckResult=WithdrawStore.checkForm();
                if(formCheckResult.success){
                    ajax({
                        ciUrl:"/user/v2/capitalWithdrawCash",
                        success(rs){
                            if(rs.code === 0){
                                WithdrawStore.trigger("withdrawSuccess");
                            }else {
                                WithdrawStore.trigger("withdrawFailed",rs.description);
                            }
                        }
                    });
                }else {
                    WithdrawStore.trigger("formCheckFailed",formCheckResult.msg);
                }
            }else {
                WithdrawStore.trigger("dealPasswordIsNotSet");
            }
            break;
        default:
        //no op
    }
});

module.exports=WithdrawStore;
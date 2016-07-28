var MicroEvent = require('../lib/microevent.js');
var appDispatcher=require('../dispatcher/dispatcher.js');
var ajax=require("../lib/ajax.js");

import config from "../config";

var RechargeStore={
    _all:{
        id:"",
        bankName:"----",
        cardno:"**** **** **** ****",
        shortIcon:"",
        rechargeAmount:0
    },
    getAll(){
        return this._all;
    },
    updateAll(source){
      this._all=Object.assign(this._all,source);
    },
    checkRechargeAmount(){
        let validationResult={
            success:true,
            msg:""
        };

        if(this._all.rechargeAmount <= 10){
            validationResult={
                success:false,
                msg:"充值金额必须大于10元"
            }
        }

        return validationResult;
    }
};
MicroEvent.mixin(RechargeStore);


appDispatcher.register(function(payload){
    switch(payload.actionName){
        case "getBankCardInfoFromServer":
            ajax({
                ciUrl:"/user/v2/myBankCardInfo",
                success(rs){
                    if(rs.code === 0){
                        RechargeStore.updateAll(rs.data);
                        RechargeStore.trigger("change");
                    }
                }
            });
            break;
        case "submitRechargeAmount":
            let  rechargeAmountCheckResult=RechargeStore.checkRechargeAmount();
            if(rechargeAmountCheckResult.success){
                ajax({
                    ciUrl:"/user/v2/capitalRecharge",
                    data:{
                        amount:RechargeStore.getAll().rechargeAmount,
                        paymentName:"LIANLIAN_MOBILE",//手机端的连连支付
                        bankCardId:RechargeStore.getAll().id
                    },
                    success(rs){
                        if(rs.code === 0){
                            RechargeStore.updateAll(rs.data);
                            RechargeStore.trigger("rechargeSuccess");
                        }else {
                            RechargeStore.trigger("rechargeFailed",rs.description);
                        }
                    }
                });
            }else {
                RechargeStore.trigger("rechargeAmountCheckFailed",rechargeAmountCheckResult.msg);
            }
            break;
        case "rechargeAmountChange":
            RechargeStore.updateAll({rechargeAmount:payload.data.rechargeAmount});
            RechargeStore.trigger("change");
            break;
        default:
        //no op
    }
});

module.exports=RechargeStore;
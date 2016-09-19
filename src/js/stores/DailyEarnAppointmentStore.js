var MicroEvent = require('../lib/microevent.js');
var appDispatcher=require('../dispatcher/dispatcher.js');
var ajax=require("../lib/ajax.js");
var cookie=require("../lib/cookie.js");

var DailyEarnAppointmentStore={
    _all:{
        purchaseMaximum:100000,//天天赚个人持有中总限额
        userInTotal:0,//用户已（转入）购买的天天赚的总额
        purchaseAmount:0,//用户输入购买的金额
        investMaximum:0,//个人投资限额
        orderAmount:0,//预约中的金额
        userBalance:0//账户余额
    },
    _setAll(source){
        Object.assign(this._all,source);
    },
    getAll(){
        return this._all;
    },
    _updateInvestMaximum(){
        let {
            userInTotal,
            purchaseMaximum,
            investMaximum,
            orderAmount
            }=this._all;
        investMaximum=purchaseMaximum - userInTotal - orderAmount ;
        this._all.investMaximum=investMaximum;
    },
    figureOutUsableAmount(){
        let {
            investMaximum,
            userBalance
            }=this._all;
        userBalance=userBalance - (userBalance % 100);
        return userBalance > investMaximum ? investMaximum : userBalance;
    },
    appointmentCheck(){
        let {
            purchaseAmount
            }=this._all;
        let validationResult={
            success:true,
            msg:""
        };
        if(purchaseAmount === 0){
            validationResult={
                success:false,
                msg:"预约金额不能为空，请输入！"
            }
        }else if(purchaseAmount < 100 ){
            validationResult={
                success:false,
                msg:"预约金额不能小于100，100元起投！"
            }
        }else if(purchaseAmount % 100){
            validationResult={
                success:false,
                msg:"预约金额要求是100的整数倍！"
            }
        }

        return validationResult;
    },
    updateAll(source){
        this._setAll(source);
        this._updateInvestMaximum();
    },
    clearAll(){
        this._all.purchaseAmount=0;
    }

};
MicroEvent.mixin(DailyEarnAppointmentStore);


appDispatcher.register(function(payload){
    switch(payload.actionName){
        case "changeAppointmentAmount":
            DailyEarnAppointmentStore.updateAll({
                purchaseAmount:payload.data.purchaseAmount
            });
            DailyEarnAppointmentStore.trigger("change");
            break;
        case "dailyEarnAppointment_initializeStore":
            ajax({
                ciUrl:"/ttz/v2/account",
                success(rs){
                    if(rs.code === 0){
                        payload.data.userInTotal=rs.data.ttzUseraccountTotal.userInTotal;
                        payload.data.orderAmount=rs.data.orderAmount;
                        DailyEarnAppointmentStore.updateAll(payload.data);
                        DailyEarnAppointmentStore.trigger("change");
                    }else {
                        alert("获取数据失败！")
                    }
                }
            })
            break;
        case "cofirmTomakeAnAppointment":
            let {
                productId,
                purchaseAmount,
                productType
                }=DailyEarnAppointmentStore.getAll();
            let appointmentCheckResult=DailyEarnAppointmentStore.appointmentCheck();
            if(appointmentCheckResult.success){
                ajax({
                    ciUrl:"/invest/v2/earnProductInvest",
                    data:{
                        regularId:productId,
                        amount:purchaseAmount,
                        type:productType,
                        operType:"order"
                    },
                    success(rs){
                        if(rs.code === 0){
                            DailyEarnAppointmentStore.trigger("appointmentSuccess",rs.data);
                        }else {
                            DailyEarnAppointmentStore.trigger("appointmentFailed",rs.description);
                        }
                    }
                })
            }else {
                DailyEarnAppointmentStore.trigger("appointmentFailed",appointmentCheckResult.msg);
            }
            break;
        case "useAllBalance_dailyEarnAppointment":
            let userBalance=DailyEarnAppointmentStore.figureOutUsableAmount();
            if(userBalance !== 0){
                DailyEarnAppointmentStore.updateAll({
                    purchaseAmount:userBalance
                });
                DailyEarnAppointmentStore.trigger("change");
            }else {
                DailyEarnAppointmentStore.trigger("userBalanceIsNotEnough","账户余额不足100元，请及时充值！");
            }
            break;
        default:
        //no op
    }
});

module.exports=DailyEarnAppointmentStore;
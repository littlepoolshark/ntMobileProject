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
        if(orderAmount.indexOf(",") > -1){//把格式化后的数字中的“,”去掉
            orderAmount=orderAmount.replace(/\,/g,"");
        }
        investMaximum=purchaseMaximum - parseFloat(userInTotal) - parseFloat(orderAmount) ;
        this._all.investMaximum=investMaximum < 0 ? 0 : investMaximum;//对于白名单即vip用户，投资限额有可能为负数。若为负数则显示为0；
    },
    figureOutUsableAmount(){
        let {
            investMaximum,
            userBalance
            }=this._all;
        userBalance=userBalance - (userBalance % 100);
        //return userBalance > investMaximum ? investMaximum : userBalance;//全面放宽预约，即是不验证预约金额是否超过个人投资限额
        return userBalance;
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
    isBindBankCardCheck(){
        return this._all.hadBindBankCard === false ? false : true;
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
            });

            //获取银行卡信息，以此来判断用户是否已经绑卡
            ajax({
                ciUrl:"/user/v2/myBankCardInfo",
                success(rs){
                    if(rs.code === 0){
                        let hadBindBankCard;
                        if(rs.data === null){
                            hadBindBankCard=false;
                        }else{
                            hadBindBankCard=true;
                        }
                        DailyEarnAppointmentStore.updateAll({
                            hadBindBankCard:hadBindBankCard
                        });
                    }
                }
            });

            break;
        case "cofirmTomakeAnAppointment":
            if(DailyEarnAppointmentStore.isBindBankCardCheck()){
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
            }else {
                DailyEarnAppointmentStore.trigger("hadNotBindBankCard");
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
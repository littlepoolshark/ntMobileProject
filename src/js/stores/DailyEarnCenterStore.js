var MicroEvent = require('../lib/microevent.js');
var appDispatcher=require('../dispatcher/dispatcher.js');
var ajax=require("../lib/ajax.js");

var DailyEarnCenterStore={
    _all:{
        ttzProductId:"",//天天赚产品id
        cyTotal:0,//天天赚个人持有中金额
        makeTotal:0,//天天赚预约中金额
        zrLixi:0,//天天赚昨日收益
        ljLixi:0,//天天赚累计收益
        ktqMoney:0//天天赚可提取收益
    },
    checkKtqMoney(){
        let validationResult={
            success:true,
            msg:""
        };

        if(parseFloat(this._all.ktqMoney) === 0){
            validationResult={
                success:false,
                msg:"您暂时没有可提取的收益！"
            };
        }
        return validationResult;
    },
    getAll(){
        return this._all;
    },
    updateAll(source){
        Object.assign(this._all,source);
    },
    updateKtqMoney(){
        this._all.ktqMoney=0;
    }
};
MicroEvent.mixin(DailyEarnCenterStore);


appDispatcher.register(function(payload){
    switch(payload.actionName){
        case "getDailyEarnCenterInfo":
            ajax({
                ciUrl:"/ttz/v2/getMyCurrentInvestment",
                success(rs){
                    if(rs.code === 0){
                        DailyEarnCenterStore.updateAll(rs.data);
                        DailyEarnCenterStore.trigger("change");
                    }
                }
            })
            break;
        case "extractDailyEarnIncome":
            let validationResult=DailyEarnCenterStore.checkKtqMoney();
            if(validationResult.success){
                ajax({
                    ciUrl:"/ttz/v2/getTtzInterest",
                    success(rs){
                        if(rs.code === 0){
                            DailyEarnCenterStore.updateKtqMoney();
                            DailyEarnCenterStore.trigger("change");
                            DailyEarnCenterStore.trigger("extractDailyEarnIncomeSuccess");
                        }else {
                            DailyEarnCenterStore.trigger("extractDailyEarnIncomeFailed",rs.description);
                        }
                    }
                })
            }else {
                DailyEarnCenterStore.trigger("extractDailyEarnIncomeFailed",validationResult.msg);
            }
            break;
        default:
        //no op
    }
});

module.exports=DailyEarnCenterStore;
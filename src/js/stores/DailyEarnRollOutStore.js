var MicroEvent = require('../lib/microevent.js');
var appDispatcher=require('../dispatcher/dispatcher.js');
var ajax=require("../lib/ajax.js");

var DailyEarnRollOutStore={
    _all:{
        sysAmount:0,//天天赚今日可转出金额
        totoalIn:0,//天天赚总的持有中金额
        rollOutAmount:0//用户即将要转出的金额
    },
    checkRollOut(){
        let validationResult={
            success:true,
            msg:""
        };
        let {
            sysAmount,
            totoalIn,
            rollOutAmount
            }=this._all;

        if( rollOutAmount === 0){
            validationResult={
                success:false,
                msg:"转出金额不能为0或者空！"
            };
        }else if(rollOutAmount < 100 ){
            validationResult={
                success:false,
                msg:"转出金额不能小于100，100元起投！"
            }
        }else if(rollOutAmount % 100){
            validationResult={
                success:false,
                msg:"转出金额要求是100的整数倍！"
            }
        }else if(rollOutAmount > totoalIn){
            validationResult={
                success:false,
                msg:"转出金额不能大于当前可转出金额！"
            }
        }else if(rollOutAmount >  sysAmount){
            validationResult={
                success:false,
                msg:"转出金额不能大于今日平台可转额度！"
            }
        }
        return validationResult;
    },
    getAll(){
        return this._all;
    },
    updateAll(source){
        Object.assign(this._all,source);
    }
};
MicroEvent.mixin(DailyEarnRollOutStore);


appDispatcher.register(function(payload){
    switch(payload.actionName){
        case "getDailyEarnRollOutInfo":
            ajax({
                ciUrl:"/ttz/v1/outInput",
                success(rs){
                   if(rs.code === 0){
                       DailyEarnRollOutStore.updateAll(rs.data);
                       DailyEarnRollOutStore.trigger("change");
                   }
                }
            })
            break;
        case "rollOutAmountChange":
            DailyEarnRollOutStore.updateAll({
                rollOutAmount:payload.data.rollOutAmount
            });
            DailyEarnRollOutStore.trigger("change");
            break;
        case "rollOutDailyEarn":
            let validationResult=DailyEarnRollOutStore.checkRollOut();
            let rollOutAmount=DailyEarnRollOutStore.getAll().rollOutAmount;
            if(validationResult.success){
                ajax({
                    ciUrl:"/ttz/v2/redeming",
                    data:{
                        amount:rollOutAmount
                    },
                    success(rs){
                        if(rs.code === 0){
                            DailyEarnRollOutStore.trigger("rollOutSuccess",rollOutAmount);
                        }else {
                            DailyEarnRollOutStore.trigger("rollOutFailed",rs.description);
                        }
                    }
                })
            }else {
                DailyEarnRollOutStore.trigger("rollOutFailed",validationResult.msg);
            }
            break;
        default:
        //no op
    }
});

module.exports=DailyEarnRollOutStore;
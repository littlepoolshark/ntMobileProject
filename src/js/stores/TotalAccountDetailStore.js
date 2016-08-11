var MicroEvent = require('../lib/microevent.js');
var appDispatcher=require('../dispatcher/dispatcher.js');
var ajax=require("../lib/ajax");

var TotalAccountDetailStore={
    _all:{
        total:0,//总资产
        ttzAmount:0,//定期资产
        dqAmount:0,//活期资产
        available:0,//可用余额
        jrAmount:0,//加入(投资)中金额
        withdraw :0//提现中金额
    },
    _figureOutDqAmount(){
        let {
            dqAmount,
            hctAmount,
            zqAmount,
            newBieAmount,
            yyzAmount,
            jjzAmount
            }=this._all;
        dqAmount=(hctAmount + zqAmount +  newBieAmount + yyzAmount + jjzAmount).toFixed(2);
        this._all.dqAmount=parseFloat(dqAmount);
    },
    _figureOutJrAmount(){
        let {
            jrAmount,
            locked,
            withdraw
            }=this._all;
        jrAmount=(locked - withdraw).toFixed(2);
        this._all.jrAmount=parseFloat(jrAmount);
    },
    updateAll(source){
        this._all=Object.assign(this._all,source);
        this._figureOutDqAmount();
        this._figureOutJrAmount();
    },
    getAll(){
        return {
            total:this._all.total,
            ttzAmount:this._all.ttzAmount,
            dqAmount:this._all.dqAmount,
            available:this._all.available,
            jrAmount:this._all.jrAmount,
            withdraw:this._all.withdraw
        }
    }
};
MicroEvent.mixin(TotalAccountDetailStore);


appDispatcher.register(function(payload){
    switch(payload.actionName){
        case "getAccountInfoFromServer_totalAccountDetail":
            ajax({
                ciUrl:"/user/v2/userInfoDetail",
                success(rs){
                    if(rs.code === 0){
                        TotalAccountDetailStore.updateAll(rs.data.accountInfo);
                        TotalAccountDetailStore.trigger("change");
                    }
                }
            })
            break;
        default:
        //no op
    }
});

module.exports=TotalAccountDetailStore;
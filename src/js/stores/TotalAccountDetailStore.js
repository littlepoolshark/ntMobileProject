var MicroEvent = require('../lib/microevent.js');
var appDispatcher=require('../dispatcher/dispatcher.js');
var ajax=require("../lib/ajax");

var TotalAccountDetailStore={
    _all:{
        asset:0,//总资产
        moonAmount:0,//月满盈资产
        ttzAmount:0,//定期资产
        dqAmount:0,//活期资产
        availabeAmount:0,//可用余额
        joinAmount:0,//加入(投资)中金额
        withdrawAmount :0//提现中金额
    },
    updateAll(source){
        this._all=Object.assign(this._all,source);
    },
    getAll(){
        return this._all;
    }
};
MicroEvent.mixin(TotalAccountDetailStore);


appDispatcher.register(function(payload){
    switch(payload.actionName){
        case "getAccountInfoFromServer_totalAccountDetail":
            ajax({
                ciUrl:"/user/v2/personAsset",
                success(rs){
                    if(rs.code === 0){
                        TotalAccountDetailStore.updateAll(rs.data);
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
var MicroEvent = require('../lib/microevent.js');
var appDispatcher=require('../dispatcher/dispatcher.js');
var ajax=require("../lib/ajax.js");

var InviteRewardStore={
    _all:{
        totalReward:"----",
        currMonthReward:"----"
    },
    getAll(){
        return this._all;
    },
    updateAll(source){
        this._all=Object.assign(this._all,source);
    }
};
MicroEvent.mixin(InviteRewardStore);

appDispatcher.register(function(payload){
    switch(payload.actionName){
        case "getInviteRewardData":
            ajax({
                ciUrl:"/user/v2/myRecommendStat",
                success(rs){
                    if(rs.code === 0){
                        InviteRewardStore.updateAll({
                            totalReward:rs.data.statData.totalReward,
                            currMonthReward:rs.data.statData.currMonthReward,
                            link:rs.data.link
                        });
                        InviteRewardStore.trigger("change");
                    }
                }
            });
            break;
        default:
        //no op
    }
});

module.exports=InviteRewardStore;
var MicroEvent = require('../lib/microevent.js');
var appDispatcher=require('../dispatcher/dispatcher.js');
var ajax=require("../lib/ajax.js");

import config from "../config";

var RewardDetailListStore={
    _all:{
        rewardDetailList:[],
        pageIndex:0
    },
    getRewardDetailList(){
        return this._all.rewardDetailList;
    },
    clearAll(){
        this._all={
            rewardDetailList:[],
            pageIndex:0
        };
    },
    getCurrPageIndex(){
        return this._all.pageIndex;
    },
    updateAll(source){
        this._all.rewardDetailList=this._all.rewardDetailList.concat(source.rewardDetailList);
        this._all.pageIndex=source.pageIndex;
    }
};
MicroEvent.mixin(RewardDetailListStore);


appDispatcher.register(function(payload){
    switch(payload.actionName){
        case "rewardDetailList_getNextPage":
            ajax({
                ciUrl:"/user/v2/myRecommendRewardDetail",
                data:{
                    reqPageNum:RewardDetailListStore.getCurrPageIndex() +1,
                    maxResults:20
                },
                success(rs){
                    if(rs.code === 0){
                        if(rs.data.pageIndex === 1 && rs.data.list.length === 0){
                            RewardDetailListStore.trigger("noDataTemporally")
                        }else {
                            RewardDetailListStore.updateAll({
                                rewardDetailList:rs.data.list,
                                pageIndex:rs.data.pageIndex
                            });
                            RewardDetailListStore.trigger("change");
                        }
                    }
                }
            });
            break;
        default:
        //no op
    }
});

module.exports=RewardDetailListStore;
var MicroEvent = require('../lib/microevent.js');
var appDispatcher=require('../dispatcher/dispatcher.js');
var ajax=require("../lib/ajax.js");

import config from "../config";

var MyInviteFriendDetailStore={
    _all:{
        sharePercent:0,//奖励比例
        inviteFriendCount:0,//推荐好友数
        inviteFriendAmount:0,//好友累计投资金额
        myInviteFriendList:[],
        myInviteFriendPageIndex:0
    },
    getCurrPageIndex(){
        return this._all.myInviteFriendPageIndex;
    },
    getAll(){
        return this._all;
    },
    clearAll(){
        this._all={
            sharePercent:0,//奖励比例
            inviteFriendCount:0,//推荐好友数
            inviteFriendAmount:0,//好友累计投资金额
            myInviteFriendList:[],
            myInviteFriendPageIndex:0
        };
    },
    updateList(list,pageIndex){
        this._all.myInviteFriendList=this._all.myInviteFriendList.concat(list);
        this._all.myInviteFriendPageIndex=pageIndex;
    },
    updateAll(source){
        this._all=Object.assign({},this._all,source);
    }
};
MicroEvent.mixin(MyInviteFriendDetailStore);

appDispatcher.register(function(payload){
    switch(payload.actionName){
        case "getInitialData_MIFDA":
            ajax({
                ciUrl:"/user/v2/myRecommendUserLevel.do",
                success(rs){
                    if(rs.code === 0){
                        MyInviteFriendDetailStore.updateAll({
                            sharePercent:rs.data.rate,
                            inviteFriendCount:rs.data.nums,
                            inviteFriendAmount:rs.data.totalAmount
                        });
                        MyInviteFriendDetailStore.trigger("change");
                    }
                }
            });

            ajax({
                ciUrl:"/user/v2/myRecommendUserList.do",
                data:{
                    reqPageNum:1,
                    maxResults:10
                },
                success(rs){
                    if(rs.code === 0){
                        MyInviteFriendDetailStore.updateList(rs.data.list,rs.data.pageIndex);
                        MyInviteFriendDetailStore.trigger("change");
                    }
                }
            });
            break;
        case "getNextPage_MIFDA":
            let requestPageIndex=MyInviteFriendDetailStore.getAll().myInviteFriendPageIndex + 1;
            ajax({
                ciUrl:"/user/v2/myRecommendUserList.do",
                data:{
                    reqPageNum:requestPageIndex,
                    maxResults:10
                },
                success(rs){
                    if(rs.code === 0){
                        MyInviteFriendDetailStore.updateList(rs.data.list,rs.data.pageIndex);
                        MyInviteFriendDetailStore.trigger("change");
                    }
                }
            });
            break;
        default:
        //no op
    }
});

module.exports=MyInviteFriendDetailStore;
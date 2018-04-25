var MicroEvent = require('../lib/microevent.js');
var appDispatcher=require('../dispatcher/dispatcher.js');
var ajax=require("../lib/ajax.js");

import config from "../config";

var UserStoryListStore={
    _all:{
        userStoryList:[],
        pageIndex:0
    },
    getAll(){
        return this._all.userStoryList;
    },
    clearAll(){
        this._all={
            userStoryList:[],
            pageIndex:0
        };
    },
    getCurrPageIndex(){
        return this._all.pageIndex;
    },
    updateAll(source){
        this._all.userStoryList=this._all.userStoryList.concat(source.userStoryList);
        this._all.pageIndex=source.pageIndex;
    }
};
MicroEvent.mixin(UserStoryListStore);


appDispatcher.register(function(payload){
    switch(payload.actionName){
        case "getNextPage_userStoryList":
            ajax({
                ciUrl:"/platinfo/v2/articleInfoList",
                data:{
                    catId:"51",
                    reqPageNum:UserStoryListStore.getCurrPageIndex() +1,
                    maxResults:5
                },
                success(rs){
                    if(rs.code === 0){
                        if(rs.data.list.length > 0){
                            UserStoryListStore.updateAll({
                                userStoryList:rs.data.list,
                                pageIndex:rs.data.pageIndex
                            });
                            UserStoryListStore.trigger("change");
                        }
                    }
                }
            });
            break;
        default:
        //no op
    }
});

module.exports=UserStoryListStore;
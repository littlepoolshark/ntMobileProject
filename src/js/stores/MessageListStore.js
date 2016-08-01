var MicroEvent = require('../lib/microevent.js');
var appDispatcher=require('../dispatcher/dispatcher.js');
var ajax=require("../lib/ajax.js");

import config from "../config";

var MessageListStore={
    _all:{
        messageList:[],
        pageIndex:0
    },
    getAll(){
        return this._all.messageList;
    },
    clearAll(){
        this._all={
            messageList:[],
            pageIndex:0
        };
    },
    getCurrPageIndex(){
        return this._all.pageIndex;
    },
    updateAll(source){
        this._all.messageList=this._all.messageList.concat(source.messageList);
        this._all.pageIndex=source.pageIndex;
    },
    updateMessageStatus(id){
        let messageList=this._all.messageList;
        for(let i=0;i<messageList.length;i++){
            if(messageList[i].id === id){
                messageList[i].flag="read";
                break;
            }
        }
    }
};
MicroEvent.mixin(MessageListStore);


appDispatcher.register(function(payload){
    switch(payload.actionName){
        case "MessageList_getNextPage":
            ajax({
                ciUrl:"/user/v2/letterList",
                data:{
                    reqPageNum:MessageListStore.getCurrPageIndex() +1
                },
                success(rs){
                    if(rs.code === 0){
                        MessageListStore.updateAll({
                            messageList:rs.data.list,
                            pageIndex:rs.data.pageIndex
                        });
                        MessageListStore.trigger("change");
                    }
                }
            });
            break;
        case "MessageList_readMessage":
            MessageListStore.updateMessageStatus(payload.data.id);
            MessageListStore.trigger("change");
            ajax({
                ciUrl:"/user/v2/letterForChange",
                data:{
                    letterIds:payload.data.id+"",
                    updateStatus:payload.data.flag
                },
                success(rs){
                    if(rs.code === 0){
                        console.log("/user/v2/letterForChange接口数据提交成功！")
                    }
                }
            });
            break;
        default:
        //no op
    }
});

module.exports=MessageListStore;
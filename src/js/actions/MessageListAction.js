var appDispatcher=require("../dispatcher/dispatcher.js");

var MessageListAction={
    getNextPage(){
        appDispatcher.dispatch({
            actionName:"MessageList_getNextPage",
        })
    },
    readMessage(id,flag){
        appDispatcher.dispatch({
            actionName:"MessageList_readMessage",
            data:{
                id:id,
                flag:flag
            }
        })
    }
};

module.exports=MessageListAction;
var appDispatcher=require("../dispatcher/dispatcher.js");

var UserStoryListAction={
    getNextPage(){
        appDispatcher.dispatch({
            actionName:"getNextPage_userStoryList",
        })
    }
};

module.exports=UserStoryListAction;
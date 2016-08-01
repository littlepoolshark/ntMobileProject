var appDispatcher=require("../dispatcher/dispatcher.js");

var RewardDetailListAction={
    getNextPage(){

        appDispatcher.dispatch({
            actionName:"rewardDetailList_getNextPage"
        })
    }
};

module.exports=RewardDetailListAction;
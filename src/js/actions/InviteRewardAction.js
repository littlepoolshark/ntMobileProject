var appDispatcher=require("../dispatcher/dispatcher.js");

var InviteRewardAction={
    getInviteRewardData(){
        appDispatcher.dispatch({
            actionName:"getInviteRewardData"
        });
    }
};

module.exports=InviteRewardAction;
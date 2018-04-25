var appDispatcher=require("../dispatcher/dispatcher.js");

var MyInviteFriendDetailAction={
    getInitialData(){
        appDispatcher.dispatch({
            actionName:"getInitialData_MIFDA"
        });
    },
    getNextPage(){
        appDispatcher.dispatch({
            actionName:"getNextPage_MIFDA"
        });
    }
};

module.exports=MyInviteFriendDetailAction;
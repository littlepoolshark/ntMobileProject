var appDispatcher=require("../dispatcher/dispatcher.js");

var UserHOmeAction={
    getInitailDataFromServer (){
        appDispatcher.dispatch({
            actionName:"getInitailDataFromServer_userHome"
        });
    },
    getUserInfoDetail(){
        appDispatcher.dispatch({
            actionName:"getUserInfoDetail"
        });
    },
    getBankCardInfo(){
        appDispatcher.dispatch({
            actionName:"getBankCardInfo"
        });
    },
    recharge(){
        appDispatcher.dispatch({
            actionName:"recharge"
        });
    },
    withdraw(){
        appDispatcher.dispatch({
            actionName:"withdraw"
        });
    }
};

module.exports=UserHOmeAction;
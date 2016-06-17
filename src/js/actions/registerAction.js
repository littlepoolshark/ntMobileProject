var appDispatcher=require("../dispatcher/dispatcher.js");

var RegisterAction={
    register (account,phoneNo){
        appDispatcher.dispatch({
            actionName:"register",
            data:{
                account:account,
                phoneNo:phoneNo
            }
        })

    }
};

module.exports=RegisterAction;
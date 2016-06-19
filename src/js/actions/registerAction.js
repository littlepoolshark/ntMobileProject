var appDispatcher=require("../dispatcher/dispatcher.js");

var RegisterAction={
    register (account,password){
        appDispatcher.dispatch({
            actionName:"register",
            data:{
                account:account,
                password:password
            }
        })

    }
};

module.exports=RegisterAction;
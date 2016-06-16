var appDispatcher=require("../dispatcher/dispatcher.js");

var DefaultAction={
    login(account,password){
        appDispatcher.dispatch({
            actionName:"login",
            data:{
                account:account,
                password:password
            }
        })

    }
};

module.exports=DefaultAction;
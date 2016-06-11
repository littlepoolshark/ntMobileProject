var appDispatcher=require("../dispatcher/dispatcher.js");

var DefaultAction={
    login(account,password){
        console.log("into login action");
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
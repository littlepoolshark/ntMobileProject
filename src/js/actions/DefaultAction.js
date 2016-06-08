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
        console.log("into login action");
    }
};

module.exports=DefaultAction;
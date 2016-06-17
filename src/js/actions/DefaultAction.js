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

    },
    getVerificationCode(phoneNo){
        appDispatcher.dispatch({
            actionName:"getVerificationCode",
            data:{
                phoneNo:phoneNo
            }
        })
    }
};

module.exports=DefaultAction;
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
    logout(){
        appDispatcher.dispatch({
            actionName:"logout"
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
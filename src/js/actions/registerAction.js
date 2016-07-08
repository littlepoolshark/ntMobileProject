var appDispatcher=require("../dispatcher/dispatcher.js");

var RegisterAction={
    register (phoneNo,password,verificationCode){
        appDispatcher.dispatch({
            actionName:"register",
            data:{
                phoneNo:phoneNo,
                password:password,
                verificationCode,verificationCode
            }
        })

    },
    fillInviterCode(inviterCode){
        appDispatcher.dispatch({
            actionName:"fillInviterCodeFinished",
            data:{
                inviterCode:inviterCode
            }
        })
    }
};

module.exports=RegisterAction;
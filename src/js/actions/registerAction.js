var appDispatcher=require("../dispatcher/dispatcher.js");

var RegisterAction={
    askForShowInviteEntry(ntjrSource) {
         appDispatcher.dispatch({
            actionName:"askForShowInviteEntry_register",
            data:{
                ntjrSource
            }
        })
    },
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
    },
    changeInviterCode(inviterCode){
        appDispatcher.dispatch({
            actionName:"changeInviterCode",
            data:{
                inviterCode:inviterCode
            }
        })
    },
    clearInviterCode(){
        appDispatcher.dispatch({
            actionName:"changeInviterCode",
            data:{
                inviterCode:""
            }
        })
    }
};

module.exports=RegisterAction;
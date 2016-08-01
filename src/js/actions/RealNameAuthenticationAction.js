var appDispatcher=require("../dispatcher/dispatcher.js");

var RealNameAuthenticationAction={
    submitAuthenticationForm (realName,idCardNo){
        appDispatcher.dispatch({
            actionName:"submitAuthenticationForm",
            data:{
                realName:realName,
                idCardNo:idCardNo
            }
        })

    },
    refreshUserInfoDetail(){
        appDispatcher.dispatch({
            actionName:"getUserInfoDetail"
        })
    }
};

module.exports=RealNameAuthenticationAction;
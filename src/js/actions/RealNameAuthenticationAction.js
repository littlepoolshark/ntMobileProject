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

    }
};

module.exports=RealNameAuthenticationAction;
var appDispatcher=require("../dispatcher/dispatcher.js");

var VerifyCodeForRegisterGuideAction={
    getDataFromLocation(queryObj){
        appDispatcher.dispatch({
            actionName:"getDataFromLocation_verifyCodeForRegisterGuide",
            data:queryObj
        })
    },
    changeVerifyCode(verifyCode){
        appDispatcher.dispatch({
            actionName:"changeVerifyCode_verifyCodeForRegisterGuide",
            data:{
                verifyCode:verifyCode
            }
        })
    },
    submitRegisterForm(){
        appDispatcher.dispatch({
            actionName:"submitRegisterForm_verifyCodeForRegisterGuide"
        })
    }
};

module.exports=VerifyCodeForRegisterGuideAction;
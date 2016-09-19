var appDispatcher=require("../dispatcher/dispatcher.js");

var DefaultAction={
    changeLoginAccount(phoneNo){
        appDispatcher.dispatch({
            actionName:"accountChange_login",
            data: {
                account: phoneNo
            }
        })
    },
    changePassword(password){
        appDispatcher.dispatch({
            actionName:"passwordChange_login",
            data: {
                password: password
            }
        })
    },
    changeRegisterAccount(phoneNo){
        appDispatcher.dispatch({
            actionName:"accountChange_register",
            data: {
                account: phoneNo
            }
        })
    },
    login(){
        appDispatcher.dispatch({
            actionName:"login"
        })
    },
    logout(){
        appDispatcher.dispatch({
            actionName:"logout"
        })
    },
    getVerificationCode(){
        appDispatcher.dispatch({
            actionName:"getVerificationCode"
        })
    },
    toggleAgreement(isAgreement){
        appDispatcher.dispatch({
            actionName:"toggleAgreementOfProtocol",
            data:{
                isAgreement:isAgreement
            }
        })
    }
};

module.exports=DefaultAction;
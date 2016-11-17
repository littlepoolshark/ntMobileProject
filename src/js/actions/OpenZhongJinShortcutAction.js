var appDispatcher=require("../dispatcher/dispatcher.js");

var OpenZhongJinShortcutAction={
    getInitialData (){
        appDispatcher.dispatch({
            actionName:"getInitialData_OpenZhongJinShortcut",
        })
    },
    openShortcutPay(verificationCode){
        appDispatcher.dispatch({
            actionName:"openZhongJinShortcutPay",
            data:{
                verificationCode:verificationCode
            }
        })
    }
};

module.exports=OpenZhongJinShortcutAction;
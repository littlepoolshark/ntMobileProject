var appDispatcher=require("../dispatcher/dispatcher.js");

var ZhongJinShortcutPayAction={
    changeRechargeAmount (rechargeAmount){
        appDispatcher.dispatch({
            actionName:"changeRechargeAmount_ZhongJinShortcutPay",
            data:{
                rechargeAmount:rechargeAmount
            }
        })
    },
    submitZhongJinRechargeForm(verificationCode){
        appDispatcher.dispatch({
            actionName:"submitZhongJinRechargeForm",
            data:{
                verificationCode:verificationCode
            }
        })
    }
};

module.exports=ZhongJinShortcutPayAction;
var appDispatcher=require("../dispatcher/dispatcher.js");

var SetDealPasswordAction={
    submitDealPasswordForSetting (dealPassword,confirmDealPassword){
        appDispatcher.dispatch({
            actionName:"submitDealPassword_setting",
            data:{
                dealPassword:dealPassword,
                confirmDealPassword:confirmDealPassword,
            }
        })
    },
    submitDealPasswordForModify (originDealPassword,dealPassword,confirmDealPassword){
        appDispatcher.dispatch({
            actionName:"submitDealPassword_modify",
            data:{
                originDealPassword:originDealPassword,
                dealPassword:dealPassword,
                confirmDealPassword:confirmDealPassword,
            }
        })
    }
};

module.exports=SetDealPasswordAction;
var appDispatcher=require("../dispatcher/dispatcher.js");

var SetDealPasswordAction={
    submitDealPasswordForSetting (dealPassword,confirmDealPassword){
        appDispatcher.dispatch({
            actionName:"submitDealPassword_setting",
            data:{
                dealPassword_setting:dealPassword,
                confirmDealPassword_setting:confirmDealPassword,
            }
        })
    },
    submitDealPasswordForModify (originDealPassword,dealPassword,confirmDealPassword){
        appDispatcher.dispatch({
            actionName:"submitDealPassword_modify",
            data:{
                originDealPassword_modify:originDealPassword,
                dealPassword_modify:dealPassword,
                confirmDealPassword_modify:confirmDealPassword,
            }
        })
    }
};

module.exports=SetDealPasswordAction;
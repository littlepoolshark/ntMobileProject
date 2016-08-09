var MicroEvent = require('../lib/microevent.js');
var appDispatcher=require('../dispatcher/dispatcher.js');
var ajax=require("../lib/ajax");
var cookie=require("../lib/cookie");

var SetDealPasswordStore={
    confirmDealPassword (dealPassword,confirmDealPassword){
        let confirmResult={
            success:true,
            msg:""
        };
        if(dealPassword !== confirmDealPassword){
            confirmResult={
                success:false,
                msg:"您两次的输入的密码不一致！"
            }
        }

        return confirmResult;
    }

};
MicroEvent.mixin(SetDealPasswordStore);


appDispatcher.register(function(payload){
    switch(payload.actionName){
        case "submitDealPassword_setting":
            let {
                dealPassword,
                confirmDealPassword
                }=payload.data;
            let confirmResult=SetDealPasswordStore.confirmDealPassword(dealPassword,confirmDealPassword);
            if(confirmResult.success){
                ajax({
                    ciUrl:"/user/v2/secrurityAddDealPwd",
                    data:{
                        dealPwd:dealPassword
                    },
                    success:function(rs){
                        if(rs.code === 0){
                            SetDealPasswordStore.trigger("setDealPasswordSuccess");
                        }else {
                            SetDealPasswordStore.trigger("setDealPasswordFailed",rs.description);
                        }
                    }
                })
            }else {
                SetDealPasswordStore.trigger("setDealPasswordFailed",confirmResult.msg);
            }

            break;
        default:
        //no op
    }
});

module.exports=SetDealPasswordStore;
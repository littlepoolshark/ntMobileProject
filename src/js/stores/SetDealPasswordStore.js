var MicroEvent = require('../lib/microevent.js');
var appDispatcher=require('../dispatcher/dispatcher.js');
var ajax=require("../lib/ajax");
var cookie=require("../lib/cookie");

var SetDealPasswordStore={
    checkDealPassword (newDealPassword,confirmDealPassword,originDealPassword){
        let confirmResult={
            success:true,
            msg:""
        };

        if(originDealPassword === ""){
            confirmResult={
                success:false,
                msg:"原始密码不能为空，请输入"
            }
        }else if(newDealPassword === ""){
            confirmResult={
                success:false,
                msg:"新交易密码不能为空，请输入"
            }
        }else if(confirmDealPassword === ""){
            confirmResult={
                success:false,
                msg:"请确认新的交易密码"
            }
        }else if(newDealPassword !== confirmDealPassword){
            confirmResult={
                success:false,
                msg:"您两次输入的交易不一致，请重新输入"
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
                dealPassword_setting,
                confirmDealPassword_setting
                }=payload.data;
            let confirmResult_setting=SetDealPasswordStore.checkDealPassword(dealPassword_setting,confirmDealPassword_setting);
            if(confirmResult_setting.success){
                ajax({
                    ciUrl:"/user/v2/secrurityAddDealPwd",
                    data:{
                        dealPwd:dealPassword_setting
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
                SetDealPasswordStore.trigger("setDealPasswordFailed",confirmResult_setting.msg);
            }

            break;
        case "submitDealPassword_modify":
            let {
                dealPassword_modify,
                confirmDealPassword_modify,
                originDealPassword_modify
                }=payload.data;
            let confirmResult_modify=SetDealPasswordStore.checkDealPassword(dealPassword_modify,confirmDealPassword_modify,originDealPassword_modify);
            if(confirmResult_modify.success){
                ajax({
                    ciUrl:"/user/v2/secrurityUpdateDealPwd",
                    data:{
                        dealPwd:dealPassword_modify,
                        oldDealPwd:originDealPassword_modify
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
                SetDealPasswordStore.trigger("setDealPasswordFailed",confirmResult_modify.msg);
            }

            break;
        default:
        //no op
    }
});

module.exports=SetDealPasswordStore;
var MicroEvent = require('../lib/microevent.js');
var appDispatcher=require('../dispatcher/dispatcher.js');
var ajax=require("../lib/ajax");
var cookie=require("../lib/cookie");

var SetDealPasswordStore={
    _all:{
        realName:"",
        hadBindBankCard:false,
        isIdCardVerified:false
    },
    checkDealPassword (newDealPassword,confirmDealPassword,originDealPassword){
        let confirmResult={
            success:true,
            msg:""
        };

        let checkPassword_regexp=/^(?!^\d+$)(?!^[a-zA-Z]+$)[0-9a-zA-Z]{6,16}$/;//登录密码和交易密码共用同一个正则表达式来验证

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
        }else if (newDealPassword.length < 6){
            confirmResult={
                success:false,
                msg:"密码至少设置6位"
            }
        }else if(!checkPassword_regexp.test(newDealPassword)){
            confirmResult={
                success:false,
                msg:"密码必须是字母和数字组合"
            }
        }else if(confirmDealPassword === ""){
            confirmResult={
                success:false,
                msg:"请确认新的交易密码"
            }
        }else if(newDealPassword !== confirmDealPassword){
            confirmResult={
                success:false,
                msg:"您两次输入的交易密码不一致，请重新输入"
            }
        }

        return confirmResult;
    },
    getAll(){
        return this._all;
    },
    updateAll(source){
        this._all=Object.assign(this._all,source);
    }

};
MicroEvent.mixin(SetDealPasswordStore);


appDispatcher.register(function(payload){
    switch(payload.actionName){
        case "getInitialData_setDealPassword":
            ajax({
                ciUrl:"/user/v2/securityCenter",
                success(rs){
                    if(rs.code === 0){
                        SetDealPasswordStore.updateAll({
                            realName:rs.data.idCardVerifyInfo.realNameFull,
                            hadBindBankCard:rs.data.bankInfo.bankCardVerified === "yes" ? true : false,
                            isIdCardVerified:rs.data.idCardVerifyInfo.idCardVerified === "yes" ? true : false
                         })
                    }
                }
            });
            break;
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
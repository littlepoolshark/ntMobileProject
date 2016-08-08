var MicroEvent = require('../lib/microevent.js');
var appDispatcher=require('../dispatcher/dispatcher.js');
var ajax=require("../lib/ajax");
var cookie=require("../lib/cookie");

var UserHomeStore={
    _all:{
        total:"----",
        totalProfit:"----",
        available:"----",
        hqAmount:"----",
        dqAmount:"----",
        hcCount:"--",
        tikectCount:"--",
    },
    getAll(){
        return this._all;
    },
    updateAll(source){
        this._all=Object.assign(this._all,source);
    },
    checkIdCardVerifiedSet(){//检查是否已经实名认证
        return this._all.sercuInfo.idCardVerified === "yes" ? true : false;
    },
    checkDealPasswordSet(){//检查是否设置交易密码
        return this._all.sercuInfo.isDealPwdSet === "yes" ? true : false;
    },
    checkBankCardBind(){//检查是否已经绑定银行卡
        return !!this._all.bankCardInfo  ? true : false;
    },
    checkBankCardIntegrity(){//检查银行卡信息是否完整（开户支行以及开户支行所在的省份和市区，）
        return !!this._all.bankCardInfo && !!this._all.bankCardInfo.branch && !!this._all.bankCardInfo.parentAreaId && !!this._all.bankCardInfo.region ;
    }
};
MicroEvent.mixin(UserHomeStore);


UserHomeStore.dispatchToken=appDispatcher.register(function(payload){
    switch(payload.actionName){
        case "getInitailDataFromServer_userHome":
            ajax({
                ciUrl:"/user/v2/myUserInfo",
                success(rs){
                    if(rs.code === 0){
                        UserHomeStore.updateAll(rs.data);
                        UserHomeStore.trigger("change");
                    }else {
                        UserHomeStore.trigger("getDataFailed");
                    }
                }
            });
            break;
        case "getUserInfoDetail":
            ajax({
                ciUrl:"/user/v2/userInfoDetail",
                success(rs){
                    if(rs.code === 0){
                        UserHomeStore.updateAll({
                            sercuInfo:rs.data.sercuInfo,
                            personInfo:rs.data.personInfo,
                            accountInfo:rs.accountInfo
                        });
                    }else {
                        UserHomeStore.trigger("getDataFailed");
                    }
                }
            });
            break;
        case "getBankCardInfo":
            ajax({
                ciUrl:"/user/v2/myBankCardInfo",
                success(rs){
                    if(rs.code === 0){
                        UserHomeStore.updateAll({
                            bankCardInfo:rs.data
                        });
                    }else {
                        UserHomeStore.trigger("getDataFailed");
                    }
                }
            });
            break;
        case "recharge":
            //跳转到充值页面之前的条件检查
            if(!UserHomeStore.checkIdCardVerifiedSet() || !UserHomeStore.checkDealPasswordSet()){
                UserHomeStore.trigger("securityCheckFailed");
            }else if(!UserHomeStore.checkBankCardBind()){
                UserHomeStore.trigger("bankCardIsNotBind");
            }else {
                UserHomeStore.trigger("rechargeCheckSuccess");
            }
            break;
        case "withdraw":
            //跳转到提现页面之前的条件检查
            console.log("UserHomeStore.checkBankCardIntegrity():",UserHomeStore.checkBankCardIntegrity());
            if(!UserHomeStore.checkIdCardVerifiedSet() || !UserHomeStore.checkDealPasswordSet()){
                UserHomeStore.trigger("securityCheckFailed");
            }else if(!UserHomeStore.checkBankCardBind()){
                UserHomeStore.trigger("bankCardIsNotBind");
            }else if(!UserHomeStore.checkBankCardIntegrity()){
                UserHomeStore.trigger("bankCardIntegrityCheckFailed");
            }else {
                UserHomeStore.trigger("withdrawCheckSuccess");
            }
            break;
        default:
        //no op
    }
});

module.exports=UserHomeStore;
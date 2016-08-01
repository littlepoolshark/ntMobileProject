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
        return this._all.sercuInfo.ispasswordSet === "yes" ? true : false;
    },
    checkBankCardBind(){//检查是否已经绑定银行卡
        return this._all.bankCardInfo === "yes" ? true : false;
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
            if(UserHomeStore.checkBankCardBind()){//检查用户是否已经绑卡
                UserHomeStore.trigger("bankCardIsBind");
            }else {
                UserHomeStore.trigger("bankCardIsNotBind");
            }
            break;
        default:
        //no op
    }
});

module.exports=UserHomeStore;
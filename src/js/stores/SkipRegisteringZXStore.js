var MicroEvent = require('../lib/microevent.js');
var appDispatcher=require('../dispatcher/dispatcher.js');
var ajax=require("../lib/ajax");
var cookie=require("../lib/cookie");

var SkipRegisteringZXStore={
    _all:{
        realName:"",
        isIdCardVerified:false,
        hadSetDealPassword:false,
        hadBindBankCard:false
    },
    getAll(){
        return this._all;
    },
    updateAll(source){
        this._all=Object.assign(this._all,source);
    }

};
MicroEvent.mixin(SkipRegisteringZXStore);


appDispatcher.register(function(payload){
    switch(payload.actionName){
        case "getInitialData_skipRegisteringZX":
            ajax({
                ciUrl:"/user/v2/securityCenter",
                success(rs){
                    if(rs.code === 0){
                        SkipRegisteringZXStore.updateAll({
                            realName:rs.data.idCardVerifyInfo.realNameFull,
                            isIdCardVerified:rs.data.idCardVerifyInfo.idCardVerified === "yes" ? true : false,
                            hadSetDealPassword:rs.data.dealPassVerifyInfo.isDealPwdSet === "yes" ? true : false,
                            hadBindBankCard:rs.data.bankInfo.bankCardVerified === "yes" ? true : false,
                        })
                    }
                }
            });
            break;
        case "submitSkipForm_skipRegisteringZX":
            ajax({
                ciUrl:"/user/v2/skipZx",
                success:function(rs){
                    if(rs.code === 0){
                        SkipRegisteringZXStore.trigger("skipRegisteringZXSuccess");
                    }else {
                        SkipRegisteringZXStore.trigger("skipRegisteringZXFailed",rs.description);
                    }
                }
            })
            break;
        default:
        //no op
    }
});

module.exports=SkipRegisteringZXStore;
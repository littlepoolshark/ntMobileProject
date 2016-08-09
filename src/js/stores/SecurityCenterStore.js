var MicroEvent = require('../lib/microevent.js');
var appDispatcher=require('../dispatcher/dispatcher.js');
var ajax=require("../lib/ajax");

var SecurityCenterStore={
    _all:{
        mobileVerified: "no",
        ispasswordSet: "no",
        isDealPwdSet: "no",
        idCardVerified: "no",
        emailVerified: "no"
    },
    updateAll(source){
        this._all=Object.assign(this._all,source);
    },
    checkDealPasswordSet(){
        return this._all.isDealPwdSet === "yes" ? true : false ;
    },
    checkIdCardVerified(){
        return this._all.idCardVerified === "yes" ? true : false ;
    },
    getAll(){
        return this._all;
    }
};
MicroEvent.mixin(SecurityCenterStore);


appDispatcher.register(function(payload){
    switch(payload.actionName){
        case "getSecurityInfoFromServer_securityCenter":
            ajax({
                ciUrl:"/user/v2/userInfoDetail",
                success(rs){
                    if(rs.code === 0){
                        SecurityCenterStore.updateAll(Object.assign(rs.data.sercuInfo,{mobile:rs.data.personInfo.mobile}));
                        if(SecurityCenterStore.checkIdCardVerified()){
                            SecurityCenterStore.updateAll({
                                idcard:rs.data.personInfo.idcard,
                                realName:rs.data.personInfo.realName
                            });
                        }
                        SecurityCenterStore.trigger("change");
                    }else {
                        console.log(rs.description);
                    }
                }
            })
            break;
        default:
        //no op
    }
});

module.exports=SecurityCenterStore;
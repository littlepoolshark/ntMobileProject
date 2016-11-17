var MicroEvent = require('../lib/microevent.js');
var appDispatcher=require('../dispatcher/dispatcher.js');
var ajax=require("../lib/ajax");

var SecurityCenterStore={
    _all:{
        mobileVerified: "no",
        ispasswordSet: "no",
        isDealPwdSet: "no",
        idCardVerified: "no",
        emailVerified: "no",
        zxcgOpen:"no",
        leftQureyTime:3
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
    },
    clearAll(){
        this._all={
            mobileVerified: "no",
            ispasswordSet: "no",
            isDealPwdSet: "no",
            idCardVerified: "no",
            emailVerified: "no",
            zxcgOpen:"no"
        }
    },
    calculateSecurityScore(){
        let mobileScore,loginPasswordScore,dealPasswordScore,idCardScore,zxcgOpen;
        let userScore=0;
        mobileScore=this._all.mobileVerified === "yes" ? 25 : 0;
        loginPasswordScore=this._all.ispasswordSet === "yes" ? 25 : 0;
        dealPasswordScore=this._all.isDealPwdSet === "yes" ? 25 : 0;
        zxcgOpen=(this._all.zxcgOpen === "yes" && this._all.istempuser === "no") ? 25 : 0;
        userScore=mobileScore + loginPasswordScore + dealPasswordScore + zxcgOpen;

        return userScore ;
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

                        let personInfo=rs.data.personInfo;
                        SecurityCenterStore.updateAll(Object.assign(rs.data.sercuInfo,{
                            mobile:personInfo.mobile,
                            zxcgOpen:personInfo.zxcgOpen,
                            istempuser:personInfo.istempuser,
                            leftQureyTime:personInfo.leftQureyTime
                        }));
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
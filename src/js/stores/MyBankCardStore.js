var MicroEvent = require('../lib/microevent.js');
var appDispatcher=require('../dispatcher/dispatcher.js');
var ajax=require("../lib/ajax.js");


var MyBankCardStore={
    _all:{
        bankName: "",
        cardno: "",
        shortIcon:"",//银行logo图片在服务器的路径
        status:"",
        realName:"",
        idCardVerified:"no"//是否实名认证
    },
    getAll(){
        return this._all;
    },
    checkForAddingBankCard(){
        return this._all.idCardVerified === "yes" ? true : false ;
    },
    updateAll(source){
        this._all=Object.assign(this._all,source);
    }
};
MicroEvent.mixin(MyBankCardStore);


appDispatcher.register(function(payload){
    switch(payload.actionName){
        case "getMyBankCardDetail_myBankCard":
            ajax({
                ciUrl:"/user/v2/myBankCardInfo",
                success(rs){
                    if(rs.code === 0 ){
                        MyBankCardStore.updateAll(rs.data);
                        MyBankCardStore.trigger("change");
                    }
                }
            });
            break;
        case "getUserAccountInfo_myBankCard":
            ajax({
                ciUrl:"/user/v2/userInfoDetail",
                success(rs){
                    if(rs.code === 0){
                        MyBankCardStore.updateAll({
                            idCardVerified:rs.data.sercuInfo.idCardVerified,
                            realName:rs.data.personInfo.realName
                        });
                    }
                }
            });
            break;
        case "addBankCard_myBankCard":
            let validationResult=MyBankCardStore.checkForAddingBankCard();
            if(validationResult){
                MyBankCardStore.trigger("BindCardCheckSuccess");
            }else {
                MyBankCardStore.trigger("BindCardCheckFailed");
            }
            break;
        default:
        //no op
    }
});

module.exports=MyBankCardStore;
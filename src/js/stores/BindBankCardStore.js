var MicroEvent = require('../lib/microevent.js');
var appDispatcher=require('../dispatcher/dispatcher.js');
var ajax=require("../lib/ajax.js");
var UserHomeStore=require("./UserHomeStore");

var BindBankCardStore={
    _all:{
       userName:"",
       bankId:"",
       bankName:"",
       cardNo:"",
       region:"",//开户城市id
       branch:""//开户支行名称
    },
    getAll(){
        return this._all;
    },
    updateAll(source){
        this._all=Object.assign(this._all,source);
    }

};
MicroEvent.mixin(BindBankCardStore);

appDispatcher.register(function(payload){
    switch(payload.actionName){
        case "getUserNameFromLocation":
            BindBankCardStore.updateAll({
                userName:payload.data.userName
            });
            BindBankCardStore.trigger("change");
            break;
        case "selectbankCard":
            BindBankCardStore.updateAll({
                bankId:payload.data.bankId,
                bankName:payload.data.bankName
            });
            BindBankCardStore.trigger("bankCardSelectionFinished");
            break;
        case "submitBankCardForm":
            appDispatcher.waitFor([UserHomeStore.dispatchToken]);
            if(UserHomeStore.checkIdCardVerifiedSet()){
                BindBankCardStore.updateAll({
                    cardno:payload.data.cardNo
                });
                ajax({
                    ciUrl:"/user/v2/bindBankCard",
                    data:{
                        bankId:BindBankCardStore.getAll().bankId,
                        cardno:BindBankCardStore.getAll().cardno
                    },
                    success(rs){
                        if(rs.code === 0){
                            BindBankCardStore.trigger("bindBankCardSuccess");
                        }else {
                            BindBankCardStore.trigger("bindBankCardFailed",rs.description);
                        }
                    }
                });
            }else {
                BindBankCardStore.trigger("idCardVerifiedCheckFailed");
            }

            break;
        default:
        //no op
    }
});

module.exports=BindBankCardStore;
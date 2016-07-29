var MicroEvent = require('../lib/microevent.js');
var appDispatcher=require('../dispatcher/dispatcher.js');
var ajax=require("../lib/ajax.js");

var BankCardListStore={
    _all:{
        bankCardList:[]
    },
    getAll(){
        return this._all.bankCardList;
    },
    updateAll(bankCardList){
        this._all.bankCardList=bankCardList
    }

};
MicroEvent.mixin(BankCardListStore);

appDispatcher.register(function(payload){
    switch(payload.actionName){
        case "getBankCardListFormServer":
            ajax({
                ciUrl:"/user/v2/bankList",
                success(rs){
                    if(rs.code === 0){
                        BankCardListStore.updateAll(rs.data.list);
                        BankCardListStore.trigger("change");
                    }
                }
            });
            break;
        default:
        //no op
    }
});

module.exports=BankCardListStore;
var MicroEvent = require('../lib/microevent.js');
var appDispatcher=require('../dispatcher/dispatcher.js');
var ajax=require("../lib/ajax.js");

var BankListOfPACGStore={
    _all:{
        bankList:[]
    },
    getAll(){
        return this._all.bankList;
    },
    updateAll(bankList){
        this._all.bankList=bankList;
    }

};
MicroEvent.mixin(BankListOfPACGStore);

appDispatcher.register(function(payload){
    switch(payload.actionName){
        case "getBankListFormServer_blopacg":
            ajax({
                ciUrl:"/user/v2/bankList",
                success(rs){
                    if(rs.code === 0){
                        BankListOfPACGStore.updateAll(rs.data.list);
                        BankListOfPACGStore.trigger("change");
                    }
                }
            });
            break;
        default:
        //no op
    }
});

module.exports=BankListOfPACGStore;
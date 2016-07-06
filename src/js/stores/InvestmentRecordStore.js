var MicroEvent = require('../lib/microevent.js');
var appDispatcher=require('../dispatcher/dispatcher.js');
var ajax=require("../lib/ajax.js");


var InvestmentRecordStore={
    _all:{
        list:[]
    },
    getAll(){
        return this._all;
    },
    updateAll(source){
        this._all.list=this._all.list.concat(source);
    },
    getCurrentPageIndex(){
        return this._all.pageIndex;
    },
    clearAll(){
        this._all.list=[];
    }
};
MicroEvent.mixin(InvestmentRecordStore);


appDispatcher.register(function(payload){
    switch(payload.actionName){
        case "loadNextPage":
                ajax({
                    ciUrl: "/invest/v2/earnInvestRecords",
                    data:{
                        regularId:payload.data.productId,
                        type:payload.data.type
                    },
                    success:function(rs){
                        if(rs.code === 0){
                            InvestmentRecordStore.updateAll(rs.data.list);
                            InvestmentRecordStore.trigger("change");
                        }else {
                            InvestmentRecordStore.trigger("getDataFailed");
                        }
                    }
                });
            break;
        case "clearAllStoreData":
            InvestmentRecordStore.clearAll();
            InvestmentRecordStore.trigger("change");
            break;
        default:
        //no op
    }
});

module.exports=InvestmentRecordStore;
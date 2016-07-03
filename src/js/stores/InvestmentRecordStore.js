var MicroEvent = require('../lib/microevent.js');
var appDispatcher=require('../dispatcher/dispatcher.js');
var ajax=require("../lib/ajax.js");

import config from "../config.js";

var InvestmentRecordStore={
    _all:{
        pageIndex:0,
        pageSize:1,
        list:[]
    },
    getAll(){
        return this._all;
    },
    updateAll(source){
        source.list=this._all.list.concat(source.list);
        Object.assign(this._all,source);
    },
    canLoadMore(){
        return (this._all.pageIndex +1) <=  this._all.pageSize ;
    },
    getCurrentPageIndex(){
        return this._all.pageIndex;
    },
    clearAll(){
        this._all={
            pageIndex:0,
            pageSize:1,
            list:[]
        }
    }
};
MicroEvent.mixin(InvestmentRecordStore);


appDispatcher.register(function(payload){
    switch(payload.actionName){
        case "loadNextPage":
            if(InvestmentRecordStore.canLoadMore()){
                console.log("into if");
                let currPageIndex=InvestmentRecordStore.getCurrentPageIndex();
                let ajaxUrl= currPageIndex ?
                             config.createFullPath("earnInvestRecords"+ (currPageIndex+1)) :
                             config.createFullPath("earnInvestRecords") ;
                ajax({
                    url: ajaxUrl,
                    method:"GET",
                    success:function(rs){
                        if(rs.code === 0){
                            InvestmentRecordStore.updateAll(rs.data);
                            InvestmentRecordStore.trigger("change");
                        }else {
                            InvestmentRecordStore.trigger("getDataFailed");
                        }
                    }
                });
            }else {
                InvestmentRecordStore.trigger("canNotLoadMore");
            }

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
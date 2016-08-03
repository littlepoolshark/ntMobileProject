var MicroEvent = require('../lib/microevent.js');
var appDispatcher=require('../dispatcher/dispatcher.js');
var ajax=require("../lib/ajax.js");


var JournalAccountStore={
    _all:{
        journalAccountList:[],
        pageIndex:0
    },
    getJournalAccountList(){
        return this._all.journalAccountList;
    },
    clearAll(){
        this._all={
            journalAccountList:[],
            pageIndex:0
        };
    },
    getCurrPageIndex(){
        return this._all.pageIndex;
    },
    updateAll(source){
        this._all.journalAccountList=this._all.journalAccountList.concat(source.journalAccountList);
        this._all.pageIndex=source.pageIndex;
    }
};
MicroEvent.mixin(JournalAccountStore);


appDispatcher.register(function(payload){
    switch(payload.actionName){
        case "journalAccount_getNextPage":
            ajax({
                ciUrl:"/user/v2/capitalTradingRecordList",
                data:{
                    reqPageNum:JournalAccountStore.getCurrPageIndex() +1,
                    maxResults:20
                },
                success(rs){
                    if(rs.code === 0){
                        if(rs.data.pageIndex === 1 && rs.data.list.length === 0){
                            JournalAccountStore.trigger("noDataTemporally");
                        }else {
                            let newList=[];
                            let oldList=rs.data.list;
                            for(let i=0;i<oldList.length;i++){
                                newList[i]={
                                    id:oldList[i].id,
                                    type:!!oldList[i].amountIn ? "in" : "out",
                                    happenTime:oldList[i].happenTime,
                                    balance:oldList[i].balance,
                                    transTypeName:oldList[i].transTypeName,
                                    amount:!!oldList[i].amountIn ? oldList[i].amountIn : oldList[i].amountOut
                                }
                            }
                            JournalAccountStore.updateAll({
                                journalAccountList:newList,
                                pageIndex:rs.data.pageIndex
                            });
                            JournalAccountStore.trigger("change");
                        }
                    }
                }
            });
            break;
        default:
        //no op
    }
});

module.exports=JournalAccountStore;
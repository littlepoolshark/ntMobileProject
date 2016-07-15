var MicroEvent = require('../lib/microevent.js');
var appDispatcher=require('../dispatcher/dispatcher.js');
var ajax=require("../lib/ajax.js");

import config from "../config";

var MoreProductListStore={
    _all:{
        fixedLoanList:[],
        creditorLoanList:[],
        fixedLoanPageIndex:0,
        creditorLoanPageIndex:0,
    },
    getAll(){
        return {
            fixedLoanList:this._all.fixedLoanList,
            creditorLoanList:this._all.creditorLoanList
        };
    },
    getCurrPageIndex(listType){
        if(listType === "fixedLoan"){
            return this._all.fixedLoanPageIndex;
        }else if(listType === "creditorLoan"){
            return this._all.creditorLoanPageIndex;
        }
    },
    updateAll(source){
        if(source.fixedLoanList){
            this._all.fixedLoanList=this._all.fixedLoanList.concat(source.fixedLoanList);
            this._all.fixedLoanPageIndex=source.fixedLoanPageIndex;
        }
        if(source.creditorLoanList){
            this._all.creditorLoanList=this._all.creditorLoanList.concat(source.creditorLoanList);
            this._all.creditorLoanPageIndex=source.creditorLoanPageIndex;
        }
    }
};
MicroEvent.mixin(MoreProductListStore);


appDispatcher.register(function(payload){
    switch(payload.actionName){
        case "moreProductList_getFirstPage":
            //获取好采投列表
            ajax({
                ciUrl:"/platinfo/v2/investmentList",
                success(rs){
                    if(rs.code === 0){
                        MoreProductListStore.updateAll({
                            fixedLoanList:rs.data.list,
                            fixedLoanPageIndex:rs.data.pageIndex
                        });
                        MoreProductListStore.trigger("change");
                    }
                }
            });
            //获取债权转让列表
            ajax({
                ciUrl:"/invest/v2/creditorTransferList",
                success(rs){
                    if(rs.code === 0){
                        MoreProductListStore.updateAll({
                            creditorLoanList:rs.data.list,
                            creditorLoanPageIndex:rs.data.pageIndex
                        });
                        MoreProductListStore.trigger("change");
                    }
                }
            });
            break;
        case "moreProductList_getNextPage":
            let currListType=payload.data.currListType;
            if( currListType=== "fixedLoan"){
                ajax({
                    ciUrl:"/platinfo/v2/investmentList",
                    data:{
                        reqPageNum:MoreProductListStore.getCurrPageIndex(currListType) +1
                    },
                    success(rs){
                        if(rs.code === 0){
                            MoreProductListStore.updateAll({
                                fixedLoanList:rs.data.list,
                                fixedLoanPageIndex:rs.data.pageIndex
                            });
                            MoreProductListStore.trigger("change");
                        }
                    }
                });
            }else if(currListType === "creditorLoan"){
                ajax({
                    ciUrl:"/invest/v2/creditorTransferList",
                    data:{
                        reqPageNum:MoreProductListStore.getCurrPageIndex(currListType) +1
                    },
                    success(rs){
                        if(rs.code === 0){
                            MoreProductListStore.updateAll({
                                creditorLoanList:rs.data.list,
                                creditorLoanPageIndex:rs.data.pageIndex
                            });
                            MoreProductListStore.trigger("change");
                        }
                    }
                });
            }

            break;
        default:
        //no op
    }
});

module.exports=MoreProductListStore;
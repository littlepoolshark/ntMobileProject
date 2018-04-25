var MicroEvent = require('../lib/microevent.js');
var appDispatcher=require('../dispatcher/dispatcher.js');
var ajax=require("../lib/ajax.js");

import config from "../config";

var DailyEarnInvestmentRecordStore={
    _all:{
        investmentDetailList:[],//投资明细列表
        matchLoanDetailList:[],//配标明细列表
        investmentDetailPageIndex:0,
        matchLoanDetailPageIndex:0
    },
    getAll(){
        return this._all;
    },
    clearAll(){
        this._all={
            investmentDetailList:[],
            matchLoanDetailList:[],
            investmentDetailPageIndex:0,
            matchLoanDetailPageIndex:0
        };
    },
    getCurrPageIndex(listType){
        if(listType === "investmentList"){
            return this._all.investmentDetailPageIndex;
        }else if (listType === "matchLoan"){
            return this._all.matchLoanDetailPageIndex;
        }
    },
    updateListByType(listType,source){
        switch (listType){
            case "investmentList":
                this._all.investmentDetailList=this._all.investmentDetailList.concat(source.list);
                this._all.investmentDetailPageIndex=source.pageIndex;
                break;
            case "matchLoan":
                this._all.matchLoanDetailList=this._all.matchLoanDetailList.concat(source.list);
                this._all.matchLoanDetailPageIndex=source.pageIndex;
            default:
                break;
        }
    }
};
MicroEvent.mixin(DailyEarnInvestmentRecordStore);


appDispatcher.register(function(payload){
    switch(payload.actionName){
        case "dailyEarnInvestmentRecord_getFirstPage":
            //获取交易明细列表
            ajax({
                ciUrl:"/ttz/v2/userTtzRecords",
                data:{
                    type:"all",
                    maxResults:20
                },
                success(rs){
                    if(rs.code === 0){
                        DailyEarnInvestmentRecordStore.updateListByType("investmentList",{
                            list:rs.data.list,
                            pageIndex:rs.data.pageIndex
                        });
                        DailyEarnInvestmentRecordStore.trigger("change");
                    }
                }
            });

            //获取配标详情列表
            ajax({
                ciUrl:"/invest/v2/financialMatchDetail",
                data:{
                    type:"ttz_product",
                    maxResults:100
                },
                success(rs){
                    if(rs.code === 0){
                        DailyEarnInvestmentRecordStore.updateListByType("matchLoan",{
                            list:rs.data.list,
                            pageIndex:rs.data.pageIndex
                        });
                        DailyEarnInvestmentRecordStore.trigger("change");
                    }
                }
            });
            break;
        case "dailyEarnInvestmentRecord_getNextPage"://配标详情列表因为数据量少，暂时不考虑做分页
            let currListType=payload.data.currListType;
            ajax({
                ciUrl:"/ttz/v2/userTtzRecords",
                data:{
                    type:"all",
                    maxResults:20,
                    reqPageNum:DailyEarnInvestmentRecordStore.getCurrPageIndex(currListType) + 1
                },
                success(rs){
                    if(rs.code === 0){
                        DailyEarnInvestmentRecordStore.updateListByType(currListType,{
                            list:rs.data.list,
                            pageIndex:rs.data.pageIndex
                        });
                        DailyEarnInvestmentRecordStore.trigger("change");
                    }
                }
            });
            break;
        default:
        //no op
    }
});

module.exports=DailyEarnInvestmentRecordStore;
var MicroEvent = require('../lib/microevent.js');
var appDispatcher=require('../dispatcher/dispatcher.js');
var ajax=require("../lib/ajax.js");

import config from "../config";

var EarnSetInvestmentRecordStore={
    _all:{
        preRepayList:[],//待结算列表
        clearingList:[],//已结算列表
        matchLoanDetailList:[],//配标明细列表
        preRepayListPageIndex:0,
        clearingListPageIndex:0,
        matchLoanDetailPageIndex:0,
        preRepayListProductType:"all",
        clearingListProductType:"all"
    },
    getAll(){
        return this._all;
    },
    clearAll(){
        this._all={
            preRepayList:[],
            clearingList:[],
            matchLoanDetailList:[],
            preRepayListPageIndex:0,
            clearingListPageIndex:0,
            matchLoanDetailPageIndex:0,
            preRepayListProductType:"all",
            clearingListProductType:"all"
        };
    },
    getCurrPageIndex(listType){
        if(listType === "repaying"){
            return this._all.preRepayListPageIndex;
        }else if (listType === "clearing"){
            return this._all.clearingListPageIndex;
        }
    },
    getListStatusByListType(listType){
      return listType === "repaying" ? "no" : "yes";
    },
    getProductTypeByListType(ListType){
        return ListType === "repaying" ? this._all.preRepayListProductType : this._all.clearingListProductType;
    },
    /*
    * @desc 加工后台返回的数据
    */
    processData(listType,list){
        let newList=[];
        for(let i=0;i<list.length;i++){
            newList[i]={
                id:list[i].id,
                dueInPrincipalAndInterest:(list[i].inverstAmount + list[i].interestTotal).toFixed(2),
                time:list[i].preRepayDate,
                investAmount:list[i].inverstAmount,//投资金额
                investStatus:listType,//该款投资所进入的状态（apply:申请加入中；repaying:回款中；clearing：已结清）
                productType:list[i].type,//产品类型（）
                title:list[i].title,//标的名称
                interestRate:list[i].interestRate + "%",//加息券的年化lilv
                redPackageAmount:list[i].redAmount,//红包金额
                yearRate:list[i].rate + "%",//标的的年化利率
                deadline:list[i].time//标的的期限,或者还款期数目，形如 “3/6”,表示剩余期数 / 总期数
            }
        }
        return newList;
    },
    updateProductTypeByListType(productType,listType){
        if(listType === "repaying" && !! productType){
            this._all.preRepayListProductType=productType;
        }else if(listType === "clearing" && !!productType){
            this._all.clearingListProductType=productType;
        }
    },
    /*
    * @desc 更新整个store
    *
    * @param source {object}//列表数据对象
    * @param source.updateType {string} //更新的类型。paging：分页更新；filter：筛选列表
    * @param source.listType {string}//需要更新的列表数据类型。repaying：待结算列表；clearing：已结清列表
    */
    updateAll(source){
        //更新当前列表类型，所查询的产品类型
        this.updateProductTypeByListType(source.productType,source.listType);

        //更新列表数据
        let newList=this.processData(source.listType,source.list);
        switch (source.listType){
            case "repaying":
                if(source.updateType === "paging"){
                    this._all.preRepayList=this._all.preRepayList.concat(newList);
                }else if(source.updateType === "filter") {
                    this._all.preRepayList=newList;
                }
                this._all.preRepayListPageIndex=source.pageIndex;
                break;
            case "clearing":
                if(source.updateType === "paging"){
                    this._all.clearingList=this._all.clearingList.concat(newList);
                }else if(source.updateType === "filter") {
                    this._all.clearingList=newList;
                }
                this._all.clearingListPageIndex=source.pageIndex;
                break;
            case "matchLoan":
                this._all.matchLoanDetailList=source.list;
                this._all.matchLoanDetailPageIndex=source.pageIndex;
                break;
            default:
                break;
        }
    }
};
MicroEvent.mixin(EarnSetInvestmentRecordStore);

appDispatcher.register(function(payload){
    let currListType,productType;
    switch(payload.actionName){
        case "getInitialData_earnSetInvestmentRecord":
            //获取待结算/回款中细列表
            ajax({
                ciUrl:"/invest/v2/financialInfo",
                data:{
                    status:"no",
                    type:"all",
                    reqPageNum:1
                },
                success(rs){
                    if(rs.code === 0){
                        if(rs.data.list.length >0){
                            EarnSetInvestmentRecordStore.updateAll({
                                updateType:"paging",
                                listType:"repaying",
                                list:rs.data.list,
                                pageIndex:rs.data.pageIndex
                            });
                            EarnSetInvestmentRecordStore.trigger("change");
                        }else {
                            EarnSetInvestmentRecordStore.trigger("noDataTemporarily","repaying");
                        }

                    }
                }
            });

            //获取已结算列表
            ajax({
                ciUrl:"/invest/v2/financialInfo",
                data:{
                    status:"yes",
                    type:"all",
                    reqPageNum:1
                },
                success(rs){
                    if(rs.code === 0){
                        if(rs.data.list.length > 0){
                            EarnSetInvestmentRecordStore.updateAll({
                                updateType:"paging",
                                listType:"clearing",
                                list:rs.data.list,
                                pageIndex:rs.data.pageIndex
                            });
                            EarnSetInvestmentRecordStore.trigger("change");
                        }else {
                            EarnSetInvestmentRecordStore.trigger("noDataTemporarily","clearing");
                        }

                    }
                }
            });
            break;
        case "getNextPage_earnSetInvestmentRecord":
            currListType=payload.data.currListType;
            ajax({
                ciUrl:"/invest/v2/financialInfo",
                data:{
                    status:EarnSetInvestmentRecordStore.getListStatusByListType(currListType),
                    type:EarnSetInvestmentRecordStore.getProductTypeByListType(currListType),
                    reqPageNum:EarnSetInvestmentRecordStore.getCurrPageIndex(currListType)+1
                },
                success(rs){
                    if(rs.code === 0){
                        if(rs.data.list.length >0){
                            EarnSetInvestmentRecordStore.updateAll({
                                updateType:"paging",
                                listType:currListType,
                                list:rs.data.list,
                                pageIndex:rs.data.pageIndex
                            });
                            EarnSetInvestmentRecordStore.trigger("change");
                        }else {
                            EarnSetInvestmentRecordStore.trigger("noMoreData");
                        }
                    }
                }
            });
            break;
        case "queryProductListByType_earnSetInvestmentRecord":
            currListType=payload.data.currListType;
            productType=payload.data.productType;
            EarnSetInvestmentRecordStore.updateProductTypeByListType(productType,currListType);
            ajax({
                ciUrl:"/invest/v2/financialInfo",
                data:{
                    status:EarnSetInvestmentRecordStore.getListStatusByListType(currListType),
                    type:EarnSetInvestmentRecordStore.getProductTypeByListType(currListType),
                    reqPageNum:1
                },
                success(rs){
                    if(rs.code === 0){
                        if(rs.data.list.length > 0){
                            EarnSetInvestmentRecordStore.updateAll({
                                updateType:"filter",
                                listType:currListType,
                                list:rs.data.list,
                                pageIndex:rs.data.pageIndex
                            });
                            EarnSetInvestmentRecordStore.trigger("queryProductListSuccess");
                        }else {
                            EarnSetInvestmentRecordStore.trigger("noDataTemporarily",currListType);
                        }
                    }
                }
            });
            break;
        case "showMatchLoanList_earnSetInvestmentRecord":
            ajax({
                ciUrl: "/invest/v2/financialMatchDetail",
                data: {
                    type: payload.data.productType,
                    joinId:payload.data.recordId,
                    maxResults: 100
                },
                success(rs){
                    if (rs.code === 0) {
                        if (rs.data.list.length > 0) {
                            EarnSetInvestmentRecordStore.updateAll({
                                updateType:"paging",
                                listType:"matchLoan",
                                list: rs.data.list,
                                pageIndex: rs.data.pageIndex
                            });
                            EarnSetInvestmentRecordStore.trigger("getMatchLoanListSuccess");
                        }else {
                            EarnSetInvestmentRecordStore.trigger("noDataTemporarily","matchLoan");
                        }

                    }
                }
            });
            break;
        default:
        //no op
    }
});

module.exports=EarnSetInvestmentRecordStore;
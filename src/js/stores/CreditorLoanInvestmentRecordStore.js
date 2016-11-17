var MicroEvent = require('../lib/microevent.js');
var appDispatcher=require('../dispatcher/dispatcher.js');
var ajax=require("../lib/ajax.js");


var CreditorLoanInvestmentRecordStore={
    _all:{
        applyingList:[],//加入中列表
        preRepayList:[],//回款中列表
        clearingList:[],//已结算列表
        applyingListPageIndex:0,
        preRepayListPageIndex:0,
        clearingListPageIndex:0,
    },
    getAll(){
        return this._all;
    },
    clearAll(){
        this._all={
            applyingList:[],
            preRepayList:[],
            clearingList:[],
            applyingListPageIndex:0,
            preRepayListPageIndex:0,
            clearingListPageIndex:0,
        };
    },
    getListStatusByListType(listType){
        return listType === "applying" ? "orderring" : (listType === "repaying" ? "holdding" : "success");
    },
    getCurrPageIndex(listType){
        if(listType === "applying"){
            return this._all.applyingListPageIndex;
        }else if(listType === "repaying"){
            return this._all.preRepayListPageIndex;
        }else if (listType === "clearing"){
            return this._all.clearingListPageIndex;
        }
    },
    /*
    * @desc 加工后台返回的数据
    */
    processData(listType,list){
        let newList=[];
        for(let i=0;i<list.length;i++){
            newList[i]={
                id:list[i].loanId,
                creId:list[i].creditorId,
                dueInPrincipalAndInterest:list[i].allAmount ,
                time:list[i].endTime,
                investAmount:list[i].investAmount,//投资金额
                investStatus:listType,//该款投资所进入的状态（apply:申请加入中；repaying:回款中；clearing：已结清）
                productType:"creditor_product",//产品类型
                title:list[i].loanTitle,//标的名称
                interestRate:0,//加息券的年化利率
                redPackageAmount:0,//红包金额
                yearRate:(list[i].apr).toFixed(1) + "%",//标的的年化利率
                deadline:list[i].qsNum+"期",//标的的期限,或者还款期数目，形如 “3/6”,表示剩余期数 / 总期数
                status:list[i].status
            }
        }
        return newList;
    },
    updateAll(source){
        //更新列表数据
        let newList=this.processData(source.listType,source.list);
        switch (source.listType){
            case "applying":
                this._all.applyingList=this._all.applyingList.concat(newList);
                this._all.applyingListPageIndex=source.pageIndex;
                break;
            case "repaying":
                this._all.preRepayList=this._all.preRepayList.concat(newList);
                this._all.preRepayListPageIndex=source.pageIndex;
                break;
            case "clearing":
                this._all.clearingList=this._all.clearingList.concat(newList);
                this._all.clearingListPageIndex=source.pageIndex;
                break;
            default:
                break;
        }
    }
};
MicroEvent.mixin(CreditorLoanInvestmentRecordStore);

appDispatcher.register(function(payload){
    let currListType;
    switch(payload.actionName){
        case "getInitialData_creditorLoanInvestmentRecord":
            //获取加入中列表
            ajax({
                ciUrl:"/invest/v2/myCreditorRecords",
                data:{
                    status:"orderring",
                    reqPageNum:1
                },
                success(rs){
                    if(rs.code === 0){
                        if(rs.data.list.length >0){
                            CreditorLoanInvestmentRecordStore.updateAll({
                                listType:"applying",
                                list:rs.data.list,
                                pageIndex:rs.data.pageIndex
                            });
                            CreditorLoanInvestmentRecordStore.trigger("change");
                        }else {
                            CreditorLoanInvestmentRecordStore.trigger("noDataTemporarily","applying");
                        }

                    }
                }
            });

            //获取回款中列表
            ajax({
                ciUrl:"/invest/v2/myCreditorRecords",
                data:{
                    status:"holdding",
                    reqPageNum:1
                },
                success(rs){
                    if(rs.code === 0){
                        if(rs.data.list.length > 0){
                            CreditorLoanInvestmentRecordStore.updateAll({
                                listType:"repaying",
                                list:rs.data.list,
                                pageIndex:rs.data.pageIndex
                            });
                            CreditorLoanInvestmentRecordStore.trigger("change");
                        }else {
                            CreditorLoanInvestmentRecordStore.trigger("noDataTemporarily","repaying");
                        }

                    }
                }
            });
            //获取回款中列表
            ajax({
                ciUrl:"/invest/v2/myCreditorRecords",
                data:{
                    status:"success",
                    reqPageNum:1
                },
                success(rs){
                    if(rs.code === 0){
                        if(rs.data.list.length > 0){
                            CreditorLoanInvestmentRecordStore.updateAll({
                                listType:"clearing",
                                list:rs.data.list,
                                pageIndex:rs.data.pageIndex
                            });
                            CreditorLoanInvestmentRecordStore.trigger("change");
                        }else {
                            CreditorLoanInvestmentRecordStore.trigger("noDataTemporarily","clearing");
                        }

                    }
                }
            });
            break;
        case "getNextPage_creditorLoanInvestmentRecord":
            currListType=payload.data.currListType;
            ajax({
                ciUrl:"/invest/v2/myCreditorRecords",
                data:{
                    status:CreditorLoanInvestmentRecordStore.getListStatusByListType(currListType),
                    reqPageNum:CreditorLoanInvestmentRecordStore.getCurrPageIndex(currListType)+1
                },
                success(rs){
                    if(rs.code === 0){
                        if(rs.data.list.length >0){
                            CreditorLoanInvestmentRecordStore.updateAll({
                                listType:currListType,
                                list:rs.data.list,
                                pageIndex:rs.data.pageIndex
                            });
                            CreditorLoanInvestmentRecordStore.trigger("change");
                        }else {
                            CreditorLoanInvestmentRecordStore.trigger("noMoreData");
                        }
                    }
                }
            });
            break;
        default:
        //no op
    }
});

module.exports=CreditorLoanInvestmentRecordStore;
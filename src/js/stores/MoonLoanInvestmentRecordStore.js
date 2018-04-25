var MicroEvent = require('../lib/microevent.js');
var appDispatcher=require('../dispatcher/dispatcher.js');
var ajax=require("../lib/ajax.js");

import config from "../config";


var MoonLoanInvestmentRecordStore={
    _all:{
        joinAmount:"--",//投资中/加入中的金额
        applyQuitAmount:"--",//预约退出中的金额
        ysAmount:"--",//已赚的利息
        joiningList:[],//加入中列表
        holdingList:[],//汇款中列表
        quittingList:[],//退出中列表
        quitedList:[],//已退出列表
        joiningPageIndex:0,
        holdingPageIndex:0,
        quittingPageIndex:0,
        quitedPageIndex:0
    },
    getAll(){
        return this._all;
    },
    clearAll(){
        this._all={
            joinAmount:"--",//投资中/加入中的金额
            applyQuitAmount:"--",//预约退出中的金额
            ysAmount:"--",//已赚的利息
            joiningList:[],//加入中列表
            holdingList:[],//汇款中列表
            quittingList:[],//退出中列表
            quitedList:[],//已退出列表
            joiningPageIndex:0,
            holdingPageIndex:0,
            quittingPageIndex:0,
            quitedPageIndex:0
        };
    },
    getCurrPageIndex(listType){
        let {
            joiningPageIndex,
            holdingPageIndex,
            quittingPageIndex,
            quitedPageIndex
            }=this._all;
        switch (listType){
            case "joining":
                return joiningPageIndex;
            case "holding":
                return holdingPageIndex;
            case "quitting":
                return quittingPageIndex;
            case "quited":
                return quitedPageIndex;
            default:
                break;
        }
    },
    updateAll(source){
        if(source.hasOwnProperty("joinAmount")){
            this._all.joinAmount=source.joinAmount;
            this._all.applyQuitAmount=source.applyQuitAmount;
            this._all.ysAmount=source.ysAmount;
        }
        if(source.joiningList){
            this._all.joiningList=this._all.joiningList.concat(source.joiningList);
            this._all.joiningPageIndex=source.joiningPageIndex;
        }
        if(source.holdingList){
            this._all.holdingList=this._all.holdingList.concat(source.holdingList);
            this._all.holdingPageIndex=source.holdingPageIndex;
        }
        if(source.quittingList){
            this._all.quittingList=this._all.quittingList.concat(source.quittingList);
            this._all.quittingPageIndex=source.quittingPageIndex;
        }
        if(source.quitedList){
            this._all.quitedList=this._all.quitedList.concat(source.quitedList);
            this._all.quitedPageIndex=source.quitedPageIndex;
        }
    }
};
MicroEvent.mixin(MoonLoanInvestmentRecordStore);


appDispatcher.register(function(payload){

    /*
     * @description 根据<InvestmentRecordCard>组件的接口改装从后台返回的数据
     */
    function processDataByListType(listType,list){
        let dataAfterProcess=[];
        dataAfterProcess=list.map((item,index) => {
            let itemAfterProcess={};
            switch (listType){
                case "joining":
                    itemAfterProcess={
                        id:item.productId,//这个productId并不能唯一标示一条购买记录，所以view层遍历的时候不能用它作为key
                        title:item.title,
                        productType:"moon",
                        moonLoanStatus:"joining",
                        investAmount:item.inverstAmount,
                        yearRate:(item.minRate * 100).toFixed(1) + "-" + (item.maxRate * 100).toFixed(1) + "%",
                        interestRate:(item.interestRate * 100).toFixed(1) + "%",
                        redPackageAmount:item.redAmount,
                        buy_progress:item.buy_progress,
                        investStatus:"applying",//申请加入中
                        interestMonth:item.interestMonth ? item.interestMonth : 0//加息券的加息期
                    };
                    break;
                case "holding":
                    itemAfterProcess={
                        id:item.joinId,
                        title:item.title,
                        productType:"moon",
                        moonLoanStatus:"holding",
                        investAmount:item.inverstAmount,
                        yearRate:(item.curRate * 100).toFixed(1) + "%",
                        interestRate:item.interestRate && (item.interestRate * 100).toFixed(1) + "%",
                        redPackageAmount:item.redAmount,
                        buy_progress:item.buy_progress,
                        investStatus:"repaying",//还款中
                        time:item.nextRepayDate,
                        dueInPrincipalAndInterest:item.dsbx,
                        deadline:item.syqs + "期",
                        canApplyToQuit:item.inRepayPeriod === 0 ? true :  false,//能否预约退出月满盈
                        interestMonth:item.interestMonth ? item.interestMonth : 0//加息券的加息期
                    };
                    break;
                case "quitting":
                    itemAfterProcess={
                        id:item.joinId,
                        title:item.title,
                        productType:"moon",
                        moonLoanStatus:"quitting",
                        investAmount:item.inverstAmount,
                        yearRate:(item.curRate * 100).toFixed(1) + "%",
                        interestRate:item.interestRate && (item.interestRate * 100).toFixed(1) + "%",
                        redPackageAmount:item.redAmount,
                        buy_progress:item.buy_progress,
                        investStatus:"repaying",//还款中
                        time:item.appllyQuitTime,
                        dueInPrincipalAndInterest:item.dsbx,
                        deadline:item.syqs + "期",
                        canApplyToQuit:item.inRepayPeriod === 0 ? true :  false,//能否预约退出月满盈
                        interestMonth:item.interestMonth ? item.interestMonth : 0//加息券的加息期
                    };
                    break;
                case "quited":
                    itemAfterProcess={
                        id:item.joinId,
                        title:item.title,
                        productType:"moon",
                        moonLoanStatus:"quited",
                        investAmount:item.inverstAmount,
                        yearRate:(item.minRate * 100).toFixed(1) + "-" + (item.curRate * 100).toFixed(1) + "%",
                        interestRate:item.interestRate && (item.interestRate * 100).toFixed(1) + "%" || 0,
                        redPackageAmount:item.redAmount || 0,
                        investStatus:"clear",//已还清
                        time:item.repayDate,
                        dueInPrincipalAndInterest:item.ysbx,
                        deadline:"",
                        interestMonth:item.interestMonth ? item.interestMonth : 0//加息券的加息期
                    };
                    break;
                default:
                    break;
            }

            return itemAfterProcess;
        });

        return dataAfterProcess;
    }

    function loadListByPageIndexAndListType(pageIndex,listType){
        let mapListTypeToStatus={
          "joining":"join",
          "holding":"hold",
          "quitting":"apply_quit",
          "quited":"success"
        };
        pageIndex= pageIndex || 1;//默认第一页
        ajax({
            ciUrl:"/forever/v2/usersProBuyList.do",
            data:{
                type:"moon",
                status:mapListTypeToStatus[listType],
                reqPageNum:pageIndex
            },
            success(rs){
                if(rs.code === 0){
                    let sourceForUpdate={};
                    sourceForUpdate[listType + "List"]=processDataByListType(listType,rs.data.list);
                    sourceForUpdate[listType + "PageIndex"]=rs.data.pageIndex;
                    MoonLoanInvestmentRecordStore.updateAll(sourceForUpdate);
                    MoonLoanInvestmentRecordStore.trigger("change");
                    MoonLoanInvestmentRecordStore.trigger("pagingIsEnd");
                }
            }
        });
    };


    switch(payload.actionName){
        case "moonLoanInvestmentRecord_getInitialData":

            //获取月满盈账户信息
            ajax({
                ciUrl:"/forever/v2/getUserForeverAccount.do",
                data:{
                    type:"moon"
                },
                success(rs){
                    if(rs.code === 0){
                        MoonLoanInvestmentRecordStore.updateAll({
                            joinAmount:rs.data.joinAmount,
                            applyQuitAmount:rs.data.applyQuitAmount,
                            ysAmount:rs.data.ysAmount
                        });
                        MoonLoanInvestmentRecordStore.trigger("change");
                    }
                }
            });

            //获取加入中列表第一页
            loadListByPageIndexAndListType(1,"joining");

            //获取回款中列表第一页
            loadListByPageIndexAndListType(1,"holding");

            //获取退出中列表第一页
            loadListByPageIndexAndListType(1,"quitting");

            //获取已退出列表第一页
            loadListByPageIndexAndListType(1,"quited");
            break;
        case "moonLoanInvestmentRecord_getNextPage":
            let currListType=payload.data.currListType;
            let requestPageIndex=MoonLoanInvestmentRecordStore.getCurrPageIndex(currListType) +1;

            MoonLoanInvestmentRecordStore.trigger("pagingIsStart");
            loadListByPageIndexAndListType(requestPageIndex,currListType);

            break;
        default:
        //no op
    }
});

module.exports=MoonLoanInvestmentRecordStore;
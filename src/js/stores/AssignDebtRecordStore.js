var MicroEvent = require('../lib/microevent.js');
var appDispatcher=require('../dispatcher/dispatcher.js');
var ajax=require("../lib/ajax.js");

import config from "../config";

var AssignDebtRecordStore={
    _all:{
        currListType:"transferring",//当前视图中列表的类型,oneOf(transferring（转出中）、transfered（已转出）)
        transferringList:[],
        transferringPageIndex:0,
        transferedList:[],
        transferedPageIndex:0
    },
    getAll(){
        return this._all;
    },
    clearAll(){
        this._all={
            currListType:"transferring",
            transferringList:[],
            transferringPageIndex:0,
            transferedList:[],
            transferedPageIndex:0
        };
    },
    updateList(actionType,listType,list,pageIndex){
        switch (actionType){
            case "paging":
                this._all[listType+"List"]=this._all[listType+"List"].concat(list);
                this._all[listType+"ListPageIndex"]=pageIndex;
                break;
            case "filter":
                this._all[listType+"List"]=list;
                this._all[listType+"ListPageIndex"]=pageIndex;
                break;
            default:
                break;
        }
    },
    getPageIndexByListType(listType){
        return this._all[listType+"ListPageIndex"];
    },
    updateAll(source){
        this._all=Object.assign({},this._all,source);
    }
};
MicroEvent.mixin(AssignDebtRecordStore);

appDispatcher.register(function(payload){

    let {
        currListType
        }=AssignDebtRecordStore.getAll();

    function processList(list,pageIndex){
        let newList=[];

        let mapStatusToInvestStatus={
            "转让中":"transferring",
            "已转让":"transfered"
        };

        newList=list.map(function(item,index){
            return {
                id:pageIndex * 10 + index,
                productType:"creditor_product",
                title:item.productTitle,
                investAmount:item.bidAmount,
                remainBidAmount:item.remainBidAmount,//转让之后剩余可购买金额
                dueInPrincipalAndInterest:mapStatusToInvestStatus[item.tranStatus] === "transfered" ? ( item.tranAmount  + item.remainInte - item.tranFee ).toFixed(2) : 0,
                investStatus:mapStatusToInvestStatus[item.status],
                yearRate:(item.yearRate * 100).toFixed(1) + "%",
                rewardRate:item.rewardRate ? (item.rewardRate * 100).toFixed(1) + "%" : 0,
                deadline:(item.curPeriod ? item.curPeriod  : 0 ) + "/" + item.totalPerio+"期",
                investStatus:mapStatusToInvestStatus[item.tranStatus] === "transferring" ? "applying" : "clearing",
                status:mapStatusToInvestStatus[item.tranStatus],
                time:item.tranTime,
                repaymentType:item.repaymentType,
                interestRate:(item.interestRate * 100).toFixed(1) + "%",
                redPackageAmount:item.redAmount,
                interestMonth:item.interestMonth || 0,//0代表没有加息期限，一般界面上不显示"x个月"
                vipRaiseRate:item.vipRaiseRate ? (item.vipRaiseRate * 100).toFixed(1) + "%"  : 0,
                contractUrl:item.caViewUrl || ''
            }
        });

        return newList;
    }

    function loadListAndUpdate(listType,pageIndex){
        ajax({
            ciUrl:"/invest/v2/myTrans.do",
            data:{
                productType:"creditor_product",
                status:listType,
                reqPageNum:pageIndex+""
            },
            success(rs){
                if(rs.code === 0){
                    let newList=processList(rs.data.list,rs.data.pageIndex);
                    let newPageIndex=rs.data.pageIndex;
                    AssignDebtRecordStore.updateList("paging",listType,newList,newPageIndex);
                    AssignDebtRecordStore.trigger("change");
                }
            }
        })
    };

    switch(payload.actionName){
        case "getInitialData_assignDebtRecord":
            loadListAndUpdate("transferring",1);
            loadListAndUpdate("transfered",1);
            break;
        case "toggleListType_assignDebtRecord":
            AssignDebtRecordStore.updateAll({
                currListType:payload.data.listType
            });
            break;
        case "getNextPage_assignDebtRecord":
            let requestPageIndex=AssignDebtRecordStore.getPageIndexByListType(currListType) + 1;
            loadListAndUpdate(currListType,requestPageIndex);
            break;
        default:
        //no op
    }
});

module.exports=AssignDebtRecordStore;
var MicroEvent = require('../lib/microevent.js');
var appDispatcher=require('../dispatcher/dispatcher.js');
var ajax=require("../lib/ajax.js");


var RepaymentCalendarStore={
    _all:{
        repaymentDashboardList:[],
        repaymentDetailList:[],
        repaymentDashboardPageIndex:0,
        repaymentDetailPageIndex:0
    },
    getAll(){
        return this._all;
    },
    clearAll(){
        this._all={
            repaymentDashboardList:[],
            repaymentDetailList:[],
            repaymentDashboardPageIndex:0,
            repaymentDetailPageIndex:0
        };
    },
    getCurrPageIndex(type){
        if(type === "dashboardList"){
            return this._all.repaymentDashboardPageIndex;
        }else {
            return this._all.repaymentDetailPageIndex;
        }
    },
    getCurrDashboardTime(index){
        return this._all.repaymentDashboardList[index].date;
    },
    updateListByType(type,source){
        if(type === "dashboardList"){
            this._all.repaymentDashboardList=this._all.repaymentDashboardList.concat(source.list);
            this._all.repaymentDashboardPageIndex=source.pageIndex;
        }else if(type === "detailList"){
            this._all.repaymentDetailList=source.list;
            this._all.repaymentDetailPageIndex=source.pageIndex;
        }
    }
};
MicroEvent.mixin(RepaymentCalendarStore);


appDispatcher.register(function(payload){
    switch(payload.actionName){
        case "getInitialDashboardData_repaymentCalendar":
            ajax({
                ciUrl:"/user/v2/financialReceivedPlansStat",
                data:{
                    reqPageNum:1,
                    maxResults:100
                },
                success(rs){
                    if(rs.code === 0){
                        RepaymentCalendarStore.updateListByType("dashboardList",{
                            list:rs.data.list,
                            pageIndex:rs.data.pageIndex
                        });
                        RepaymentCalendarStore.trigger("getInitialDashboardDataFinished");
                    }
                }
            });
            break;
        case "getRepaymentDetailList_repaymentCalendar":
            ajax({
                ciUrl:"/user/v2/financialReceivedPlansList",
                data:{
                    date:payload.data.time
                },
                success(rs){
                    if(rs.code === 0){
                        if(rs.data.list.length === 0){
                            RepaymentCalendarStore.trigger("noDetailDataTemporally")
                        }else {
                            RepaymentCalendarStore.updateListByType("detailList",{
                                list:rs.data.list,
                                pageIndex:rs.data.pageIndex
                            });
                            RepaymentCalendarStore.trigger("change");
                        }
                    }
                }
            });
            break;
        default:
        //no op
    }
});

module.exports=RepaymentCalendarStore;
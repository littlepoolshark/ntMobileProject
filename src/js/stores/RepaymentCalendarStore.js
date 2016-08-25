var MicroEvent = require('../lib/microevent.js');
var appDispatcher=require('../dispatcher/dispatcher.js');
var ajax=require("../lib/ajax.js");


var RepaymentCalendarStore={
    _all:{
        currYear:(new Date()).getFullYear(),
        currMonth:(new Date()).getMonth()+1,
        currDate:(new Date()).getDate(),
        monthPickerFrameList:this._generateMonthPickerFrameList(),
        datePickerCellList:[],
        repaymentDetailList:[],
        todayTotalRepaymentAmount:0
    },
    _generateMonthPickerFrameList(){
        function formatMonth(year,month){
            if(month === 0){
                year -=1;
                month=12 - month;
            }else if(month > 12){
                year +=1;
                month=month - 12;
            }
            return {
                text:year + "年" + month + "月",
                value:year+"-" + (month < 10 ? "0"+month : month)
            };
        }
        let currYear=(new Date()).getFullYear();
        let currMonth=(new Date()).getMonth()+1;
        let monthList=[];
        for(let i=0;i<12;i++){
            monthList.push({
                left:i === 0 ? "" : formatMonth(currYear,currMonth+i-1),
                middle:formatMonth(currYear,currMonth+i),
                right:i === 11 ? "" : formatMonth(currYear,currMonth+i+1)
            })
        }
        return monthList;

    },
    _generateDateArray(year,month,repaymentDateArr){
        function getDatesCountOfMonth(Year,Month)
        {
            var d = new Date(Year,Month,0);
            return d.getDate();
        }
        let dateArray=[];
        let datesOfCurrMonth=getDatesCountOfMonth(year,month);//该月有多少天
        let datesOfLastMonth=month - 1 >= 1 ? getDatesCountOfMonth(year,month - 1) : getDatesCountOfMonth(year-1,12);
        let dayOfFirstDay=(new Date(year,month-1,1)).getDay();//该月的第一天是星期几，该值决定了要取上一个月的倒数那些天数，以用来填充日期数组

        //上个月日期序号
        for(let i=dayOfFirstDay;i>0;i--){
            dateArray.push({
                dateNumber:datesOfLastMonth-(i-1),
                isToday:false,
                hasRepayment:false,
                inCurrMonth:false
            });
        }
        //当前月日期序号
        for(let j=1;j <= datesOfCurrMonth;j++){
            dateArray.push({
                dateNumber:j,
                isToday:j === new Date().getDate() ?  true : false,
                hasRepayment:repaymentDateArr.indexOf(j) > -1 ? true : false,
                inCurrMonth:true
            });
        }
        //下个月日期序号
        let daysCountOfNextMonth=35 - dateArray.length;
        for(let k=1;k <= daysCountOfNextMonth;k++){
            dateArray.push({
                dateNumber:k,
                isToday:false,
                hasRepayment:false,
                inCurrMonth:false
            });
        }

        return dateArray;
    },
    getAll(){
        return this._all;
    },
    clearAll(){
        this._all={
            currYear:(new Date()).getFullYear(),
            currMonth:(new Date()).getMonth()+1,
            currDate:(new Date()).getDate(),
            monthPickerFrameList:[],
            datePickerCellList:[],
            repaymentDetailList:[],
            todayTotalRepaymentAmount:0
        };
    },
    getCurrPageIndex(type){
        if(type === "dashboardList"){
            return this._all.repaymentDashboardPageIndex;
        }else {
            return this._all.repaymentDetailPageIndex;
        }
    },
    getCurrMonthTime(index){
        return this._all.monthPickerFrameList[index].middle.value;
    },
    extractRepaymentDate(list){
        let repaymentDateArr=[];
        for(let i=0;i<list.length;i++){
            let date=new Date(list[i].date).getDate();
            repaymentDateArr.push(date);
        }
        return repaymentDateArr;
    },
    //updateListByType(type,source){
    //    if(type === "dashboardList"){
    //        this._all.repaymentDashboardList=this._all.repaymentDashboardList.concat(source.list);
    //        this._all.repaymentDashboardPageIndex=source.pageIndex;
    //    }else if(type === "detailList"){
    //        this._all.repaymentDetailList=source.list;
    //        this._all.repaymentDetailPageIndex=source.pageIndex;
    //    }
    //}
    updateDatePickerCellList(repaymentDateArr){
        let newDatePickerCellList=_generateDateArray(this._all.currYear,this._all.currMonth,repaymentDateArr);
        this._all.datePickerCellList=newDatePickerCellList;
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
                        let repaymentDateArr=RepaymentCalendarStore.extractRepaymentDate(rs.data.list);
                        RepaymentCalendarStore.updateDatePickerCellList(repaymentDateArr);
                        RepaymentCalendarStore.trigger("change");
                    }
                }
            });
            break;
        default:
        //no op
    }
});

/*
 {
 code: 0,
 data: {
 list: [
 {
 amount: 1613.9899999999998,
 date: 2016-04-27,
 recordcount: 2,
 status: paid
 },
 {
 amount: 1210.8,
 date: 2016-04-24,
 recordcount: 1,
 status: paid
 },
 {
 amount: 201.78,
 date: 2016-04-23,
 recordcount: 2,
 status: paid
 },
 {
 amount: 2.75,
 date: 2016-04-19,
 recordcount: 1,
 status: paid
 },
 {
 amount: 0.96,
 date: 2016-04-15,
 recordcount: 1,
 status: paid
 }
 ],
 pageIndex: 3,
 pageSize: 10,
 recordCount: 27
 },
 description: 成功
 }
*/

module.exports=RepaymentCalendarStore;
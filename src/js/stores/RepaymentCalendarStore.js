var MicroEvent = require('../lib/microevent.js');
var appDispatcher=require('../dispatcher/dispatcher.js');
var ajax=require("../lib/ajax.js");

function generateMonthPickerFrameList(){
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
}

var RepaymentCalendarStore={
    _all:{
        currYear:(new Date()).getFullYear(),
        currMonth:(new Date()).getMonth()+1,
        currDate:0,
        monthPickerFrameList:generateMonthPickerFrameList(),
        datePickerCellList:[],
        repaymentDetailList:[],
        repaymentDashboardList:[],//每个月的回款统计列表
        currMonth_zyjbx:0,//当月已结本息
        currMonth_zdsbx:0,//当月待收本息
        todayTotalRepaymentAmount:0
    },
    _generateDateArray(year,month,repaymentDateArr){
        function getDatesCountOfMonth(Year,Month)
        {
            var d = new Date(Year,Month,0);
            return d.getDate();
        }

        function isHasRepayment(date,repaymentArr){
            for(let i=0;i<repaymentArr.length;i++){
                if(date == repaymentArr[i].date){
                    return true;
                }
            }
            return false;
        }

        function getDateStatus(date,repaymentArr){
            let status="";
            for(let i=0;i<repaymentArr.length;i++){
                if(date == repaymentArr[i].date){
                    status=repaymentArr[i].status;
                    break;
                }
            }
            return status;
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
                status:"",
                inCurrMonth:false
            });
        }
        //当前月日期序号
        for(let j=1;j <= datesOfCurrMonth;j++){
            let nowYear=new Date().getFullYear();
            let nowMonth=new Date().getMonth()+1;
            let nowDate=new Date().getDate();
            let isToday= ( nowYear === year && nowMonth === month && j === nowDate) ? true : false;
            let isHasRayment=isHasRepayment(j,repaymentDateArr);
            dateArray.push({
                dateNumber:j,
                isToday:isToday,
                hasRepayment:isHasRayment,
                status:isHasRayment ? getDateStatus(j,repaymentDateArr) : "",
                inCurrMonth:true
            });
        }
        //下个月日期序号
        let daysCountOfNextMonth=35 - dateArray.length;
        daysCountOfNextMonth=daysCountOfNextMonth < 0 ? daysCountOfNextMonth + 7 : daysCountOfNextMonth;
        for(let k=1;k <= daysCountOfNextMonth;k++){
            dateArray.push({
                dateNumber:k,
                isToday:false,
                hasRepayment:false,
                status:"",
                inCurrMonth:false
            });
        }

        return dateArray;
    },
    getAll(){
        return this._all;
    },
    getCurrMonthTime(index){
        return this._all.monthPickerFrameList[index].middle.value;
    },
    getCurrFullTime(){
        let {
            currYear,
            currMonth,
            currDate
            }=this._all;
        return currYear+"-"+(currMonth < 10 ? "0"+currMonth : currMonth)+"-"+(currDate < 10 ? "0"+currDate : currDate);
    },
    _extractRepaymentDateArr(list){
        let repaymentDateArr=[];
        for(let i=0;i<list.length;i++){
            let date=new Date(list[i].date).getDate();
            repaymentDateArr.push({
                date:date,
                status:list[i].status
            });
        }
        return repaymentDateArr;
    },
    _extractTotalRepaymentAmount(list){
        let totalRepaymentAmount=0;
        for(let i=0;i<list.length;i++){
                totalRepaymentAmount +=list[i].interest + list[i].principle;
        }
        return totalRepaymentAmount.toFixed(2);
    },
    updateDatePickerCellList(list){
        let repaymentDateArr=this._extractRepaymentDateArr(list);
        let newDatePickerCellList=this._generateDateArray(this._all.currYear,this._all.currMonth,repaymentDateArr);
        Object.assign(this._all,{
            datePickerCellList:newDatePickerCellList
        });
    },
    updateTodayTotalRepaymentAmount(list){
        let totalRepaymentAmount=this._extractTotalRepaymentAmount(list);
        Object.assign(this._all,{
            todayTotalRepaymentAmount:totalRepaymentAmount
        });
    },
    updateRepaymentDashboardList(list){
        Object.assign(this._all,{
            repaymentDashboardList:list
        });
    },
    updateCurrDate(date){
        Object.assign(this._all,{
            currDate:date
        });
    },
    updateCurrMonthRepaymentDashboard(){//更新当月已结本息和当月待收本息
        let {
            currYear,
            currMonth,
            repaymentDashboardList,
            currMonth_zyjbx,
            currMonth_zdsbx
            }=this._all;
        for(let i=0;i<repaymentDashboardList.length;i++){
            let year=repaymentDashboardList[i].date.split("-")[0];
            let month=repaymentDashboardList[i].date.split("-")[1];
            if(currYear === parseInt(year) && currMonth === parseInt(month)){
                currMonth_zyjbx=repaymentDashboardList[i].zyjbx;
                currMonth_zdsbx=repaymentDashboardList[i].zdsbx;
                break;
            }
        }

        Object.assign(this._all,{
            currMonth_zyjbx:currMonth_zyjbx,
            currMonth_zdsbx:currMonth_zdsbx
        });
    },
    updateCurrYearAndCurrMonth(monthTime){
        let year=monthTime.split("-")[0];
        let month=monthTime.split("-")[1];
        Object.assign(this._all,{
           currYear:parseInt(year),
           currMonth:parseInt(month)
        });
    },
    updateRepaymentDetailList(list){
        Object.assign(this._all,{
            repaymentDetailList:list
        });
    },
    updateBeforeGetDatePickerCellList(source){
        this.updateCurrDate(source.currDate);
        this.updateCurrYearAndCurrMonth(source.monthTime);
        this.updateCurrMonthRepaymentDashboard();
        this._all.repaymentDetailList=[];
        this._all.todayTotalRepaymentAmount=0;
    },
    clearAll(){
        this._all={
            currYear:(new Date()).getFullYear(),
            currMonth:(new Date()).getMonth()+1,
            currDate:0,
            monthPickerFrameList:[],
            datePickerCellList:[],
            repaymentDetailList:[],
            todayTotalRepaymentAmount:0
        };
    }
};
MicroEvent.mixin(RepaymentCalendarStore);


appDispatcher.register(function(payload){
    switch(payload.actionName){
        case "getRepaymentDashboardData_repaymentCalendar":
            ajax({
                ciUrl:"/user/v2/financialReceivedPlansStat",
                data:{
                    reqPageNum:1,
                    maxResults:100
                },
                success(rs){
                    if(rs.code === 0){
                        RepaymentCalendarStore.updateRepaymentDashboardList(rs.data.list);
                        RepaymentCalendarStore.updateCurrMonthRepaymentDashboard();
                        RepaymentCalendarStore.trigger("change");
                    }
                }
            });
            break;
        case "getDatePickerCellList":
            RepaymentCalendarStore.updateBeforeGetDatePickerCellList({
                currDate:0,
                monthTime:payload.data.monthTime
            })
            RepaymentCalendarStore.trigger("change");
            ajax({
                ciUrl:"/user/v2/financialReceivedPlansList",
                data:{
                    date:payload.data.monthTime
                },
                success(rs){
                    if(rs.code === 0){
                        RepaymentCalendarStore.updateDatePickerCellList(rs.data.list);
                        RepaymentCalendarStore.trigger("change");
                    }
                }
            });
            break;
        case "selectDate_repaymentCalendar":
            RepaymentCalendarStore.updateCurrDate(payload.data.date);
            ajax({
                ciUrl:"/user/v2/cal_to_day",
                data:{
                    date:RepaymentCalendarStore.getCurrFullTime()
                },
                success(rs){
                    if(rs.code === 0){
                        RepaymentCalendarStore.updateRepaymentDetailList(rs.data.list);
                        RepaymentCalendarStore.updateTodayTotalRepaymentAmount(rs.data.list);
                        RepaymentCalendarStore.trigger("change");
                    }
                }
            });
            break;
        default:
        //no op
    }
});


module.exports=RepaymentCalendarStore;
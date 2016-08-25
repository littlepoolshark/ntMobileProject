require("../../scss/page/RepaymentCalendar.scss");
let RepaymentCalendarAction=require("../actions/RepaymentCalendarAction");
let RepaymentCalendarStore=require("../stores/RepaymentCalendarStore");
import React from "react";
import classNames from "classnames";


//ui component
import Container from "../UIComponents/Container";
import Slider from "../UIComponents/Slider";
import Group from "../UIComponents/Group";
import Grid from "../UIComponents/Grid";
import Col from "../UIComponents/Col";
import List from "../UIComponents/List";
import Icon from "../UIComponents/Icon";

import NoDataHint from "./utilities/NoDataHint";


let MonthPickerCard=React.createClass({
    _generateMonthList(){
        function formatMonth(year,month){
            if(month === 0){
                year -=1;
                month=12 - month;
            }else if(month > 12){
                year +=1;
                month=month - 12;
            }
            return year + "年" + month + "月";
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
    render(){
        let monthList=this._generateMonthList();
        return (
            <Slider
                pager={false}
                autoPlay={false}
                onAction={this.props.handleSlideFinished}
                loop={false}
                controls={false}
                interval={3600000}
                className="monthPicker-card"
            >
                {
                    monthList.map(function(item,index){
                        return (
                            <Slider.Item key={index+1}>
                                <Grid>
                                    <Col cols={2}>{item.left}</Col>
                                    <Col cols={2} className="active">{item.middle}</Col>
                                    <Col cols={2}>{item.right}</Col>
                                </Grid>
                            </Slider.Item>
                        )
                    }.bind(this))
                }
            </Slider>
        )
    }
});

let RepaymentDashBoard=React.createClass({
    render(){
        return (
            <Grid className="repaymentDashBoard">
                <Col cols={3}>
                    <span className="amount">1000.00</span>
                    <span className="subtitle">当月预计待收本息(元)</span>

                </Col>
                <Col cols={3}>
                    <span className="amount">1000.00</span>
                    <span className="subtitle">当月已收本息(元)</span>
                </Col>
            </Grid>
        )
    }
});


let DatePickerCardCell=React.createClass({
    _handleClick(selectedDate){
        this.props.onAction && this.props.onAction(selectedDate);
    },
    render(){
        let {
            isToday,
            hasRepayment,
            inCurrMonth,
            dateNumber,
            selectedDate
            }=this.props;
        let classes=classNames({
            cell:true,
            highLight:isToday ? true : false,
            mark:hasRepayment ? true : false,
            disabled:!inCurrMonth ? true : false,
            active:selectedDate === dateNumber && inCurrMonth ? true : false
        });
        return (
            <div className={classes} onClick={inCurrMonth ? this._handleClick.bind(null,dateNumber) : null}>
                <span>
                    {dateNumber < 10 ? "0"+dateNumber : dateNumber}
                    {
                        hasRepayment && inCurrMonth ?
                        <Icon classPrefix="imgIcon" name="gold-coin"/>  :
                        null
                    }
                </span>
            </div>
        )
    }
});

let DatePickerCard=React.createClass({
    getInitialState(){
        return {
            selectedDate:(new Date()).getDate()
        }
    },
    /*
    * @desc 用于生成某年某月所对应的日期数组
    *
    * @param {number} year //某一年
    * @param {number} month //某一月，
    */
    _generateDateArray(year,month){
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
        let hasRepaymentArr=[1,2,4,5,6,7,15,16,17,20,21,23,30];
        for(let j=1;j <= datesOfCurrMonth;j++){
            dateArray.push({
                dateNumber:j,
                isToday:j === new Date().getDate() ?  true : false,
                hasRepayment:hasRepaymentArr.indexOf(j) > -1 ? true : false,
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
    _handleClick(selectedDate){
        this.setState({
            selectedDate:selectedDate
        })
    },
    render(){
        let selectedDate=this.state.selectedDate;
        let dateList=this._generateDateArray(2016,9);
        return (
            <Group  style={{margin:0}}>
                <div className="datePicker-card">
                    <div className="datePicker-card-header cf">
                        <div className="cell">日</div>
                        <div className="cell">一</div>
                        <div className="cell">二</div>
                        <div className="cell">三</div>
                        <div className="cell">四</div>
                        <div className="cell">五</div>
                        <div className="cell">六</div>
                    </div>
                    <div className="datePicker-card-body cf">
                        {
                            dateList.map(function(item,index){
                                return (
                                    <DatePickerCardCell
                                        {...item}
                                        key={index+1}
                                        selectedDate={selectedDate}
                                        onAction={this._handleClick}
                                    />
                                )
                            }.bind(this))
                        }
                    </div>
                </div>
            </Group>
        )
    }
});



let TodayRepaymentDetailList=React.createClass({
    _renderItemTitle(item){
        let itemTitle="";
        if(item.status === "paid"){
            itemTitle=item.date + " 已收本息 " + item.recordcount + "笔"
        }else if(item.status === "unpaid"){
            itemTitle=item.date + " 待收本息 " + item.recordcount + "笔"
        }
        return itemTitle;
    },
    render(){
        return (
            <List className="todayRepaymentDetail-list">
                {
                    this.props.list.map(function(item,index){
                        return (
                            <List.Item
                                key={index+1}
                                title="好采投201608-01"
                                after="本金200.00元"
                            />
                        )
                    }.bind(this))
                }
            </List>
        )
    }
});



let TodayTotalRepayment=React.createClass({
    render(){
        return (
            <Group className="todayTotalRepayment" noPadded>
                <div className="wrapper">
                   <span className="red-point"></span>
                   <span className="title">今日回款总额：100元</span>
                </div>
            </Group>
        )
    }
});

//回款日历:RepaymentCalendar component
let RepaymentCalendar=React.createClass({
    getInitialState(){
        return {
            data:RepaymentCalendarStore.getAll(),
            hasDetailData:true
        };
    },
    _handleSlideFinished(index, direction){
        let currTime=RepaymentCalendarStore.getCurrDashboardTime(index);
        RepaymentCalendarAction.getRepaymentDetailList(currTime);
    },
    render(){
        let testData=[{},{},{}];
        let {
            repaymentDashboardList,
            repaymentDetailList
            }=this.state.data;
        return (
            <Container scrollable={true}  id="repaymentCalendar" >
                <MonthPickerCard />
                <RepaymentDashBoard />
                <DatePickerCard/>
                <TodayTotalRepayment/>
                <TodayRepaymentDetailList list={testData}/>
            </Container>
        )
    },
    componentDidMount(){
        RepaymentCalendarAction.getInitialDashboardData();

        RepaymentCalendarStore.bind("getInitialDashboardDataFinished",function(){
            this.setState({
                data:RepaymentCalendarStore.getAll()
            });
            let currTime=RepaymentCalendarStore.getCurrDashboardTime(0);
            RepaymentCalendarAction.getRepaymentDetailList(currTime);
        }.bind(this));

        RepaymentCalendarStore.bind("noDetailDataTemporally",function(){
            this.setState({
                hasDetailData:false
            });
        }.bind(this));

        RepaymentCalendarStore.bind("change",function(){
            this.setState({
                data:RepaymentCalendarStore.getAll(),
                hasDetailData:true
            });
        }.bind(this));
    }
});

module.exports=RepaymentCalendar;
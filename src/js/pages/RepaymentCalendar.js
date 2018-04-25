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
    _next(){
        Slider.next();
    },
    _prev(){
        Slider.prev();
    },
    render(){
        let {
            monthPickerFrameList,
            handleSliderFinished
            }=this.props;
        return (
            <div className="monthPicker-card" id="monthPickerCard">
                <Slider
                    pager={false}
                    autoPlay={false}
                    onAction={handleSliderFinished}
                    loop={false}
                    controls={false}
                    interval={3600000}
                >
                    {
                        monthPickerFrameList.map(function(item,index){
                            return (
                                <Slider.Item key={index+1}>
                                    <Grid>
                                        <Col cols={2} onClick={this._prev}>{item.left.text}</Col>
                                        <Col cols={2} className="active">{item.middle.text}</Col>
                                        <Col cols={2} onClick={this._next}>{item.right.text}</Col>
                                    </Grid>
                                </Slider.Item>
                            )
                        }.bind(this))
                    }
                </Slider>
            </div>

        )
    }
});

let RepaymentDashBoard=React.createClass({
    render(){
        return (
            <Grid className="repaymentDashBoard">
                <Col cols={3}>
                    <span className="amount">{this.props.zdsbx}</span>
                    <span className="subtitle">当月预计待收本息(元)</span>

                </Col>
                <Col cols={3}>
                    <span className="amount">{this.props.zyjbx}</span>
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
  /*  _renderPayOrUnpaidIcon(hasRepayment,inCurrMonth,status){
        if(hasRepayment && inCurrMonth){
            if(status === "paid"){
                return (
                    <Icon classPrefix="imgIcon" name="grey-gold-coin"/>
                )
            }else if(status === "unpaid"){
                return (
                    <Icon classPrefix="imgIcon" name="gold-coin"/>
                )
            }
        }else {
            return null;
        }
    },*/
    render(){
        let {
            isToday,
            hasRepayment,
            status,
            inCurrMonth,
            dateNumber,
            selectedDate
            }=this.props;
        let classes=classNames({
            cell:true,
            highLight:isToday ? true : false,
            mark:hasRepayment ? true : false,
            paid:status === "paid" ? true : false,
            unpaid:status === "unpaid" ? true : false,
            disabled:!inCurrMonth ? true : false,
            active:selectedDate === dateNumber && inCurrMonth ? true : false
        });
        return (
            <div className={classes} onClick={inCurrMonth ? this._handleClick.bind(null,dateNumber) : null}>
                <span>
                    {dateNumber < 10 ? "0"+dateNumber : dateNumber}
                    {
                        hasRepayment && inCurrMonth ?
                        <Icon classPrefix="imgIcon" name={status === "paid" ? "grey-gold-coin" : "gold-coin"}/>  :
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
            selectedDate:0
        }
    },
    _handleClick(selectedDate){
        RepaymentCalendarAction.selectDate(selectedDate);
        this.setState({
            selectedDate:selectedDate
        });
    },
    render(){
        let selectedDate=this.state.selectedDate;
        let dateList=this.props.datePickerCellList;

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
    },
    componentWillReceiveProps(nextProps){
        if(nextProps.currDate === 0){
            this.setState({
                selectedDate:0
            })
        }
    }
});



let TodayRepaymentDetailList=React.createClass({
    _renderItemAfter(item){
        let itemAfter="";
        let statusText=item.status === "paid" ? "已还" : "未还";
        if(item.isCompensationItem){
            itemAfter=(
                <div>提前还款补偿{item.compensationAmount.toFixed(2)}元</div>
            )
        }else {
            if(item.principle !== 0 && item.interest !== 0){
                itemAfter=(
                    <div>{"本息" + (item.principle+item.interest).toFixed(2) + "元"}<strong>{statusText}</strong></div>
                )
            }else if(item.principle !== 0 && item.interest === 0){
                itemAfter=(
                    <div>{"本金" + (item.principle).toFixed(2) + "元"}<strong>{statusText}</strong></div>
                )
            }else if(item.interest !== 0 &&  item.principle === 0){
                if(item.principalDelay === "yes"){
                    itemAfter=(
                        <div>
                            <div>{"利息" + (item.interest).toFixed(2) + "元"}<strong>{statusText}</strong></div>
                            <div>本金<span className="hint-text">债转成功后到账</span></div>
                        </div>
                    )
                }else {
                    itemAfter=(
                        <div>
                            {"利息" + (item.interest).toFixed(2) + "元"}<strong>{statusText}</strong>
                        </div>
                    )
                }
            }
        }

        return itemAfter;
    },
    render(){
        return (
            <List className="todayRepaymentDetail-list">
                {
                    this.props.list.map(function(item,index){
                        return (
                            <List.Item
                                key={index+1}
                                title={item.productName}
                                after={this._renderItemAfter(item)}
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
        if(!!parseFloat(this.props.todayTotalRepaymentAmount)){
            return (
                <Group className="todayTotalRepayment" noPadded>
                    <div className="wrapper">
                        <span className="red-point"></span>
                        <span className="title">今日回款总额：{this.props.todayTotalRepaymentAmount}元</span>
                    </div>
                </Group>
            )
        }else {
            return null;
        }
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
        let currMonthTime=RepaymentCalendarStore.getCurrMonthTime(index);
        RepaymentCalendarAction.getDatePickerCellList(currMonthTime);
    },
    render(){
        let {
            currDate,
            monthPickerFrameList,
            datePickerCellList,
            repaymentDetailList,
            currMonth_zyjbx,
            currMonth_zdsbx,
            todayTotalRepaymentAmount
            }=this.state.data;
        return (
            <div  id="repaymentCalendar" >
                    <MonthPickerCard
                        handleSliderFinished={this._handleSlideFinished}
                        monthPickerFrameList={monthPickerFrameList}
                    />
                    <RepaymentDashBoard
                        zyjbx={currMonth_zyjbx}
                        zdsbx={currMonth_zdsbx}
                    />
                    <DatePickerCard
                        currDate={currDate}
                        datePickerCellList={datePickerCellList}
                    />
                    <TodayTotalRepayment
                        todayTotalRepaymentAmount={todayTotalRepaymentAmount}
                    />
                    <TodayRepaymentDetailList
                        list={repaymentDetailList}
                    />
            </div>
        )
    },
    componentDidMount(){
        //获取某个月有的日历表格中的元素列表，默认获取当前月份的相关数据
        let monthTime=RepaymentCalendarStore.getCurrMonthTime(0);
        RepaymentCalendarAction.getDatePickerCellList(monthTime);

        RepaymentCalendarStore.bind("change",function(){
            this.setState({
                data:RepaymentCalendarStore.getAll(),
                hasDetailData:true
            });
        }.bind(this));

    }
});

module.exports=RepaymentCalendar;
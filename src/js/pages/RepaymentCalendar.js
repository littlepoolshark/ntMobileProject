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
    render(){
        let {
            monthPickerFrameList,
            handleSliderFinished
            }=this.props;
        return (
            <Slider
                pager={false}
                autoPlay={false}
                onAction={handleSliderFinished}
                loop={false}
                controls={false}
                interval={3600000}
                className="monthPicker-card"
            >
                {
                    monthPickerFrameList.map(function(item,index){
                        return (
                            <Slider.Item key={index+1}>
                                <Grid>
                                    <Col cols={2}>{item.left.text}</Col>
                                    <Col cols={2} className="active">{item.middle.text}</Col>
                                    <Col cols={2}>{item.right.text}</Col>
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
            selectedDate:this.props.currDate
        }
    },
    _handleClick(selectedDate){
        this.setState({
            selectedDate:selectedDate
        })
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
    }
});



let TodayRepaymentDetailList=React.createClass({
    _renderItemAfter(item){
        let itemAfter="";
        if(item.priciple !== 0 && item.interest !== 0){
            itemAfter="本息" + (item.priciple+item.interest).toFixed(2) + "元";
        }else if(item.priciple !== 0 && item.interest === 0){
            itemAfter="本金" + (item.priciple).toFixed(2) + "元";
        }else if(item.interest !== 0 &&  item.priciple === 0){
            itemAfter="利息" + (item.interest).toFixed(2) + "元";
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
        let currMonthTime=RepaymentCalendarStore.getCurrMonthTime(index);
        RepaymentCalendarAction.getRepaymentDetailList(currMonthTime);
    },
    render(){
        let {
            currDate,
            monthPickerFrameList,
            datePickerCellList,
            repaymentDetailList
            }=this.state.data;
        return (
            <Container scrollable={true}  id="repaymentCalendar" >
                <MonthPickerCard
                    handleSliderFinished={this._handleSlideFinished}
                    monthPickerFrameList={monthPickerFrameList}
                />
                <RepaymentDashBoard/>
                <DatePickerCard
                    currDate={currDate}
                    datePickerCellList={datePickerCellList}
                    />
                <TodayTotalRepayment/>
                <TodayRepaymentDetailList list={repaymentDetailList}/>
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
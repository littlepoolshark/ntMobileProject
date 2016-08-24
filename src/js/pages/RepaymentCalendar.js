require("../../scss/page/RepaymentCalendar.scss");
let RepaymentCalendarAction=require("../actions/RepaymentCalendarAction");
let RepaymentCalendarStore=require("../stores/RepaymentCalendarStore");
import React from "react";


//ui component
import Container from "../UIComponents/Container";
import Slider from "../UIComponents/Slider";
import Group from "../UIComponents/Group";
import Grid from "../UIComponents/Grid";
import Col from "../UIComponents/Col";
import List from "../UIComponents/List";

import NoDataHint from "./utilities/NoDataHint";


let RepaymentDashBoard=React.createClass({
    _renderDashboardTime(date){
        let time=new Date(date);
        let fullYear=time.getFullYear();
        let month=time.getMonth()+1;
        return fullYear+"年"+ (month < 10 ? "0"+month : month ) + "月份";
    },
    render(){
        return (
            <Slider
                pager={false}
                autoPlay={false}
                onAction={this.props.handleSlideFinished}
                loop={false}
                interval={3600000}
            >
                {
                    this.props.repaymentDashboardList.map(function(item,index){
                        let {
                            date,//当前月份
                            zyjbx,//已收本息
                            zdsbx//待收本息
                            }=item;
                        return (
                            <Slider.Item key={index+1}>
                                <div className="calendar-item">
                                    <div className="title text-center">{this._renderDashboardTime(date)}</div>
                                    <Grid>
                                        <Col cols={3}>
                                            <span className="subtitle">预计待收本息(元)</span>
                                            <span className="amount">{zdsbx}</span>
                                        </Col>
                                        <Col cols={3}>
                                            <span className="subtitle">已收本息(元)</span>
                                            <span className="amount">{zyjbx}</span>
                                        </Col>
                                    </Grid>
                                </div>
                            </Slider.Item>
                        )
                    }.bind(this))
                }
            </Slider>
        )
    }
});

let RepaymentDetailList=React.createClass({
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
            <List id="repaymentDetailList">
                {
                    this.props.repaymentDetailList.map(function(item,index){
                        return (
                            <List.Item
                                key={index+1}
                                title={this._renderItemTitle(item)}
                                after={"￥" + item.amount}
                            />
                        )
                    }.bind(this))
                }
            </List>
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
        let {
            repaymentDashboardList,
            repaymentDetailList
            }=this.state.data;
        return (
            <Container scrollable={this.state.hasDetailData}  id="repaymentCalendar" >

                <RepaymentDashBoard
                    repaymentDashboardList={repaymentDashboardList}
                    handleSlideFinished={this._handleSlideFinished}
                />

                {
                    this.state.hasDetailData && repaymentDetailList.length ?
                    <RepaymentDetailList  repaymentDetailList={repaymentDetailList} /> :
                    <NoDataHint />
                }

                <Group className="datePicker">
                    <table>
                        <thead>
                            <tr>
                                <th>日</th>
                                <th>一</th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tr>
                            <td></td>
                        </tr>
                    </table>
                </Group>

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
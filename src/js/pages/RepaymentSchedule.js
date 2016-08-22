require("../../scss/page/RepaymentSchedule.scss");
/*let RepaymentScheduleAction=require("../actions/RepaymentScheduleAction.js");
let RepaymentScheduleStore=require("../stores/RepaymentScheduleStore.js");*/
import React from "react";

//ui component
import Container from "../UIComponents/Container";
import Group from "../UIComponents/Group";
import Button from "../UIComponents/Button";




//好采投和债权转让汇款进度详情：RepaymentSchedule component
let RepaymentSchedule=React.createClass({
    render(){
        return (
            <Container id="repaymentSchedule" scrollable={true}>
                <Group className="loan-title-group">
                    <div className="header">
                        <span className="title">好采投160101-001</span>
                        <Button amStyle="primary" radius>转让</Button>
                    </div>
                </Group>
                <Group className="loan-detail-group">
                    <div className="header">
                        <span className="title">项目信息</span>
                    </div>
                    <div className="body">
                        <div className="row">
                            <span className="subtitle label">年化收益</span>
                            <span className="number">11.0%+0.5%</span>
                        </div>
                        <div className="row">
                            <span className="subtitle label">项目期限</span>
                            <span className="number">9个月</span>
                        </div>
                        <div className="row">
                            <span className="subtitle label">投资金额</span>
                            <span className="number">￥1000.00</span>
                        </div>
                        <div className="row">
                            <span className="subtitle label">已结本息</span>
                            <span className="number">￥1000.00</span>
                        </div>
                        <div className="row">
                            <span className="subtitle label">待收本息</span>
                            <span className="number">￥20.00</span>
                        </div>
                    </div>
                </Group>
                <Group className="repayment-schedule-group">
                    <div className="header">
                        <span className="title">还款进度</span>
                        <span className="title">8/12期</span>
                    </div>
                    <div className="body">
                        <ul>
                            <li>
                                <div className="section-left">
                                    <span className="title">第1期</span>
                                    <span className="subtitle">约定还款日<br/>2016-01-03</span>
                                </div>
                                <div className="section-middle">
                                    <span className="subtitle label">应收本金：<span className="number">￥0</span></span>
                                    <span className="subtitle label">应还利息：<span className="number">￥0</span></span>
                                    <span className="subtitle label">实还日期：<span className="number">2016-01-03</span></span>
                                </div>
                                <div className="section-right">
                                    <img src="/src/img/icon_seal_daishou.png" alt=""/>
                                </div>
                            </li>
                            <li>
                                <div className="section-left">
                                    <span className="title">第1期</span>
                                    <span className="subtitle">约定还款日<br/>2016-01-03</span>
                                </div>
                                <div className="section-middle">
                                    <span className="subtitle label">应收本金：<span className="number">￥0</span></span>
                                    <span className="subtitle label">应还利息：<span className="number">￥0</span></span>
                                    <span className="subtitle label">实还日期：<span className="number">2016-01-03</span></span>
                                </div>
                                <div className="section-right">
                                    <img src="/src/img/icon_seal_daishou.png" alt=""/>
                                </div>
                            </li>
                            <li>
                                <div className="section-left">
                                    <span className="title">第1期</span>
                                    <span className="subtitle">约定还款日<br/>2016-01-03</span>
                                </div>
                                <div className="section-middle">
                                    <span className="subtitle label">应收本金：<span className="number">￥0</span></span>
                                    <span className="subtitle label">应还利息：<span className="number">￥0</span></span>
                                    <span className="subtitle label">实还日期：<span className="number">2016-01-03</span></span>
                                </div>
                                <div className="section-right">
                                    <img src="/src/img/icon_seal_daishou.png" alt=""/>
                                </div>
                            </li><li>
                            <div className="section-left">
                                <span className="title">第1期</span>
                                <span className="subtitle">约定还款日<br/>2016-01-03</span>
                            </div>
                            <div className="section-middle">
                                <span className="subtitle label">应收本金：<span className="number">￥0</span></span>
                                <span className="subtitle label">应还利息：<span className="number">￥0</span></span>
                                <span className="subtitle label">实还日期：<span className="number">2016-01-03</span></span>
                            </div>
                            <div className="section-right">
                                <img src="/src/img/icon_seal_daishou.png" alt=""/>
                            </div>
                        </li>

                        </ul>
                    </div>
                </Group>
            </Container>
        )
    }
});

RepaymentSchedule.contextTypes = {
    router:React.PropTypes.object.isRequired
};

module.exports=RepaymentSchedule;
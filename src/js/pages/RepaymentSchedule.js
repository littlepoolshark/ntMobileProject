require("../../scss/page/RepaymentSchedule.scss");
let RepaymentScheduleAction=require("../actions/RepaymentScheduleAction.js");
let RepaymentScheduleStore=require("../stores/RepaymentScheduleStore.js");
import React from "react";

//ui component
import Container from "../UIComponents/Container";
import Group from "../UIComponents/Group";
import Button from "../UIComponents/Button";


let RepaymentScheduleItem=React.createClass({
    render(){
        let {
            expectRepayTimeString,
            interest,
            periodNo,
            principal,
            realRepayTimeString,
            recoveryStatus,
            status
            }=this.props;
        return (
            <li>
                <div className="section-left">
                    <span className="title">第{periodNo}期</span>
                    <span className="subtitle">约定还款日<br/>{expectRepayTimeString}</span>
                </div>
                <div className="section-middle">
                    <span className="subtitle label">应收本金：<span className="number">￥{principal}</span></span>
                    <span className="subtitle label">应还利息：<span className="number">￥{interest}</span></span>
                    <span className="subtitle label">实还日期：<span className="number">{realRepayTimeString}</span></span>
                </div>
                <div className="section-right">
                    {
                        status === "paid" ?
                        <img src="/src/img/icon_seal_yishou.png" alt=""/> :
                        <img src="/src/img/icon_seal_daishou.png" alt=""/>
                    }
                </div>
            </li>
        )
    }
});

//好采投和债权转让汇款进度详情：RepaymentSchedule component
let RepaymentSchedule=React.createClass({
    getInitialState(){
        return RepaymentScheduleStore.getAll();
    },
    render(){
        let {
            title,
            repaymentMonth,
            apr,
            rewardRate,
            investMoney,
            yjbx,
            dsbx,
            qsNum
            }=this.state.loanInfo;

        return (
            <Container id="repaymentSchedule" scrollable={true}>
                <Group className="loan-title-group">
                    <div className="header">
                        <span className="title">{title}</span>
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
                            <span className="number">{(apr * 100).toFixed(1) + (rewardRate ? "+" + (rewardRate * 100).toFixed(1) + "%" : "")}</span>
                        </div>
                        <div className="row">
                            <span className="subtitle label">项目期限</span>
                            <span className="number">{repaymentMonth}个月</span>
                        </div>
                        <div className="row">
                            <span className="subtitle label">投资金额</span>
                            <span className="number">￥{investMoney}</span>
                        </div>
                        <div className="row">
                            <span className="subtitle label">已结本息</span>
                            <span className="number">￥{yjbx}</span>
                        </div>
                        <div className="row">
                            <span className="subtitle label">待收本息</span>
                            <span className="number">￥{dsbx}</span>
                        </div>
                    </div>
                </Group>
                <Group className="repayment-schedule-group">
                    <div className="header">
                        <span className="title">还款进度</span>
                        <span className="title">{qsNum}期</span>
                    </div>
                    <div className="body">
                        <ul>
                            {
                                this.state.list.map(function(item,index){
                                    return (
                                        <RepaymentScheduleItem {...item} key={index+1}/>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </Group>
            </Container>
        )
    },
    componentDidMount(){
        RepaymentScheduleAction.getRepaymentScheduleData();

        RepaymentScheduleStore.bind("change",function(){
            this.setState(RepaymentScheduleStore.getAll());
        }.bind(this));
    }
});

RepaymentSchedule.contextTypes = {
    router:React.PropTypes.object.isRequired
};

module.exports=RepaymentSchedule;
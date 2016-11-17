require("../../scss/page/RepaymentSchedule.scss");
let RepaymentScheduleAction=require("../actions/RepaymentScheduleAction.js");
let RepaymentScheduleStore=require("../stores/RepaymentScheduleStore.js");
let UserHomeAction=require("../actions/UserHomeAction.js");
let UserHomeStore=require("../stores/UserHomeStore.js");
import React from "react";
import classNames from "classnames";

//ui component
import Container from "../UIComponents/Container";
import Group from "../UIComponents/Group";
import Button from "../UIComponents/Button";
import NoDataHint from "./utilities/NoDataHint";
import Icon from "../UIComponents/Icon";
import Modal from "../UIComponents/modal/Modal";


//好采投和债权转让汇款进度详情：RepaymentSchedule component
let RepaymentSchedule=React.createClass({
    getInitialState(){
        return {
            data:RepaymentScheduleStore.getAll(),
            isModalOpen:false,
            confirmText:""
        }
    },
    _handleAssignmentBtnClick(){
        UserHomeAction.transferDebtCheck();
    },
    _jumpToNextLocation(confirm){
        if(confirm){
            this.context.router.push({
                pathname:"securityCenter"
            })
        }else {
            this._handleModalClose();
        }

    },
    _handleModalClose(){
        this.setState({
            isModalOpen:false
        })
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
            }=this.state.data.loanInfo;

        let {
            productType,
            status,
            investAmount
            }=this.props.location.query;

        let yearRate=(apr * 100).toFixed(1) + "%"+ (rewardRate ? "+" + (rewardRate * 100).toFixed(1) + "%" : "");
        let tagClasses=classNames({
            tag:true,
            holding:status === "holding",
            applying:status === "orderring",
            clearing:status === "paid",
            transfered:status === "transfered"
        });

        return (
            <Container id="repaymentSchedule" scrollable={true}>
                <Group className="loan-title-group">
                    <div className="header">
                        <span className="title">{title}</span>
                        {
                            productType === "creditor_product" ?
                            <Icon classPrefix="imgIcon" name="transfer"/> :
                            null
                        }
                        {
                            status === "holding" ?
                            <Button amStyle="primary" radius onClick={this._handleAssignmentBtnClick}>转让</Button> :
                            null
                        }
                    </div>
                    <div className={tagClasses}></div>
                </Group>
                <Group className="loan-detail-group">
                    <div className="header">
                        <span className="title">项目信息</span>
                    </div>
                    <div className="body">
                        <div className="row">
                            <span className="subtitle label">预期年化</span>
                            <span className="number">{yearRate}</span>
                        </div>
                        <div className="row">
                            <span className="subtitle label">项目期限</span>
                            <span className="number">{repaymentMonth}个月</span>
                        </div>
                        <div className="row">
                            <span className="subtitle label">投资金额</span>
                            <span className="number">￥{investAmount}</span>
                        </div>
                        <div className="row">
                            <span className="subtitle label">已结本息</span>
                            <span className="number">￥{!!yjbx ? yjbx.toFixed(2) : yjbx}</span>
                        </div>
                        <div className="row">
                            <span className="subtitle label">待收本息</span>
                            <span className="number">￥{!!dsbx ? dsbx.toFixed(2) : dsbx}</span>
                        </div>
                    </div>
                </Group>
                <Group className="repayment-schedule-group">
                    <div className="header">
                        <span className="title">回款进度</span>
                        <span className="title">{qsNum}期</span>
                    </div>
                    <div className="body">
                        <ul>
                            {
                                this.state.data.list.map(function(item,index){
                                    return (
                                        <RepaymentScheduleItem {...item} key={index+1}/>
                                    )
                                })
                            }
                        </ul>
                        {
                            this.state.data.list.length <= 0 ?  <NoDataHint style={{margin:"2rem 0"}}/> : null
                        }
                    </div>
                </Group>
                <Modal
                    title="提示"
                    ref="modal"
                    isOpen={this.state.isModalOpen}
                    role="confirm"
                    onAction={this._jumpToNextLocation}
                >
                    {this.state.confirmText}
                </Modal>
            </Container>
        )
    },
    componentDidMount(){
        let {
            loanId,
            creditorId,
            productType
            }=this.props.location.query;
        //RepaymentScheduleAction.getRepaymentScheduleData(loanId,productType === "loan_product" && creditorId ? creditorId : null);
        RepaymentScheduleAction.getRepaymentScheduleData(loanId,creditorId);
        UserHomeAction.getUserInfoDetail();

        RepaymentScheduleStore.bind("change",function(){
            this.setState(RepaymentScheduleStore.getAll());
        }.bind(this));

        UserHomeStore.bind("ZXBankOpenCheckFailed",function(){
            this.setState({
                isModalOpen:true,
                confirmText:"为了您的资金安全，请先开通银行存管"
            })
        }.bind(this));


        UserHomeStore.bind("dealPasswordSetCheckFailed",function(){
            this.setState({
                isModalOpen:true,
                confirmText:"为了您的资金安全，请先设置交易密码"
            })
        }.bind(this));

        UserHomeStore.bind("transferDebtCheckSuccess",function(){
            let {
                  creditorId
                }=this.props.location.query;
            let investMoney=this.state.data.loanInfo.investMoney;
            this.context.router.push({
                 pathname:"assignmentOfDebt",
                 query:{
                     creditorId:creditorId,
                     investMoney:investMoney
                 }
             });
        }.bind(this));


    },
    componentWillUnmount(){
        RepaymentScheduleStore.clearAll();
    }
});


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
                    <span className="subtitle label">应还利息：<span className="number">￥{interest.toFixed(2)}</span></span>
                    <span className="subtitle label">实还日期：<span className="number">{!!realRepayTimeString ? realRepayTimeString : "--"}</span></span>
                </div>
                <div className="section-right">
                    {
                        status === "paid" ?
                            <img src={require("../../img/icon_seal_yishou.png")} alt=""/> :
                            <img src={require("../../img/icon_seal_daishou.png")} alt=""/>
                    }
                </div>
            </li>
        )
    }
});

RepaymentSchedule.contextTypes = {
    router:React.PropTypes.object.isRequired
};

module.exports=RepaymentSchedule;
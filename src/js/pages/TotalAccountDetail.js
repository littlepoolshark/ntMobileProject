require("../../scss/page/TotalAccountDetail.scss");
let TotalAccountDetailAction=require("../actions/TotalAccountDetailAction.js");
let TotalAccountDetailStore=require("../stores/TotalAccountDetailStore.js");
let UserHomeAction=require("../actions/UserHomeAction.js");
let UserHomeStore=require("../stores/UserHomeStore.js");
import React from "react";
import {
    Link
} from 'react-router';
import Chart from "chart.js";

import Container from "../UIComponents/Container";
import Button from "../UIComponents/Button";
import Group from "../UIComponents/Group";
import NavBar from "../UIComponents/NavBar";
import List from "../UIComponents/List";
import Modal from "../UIComponents/modal/Modal";



//用户中心页面：TotalAccountDetail component
let TotalAccountDetail=React.createClass({
    getInitialState(){
        return {
            accountInfo:TotalAccountDetailStore.getAll(),
            isModalOpen:false,
            confirmText:"",
            nextLocation:""
        }
    },
    _handleNavClick(obj){
        if(obj.title === "返回"){
            this.context.router.goBack();
        }else if(obj.title === "资金流水"){
            this._jumpToJournalAccount();
        }
    },
    _jumpToJournalAccount(){
        this.context.router.push({
            pathname:"JournalAccount"
        })
    },
    _drawDoughnutChart(dataArr){
        //使用canvas画资产环形图
        let ctx = document.getElementById("myChart");
        let data = {
            labels: [],
            datasets: [
                {
                    data: dataArr,
                    backgroundColor: [
                        "#ff7659",
                        "#ffbe40",
                        "#a2c221",
                        "#3abbce",
                        "#ae7bb4"
                    ]
                }]
        };
        let myDoughnutChart = new Chart(ctx, {
            type: 'doughnut',
            data: data,
            options:{
                cutoutPercentage:90
            }
        });
    },
    _handleRechargeClick(){
        UserHomeAction.recharge();
    },
    _handleWithdrawClick(){
        UserHomeAction.withdraw();
    },
    _jumpToNextLocation(confirm){
        if(confirm){
            let locationData={
                pathname:this.state.nextLocation,
                query:{}
            }
            if(this.state.nextLocation === "bindBankCard"){
                locationData.query.realName=UserHomeStore.getAll().personInfo.realName;
            }
            this.context.router.push(locationData);
        }else {
            this._handleModalClose();
        }

    },
    _handleModalClose(){
        this.setState({
            isModalOpen:false
        });
    },
    render(){
        let rightNav= {
            component:"a",
            title: "资金流水"
        };
        let leftNav= {
            component:"a",
            icon: 'left-nav',
            title: '返回'
        };
        let {
            total,
            ttzAmount,
            dqAmount,
            available,
            jrAmount,
            withdraw
         }=this.state;
        return (
            <Container scrollable={false} id="totalAccountDetail">
                <NavBar
                    title="总资产明细"
                    rightNav={[rightNav]}
                    leftNav={[leftNav]}
                    amStyle="primary"
                    onAction={this._handleNavClick}
                />

                <div className="doughnut-box">
                    <canvas id="myChart" width="200" height="200"></canvas>
                    <div className="doughnut-body">
                        <span className="amount">{total}</span>
                        <span className="subtitle">总资产(元)</span>
                    </div>
                </div>

                <List id="legendList">
                    <List.Item
                        title={<span className="list-item-title"><span className="legend-color-block c1" ></span><span>活期资产</span></span>}
                        after={ttzAmount === 0 ? "0" : ttzAmount}
                    />
                    <List.Item
                        title={<span className="list-item-title"><span className="legend-color-block c2" ></span><span>定期资产</span></span>}
                        after={dqAmount === 0 ? "0" : dqAmount}
                    />
                    <List.Item
                        title={<span className="list-item-title"><span className="legend-color-block c3" ></span><span>可用余额</span></span>}
                        after={available === 0 ? "0" : available}
                    />
                    <List.Item
                        title={<span className="list-item-title"><span className="legend-color-block c4" ></span><span>加入金额</span></span>}
                        after={jrAmount === 0 ? "0" : jrAmount}
                    />
                    <List.Item
                        title={<span className="list-item-title"><span className="legend-color-block c5" ></span><span>提现中金额</span></span>}
                        after={withdraw === 0 ? "0" : withdraw}
                    />
                </List>

                <div className="buttons-wrapper" style={{padding:"0 0.9375rem",marginTop:"1rem"}}>
                    <Button amStyle="primary"  radius={true} className="recharge-btn" onClick={this._handleRechargeClick}>充值</Button>
                    <Button amStyle="warning"  radius={true} className="withdraw-btn" onClick={this._handleWithdrawClick}>提现</Button>
                </div>
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
        TotalAccountDetailAction.getAccountInfoFromServer();



        TotalAccountDetailStore.bind("change",function(){
            let {
                ttzAmount,
                dqAmount,
                available,
                jrAmount,
                withdraw
            }=TotalAccountDetailStore.getAll();

            let doughnutDate=[ttzAmount,dqAmount,available,jrAmount,withdraw];
            this._drawDoughnutChart(doughnutDate)
            this.setState(TotalAccountDetailStore.getAll());
        }.bind(this));


        //银行卡已经绑定则跳转到充值页面/提现页面，否则调转到绑卡页面
        UserHomeStore.bind("rechargeCheckSuccess",function(){
            this.context.router.push({
                pathname:"recharge"
            });
        }.bind(this));

        UserHomeStore.bind("withdrawCheckSuccess",function(){
            this.context.router.push({
                pathname:"withdraw"
            });
        }.bind(this));

        UserHomeStore.bind("securityCheckFailed",function(){
            this.setState({
                isModalOpen:true,
                confirmText:"为了资金安全，请升级您的账户安全级别!",
                nextLocation:"securityCenter"
            })
        }.bind(this));

        UserHomeStore.bind("bankCardIsNotBind",function(){
            this.setState({
                isModalOpen:true,
                confirmText:"充值或者提现需要先绑定银行卡，去绑卡？",
                nextLocation:"bindBankCard"
            })
        }.bind(this));

        UserHomeStore.bind("bankCardIntegrityCheckFailed",function(){
            this.setState({
                isModalOpen:true,
                confirmText:"为了资金安全，提现需要完整的银行卡信息，去完善？",
                nextLocation:"myBankCardDetail"
            })
        }.bind(this));
    }
});

TotalAccountDetail.contextTypes = {
    router:React.PropTypes.object.isRequired
};

module.exports=TotalAccountDetail;
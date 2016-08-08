require("../../scss/page/Withdraw.scss");
let WithdrawAction=require("../actions/WithdrawAction.js");
let WithdrawStore=require("../stores/WithdrawStore.js");
import { Link } from "react-router";

import React from "react";
import classNames from 'classnames';

import Container from "../UIComponents/Container";
import Button from "../UIComponents/Button";
import Field from "../UIComponents/Field";
import List from "../UIComponents/List";
import Icon from "../UIComponents/Icon";
import Group from "../UIComponents/Group";
import Message from "../UIComponents/Message";
import Modal from "../UIComponents/modal/Modal";

import BankCard from "./utilities/BankCard";
import Slogan from "./utilities/Slogan";


//充值组件
let Withdraw=React.createClass({
    getInitialState(){
        return {
            showSlogan:true,
            data:WithdrawStore.getAll(),
            isModalOpen:false
        }
    },
    _submitWithdrawForm(){
        let dealPassword=this.refs.dealPassword.getValue();
        WithdrawAction.submitWithdrawForm(dealPassword);
    },
    _handleWithdrawAmountChange(){
        let withdrawAmount=this.refs.withdrawAmount.getValue();
        withdrawAmount=withdrawAmount === "" ? 0 : parseFloat(withdrawAmount);
        WithdrawAction.changeWithdrawAmount(withdrawAmount);
    },
    _jumpToNextLocation(confirm){
        if(confirm){
            WithdrawAction.confirmToSubmit();
        }
        this.setState({
            isModalOpen:false
        });
    },
    render (){
        let {
            withdrawAmount,
            handlingCharge,
            acctAccount,
            bankCardInfo,
            available
            }=this.state.data;
        return (
            <Container  {...this.props} scrollable={false} id="withdraw" >
                <BankCard {...bankCardInfo}/>
                <Group
                    header={ "可提现金额"+available+"元"}
                    noPadded
                    className="withdraw-form"
                    >
                    <List>
                        <List.Item
                            nested="input"
                            >
                            <Field
                                type="number"
                                label="提现金额"
                                placeholder="提现金额不能少于2.00元"
                                ref="withdrawAmount"
                                onChange={this._handleWithdrawAmountChange}
                                />
                        </List.Item>
                        <List.Item
                            nested="input"
                            >
                            <Field
                                type="text"
                                label="交易密码"
                                placeholder="请输入交易密码"
                                ref="dealPassword"
                                />
                        </List.Item>
                    </List>

                </Group>
                <div className="forgetPassword-wrapper">
                    <Link to="getBackDealPassword" >忘记密码?</Link>
                </div>
                <div className="" style={{padding:"0 0.9375rem",marginTop:"2rem"}}>
                    <Button amStyle="primary" block radius={true} onClick={this._submitWithdrawForm}>完成提现</Button>
                </div>
                {
                    this.state.showSlogan ?
                    <Slogan />    :
                    null
                }
                <Modal
                    title="确认"
                    ref="modal"
                    isOpen={this.state.isModalOpen}
                    role="confirm"
                    onAction={this._jumpToNextLocation}
                >
                    <div>提现金额：{withdrawAmount}元</div>
                    <div>手续费：{handlingCharge}元</div>
                    <div>实际到账：{acctAccount}元</div>
                </Modal>
            </Container>
        )
    },
    componentDidMount(){
        WithdrawAction.getBankCardInfoFromServer();
        WithdrawAction.getUserBalance();

        //解决了由于输入框获得焦点后，虚拟键盘会把slogan组件顶上去的细节。
        let originHeight=window.innerHeight;
        window.onresize=function(){
            let currHeight=window.innerHeight;
            this.setState({
               showSlogan:currHeight < originHeight ? false : true
            });
        }.bind(this);

        WithdrawStore.bind("formCheckFailed",function(msg){
            Message.broadcast(msg);
        });

        WithdrawStore.bind("confirmSubmit",function(){
            this.setState({
                isModalOpen:true
            })
        }.bind(this));

        WithdrawStore.bind("withdrawFailed",function(msg){
            Message.broadcast(msg);
        });

        WithdrawStore.bind("withdrawSuccess",function(){
            Message.broadcast("提现成功！");
        });

        WithdrawStore.bind("change",function(){
            this.setState({
                data:WithdrawStore.getAll()
            })
        }.bind(this));

    },
    componentWillUnmount(){
        WithdrawStore.unbind("formCheckSuccess");
        WithdrawStore.unbind("formCheckFailed");
    }
});

Withdraw.contextTypes = {
    router:React.PropTypes.object.isRequired
};

module.exports=Withdraw;
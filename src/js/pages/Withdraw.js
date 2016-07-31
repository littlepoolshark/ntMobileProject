require("../../scss/page/Withdraw.scss");
//let WithdrawAction=require("../actions/WithdrawAction.js");
//let WithdrawStore=require("../stores/WithdrawStore.js");
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

import BankCard from "./utilities/BankCard";
import Slogan from "./utilities/Slogan";


//充值组件
let Withdraw=React.createClass({
    getInitialState(){
        return {
            showSlogan:true
        }
    },
  /*  _handleWithdrawSubmit(){
        WithdrawAction.recharge();
    },
    _handleWithdrawAmountChange(){
        let rechargeAmount=this.refs.rechargeAmount.getValue();
        WithdrawAction.changeWithdrawAmount(parseFloat(rechargeAmount ? rechargeAmount : 0));
    },*/
    render (){
        let bankCardInfo={
            bankName:"中国银行",
            cardno:"6225 **** **** 7889",
            shortIcon:"/src/img/choice_icon_ccb.png",
            groupTitle:"提现至该银行卡"
        };
        return (
            <Container  {...this.props} scrollable={false} id="withdraw" >
                <BankCard {...bankCardInfo}/>
                <Group
                    header="可提现金额：50.93"
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
                                placeholder="请输入提现金额"
                                ref="withdrawAmount"
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
                    <Button amStyle="primary" block radius={true} >完成提现</Button>
                </div>
                {
                    this.state.showSlogan ?
                    <Slogan />    :
                    null
                }

            </Container>
        )
    },
    componentDidMount(){
        //解决了由于输入框获得焦点后，虚拟键盘会把slogan组件顶上去的细节。
        let originHeight=window.innerHeight;
        window.onresize=function(){
            let currHeight=window.innerHeight;
            this.setState({
               showSlogan:currHeight < originHeight ? false : true
            });
        }.bind(this);
    }
});

Withdraw.contextTypes = {
    router:React.PropTypes.object.isRequired
};

module.exports=Withdraw;
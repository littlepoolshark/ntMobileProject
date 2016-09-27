require("../../scss/page/Recharge.scss");
let RechargeAction=require("../actions/RechargeAction.js");
let RechargeStore=require("../stores/RechargeStore.js");

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


let RechargeAmountSelection=React.createClass({
    getInitialState(){
        return {
            currRechargeAmount:0
        }
    },
    _selectRechargeAmount(amount){
        this.props.SelectionHandler && this.props.SelectionHandler(amount);
        this.setState({
            currRechargeAmount:amount
        });
    },
    render(){
        let rechargeAmountArr=[10000,2000,1000,500,100];
        let currRechargeAmount=this.state.currRechargeAmount;
        return (
            <div className="rechargeAmount-selectionBar">
                {
                    rechargeAmountArr.map(function(item,index){
                        let spanClass=classNames({
                            active:currRechargeAmount === item
                        });
                        return (
                            <span
                                className={spanClass}
                                onClick={this._selectRechargeAmount.bind(null,item)}
                                key={index}
                            >
                                {item}
                            </span>
                        )
                    }.bind(this))
                }
            </div>
        )
    }
});

//充值组件
let Recharge=React.createClass({
    getInitialState(){
        return RechargeStore.getAll()
    },
    _handleRechargeSubmit(){
        RechargeAction.recharge();
    },
    _handleRechargeAmountChange(){
        let rechargeAmount=this.refs.rechargeAmount.getValue();
        RechargeAction.changeRechargeAmount(parseFloat(rechargeAmount ? rechargeAmount : 0));
    },
    _selectRechargeAmount(amount){
        RechargeAction.changeRechargeAmount(amount);
    },
    render (){
        let bankCardInfo=this.state;
        let {
            rechargeAmount,
            singleLimit,
            everydayLimit
            }=this.state;
        let everydayLimitText=everydayLimit > 0 ? "单日限额"+everydayLimit+"元" : "单日无限额";
        let warmHintText="单笔限额"+singleLimit+"元，" + everydayLimitText;
        return (
            <Container  {...this.props} scrollable={false} id="recharge">
                <BankCard {...bankCardInfo}/>
                <Group
                    header={warmHintText}
                    noPadded
                >
                    <List>
                        <List.Item
                            nested="input"
                        >
                            <Field
                                type="number"
                                label="金额"
                                placeholder="充值金额必须大于10.00元"
                                ref="rechargeAmount"
                                value={rechargeAmount ? rechargeAmount : ""}
                                onChange={this._handleRechargeAmountChange}
                            />
                        </List.Item>
                    </List>
                </Group>

                <RechargeAmountSelection SelectionHandler={this._selectRechargeAmount} />

                <div className="" style={{padding:"0 0.9375rem",marginTop:"2rem"}}>
                    <Button amStyle="primary" block radius={true} onClick={this._handleRechargeSubmit}>完成充值</Button>
                </div>
            </Container>
        )
    },
    componentDidMount(){
        let rechargeAmount=this.props.location.query.rechargeAmount;
        if(rechargeAmount !== undefined){
            RechargeAction.changeRechargeAmount(rechargeAmount);
        }
        RechargeAction.getBankCardInfoFromServer();

        RechargeStore.bind("change",function(){
            this.setState(RechargeStore.getAll());
        }.bind(this));

        RechargeStore.bind("rechargeAmountCheckFailed",function(msg){
            Message.broadcast(msg);
        });

        RechargeStore.bind("rechargeSuccess",function(){
            Message.broadcast("充值成功！");
        });

        RechargeStore.bind("rechargeFailed",function(msg){
            Message.broadcast(msg);
        });
    },
    componentWillUnmount(){
        RechargeStore.clearAll();
    }
});

Recharge.contextTypes = {
    router:React.PropTypes.object.isRequired
};

module.exports=Recharge;
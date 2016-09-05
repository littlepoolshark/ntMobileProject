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
    render (){
        let bankCardInfo=this.state;
        let reChargeAmount=this.state.rechargeAmount;
        return (
            <Container  {...this.props} scrollable={false} id="recharge">
                <BankCard {...bankCardInfo}/>
                <Group
                    header=""
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
                                value={reChargeAmount ? reChargeAmount : ""}
                                onChange={this._handleRechargeAmountChange}
                            />
                        </List.Item>
                    </List>
                </Group>
                <div className="" style={{padding:"0 0.9375rem",marginTop:"2rem"}}>
                    <Button amStyle="primary" block radius={true} onClick={this._handleRechargeSubmit}>完成充值</Button>
                </div>
            </Container>
        )
    },
    componentDidMount(){
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


    }
});

Recharge.contextTypes = {
    router:React.PropTypes.object.isRequired
};

module.exports=Recharge;
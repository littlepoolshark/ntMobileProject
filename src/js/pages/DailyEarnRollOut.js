require("../../scss/page/DailyEarnRollOut.scss");
let DailyEarnRollOutAction=require("../actions/DailyEarnRollOutAction.js");
let DailyEarnRollOutStore=require("../stores/DailyEarnRollOutStore.js");
import React from "react";

import Container from "../UIComponents/Container";
import Button from "../UIComponents/Button";
import Group from "../UIComponents/Group";
import List from "../UIComponents/List";
import Field from "../UIComponents/Field";
import Message from "../UIComponents/Message";


//天天赚转出：DailyEarnRollOut component
let DailyEarnRollOut=React.createClass({
    getInitialState(){
        return DailyEarnRollOutStore.getAll();
    },
    _handleRollOutBtnClick(){
        DailyEarnRollOutAction.rollOutDailyEarn();
    },
    _handleRollOutAmountChange(){
        let rollOutAmount=this.refs.rollOutAmount.getValue();
        DailyEarnRollOutAction.changeRollOutAmount(rollOutAmount.replace(/\D/g,""));
    },
    render(){
        let {
            sysAmount,
            totoalIn,
            rollOutAmount
            }=this.state;
        return (
            <Container scrollable={false} id="dailyEarnRollOut">

                <Group noPadded={true} className="dailyEarn-rollOut-dashboard">
                    <div className="dailyEarn-holding-amount">
                        <span className="subtitle">当前可转出金额(元)</span>
                        <span className="amount">{totoalIn}</span>
                    </div>
                    <div className="dailyEarn-rollOut-amount">
                        <span className="subtitle">今日平台剩余可转额度(元)</span>
                        <span className="amount">{sysAmount < 0 ? 0 : sysAmount }</span>
                    </div>
                </Group>



                <List>
                    <List.Item nested="input" >
                        <Field
                            type="text"
                            label="转出金额"
                            placeholder="请输入100的整数倍"
                            ref="rollOutAmount"
                            value={rollOutAmount === 0 ? "" : rollOutAmount}
                            onChange={this._handleRollOutAmountChange}
                        />

                    </List.Item>
                </List>

                <div className="btns-wrapper">
                    <Button amStyle="primary" radius block onClick={this._handleRollOutBtnClick}>确认转出</Button>
                </div>
            </Container>
        )
    },
    componentDidMount(){
        DailyEarnRollOutAction.getDailyEarnRollOutInfo();

        DailyEarnRollOutStore.bind("change",function(){
            this.setState(DailyEarnRollOutStore.getAll())
        }.bind(this));

        DailyEarnRollOutStore.bind("rollOutSuccess",function(rollOutAmount){
            this.context.router.push({
                pathname:"dailyEarnRollOutSuccess",
                query:{
                    rollOutAmount:rollOutAmount
                }
            })
        }.bind(this));

        DailyEarnRollOutStore.bind("rollOutFailed",function(msg){
            Message.broadcast(msg);
        });

    }
});

DailyEarnRollOut.contextTypes = {
    router:React.PropTypes.object.isRequired
};

module.exports=DailyEarnRollOut;
require("../../scss/page/AssignmentOfDebt.scss");
let AssignmentOfDebtAction=require("../actions/AssignmentOfDebtAction");
let AssignmentOfDebtStore=require("../stores/AssignmentOfDebtStore");
import React from "react";
import {
    Link
} from 'react-router';

import Container from "../UIComponents/Container";
import Group from "../UIComponents/Group";
import Field from "../UIComponents/Field";
import List from "../UIComponents/List";
import Button from "../UIComponents/Button";
import Message from "../UIComponents/Message";

//债权转让组件：AssignmentOfDebt component
let AssignmentOfDebt=React.createClass({
    getInitialState(){
        return AssignmentOfDebtStore.getAll();
    },
    _handleSubmitForm(){
        let dealPassword=this.refs.dealPassword.getValue();
        AssignmentOfDebtAction.submitDebtAssignmentForm(dealPassword);
    },
    render(){
        let {
            transferPrice,
            leftprincipal,
            sxfee,
            bqdj,
            loanTitle,
            dsbx
            }=this.state;
        return (
            <Container scrollable={true} id="assignmentOfDebt">
                <Group noPadded={true} header={loanTitle}>
                    <List >
                        <List.Item
                            title="剩余本金"
                            after={"￥"+ leftprincipal}
                        />
                        <List.Item
                            title="待收本息"
                            after={"￥"+ dsbx}
                        />
                        <List.Item
                            title="本期待结收益"
                            after={"￥"+ bqdj}
                        />
                        <List.Item
                            title="转让手续费"
                            after={"￥"+ sxfee}
                        />
                        <List.Item
                            title="转让价格"
                            after={"￥"+ transferPrice}
                        />
                    </List>
                </Group>

                <List >
                    <List.Item  nested="input">
                        <Field
                            type="password"
                            label="交易密码"
                            placeholder="请输入交易密码"
                            ref="dealPassword"
                        />
                    </List.Item>
                </List>

                <div className="btn-wrapper" style={{padding:"0 0.975rem"}}>
                    <Button amStyle="primary" block radius onClick={this._handleSubmitForm}>确认转让</Button>
                </div>

                <div className="warnHint-section">
                    <h6>温馨提示：</h6>
                    <p>1. 持有超过30天，距离到期时间超过8天，才能转让；</p>
                    <p>2. 债权暂时只支持全部转让，一经转让无法撤回；</p>
                    <p>3. 转让手续费=转让价格x1.5%，2元起步；</p>
                    <p>4. 转让价格为占全的剩余本金；</p>
                    <p>5. 本期已产生的待结算收益归转让人所有，转让成功后的收益归受让人所有；</p>
                </div>
            </Container>
        )
    },
    componentDidMount(){
        let {
            creditorId
            }=this.props.location.query;
        AssignmentOfDebtAction.getCreditorLoanData(creditorId);

        AssignmentOfDebtStore.bind("change",function(){
            this.setState(AssignmentOfDebtStore.getAll());
        }.bind(this));

        AssignmentOfDebtStore.bind("DebtAssignmentSuccess",function(){

            this.context.router.push({
                pathname:"assignmentDebtSuccess",
                state:this.state
            })
        }.bind(this));

        AssignmentOfDebtStore.bind("DebtAssignmentFailed",function(msg){
            Message.broadcast(msg);
        });
    },
    componentWillUnmount(){
    }
});

AssignmentOfDebt.contextTypes = {
    router:React.PropTypes.object.isRequired
};

module.exports=AssignmentOfDebt;
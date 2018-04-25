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

import CreditorProductAgreement from './ServiceAgreement_creditor_product';

//债权转让组件：AssignmentOfDebt component
let AssignmentOfDebt=React.createClass({
    getInitialState(){
        return {
            data:AssignmentOfDebtStore.getAll(),
            viewName:'debtAssignment'//主视图‘debtAssignment’，二级视图‘assignment_creditorProduct’
        };
    },
    _handleSubmitForm(){
        let isAutoAssign=this.state.data.isAutoAssign;
        if(isAutoAssign){
            AssignmentOfDebtAction.submitDebtAssignmentForm();
        }else {
            this._toggleViewTo("assignment_creditorProduct");
        }
    },
    _toggleViewTo(viewName){
        this.setState({
          viewName
        })
    },
    _changeDealPassword(){
        AssignmentOfDebtAction.changeDealPassword(this.refs.dealPassword.getValue());
    },
    render(){
        let {
            transferPrice,
            leftprincipal,
            sxfee,
            bqdj,
            loanTitle,
            dsbx,
            dealPassword
            }=this.state.data;

        if(this.state.viewName === 'assignment_creditorProduct'){
            return (
                <CreditorProductAgreement 
                  isNeedToShowAssignBtn={true}
                  backToPrevView={this._toggleViewTo.bind(this,"debtAssignment")}
                  assignAgreement={AssignmentOfDebtAction.assignAgreement}
                />
            )
        }
        
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
                            after={"￥"+ transferPrice ? transferPrice.toFixed(2) : "0.00"}
                        />
                    </List>
                </Group>

                {/*<List >
                    <List.Item  nested="input">
                        <Field
                            type="password"
                            label="交易密码"
                            placeholder="请输入交易密码"
                            ref="dealPassword"
                            value={dealPassword}
                            onChange={this._changeDealPassword}
                        />
                    </List.Item>
                </List>*/}

                <div className="btn-wrapper" style={{padding:"0 0.975rem"}}>
                    <Button amStyle="primary" block radius onClick={this._handleSubmitForm}>签约并确定转让</Button>
                </div>

                <div className="warnHint-section">
                    <h6>温馨提示：</h6>
                    <p>1、转让时需签署<Link to="serviceAgreement_creditor_product">《债权转让协议》</Link>，若您已授权平台申请电子签章并自动签约，转让时默认签署该协议；</p>
                    <p>2. 还款方式为“按月付息到期还本”或“等额本息”的项目持有30天（包含）后方可转让；还款方式为“等额本息（双月还）”的项目持有满60天（包含）后方可转让；还款方式为“等额本息（季季还）”的项目持有满90天（包含）后方可转让；</p>
                    <p>3. 所有项目距离每期还款日超过3天，最后一期距到期日超过7天，才能转让；</p>
                    <p>4. 债权暂时只支持全部转让，一经转让无法撤回；</p>
                    <p>5. 转让手续费=转让价格x0.15%；</p>
                    <p>6. 转让价格为该债权的剩余本金；</p>
                    <p>7. 本期已产生的待结算收益归转让人所有，转让成功后的收益归受让人所有；</p>
                </div>
            </Container>
        )
    },
    componentDidMount(){
        let {
            creditorId,
            investMoney
            }=this.props.location.query;
        AssignmentOfDebtAction.getCreditorLoanData(creditorId);

        AssignmentOfDebtStore.bind("change",function(){
            this.setState(AssignmentOfDebtStore.getAll());
        }.bind(this));

        AssignmentOfDebtStore.bind("DebtAssignmentSuccess",function(){

            this.context.router.push({
                pathname:"assignmentDebtSuccess",
                state:Object.assign(this.state.data,{investMoney:investMoney})
            })
        }.bind(this));

        AssignmentOfDebtStore.bind("DebtAssignmentFailed",function(msg){
            Message.broadcast(msg);
        });

        AssignmentOfDebtStore.bind("assignAgreementSuccess",function(){
            this._handleSubmitForm();
        }.bind(this));

        AssignmentOfDebtStore.bind("assignAgreementFailed",function(msg){
            Message.broadcast(msg);
        });
    },
    componentWillUnmount(){
        AssignmentOfDebtStore.unbind("DebtAssignmentSuccess");
        AssignmentOfDebtStore.unbind("assignAgreementSuccess");
    }
});

AssignmentOfDebt.contextTypes = {
    router:React.PropTypes.object.isRequired
};

module.exports=AssignmentOfDebt;
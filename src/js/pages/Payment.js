require("../../scss/page/EarnSetPayment.scss");
let PaymentAction=require("../actions/PaymentAction");
let PaymentStore=require("../stores/PaymentStore");
import React from "react";
import {Link} from "react-router";

//ui component
import Group from "../UIComponents/Group";
import List from "../UIComponents/List";
import Button from "../UIComponents/Button";
import Field from "../UIComponents/Field";
import Container from "../UIComponents/Container";

const CAN_USE_COUPON=["yyz_product","jjz_product","loan_product"];


let Payment=React.createClass({
    getInitialState(){
        return {
            purchaseAmount:PaymentStore.getAll().purchaseAmount,
            couponAmount:PaymentStore.getAll().couponAmount
        }
    },
    _renderInvestmentLimit(type){
        if(type === "ttz_product"){
            return (
                <div className="subtitle">
                    个人投资限额：<strong>10000</strong>元
                </div>
            )
        }else {
            return null;
        }
    },
    _renderCouponBar(type){

        if(CAN_USE_COUPON.indexOf(type) > -1){
            let {
                couponAmount,
                couponType
                }=PaymentStore.getAll();
            couponAmount= couponType === "interestRate" ? couponAmount+"%" : couponAmount;
            return (
            <List.Item href="javascript:void(0)" after={couponAmount ? <span className="coupon-wrapper">{couponAmount}</span> : <span>3张未使用</span>} title="优惠券" onClick={this._jumpToCouponList}/>
            )
        }else {
            return null;
        }
    },
    _renderExpectedReward(type){
        let expectedReward=PaymentStore.getAll().expectedReward;
        if(type !== "ttz_product"){
            return (
                <div className="subtitle expectedReward" style={{paddingTop:"5px"}}>预期收益：<strong>{expectedReward}</strong>元</div>
            )
        }
    },
    _pay(){
        let type=this.props.location.query.type;
        this.props.history.pushState(null,"/purchaseSuccess/?type="+type);
    },
    _jumpToCouponList(){
        let purchaseAmount=this.refs.purchaseAmount.getValue() || 0;
        let type=this.props.location.query.type;
        this.props.history.pushState(null,"/couponList/?purchaseAmount="+purchaseAmount+"&productType="+type);
    },
    _handlePurchaseAmountChange(event){
        PaymentAction.changePurchaseAmount(parseFloat(event.target.value));
    },
    render(){
        let type=this.props.location.query.type;
        return (
            <Container id="earnSetPayment">
                <Group>
                    <h6 className="title">新手标</h6>
                    <div className="subtitle">
                        年华利率：<strong>9.5%</strong>
                    </div>
                    <div className="subtitle">
                        项目可投金额：<strong>10000</strong>元
                    </div>
                    {this._renderInvestmentLimit(type)}
                </Group>

                <Group
                    header=""
                    id="purchaseZone"
                    >
                    <div className="subtitle usableAmount">账户余额：1000.00元</div>
                    <List>
                        <List.Item
                            nested="input"
                            >
                            <Field
                                type="number"
                                label="投资金额"
                                placeholder="100元起投"
                                ref="purchaseAmount"
                                inputAfter={(<span className="useALL-btn">全余额</span>)}
                                onChange={this._handlePurchaseAmountChange}
                                value={this.state.purchaseAmount ? this.state.purchaseAmount : ""}
                                >

                            </Field>

                        </List.Item>
                        {this._renderCouponBar(type)}
                    </List>
                    {this._renderExpectedReward(type)}
                </Group>

                <div style={{padding:"20px 15px"}}>
                    <Button amStyle="primary" block ={true} radius={true} onClick={this._pay}>确认支付</Button>
                </div>
            </Container>
        )
    },
    componentDidMount(){
        PaymentStore.bind("change",function(){
            this.setState({
                purchaseAmount:PaymentStore.getAll().purchaseAmount,
                couponAmount:PaymentStore.getAll().couponAmount
            })
        }.bind(this));
    }
});

export default  Payment;
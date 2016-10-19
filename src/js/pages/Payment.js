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
import Message from "../UIComponents/Message";
import Modal from "../UIComponents/modal/Modal"

//utilities
import mixin from "./utilities/mixin";

const CAN_USE_COUPON=["yyz_product","jjz_product","loan_product"];

/*
 * @desc 除了天天赚预约的情况之外，其他产品公用的支付页面。
 *
 * @author sam liu
 * @date 2016-07-05
 */
let Payment=React.createClass({
    getInitialState(){
        return {
            purchaseAmount:PaymentStore.getAll().purchaseAmount,
            couponAmount:PaymentStore.getAll().couponAmount,
            isModalOpen:false,
            modalInnerText:"",
            modalType:"rechargeModal",
            isPaymentModalOpen:false
        }
    },
    /*
    * @desc 天天赚投资限额栏的渲染，只有当产品类型为“ttz_product”的时候才显示这一栏。
    *
    * @pram {string} //产品的类型
    * @return {reactElement} //react元素
    */
    _renderInvestmentLimit(type,investLimitAmount_ttz){
        if(type === "ttz_product"){
            return (
                <div className="subtitle">
                    <span>个人投资限额：</span><strong>{investLimitAmount_ttz}</strong>元
                </div>
            )
        }else if(type === "new_product"){
            return (
                <div className="subtitle">
                    <span>个人投资限额：</span><strong>20000.00</strong>元
                </div>
                )
        }else {
            return null;
        }
    },
    /*
     * @desc 优惠券入口的渲染，只有该产品类型为可使用优惠券类型的时候才显示这一栏。
     *
     * @pram {string} //产品的类型
     * @return {reactElement} //react元素
     */
    _renderCouponBar(type,couponAmount,couponType,unUseCouponCount){
        if(CAN_USE_COUPON.indexOf(type) > -1){
            couponAmount= couponType === "interestRate" ? (couponAmount * 100).toFixed(1)+"%" : couponAmount;
            return (
            <List.Item
                href="javascript:void(0)"
                after={couponType ? <span className="coupon-wrapper">{couponAmount}</span> : <span>{unUseCouponCount}张未使用</span>}
                title={type === "yyz_product" ? "加息券" : "优惠券"}
                onClick={this._jumpToCouponList}
            />
            )
        }else {
            return null;
        }
    },
    /*
     * @desc 预期收益的渲染，除了天天赚，其他类型的产品都会显示这一栏。
     *
     * @pram {string} //产品的类型
     * @return {reactElement} //react元素
     */
    _renderExpectedReward(type,expectedReward){
        if(type !== "ttz_product"){
            return (
                <div className="subtitle expectedReward" style={{paddingTop:"5px"}}><span>预期收益：</span><strong>{expectedReward}</strong>元</div>
            )
        }
    },
    _pay(productType){
        PaymentAction.pay(productType);
    },
    _jumpToCouponList(){
        let purchaseAmount=this.refs.purchaseAmount.getValue() || 0;
        let type=this.props.location.query.type;
        this.context.router.push({
            pathname:"/couponList",
            query:{
                purchaseAmount:purchaseAmount,
                productType:type
            }
        })

    },
    _handlePurchaseAmountChange(event){
        let purchaseAmount=parseInt(event.target.value);
        purchaseAmount=isNaN(purchaseAmount) ? 0 : purchaseAmount ;
        PaymentAction.changePurchaseAmount(purchaseAmount);
    },
    _UseAllBalance(event){
        PaymentAction.useAllBalance();
    },
    _jumpToNextLocation(confirm){
        let {
            purchaseAmount,
            userBalance
            }=PaymentStore.getAll();
        let rechargeAmount=(purchaseAmount - userBalance).toFixed(2) ;
        if(confirm){//用户点击了“确定”按钮
            if(this.state.modalType === "rechargeModal"){
                this.context.router.push({
                    pathname:"/recharge",
                    query:{
                        rechargeAmount:rechargeAmount
                    }
                });
            }else if(this.state.modalType === "bindBankCardModal"){
                this.context.router.push({
                    pathname:"myBankCard"
                });
            }

        }else {//用户点击了“取消”按钮
            this.setState({
                isModalOpen:false
            });
        }
    },
    _handleRechargeBtnClick(){
        PaymentAction.recharge();
    },
    render(){
        let {
            type,
            productName,
            productApr,
            remainAmount,
            userBalance,
            rewardRate
            }=this.props.location.query;
        let {
            couponAmount,
            couponType,
            expectedReward,
            unUseCouponCount,
            investLimitAmount_ttz
            }=PaymentStore.getAll();

        let purchaseAmount=parseInt(this.state.purchaseAmount);

        return (
            <Container id="earnSetPayment">
                <Group>
                    <h6 className="title">{productName}</h6>
                    <div className="subtitle">
                        <span>预期年化：</span>
                        <strong>
                            {productApr+"%"}
                            {
                                !!parseFloat(rewardRate) ?
                                <span>{"+"+(parseFloat(rewardRate) * 100).toFixed(1)+"%"}</span> :
                                null
                            }
                        </strong>
                    </div>
                    <div className="subtitle">
                        <span>项目可投金额：</span><strong>{remainAmount}</strong>元
                    </div>
                    {this._renderInvestmentLimit(type,investLimitAmount_ttz)}
                </Group>

                <Group
                    header=""
                    id="purchaseZone"
                    >
                    <div className="subtitle usableAmount cf">
                        <span>账户余额：</span>{userBalance}元
                        <a href="javascript:void(0);" className="fr recharge-btn" onClick={this._handleRechargeBtnClick}>充 值</a>
                    </div>
                    <List>
                        <List.Item
                            nested="input"
                            >
                            <Field
                                type="text"
                                label="投资金额"
                                placeholder="请输入100的整数倍"
                                ref="purchaseAmount"
                                inputAfter={(<span className="useALL-btn" onClick={this._UseAllBalance}>全余额</span>)}
                                onChange={this._handlePurchaseAmountChange}
                                value={purchaseAmount ? purchaseAmount : ""}
                            />
                        </List.Item>
                        {this._renderCouponBar(type,couponAmount,couponType,unUseCouponCount)}
                    </List>
                    {this._renderExpectedReward(type,expectedReward)}
                </Group>

                <div style={{padding:"20px 15px"}}>
                    <Button amStyle="primary" block ={true} radius={true} onClick={this._pay.bind(null,type)}>确认支付</Button>
                </div>
                <Modal
                    title=""
                    ref="modal"
                    isOpen={this.state.isModalOpen}
                    role="confirm"
                    onAction={this._jumpToNextLocation}
                >
                    {this.state.modalInnerText}
                </Modal>
                <Modal
                    title=""
                    ref="paymentModal"
                    isOpen={this.state.isPaymentModalOpen}
                    role="loading"
                >
                    处理中，请稍后...
                </Modal>
            </Container>
        )
    },
    componentDidMount(){
        let {
            productId,
            type,
            productName,
            productApr,
            remainAmount,
            userBalance,
            rewardRate,
            productDeadline,
            mainMonth,
            minNotRateTime,
            maxNotRateTime
            }=this.props.location.query;


        //使用location的数据来初始化PaymentStore
        PaymentAction.storeInitialize({
            productId:productId,
            productType:type,
            productName:productName,
            productApr:parseFloat((parseFloat(productApr)/100)),
            remainAmount:parseFloat(remainAmount),
            userBalance:parseFloat(userBalance),
            rewardRate:parseFloat(rewardRate),
            productDeadline:productDeadline,
            mainMonth:parseInt(mainMonth),
            minNotRateTime:parseInt(minNotRateTime),
            maxNotRateTime:parseInt(maxNotRateTime)
        });

        //请求优惠券可使用的张数
        if(CAN_USE_COUPON.indexOf(type) > -1){
            PaymentAction.getUnUseCouponCount(type);
        }


        PaymentStore.bind("change",function(){
            this.setState({
                purchaseAmount:PaymentStore.getAll().purchaseAmount,
                couponAmount:PaymentStore.getAll().couponAmount
            })
        }.bind(this));

        PaymentStore.bind("userBalanceIsNotEnough",function(msg){
            Message.broadcast(msg);
        });

        //购买验证不通过
        PaymentStore.bind("paymentCheckFailed",function(msg){
            if(msg.indexOf("充值") > -1){
                this.setState({
                    isModalOpen:true,
                    modalInnerText:msg,
                    modalType:"rechargeModal"
                })
            }else {
                Message.broadcast(msg);
            }
        }.bind(this));

        PaymentStore.bind("hadNotBindBankCard",function(){
            this.setState({
                isModalOpen:true,
                modalInnerText:"您还未绑定银行卡，暂时不能购买或者充值。去绑卡？",
                modalType:"bindBankCardModal"
            })
        }.bind(this));

        PaymentStore.bind("BindBankCardCheckSuccess",function(){
            this.context.router.push({
                pathname:"/recharge"
            });
        }.bind(this));

        //购买请求开始
        PaymentStore.bind("paymentRequestIsStart",function(){
            this.setState({
                isPaymentModalOpen:true
            })
        }.bind(this));

        //购买请求结束
        PaymentStore.bind("paymentRequestIsEnd",function(){
            this.setState({
                isPaymentModalOpen:false
            })
        }.bind(this));

        //购买失败
        PaymentStore.bind("purchaseFailed",function(msg){
            Message.broadcast(msg);
        }.bind(this));

        PaymentStore.bind("purchaseSuccess",function(data){
            let expectedReward=PaymentStore.getAll().expectedReward;
            expectedReward && (data.expectedReward=expectedReward);
            data.productType=type;
            this.context.router.push({
                pathname:"/PurchaseSuccess",
                query:data
            })
        }.bind(this));

    },
    componentWillUnmount(){
        PaymentStore.clearAll();
    }
});

Payment.contextTypes = {
    router:React.PropTypes.object.isRequired
};

module.exports=Payment;
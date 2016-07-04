require("../../scss/page/CouponList.scss");
let PaymentAction=require("../actions/PaymentAction.js");
import React from "react";
import classNames from "classnames";
import CSSCore from "../UIComponents/utils/CSSCore";

//ui component
import Button from "../UIComponents/Button";
import Container from "../UIComponents/Container";

const CAN_USE_COUPON=["monthlyEarn","quarterlyEarn","fixedLoan"];
let couponList=[
    {
        id:1,
        type:"redPackage",
        couponAmount:200,
        investmentMinLimit:5000,
        useScope:"季季赚，好采投",
        source:"主动派送加息券",
        deadline:"2016-07-01"
    },
    {
        id:2,
        type:"interestRate",
        couponAmount:0.5,
        investmentMinLimit:5000,
        useScope:"月月赚，季季赚，好采投",
        source:"主动派送加息券",
        deadline:"2016-07-01"
    },
    {
        id:3,
        type:"interestRate",
        couponAmount:0.5,
        investmentMinLimit:5000,
        useScope:"月月赚，季季赚，好采投",
        source:"主动派送加息券",
        deadline:"2016-07-01"
    },
    {
        id:4,
        type:"interestRate",
        couponAmount:0.5,
        investmentMinLimit:5000,
        useScope:"月月赚，季季赚，好采投",
        source:"主动派送加息券",
        deadline:"2016-07-01"
    },
    {
        id:5,
        type:"interestRate",
        couponAmount:0.5,
        investmentMinLimit:5000,
        useScope:"月月赚，季季赚，好采投",
        source:"主动派送加息券",
        deadline:"2016-07-01"
    }
]
let CouponCard=React.createClass({
    _renderCouponAmount(type,amount){
        if(type === "redPackage"){
            return (
                <div className="coupon-card-body-left fl">
                    <span className="unit">￥</span>
                    <span className="amount">{amount}</span>
                </div>
            )
        }else {
            return (
                <div className="coupon-card-body-left fl">
                    <span className="amount">{amount}</span>
                    <span className="unit">%</span>
                </div>
            )
        }
    },
    render(){
        let type=this.props.type;
        let amount=this.props.couponAmount;
        let couponClass=classNames({
            disabled:type === "redPackage" && this.props.purchaseAmount < this.props.investmentMinLimit
            }, "coupon-card");

        return (
            <div
                className={couponClass}
                data-id={this.props.id}
                data-amount={this.props.couponAmount}
                data-type={this.props.type}
                data-minimumlimit={this.props.investmentMinLimit}
            >
                <div className="coupon-card-body cf">
                    {this._renderCouponAmount(type,amount)}
                    <div className="coupon-card-body-right fl">
                        <div className="title">{type === "interestRate" ? "加息券" : "红包"}</div>
                        <div className="subtitle">使用方式：单笔投资满{this.props.investmentMinLimit}</div>
                        <div className="subtitle">使用范围：{this.props.useScope}</div>
                    </div>
                </div>
                <div className="coupon-card-footer subtitle cf">
                    <span className="fl">来源：{this.props.source}</span>
                    <span className="fr">有效期至：{this.props.deadline}</span>
                </div>
                <div className="coupon-card-border-top"></div>
                <div className="coupon-card-border-bottom"></div>
            </div>
        )
    }
});


let CouponList=React.createClass({
    _doNotUseCoupon(){
        PaymentAction.doNotUseCoupon();
        this.props.history.goBack();
    },
    render(){
        let purchaseAmount=this.props.location.query.purchaseAmount;
        return (
            <Container id="couponList">
                <Button block radius onClick={this._doNotUseCoupon}>不使用加息券</Button>
                {(
                    couponList.map(function(item,index){
                        return (
                            <CouponCard {...item} purchaseAmount={purchaseAmount} />
                        )
                    }.bind(this))
                )}
            </Container>
        )
    },
    componentDidMount(){
        let cards=document.getElementsByClassName("coupon-card");
        let _self=this;
        Array.prototype.forEach.call(cards,function(item,index){
            item.addEventListener("click",function(){
                if(CSSCore.hasClass(this,"disabled")){
                    return false;
                }else {
                    let id=this.getAttribute("data-id");
                    let amount=parseFloat(this.getAttribute("data-amount"));
                    let type=this.getAttribute("data-type");
                    let minimumLimit=parseFloat(this.getAttribute("data-minimumlimit"));
                    PaymentAction.finishedCouponSelection(id,amount,type,minimumLimit);
                    _self.props.history.goBack();
                }
            })
        });
    }
});

export default  CouponList;
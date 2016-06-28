require("../../scss/page/CouponList.scss");
import React from "react";
import classNames from "classnames";
import CSSCore from "../UIComponents/utils/CSSCore";

//ui component
import Button from "../UIComponents/Button";
import Container from "../UIComponents/Container";

const CAN_USE_COUPON=["monthlyEarn","quarterlyEarn","fixedLoan"];
let couponList=[
    {
        type:"redPackage",
        couponAmount:20,
        investmentLimit:5000,
        useScope:"季季赚，好采投",
        source:"主动派送加息券",
        deadline:"2016-07-01"
    },
    {
        type:"interestRate",
        couponAmount:0.5,
        investmentLimit:5000,
        useScope:"月月赚，季季赚，好采投",
        source:"主动派送加息券",
        deadline:"2016-07-01"
    },
    {
        type:"interestRate",
        couponAmount:0.5,
        investmentLimit:5000,
        useScope:"月月赚，季季赚，好采投",
        source:"主动派送加息券",
        deadline:"2016-07-01"
    },
    {
        type:"interestRate",
        couponAmount:0.5,
        investmentLimit:5000,
        useScope:"月月赚，季季赚，好采投",
        source:"主动派送加息券",
        deadline:"2016-07-01"
    },
    {
        type:"interestRate",
        couponAmount:0.5,
        investmentLimit:5000,
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
    _jumpBack(event){

        let arr=[];
        (function getParentsNodeByClassName(element,className){
           if(CSSCore.hasClass(element,className)){
               arr.push(element);
           }else {
               getParentsNodeByClassName(element.parentNode,className);
           }
        })(event.target,"coupon-card");

        if(CSSCore.hasClass(arr[0],"disabled")){
            return false;
        }else {
            this.props.history.pushState(null,"/earnSetPayment/?type="+this.props.type+"&couponAmount="+20);
        }


    },
    render(){
        let type=this.props.type;
        let amount=this.props.couponAmount;
        let couponClass=classNames({
            disabled:type === "redPackage" && this.props.purchaseAmount < this.props.investmentLimit
            }, "coupon-card");

        return (
            <div className={couponClass} onClick={this._jumpBack}>
                <div className="coupon-card-body cf">
                    {this._renderCouponAmount(type,amount)}
                    <div className="coupon-card-body-right fl">
                        <div className="title">{type === "interestRate" ? "加息券" : "红包"}</div>
                        <div className="subtitle">使用方式：单笔投资满{this.props.investmentLimit}</div>
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
                            <CouponCard {...item} purchaseAmount={purchaseAmount} history={this.props.history}/>
                        )
                    }.bind(this))
                )}
            </Container>
        )
    }
});

export default  CouponList;
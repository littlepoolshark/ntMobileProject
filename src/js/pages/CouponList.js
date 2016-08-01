require("../../scss/page/CouponList.scss");
let PaymentAction=require("../actions/PaymentAction");
let CouponListAction=require("../actions/CouponListAction");
let CouponListStore=require("../stores/CouponListStore");
import React from "react";
import classNames from "classnames";
import CSSCore from "../UIComponents/utils/CSSCore";

//ui component
import Button from "../UIComponents/Button";
import Container from "../UIComponents/Container";

const CAN_USE_COUPON=["yyz_product","jjz_product","loan_product"];
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
        let {
            id,
            couponAmount,
            type,
            purchaseAmount,
            investmentMinLimit,
            productType,
            useScope,
            source,
            deadline
            }=this.props;
        //购买金额小于单笔投资最小金额或者当前的产品类型是月月赚的话，则不能使用红包
        let couponClass=classNames({
            disabled:productType === "all" ? false : (type === "redPackage" && (purchaseAmount < investmentMinLimit || productType === "yyz_product")),
            "coupon-card":true
            });

        return (
            <div
                className={couponClass}
            >
                <div className="coupon-card-body cf">
                    {this._renderCouponAmount(type,couponAmount)}
                    <div className="coupon-card-body-right fl">
                        <div className="title">{type === "interestRate" ? "加息券" : "红包"}</div>
                        <div className="subtitle">使用方式：单笔投资满{investmentMinLimit}</div>
                        <div className="subtitle">使用范围：{useScope}</div>
                    </div>
                </div>
                <div className="coupon-card-footer subtitle cf">
                    <span className="fl">来源：{source}</span>
                    <span className="fr">有效期至：{deadline}</span>
                </div>
                <div className="coupon-card-border-top"></div>
                <div className="coupon-card-border-bottom"></div>
            </div>
        )
    }
});


let CouponList=React.createClass({
    getInitialState(){
        return {
            couponList:CouponListStore.getAll()
        }
    },
    _doNotUseCoupon(){
        PaymentAction.doNotUseCoupon();
        this.props.history.goBack();
    },
    _handleSelectCoupon(event,id,amount,type,minimumLimit){
        if(CSSCore.hasClass(event.target,"disabled")){
            return false;
        }else {
            PaymentAction.finishedCouponSelection(id,amount,type,minimumLimit);
            this.context.router.goBack();
        }

    },
    render(){
        let {
            purchaseAmount,
            productType
            }=this.props.location.query;

        return (
            <Container id="couponList">
                {
                    productType === "all" ?
                    null :
                    (
                        <Button block radius onClick={this._doNotUseCoupon}>不使用加息券</Button>
                    )
                }

                {(
                    this.state.couponList.map(function(item,index){
                        if(productType === "all"){//这种情况代表从用户中心跳转过来的，仅仅是展示优惠券
                            return (
                                <CouponCard
                                    {...item}
                                    purchaseAmount={purchaseAmount}
                                    productType={productType}
                                    />
                            )
                        }else {//这种情况代表从支付页面跳转过来，不但展示优惠券，也包含了选择所使用的优惠券
                            return (
                                <CouponCard
                                    {...item}
                                    purchaseAmount={purchaseAmount}
                                    productType={productType}
                                    onClick={this._handleSelectCoupon.bind(null,event,item.id,item.amount,item.type,item.minimumLimit)}
                                    />
                            )
                        }

                    }.bind(this))
                )}
            </Container>
        )
    },
    componentDidMount(){
        //根据当前的产品类型获取优惠券列表
        let productTypeMap={
            yyz_product:"yyz",
            jjz_product:"jjz",
            loan_product:"sanbiao"
        }
        let productType=this.props.location.query.productType;
        CouponListAction.getDataFromSever(productTypeMap[productType]);

        //监听用户的选择，发送相关的action
        //let cards=document.getElementsByClassName("coupon-card");
        //let _self=this;
        //Array.prototype.forEach.call(cards,function(item,index){
        //    item.addEventListener("click",function(){
        //        if(CSSCore.hasClass(this,"disabled")){
        //            return false;
        //        }else {
        //            let id=this.getAttribute("data-id");
        //            let amount=parseFloat(this.getAttribute("data-amount"));
        //            let type=this.getAttribute("data-type");
        //            let minimumLimit=parseFloat(this.getAttribute("data-minimumlimit"));
        //            PaymentAction.finishedCouponSelection(id,amount,type,minimumLimit);
        //            _self.props.history.goBack();
        //        }
        //    })
        //});

        CouponListStore.bind("change",function(){
            this.setState({
                couponList:CouponListStore.getAll()
            })
        }.bind(this))
    }
});

CouponList.contextTypes = {
    router:React.PropTypes.object.isRequired
};

module.exports=CouponList;
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
import NavBar from "../UIComponents/NavBar";
import View from "../UIComponents/View";

import NoDataHint from "./utilities/NoDataHint";

const CAN_USE_COUPON=["yyz_product","jjz_product","loan_product","rich","moon","glj","ced","nyd"];

let CouponCard=React.createClass({
    _handleCouponSelect(){
       this.props.onSelect && this.props.onSelect();
    },
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
                    <span className="amount">{(amount * 100).toFixed(1)}</span>
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
            deadline,
            incomePeriod,
            available
            }=this.props;


        //购买金额小于单笔投资最小金额或者当前的产品类型是月月赚的话，则不能使用红包
        //let isSelectable= !((type === "redPackage"  && productType === "yyz_product") || purchaseAmount === 0 || purchaseAmount < investmentMinLimit);
        let isSelectable= productType === "all" || available === 1 ? true : false;
        let couponClass=classNames({
            disabled:!isSelectable,
            "coupon-card":true
            });

        return (
            <div className={couponClass} onClick={isSelectable && productType !== "all" ? this._handleCouponSelect : null}>
                <div className="coupon-card-body cf">
                    {this._renderCouponAmount(type,couponAmount)}
                    <div className="coupon-card-body-right fl">
                        <div className="title">{type === "interestRate" ? "加息券" : "红包"}</div>
                        <div className="subtitle">
                            {
                                investmentMinLimit === 0 ?
                                "单笔投资额不限" :
                                "单笔投资满" + investmentMinLimit
                            }

                        </div>
                        <div className="subtitle">适用：{useScope}</div>
                        {
                            type === "interestRate" ?
                            <div className="subtitle">加息期限：{incomePeriod === 0 ? "不限制期限" : incomePeriod + "个月，季季赚不受此限制"}</div> :
                            null
                        }
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
    _doNotUseCoupon(purchaseAmount){
        PaymentAction.doNotUseCoupon(purchaseAmount);
        this.props.history.goBack();
    },
    _handleSelectCoupon(id,amount,type,minimumLimit,incomePeriod,purchaseAmount){
        PaymentAction.finishedCouponSelection(id,amount,type,minimumLimit,incomePeriod,purchaseAmount);
        this.context.router.goBack();
    },
    _handleNavClick(e){
        if(e.title === "返回"){
            let beforeComponent=this.props.location.query.beforeComponent;
            if(beforeComponent){
                this.context.router.push({
                    pathname:beforeComponent
                })
            }else{
                this.context.router.goBack();
            }
        }else if(e.title === "兑换优惠券"){
            this.context.router.push({
                pathname:"exchangeCoupon"
            })
        }

    },
    render(){
        let {
            purchaseAmount,
            productType
            }=this.props.location.query;

        let leftNav= {
            component:"a",
            icon: 'left-nav',
            title: '返回'
        };

        let rightNav={
            component:"a",
            title:"兑换优惠券"
        }

        return (
        <View>
            <NavBar
                title="我的优惠券"
                leftNav={[leftNav]}
                rightNav={[rightNav]}
                amStyle="primary"
                onAction={this._handleNavClick}
            />
            <Container id="couponList">
                {
                    productType === "all" ?
                        null :
                        (
                            <Button block radius onClick={this._doNotUseCoupon.bind(null,purchaseAmount)}>不使用优惠券</Button>
                        )
                }

                {
                    this.state.couponList.length > 0 ?
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
                                    onSelect={this._handleSelectCoupon.bind(null,item.id,item.couponAmount,item.type,item.investmentMinLimit,item.incomePeriod,purchaseAmount)}
                                />
                            )
                        }

                    }.bind(this)) :
                    <NoDataHint/>
                }
            </Container>
        </View>

        )
    },
    componentDidMount(){

        let {
            productType,
            purchaseAmount
            }=this.props.location.query;
        CouponListAction.getDataFromSever(productType,purchaseAmount);

        //如果是从支付组件跳转至优惠券组件，则先把"返回"按钮隐藏，以免用户点击返回按钮回到支付页面，
        //之前的数据（购买金额和所选的优惠券信息）会被清除掉。后期可以考虑优化。
        /*if(productType !== "all"){
            document.getElementsByClassName("navbar-left")[0].style.display="none";
        }*/


        CouponListStore.bind("change",function(){
            this.setState({
                couponList:CouponListStore.getAll()
            })
        }.bind(this))
    },
    componentWillUnmount(){
        CouponListStore.clearAll();
    }
});

CouponList.contextTypes = {
    router:React.PropTypes.object.isRequired
};

module.exports=CouponList;
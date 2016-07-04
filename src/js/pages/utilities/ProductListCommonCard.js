require("../../../scss/page/CommonCard.scss");
import React from "react";
import classNames from 'classnames';
import { Link } from 'react-router';

//ui component
import Group from "../../UIComponents/Group";
import Grid from "../../UIComponents/Grid";
import Col from "../../UIComponents/Col";

//utilities component
import productStatusMixin from "./productStatusMixin";

//新手标，月月赚，季季赚，好采投和债权转让共用的card组件,目前用于理财列表页
const Type_To_Tag_Map ={
    new_product:["tag-newbie"],
    ttz_product:[],
    yyz_product:["tag-addRate"],
    jjz_product:["tag-addRate","tag-redPackage"],
    loan_product:["tag-addRate","tag-redPackage"],
    creditor_product:["tag-transfer"]
};

let ProductListCommonCardTitle=React.createClass({
    render(){
        let tagArr=Type_To_Tag_Map[this.props.type];
        return (
            <h6 className="title">
                <span>{this.props.title}</span>
                {
                    !this.props.isSoldOut ?
                    tagArr && tagArr.map(function(item,index){
                        let classes="tag " + item;
                        return (
                            <span className={classes}></span>
                        )
                    }) : null

                }
            </h6>
        )
    }
});

let ProductListCommonCard=React.createClass({
    mixins:[productStatusMixin],
    propTypes: {
        type: React.PropTypes.string,
        title: React.PropTypes.string,
        yearRate: React.PropTypes.string,
        deadline: React.PropTypes.string,
        deadlineUnit:React.PropTypes.string,
        remainAmount: React.PropTypes.number,
        isSoldOut:React.PropTypes.bool
    },
    getDefaultProps(){
        return {
            title:"--",
            type:"newbieLoan",
            yearRate:"--",
            deadline:"--",
            deadlineUnit:"--",
            remainAmount:0,
            isSoldOut:true
        }
    },
    _amountFormater(amount){
        return (amount / 1000).toFixed(2);
    },
    render(){
        let {
            type,
            productName,
            productApr,
            repaymentLimit,
            repaymentTypeUnit,
            remainAmount,
            status
            }=this.props;
        let isSoldOut=this.getProductStatusText(type,status) === "售罄" ? true : false ;
        return (
            <Link to={{pathname:"earnSetIntroduction",query:{type:type}}}>
                <Group noPadded={false} className="commonCard">
                    <ProductListCommonCardTitle title={productName} type={type} isSoldOut={isSoldOut}/>
                    <Grid collapse={true}>
                        <Col cols={4}>
                            <Grid collapse={true}>
                                <Col cols={2}>
                                    <div className="subtitle text-left" >年化收益</div>
                                    <div className="yearRate">{productApr}<span className="unit">%</span></div>
                                </Col>
                                <Col cols={4}>
                                    <div className="subtitle" >投资期限</div>
                                    <div className="deadline">{repaymentLimit}<span className="unit">{repaymentTypeUnit}</span></div>
                                </Col>
                            </Grid>
                        </Col>
                        <Col cols={2} className={isSoldOut ? "hide" : ""}>
                            <div className="subtitle" >可购金额</div>
                            <div className="remainAmount">{this._amountFormater(remainAmount)}<span className="unit">万</span></div>
                        </Col>
                    </Grid>
                    <div className={isSoldOut ? "stamp" : "stamp hide"}></div>
                </Group>
            </Link>
        )
    }
});

export default ProductListCommonCard ;
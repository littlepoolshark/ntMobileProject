require("../../../scss/page/CommonCard.scss");
import React from "react";
import classNames from 'classnames';
import { Link } from 'react-router';

//ui component
import Group from "../../UIComponents/Group";
import Grid from "../../UIComponents/Grid";
import Col from "../../UIComponents/Col";
import Icon from "../../UIComponents/Icon";

//utilities component
import mixin from "./mixin";

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
        let titleClass=this.props.type === "creditor_product" ? "creditor-title" : "" ;
        return (
            <h6 className="title">
                <span  className={titleClass}>{this.props.title}</span>
                {
                    !this.props.isSoldOut || this.props.type === "creditor_product" ?
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
    mixins:[mixin],
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
    _formatTimeStamp(timeStamp){
        let timeStr="";
        let date=new Date(timeStamp);
        let hours=date.getHours();
        let minutes=date.getMinutes();
        timeStr=(hours < 10 ? "0"+hours : hours) + ":" + (minutes < 10 ? "0"+minutes : minutes);
        return timeStr;
    },
    render(){
        let {
            id,
            type,
            productName,
            productApr,
            repaymentLimit,
            repaymentTypeUnit,
            remainAmount,
            status,
            isFirstChild,
            rewardRate,
            publishtimeL//预发布的时间戳
            }=this.props;
        let isSoldOut=this._getProductStatusText(type,status) === "售罄" ? true : false ;
        let pathName="";
        switch (type){
            case "loan_product":
                pathName="fixedLoanIntroduction";
                break;
            case "creditor_product":
                pathName="creditorLoanIntroduction";
                break;
            default :
                pathName="EarnSetIntroduction";
                break;
        };
        let groupHeader=(type === "loan_product" && isFirstChild) ?  "项目直投" : (isFirstChild ? "理财计划" : "");
        return (
            <Link to={{pathname:pathName,query:{type:type,productId:id}}}>
                <Group  header={groupHeader} noPadded={false} className="commonCard">
                    <ProductListCommonCardTitle title={productName} type={type} isSoldOut={isSoldOut}/>
                    <Grid collapse={true}>
                        <Col cols={4}>
                            <Grid collapse={true}>
                                <Col cols={2}>
                                    <div className="subtitle text-left" >预期年化</div>
                                    <div className="yearRate">
                                        {this._yearRateFormater(productApr)}
                                        <span className="unit">%</span>
                                        {
                                            !!rewardRate ?
                                            <span className="rewardRate">{"+"+(rewardRate * 100).toFixed(1) + "%"}</span> :
                                            null
                                        }
                                    </div>
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
                    {
                        this._getProductStatusText(type,status) === "预发布" ?
                        <div className="prePublish-hint">
                            <Icon classPrefix="imgIcon" name="clock"/>
                            <span>今天<strong>{this._formatTimeStamp(publishtimeL)}</strong>开售</span>
                        </div>   :
                        null
                    }
                    <div className={isSoldOut ? "stamp" : "stamp hide"}></div>
                </Group>
            </Link>
        )
    }
});

export default ProductListCommonCard ;
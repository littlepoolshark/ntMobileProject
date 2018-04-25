import React from "react";
import classNames from "classnames"

//ui component
import Group from "../../UIComponents/Group";
import Grid from "../../UIComponents/Grid";
import Col from "../../UIComponents/Col";
import Icon from "../../UIComponents/Icon";

//utilities component
import Slogan from "./Slogan";
import ProgressBar from "./ProgressBar";


//平台所用产品的简要介绍
let Summary=React.createClass({
    propTypes: {
        type: React.PropTypes.string.isRequired,
        productApr:React.PropTypes.oneOfType([
            React.PropTypes.number,
            React.PropTypes.string
        ]),
        buyProgress:React.PropTypes.oneOfType([
            React.PropTypes.number,
            React.PropTypes.string
        ]),
        remainAmount:React.PropTypes.oneOfType([
            React.PropTypes.number,
            React.PropTypes.string
        ])
    },
    getDefaultProps(){
        return {
            type:"new_product",
            productApr:"0.0",
            buyProgress:"0.0",
            remainAmount:"0.00",
            repaymentLimit:"--",
            repaymentTypeUnit:"--",
            totalAmount:0
        }
    },
    _formatAmount(amount){
        let amountStr="";
        if(amount > 10000){
            amountStr=(amount / 10000).toFixed(2) + "万";
        }else {
            amountStr=amount + "元";
        }
        return amountStr;
    },
    _renderRulesTagList(productType,isSupportAdvanceRepayment,onQuestionMarkClick){
        if(["loan_product","rich","moon","glj","ced","nyd"].indexOf(productType) > -1 ){
            return (
                <div className="rulesTag-list text-center">
                    <span className="rulesTag">加息券</span>
                    <span className="rulesTag">红包</span>
                    {
                        isSupportAdvanceRepayment ?
                        <span className="rulesTag">提前还款</span> :
                        null
                    }
                    {
                        isSupportAdvanceRepayment ?
                        <Icon classPrefix="imgIcon" name="grey-questionMark" className="fr" onClick={onQuestionMarkClick.bind(null,"descriptionOfRepayEarly")}/> :
                        null
                    }
                </div>
            )
        }else {
            return null;
        }
    },
    render(){
        let {
            type,
            minRate,
            maxRate,
            productApr,
            repaymentLimit,
            repaymentTypeUnit,
            remainAmount,
            buyProgress,
            totalAmount,
            rewardRate,
            isSupportAdvanceRepayment,
            onQuestionMarkClick,
            vipRaiseRate//好采投专用的vip加息利率
            }=this.props;


        let tagClass=classNames({
            "newbieLoan-tag":type === "new_product",
            "tag":true
        });
        
        if(["loan_product","creditor_product","rich","moon","glj","ced","nyd"].indexOf(type) > -1 ){
            return (
                <Group className="fixedLoan summary">
                    <div className="subtitle yearRate-title">
                        历史年化
                        {
                            vipRaiseRate ?
                            <span className="vip-rate">{"VIP+" + (vipRaiseRate * 100).toFixed(1) + "%"}</span> :
                            null
                        }
                    </div>
                    <div className="yearRate">
                        <span className="amount">{type === "moon" ?  (minRate * 100).toFixed(1) + "~" + (maxRate * 100).toFixed(1) : productApr }</span>
                        <span className="unit">%</span>
                        {
                            !!rewardRate ?
                            <span className="rewardRate">{"+" + (rewardRate * 100).toFixed(1)+ "%"}</span> :
                            null
                        }
                    </div>
                    { this._renderRulesTagList(type,isSupportAdvanceRepayment,onQuestionMarkClick) }
                    <Grid collapse={true}>
                        <Col cols={2}>
                            <div className="subtitle text-left">投资期限</div>
                            <div className="title text-left">
                                <span className="amount">{repaymentLimit}</span>
                                <span className="unit">{repaymentTypeUnit}</span>
                            </div>
                        </Col>
                        <Col cols={2}>
                            <div className="subtitle">项目额度</div>
                            <div className="title">
                                <span className="amount">{this._formatAmount(totalAmount)}</span>
                            </div>
                        </Col>
                        <Col cols={2}>
                            <div className="subtitle text-right">剩余额度</div>
                            <div className="title text-right">
                                <span className="amount">{this._formatAmount(remainAmount)}</span>
                            </div>
                        </Col>
                    </Grid>
                    <ProgressBar percent={buyProgress}/>
                </Group>
            )
        }else {
            return (
                <Group className="earnSet summary">
                    <div className="subtitle">历史年化</div>
                    <div className="yearRate" >
                        <span className="amount" >{productApr}</span>
                        <span className="unit">%</span>
                        {
                            !!rewardRate ?
                            <span className="rewardRate" >{"+" + (rewardRate * 100).toFixed(1)+ "%"}</span> :
                            null
                        }
                    </div>
                    <Slogan />
                    <div className="label">
                        <span className="label-item">{repaymentLimit + repaymentTypeUnit}</span>
                        <span className="label-item">100元起投</span>
                        <span className="label-item">至今0风险</span>
                    </div>
                    <ProgressBar percent={buyProgress}/>
                    <div className="footer">剩余可投{remainAmount}元</div>
                    <div className={tagClass}></div>
                </Group>
            )
        }

    }
});

export default  Summary;

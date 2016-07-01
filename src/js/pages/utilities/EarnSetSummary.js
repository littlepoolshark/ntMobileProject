import React from "react";
import classNames from "classnames"

//ui component
import Group from "../../UIComponents/Group";

//utilities component
import Slogan from "./Slogan";
import ProgressBar from "./ProgressBar";

//赚系列产品简要介绍
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
            repaymentTypeUnit:"--"
        }
    },
    render(){
        let {
            type,
            productApr,
            repaymentLimit,
            repaymentTypeUnit,
            remainAmount,
            buyProgress
            }=this.props;

        let tagClass=classNames({
            "dailyEarn-tag":type === "ttz_product",
            "newbieLoan-tag":type === "new_product",
            "tag":true
        });

        return (
            <Group className="summary">
                <div className="subtitle">年化利率</div>
                <div className="yearRate">
                    <span className="amount">{productApr}</span>
                    <span className="unit">%</span>
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
});

export default  Summary;

import React from "react";
import classNames from "classnames"

//ui component
import Group from "../../UIComponents/Group";
import Grid from "../../UIComponents/Grid";
import Col from "../../UIComponents/Col";

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
    render(){
        let {
            type,
            productApr,
            repaymentLimit,
            repaymentTypeUnit,
            remainAmount,
            buyProgress,
            totalAmount,
            rewardRate
            }=this.props;

        let tagClass=classNames({
            /*"dailyEarn-tag":type === "ttz_product",*/
            "newbieLoan-tag":type === "new_product",
            "tag":true
        });
        if(type === "loan_product" || type === "creditor_product"){
            return (
                <Group className="fixedLoan summary">
                    <Grid>
                        <Col cols={2}>
                            <div className="title">
                                <span className="amount">{productApr}</span>
                                <span className="unit">%</span>
                                {
                                    !!rewardRate ?
                                    <span className="rewardRate">{"+" + (rewardRate * 100).toFixed(1)+ "%"}</span> :
                                    null
                                }
                            </div>
                            <div className="subtitle">预期年化</div>
                        </Col>
                        <Col cols={2}>
                            <div className="title">
                                <span className="amount">{repaymentLimit}</span>
                                <span className="unit">{repaymentTypeUnit}</span>
                            </div>
                            <div className="subtitle">项目期限</div>
                        </Col>
                        <Col cols={2}>
                            <div className="title">
                                <span className="amount">{totalAmount}</span>
                            </div>
                            <div className="subtitle">项目额度</div>
                        </Col>
                    </Grid>
                    <ProgressBar percent={buyProgress}/>
                    <div className="footer">剩余可投{remainAmount}元</div>
                    <Slogan />
                </Group>
            )
        }else {
            return (
                <Group className="earnSet summary">
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

    }
});

export default  Summary;

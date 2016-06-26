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
        yearRate:React.PropTypes.oneOfType([
            React.PropTypes.number,
            React.PropTypes.string
        ]),
        progressPercent:React.PropTypes.oneOfType([
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
            type:"newbieLoan",
            yearRate:0.0,
            progressPercent:"0.0%",
            remainAmount:0.0
        }
    },
    _renderLabelItem (){
        let labelText="";
        switch (this.props.type){
            case "newbieLoan":
                labelText="1个月";
                break;
            case "dailyEarn":
                labelText="随存随取";
                break;
            case "monthlyEarn":
                labelText="1个月";
                break;
            case "quarterlyEarn":
                labelText="3个月";
                break;
            default :
                break;
        }

        return labelText;
    },
    render(){
        let tagClass=classNames({
            "dailyEarn-tag":this.props.type === "dailyEarn",
            "newbieLoan-tag":this.props.type === "newbieLoan",
            "tag":true
        });
        return (
            <Group className="summary">
                <div className="subtitle">年化利率</div>
                <div className="yearRate">
                    <span className="amount">{this.props.yearRate}</span>
                    <span className="unit">%</span>
                </div>
                <Slogan />
                <div className="label">
                    <span className="label-item">{this._renderLabelItem()}</span>
                    <span className="label-item">100元起投</span>
                    <span className="label-item">至今0风险</span>
                </div>
                <ProgressBar percent={this.props.progressPercent}/>
                <div className="footer">剩余可投{this.props.remainAmount}元</div>
                <div className={tagClass}></div>
            </Group>
        )
    }
});

export default  Summary;

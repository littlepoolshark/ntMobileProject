import React from "react";

//ui component
import Group from "../../UIComponents/Group";

//utilities component
import Slogan from "./Slogan";
import ProgressBar from "./ProgressBar";

const LABEL_TEXT_MAP={
    newbieLoan:"新手标",
    dailyEarn:"天天赚",
    monthlyEarn:"月月赚",
    quarterlyEarn:"季季赚"
}

//赚系列产品收益对比图表
let ComparisonChart=React.createClass({
    propTypes:{
        type:React.PropTypes.string.isRequired
    },
    _renderChartContent(){
        if(this.props.type === "dailyEarn"){
            return (
                <div className="content dailyEarn">
                </div>
            )
        }else {
            return (
                <div className="content">
                    <div className="content-item">
                        <sapn className="label">银行利息</sapn>
                        <ProgressBar width="150px" hasProgressPercent={false} percent="20%"/>
                        <strong>{this.props.type === "quarterlyEarn" ? "33.80" : "2.50"}</strong>元
                    </div>
                    <div className="content-item">
                        <sapn className="label">{LABEL_TEXT_MAP[this.props.type]}</sapn>
                        <ProgressBar width="150px" hasProgressPercent={false} percent="20%"/>
                        <strong>{this.props.type === "quarterlyEarn" ? "262.50" : "79.20"}</strong>元
                    </div>
                    <div className="content-item">同期比多<strong>{this.props.type === "quarterlyEarn" ? "228.70" : "76.70"}</strong>元</div>
                </div>
            )
        }
    },
    render(){
        return (
            <Group className="comparison-chart">
                <h6 className="subtitle">10000元同期银行存款收益对比</h6>
                {this._renderChartContent()}
            </Group>
        )
    }
});


export default  ComparisonChart;

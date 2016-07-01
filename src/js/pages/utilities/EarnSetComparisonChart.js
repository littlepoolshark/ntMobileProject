import React from "react";

//ui component
import Group from "../../UIComponents/Group";

//utilities component
import Slogan from "./Slogan";
import ProgressBar from "./ProgressBar";
import config from "../../config";

//赚系列产品收益对比图表
let ComparisonChart=React.createClass({
    propTypes:{
        type:React.PropTypes.string.isRequired
    },
    getDefaultProps(){
        return {
            type:"ttz_product"
        }
    },
    _renderChartContent(){
        if(this.props.type === "ttz_product"){
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
                        <strong>{this.props.type === "jjz_product" ? "33.80" : "2.50"}</strong>元
                    </div>
                    <div className="content-item">
                        <sapn className="label">{config.productNameMap[this.props.type]}</sapn>
                        <ProgressBar width="150px" hasProgressPercent={false} percent="20%"/>
                        <strong>{this.props.type === "jjz_product" ? "262.50" : "79.20"}</strong>元
                    </div>
                    <div className="content-item">同期比多<strong>{this.props.type === "jjz_product" ? "228.70" : "76.70"}</strong>元</div>
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

import React from "react";

//ui component
import Group from "../../UIComponents/Group";

//utilities component
import Slogan from "./Slogan";
import ProgressBar from "./ProgressBar";

const productTitleMap={
    "new_product":"新手标收益",
    "ttz_product":"天天赚年息",
    "yyz_product":"月月赚月息",
    "jjz_product":"季季赚季息"
};

const productProfitMap={
    "new_product":100,
    "ttz_product":700,
    "yyz_product":70.83,
    "jjz_product":237.50
}

const baobaoTitleMap={
    "new_product":"宝宝类收益",
    "ttz_product":"宝宝类年息",
    "yyz_product":"宝宝类月息",
    "jjz_product":"宝宝类季息"
};

const baobaoProfitMap={
    "new_product":20,
    "ttz_product":240,
    "yyz_product":20,
    "jjz_product":60
};


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
        let productType=this.props.type;
        return (
            <div className="content" >
                <div className="content-item">
                    <sapn className="label">{baobaoTitleMap[productType]}</sapn>
                    <ProgressBar width="150px" hasProgressPercent={false} percent="10%"/>
                    <strong>{baobaoProfitMap[productType].toFixed(2)}</strong>元
                </div>
                <div className="content-item">
                    <sapn className="label">{productTitleMap[productType]}</sapn>
                    <ProgressBar
                        width="150px"
                        hasProgressPercent={false}
                        percent={(productProfitMap[productType] / baobaoProfitMap[productType] * 10).toFixed(1) + "%"}
                    />
                    <strong>{productProfitMap[productType].toFixed(2)}</strong>元
                </div>
                <div className="content-item">
                    同期相比多
                    <strong>{(productProfitMap[productType]-baobaoProfitMap[productType]).toFixed(2)}</strong>
                    元
                </div>
            </div>
        )
    },
    render(){
        return (
            <Group className="comparison-chart" id={this.props.id}>
                <h6 className="subtitle">10000元宝宝类理财产品同期收益对比</h6>
                {this._renderChartContent()}
            </Group>
        )
    }
});


export default  ComparisonChart;

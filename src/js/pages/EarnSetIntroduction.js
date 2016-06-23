require("../../scss/page/EarnSetIntroduction.scss");
//let EarnSetIntroductionAction=require("../actions/EarnSetIntroductionAction.js");
//let EarnSetIntroductionStore=require("../stores/EarnSetIntroductionStore.js");
import React from "react";

//ui component
import Container from "../UIComponents/Container";
import Tabs from "../UIComponents/Tabs";
import Group from "../UIComponents/Group";
import Grid from "../UIComponents/Grid";
import Col from "../UIComponents/Col";

//utilities component
import Slogan from "./utilities/Slogan";

//标的简要介绍
let Summary=React.createClass({
    render(){
        return (
            <Group className="summary">
                <div className="subtitle">年化利率</div>
                <div className="yearRate">
                    <span className="amount">9.5</span>
                    <span className="unit">%</span>
                </div>
                <Slogan />
                <div className="label">
                    <span className="label-item">1个月</span>
                    <span className="label-item">100元起投</span>
                    <span className="label-item">至今0风险</span>
                </div>
                <div className="footer">剩余可投10000.00元</div>
            </Group>
        )
    }
});


//标的购买规则说明
let RuleDescription=React.createClass({
    render(){
        return (
            <Group>
                <div className="subtitle"></div>
            </Group>
        )
    }
});

//产品收益对比图表
let ComparisonChart=React.createClass({
    render(){
        return (
            <Group>
                <div className="subtitle"></div>
            </Group>
        )
    }
});

let EarnSetIntroduction=React.createClass({
    render(){
        return (
            <Container scrollable={false} style={{overflow:"scroll"}} id="earnSetIntroduction">
                <Summary />
                <RuleDescription />
                <ComparisonChart />
            </Container>
        )
    }
});

export default EarnSetIntroduction;
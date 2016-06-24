require("../../scss/page/EarnSetIntroduction.scss");
//let EarnSetIntroductionAction=require("../actions/EarnSetIntroductionAction.js");
//let EarnSetIntroductionStore=require("../stores/EarnSetIntroductionStore.js");
import React from "react";
import classNames from "classnames"

//ui component
import Container from "../UIComponents/Container";
import Tabs from "../UIComponents/Tabs";
import Group from "../UIComponents/Group";
import Grid from "../UIComponents/Grid";
import Col from "../UIComponents/Col";

//utilities component
import Slogan from "./utilities/Slogan";
import ProgressBar from "./utilities/ProgressBar";

let initialOffsetTop=0;
let data=[
    {
        title:"项目名称",
        after:<span>新手标160101-11</span>
    },
    {
        title:"项目名称",
        after:<span>新手标160101-11</span>
    },
    {
        title:"项目名称",
        after:<span>新手标160101-11</span>
    },
    {
        title:"项目名称",
        after:<span>新手标160101-11</span>
    },
    {
        title:"退出规则",
        after:<div>1.期满一次性还本付息<br/>2.月月赚暂不支持提前退出</div>
    }
];

//标的简要介绍
let Summary=React.createClass({
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
            <Group className="summary" style={{marginTop:0}}>
                <div className="subtitle">年化利率</div>
                <div className="yearRate">
                    <span className="amount">9.5</span>
                    <span className="unit">%</span>
                </div>
                <Slogan />
                <div className="label">
                    <span className="label-item">{this._renderLabelItem()}</span>
                    <span className="label-item">100元起投</span>
                    <span className="label-item">至今0风险</span>
                </div>
                <ProgressBar percent="80%"/>
                <div className="footer">剩余可投10000.00元</div>
                <div className={tagClass}></div>
            </Group>
        )
    }
});


//标的购买规则说明
let RuleDescription=React.createClass({
    _renderCouponRule(){
        let CouponRuleText="";
        switch (this.props.type){
            case "newbieLoan":
                CouponRuleText="不可以使用加息券，不可以使用红包";
                break;
            case "dailyEarn":
                CouponRuleText="不可以使用加息券，不可以使用红包";
                break;
            case "monthlyEarn":
                CouponRuleText="可以使用加息券，不可以使用红包";
                break;
            case "quarterlyEarn":
                CouponRuleText="可以使用加息券，可以使用红包";
                break;
            default :
                break;
        }

        return (
            <li><span className="icon-limit"></span>{CouponRuleText}</li>
        )
    },
    render(){
        return (
            <Group className="rule-description">
                <ul>
                    {
                        this.props.type === "newbieLoan" ?
                        (
                            <li><span className="icon-benefit"></span>加息5.5%，合计15%的年化收益</li>
                        ) : null
                    }
                    <li><span className="icon-apply"></span>使用风险准备金本息垫付计划</li>
                    {this._renderCouponRule()}
                </ul>
            </Group>
        )
    }
});

//产品收益对比图表
let ComparisonChart=React.createClass({
    _renderChartContent(){
        const LABEL_TEXT_MAP={
            newbieLoan:"新手标",
            dailyEarn:"天天赚",
            monthlyEarn:"月月赚",
            quarterlyEarn:"季季赚"
        }
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

let EarnSetIntroduction=React.createClass({
    _handleOnScroll(){
        let tabsNav=document.getElementsByClassName("tabs-nav")[0];
        let container=document.getElementById("earnSetIntroduction");

        console.log("init offsetTop:",initialOffsetTop);
        let scrollTop=container.scrollTop;
        if(scrollTop > initialOffsetTop){
            console.log("into if,offsetTop:",initialOffsetTop);
            console.log("into if,scrollTop:",scrollTop);
            tabsNav.style.position="fixed";
            tabsNav.style.left=0;
            tabsNav.style.top="43px";
            tabsNav.style.zIndex=999;
        }else {
            console.log("into else");
            tabsNav.style.position="relative";
            //console.log
        }
    },
    render(){
        let productonType=this.props.location.query.type;
        return (
            <Container scrollable={false} style={{overflow:"scroll"}} id="earnSetIntroduction" onTouchMove={this._handleOnScroll}>
                <Summary type={productonType}/>
                <RuleDescription type={productonType}/>
                <ComparisonChart type={productonType}/>
                <Tabs defaultActiveKey={0}>

                     <Tabs.Item
                         title="项目介绍"
                         key={0}
                         navStyle={null}
                     >
                         <table >
                             <tbody>
                             {
                                 data.map((item,i) => {
                                     return (
                                         <tr>
                                         <td className="title">{item.title}</td>
                                         <td className="content">{item.after}</td>
                                         </tr>
                                     )
                                 })
                             }
                             </tbody>
                         </table>
                         <Group>
                            <h6>产品说明</h6>
                            <div className="content">产品说明产品说明产品说明产品说明产品说明产品说明产品说明产品说明产品说明产品说明产品说明产品说明产品说明产品说明</div>
                         </Group>

                         <Group>
                             <h6>还款保障</h6>
                             <div>还款保障还款保障还款保障还款保障还款保障还款保障还款保障还款保障还款保障还款保障还款保障还款保障还款保障还款保障</div>
                         </Group>

                         <Group>
                             <h6>资金保障</h6>
                             <div>资金保障资金保障资金保障资金保障资金保障资金保障资金保障资金保障资金保障资金保障资金保障资金保障资金保障资金保障</div>
                         </Group>

                         <Group>
                             <h6>服务协议</h6>
                             <div>服务协议服务协议服务协议服务协议服务协议服务协议服务协议服务协议服务协议服务协议服务协议服务协议服务协议服务协议</div>
                         </Group>
                     </Tabs.Item>
                     <Tabs.Item
                         title="投资记录"
                         key={1}
                         navStyle={null}
                     >
                         <table >
                             <thead>
                                <tr>
                                    <th>投资人</th>
                                    <th>金额（元）</th>
                                    <th>时间</th>
                                </tr>
                             </thead>
                             <tbody>
                                 <tr>
                                     <td className="left">黄**</td>
                                     <td>20000.00</td>
                                     <td>今天10:30</td>
                                 </tr>
                                 <tr>
                                     <td className="left">黄**</td>
                                     <td>20000.00</td>
                                     <td>今天10:30</td>
                                 </tr>
                                 <tr>
                                     <td className="left">黄**</td>
                                     <td>20000.00</td>
                                     <td>今天10:30</td>
                                 </tr>
                                 <tr>
                                     <td className="left">黄**</td>
                                     <td>20000.00</td>
                                     <td>今天10:30</td>
                                 </tr>
                                 <tr>
                                     <td className="left">黄**</td>
                                     <td>20000.00</td>
                                     <td>今天10:30</td>
                                 </tr>
                                 <tr>
                                     <td className="left">黄**</td>
                                     <td>20000.00</td>
                                     <td>今天10:30</td>
                                 </tr>
                                 <tr>
                                     <td className="left">黄**</td>
                                     <td>20000.00</td>
                                     <td>今天10:30</td>
                                 </tr>
                                 <tr>
                                     <td className="left">黄**</td>
                                     <td>20000.00</td>
                                     <td>今天10:30</td>
                                 </tr>
                                 <tr>
                                     <td className="left">黄**</td>
                                     <td>20000.00</td>
                                     <td>今天10:30</td>
                                 </tr>
                                 <tr>
                                     <td className="left">黄**</td>
                                     <td>20000.00</td>
                                     <td>今天10:30</td>
                                 </tr>
                                 <tr>
                                     <td className="left">黄**</td>
                                     <td>20000.00</td>
                                     <td>今天10:30</td>
                                 </tr>
                                 <tr>
                                     <td className="left">黄**</td>
                                     <td>20000.00</td>
                                     <td>今天10:30</td>
                                 </tr>
                                 <tr>
                                     <td className="left">黄**</td>
                                     <td>20000.00</td>
                                     <td>今天10:30</td>
                                 </tr>
                                 <tr>
                                     <td className="left">黄**</td>
                                     <td>20000.00</td>
                                     <td>今天10:30</td>
                                 </tr> <tr>
                                     <td className="left">黄**</td>
                                     <td>20000.00</td>
                                     <td>今天10:30</td>
                                 </tr>


                             </tbody>
                         </table>
                     </Tabs.Item>
                 </Tabs>
            </Container>
        )
    },
    componentDidMount(){
        let tabsNav=document.getElementsByClassName("tabs-nav")[0];
        initialOffsetTop=tabsNav.offsetTop - 44;
    }
});

export default EarnSetIntroduction;
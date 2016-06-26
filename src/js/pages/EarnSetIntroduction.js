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
import Modal from "../UIComponents/modal/Modal";

//utilities component
import Summary from "./utilities/EarnSetSummary.js";
import RuleDescription from "./utilities/EarnSetRuleDescription.js";
import ComparisonChart from "./utilities/EarnSetComparisonChart.js";
import InvestmentRecord from "./utilities/InvestmentRecord.js"
import PurchaseButton from "./utilities/PurchaseButton.js";

let initialOffsetTop=0;
const LABEL_TEXT_MAP={
    newbieLoan:"新手标",
    dailyEarn:"天天赚",
    monthlyEarn:"月月赚",
    quarterlyEarn:"季季赚"
}
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

let recordList=[
    {
        user:"黄＊＊",
        amount:"100,000",
        date:"2-16-02-04"
    },
    {
        user:"黄＊＊",
        amount:"100,000",
        date:"2-16-02-04"
    },
    {
        user:"黄＊＊",
        amount:"100,000",
        date:"2-16-02-04"
    },
    {
        user:"黄＊＊",
        amount:"100,000",
        date:"2-16-02-04"
    },
    {
        user:"黄＊＊",
        amount:"100,000",
        date:"2-16-02-04"
    },
    {
        user:"黄＊＊",
        amount:"100,000",
        date:"2-16-02-04"
    },
    {
        user:"黄＊＊",
        amount:"100,000",
        date:"2-16-02-04"
    }
]







let EarnSetIntroduction=React.createClass({
    _handleOnScroll(){
    },
    _test2(event){
        let container=document.getElementById("earnSetIntroduction");
        let offsetHeight=container.offsetHeight;
        let scrollHeight=container.scrollHeight;
        let scrollTop=container.scrollTop;
        if(scrollTop > scrollHeight-offsetHeight-1){
            this.refs.modal.open();
        }
    },
    _handleClose(){
        this.refs.modal.close();
    },
    render(){
        let productionType=this.props.location.query.type;
        let modalTitle=LABEL_TEXT_MAP[productionType];
        return (
            <Container scrollable={false} style={{overflow:"scroll"}} id="earnSetIntroduction" onTouchEnd={this._handleOnScroll} onScroll={this._test2}>
                <Summary type={productionType}/>
                <RuleDescription type={productionType}/>
                <ComparisonChart type={productionType}/>
                <PurchaseButton isSoldOut={false} type={productionType} history={this.props.history}/>
                <Modal
                    title={modalTitle + "详情"}
                    ref="modal"
                    isOpen={false}
                    role="popup"
                    onDismiss={this._handleClose}
                    >
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
                            <InvestmentRecord recordList={recordList}/>
                        </Tabs.Item>
                    </Tabs>
                </Modal>
            </Container>
        )
    },
    componentDidMount(){

    }
});

export default EarnSetIntroduction;
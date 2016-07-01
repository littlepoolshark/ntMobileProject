require("../../scss/page/EarnSetIntroduction.scss");
let EarnSetIntroductionAction=require("../actions/EarnSetIntroductionAction.js");
let EarnSetIntroductionStore=require("../stores/EarnSetIntroductionStore.js");
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
import RepaymentDescription from "./utilities/RepaymentDescription"
import FundGuaranteeDescription from "./utilities/FundGuaranteeDescription"
import ServiceAgreement from "./utilities/ServiceAgreement"
import ProductDescription from "./utilities/ProductDescription";
import ProductIntroduction from "./utilities/ProductIntroduction";
import config from "../config";

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
    _getAllDataFromStore(){
        return EarnSetIntroductionStore.getAll();
    },
    getDefaultProps(){

    },
    getInitialState(){
        let {
            productId,
            type
            }=this.props.location.query;
        EarnSetIntroductionAction.getDataFromServer(type,productId);
        return this._getAllDataFromStore()
    },
    _handleOnScroll(event){
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
        let modalTitle=config.productNameMap[productionType];
        return (
            <Container scrollable={false} style={{overflow:"scroll"}} id="earnSetIntroduction"  onScroll={this._handleOnScroll}>
                <Summary  {...this.state}/>
                <RuleDescription {...this.state}/>
                <ComparisonChart {...this.state}/>
                <PurchaseButton isSoldOut={true} {...this.state} {...this.props}/>
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
                            <ProductIntroduction {...this.state}/>
                            <ProductDescription {...this.state}/>

                            <RepaymentDescription />

                            <FundGuaranteeDescription />

                            <ServiceAgreement {...this.state}/>

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

        EarnSetIntroductionStore.bind("change",function(){
            this.setState(this._getAllDataFromStore())
        }.bind(this));
    }
});

export default EarnSetIntroduction;
require("../../scss/page/EarnSetIntroduction.scss");
let EarnSetIntroductionAction=require("../actions/EarnSetIntroductionAction.js");
let EarnSetIntroductionStore=require("../stores/EarnSetIntroductionStore.js");
let InvestmentRecordAction=require("../actions/InvestmentRecordAction.js");
import React from "react";
import classNames from "classnames";
import CSSCore from "../UIComponents/utils/CSSCore";

//ui component
import Container from "../UIComponents/Container";
import Tabs from "../UIComponents/Tabs";
import Group from "../UIComponents/Group";
import Grid from "../UIComponents/Grid";
import Col from "../UIComponents/Col";
import Modal from "../UIComponents/modal/Modal";
import Loader from "../UIComponents/Loader";

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


let EarnSetIntroduction=React.createClass({
    _getAllDataFromStore(){
        return EarnSetIntroductionStore.getAll();
    },
    getDefaultProps(){
    /*在这里无法取到this.props的值,why?*/
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
            this.refs.detailModal.open();
        }
    },
    _test(event){
        let investList=document.getElementById("test");

        if(CSSCore.hasClass(investList,"active")){
            let offsetHeight=event.target.offsetHeight;
            let scrollHeight=event.target.scrollHeight;
            let scrollTop=event.target.scrollTop;
            if(scrollTop > scrollHeight-offsetHeight-1){
                Loader.show();
                InvestmentRecordAction.loadNextPage();
            }
        }
    },
    _handleClose(){
        InvestmentRecordAction.clearAll();
        this.refs.detailModal.close();
    },
    render(){
        let productionType=this.props.location.query.type;
        let modalTitle=config.productNameMap[productionType];
        return (
            <Container scrollable={false} style={{overflow:"scroll"}} id="earnSetIntroduction"  onScroll={this._handleOnScroll}>
                <Summary  {...this.state}/>
                <RuleDescription {...this.state}/>
                <ComparisonChart {...this.state}/>
                <PurchaseButton  {...this.state} {...this.props}/>
                <Modal
                    title={modalTitle + "详情"}
                    ref="detailModal"
                    isOpen={false}
                    role="popup"
                    onDismiss={this._handleClose}
                    onScroll={this._test}
                    >
                    <Tabs defaultActiveKey={0} >

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
                            ref="investmentList"
                            id="test"
                            >
                            <InvestmentRecord {...this.state} />
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
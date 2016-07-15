require("../../scss/page/EarnSetIntroduction.scss");
/*let EarnSetIntroductionAction=require("../actions/EarnSetIntroductionAction.js");
let EarnSetIntroductionStore=require("../stores/EarnSetIntroductionStore.js");
let InvestmentRecordAction=require("../actions/InvestmentRecordAction.js");*/
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

//utilities component
import Summary from "./utilities/EarnSetSummary.js";
import RuleDescription from "./utilities/EarnSetRuleDescription.js";
import InvestmentRecord from "./utilities/InvestmentRecord.js"
import PurchaseButton from "./utilities/PurchaseButton.js";
import RepaymentDescription from "./utilities/RepaymentDescription";
import FundGuaranteeDescription from "./utilities/FundGuaranteeDescription";
import ServiceAgreement from "./utilities/ServiceAgreement";
import ProductDescription from "./utilities/ProductDescription";
import ProductIntroduction from "./utilities/ProductIntroduction";
import config from "../config";

let initialOffsetTop=0;


let FixedLoanIntroduction=React.createClass({
    getInitialState(){
        return {
            type:"loan_product",
            productApr:0.118,
            buyProgress:0.58,
            remainAmount:100000,
            repaymentLimit:7,
            repaymentTypeUnit:"个月",
            totalAmount:1000000
        }
    },
    render(){
        let productionType=this.props.location.query.type;
        let modalTitle=config.productNameMap[productionType];
        return (
            <Container scrollable={false} style={{overflow:"scroll"}}  id="earnSetIntroduction" >
                <Summary  {...this.state}/>
                <RuleDescription {...this.state}/>
                <Group noPadded={true}>
                    <ProductIntroduction {...this.state} productName="好采投"/>
                </Group>

            </Container>
        )
    }
});

export default FixedLoanIntroduction;
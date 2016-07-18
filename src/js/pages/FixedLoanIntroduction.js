require("../../scss/page/FixedLoanIntroduction.scss");
let FixedLoanIntroductionAction=require("../actions/FixedLoanIntroductionAction.js");
let FixedLoanIntroductionStore=require("../stores/FixedLoanIntroductionStore.js");
/*let InvestmentRecordAction=require("../actions/InvestmentRecordAction.js");*/
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
import Summary from "./utilities/Summary.js";
import RuleDescription from "./utilities/RuleDescription.js";
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
        return FixedLoanIntroductionStore.getAll();
    },
    _handleOnScroll(event){
        let container=document.getElementById("FixedLoanIntroduction");
        let offsetHeight=container.offsetHeight;
        let scrollHeight=container.scrollHeight;
        let scrollTop=container.scrollTop;
        if(scrollTop > scrollHeight-offsetHeight-1){
            this.refs.detailModal.open();
        }
    },
    _handleClose(){
        this.refs.detailModal.close();
    },
    render(){
        let productionType=this.props.location.query.type;
        let modalTitle=config.productNameMap[productionType];
        return (
            <Container scrollable={false} style={{overflow:"scroll"}}  id="FixedLoanIntroduction"  onScroll={this._handleOnScroll}>
                <Summary  {...this.state}/>
                <RuleDescription {...this.state}/>
                <Group noPadded={true}>
                    <ProductIntroduction {...this.state} />
                </Group>
                <PurchaseButton  {...this.state} {...this.props}/>
                <Modal
                    title={modalTitle + "详情"}
                    ref="detailModal"
                    isOpen={false}
                    role="popup"
                    onDismiss={this._handleClose}
                >
                    <Tabs defaultActiveKey={0} >

                        <Tabs.Item
                            title="项目信息"
                            key={0}
                            navStyle={null}
                        >
                            <ServiceAgreement {...this.state}/>
                        </Tabs.Item>
                        <Tabs.Item
                            title="风险控制"
                            key={1}
                            navStyle={null}
                        >
                            <RepaymentDescription />
                            <FundGuaranteeDescription />
                        </Tabs.Item>
                        <Tabs.Item
                            title="投资记录"
                            key={2}
                            navStyle={null}
                        >
                            投资记录
                        </Tabs.Item>
                    </Tabs>
                </Modal>
            </Container>
        )
    },
    componentDidMount(){
        let id=this.props.location.query.productId;
        FixedLoanIntroductionAction.getDataFromServer(id);

        FixedLoanIntroductionStore.bind("change",function(){
           this.setState(FixedLoanIntroductionStore.getAll()) ;
        }.bind(this));
    }
});

export default FixedLoanIntroduction;
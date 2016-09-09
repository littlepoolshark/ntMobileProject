require("../../scss/page/CreditorLoanIntroduction.scss");
let CreditorLoanIntroductionAction=require("../actions/CreditorLoanIntroductionAction.js");
let CreditorLoanIntroductionStore=require("../stores/CreditorLoanIntroductionStore.js");
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
import List from "../UIComponents/List";

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


let CreditorLoanIntroduction=React.createClass({
    getInitialState(){
        return CreditorLoanIntroductionStore.getAll();
    },
    _handleOnScroll(event){
        let container=document.getElementById("creditorLoanIntroduction");
        let offsetHeight=container.offsetHeight;
        let scrollHeight=container.scrollHeight;
        let scrollTop=container.scrollTop;
        if(scrollTop > scrollHeight-offsetHeight-1){
            this.refs.detailModal.open();
        }
    },
    _handleModalClose(){
        this.refs.detailModal.close();
    },
    _handleModalopen(){
        this.refs.detailModal.open();
    },
    render(){
        let productionType=this.props.location.query.type;
        let modalTitle=config.productNameMap[productionType];
        return (
            <Container scrollable={false} style={{overflow:"scroll"}}  id="creditorLoanIntroduction"   onScroll={this._handleOnScroll}>
                <Summary  {...this.state}/>
                <RuleDescription {...this.state}/>
                <Group noPadded={true} id="productIntroduction"  >
                    <ProductIntroduction {...this.state} />
                </Group>
                <div  className="checkLoanDetail"  id="checkMoreDetail" onClick={this._handleModalOpen}>
                    <span className="imgIcon imgIcon-slide-up"></span>滑动或者点击查看详情
                </div>
                <PurchaseButton  {...this.state} {...this.props}/>
                <Modal
                    title={modalTitle + "详情"}
                    ref="detailModal"
                    isOpen={false}
                    role="popup"
                    onDismiss={this._handleModalClose}
                    >
                    <Tabs defaultActiveKey={0} >

                        <Tabs.Item
                            title="项目信息"
                            key={0}
                            navStyle={null}
                            >
                            <ProductDescription {...this.state}/>
                            <List>
                                <List.Item href={"#/FixedLoanIntroduction/?productId="+this.state.loanId+"&type=loan_product"} title="查看原标的详情" />
                            </List>
                            <ServiceAgreement {...this.state}/>
                        </Tabs.Item>
                        <Tabs.Item
                            title="投资记录"
                            key={2}
                            navStyle={null}
                            >
                            <InvestmentRecord {...this.state} />
                        </Tabs.Item>
                    </Tabs>
                </Modal>
            </Container>
        )
    },
    componentDidMount(){
        let id=this.props.location.query.productId;
        CreditorLoanIntroductionAction.getDataFromServer(id);

        CreditorLoanIntroductionStore.bind("change",function(){
            this.setState(CreditorLoanIntroductionStore.getAll()) ;
        }.bind(this));

        //支持滑动查看标的详情的交互方式
        let checkMoreDetail=document.getElementById("checkMoreDetail");
        let productIntroduction=document.getElementById("productIntroduction");
        let container=document.getElementById("creditorLoanIntroduction");
        if(container.scrollHeight <= container.offsetHeight){
            let paddingBottom=(container.scrollHeight  + 44) - (productIntroduction.offsetTop  + productIntroduction.offsetHeight + checkMoreDetail.offsetHeight + 15);
            checkMoreDetail.style.paddingBottom=paddingBottom + 30 + "px";//通过填充30px，撑开容器的垂直高度，使之出现滚动条
        }
    }
});

module.exports=CreditorLoanIntroduction;
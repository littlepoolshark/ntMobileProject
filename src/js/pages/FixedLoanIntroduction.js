require("../../scss/page/FixedLoanIntroduction.scss");
let FixedLoanIntroductionAction=require("../actions/FixedLoanIntroductionAction.js");
let FixedLoanIntroductionStore=require("../stores/FixedLoanIntroductionStore.js");

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
import Icon from "../UIComponents/Icon";

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
        let container=document.getElementById("fixedLoanIntroduction");
        let offsetHeight=container.offsetHeight;
        let scrollHeight=container.scrollHeight;
        let scrollTop=container.scrollTop;
        if(scrollTop > scrollHeight-offsetHeight-3){
            this.refs.detailModal.open();
        }
    },
    _handleModalClose(){
        this.refs.detailModal.close();
    },
    _handleModalOpen(){
        this.refs.detailModal.open();
    },
    render(){
        let {
            realName,
            marriedDescr,
            genderDescr,
            age,
            loanDescr,
            repaymentSource,
            licenseList,
            licenseType,
            companyName,
            corporation,
            guaranteeLicenseList,
            guaranteeLabelList,
            useDesc
            }=this.state;
        let productionType=this.props.location.query.type;
        let modalTitle=config.productNameMap[productionType];
        return (
            <Container scrollable={false} style={{overflow:"scroll"}}  id="fixedLoanIntroduction"  onScroll={this._handleOnScroll}>
                <Summary  {...this.state}/>
                <RuleDescription {...this.state}/>
                <Group noPadded={true} id="productIntroduction">
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
                            <Group noPadded={false} >
                                <h6>借款人资料</h6>
                                <div className="content">
                                    {
                                        licenseType === "person" ?
                                        (
                                            <Grid collapse={true} wrap="wrap">
                                                <Col cols={3}>姓名：{realName}</Col>
                                                <Col cols={3}>性别：{genderDescr}</Col>
                                                <Col cols={3}>年龄：{age}</Col>
                                                <Col cols={3}>婚姻状况：{marriedDescr}</Col>
                                            </Grid>
                                        )  :
                                        null
                                    }
                                    {
                                        licenseType === "enterprise" ?
                                            (
                                                <Grid collapse={true} wrap="wrap">
                                                    <Col cols={6}>公司名称：{companyName}</Col>
                                                    <Col cols={6}>企业法人：{corporation}</Col>
                                                </Grid>
                                            )  :
                                            null
                                    }
                                </div>
                            </Group>
                            <Group noPadded={false} >
                                <h6>资质信息</h6>
                                <div className="content">
                                    <Grid collapse={true} wrap="wrap">
                                        {
                                            !licenseList ||  (!!licenseList && licenseList.length === 0) ?
                                            ( <Col cols={3} >暂无资质信息</Col>) :
                                            licenseList.map(function(item,index){
                                                return (
                                                    <Col cols={3} key={index+1}>{item}</Col>
                                                )
                                            })
                                        }
                                    </Grid>
                                    <div>*可以登录农泰金融pc端官网查看资质详情</div>
                                </div>
                            </Group>
                            <Group noPadded={false} >
                                <h6>项目介绍</h6>
                                <div className="content">
                                    {!!loanDescr ? loanDescr : "暂无项目介绍"}
                                </div>
                            </Group>
                            <Group noPadded={false} >
                                <h6>借款用途</h6>
                                <div className="content">
                                    {useDesc}
                                </div>
                            </Group>
                            <Group noPadded={false} >
                                <h6>还款来源</h6>
                                <div className="content">
                                    {repaymentSource}
                                </div>
                            </Group>
                            <ServiceAgreement {...this.state}/>
                        </Tabs.Item>
                        <Tabs.Item
                            title="风险控制"
                            key={1}
                            navStyle={null}
                        >
                            <Group noPadded={false} >
                                <h6>担保人资质</h6>
                                <div className="content">
                                    <Grid wrap="wrap" collapse={true}>
                                        <Col cols={3} >
                                            担保人身份证
                                            {
                                                !!guaranteeLicenseList && guaranteeLicenseList.indexOf("担保人身份证") > -1 ?
                                                <Icon name="check"/> :
                                                null
                                            }
                                        </Col>
                                        <Col cols={3} >
                                            担保人营业执照
                                            {
                                                !!guaranteeLicenseList && guaranteeLicenseList.indexOf("担保人营业执照") > -1 ?
                                                    <Icon name="check"/> :
                                                    null
                                            }
                                        </Col>
                                    </Grid>
                                    <div>*可以登录农泰金融pc端官网查看详情</div>
                                </div>
                            </Group>
                            {
                                !!guaranteeLabelList && guaranteeLabelList.map(function(item,index){
                                    return (
                                        <Group noPadded={false} >
                                            <h6>{item.label}</h6>
                                            <div className="content">
                                                {item.value}
                                            </div>
                                        </Group>
                                    )
                                })
                            }
                            <RepaymentDescription />
                            <FundGuaranteeDescription />
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
        FixedLoanIntroductionAction.getDataFromServer(id);

        FixedLoanIntroductionStore.bind("change",function(){
           this.setState(FixedLoanIntroductionStore.getAll()) ;
        }.bind(this));


        //支持滑动查看标的详情的交互方式
        let checkMoreDetail=document.getElementById("checkMoreDetail");
        let productIntroduction=document.getElementById("productIntroduction");
        let container=document.getElementById("fixedLoanIntroduction");
        if(container.scrollHeight <= container.offsetHeight){
            let paddingBottom=(container.scrollHeight  + 44) - (productIntroduction.offsetTop  + productIntroduction.offsetHeight + checkMoreDetail.offsetHeight + 15);
            checkMoreDetail.style.paddingBottom=paddingBottom + 30 + "px";//通过填充30px，撑开容器的垂直高度，使之出现滚动条
        }
    }
});

module.exports=FixedLoanIntroduction;
require("../../scss/page/CreditorLoanIntroduction.scss");
let CreditorLoanIntroductionAction=require("../actions/CreditorLoanIntroductionAction.js");
let CreditorLoanIntroductionStore=require("../stores/CreditorLoanIntroductionStore.js");
import React from "react";
import classNames from "classnames";
import CSSCore from "../UIComponents/utils/CSSCore";

//ui component
import View from "../UIComponents/View";
import NavBar from "../UIComponents/NavBar";
import Container from "../UIComponents/Container";
import Tabs from "../UIComponents/Tabs";
import Group from "../UIComponents/Group";
import Grid from "../UIComponents/Grid";
import Col from "../UIComponents/Col";
import Modal from "../UIComponents/modal/Modal";
import List from "../UIComponents/List";
import Icon from "../UIComponents/Icon";
import SlideMask from "../UIComponents/SlideMask";
import RiskAnnounce from "./utilities/RiskAnnounce";

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
import cookie from "../lib/cookie";
import getParamObjFromUrl from "../lib/getParamObjFromUrl";

let initialOffsetTop=0;


let CreditorLoanIntroduction=React.createClass({
    getInitialState(){
        return {
            data:CreditorLoanIntroductionStore.getAll(),
            isMaskOpen:false,
            maskType:"descriptionOfCreditor"
        }
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
    _handleModalOpen(){
        this.refs.detailModal.open();
    },
    _openSlideMark(maskType){
        this.setState({
            isMaskOpen:true,
            maskType:maskType
        });
    },
    _closeSlideMark(){
        this.setState({
            isMaskOpen:false
        });
    },
    _handleNavClick(e){
        let {
            productId,
            type,
            inviteCode
            }=getParamObjFromUrl();
        let currUrl=window.location.href;
        let hasShareMark=currUrl.indexOf("shareFromApp") > -1 || currUrl.indexOf("shareFromWeixin") > -1;
        let isLogin=!!cookie.getCookie("token");

        if(e.title === "分享"){
            if(isLogin){
                let phoneNo=cookie.getCookie("phoneNo");
                window.history.replaceState(null,"","#/creditorLoanIntroduction?&productId=" + productId + "&type=" + type + "&inviteCode=" + phoneNo + "&shareFromWeixin=true");//在“?”后面加上了“&”，解决了wechat对分享链接插入参数而导致链接无法访问的问题
            }else {
                window.history.replaceState(null,"","#/creditorLoanIntroduction?&productId=" + productId + "&type=" + type  + "&shareFromWeixin=true");//在“?”后面加上了“&”，解决了wechat对分享链接插入参数而导致链接无法访问的问题
            }
            this._openSlideMark("shareHint");
        }else if(e.title === "返回"){
            if(hasShareMark){
                this.context.router.push({
                    pathname:"home"
                })
            }else {
                this.context.router.goBack();
            }
        }
    },
    _renderMaskInner(maskType){
        if(maskType === "descriptionOfCreditor"){
            return (
                <div className="description-mask">
                    <div className="body">
                        <div className="title text-center">债权转让</div>
                        <div className="content">
                            <p>1、持有满30天即可转让。</p>
                            <p>2、距离每月还息日少于3天，最后一期距离到期日少于7天，不能转让。</p>
                        </div>
                    </div>
                    <div className="footer"><Icon classPrefix="imgIcon" name="closeBtnInWrapper"/></div>
                </div>
            )
        }else if(maskType === "shareHint"){
            return (
                <img src={require("../../img/share-guide.png")} alt="" className="share-guide-img"/>
            )
        }else {
            return null
        }
    },
    render(){
        let productionType=this.props.location.query.type;
        let modalTitle=config.productNameMap[productionType];

        let {
            productName
            }=this.state.data;

        let backNav = {
            component:"a",
            icon: 'left-nav',
            title: '返回'
        };

        let rightNav = {
            component:"a",
            title: '分享'
        }

        return (
            <View>
                <NavBar
                    title={productName+" • 转"}
                    leftNav={[backNav]}
                    rightNav={[rightNav]}
                    amStyle="primary"
                    onAction={this._handleNavClick}
                />
                <Container scrollable={false} style={{overflow:"scroll"}}  id="creditorLoanIntroduction"   onScroll={this._handleOnScroll}>
                    <Summary  {...this.state.data}/>
                    <Group noPadded={true} id="productIntroduction"  >
                        <ProductIntroduction {...this.state.data} onQuestionMarkClick={this._openSlideMark}/>
                    </Group>
                    <div  className="checkLoanDetail"  id="checkMoreDetail" onClick={this._handleModalOpen}>
                        <span className="imgIcon imgIcon-slide-up"></span>滑动或者点击查看详情
                    </div>
                    <PurchaseButton  {...this.state.data} {...this.props}/>
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
                                <ProductDescription {...this.state.data}/>
                                <List>
                                    <List.Item href={"#/FixedLoanIntroduction/?productId="+this.state.data.loanId+"&type=loan_product"} title="查看原标的详情" />
                                </List>
                                <ServiceAgreement {...this.state.data}/>
                                <RiskAnnounce />
                            </Tabs.Item>
                            <Tabs.Item
                                title="投资记录"
                                key={2}
                                navStyle={null}
                            >
                                <InvestmentRecord {...this.state.data} />
                            </Tabs.Item>
                        </Tabs>
                    </Modal>
                    <SlideMask isMaskOpen={this.state.isMaskOpen}>
                        {
                            this._renderMaskInner(this.state.maskType)
                        }
                    </SlideMask>
                </Container>
            </View>
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

CreditorLoanIntroduction.contextTypes = {
    router:React.PropTypes.object.isRequired
};

module.exports=CreditorLoanIntroduction;
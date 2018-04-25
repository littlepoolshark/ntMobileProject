require("../../scss/page/EarnSetIntroduction.scss");
let EarnSetIntroductionAction=require("../actions/EarnSetIntroductionAction.js");
let EarnSetIntroductionStore=require("../stores/EarnSetIntroductionStore.js");
let InvestmentRecordAction=require("../actions/InvestmentRecordAction.js");
import React from "react";
import classNames from "classnames";
import CSSCore from "../UIComponents/utils/CSSCore";

//ui component
import View from "../UIComponents/View";
import Container from "../UIComponents/Container";
import Tabs from "../UIComponents/Tabs";
import Group from "../UIComponents/Group";
import Grid from "../UIComponents/Grid";
import Col from "../UIComponents/Col";
import Modal from "../UIComponents/modal/Modal";
import Loader from "../UIComponents/Loader";
import NavBar from "../UIComponents/NavBar";
import SlideMask from "../UIComponents/SlideMask";

//utilities component
import Summary from "./utilities/Summary.js";
import RuleDescription from "./utilities/RuleDescription.js";
import ComparisonChart from "./utilities/ComparisonChart.js";
import InvestmentRecord from "./utilities/InvestmentRecord.js"
import PurchaseButton from "./utilities/PurchaseButton.js";
import RepaymentDescription from "./utilities/RepaymentDescription"
import FundGuaranteeDescription from "./utilities/FundGuaranteeDescription"
import ServiceAgreement from "./utilities/ServiceAgreement"
import ProductDescription from "./utilities/ProductDescription";
import ProductIntroduction from "./utilities/ProductIntroduction";
import RiskAnnounce from "./utilities/RiskAnnounce";
import config from "../config";

import cookie from "../lib/cookie";
import getParamObjFromUrl from "../lib/getParamObjFromUrl";

let initialOffsetTop=0;


let EarnSetIntroduction=React.createClass({
    _getAllDataFromStore(){
        return EarnSetIntroductionStore.getAll();
    },
    getDefaultProps(){
    /*在这里无法取到this.props的值,why?*/
    },
    getInitialState(){
        return {
            data:this._getAllDataFromStore(),
            isMaskOpen:false
        }
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
    _handleModalClose(){
        InvestmentRecordAction.clearAll();
        this.refs.detailModal.close();
    },
    _handleModalOpen(){
        this.refs.detailModal.open();
    },
    _handleOpenMask(){
        this.setState({
            isMaskOpen:true
        })
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
                window.history.replaceState(null,"","#/earnSetIntroduction?&productId=" + productId + "&type=" + type + "&inviteCode=" + phoneNo + "&shareFromWeixin=true");//在“?”后面加上了“&”，解决了wechat对分享链接插入参数而导致链接无法访问的问题
            }else {
                window.history.replaceState(null,"","#/earnSetIntroduction?&productId=" + productId + "&type=" + type  + "&shareFromWeixin=true");//在“?”后面加上了“&”，解决了wechat对分享链接插入参数而导致链接无法访问的问题
            }
            this._handleOpenMask();
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
    render(){
        let productionType=this.props.location.query.type;
        let modalTitle=config.productNameMap[productionType];

        let leftNav = {
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
                    title={modalTitle}
                    leftNav={[leftNav]}
                    rightNav={[rightNav]}
                    amStyle="primary"
                    onAction={this._handleNavClick}
                />
                <Container scrollable={false} style={{overflow:"scroll"}} id="earnSetIntroduction"  onScroll={this._handleOnScroll} ref="earnSetIntroduction">
                    <Summary  {...this.state.data}/>
                    <RuleDescription {...this.state.data}/>
                    <ComparisonChart {...this.state.data} id="comparisonChart"/>
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
                        {
                            productionType === "new_product" || productionType === "ttz_product" ?
                                <Tabs defaultActiveKey={0} >
                                    <Tabs.Item
                                        title="项目介绍"
                                        key={0}
                                        navStyle={null}
                                    >
                                        <ProductIntroduction {...this.state.data}/>
                                        <ProductDescription {...this.state.data}/>

                                        <RepaymentDescription />

                                        <FundGuaranteeDescription />

                                        <ServiceAgreement {...this.state.data}/>
                                        <RiskAnnounce/>
                                    </Tabs.Item>
                                </Tabs>   :
                                <Tabs defaultActiveKey={0} >
                                    <Tabs.Item
                                        title="项目介绍"
                                        key={0}
                                        navStyle={null}
                                    >
                                        <ProductIntroduction {...this.state.data}/>
                                        <ProductDescription {...this.state.data}/>

                                        <RepaymentDescription />

                                        <FundGuaranteeDescription />

                                        <ServiceAgreement {...this.state.data}/>
                                        <RiskAnnounce/>
                                    </Tabs.Item>

                                    <Tabs.Item
                                        title="投资记录"
                                        key={1}
                                        navStyle={null}
                                        ref="investmentList"
                                    >
                                        <InvestmentRecord {...this.state.data} />
                                    </Tabs.Item>
                                </Tabs>
                        }

                    </Modal>
                    <SlideMask isMaskOpen={this.state.isMaskOpen}>
                        <img src={require("../../img/share-guide.png")} alt="" className="share-guide-img"/>
                    </SlideMask>
                </Container>
            </View>
        )
    },
    componentDidMount(){

        let {
            productId,
            type
            }=this.props.location.query;
        EarnSetIntroductionAction.getDataFromServer(type,productId);

        EarnSetIntroductionStore.bind("change",function(){
            this.setState({
                data:this._getAllDataFromStore()
            })
        }.bind(this));

        //支持滑动查看标的详情的交互方式
        let checkMoreDetail=document.getElementById("checkMoreDetail");
        let comparisonChart=document.getElementById("comparisonChart");
        let container=document.getElementById("earnSetIntroduction");
        if(container.scrollHeight <= container.offsetHeight){
            let paddingBottom=(container.scrollHeight  + 44) - (comparisonChart.offsetTop  + comparisonChart.offsetHeight + checkMoreDetail.offsetHeight + 15);
            checkMoreDetail.style.paddingBottom=paddingBottom + 30 + "px";//通过填过30px，撑开容器的垂直高度，使之出现滚动条
        }

    }
});

EarnSetIntroduction.contextTypes = {
    router:React.PropTypes.object.isRequired
};

module.exports=EarnSetIntroduction;
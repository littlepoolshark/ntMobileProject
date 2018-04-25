require("../../scss/page/RichLoanIntroduction.scss");
let RichLoanIntroductionAction=require("../actions/RichLoanIntroductionAction.js");
let RichLoanIntroductionStore=require("../stores/RichLoanIntroductionStore.js");
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
import Icon from "../UIComponents/Icon";
import SlideMask from "../UIComponents/SlideMask";

//utilities component
import Summary from "./utilities/Summary.js";
import InvestmentRecord from "./utilities/InvestmentRecord.js"
import PurchaseButton from "./utilities/PurchaseButton.js";
import ServiceAgreement from "./utilities/ServiceAgreement";
import ProductDescription from "./utilities/ProductDescription";
import RiskAnnounce from "./utilities/RiskAnnounce";

import config from "../config";
import cookie from "../lib/cookie";
import getParamObjFromUrl from "../lib/getParamObjFromUrl";

let RichLoanIntroduction=React.createClass({
    getInitialState(){
        return {
            data:RichLoanIntroductionStore.getAll(),
            isMaskOpen:false,
            maskType:"descriptionOfRepayEarly"
        }
    },
    _handleOnScroll(event){
        let container=document.getElementById("richLoanIntroduction");
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
                window.history.replaceState(null,"","#/richLoanIntroduction?&productId=" + productId + "&type=" + type + "&inviteCode=" + phoneNo + "&shareFromWeixin=true");//在“?”后面加上了“&”，解决了wechat对分享链接插入参数而导致链接无法访问的问题
            }else {
                window.history.replaceState(null,"","#/richLoanIntroduction?&productId=" + productId + "&type=" + type  + "&shareFromWeixin=true");//在“?”后面加上了“&”，解决了wechat对分享链接插入参数而导致链接无法访问的问题
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
        if(maskType === "descriptionOfRepayEarly"){
            return (
                <div className="description-mask">
                    <div className="body">
                        <div className="title text-center">温馨提示</div>
                        <div className="content">
                            <p>1、该标的可能会提前还款</p>
                            <p>2、提前还款会根据提前还款期数发放补偿金</p>
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

        let {
            repaymentLimit,
            publistTimeStr,
            preInterestDateStr,
            preRepayDateStr
            }=this.state.data;

        return (
            <View>
                <NavBar
                    title={productName}
                    leftNav={[backNav]}
                    rightNav={[rightNav]}
                    amStyle="primary"
                    onAction={this._handleNavClick}
                />
                <Container scrollable={false} style={{overflow:"scroll"}}  id="richLoanIntroduction"   onScroll={this._handleOnScroll}>
                    <Summary  {...this.state.data} onQuestionMarkClick={this._openSlideMark} />
                    <Group id="productIntroduction" className="product-introduction" >
                        <Grid>
                            <Col cols="2" className="text-center">
                                <div className="img-wrapper wending"></div>
                                <div className="subtitle">收益稳定</div>
                            </Col>
                            <Col cols="2" className="text-center">
                                <div className="img-wrapper jiexi"></div>
                                <div className="subtitle">按月结息</div>
                            </Col>
                            <Col cols="2" className="text-center">
                                <div className="img-wrapper shengxin"></div>
                                <div className="subtitle">安全省心</div>
                            </Col>
                        </Grid>
                        <div className="investment-cycle">
                            <h6><span className="title-flag"></span>投资周期</h6>
                            <div className="cycle-bar cf">
                                <div className="left-bar fl">
                                    <div className="title">开放购买</div>
                                    <div className="left-bar-wrapper">
                                        <div className="left-bar-body">满标期</div>
                                        <div className="markup-line"></div>
                                    </div>
                                    <div className="subtitle">{publistTimeStr}</div>
                                </div>
                                <div className="right-bar fl">
                                    <div className="title cf">
                                        <span className="fl">起息</span><span className="fr">项目到期</span>
                                    </div>
                                    <div className="right-bar-wrapper">
                                        <div className="right-bar-body">持续收益{repaymentLimit}个月</div>
                                        <div className="markup-line left"></div>
                                        <div className="markup-line right"></div>
                                    </div>
                                    <div className="subtitle cf">
                                        <span className="fl">{preInterestDateStr}</span><span className="fr">{preRepayDateStr}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
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
                                title="项目介绍"
                                key={0}
                                navStyle={null}
                            >
                                <ProductDescription {...this.state.data}/>
                                <ServiceAgreement {...this.state.data}/>
                                <RiskAnnounce />
                            </Tabs.Item>

                            <Tabs.Item
                                title="投资记录"
                                key={1}
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
        RichLoanIntroductionAction.getDataFromServer(id);

        RichLoanIntroductionStore.bind("change",function(){
            this.setState(RichLoanIntroductionStore.getAll()) ;
        }.bind(this));

        //支持滑动查看标的详情的交互方式
        let checkMoreDetail=document.getElementById("checkMoreDetail");
        let productIntroduction=document.getElementById("productIntroduction");
        let container=document.getElementById("richLoanIntroduction");
        if(container.scrollHeight <= container.offsetHeight){
            let paddingBottom=(container.scrollHeight  + 44) - (productIntroduction.offsetTop  + productIntroduction.offsetHeight + checkMoreDetail.offsetHeight + 15);
            checkMoreDetail.style.paddingBottom=paddingBottom + 30 + "px";//通过填充30px，撑开容器的垂直高度，使之出现滚动条
        }
    }
});

RichLoanIntroduction.contextTypes = {
    router:React.PropTypes.object.isRequired
};

module.exports=RichLoanIntroduction;
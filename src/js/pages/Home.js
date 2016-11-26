require("../../scss/page/Home.scss");
let HomeAction=require("../actions/HomeAction");
let HomeStore=require("../stores/HomeStore");
import React from "react";
import {
    Link
} from 'react-router';

//ui component
import Container from "../UIComponents/Container";
import Button from "../UIComponents/Button";
import Slider from "../UIComponents/Slider";
import Group from "../UIComponents/Group";
import Grid from "../UIComponents/Grid";
import Col from "../UIComponents/Col";
import Icon from "../UIComponents/Icon";
import SpecialModal from "../UIComponents/modal/SpecialModal";
import Notification from "../UIComponents/Notification";

//utilites component
import DailyEarnCard from "./utilities/DailyEarnCard";
import HomeCommonCard from "./utilities/HomeCommonCard";
import Slogan from "./utilities/Slogan";
import mixin from "./utilities/mixin";
import cookie from "../lib/cookie";



//开通中信存管通知条:RegisterZXBankNoticeBar component
let RegisterZXBankNoticeBar=React.createClass({
    render(){
        return (
            <div className="registerToZX-bar-wrapper">
                <div className="registerToZX-bar" onClick={this.props.onAction}>
                    <div className="left">
                        <Icon classPrefix="imgIcon" name="red-shield"/>
                        <span>开通银行存管账户，保障资金安全</span></div>
                    <div className="right"><a href="javascript:void(0)" >立即开通</a></div>
                </div>
            </div>
        )
    }
});

//首页:Index component
let Home=React.createClass({
    mixins:[mixin],
    getInitialState(){
        let beforeComponent=this.props.location.query.beforeComponent;
        let hadShowRedbag=sessionStorage.getItem("hadShowRedbag");
        let isRedbagModalOpen=false;
        let isInAppWebView=cookie.getCookie("isInAppWebView");
        if(beforeComponent === "verifyCodeForRegisterGuide"){
            if(hadShowRedbag !== "yes"){
                isRedbagModalOpen=true;
                sessionStorage.setItem("hadShowRedbag","yes")
            }
        }
        return {
            data:HomeStore.getAll(),
            isRedbagModalOpen:isRedbagModalOpen,
            isNotificationVisible:isInAppWebView === "true" ? false : true,
        };
    },
    _closeNotification(){
        this.setState({
            isNotificationVisible:false
        });
    },
    _jumpToAboutUs(){
        this.context.router.push({
            pathname:"aboutUs"
        });
    },
    _jumpToInviteMyFriend(){
        this.context.router.push({
            pathname:"inviteMyFriend"
        });
    },
    _handleBannerClick(iframeSource){
        //基于内嵌ih5的页面时，页面会被放大。而不内嵌时，页面显示正常的情况下考虑,
        //如果后台返回的链接地址跟农泰金融是同一个域名之下，则跳转到应用的内部组件中，
        //否则，就跳出当前的SPA，跳转至给链接地址
        if(!!iframeSource){
            if(iframeSource.indexOf("ntjrchina") > -1){
                if(iframeSource.indexOf("weixin") > -1){//新版微信
                    let index=iframeSource.indexOf("#");
                    let componentOfBanner=iframeSource.slice(index+2);
                    this.context.router.push({
                        pathname:componentOfBanner
                    });

                }else{//老版微信页面
                    this.context.router.push({
                        pathname:"BannerPageWrapper",
                        query:{
                            iframeSource:iframeSource
                        }
                    });
                }

            }else {
                window.location.href=iframeSource;
            }
        }
    },
    _handleImgLoadFailed(event){
        event.target.src=require("../../img/banner_placeholder_failed.png");
    },
    _jumpToZXBankRegister(leftQureyTime){
        if(leftQureyTime === 0){
            this.context.router.push({
                pathname:"registerToZXFailedHint",
                query:{
                    beforeComponent:"home"
                }
            });
        }else {
            this.context.router.push({
                pathname:"registerToZXBank",
                query:{
                    beforeComponent:"home"
                }
            });
        }

    },
    _jumpToCouponList(){
        this.context.router.push({
            pathname:"couponList",
            query:{
                productType:"all"
            }
        })
    },
    render(){
        let {
            bannerList,
            productList,
            registerUserCount,
            totalAmountOfInvestment
            }=this.state.data;

        let zxcgOpenInfo=this.state.data.zxcgOpenInfo;
        let isZxcgOpen=(zxcgOpenInfo && zxcgOpenInfo.zxcgOpen === "yes") ? true  : false ;
        let leftQureyTime=zxcgOpenInfo.leftQureyTime;
        let isLogin=!!cookie.getCookie("token");
        let isNotificationVisible=this.state.isNotificationVisible;

        return (
            <Container scrollable={true}  id="home">

                {
                    isLogin && !isZxcgOpen ?
                    <RegisterZXBankNoticeBar onAction={this._jumpToZXBankRegister.bind(null,leftQureyTime)}/>:
                    null
                }

                <Slider>
                    {
                        bannerList.map(function(item,index){
                            return (
                                <Slider.Item key={index + 1}>
                                    <a href="javascript:void(0);" onClick={this._handleBannerClick.bind(null,item.link)}>
                                        <img src={item.pic} onError={this._handleImgLoadFailed} />
                                    </a>
                                </Slider.Item>
                            )
                        }.bind(this))
                    }
                </Slider>

                <Group header=""  style={{margin:0}}>
                    <Grid collapse={true}>
                        <Col cols={3} className="home-introduction-item" onClick={this._jumpToAboutUs}>
                            <div className="platform-icon"></div>
                            <div>
                                <div className="title">平台介绍</div>
                                <div className="subtitle">上市公司战略投资</div>
                            </div>
                        </Col>
                        <Col cols={3} className="home-introduction-item" onClick={this._jumpToInviteMyFriend}>
                            <div className="invite-icon"></div>
                            <div>
                                <div className="title">邀请有礼</div>
                                <div className="subtitle" >一起赚大钱</div>
                            </div>
                        </Col>
                    </Grid>
                </Group>

                {
                    /* <div className="newbieGuide-bar">
                     <Link to="newbieGuide"> <img src={require("../../img/banner_newbietask_enter.png")} alt=""/></Link>
                     </div>*/
                }

                {
                    productList.map(function(item,index){
                        if(item.type === "ttz_product"){
                            return (
                                <DailyEarnCard {...item} key={item.id}/>
                            )
                        }else {
                            return (
                                <HomeCommonCard {...item} key={item.id}/>
                            )
                        }
                    }.bind(this))
                }

                <div className="home-dashboard">
                    <div className="title text-center">农泰金融已累计为 <strong>{registerUserCount}</strong>位用户撮合交易金额（元）</div>
                    <div className="amount text-center">{totalAmountOfInvestment}</div>
                    <Slogan />
                </div>

                <SpecialModal
                    role="customize"
                    isOpen={this.state.isRedbagModalOpen}
                >
                    <div className="redbag-wrapper" onClick={this._jumpToCouponList}></div>
                </SpecialModal>
                <Notification
                    title=""
                    amStyle=""
                    visible={isNotificationVisible}
                    animated
                    onDismiss={this._closeNotification}
                    id="homeNotification"
                >
                    <div className="downloadAppGuide">
                        <div className="logo-wrapper">
                            <div className="downloadAppGuide-logo"></div>
                            <a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.ntjr.std" className="download-btn">立即下载</a>
                        </div>

                        <div className="downloadAppGuide-slogan">
                            <span>随时理财</span>
                            <span>查收益</span>
                            <span>抽iPhone7大奖</span>
                        </div>
                    </div>
                </Notification>
            </Container>


        )
    },
    componentDidMount(){
        HomeAction.getDataFromServer();

        HomeStore.bind("change",function(){
            this.setState(HomeStore.getAll())
        }.bind(this));
    }
});

Home.contextTypes = {
    router:React.PropTypes.object.isRequired
};

module.exports=Home;
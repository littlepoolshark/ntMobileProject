require("../../scss/page/Home.scss");
let HomeAction = require("../actions/HomeAction");
let HomeStore = require("../stores/HomeStore");
import React from "react";
import { Link } from "react-router";

//ui component
import Container from "../UIComponents/Container";
import Button from "../UIComponents/Button";
import Slider from "../UIComponents/Slider";
import Group from "../UIComponents/Group";
import Grid from "../UIComponents/Grid";
import Col from "../UIComponents/Col";
import Icon from "../UIComponents/Icon";
import SpecialModal from "../UIComponents/modal/SpecialModal";
import Message from "../UIComponents/Message";
import Slick from "../UIComponents/Slick";
import SlickItem from "../UIComponents/SlickItem";

//utilites component
import DailyEarnCard from "./utilities/DailyEarnCard";
import HomeCommonCard from "./utilities/HomeCommonCard";
import HomeNewbieProductCard from "./utilities/HomeNewbieProductCard";
import Slogan from "./utilities/Slogan";
import mixin from "./utilities/mixin";
import cookie from "../lib/cookie";
import RegisterToPABankInterceptModal from "./utilities/RegisterToPABankInterceptModal";
import UpgradeToPABankInterceptModal from "./utilities/UpgradeToPABankInterceptModal";

//开通中信存管通知条:RegisterPABankNoticeBar component
let RegisterPABankNoticeBar = React.createClass({
  render() {
    return (
      <div className="registerToZX-bar-wrapper">
        <div className="registerToZX-bar" onClick={this.props.onAction}>
          <div className="left">
            <Icon classPrefix="imgIcon" name="red-shield" />
            <span>开通银行存管子账户，保障资金安全</span>
          </div>
          <div className="right">
            <a href="javascript:void(0)">立即开通</a>
          </div>
        </div>
      </div>
    );
  }
});

//首页:Index component
let Home = React.createClass({
  mixins: [mixin],
  getInitialState() {
    document.title = "饭米粒理财";
    let beforeComponent = this.props.location.query.beforeComponent;
    let hadShowRedbag = sessionStorage.getItem("hadShowRedbag");
    let isRedbagModalOpen = false;
    let isInAppWebView = this._isInWebViewOfNTApp();
    if (beforeComponent === "registerSuccessHint") {
      if (hadShowRedbag !== "yes") {
        isRedbagModalOpen = true;
        sessionStorage.setItem("hadShowRedbag", "yes");
      }
    }
    return {
      data: HomeStore.getAll(),
      isRedbagModalOpen: isRedbagModalOpen,
      isNotificationVisible: !isInAppWebView
    };
  },
  _isInWebViewOfNTApp() {
    //检测当前web app的所处的环境是否是饭米粒理财的安卓或者ios客户端的webview。
    let deviceType = cookie.getCookie("deviceType");
    let isInAppWebview =
      ["ntandroid", "ntios"].indexOf(deviceType.toLowerCase()) > -1;
    return isInAppWebview;
  },
  _closeNotification() {
    this.setState({
      isNotificationVisible: false
    });
  },
  _jumpToAboutUs() {
    this.context.router.push({
      pathname: "aboutUs "
    });
  },
  _jumpToInviteMyFriend() {
    this.context.router.push({
      pathname: "inviteMyFriend"
    });
  },
  _handleBannerClick(iframeSource) {
    //基于内嵌ih5的页面时，页面会被放大。而不内嵌时，页面显示正常的情况下考虑,
    //如果后台返回的链接地址跟饭米粒理财是同一个域名之下，则跳转到应用的内部组件中，
    //否则，就跳出当前的SPA，跳转至给链接地址
    if (!!iframeSource) {
      if (iframeSource.indexOf("ntjrchina") > -1) {
        if (iframeSource.indexOf("weixin") > -1) {
          //新版微信
          let index = iframeSource.indexOf("#");
          let componentOfBanner = iframeSource.slice(index + 2);
          this.context.router.push({
            pathname: componentOfBanner
          });
        } else {
          //老版微信页面
          this.context.router.push({
            pathname: "BannerPageWrapper",
            query: {
              iframeSource: iframeSource
            }
          });
        }
      } else {
        window.location.href = iframeSource;
      }
    }
  },
  _handleImgLoadFailedOfBanner(event) {
    event.target.src = require("../../img/banner_placeholder_failed.png");
  },
  _handleImgLoadFailedOfSlick(event) {
    event.target.src = require("../../img/hot_pic_fail@2x.png");
  },
  _handleNewbieGuideBtnClick() {
    let isLogin = cookie.getCookie("token");
    if (isLogin) {
      this.context.router.push({
        pathname: "newbieGuide"
      });
    } else {
      this.context.router.push({
        pathname: "/"
      });
    }
  },
  _jumpToPABankRegister(leftQureyTime, cgOpenCode) {
    // if (["0", "2", "4"].indexOf(cgOpenCode) > -1) {
    //   //未通平安存管子账户
    //   if (leftQureyTime === 0) {
    //     this.context.router.push({
    //       pathname: "registerToPABankFailedHint",
    //       query: {
    //         beforeComponent: "home"
    //       }
    //     });
    //   } else {
    //     this.context.router.push({
    //       pathname: "registerToPABank",
    //       query: {
    //         beforeComponent: "home"
    //       }
    //     });
    //   }
    // } else {
    //   RegisterToPABankInterceptModal.show();
    // }
    UpgradeToPABankInterceptModal.show();
  },
  _jumpToCouponList() {
    this.context.router.push({
      pathname: "couponList",
      query: {
        productType: "all"
      }
    });
  },
  _jumpToPlatformData(businessData) {
    this.context.router.push({
      pathname: "platformData",
      query: businessData
    });
  },
  _jumpToSecurityIntroduction() {
    this.context.router.push({
      pathname: "securityIntroduction"
    });
  },
  _jumpToUserStoryList() {
    this.context.router.push({
      pathname: "userStoryList"
    });
  },
  _jumpToInformationDisclosure() {
    this.context.router.push({
      pathname: "informationDisclosure"
    });
  },
  render() {
    let {
      bannerList,
      productList,
      hotTopicList,
      registerUserCount,
      totalAmountOfInvestment,
      zxcgOpenInfo
    } = this.state.data;

    let isPACGOpen =
      zxcgOpenInfo && zxcgOpenInfo.cgstatus === "0" ? false : true;
    let leftQureyTime = zxcgOpenInfo.leftQureyTime;
    let isLogin = !!cookie.getCookie("token");
    let isNotificationVisible = this.state.isNotificationVisible;
    let businessData = this.state.data.businessData;
    let isNeedToShowNewbieProduct = false;
    let newbieProductData = {};
    if (productList && productList.length) {
      productList.forEach(item => {
        if (item.type === "new_product") {
          newbieProductData = item;
          isNeedToShowNewbieProduct = true;
          return;
        }
      });
    }

    return (
      <Container scrollable={true} id="home">
        {isLogin && !isPACGOpen ? (
          <RegisterPABankNoticeBar
            onAction={this._jumpToPABankRegister.bind(
              null,
              leftQureyTime,
              zxcgOpenInfo.cgOpen
            )}
          />
        ) : null}

        {isNotificationVisible ? (
          <div id="homeNotification">
            <div className="downloadAppGuide">
              <div className="logo-wrapper">
                <div className="downloadAppGuide-logo" />
                <a
                  href="http://a.app.qq.com/o/simple.jsp?pkgname=com.ntjr.std"
                  className="download-btn"
                >
                  立即下载
                </a>
                <Icon name="close" onClick={this._closeNotification} />
              </div>

              <div className="downloadAppGuide-slogan">
                <span>随时投资</span>
                <span>查收益</span>
              </div>
            </div>
          </div>
        ) : null}

        <Slider>
          {bannerList.map(
            function(item, index) {
              return (
                <Slider.Item key={index + 1}>
                  <a
                    href="javascript:void(0);"
                    onClick={this._handleBannerClick.bind(null, item.link)}
                  >
                    <img
                      src={item.pic}
                      onError={this._handleImgLoadFailedOfBanner}
                    />
                  </a>
                </Slider.Item>
              );
            }.bind(this)
          )}
        </Slider>

        <Group
          header=""
          style={{ margin: 0 }}
          className="platform-introduction-bar"
        >
          <div className="platform-introduction-wrapper">
            <div onClick={this._jumpToInformationDisclosure}>
              <div className="img-wrapper-cell data-cell" />
              <div className="title ">信息披露</div>
            </div>
            <div onClick={this._jumpToSecurityIntroduction}>
              <div className="img-wrapper-cell safe-cell" />
              <div className="title ">安全保障</div>
            </div>
            <div>
              <div
                className="img-wrapper-cell newbieGuide-cell"
                onClick={this._handleNewbieGuideBtnClick}
              />
              <div className="title ">新手指引</div>
            </div>
            <div onClick={this._jumpToInviteMyFriend}>
              <div className="img-wrapper-cell gift-cell" />
              <div className="title ">邀请有礼</div>
            </div>
          </div>
        </Group>

        {isNeedToShowNewbieProduct ? (
          <HomeNewbieProductCard {...newbieProductData} />
        ) : null}

        <Group className="home-product-list">
          <div className="home-group-header">
            <Icon classPrefix="imgIcon" name="product-recommend" />
            <span>为您推荐</span>
          </div>
          {productList.map(
            function(item, index) {
              return <HomeCommonCard {...item} key={item.id} />;
            }.bind(this)
          )}
        </Group>

        <Group className="hot-topic-bar">
          <div className="home-group-header">
            <Icon classPrefix="imgIcon" name="product-hot" />
            <span className="title">热点资讯</span>
            <span
              className="hot-topic-more"
              onClick={this._jumpToUserStoryList}
            >
              查看更多
            </span>
          </div>
          <Slick isAutoPlay={false}>
            {hotTopicList.map((item, index) => {
              return (
                <SlickItem
                  selfIndex={index + 1}
                  onClick={this._handleBannerClick.bind(null, item.link)}
                >
                  <img
                    src={item.pic}
                    onError={this._handleImgLoadFailedOfSlick}
                    alt=""
                  />
                </SlickItem>
              );
            })}
          </Slick>
        </Group>

        <div className="home-dashboard">
          <div className="title text-center">
            已累计为{registerUserCount}位用户撮合交易金额（元）
          </div>
          <div className="amount text-center">{totalAmountOfInvestment}</div>
          <div className="home-slogan-wrapper">
            <Slogan />
          </div>
        </div>

        <SpecialModal role="customize" isOpen={this.state.isRedbagModalOpen}>
          <div className="redbag-wrapper" onClick={this._jumpToCouponList} />
        </SpecialModal>
      </Container>
    );
  },
  componentDidMount() {
    HomeAction.getDataFromServer();

    HomeStore.bind(
      "change",
      function() {
        this.setState(HomeStore.getAll());
      }.bind(this)
    );
  }
});

Home.contextTypes = {
  router: React.PropTypes.object.isRequired
};

module.exports = Home;

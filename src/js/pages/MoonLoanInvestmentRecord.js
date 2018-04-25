require("../../scss/page/MoonLoanInvestmentRecord.scss");
import React from "react";
let MoonLoanInvestmentRecordAction = require("../actions/MoonLoanInvestmentRecordAction.js");
let MoonLoanInvestmentRecordStore = require("../stores/MoonLoanInvestmentRecordStore.js");

import View from "../UIComponents/View";
import Container from "../UIComponents/Container";
import Group from "../UIComponents/Group";
import Grid from "../UIComponents/Grid";
import Col from "../UIComponents/Col";
import Tabs from "../UIComponents/Tabs";
import Loader from "../UIComponents/Loader";
import Icon from "../UIComponents/Icon";
import NavBar from "../UIComponents/NavBar";

import InvestmentRecordCard from "./utilities/InvestmentRecordCard";
import NoDataHint from "./utilities/NoDataHint";
import SlideMask from "../UIComponents/SlideMask";
import cookie from "../lib/cookie";
import UpgradeToPABankInterceptModal from "./utilities/UpgradeToPABankInterceptModal";

let MoonLoanInvestmentRecord = React.createClass({
  getInitialState() {
    return {
      data: MoonLoanInvestmentRecordStore.getAll(),
      pagingIsStart: false,
      isMaskOpen: false,
      maskInnerText: ""
    };
  },
  _loadMoreData(event) {
    let moreProductList = document.getElementById("moonLoanInvestmentRecord");
    let offsetHeight = moreProductList.offsetHeight; //元素出现在视口中区域的高度
    let scrollTop = moreProductList.scrollTop; //元素已经滚动的距离
    let scrollHeight = moreProductList.scrollHeight; //元素总的内容高度

    let tabsBody = document.getElementsByClassName("tabs-body")[0];
    let activeTabPanel = tabsBody.getElementsByClassName("active")[0];
    let currListType = activeTabPanel.getAttribute("data-type");

    if (scrollHeight - offsetHeight - scrollTop <= 3) {
      Loader.show();
      if (!this.state.pagingIsStart) {
        MoonLoanInvestmentRecordAction.getNextPage(currListType);
      }
    }
  },
  _handleCardClick(items) {
    //整个卡片的点击事件处理函数
    let {
      id,
      productType,
      moonLoanStatus,
      investAmount,
      interestMonth
    } = items;
    if (moonLoanStatus !== "joining") {
      //点击处于加入中的卡片，不做任何跳转
      this.context.router.push({
        pathname: "repaymentSchedule",
        query: {
          loanId: id,
          productType: productType,
          status: "moonLoan_" + moonLoanStatus, //加前缀，以便对其他产品的状态（债转，好采投）等做区分
          investAmount: investAmount,
          interestMonth: interestMonth
        }
      });
    }
  },
  _handleApplyBtnClick(moonLoanStatus, canApplyToQuit, time, id, title) {
    //"修改预约"或者"预约退出"按钮的点击事件处理函数
    let hintText =
      "当前为平台受理预约处理期，无法" +
      (moonLoanStatus === "holding" ? "预约退出本金" : "修改预约") +
      "，请" +
      time +
      "日之后再试。";
    if (canApplyToQuit) {
      UpgradeToPABankInterceptModal.show(() => {
        this.context.router.push({
          pathname: "applyToQuiteFromMoonLoan",
          query: {
            actionType:
              moonLoanStatus === "holding" ? "firstApply" : "modifyApply",
            productId: id,
            title: title,
            selectedDate: moonLoanStatus === "holding" ? "" : time
          }
        });
      });
    } else {
      this.setState({
        isMaskOpen: true,
        maskInnerText: hintText
      });
    }
  },
  _isInWebViewOfNTApp() {
    //检测当前web app的所处的环境是否是农泰金融的安卓或者ios客户端的webview。
    let deviceType = cookie.getCookie("deviceType");
    let isInAppWebview =
      ["ntandroid", "ntios"].indexOf(deviceType.toLowerCase()) > -1;
    return isInAppWebview;
  },
  makePageHeaderFixed() {
    let container = document.getElementById("moonLoanInvestmentRecord");
    let dashboard = document.getElementById("moonRecordDashboard");
    let tabs = container.getElementsByClassName("tabs")[0];
    let tabsNav = tabs.getElementsByClassName("tabs-nav")[0];
    let dashboardHeight = dashboard.scrollHeight;
    let tabsNavHeight = tabsNav.scrollHeight;
    let navBarHeight = this._isInWebViewOfNTApp() ? 0 : 44;

    container.style.paddingTop = dashboardHeight + "px";
    dashboard.style.width = "100%";
    dashboard.style.position = "absolute";
    dashboard.style.left = 0;
    dashboard.style.top = navBarHeight + "px";
    dashboard.style.zIndex = 999;
    tabs.style.paddingTop = tabsNavHeight + "px";
    tabsNav.style.position = "absolute";
    tabsNav.style.left = 0;
    tabsNav.style.top = dashboardHeight + navBarHeight + "px";
    tabsNav.style.zIndex = 999;
  },
  _handleNavDone() {
    this.context.router.push({
      pathname: "userHome"
    });
  },
  render() {
    let {
      joinAmount, //投资中/加入中的金额
      applyQuitAmount, //预约退出中的金额
      ysAmount, //已赚的利息
      joiningList, //加入中列表
      holdingList, //汇款中列表
      quittingList, //退出中列表
      quitedList //已退出列表
    } = this.state.data;

    let leftNav = {
      component: "a",
      title: "返回",
      icon: "left-nav"
    };

    let defaultActiveKey = this.props.location.query.defaultActiveKey
      ? parseInt(this.props.location.query.defaultActiveKey)
      : 1;

    return (
      <View>
        <NavBar
          title="月满盈"
          leftNav={[leftNav]}
          amStyle="primary"
          onAction={this._handleNavDone}
        />
        <Container
          id="moonLoanInvestmentRecord"
          scrollable={true}
          onScroll={this._loadMoreData}
        >
          <Group className="dashboard" noPadded={true} id="moonRecordDashboard">
            <div className="body">
              <div className="title">投资金额(元) </div>
              <div className="amount">
                <strong>{joinAmount}</strong>
              </div>
            </div>
            <Grid className="footer" collapse={true}>
              <Col cols={3}>
                <span className="title">预约退出中：</span>
                <span className="amount">{applyQuitAmount}</span>
              </Col>
              <Col cols={3} className="text-right">
                <span className="title">累计收益：</span>
                <span className="amount">{ysAmount}</span>
              </Col>
            </Grid>
          </Group>
          <Tabs defaultActiveKey={defaultActiveKey}>
            <Tabs.Item
              title="加入中"
              key={0}
              navStyle={null}
              data-type="joining"
            >
              {joiningList.length ? (
                joiningList.map((item, index) => {
                  return (
                    <InvestmentRecordCard
                      {...item}
                      key={index + 1}
                      clickHandler={this._handleCardClick}
                    />
                  );
                })
              ) : (
                <NoDataHint>
                  <img
                    src={require("../../img/pay_icon_redenvelope_no.png")}
                    alt=""
                  />
                </NoDataHint>
              )}
            </Tabs.Item>
            <Tabs.Item
              title="回款中"
              key={1}
              navStyle={null}
              data-type="holding"
            >
              {holdingList.length ? (
                holdingList.map((item, index) => {
                  return (
                    <InvestmentRecordCard
                      {...item}
                      key={item.id}
                      clickHandler={this._handleCardClick}
                      applyBtnHandler={this._handleApplyBtnClick}
                    />
                  );
                })
              ) : (
                <NoDataHint>
                  <img
                    src={require("../../img/pay_icon_redenvelope_no.png")}
                    alt=""
                  />
                </NoDataHint>
              )}
            </Tabs.Item>
            <Tabs.Item
              title="退出中"
              key={2}
              navStyle={null}
              data-type="quitting"
            >
              {quittingList.length ? (
                quittingList.map((item, index) => {
                  return (
                    <InvestmentRecordCard
                      {...item}
                      key={item.id}
                      clickHandler={this._handleCardClick}
                      applyBtnHandler={this._handleApplyBtnClick}
                    />
                  );
                })
              ) : (
                <NoDataHint>
                  <img
                    src={require("../../img/pay_icon_redenvelope_no.png")}
                    alt=""
                  />
                </NoDataHint>
              )}
            </Tabs.Item>
            <Tabs.Item
              title="已退出"
              key={3}
              navStyle={null}
              data-type="quited"
            >
              {quitedList.length ? (
                quitedList.map((item, index) => {
                  return (
                    <InvestmentRecordCard
                      {...item}
                      key={item.id}
                      clickHandler={this._handleCardClick}
                    />
                  );
                })
              ) : (
                <NoDataHint>
                  <img
                    src={require("../../img/pay_icon_redenvelope_no.png")}
                    alt=""
                  />
                </NoDataHint>
              )}
            </Tabs.Item>
          </Tabs>
          <Loader amStyle="primary" rounded={true} />
          <SlideMask isMaskOpen={this.state.isMaskOpen}>
            <div className="canNotApplyHint-mask">
              <div className="body">
                <div className="title text-center">温馨提示</div>
                <div className="content">
                  <p>{this.state.maskInnerText}</p>
                </div>
              </div>
              <div className="footer">
                <Icon classPrefix="imgIcon" name="closeBtnInWrapper" />
              </div>
            </div>
          </SlideMask>
        </Container>
      </View>
    );
  },
  componentDidMount() {
    //如果是安卓系统的话，就固定页面的头部，以便取得良好的用户体验
    let ua = navigator.userAgent;
    if (
      /android/i.test(ua) ||
      ua.indexOf("Android") > -1 ||
      ua.indexOf("Adr") > -1
    ) {
      this.makePageHeaderFixed();
    }

    MoonLoanInvestmentRecordAction.getInitialData();

    MoonLoanInvestmentRecordStore.bind(
      "change",
      function() {
        this.setState({
          data: MoonLoanInvestmentRecordStore.getAll(),
          isMaskOpen: false
        });
      }.bind(this)
    );

    MoonLoanInvestmentRecordStore.bind(
      "pagingIsStart",
      function() {
        this.setState({
          pagingIsStart: true
        });
      }.bind(this)
    );

    MoonLoanInvestmentRecordStore.bind(
      "pagingIsEnd",
      function() {
        this.setState({
          pagingIsStart: false
        });
      }.bind(this)
    );
  },
  componentDidUpdate() {
    Loader.hide();
  },
  componentWillUnmount() {
    MoonLoanInvestmentRecordStore.unbind("change");
    MoonLoanInvestmentRecordStore.clearAll();
  }
});

MoonLoanInvestmentRecord.contextTypes = {
  router: React.PropTypes.object.isRequired
};

module.exports = MoonLoanInvestmentRecord;

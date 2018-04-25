require("../../scss/page/GljLoanIntroduction.scss");
let GljLoanIntroductionAction = require("../actions/GljLoanIntroductionAction.js");
let GljLoanIntroductionStore = require("../stores/GljLoanIntroductionStore.js");

import React from "react";
import classNames from "classnames";
import { Link } from "react-router";
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
import Chart from "chart.js";

//utilities component
import Summary from "./utilities/Summary.js";
import RuleDescription from "./utilities/RuleDescription.js";
import InvestmentRecord from "./utilities/InvestmentRecord.js";
import PurchaseButton from "./utilities/PurchaseButton.js";
import RepaymentDescription from "./utilities/RepaymentDescription";
import FundGuaranteeDescription from "./utilities/FundGuaranteeDescription";
import ServiceAgreement from "./utilities/ServiceAgreement";
import ProductDescription from "./utilities/ProductDescription";
import ProductIntroduction from "./utilities/ProductIntroduction";
import RiskAnnounce from "./utilities/RiskAnnounce";
import AuthInfoList from "./utilities/AuthInfoList";

import config from "../config";
import cookie from "../lib/cookie";
import getParamObjFromUrl from "../lib/getParamObjFromUrl";

let initialOffsetTop = 0;

let RadarChart = React.createClass({
  _drawRiskLevelChart(dataArr) {
    //使用canvas画评级雷达图
    let ctx = document.getElementById("riskLevelChart");
    let data = {
      labels: [
        "资产状况",
        "担保情况",
        "资金保障",
        "还款保障",
        "信用历史",
        "认证信息"
      ],
      datasets: [
        {
          backgroundColor: "rgba(250,234,234,0.8)",
          borderColor: "rgba(250,234,234,0.8)",
          lineTension: 0,
          borderWidth: 1,
          pointRadius: 0,
          data: dataArr
        }
      ]
    };

    let RiskLevelChart = new Chart(ctx, {
      type: "radar",
      data: data,
      options: {
        startAngle: 30,
        legend: {
          display: false
        },
        scale: {
          ticks: {
            suggestedMin: 60,
            suggestedMax: 100,
            maxTicksLimit: 6
          }
        }
      }
    });
  },
  render() {
    return (
      <div
        className="riskLevel-chart"
        style={{ width: "250px", height: "250px", margin: "0 auto" }}
      >
        <canvas id="riskLevelChart" width="150" height="150" />
      </div>
    );
  },
  componentDidMount() {
    this._drawRiskLevelChart(this.props.data);
  }
});

//资产状况
let PropertyCondition = function(props) {
  let {
    saleMoney,
    plantArea,
    car,
    house,
    regFound,
    licenseType,
    plantingDuration
  } = props;
  let carTextMap = {
    empty: "",
    no: "",
    ycwd: "有车无贷",
    ycyd: "有车有贷"
  };
  let houseTextMap = {
    empty: "",
    no: "",
    yfwd: "有房无贷",
    yfyd: "有房有贷"
  };
  let isOldData = !saleMoney && !plantArea;
  let saleMoneyOrPlantAreaText = saleMoney
    ? "销售额：" + saleMoney + "万"
    : "种植面积：" + plantArea + "亩";

  return (
    <Group noPadded={false}>
      <h6>
        <span className="title-flag" />资产状况
      </h6>
      <div className="content">
        {isOldData ? (
          <div>经实地考察，借款人资产良好，具备还款能力。</div>
        ) : licenseType === "person" ? (
          <Grid wrap="wrap" collapse={true}>
            <Col cols={3}>{saleMoneyOrPlantAreaText}</Col>
            {house !== "empty" ? (
              <Col cols={3}>房产：{houseTextMap[house]}</Col>
            ) : null}
            {car !== "empty" ? (
              <Col cols={3}>车产：{carTextMap[car]}</Col>
            ) : null}
          </Grid>
        ) : (
          <Grid wrap="wrap" collapse={true}>
            <Col cols={3}>注册资金：{regFound}万</Col>
            <Col cols={3}>{saleMoneyOrPlantAreaText}</Col>
            <Col cols={3}>经营年限：{plantingDuration}年</Col>
          </Grid>
        )}
      </div>
    </Group>
  );
};

let GljLoanIntroduction = React.createClass({
  getInitialState() {
    return {
      data: GljLoanIntroductionStore.getAll(),
      isMaskOpen: false,
      maskType: "descriptionOfCreditor"
    };
  },
  _handleOnScroll(event) {
    let container = document.getElementById("gljLoanIntroduction");
    let offsetHeight = container.offsetHeight;
    let scrollHeight = container.scrollHeight;
    let scrollTop = container.scrollTop;
    if (scrollTop > scrollHeight - offsetHeight - 3) {
      this.refs.detailModal.open();
    }
  },
  _handleModalClose() {
    this.refs.detailModal.close();
  },
  _handleModalOpen() {
    this.refs.detailModal.open();
  },
  _openSlideMark(maskType) {
    this.setState({
      isMaskOpen: true,
      maskType: maskType
    });
  },
  _closeSlideMark() {
    this.setState({
      isMaskOpen: false
    });
  },
  _handleNavClick(e) {
    let { productId, type, inviteCode } = getParamObjFromUrl();
    let currUrl = window.location.href;
    let hasShareMark =
      currUrl.indexOf("shareFromApp") > -1 ||
      currUrl.indexOf("shareFromWeixin") > -1;
    let isLogin = !!cookie.getCookie("token");

    if (e.title === "分享") {
      if (isLogin) {
        let phoneNo = cookie.getCookie("phoneNo");
        window.history.replaceState(
          null,
          "",
          "#/gljLoanIntroduction?&productId=" +
            productId +
            "&type=" +
            type +
            "&inviteCode=" +
            phoneNo +
            "&shareFromWeixin=true"
        ); //在“?”后面加上了“&”，解决了wechat对分享链接插入参数而导致链接无法访问的问题
      } else {
        window.history.replaceState(
          null,
          "",
          "#/gljLoanIntroduction?&productId=" +
            productId +
            "&type=" +
            type +
            "&shareFromWeixin=true"
        ); //在“?”后面加上了“&”，解决了wechat对分享链接插入参数而导致链接无法访问的问题
      }
      this._openSlideMark("shareHint");
    } else if (e.title === "返回") {
      if (hasShareMark) {
        this.context.router.push({
          pathname: "home"
        });
      } else {
        this.context.router.goBack();
      }
    }
  },
  _renderMaskInner(maskType) {
    if (maskType === "descriptionOfCreditor") {
      return (
        <div className="description-mask">
          <div className="body">
            <div className="title text-center">债权转让</div>
            <div className="content">
              <p>1、持有满30天即可转让。</p>
              <p>
                2、距离每月还息日少于3天，最后一期距离到期日少于7天，不能转让。
              </p>
            </div>
          </div>
          <div className="footer">
            <Icon classPrefix="imgIcon" name="closeBtnInWrapper" />
          </div>
        </div>
      );
    } else if (maskType === "descriptionOfRepayEarly") {
      return (
        <div className="description-mask">
          <div className="body">
            <div className="title text-center">温馨提示</div>
            <div className="content">
              <p>1、该标的可能会提前还款</p>
              <p>2、提前还款会根据提前还款期数发放补偿金</p>
            </div>
          </div>
          <div className="footer">
            <Icon classPrefix="imgIcon" name="closeBtnInWrapper" />
          </div>
        </div>
      );
    } else if (maskType === "descriptionOfRiskLevel") {
      return (
        <div className="description-mask riskLevel-mask">
          <div className="body">
            <div className="title text-center">温馨提示</div>
            <div className="content">
              <p>
                1、每一个项目的风险评级会从认证信息、资产状况、信用历史、担保情况、还款保障以及资金保障六个要素来综合评定，每一个要素满分100分，风险评级总分600分。
              </p>
              <p>
                2、风险评级等级的确定：<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A级，总分540分以上，安全等级高；<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;B级，总分480分以上，安全等级中；<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;C级，总分480分以下，安全等级低。<br />
              </p>
              <p>
                3、每一项风险评分都是经过饭米粒理财风控评审委员会根据实际情况严谨评定。
              </p>
            </div>
          </div>
          <div className="footer">
            <Icon classPrefix="imgIcon" name="closeBtnInWrapper" />
          </div>
        </div>
      );
    } else if (maskType === "shareHint") {
      return (
        <img
          src={require("../../img/share-guide.png")}
          alt=""
          className="share-guide-img"
        />
      );
    } else {
      return null;
    }
  },
  render() {
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
      useDesc,
      riskLevel,
      riskLevelScore,
      applyNum,
      unpaidNum,
      paidNum,
      overdueMoney,
      productName
    } = this.state.data;

    let productionType = this.props.location.query.type;
    let modalTitle = config.productNameMap[productionType];

    let backNav = {
      component: "a",
      icon: "left-nav",
      title: "返回"
    };

    let rightNav = {
      component: "a",
      title: "分享"
    };

    return (
      <View>
        <NavBar
          title={productName}
          leftNav={[backNav]}
          rightNav={[rightNav]}
          amStyle="primary"
          onAction={this._handleNavClick}
        />
        <Container
          scrollable={false}
          style={{ overflow: "scroll" }}
          id="gljLoanIntroduction"
          onScroll={this._handleOnScroll}
        >
          <Summary
            {...this.state.data}
            onQuestionMarkClick={this._openSlideMark}
          />
          <Group noPadded={true} id="productIntroduction">
            <ProductIntroduction
              {...this.state.data}
              onQuestionMarkClick={this._openSlideMark}
            />
          </Group>
          <div
            className="checkLoanDetail"
            id="checkMoreDetail"
            onClick={this._handleModalOpen}
          >
            <span className="imgIcon imgIcon-slide-up" />滑动或者点击查看详情
          </div>
          <PurchaseButton {...this.state.data} {...this.props} />
          <Modal
            title={modalTitle + "详情"}
            ref="detailModal"
            isOpen={false}
            role="popup"
            onDismiss={this._handleModalClose}
          >
            <Tabs defaultActiveKey={0}>
              <Tabs.Item title="项目信息" key={0} navStyle={null}>
                <Group noPadded={false}>
                  <h6>
                    <span className="title-flag" />项目特点
                  </h6>
                  <div className="icon-titles">
                    <div className="title1" />
                    <div className="title2" />
                    <div className="title3" />
                    <div className="title4" />
                  </div>
                  <div className="content">
                    “果乐金”为饭米粒理财平台合作机构推荐的苹果产业链项目，每一个项目都经过合作机构专业的尽职调查和风控筛选，饭米粒理财平台风控人员再次严格审查，并且每一个项目均提供足额的果品质押和合作机构及实际控制人连带责任担保，资金全程由平安银行监管，多重保障投资人资金安全。
                  </div>
                </Group>
                <Group noPadded={false}>
                  <h6>
                    <span className="title-flag" />借款人信息
                  </h6>
                  <div className="content">
                    {licenseType === "person" ? (
                      <Grid collapse={true} wrap="wrap">
                        <Col cols={3}>姓名：{realName}</Col>
                        <Col cols={3}>性别：{genderDescr}</Col>
                        <Col cols={3}>年龄：{age}</Col>
                        <Col cols={3}>婚姻状况：{marriedDescr}</Col>
                      </Grid>
                    ) : null}
                    {licenseType === "enterprise" ? (
                      <Grid collapse={true} wrap="wrap">
                        <Col cols={6}>公司名称：{companyName}</Col>
                        <Col cols={6}>企业法人：{corporation}</Col>
                      </Grid>
                    ) : null}
                  </div>
                </Group>
                <Group noPadded={false}>
                  <h6>
                    <span className="title-flag" />借款描述
                  </h6>
                  <div className="content">
                    {!!loanDescr ? loanDescr : "暂无项目介绍"}
                  </div>
                </Group>
                <Group noPadded={false}>
                  <h6>
                    <span className="title-flag" />借款用途
                  </h6>
                  <div className="content">{useDesc}</div>
                </Group>
                <Group noPadded={false}>
                  <h6>
                    <span className="title-flag" />还款来源
                  </h6>
                  <div className="content">{repaymentSource}</div>
                </Group>
                <ServiceAgreement {...this.state.data} />
              </Tabs.Item>
              <Tabs.Item title="风险控制" key={1} navStyle={null}>
                <Group noPadded={false}>
                  <h6 style={{ marginTop: "-0.626rem", marginBottom: 0 }}>
                    <span className="title-flag" />
                    风险评级：{riskLevel}级
                    <Icon
                      classPrefix="imgIcon"
                      name="blue-questionMark"
                      onClick={this._openSlideMark.bind(
                        null,
                        "descriptionOfRiskLevel"
                      )}
                    />
                  </h6>
                  <RadarChart data={riskLevelScore} />
                </Group>
                <AuthInfoList {...this.state.data} />
                <PropertyCondition {...this.state.data} />
                <Group noPadded={false}>
                  <h6>
                    <span className="title-flag" />信用历史
                  </h6>
                  <div className="content">
                    <Grid wrap="wrap" collapse={true}>
                      {/*<Col cols={3}>申请借款：{applyNum}笔</Col>*/}
                      <Col cols={3}>成功借款：{unpaidNum}笔</Col>
                      {/*<Col cols={3}>还清笔数：{paidNum}笔</Col>*/}
                      <Col cols={3}>逾期金额：{overdueMoney}万</Col>
                    </Grid>
                  </div>
                </Group>
                <Group noPadded={false}>
                  <h6>
                    <span className="title-flag" />担保情况
                  </h6>
                  <ul className="guaranteeLabelList">
                    {!!guaranteeLabelList &&
                      guaranteeLabelList.map(function(item, index) {
                        let labelText = item.label;
                        labelText =
                          labelText.indexOf("担保情况") > -1
                            ? "担保企业"
                            : labelText;
                        return (
                          <li key={index + 1}>
                            <div className="content">{labelText}</div>
                            <div className="content">{item.value}</div>
                          </li>
                        );
                      })}
                  </ul>
                </Group>
                <RepaymentDescription />
                <FundGuaranteeDescription />
                <RiskAnnounce />
              </Tabs.Item>
              <Tabs.Item title="投资记录" key={2} navStyle={null}>
                <InvestmentRecord {...this.state.data} />
              </Tabs.Item>
            </Tabs>
          </Modal>
          <SlideMask isMaskOpen={this.state.isMaskOpen}>
            {this._renderMaskInner(this.state.maskType)}
          </SlideMask>
        </Container>
      </View>
    );
  },
  componentDidMount() {
    let id = this.props.location.query.productId;
    GljLoanIntroductionAction.getDataFromServer(id);

    GljLoanIntroductionStore.bind(
      "change",
      function() {
        this.setState(GljLoanIntroductionStore.getAll());
      }.bind(this)
    );

    //支持滑动查看标的详情的交互方式
    let checkMoreDetail = document.getElementById("checkMoreDetail");
    let productIntroduction = document.getElementById("productIntroduction");
    let container = document.getElementById("gljLoanIntroduction");
    if (container.scrollHeight <= container.offsetHeight) {
      let paddingBottom =
        container.scrollHeight +
        44 -
        (productIntroduction.offsetTop +
          productIntroduction.offsetHeight +
          checkMoreDetail.offsetHeight +
          15);
      checkMoreDetail.style.paddingBottom = paddingBottom + 30 + "px"; //通过填充30px，撑开容器的垂直高度，使之出现滚动条
    }
  }
});

GljLoanIntroduction.contextTypes = {
  router: React.PropTypes.object.isRequired
};

module.exports = GljLoanIntroduction;

require("../../scss/page/DailyEarnCenter.scss");
let UserHomeAction = require("../actions/UserHomeAction.js");
let UserHomeStore = require("../stores/UserHomeStore.js");
let DailyEarnCenterAction = require("../actions/DailyEarnCenterAction.js");
let DailyEarnCenterStore = require("../stores/DailyEarnCenterStore.js");
import React from "react";
import { Link } from "react-router";

import Container from "../UIComponents/Container";
import Button from "../UIComponents/Button";
import Group from "../UIComponents/Group";
import Grid from "../UIComponents/Grid";
import Col from "../UIComponents/Col";
import List from "../UIComponents/List";
import Message from "../UIComponents/Message";
import NavBar from "../UIComponents/NavBar";
import Modal from "../UIComponents/modal/Modal";
import RegisterToPABankInterceptModal from "./utilities/RegisterToPABankInterceptModal";
import UpgradeToPABankInterceptModal from "./utilities/UpgradeToPABankInterceptModal";

//用户中心页面：DailyEarnCenter component
let DailyEarnCenter = React.createClass({
  getInitialState() {
    return {
      data: DailyEarnCenterStore.getAll(),
      isModalOpen: false,
      confirmText: ""
    };
  },
  _jumpToDailyEarnIntroduction(productId) {
    UpgradeToPABankInterceptModal.show(() => {
      this.context.router.push({
        pathname: "earnSetIntroduction",
        query: {
          productId: productId,
          type: "ttz_product"
        }
      });
    });
  },
  _jumpToDailyEarnRollOut() {
    //UserHomeAction.rollOutDailyEarnCheck();
    UpgradeToPABankInterceptModal.show(() => {
      this.context.router.push({
        pathname: "dailyEarnRollOut"
      });
    });
  },
  _handleExtractBtnClick() {
    UpgradeToPABankInterceptModal.show(() => {
      DailyEarnCenterAction.extractDailyEarnIncome();
    });
  },
  _handleLeftNavClick() {
    this.context.router.push({
      pathname: "userHome"
    });
  },
  _jumpToNextLocation(confirm) {
    if (confirm) {
      this.context.router.push({
        pathname: "securityCenter"
      });
    } else {
      this._handleModalClose();
    }
  },
  _handleModalClose() {
    this.setState({
      isModalOpen: false
    });
  },
  showRegisterToPABankInterceptModal() {
    RegisterToPABankInterceptModal.show();
  },
  render() {
    let {
      ttzProductId,
      cyTotal,
      makeTotal,
      zrLixi,
      ljLixi,
      ktqMoney
    } = this.state.data;
    let leftNav = {
      component: "a",
      icon: "left-nav",
      title: "返回"
    };
    return (
      <Container scrollable={false} id="dailyEarnCenter">
        <NavBar
          title="灵活投资"
          leftNav={[leftNav]}
          amStyle="primary"
          onAction={this._handleLeftNavClick}
        />

        <Group noPadded={true} className="dailyEarn-dashboard">
          <div className="dailyEarn-holding-amount">
            <span className="subtitle">持有中(元)</span>
            <span className="amount">{cyTotal}</span>
          </div>
          {
            //2016年11月30日，天天赚预约功能下线，因此注释了这些代码
            /* <div className="dailyEarn-appointment-amount">
                        <span className="subtitle">预约中(元)</span>
                        <span className="amount">{makeTotal}</span>
                        </div>*/
          }
          <div className="dailyEarn-dashboard-footer">
            <Grid>
              <Col cols={3}>
                <span className="subtitle">昨日收益(元)</span>
                <span className="amount">{zrLixi}</span>
              </Col>
              <Col cols={3}>
                <span className="subtitle">累计收益(元)</span>
                <span className="amount">{ljLixi}</span>
              </Col>
            </Grid>
          </div>
        </Group>

        <List>
          <List.Item
            href={null}
            title={
              <span>
                <span className="subtitle">可提取收益(元)：</span>
                <strong className="dailyEarn-extract-amount">{ktqMoney}</strong>
              </span>
            }
            after={
              <Button
                amStyle="primary"
                hollow
                radius
                className="dailyEarn-extract-btn"
                onClick={this._handleExtractBtnClick}
              >
                提取
              </Button>
            }
          />
        </List>

        <List>
          <List.Item href={"#/dailyEarnInvestmentRecord"} title="交易明细" />
        </List>

        <div className="btns-wrapper">
          <Grid collapse={true}>
            <Col cols={3}>
              <Button
                amStyle="white"
                block
                onClick={this._jumpToDailyEarnRollOut}
              >
                转出
              </Button>
            </Col>
            <Col cols={3}>
              <Button
                amStyle="white"
                block
                onClick={this._jumpToDailyEarnIntroduction.bind(
                  null,
                  ttzProductId
                )}
              >
                购买
              </Button>
            </Col>
          </Grid>
        </div>
        <Modal
          title="提示"
          ref="modal"
          isOpen={this.state.isModalOpen}
          role="confirm"
          onAction={this._jumpToNextLocation}
        >
          {this.state.confirmText}
        </Modal>
      </Container>
    );
  },
  componentDidMount() {
    DailyEarnCenterAction.getDailyEarnCenterInfo();
    UserHomeAction.getUserInfoDetail();

    DailyEarnCenterStore.bind(
      "change",
      function() {
        this.setState(DailyEarnCenterStore.getAll());
      }.bind(this)
    );

    DailyEarnCenterStore.bind("extractDailyEarnIncomeSuccess", function() {
      Message.broadcast("提取收益成功！");
    });

    DailyEarnCenterStore.bind("extractDailyEarnIncomeFailed", function(msg) {
      Message.broadcast(msg);
    });

    UserHomeStore.bind(
      "ZXBankOpenCheckFailed",
      this.showRegisterToPABankInterceptModal
    );

    UserHomeStore.bind(
      "dealPasswordSetCheckFailed",
      function() {
        this.setState({
          isModalOpen: true,
          confirmText: "为了您的资金安全，请先设置交易密码"
        });
      }.bind(this)
    );

    UserHomeStore.bind("dailyEarnIncomeExtractCheckSuccess", function() {
      //直接把action放在异步回调中，dispatcher无法dispatche到这个action
      //@see https://github.com/goatslacker/alt/issues/71
      setTimeout(function() {
        DailyEarnCenterAction.extractDailyEarnIncome();
      }, 0);
    });

    UserHomeStore.bind(
      "dailyEarnRollOutCheckSuccess",
      function() {
        this.context.router.push({
          pathname: "dailyEarnRollOut"
        });
      }.bind(this)
    );
  },
  componentWillUnmount() {
    UserHomeStore.unbind(
      "ZXBankOpenCheckFailed",
      this.showRegisterToPABankInterceptModal
    );
  }
});

DailyEarnCenter.contextTypes = {
  router: React.PropTypes.object.isRequired
};

module.exports = DailyEarnCenter;

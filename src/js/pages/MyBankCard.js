require("../../scss/page/MyBankCard.scss");
let MyBankCardAction = require("../actions/MyBankCardAction");
let MyBankCardStore = require("../stores/MyBankCardStore");
import React from "react";
import className from "classnames";

import Container from "../UIComponents/Container";
import Group from "../UIComponents/Group";
import Icon from "../UIComponents/Icon";
import Button from "../UIComponents/Button";
import Modal from "../UIComponents/modal/Modal";
import NavBar from "../UIComponents/NavBar";
import Message from "../UIComponents/Message";
import RegisterToPABankInterceptModal from "./utilities/RegisterToPABankInterceptModal";
import UpgradeToPABankInterceptModal from "./utilities/UpgradeToPABankInterceptModal";

let NoBankCard = React.createClass({
  _jumpToRegisterToPABank() {
    this.context.router.push({
      pathname: "registerToPABank",
      query: {
        beforeComponent: "securityCenter"
      }
    });
  },
  _jumpToRegisterToPAFailedHint() {
    this.context.router.push({
      pathname: "registerToPABankFailedHint",
      query: {
        beforeComponent: "securityCenter"
      }
    });
  },
  _jumpToBindBankCard() {
    let realName = MyBankCardStore.getAll().realName;
    this.context.router.push({
      pathname: "bindBankCard",
      query: {
        beforeComponent: "myBanKCard",
        realName: realName,
        entryComponent: "userHome"
      }
    });
  },
  _handleNoCardClick(leftQureyTime, pacgOpenCode, isSetDealPassword) {
    if (["0", "2", "4"].indexOf(pacgOpenCode) > -1) {
      if (leftQureyTime > 0) {
        this._jumpToRegisterToPABank();
      } else {
        this._jumpToRegisterToPAFailedHint();
      }
    } else if (pacgOpenCode === "1") {
      if (isSetDealPassword === "no") {
        //没有设置交易密码
        this.context.router.push({
          pathname: "setDealPassword",
          query: {
            actionType: "setting",
            beforeComponent: "myBankCard",
            entryComponent: "userHome"
          }
        });
      }
    } else {
      RegisterToPABankInterceptModal.show();
    }
  },
  _handleNoCardClick_upgrade(isBindCardAlready) {
    if (!isBindCardAlready) {
      //这里是是为了拦截“用户没开通平安子账户”和“用户没设置交易密码”这两种情况
      UpgradeToPABankInterceptModal.show();
    } else {
      this.context.router.push({
        pathname: "upgradeToPABank",
        query: {
          action: "bindBankCard"
        }
      });
    }
  },
  render() {
    let {
      leftQureyTime,
      pacgOpenCode,
      idCardVerified,
      isSetDealPassword,
      isBindCardAlready
    } = this.props;
    return (
      <div className="noBankCard-wrapper">
        <Icon classPrefix="imgIcon" name="money-bag" />
        <span className="subtitle">开通银行存管子账户，完成银行卡绑定</span>
        <div
          className="addBankCard-btn"
          onClick={this._handleNoCardClick_upgrade.bind(
            null,
            isBindCardAlready
          )}
        >
          <Icon classPrefix="imgIcon" name="plus-icon" />
          <span className="title">开通存管子账户</span>
        </div>
      </div>
    );
  }
});

NoBankCard.contextTypes = {
  router: React.PropTypes.object.isRequired
};

let HasBankCard = React.createClass({
  _renderCardNo(cardNo) {
    let cardNo_start = cardNo.slice(0, 4);
    let cardNo_end = cardNo.slice(-4);
    return (
      <div className="body">
        <Icon classPrefix="imgIcon" name="my-bankCard" />
        <span style={{ fontWeight: "bold" }}>{cardNo_start}</span>
        <span>****</span>
        <span>****</span>
        <span style={{ fontWeight: "bold" }}>{cardNo_end}</span>
      </div>
    );
  },
  _jumpToBankCardDetail(status) {
    if (status === "on") {
      this.context.router.push({
        pathname: "myBankCardDetail"
      });
    } else {
      return false;
    }
  },
  _handleUnbindBankCard(){
    UpgradeToPABankInterceptModal.show(() => {
      MyBankCardAction.unbindBankCard();
    })
  },
  render() {
    let { bankName, status, fullCardNo, shortIcon } = this.props;
    let classes = className({
      "hasBankCard-wrapper": true,
      disabled: status === "pending" ? true : false
    });

    return (
      <div>
        { status === "pending" ? (
          <div className="deleteCard-hint">删卡审核中...</div>
        ) : null}
        <div className={classes}>{this._renderCardNo(fullCardNo)}</div>
        <div className="btn-wrapper">
          <Button
            block
            radius
            amStyle="primary"
            onClick={this._handleUnbindBankCard}
          >
            解绑银行卡
          </Button>
        </div>
      </div>
    );
  }
});

HasBankCard.contextTypes = {
  router: React.PropTypes.object.isRequired
};

let MyBankCard = React.createClass({
  getInitialState() {
    return {
      bankCardInfo: MyBankCardStore.getAll(),
      isModalOpen: false
    };
  },
  _jumpToNextLocation(confirm) {
    if (confirm) {
      this.context.router.push({
        pathname: "realNameAuthentication"
      });
    } else {
      this._handleCloseModal();
    }
  },
  _handleCloseModal() {
    this.setState({
      isModalOpen: false
    });
  },
  _handleNavClick(obj) {
    this.context.router.push({
      pathname: "userHome"
    });
  },
  render() {
    let leftNav = {
      component: "a",
      icon: "left-nav",
      title: "返回"
    };
    let hasBankCard= this.state.bankCardInfo !== null && !!this.state.bankCardInfo.id;
    return (
      <Container id="myBankCard">
        <NavBar
          title="我的银行卡"
          leftNav={[leftNav]}
          amStyle="primary"
          onAction={this._handleNavClick}
        />
        { hasBankCard ? (
          <HasBankCard {...this.state.bankCardInfo} />
        ) : (
          <NoBankCard {...this.state.bankCardInfo} />
        )}

        <Modal
          title="提示"
          ref="modal"
          isOpen={this.state.isModalOpen}
          role="confirm"
          onAction={this._jumpToNextLocation}
        >
          为了保障您的资金安全，请先去实名认证！
        </Modal>
      </Container>
    );
  },
  componentDidMount() {
    MyBankCardAction.getMyBankCardDetail();
    MyBankCardAction.getUserAccountInfo();

    MyBankCardStore.bind(
      "change",
      function() {
        this.setState({
          bankCardInfo: MyBankCardStore.getAll()
        });
      }.bind(this)
    );

    MyBankCardStore.bind(
      "BindCardCheckSuccess",
      function() {
        this.context.router.push({
          pathname: "bindBankCard",
          query: {
            realName: MyBankCardStore.getAll().realName
          }
        });
      }.bind(this)
    );

    MyBankCardStore.bind(
      "BindCardCheckFailed",
      function() {
        this.setState({
          isModalOpen: true
        });
      }.bind(this)
    );

    MyBankCardStore.bind(
      "unbindBankCardSuccess",
      function(nextLocation) {
        window.location.href=nextLocation;
    });

    MyBankCardStore.bind(
      "unbindBankCardFailed",
      function(msg) {
        Message.broadcast(msg);
      });
  },
  componentWillUnmount() {
    MyBankCardStore.clearAll();
  }
});

MyBankCard.contextTypes = {
  router: React.PropTypes.object.isRequired
};

module.exports = MyBankCard;

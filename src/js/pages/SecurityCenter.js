require("../../scss/page/SecurityCenter.scss");
let SecurityCenterAction = require("../actions/SecurityCenterAction");
let SecurityCenterStore = require("../stores/SecurityCenterStore");
import React from "react";
import { Link } from "react-router";

import Container from "../UIComponents/Container";
import Group from "../UIComponents/Group";
import Icon from "../UIComponents/Icon";
import List from "../UIComponents/List";
import Modal from "../UIComponents/modal/Modal";
import UpgradeToPABankInterceptModal from "./utilities/UpgradeToPABankInterceptModal";
import Message from "../UIComponents/Message";

//安全分数变换动画
let ScoreAnimation = React.createClass({
  getInitialState() {
    return {
      score: this.props.score
    };
  },
  _scoreCount(score) {
    clearInterval(this.timer);
    let intervalTime = 3000 / score;
    this.timer = setInterval(
      function() {
        if (this.state.score < score) {
          this.setState({
            score: this.state.score + 1
          });
        } else {
          clearInterval(this.timer);
        }
      }.bind(this),
      intervalTime
    );
  },
  render() {
    return <span className="title">{this.state.score}</span>;
  },
  componentWillReceiveProps(nextProps) {
    if (nextProps.score !== 0) {
      this._scoreCount(nextProps.score);
    }
  },
  componentWillUnmount() {
    clearInterval(this.timer);
  }
});

//设置中心页面：SecurityCenter component
let SecurityCenter = React.createClass({
  getInitialState() {
    return {
      securityInfo: SecurityCenterStore.getAll(),
      score: SecurityCenterStore.calculateSecurityScore(),
      isModalOpen: false
    };
  },
  _handleModalClose() {
    this.setState({
      isModalOpen: false
    });
  },
  _handleModalOpen() {
    this.setState({
      isModalOpen: true
    });
  },
  renderMedia(option) {
    return option === "yes" ? (
      <Icon classPrefix="imgIcon" name="right-check" />
    ) : (
      <Icon classPrefix="imgIcon" name="attention" />
    );
  },
  _jumpBack() {
    this.context.router.push({
      pathname: "userHome"
    });
  },
  _renderSecurityText(score) {
    let securityText = "";
    if (score <= 50) {
      securityText = "危险";
    } else if (score <= 75) {
      securityText = "良好";
    } else {
      securityText = "安全";
    }
    return securityText;
  },
  _renderWarmHintText(score) {
    let warmHintText = "";
    if (score <= 50) {
      warmHintText = "您的账户信息不完整，仍有安全风险，请立即完善！";
    } else if (score <= 75) {
      warmHintText = "还剩一步，即可拥有完整的安全保障体系！";
    } else {
      warmHintText = "您的账户已经被完美保障，请继续保持！";
    }
    return warmHintText;
  },
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
  _handleZxRegisterBarClick(leftQureyTime, pacgOpenCode) {
    if (leftQureyTime > 0) {
      if (["0", "2", "4"].indexOf(pacgOpenCode) > -1) {
        this._jumpToRegisterToPABank();
      } else {
        RegisterToPABankInterceptModal.show();
      }
    } else {
      this._jumpToRegisterToPAFailedHint();
    }
  },
  _handleMobileBarClick() {
    SecurityCenterAction.checkIDCard();
  },
  _jumpToNextLocation() {
    this.context.router.push({
      pathname: "realNameAuthentication",
      query: {
        entryComponent: "securityCenter"
      }
    });
  },
  _jumpToMofifyMobilePhone() {
    this.context.router.push({
      pathname: "modifyMobilePhone",
      query: {
        oldPhoneNo: this.state.securityInfo.mobile
      }
    });
  },
  _handleDealPasswordBarClick() {
    let { pacgOpenCode, isDealPwdSet } = this.state.securityInfo;
    if (pacgOpenCode === "0") {
      UpgradeToPABankInterceptModal.show();
    } else if (isDealPwdSet === "no") {
      this.context.router.push({
        pathname: "upgradeToPABank",
        query: {
          action: "passwordSetting"
        }
      });
    } else {
      this.context.router.push({
        pathname: "ModifyOrResetDealPWForPABank"
      });
    }
  },
  _handleBankCardBarClick() {
    let { isBankCardBind } = this.state.securityInfo;
    if (isBankCardBind === "yes") return;
    UpgradeToPABankInterceptModal.show();
  },
  _handlePermissionBarClick() {
    let { pacgOpenCode } = this.state.securityInfo;
    if (pacgOpenCode === "4") return;
    UpgradeToPABankInterceptModal.show();
  },
  _handlePamobileBarClick(){
    let { pamobile, pacgOpenCode } = this.state.securityInfo;
    if(!pamobile) return ;

    if (pacgOpenCode === '1'){//'1'表示未设置交易密码，按照产品需求，需要拦截
      UpgradeToPABankInterceptModal.show();
    }else {
      this.context.router.push({
        pathname: "setNewMobilePhoneNo",
        query:{
          phoneNo:pamobile
        }
      });
    }
  },
  _formatPhoneNo(phoneNo){
    return phoneNo.slice(0,3) + '****' + phoneNo.slice(-4);
  },
  render() {
    let {
      mobileVerified,
      ispasswordSet,
      isDealPwdSet,
      isBankCardBind,
      isAuthorized,
      idCardVerified,
      zxcgOpen, //是否已开通中信存管
      mobile,
      istempuser, //是否是手动干预让它成为已经开通中信存管的
      leftQureyTime,
      hadBindBankCard,
      realName,
      pacgOpenCode,//开通平安存管的状态码，oneOf["0","1","2","3","4"]
      pamobile
    } = this.state.securityInfo;

    let score = this.state.score;
    let dashboardWrapperClasses = score
      ? "dashboard-wrapper " + "score" + score
      : "dashboard-wrapper";
    let hadOpenPACG = pacgOpenCode === "4" ? true : false;

    return (
      <Container scrollable={true} id="securityCenter">
        <div className={dashboardWrapperClasses}>
          <div className="nav-bar">
            <div className="nav-bar-left" onClick={this._jumpBack}>
              <Icon name="left-nav" />
              <span>返回</span>
            </div>
            安全中心
          </div>
          <div className="dashboard">
            <ScoreAnimation score={score} />
            <span className="subtitle">{this._renderSecurityText(score)}</span>
            <div className="rotate-needle" id="rotateNeedle">
              <span className="needle-header" />
            </div>
          </div>

          <div className="warm-hint text-center">
            {this._renderWarmHintText(score)}
          </div>
        </div>
        <Group>
          <div className="header">
            <div className="icon-wrapper">
              <Icon classPrefix="imgIcon" name="security-pacgInfo" />
              银行存管子账户
            </div>
            <div className="flag">{hadOpenPACG ? "已开通" : "未开通"}</div>
          </div>
          <List>
            <List.Item
              href="javascript:void(0)"
              title="交易密码"
              media={this.renderMedia(isDealPwdSet)}
              after={isDealPwdSet === "yes" ? "已设置" : "未设置"}
              onClick={this._handleDealPasswordBarClick}
            />
            <List.Item
              href="javascript:void(0)"
              title="银行卡绑卡"
              media={this.renderMedia(isBankCardBind)}
              after={isBankCardBind === "yes" ? "已设置" : "未设置"}
              onClick={this._handleBankCardBarClick}
            />
            <List.Item
              href="javascript:void(0)"
              title="账户授权"
              media={this.renderMedia(isAuthorized)}
              after={isAuthorized === "yes" ? "已授权" : "未授权"}
              onClick={this._handlePermissionBarClick}
            />
          </List>
        </Group>

        <Group>
          <div className="header">
            <div className="icon-wrapper">
              <Icon classPrefix="imgIcon" name="security-basicInfo" />
              基本设置
            </div>
            <div className="flag">已设置</div>
          </div>
          <List>
            <List.Item
              href={"#/setNewPassword/?actionType=modify"}
              title="登录密码"
              media={this.renderMedia(ispasswordSet)}
              after="修改"
            />
            <List.Item
              href="javascript:void(0)"
              title="绑定手机"
              media={this.renderMedia(!!pamobile ? 'yes' : 'no')}
              after={!!pamobile ? this._formatPhoneNo(pamobile) : '未设置'}
              onClick={this._handlePamobileBarClick}
            />
          </List>
        </Group>

        <Modal
          ref="modal"
          isOpen={this.state.isModalOpen}
          role="alert"
          onDismiss={this._handleModalClose}
          onClosed={this._jumpToNextLocation}
        >
          您还没有进行实名认证！
        </Modal>
      </Container>
    );
  },
  componentDidMount() {
    SecurityCenterAction.getSecurityInfoFromServer();

    SecurityCenterStore.bind(
      "change",
      function() {
        this.setState({
          securityInfo: SecurityCenterStore.getAll(),
          score: SecurityCenterStore.calculateSecurityScore()
        });
      }.bind(this)
    );

    SecurityCenterStore.bind(
      "checkIdCardVerifiedFailed",
      function() {
        this._handleModalOpen();
      }.bind(this)
    );

    SecurityCenterStore.bind(
      "checkIdCardVerifiedSuccess",
      function() {
        this._jumpToMofifyMobilePhone();
      }.bind(this)
    );
  },
  componentWillUnmount() {
    SecurityCenterStore.unbind("change");
    SecurityCenterStore.clearAll();
  }
});

SecurityCenter.contextTypes = {
  router: React.PropTypes.object.isRequired
};

module.exports = SecurityCenter;

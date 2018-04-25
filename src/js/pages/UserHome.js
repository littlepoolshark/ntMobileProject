require("../../scss/page/UserHome.scss");
let UserHomeAction = require("../actions/UserHomeAction.js");
let UserHomeStore = require("../stores/UserHomeStore.js");
import React from "react";
import { Link } from "react-router";

import Container from "../UIComponents/Container";
import Button from "../UIComponents/Button";
import Group from "../UIComponents/Group";
import Grid from "../UIComponents/Grid";
import Col from "../UIComponents/Col";
import Icon from "../UIComponents/Icon";
import List from "../UIComponents/List";
import Modal from "../UIComponents/modal/Modal";
import RegisterToPABankInterceptModal from "./utilities/RegisterToPABankInterceptModal";
import UpgradeToPABankInterceptModal from "./utilities/UpgradeToPABankInterceptModal";

//用户中心页面：UserHome component
let UserHome = React.createClass({
  getInitialState() {
    return {
      data: UserHomeStore.getAll(),
      ishowData: true
      // isModalOpen:false,
      // modalRole:"alert",
      // confirmText:"",
      // nextLocation:""
    };
  },
  _toggleShowData(event) {
    event.stopPropagation();
    this.setState({
      ishowData: !this.state.ishowData
    });
  },
  // _jumpToNextLocation(confirm){
  //     if(confirm){
  //         let locationData={
  //             pathname:this.state.nextLocation,
  //             query:{}
  //         }
  //         if(this.state.nextLocation === "bindBankCard"){
  //             locationData.query.realName=UserHomeStore.getAll().personInfo.realName;
  //         }
  //         this.context.router.push(locationData);
  //     }else {
  //         this._handleModalClose();
  //     }

  // },
  _jumpToTotalAccount() {
    this.context.router.push({
      pathname: "totalAccountDetail"
    });
  },
  // _handleModalClose(){
  //     this.setState({
  //         isModalOpen:false
  //     });
  // },
  _handleRecharge() {
    //UserHomeAction.recharge();
    UpgradeToPABankInterceptModal.show(() => {
      this.context.router.push({
        pathname: "recharge"
      });
    });
  },
  _handleWithdraw() {
    //UserHomeAction.withdraw();
    UpgradeToPABankInterceptModal.show(() => {
      this.context.router.push({
        pathname: "withdraw"
      });
    });
  },
  _jumpToAppSetting() {
    this.context.router.push({
      pathname: "appSetting"
    });
  },
  showRegisterToPABankInterceptModal() {
    RegisterToPABankInterceptModal.show();
  },
  _jumpToSpecifiedLocation(path) {
    this.context.router.push({
      pathname: path
    });
  },
  _jumpToVIPProfile(mobile, isVIPUser) {
    this.context.router.push({
      pathname: "vIPProfile",
      query: {
        mobile,
        isVIPUser
      }
    });
  },
  render() {
    let {
      total,
      totalProfit,
      available,
      hqAmount,
      dqAmount,
      hcCount,
      tikectCount,
      moonAmount,
      isVIPUser,
      iShowShareCouponEntry
    } = this.state.data;

    let {
      zxcgOpen,
      leftQureyTime,
      istempuser,
      mobile
    } = this.state.data.personInfo;

    let ishowData = this.state.ishowData;
    let pacgOpenCode=this.state.data.zxcgOpenInfo.cgstatus;
    let actuallyRegisterPA=pacgOpenCode !== '0';


    return (
      <Container scrollable={true} id="userHome">
        <Group className="dashboard" noPadded={true}>
          <div className="dashboard-header cf">
            <div
              className="left fl"
              onClick={this._jumpToVIPProfile.bind(null, mobile, isVIPUser)}
            >
              <Icon classPrefix="imgIcon" name="my-avator" />
              <span className="phone-number">{mobile}</span>
              {isVIPUser ? (
                <Icon classPrefix="imgIcon" name="vip-mark" />
              ) : null}
            </div>
            <div className="right fr">
              <Icon
                classPrefix="imgIcon"
                name={ishowData ? "my-eyes-on" : "my-eyes-off"}
                onClick={this._toggleShowData}
              />
              <Icon
                classPrefix="imgIcon"
                name="my-letter"
                onClick={this._jumpToSpecifiedLocation.bind(
                  null,
                  "messageList"
                )}
              />
            </div>
          </div>
          <div className="dashboard-body">
            <div className="dashboard-body-card">
              <div className="header">
                <div
                  className="total-property"
                  onClick={this._jumpToTotalAccount}
                >
                  <div className="title">
                    总资产(元) <Icon name="right-nav" />
                  </div>
                  <div className="amount">
                    <strong>{ishowData ? total : "****"}</strong>
                  </div>
                </div>
                 <div className="openZX-flag" onClick={this._jumpToSecurityCenter}>
                     <Icon classPrefix="imgIcon" name="my-openZX-on" />
                     <span className="title">{actuallyRegisterPA ? "已开通平安银行存管" : "未开通平安银行存管 去开通"}</span>
                 </div> 
              </div>
              <div className="footer">
                <div className="left">
                  <div className="title">累计收益(元)</div>
                  <div className="amount">
                    {ishowData ? totalProfit : "****"}
                  </div>
                </div>
                <div className="right">
                  <div className="title">可用余额(元)</div>
                  <div className="amount">{ishowData ? available : "****"}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="dashboard-footer">
            <Grid>
              <Col cols={3} onClick={this._handleRecharge}>
                <Icon classPrefix="imgIcon" name="my-recharge" />
                <span>充值 </span>
              </Col>
              <Col cols={3} onClick={this._handleWithdraw}>
                <Icon classPrefix="imgIcon" name="my-withdraw" />
                <span>提现</span>
              </Col>
            </Grid>
          </div>
        </Group>

        <List>
          <List.Item
            href="#/moonLoanInvestmentRecord"
            title="月满盈"
            after={<span>{ishowData ? moonAmount : "****"}</span>}
            media={<Icon classPrefix="imgIcon" name="my-moon" />}
          />
          <List.Item
            href="#/dailyEarnCenter"
            title="灵活投资"
            after={<span>{ishowData ? hqAmount : "****"}</span>}
            media={<Icon classPrefix="imgIcon" name="my-lhlc" />}
          />
          <List.Item
            href="#/allProductEMInvestmentRecord"
            title="定期投资"
            after={<span>{ishowData ? dqAmount : "****"}</span>}
            media={<Icon classPrefix="imgIcon" name="my-fixedLoan" />}
          />
          {/*<List.Item
                        href="#/autoPurchaseIndex"
                        title="自动投标"
                        media={<Icon classPrefix="imgIcon" name="my-autoPurchase-flag"/>}
                    />*/}
          <List.Item
            href="#/repaymentCalendar"
            title="回款日历"
            after={
              <span>
                本月<strong>{hcCount}</strong>笔
              </span>
            }
            media={<Icon classPrefix="imgIcon" name="my-repayment" />}
          />
        </List>

        <List>
          <List.Item
            href="#/couponList/?productType=all"
            title="优惠券"
            after={
              <span>
                <strong>{tikectCount}</strong>张可用
              </span>
            }
            media={<Icon classPrefix="imgIcon" name="my-coupon" />}
          />
          <List.Item
            href={
              "#/inviteReward?iShowShareCouponEntry=" +
              (iShowShareCouponEntry ? "true" : "false")
            }
            title="邀请有礼"
            after={
              iShowShareCouponEntry ? (
                <Icon classPrefix="imgIcon" name="share-coupon" />
              ) : null
            }
            media={<Icon classPrefix="imgIcon" name="my-inviteReward" />}
          />
          <List.Item
            href="javascript:void(0)"
            title="VIP成长值"
            media={<Icon classPrefix="imgIcon" name="my-vip-mark" />}
            onClick={this._jumpToVIPProfile.bind(null, mobile, isVIPUser)}
          />
        </List>

        <List>
          <List.Item
            href="javascript:void(0)"
            onClick={this._jumpToAppSetting}
            title="设置"
            media={<Icon classPrefix="imgIcon" name="my-setting" />}
          />
        </List>

        {/* <Modal
                    title=""
                    ref="modal"
                    isOpen={this.state.isModalOpen}
                    role={this.state.modalRole}
                    onAction={this._jumpToNextLocation}
                >
                    {this.state.confirmText}
                </Modal> */}
      </Container>
    );
  },
  componentDidMount() {
    if (sessionStorage.getItem("noMoreReminderFlag") !== "true") {
      UpgradeToPABankInterceptModal.checkPACGCompleteness();
    }

    UserHomeAction.getInitailDataFromServer(); //获取页面显示所需要的数据
    UserHomeAction.getUserInfoDetail(); //获取用户更加详细的数据，包括个人信息，账户信息，安全信息等。
    UserHomeAction.getBankCardInfo(); //获取用户所绑定的银行卡的信息

    UserHomeStore.bind(
      "change",
      function() {
        this.setState(UserHomeStore.getAll());
      }.bind(this)
    );

    //银行卡已经绑定则跳转到充值页面/提现页面，否则调转到绑卡页面
    UserHomeStore.bind(
      "rechargeCheckSuccess",
      function() {
        this.context.router.push({
          pathname: "recharge"
        });
      }.bind(this)
    );

    UserHomeStore.bind(
      "withdrawCheckSuccess",
      function() {
        this.context.router.push({
          pathname: "withdraw"
        });
      }.bind(this)
    );

    UserHomeStore.bind(
      "ZXBankOpenCheckFailed",
      this.showRegisterToPABankInterceptModal
    );

    UserHomeStore.bind(
      "idCardVerifiedCheckFailed",
      function() {
        this.context.router.push({
          pathname: "realNameAuthentication",
          query: {
            beforeComponent: "userHome",
            entryComponent: "userHome"
          }
        });
      }.bind(this)
    );

    UserHomeStore.bind(
      "dealPasswordSetCheckFailed",
      function() {
        this.context.router.push({
          pathname: "setDealPassword",
          query: {
            actionType: "setting",
            beforeComponent: "userHome",
            entryComponent: "userHome"
          }
        });
      }.bind(this)
    );

    UserHomeStore.bind(
      "bindBankCardCheckFailed",
      function() {
        let realName = UserHomeStore.getAll().personInfo.realName;
        this.context.router.push({
          pathname: "bindBankCard",
          query: {
            beforeComponent: "userHome",
            realName: realName,
            entryComponent: "userHome"
          }
        });
      }.bind(this)
    );
  },
  componentWillUnmount() {
    UserHomeStore.unbind("change");
    UserHomeStore.unbind(
      "ZXBankOpenCheckFailed",
      this.showRegisterToPABankInterceptModal
    );
  }
});

UserHome.contextTypes = {
  router: React.PropTypes.object.isRequired
};

module.exports = UserHome;

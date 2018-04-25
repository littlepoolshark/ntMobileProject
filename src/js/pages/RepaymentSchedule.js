require("../../scss/page/RepaymentSchedule.scss");
let RepaymentScheduleAction = require("../actions/RepaymentScheduleAction.js");
let RepaymentScheduleStore = require("../stores/RepaymentScheduleStore.js");
let UserHomeAction = require("../actions/UserHomeAction.js");
let UserHomeStore = require("../stores/UserHomeStore.js");
import React from "react";
import { Link } from "react-router";
import classNames from "classnames";
import cookie from "../lib/cookie";

//ui component
import View from "../UIComponents/View";
import Container from "../UIComponents/Container";
import NavBar from "../UIComponents/NavBar";
import Group from "../UIComponents/Group";
import Button from "../UIComponents/Button";
import NoDataHint from "./utilities/NoDataHint";
import Icon from "../UIComponents/Icon";
import Modal from "../UIComponents/modal/Modal";
import List from "../UIComponents/List";
import Message from "../UIComponents/Message";
import RegisterToPABankInterceptModal from "./utilities/RegisterToPABankInterceptModal";
import UpgradeToPABankInterceptModal from "./utilities/UpgradeToPABankInterceptModal";

//好采投和债权转让汇款进度详情：RepaymentSchedule component
let RepaymentSchedule = React.createClass({
  getInitialState() {
    return {
      data: RepaymentScheduleStore.getAll(),
      isModalOpen: false,
      isActionModalOpen:false,
      modalRole:"confirm",
      confirmText: ""
    };
  },
  _handleAssignmentBtnClick() {
    //UserHomeAction.transferDebtCheck();
    UpgradeToPABankInterceptModal.show(() => {
      let { creditorId } = this.props.location.query;
      let investMoney = this.state.data.loanInfo.investMoney;
      this.context.router.push({
        pathname: "assignmentOfDebt",
        query: {
          creditorId: creditorId,
          investMoney: investMoney
        }
      });
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
  _handleNavClick(event) {
    let { loanId, creditorId, productType, currProductType } = this.props.location.query;
    let { isOldProduct, isCreditorProduct }=this.state.data.loanInfo;
    let location=window.location;
    let userId=cookie.getCookie('userId');
    //let host="http://192.168.1.244:8080"

    if (event.title === "返回") {//用户点击‘返回’按钮
      this.context.router.push({
        pathname: "allProductEMInvestmentRecord",
        query: {
          productType,
          currProductType
        }
      });
    } else {  //用户点击‘查看合同’按钮
        if(isOldProduct){  
          if(isCreditorProduct){
             location.href=`/user/view_loan_agreement.do?id=${creditorId}`; 
          }else {
            location.href=`/user/view_loan_agreement.do?loanId=${loanId}&user_id=${userId}`;
          }
        }else {
            this.openActionModal();
        }
    }
  },
  showRegisterToPABankInterceptModal() {
    RegisterToPABankInterceptModal.show();
  },
  openActionModal(){
    this.setState({
      isActionModalOpen:true
    })
  },
  closeActionModal(){
    this.setState({
      isActionModalOpen:false
    })
  },
  jumpToNextLocation(url){
    if(url){
      window.location.href=url;            
    }else {
      Message.broadcast('合同生成中......');
    }
  },
  render() {
    let {
      title,
      repaymentMonth,
      apr,
      rewardRate,
      interestRate,
      VIPRate,
      investMoney,
      yjbx,
      dsbx,
      qsNum,
      isAllowToTransfer,
      agreementList
    } = this.state.data.loanInfo;

    let {
      productType,
      status,
      investAmount,
      interestMonth //加息券的加息期限
    } = this.props.location.query;
    interestMonth = interestMonth && parseInt(interestMonth);

    let tagClasses = classNames({
      tag: true,
      holding: ["holding", "hold"].indexOf(status) > -1, //汇款中的标志
      applying: ["orderring", "apply"].indexOf(status) > -1, //加入中的标志
      clearing: ["paid", "success"].indexOf(status) > -1, //已结清的标志
      transfered: status === "transfered", //已转让的标志
      "moon-holding": status === "moonLoan_holding",
      "moon-quitting": status === "moonLoan_quitting",
      "moon-quited": status === "moonLoan_quited"
    });
  
    let navLeft = {
      component: "a",
      icon: "left-nav",
      title: "返回"
    };
    let navRight = {
      component: "a",
      title: "查看合同"
    };


    return (
      <View>
        <NavBar
          title="投资回款详情"
          rightNav={[navRight]}
          leftNav={[navLeft]}
          amStyle="primary"
          onAction={this._handleNavClick}
        />
        <Container id="repaymentSchedule" scrollable={true}>
          <Group className="loan-title-group">
            <div className="header">
              <span className="title">{title}</span>
              {productType === "creditor_product" ? (
                <Icon classPrefix="imgIcon" name="transfer" />
              ) : null}
              {["holding", "hold"].indexOf(status) > -1 ? (
                <Button
                  amStyle="primary"
                  radius
                  disabled={!isAllowToTransfer}
                  onClick={
                    isAllowToTransfer ? this._handleAssignmentBtnClick : null
                  }
                >
                  转让
                </Button>
              ) : null}
            </div>
            <div className={tagClasses} />
          </Group>
          <Group className="loan-detail-group">
            <div className="header">
              <span className="title">项目信息</span>
            </div>
            <div className="body">
              <div className="row">
                <span className="subtitle label">
                  {productType === "moon" ? "当前年化" : "历史年化"}
                </span>
                <span className="number">
                  {(apr * 100).toFixed(1) + "%"}
                  {rewardRate ? (
                    <strong>
                      {"+奖励" + (rewardRate * 100).toFixed(1) + "%"}
                    </strong>
                  ) : (
                    ""
                  )}
                  {VIPRate ? (
                    <strong>{"+VIP" + (VIPRate * 100).toFixed(1) + "%"}</strong>
                  ) : (
                    ""
                  )}
                  {interestRate ? (
                    <strong>
                      {"+" +
                        (interestRate * 100).toFixed(1) +
                        (interestMonth !== 0
                          ? "%(" + interestMonth + "个月)"
                          : "")}
                    </strong>
                  ) : (
                    ""
                  )}
                </span>
              </div>
              <div className="row">
                <span className="subtitle label">
                  {productType === "moon" ? "最长期限" : "项目期限"}
                </span>
                <span className="number">{repaymentMonth}个月</span>
              </div>
              <div className="row">
                <span className="subtitle label">投资金额</span>
                <span className="number">
                  ￥{investMoney ? investMoney.toFixed(2) : "0.00"}
                </span>
              </div>
              <div className="row">
                <span className="subtitle label">已结本息</span>
                <span className="number">
                  ￥{yjbx ? yjbx.toFixed(2) : "0.00"}
                </span>
              </div>
              <div className="row">
                <span className="subtitle label">待收本息</span>
                <span className="number">
                  ￥{dsbx ? dsbx.toFixed(2) : "0.00"}
                </span>
              </div>
            </div>
          </Group>
          <Group className="repayment-schedule-group">
            <div className="header">
              <span className="title">回款进度</span>
              <span className="title">{qsNum}期</span>
            </div>
            <div className="body">
              <ul>
                {this.state.data.list.map(function(item, index) {
                  return <RepaymentScheduleItem {...item} key={index + 1} />;
                })}
              </ul>
              {this.state.data.list.length <= 0 ? (
                <NoDataHint style={{ margin: "2rem 0" }} />
              ) : null}
            </div>
          </Group>
          <Modal
            title="提示"
            ref="modal"
            isOpen={this.state.isModalOpen}
            role={this.state.modalRole}
            onAction={this._jumpToNextLocation}
            onDismiss={this._handleModalClose}
          >
            {this.state.confirmText}
          </Modal>
          <Modal
          isOpen={this.state.isActionModalOpen}
          role="actions"
          onDismiss={this.closeActionModal}
          btnStyle="primary"
        >
          <List>
            {
              agreementList && agreementList.map(item => {
                return (
                  <List.Item
                  key={item.name}
                  onClick={this.jumpToNextLocation.bind(this,item.url)}
                >
                  {item.name}
                </List.Item>
                )
              })
            }
          </List>
        </Modal>
        </Container>
      </View>
    );
  },
  componentDidMount() {
    let { loanId, creditorId, productType } = this.props.location.query;

    RepaymentScheduleAction.getRepaymentScheduleData(
      loanId,
      creditorId,
      productType
    );
    RepaymentScheduleAction.getOpenPACGInfo();
    UserHomeAction.getUserInfoDetail();
    UserHomeAction.getBankCardInfo();

    RepaymentScheduleStore.bind(
      "change",
      function() {
        this.setState(RepaymentScheduleStore.getAll());
      }.bind(this)
    );

    RepaymentScheduleStore.bind(
      "ZXBankOpenCheckFailed",
      this.showRegisterToPABankInterceptModal
    );


    UserHomeStore.bind(
      "dealPasswordSetCheckFailed",
      function() {
        this.setState({
          isModalOpen: true,
          modalRole:"confirm",
          confirmText: "为了您的资金安全，请先设置交易密码"
        });
      }.bind(this)
    );

    RepaymentScheduleStore.bind(
      "transferDebtCheckSuccess",
      function() {
        let { creditorId } = this.props.location.query;
        let {
          investMoney,
          holdingDays,
          arrearsAmount,
          productType,
          repaymentType,
          repaymentPeriod
         } = this.state.data.loanInfo;

        
         let alertText="";
        if(repaymentType === "fddebx"){
          
          if(repaymentPeriod === "twin" && holdingDays < 60){
            alertText="当持有天数超过60天，才能进行债权转让";
          }else if(arrearsAmount < 100){
            alertText="剩余本金小于100元不能进行债权转让";
          }

          if(repaymentPeriod === "season" && holdingDays < 90){
            alertText="当持有天数超过90天，才能进行债权转让";
          }else if(arrearsAmount < 100){
            alertText="剩余本金小于100元不能进行债权转让";
          }

        }

        if(alertText){
          this.setState({
            isModalOpen: true,
            confirmText: alertText,
            modalRole:"alert"
          });
        }else {
          this.context.router.push({
            pathname: "assignmentOfDebt",
            query: {
              creditorId: creditorId,
              investMoney: investMoney
            }
          });
        }

      }.bind(this)
    );
  },
  componentWillUnmount() {
    RepaymentScheduleStore.unbind(
      "ZXBankOpenCheckFailed",
      this.showRegisterToPABankInterceptModal
    );
    RepaymentScheduleStore.clearAll();
  }
});

let RepaymentScheduleItem = React.createClass({
  render() {
    let {
      expectRepayTimeString,
      interest,
      periodNo,
      principal,
      realRepayTimeString,
      recoveryStatus,
      status
    } = this.props;
    return (
      <li>
        <div className="section-left">
          <span className="title">第{periodNo}期</span>
          <span className="subtitle">
            约定还款日<br />
            {expectRepayTimeString}
          </span>
        </div>
        <div className="section-middle">
          <span className="subtitle label">
            应收本金：<span className="number">
              ￥{principal ? principal.toFixed(2) : "0.00"}
            </span>
          </span>
          <span className="subtitle label">
            应还利息：<span className="number">
              ￥{interest ? interest.toFixed(2) : "0.00"}
            </span>
          </span>
          <span className="subtitle label">
            实还日期：<span className="number">
              {!!realRepayTimeString ? realRepayTimeString : "--"}
            </span>
          </span>
        </div>
        <div className="section-right">
          {status === "paid" ? (
            <img src={require("../../img/icon_seal_yishou.png")} alt="" />
          ) : (
            <img src={require("../../img/icon_seal_daishou.png")} alt="" />
          )}
        </div>
      </li>
    );
  }
});

RepaymentSchedule.contextTypes = {
  router: React.PropTypes.object.isRequired
};

module.exports = RepaymentSchedule;

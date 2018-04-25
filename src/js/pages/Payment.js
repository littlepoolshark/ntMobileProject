require("../../scss/page/EarnSetPayment.scss");
let PaymentAction = require("../actions/PaymentAction");
let PaymentStore = require("../stores/PaymentStore");
import React from "react";
import { Link } from "react-router";
import classNames from "classnames";
import LoanProductAgreement from './ServiceAgreement_loan_product';
import CreditorProductAgreement from './ServiceAgreement_creditor_product';

//ui component
import Group from "../UIComponents/Group";
import List from "../UIComponents/List";
import Button from "../UIComponents/Button";
import Field from "../UIComponents/Field";
import Container from "../UIComponents/Container";
import Message from "../UIComponents/Message";
import Modal from "../UIComponents/modal/Modal";
import Icon from "../UIComponents/Icon";
import CustomizeModal from '../UIComponents/modal/SpecialModal';

//utilities
import mixin from "./utilities/mixin";

const CAN_USE_COUPON = [
  "yyz_product",
  "jjz_product",
  "loan_product",
  "rich",
  "moon",
  "glj",
  "ced",
  "nyd"
];

/*
 * @desc 除了天天赚预约的情况之外，其他产品公用的支付页面。
 *
 * @author sam liu
 * @date 2016-07-05
 */
let Payment = React.createClass({
  getInitialState() {
    return {
      purchaseAmount: PaymentStore.getAll().purchaseAmount,
      couponAmount: PaymentStore.getAll().couponAmount,
      isModalOpen: false,
      modalInnerText: "",
      modalType: "rechargeModal",
      isPaymentModalOpen: false,
      isAgreementChecked:true,
      isRiskHintModalOpen:false,
      riskHintModalText:"",
      viewName:"payment"//视图字段，有主视图“payment”，二级视图“agreement_loanProduct”,二级视图“agreement_creditorProduct”
    };
  },
  /*
    * @desc 天天赚投资限额栏的渲染，只有当产品类型为“ttz_product”的时候才显示这一栏。
    *
    * @pram {string} //产品的类型
    * @return {reactElement} //react元素
    */
  _renderInvestmentLimit(type, investLimitAmount_ttz) {
    if (type === "ttz_product") {
      return (
        <div className="subtitle">
          <span>个人投资限额：</span>
          <strong>{investLimitAmount_ttz}</strong>元
        </div>
      );
    } else if (type === "new_product") {
      return (
        <div className="subtitle">
          <span>个人投资限额：</span>
          <strong>20000.00</strong>元
        </div>
      );
    } else {
      return null;
    }
  },
  /*
     * @desc 优惠券入口的渲染，只有该产品类型为可使用优惠券类型的时候才显示这一栏。
     *
     * @pram {string} //产品的类型
     * @return {reactElement} //react元素
     */
  _renderCouponBar(type, couponAmount, couponType, unUseCouponCount) {
    if (CAN_USE_COUPON.indexOf(type) > -1) {
      couponAmount =
        couponType === "interestRate"
          ? (couponAmount * 100).toFixed(1) + "%"
          : couponAmount;
      return (
        <List.Item
          href="javascript:void(0)"
          after={
            couponType ? (
              <span className="coupon-wrapper">{couponAmount}</span>
            ) : (
              <span>{unUseCouponCount}张未使用</span>
            )
          }
          title={type === "yyz_product" ? "加息券" : "优惠券"}
          onClick={this._jumpToCouponList}
        />
      );
    } else {
      return null;
    }
  },
  /*
     * @desc 历史收益的渲染，除了天天赚，其他类型的产品都会显示这一栏。
     *
     * @pram {string} //产品的类型
     * @return {reactElement} //react元素
     */
  _renderExpectedReward(type, expectedReward) {
    if (type !== "ttz_product") {
      return (
        <div className="subtitle expectedReward" style={{ paddingTop: "5px" }}>
          <span>历史收益：</span>
          <strong>{expectedReward}</strong>元
        </div>
      );
    }
  },
  _pay(productType) {
    PaymentAction.pay(productType);
  },
  _jumpToCouponList() {
    let purchaseAmount = this.refs.purchaseAmount.getValue() || 0;
    let type = this.props.location.query.type;
    this.context.router.push({
      pathname: "/couponList",
      query: {
        purchaseAmount: purchaseAmount,
        productType: type
      }
    });
  },
  _handlePurchaseAmountChange(event) {
    let { type, repayType } = this.props.location.query;
    /**
     *
     * @param {number/string} number
     * @returns 返回截取小数点后两位后的数字
     */
    function toFixedTwo(number) {
      let number_str = "" + number;
      let arr = [];
      let index = number_str.indexOf(".");
      if (index === -1) {
        //整数
        return parseFloat(number_str + ".00");
      } else {
        arr = number_str.split(".");
        if (arr[1].length === 1) {
          //小数点后面有一位数字
          return parseFloat([arr[0], arr[1] + "0"].join("."));
        } else if (arr[1].length === 2) {
          //小数点后面有两位数字
          return parseFloat([arr[0], arr[1]].join("."));
        } else {
          //小数点后面大于两位数字
          return parseFloat([arr[0], arr[1].substring(0, 2)].join("."));
        }
      }
    }

    let isCreditorLoanAndDEBX =
      type === "creditor_product" && (repayType === "debx"  || repayType === "fddebx"); //是否是等额本息的债权转让;
    let purchaseAmountStr = event.target.value;
    let purchaseAmount = 0;
    let isDigit = /^[0-9]*$/;
    let isWithDotInTheEnd = false; //用户输入的字符串是否以“.”结尾，形如“100.”

    //还款方式为等额本息的债权的购买允许输入小数点；
    if (isCreditorLoanAndDEBX) {
      if (purchaseAmountStr.length === 1 && !isDigit.test(purchaseAmountStr)) {
        purchaseAmount = 0;
      } else {
        let indexOfDot = purchaseAmountStr.indexOf(".");
        let isMoreThanTwoDigit =
          indexOfDot > -1 && purchaseAmountStr.length - 1 - indexOfDot > 2; //是否是超过小数点后两位
        if (indexOfDot > -1 && indexOfDot === purchaseAmountStr.length - 1) {
          //针对形如“100.”的输入
          isWithDotInTheEnd = true;
        }
        if (isMoreThanTwoDigit) {
          purchaseAmountStr = toFixedTwo(purchaseAmountStr);
        }

        purchaseAmount = parseFloat(purchaseAmountStr);
        purchaseAmount = isNaN(purchaseAmount) ? 0 : purchaseAmount;
      }
    } else {
      //其他情况下允许输入小数点
      purchaseAmount = parseInt(purchaseAmountStr);
      purchaseAmount = isNaN(purchaseAmount) ? 0 : purchaseAmount;
    }
    PaymentAction.changePurchaseAmount(purchaseAmount, isWithDotInTheEnd);
  },
  _UseAllBalance(event) {
    PaymentAction.useAllBalance();
  },
  _jumpToNextLocation(confirm) {
    let { purchaseAmount, userBalance } = PaymentStore.getAll();
    let rechargeAmount = (purchaseAmount - userBalance).toFixed(2);
    if (confirm) {
      //用户点击了“确定”按钮
      if (this.state.modalType === "rechargeModal") {
        this.context.router.push({
          pathname: "/recharge",
          query: {
            rechargeAmount: rechargeAmount
          }
        });
      } else if (this.state.modalType === "bindBankCardModal") {
        this.context.router.push({
          pathname: "myBankCard"
        });
      }
    } else {
      //用户点击了“取消”按钮
      this.setState({
        isModalOpen: false
      });
    }
  },
  _handleRechargeBtnClick() {
    PaymentAction.recharge();
  },
  _renderTotalLoanRate(
    productApr,
    minRate,
    maxRate,
    rewardRate,
    vipRaiseRate,
    isVIPUser
  ) {
    let type = this.props.location.query.type;
    if (type === "moon") {
      return (
        (minRate * 100).toFixed(1) +
        "%" +
        "~" +
        (maxRate * 100).toFixed(1) +
        "%"
      );
    } else {
      let totalLoanRate = productApr + "%";
      if (rewardRate && parseFloat(rewardRate)) {
        totalLoanRate += "+" + (parseFloat(rewardRate) * 100).toFixed(1) + "%";
      }
      if (
        ["creditor_product", "loan_product", "glj", "ced","nyd"].indexOf(type) > -1 &&
        vipRaiseRate &&
        parseFloat(vipRaiseRate) &&
        isVIPUser === "true"
      ) {
        totalLoanRate +=
          "+VIP" + (parseFloat(vipRaiseRate) * 100).toFixed(1) + "%";
      }
      return totalLoanRate;
    }
  },
  _toggleAgreementCheck(){
    this.setState(prevState => {
      return {
        isAgreementChecked:!prevState.isAgreementChecked
      }
    })
  },
  _closeRiskHintModal(){
    this.setState({
      isRiskHintModalOpen:false
    })
  },
  _openRiskHintModal(modalText){
    this.setState({
      isRiskHintModalOpen:true,
      riskHintModalText:modalText
    })
  },
  _toggleViewTo(viewName){
    this.setState({
      viewName
    })
  },
  handleAssignBtnClick(productType,isAccredit){
    if(isAccredit){
      PaymentAction.assignAgreement();
    }else {
      let isSkipAutoAssignCheck=true;
      PaymentAction.pay(productType,isSkipAutoAssignCheck);
    }
  },
  render() {
    let {
      type,
      productName,
      productApr,
      remainAmount,
      userBalance,
      rewardRate,
      minRate,
      maxRate,
      vipRaiseRate,
      isVIPUser,
      isTransferedCreditor,
      repayType
    } = this.props.location.query;

    isTransferedCreditor = isTransferedCreditor === "false" ? false : true;

    if (["rich", "moon"].indexOf(type) > -1 && isTransferedCreditor) {
      type = `${type}OfTransfered`;
    }

    let isCreditorLoanAndDEBX =
      type === "creditor_product" && (repayType === "debx" || repayType === "fddebx"); //是否是等额本息的债权转让

    let {
      couponAmount,
      couponType,
      expectedReward,
      unUseCouponCount,
      investLimitAmount_ttz
    } = PaymentStore.getAll();

    let purchaseAmount = this.state.purchaseAmount;
    let isPurchaseBtnActive=this.state.isAgreementChecked;
    let iconClassName=classNames({
      "agreement-checkbox":this.state.isAgreementChecked,
      "agreement-checkbox-unchecked":!this.state.isAgreementChecked
  })
    let serviceAgreementName=type === "creditor_product" ? '债权转让协议' : '借款协议';
    let serviceAgreementUrl=type === "creditor_product" ? 'serviceAgreement_creditor_product' : 'serviceAgreement_loan_product';

    if(this.state.viewName === "agreement_loanProduct"){
      return (
        <LoanProductAgreement 
          isNeedToShowAssignBtn={true}
          backToPrevView={this._toggleViewTo.bind(this,"payment")}
          assignAgreement={this.handleAssignBtnClick.bind(null,type)}
        />
      )
    }else if(this.state.viewName === "agreement_creditorProduct"){
       return (
        <CreditorProductAgreement 
          isNeedToShowAssignBtn={true}
          backToPrevView={this._toggleViewTo.bind(this,"payment")}
          assignAgreement={this.handleAssignBtnClick.bind(null,type)}
        />
       )
    }

    return (
      <Container id="earnSetPayment">
        <Group>
          <h6 className="title">{productName}</h6>
          <div className="subtitle">
            <span>历史年化：</span>
            <strong>
              {this._renderTotalLoanRate(
                productApr,
                minRate,
                maxRate,
                rewardRate,
                vipRaiseRate,
                isVIPUser
              )}
            </strong>
          </div>
          <div className="subtitle">
            <span>项目可投余额：</span>
            <strong>{remainAmount}</strong>元
          </div>
          {this._renderInvestmentLimit(type, investLimitAmount_ttz)}
        </Group>

        <Group header="" id="purchaseZone">
          <div className="subtitle usableAmount cf">
            <span>账户余额：</span>
            {userBalance}元
            <a
              href="javascript:void(0);"
              className="fr recharge-btn"
              onClick={this._handleRechargeBtnClick}
            >
              充 值
            </a>
          </div>
          <List>
            <List.Item nested="input">
              <Field
                type="text"
                label="投资金额"
                placeholder={
                  isCreditorLoanAndDEBX ? "100元起投" : "请输入100的整数倍"
                }
                ref="purchaseAmount"
                inputAfter={
                  <span className="useALL-btn" onClick={this._UseAllBalance}>
                    全余额
                  </span>
                }
                onChange={this._handlePurchaseAmountChange}
                value={purchaseAmount ? purchaseAmount : ""}
              />
            </List.Item>
            {this._renderCouponBar(
              type,
              couponAmount,
              couponType,
              unUseCouponCount
            )}
          </List>
          {this._renderExpectedReward(type, expectedReward)}
        </Group>

        <div style={{ padding: "20px 15px" }}>
          <div className="agreement-bar">
              <Icon classPrefix="imgIcon" name={iconClassName} onClick={this._toggleAgreementCheck} />
              我已阅读并同意
              <Link to="riskAnnounceHint">《风险提示》</Link>
          </div>
          <Button
            disabled={!isPurchaseBtnActive}
            amStyle="primary"
            block={true}
            radius={true}
            onClick={this._pay.bind(null, type)}
          >
            签约并确定支付
          </Button>
          <div className="agreement-bar">
              <div className="text-left">投资需签约<Link to={serviceAgreementUrl}>《{serviceAgreementName}》</Link>，若您已授权平台申请电子签章并自动签约，投资时默认签署协议</div>
          </div>
        </div>
        <Modal
          title=""
          ref="modal"
          isOpen={this.state.isModalOpen}
          role="confirm"
          onAction={this._jumpToNextLocation}
        >
          {this.state.modalInnerText}
        </Modal>
        <Modal
          title=""
          ref="paymentModal"
          isOpen={this.state.isPaymentModalOpen}
          role="loading"
        >
          处理中，请稍候...
        </Modal>
        <CustomizeModal
          title="温馨提示"
          role="customize"
          isOpen={this.state.isRiskHintModalOpen}
          closeViaBackdrop={true}
          onDismiss={() => {
            this._closeRiskHintModal();
          }}
        >
          <div className="modal-dialog" style={{paddingTop:"1rem"}}>
            <h5 >温馨提示</h5>
            <div className="modal-body" style={{ padding: '0 1rem 2rem' }}>
              {this.state.riskHintModalText}
            </div>
            <div className="modal-footer">
              <span
                className="modal-btn"
              >
                <a href="tel:4006322688">联系客服</a>
              </span>
              <span
                className="modal-btn"
                onClick={() => {
                  this.context.router.push({
                    pathname: 'riskEvaluate',
                    query: {
                      isEvaluated: true
                    }
                  });
                }}
              >
                重新测评
              </span>
            </div>
          </div>
        </CustomizeModal>
      </Container>
    );
  },
  componentDidMount() {
    let {
      productId,
      type,
      productName,
      productApr,
      remainAmount,
      userBalance,
      rewardRate,
      productDeadline,
      mainMonth,
      minNotRateTime,
      maxNotRateTime,
      minRate,
      maxRate,
      isVIPUser,
      vipRaiseRate,
      repayType,

      //以下这几个字段是用来计算等额本息下购买债权转让预期收益所用的
      nowPeriodNo, //当前期数(整数类型)
      days, //当前时间与最近一期还款相差天数(整数类型)
      sumPeriodNo, //投资总期限(整数类型)
      alreadyInvestedAmount,
      riskEvaluateAmount,
      repaymentPeriod,
      isAutoAssign
    } = this.props.location.query;

    //使用location的数据来初始化PaymentStore
    PaymentAction.storeInitialize({
      productId: productId,
      productType: type,
      productName: productName,
      productApr: parseFloat(parseFloat(productApr) / 100),
      remainAmount: parseFloat(remainAmount),
      userBalance: parseFloat(userBalance),
      rewardRate: parseFloat(rewardRate),
      productDeadline: productDeadline,
      mainMonth: parseInt(mainMonth),
      minNotRateTime: parseInt(minNotRateTime),
      maxNotRateTime: parseInt(maxNotRateTime),
      minRate: parseFloat(minRate) || 0,
      maxRate: parseFloat(maxRate) || 0,
      isVIPUser: isVIPUser === "true" ? true : false,
      vipRaiseRate: parseFloat(vipRaiseRate),
      repayType,
      nowPeriodNo: parseInt(nowPeriodNo), //当前期数(整数类型)
      days: parseInt(days), //当前时间与最近一期还款相差天数(整数类型)
      sumPeriodNo: parseInt(sumPeriodNo),//投资总期限(整数类型)
      alreadyInvestedAmount:parseFloat(alreadyInvestedAmount),
      riskEvaluateAmount:parseFloat(riskEvaluateAmount),
      repaymentPeriod,
      //isAutoAssign: isAutoAssign === 'true' 
    });

    //请求优惠券可使用的张数
    if (CAN_USE_COUPON.indexOf(type) > -1) {
      PaymentAction.getUnUseCouponCount(type);
    }

    PaymentStore.bind(
      "change",
      function(isWithDotInTheEnd) {
        let purchaseAmountStr = String(PaymentStore.getAll().purchaseAmount);
        let purchaseAmount = isWithDotInTheEnd
          ? purchaseAmountStr + "."
          : parseFloat(purchaseAmountStr);
        this.setState({
          purchaseAmount,
          couponAmount: PaymentStore.getAll().couponAmount
        });
      }.bind(this)
    );

    PaymentStore.bind("userBalanceIsNotEnough", function(msg) {
      Message.broadcast(msg);
    });

    //购买验证不通过
    PaymentStore.bind(
      "paymentCheckFailed",
      function(msg) {
        if (msg.indexOf("充值") > -1) {
          this.setState({
            isModalOpen: true,
            modalInnerText: msg,
            modalType: "rechargeModal"
          });
        }else if(msg.indexOf("风险测评") > -1){
          this._openRiskHintModal(msg);
        }else if(msg.indexOf('授权自动签约') >  -1){
          let productType=PaymentStore.getAll().productType;
          let nextView=productType === 'creditor_product' ?  'agreement_creditorProduct' : 'agreement_loanProduct';
          this._toggleViewTo(nextView);
        }else {
          Message.broadcast(msg);
        }
      }.bind(this)
    );

    PaymentStore.bind(
      "hadNotBindBankCard",
      function() {
        this.setState({
          isModalOpen: true,
          modalInnerText: "您还未绑定银行卡，暂时不能充值。去绑卡？",
          modalType: "bindBankCardModal"
        });
      }.bind(this)
    );

    PaymentStore.bind(
      "BindBankCardCheckSuccess",
      function() {
        this.context.router.push({
          pathname: "/recharge"
        });
      }.bind(this)
    );

    //购买请求开始
    PaymentStore.bind(
      "paymentRequestIsStart",
      function() {
        this.setState({
          isPaymentModalOpen: true
        });
      }.bind(this)
    );

    //购买请求结束
    PaymentStore.bind(
      "paymentRequestIsEnd",
      function() {
        this.setState({
          isPaymentModalOpen: false
        });
      }.bind(this)
    );

    //购买失败
    PaymentStore.bind(
      "purchaseFailed",
      function(msg) {
        Message.broadcast(msg);
      }.bind(this)
    );

    PaymentStore.bind(
      "purchaseSuccess",
      function(data) {
        let expectedReward = PaymentStore.getAll().expectedReward;
        expectedReward && (data.expectedReward = expectedReward);
        data.productType = type;
        this.context.router.push({
          pathname: "/PurchaseSuccess",
          query: data
        });
      }.bind(this)
    );

    PaymentStore.bind(
      "assignAgreementFailed",
      function(msg) {
        Message.broadcast(msg);
      }.bind(this)
    );

    PaymentStore.bind(
      "assignAgreementSuccess",
      function() {
        let productType=PaymentStore.getAll().productType;
        PaymentAction.pay(productType);
      }.bind(this)
    );


  },
  componentWillUnmount() {
    PaymentStore.clearAll();
    PaymentStore.unbind("assignAgreementSuccess");
  }
});

Payment.contextTypes = {
  router: React.PropTypes.object.isRequired
};

module.exports = Payment;

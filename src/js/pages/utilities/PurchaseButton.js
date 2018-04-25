import React from "react";
import { Link } from "react-router";

//ui component
import Button from "../../UIComponents/Button";
import Message from "../../UIComponents/Message";
import Modal from "../../UIComponents/modal/Modal";
import CustomizeModal from "../../UIComponents/modal/SpecialModal";
//import RegisterToPABankInterceptModal from "./RegisterToPABankInterceptModal";
import UpgradeToPABankInterceptModal from "./UpgradeToPABankInterceptModal";

//lib
import CountDown from "./CountDown";

//utilites component
import mixin from "./mixin";
let cookie = require("../../lib/cookie");
let ajax = require("../../lib/ajax");

/*
* @desc 所有产品在详情页的购买按钮。主要是根据产品的类型和状态，跳转到不同的支付页面（天天赚的预约页面和公用的支付页面）。
*
* @author sam liu
* @date 2016-07-05
*/

let PurchaseButton = React.createClass({
  mixins: [mixin],
  getInitialState() {
    return {
      isModalOpen: false,
      confirmText: "",
      type: 1,
      isCustomizeModalOpen: false
    };
  },
  _formatTimeStamp(timeStamp) {
    let timeStr = "";
    let date = new Date(timeStamp);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    timeStr =
      (hours < 10 ? "0" + hours : hours) +
      ":" +
      (minutes < 10 ? "0" + minutes : minutes);
    return timeStr;
  },
  _renderButtonText() {
    let { type, status, publishTime, sysCurrentTime, orderSwitch } = this.props;
    let buttonText = this._getProductStatusText(type, status);
    //预发布状态下，如果服务器现在的时间距离标的发布的时间大于1分钟(等于60000毫秒)话，就显示形如"12:00开抢"
    //如果小于1分钟，则进入倒计时状态
    //note：这里存在一个问题，就是服务器现在时间还没到发布时间，后台返回的status字段的值早就变成"bidding"，也就是抢购中的状态
    if (status && status === "prepublish" && publishTime) {
      if (publishTime - sysCurrentTime < 60000) {
        let countDownDuration = parseInt((publishTime - sysCurrentTime) / 1000);
        buttonText = (
          <CountDown
            countDownDuration={countDownDuration}
            textAfterFinish="立即抢购"
            reload={true}
          />
        );
      } else {
        buttonText = this._formatTimeStamp(this.props.publishTime) + "开抢";
      }
    }
    if (buttonText === "预约" && orderSwitch === "false") {
      buttonText = "已售罄";
    }
    return buttonText;
  },
  _isButtonDisabled() {
    let { type, status, orderSwitch } = this.props;
    let isButtonDisabled = false;
    let buttonText = this._getProductStatusText(type, status);
    if (
      buttonText === "立即抢购" ||
      (buttonText === "预约" && orderSwitch === "true")
    ) {
      isButtonDisabled = false;
    } else {
      isButtonDisabled = true;
    }
    return isButtonDisabled;
  },
  _handleOnClick() {
    let {
      id,
      type,
      status,
      productName,
      remainAmount,
      productApr,
      rewardRate,
      repaymentLimit,
      mainMonth,
      minNotRateTime,
      maxNotRateTime,
      orderSwitch,
      isZXProduct,
      minRate,
      maxRate,
      vipRaiseRate, //vip用户的加息利率（好彩头专用）
      isTransferedCreditor, //月满盈和丰收盈专用，用来判断是否是债转后的月满盈和丰收盈
      repayType,

      //以下这几个字段是用来计算等额本息下购买债权转让预期收益所用的
      nowPeriodNo, //当前期数(整数类型)
      days, //当前时间与最近一期还款相差天数(整数类型)
      sumPeriodNo, //投资总期限(整数类型)
      repaymentPeriod
    } = this.props;

    let _self = this;

    let productStatusText = this._getProductStatusText(type, status);
    if (productStatusText === "预约" && orderSwitch === "false") {
      //如果天天赚预约开关是关闭的话，则转换为“已售罄”
      productStatusText = "已售罄";
    }
    let isLogin = !!cookie.getCookie("token");
    let locationQuery = {
      type: type,
      productId: id,
      productName: productName,
      remainAmount: remainAmount,
      productApr: productApr,
      rewardRate: rewardRate,
      productDeadline: repaymentLimit,
      mainMonth: mainMonth,
      minNotRateTime: minNotRateTime,
      maxNotRateTime: maxNotRateTime,
      minRate: minRate || 0,
      maxRate: maxRate || 0,
      vipRaiseRate: vipRaiseRate || 0,
      isTransferedCreditor,
      repayType,

      //以下这几个字段是用来计算等额本息下购买债权转让预期收益所用的
      nowPeriodNo, //当前期数(整数类型)
      days, //当前时间与最近一期还款相差天数(整数类型)
      sumPeriodNo,//投资总期限(整数类型)
      repaymentPeriod
    };

    if (productStatusText === "预发布") {
      Message.broadcast("该标的正在预售中，请稍后......");
    } else if (!isLogin) {
      this.setState({
        isCustomizeModalOpen: true
      });
    } else if (isLogin) {
      //如果用户登录了，则检查用户是否设置了交易密码和进行了实名认证
      ajax({
        async: false,
        ciUrl: "/user/v2/securityCenter",
        success(rs) {
          if (rs.code === 0) {
            locationQuery.userBalance = rs.data.available;
            locationQuery.isVIPUser = rs.data.investVip > 0 ? true : false;
            locationQuery.alreadyInvestedAmount=parseFloat(rs.data.investedAmount);
            locationQuery.riskEvaluateAmount=parseFloat(rs.data.riskEvaluation) * 10000;//按理说，后台不应该返回格式化后的数据。这是前端的本职工作。
            locationQuery.isAutoAssign=rs.data.autoStamp ===  1 ? 'true' : 'false';//用户是否授权自动签约
 
            let zxcgOpenInfo = rs.data.zxcgOpenInfo;

            // if(isZXProduct){//如果用户购买的是中信标的（中信标的只针对好采投）
            //     if(zxcgOpenInfo.zxcgOpen === "no" || (zxcgOpenInfo.zxcgOpen === "yes" && zxcgOpenInfo.istempuser === "yes")){//用户没用真正开通存管
            //         if(zxcgOpenInfo.leftQureyTime === 0){//如果没有开通机会了，就跳转到开通帮助页面
            //             _self.context.router.push({
            //                 pathname:"registerToZXFailedHint"
            //             })
            //         }else {
            //             _self.setState({
            //                 isModalOpen:true,
            //                 confirmText:"此标的需要开通银行存管子账户之后才能购买！去开通？",
            //                 type:3
            //             })
            //         }

            //     }else {//如果用户真正开通存管，则一定是进行了实名认证和绑卡的，只需要验证他是否设置了交易密码
            //         if(rs.data.dealPassVerifyInfo.isDealPwdSet === "no"){
            //             _self.setState({
            //                 isModalOpen:true,
            //                 confirmText:"为了您的资金安全，请先设置交易密码",
            //                 type:2
            //             })
            //         }else{
            //             _self.context.router.push({
            //                 pathname:"/payment",
            //                 query:locationQuery
            //             });
            //         }
            //     }
            // }else {//如果用户购买的不是中信标
            // else if(rs.data.idCardVerifyInfo.idCardVerified === "no"){
            // _self.context.router.push({
            //     pathname:"realNameAuthentication"
            // });
            // }
            // _self.setState({
            //     isModalOpen:true,
            //     confirmText:(
            //         <div>
            //             为了您的资金安全，<br/>请先开通银行存管子账户<br/>
            //             <Link to="openZXIntroduction">为什么要开通存管子账户？</Link>
            //         </div>
            //     ),
            //     type:3
            // })
            // }
            if (['0','2', '3', '4'].indexOf(zxcgOpenInfo.cgOpen) > -1) {
              UpgradeToPABankInterceptModal.show();
            } else if(zxcgOpenInfo.cgOpen === '1' &&  rs.data.isRiskTest === 0){//在这面，实现了对用户是否已经完成风险测评的拦截
              UpgradeToPABankInterceptModal.show(true);
            }else if (rs.data.dealPassVerifyInfo.isDealPwdSet === 'no') {
              _self.setState({
                isModalOpen: true,
                confirmText: '为了您的资金安全，请先设置交易密码',
                type: 2
              });
            } else if (productStatusText === '预约' && orderSwitch === 'true') {
              _self.context.router.push({
                pathname: "/dailyEarnAppointment",
                query: locationQuery
              });
            } else {
              UpgradeToPABankInterceptModal.show(() => {
                _self.context.router.push({
                  pathname: "/payment",
                  query: locationQuery
                });
              });
            }
          } else {
            Message.broadcast(rs.description);
          }
        }
      });
    }
  },
  _jumpToNextLocation(confirm) {
    if (confirm) {
      if (this.state.type === 1) {
        //type等于1是代表没有登录的状态
        this.context.router.push({
          pathname: "/",
          query: {
            view: "login"
          }
        });
      } else if (this.state.type === 2) {
        //type等于2是代表用户没有设置交易密码
        this.context.router.push({
          pathname: "setDealPassword",
          query: {
            actionType: "setting",
            query: {
              entryComponent: "productList" //入口组件，用于用户在引导链的某个环节点击返回所返回的页面
            }
          }
        });
      } else if (this.state.type === 3) {
        //type等于2是代表用户没有开通中信存管
        this.context.router.push({
          pathname: "registerToZXBank"
        });
      }
    } else {
      this._handleModalClose();
    }
  },
  _handleModalClose() {
    this.setState({
      isModalOpen: false,
      confirmText: "",
      type: 1
    });
  },

  _closeCustomizeModal() {
    this.setState({
      isCustomizeModalOpen: false
    });
  },

  render() {
    let status = this.props.status;
    return (
      <div
        className="purchaseButton-wrapper"
        style={{
          width: "100%",
          position: "fixed",
          left: 0,
          bottom: 0,
          zIndex: 1003
        }}
      >
        <Button
          block={true}
          amStyle="primary"
          style={{ marginBottom: 0 }}
          onClick={this._handleOnClick}
          disabled={
            this._isButtonDisabled() && status !== "prepublish" ? true : false
          }
          className={status === "prepublish" ? "disabled" : ""}
        >
          {this._renderButtonText()}
        </Button>
        <Modal
          title=""
          ref="modal"
          isOpen={this.state.isModalOpen}
          role="confirm"
          onAction={this._jumpToNextLocation}
        >
          {this.state.confirmText}
        </Modal>
        <CustomizeModal
          role="customize"
          isOpen={this.state.isCustomizeModalOpen}
          closeViaBackdrop={true}
          onDismiss={() => {
            this._closeCustomizeModal();
          }}
        >
          <div className="modal-dialog">
            <div className="modal-body" style={{ padding: "2rem 0" }}>
              请先验证登录信息！
            </div>
            <div className="modal-footer">
              <span
                className="modal-btn"
                onClick={() => {
                  this.context.router.push({
                    pathname: "/",
                    query: {
                      view: "register"
                    }
                  });
                }}
              >
                去注册
              </span>
              <span
                className="modal-btn"
                onClick={() => {
                  this.context.router.push({
                    pathname: "/",
                    query: {
                      view: "login"
                    }
                  });
                }}
              >
                去登录
              </span>
            </div>
          </div>
        </CustomizeModal>
      </div>
    );
  }
});

PurchaseButton.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default PurchaseButton;

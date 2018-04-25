var MicroEvent = require("../lib/microevent.js");
var appDispatcher = require("../dispatcher/dispatcher.js");
var ajax = require("../lib/ajax.js");
var cookie = require("../lib/cookie.js");
var UserHomeStore = require("./UserHomeStore");

var WithdrawStore = {
  _all: {
    withdrawAmount: 0,
    dealPassword: "",
    verificationCode: "",
    handlingCharge: 2, //手续费硬编码为2元
    acctAccount: 0, //实际到账
    bankCardInfo: {},
    available: 0
  },
  getAll() {
    return this._all;
  },
  checkForm() {
    let {
      withdrawAmount,
      dealPassword,
      verificationCode,
      available
    } = this._all;

    let validationResult = {
      success: true,
      msg: ""
    };

    let checkDealPassword_regexp = /^(?!^\d+$)(?!^[a-zA-Z]+$)[0-9a-zA-Z]{6,16}$/; //登录密码和交易密码共用同一个正则表达式来验证

    if (withdrawAmount === 0) {
      validationResult = {
        success: false,
        msg: "提现金额不能为空，请输入"
      };
    } else if (withdrawAmount < 10) {
      validationResult = {
        success: false,
        msg: "提现金额不能小于10元"
      };
    } else if (withdrawAmount > available) {
      validationResult = {
        success: false,
        msg: "提现金额不能大于可提现的金额，请检查！"
      };
    } else if (withdrawAmount > 2000000) {
      validationResult = {
        success: false,
        msg: "提现金额不能大于2000000元"
      };
    } else if (verificationCode === "") {
      validationResult = {
        success: false,
        msg: "验证码不能为空，请输入！"
      };
    } else if (verificationCode.length !== 6) {
      validationResult = {
        success: false,
        msg: "验证码格式不正确，请检查！"
      };
    } else if (dealPassword === "") {
      validationResult = {
        success: false,
        msg: "交易密码不能为空，请输入！"
      };
    } /*else if (dealPassword.length < 6 || dealPassword.length > 16 || !checkDealPassword_regexp.test(dealPassword)) {
            validationResult = {
                success: false,
                msg: "交易密码格式不正确，请输入！"
            };
        }*/

    return validationResult;
  },
  checkWithdrawAmount() {
    let { withdrawAmount, available } = this._all;

    let validationResult = {
      success: true,
      msg: ""
    };

    if (withdrawAmount === 0) {
      validationResult = {
        success: false,
        msg: "提现金额不能为空，请输入"
      };
    } else if (withdrawAmount < 10) {
      validationResult = {
        success: false,
        msg: "提现金额不能小于10元"
      };
    } else if (withdrawAmount > available) {
      validationResult = {
        success: false,
        msg: "提现金额不能大于可提现的金额，请检查！"
      };
    } else if (withdrawAmount > 2000000) {
      validationResult = {
        success: false,
        msg: "提现金额不能大于2000000元"
      };
    }

    return validationResult;
  },
  _figOutAcctAccount() {
    this._all.acctAccount = this._all.withdrawAmount - this._all.handlingCharge;
  },
  updateAll(source) {
    this._all = Object.assign(this._all, source);
    this._figOutAcctAccount();
  },
  clearAll() {
    this._all = {
      withdrawAmount: 0,
      dealPassword: "",
      verificationCode: "",
      handlingCharge: 2, //手续费硬编码为2元
      acctAccount: 0, //实际到账
      bankCardInfo: {},
      available: 0
    };
  }
};
MicroEvent.mixin(WithdrawStore);

appDispatcher.register(function(payload) {
  switch (payload.actionName) {
    case "getBankCardInfoFromServer_withdraw":
      ajax({
        ciUrl: "/user/v2/myBankCardInfo",
        success(rs) {
          if (rs.code === 0) {
            WithdrawStore.updateAll({
              bankCardInfo: rs.data
            });
            WithdrawStore.trigger("change");
          }
        }
      });
      break;
    case "getUserBalance_withdraw":
      function unformatAmount(amountStr) {
        if (typeof amountStr === "string") {
          return parseFloat(amountStr.replace(",", ""));
        } else {
          throw new Error("参数类型错误！请传入字符串类型的参数值！");
        }
      }
      ajax({
        ciUrl: "/user/v2/userInfoDetail",
        success(rs) {
          if (rs.code === 0) {
            let available = rs.data.accountInfo.available;
            // 当返回的available的值为-1时，表示农泰金融后台与平安银行的服务没有联通，-1是农泰金融在available上的默认值。
            if (available === -1) {
              //WithdrawStore.trigger("connectToPABServeFailed");
            } else {
              WithdrawStore.updateAll({
                available: available
              });
              WithdrawStore.trigger("change");
            }
          }
        }
      });
      break;
    case "withdrawAmountChange":
      WithdrawStore.updateAll({
        withdrawAmount: payload.data.withdrawAmount
      });
      WithdrawStore.trigger("change");
      break;
    case "changeFieldValue_withdraw":
      let { fieldName, fieldValue } = payload.data;

      let newData = {};
      newData[fieldName] = fieldValue;
      WithdrawStore.updateAll(newData);
      WithdrawStore.trigger("change");
      break;
    case "nextStep_withdraw":
      let nextStepCheckResult = WithdrawStore.checkWithdrawAmount();
      if (nextStepCheckResult.success) {
        WithdrawStore.trigger("requestIsStarting");
        ajax({
          ciUrl: "/withdraws/v2/getPermit.do",
          data: {
            amount: WithdrawStore.getAll().withdrawAmount
          },
          success(rs) {
            WithdrawStore.trigger("requestIsEnd");
            if (rs.code === 0) {
              WithdrawStore.trigger("getPermissionSuccess");
            } else {
              WithdrawStore.trigger("getPermissionFailed", rs.description);
            }
          }
        });
      } else {
        WithdrawStore.trigger("formCheckFailed", nextStepCheckResult.msg);
      }
      break;
    case "nextStep_withdraw_upgrade":
      let nextStepCheckResult_upgrade = WithdrawStore.checkWithdrawAmount();
      if (nextStepCheckResult_upgrade.success) {
        WithdrawStore.trigger("requestIsStarting");
        ajax({
          ciUrl: "/withdraws/v2/withdraw.do",
          data: {
            amount: WithdrawStore.getAll().withdrawAmount
          },
          success(rs) {
            WithdrawStore.trigger("requestIsEnd");
            if (rs.code === 0) {
              let { action, orig, sign, returnurl, NOTIFYURL, wxurl } = rs.data;
              let nextLocation = `${wxurl}?action=${encodeURI(
                action
              )}&orig=${encodeURI(orig)}&sign=${encodeURI(
                sign
              )}&returnurl=${encodeURI(returnurl)}&NOTIFYURL=${encodeURI(
                NOTIFYURL
              )}`;

              WithdrawStore.trigger("getNextLocationInfoSuccess", nextLocation);
            } else {
              WithdrawStore.trigger(
                "getNextLocationInfoFailed",
                rs.description
              );
            }
          },
          error() {
            WithdrawStore.trigger("requestIsEnd");
          },
          timeout() {
            WithdrawStore.trigger("requestIsEnd");
          }
        });
      } else {
        WithdrawStore.trigger(
          "formCheckFailed",
          nextStepCheckResult_upgrade.msg
        );
      }
      break;
    case "submitWithdrawForm_withdraw":
      let formCheckResult = WithdrawStore.checkForm();
      if (formCheckResult.success) {
        let {
          withdrawAmount,
          dealPassword,
          verificationCode
        } = WithdrawStore.getAll();

        let serialNo = cookie.getCookie("SerialNo_withdraw");

        WithdrawStore.trigger("requestIsStarting");
        ajax({
          ciUrl: "/withdraws/v2/withdraw.do",
          data: {
            amount: withdrawAmount,
            withdrawPassword: dealPassword,
            msgCode: verificationCode,
            serialNo
          },
          success(rs) {
            WithdrawStore.trigger("requestIsEnd");
            if (rs.code === 0) {
              WithdrawStore.trigger(
                "applyForWithdrawSuccess",
                rs.data.withdrawId
              );
            } else {
              WithdrawStore.trigger("applyForWithdrawFailed", rs.description);
            }
          }
        });
      } else {
        WithdrawStore.trigger("formCheckFailed", formCheckResult.msg);
      }
      break;
    default:
    //no op
  }
});

module.exports = WithdrawStore;

var MicroEvent = require("../lib/microevent.js");
var appDispatcher = require("../dispatcher/dispatcher.js");
var ajax = require("../lib/ajax.js");
var cookie = require("../lib/cookie");

import config from "../config";

var RechargeStore = {
  _all: {
    bankId: "",
    fullCardNo: "**** **** **** ****",
    rechargeAmount: 0
  },
  getAll() {
    return this._all;
  },
  updateAll(source) {
    this._all = Object.assign(this._all, source);
  },
  checkRechargeAmount() {
    let validationResult = {
      success: true,
      msg: ""
    };

    if (this._all.rechargeAmount < 10) {
      validationResult = {
        success: false,
        msg: "充值金额最低为10元"
      };
    }

    return validationResult;
  },
  clearAll() {
    this._all.rechargeAmount = 0;
  }
};
MicroEvent.mixin(RechargeStore);

appDispatcher.register(function(payload) {
  switch (payload.actionName) {
    case "getBankCardInfoFromServer_recharge":
      ajax({
        ciUrl: "/user/v2/myBankCardInfo",
        success(rs) {
          if (rs.code === 0) {
            let { bankId, fullCardNo } = rs.data;

            RechargeStore.updateAll({
              bankId,
              fullCardNo
            });
            RechargeStore.trigger("change");
          }
        }
      });

      //获取用户的全名和完整的身份证号码
      ajax({
        ciUrl: "/user/v2/securityCenter",
        success(rs) {
          if (rs.code === 0) {
            RechargeStore.updateAll({
              idcardFull: rs.data.idCardVerifyInfo.idcardFull,
              realNameFull: rs.data.idCardVerifyInfo.realNameFull,
              phoneNo: rs.data.mobileVerifyInfo.mobileFull
            });
            RechargeStore.trigger("change");
          }
        }
      });
      break;
    case "submitRechargeAmount_upgrade":
      let checkResult = RechargeStore.checkRechargeAmount();
      if (checkResult.success) {
        let { bankId, fullCardNo, rechargeAmount } = RechargeStore.getAll();
        RechargeStore.trigger("requestIStarting");
        ajax({
          ciUrl: "/user/v2/managerRecharge",
          data: {
            bankCardNumber: fullCardNo || "",
            bankId: bankId || "",
            rechargeAmount
          },
          success(rs) {
            RechargeStore.trigger("requestIsEnd");
            if (rs.code === 0) {
              let { action, orig, sign, returnurl, NOTIFYURL, wxurl } = rs.data;
              let nextLocation = `${wxurl}?action=${encodeURI(
                action
              )}&orig=${encodeURI(orig)}&sign=${encodeURI(
                sign
              )}&returnurl=${encodeURI(returnurl)}&NOTIFYURL=${encodeURI(
                NOTIFYURL
              )}`;

              RechargeStore.trigger("getNextLocationInfoSuccess", nextLocation);
            } else {
              RechargeStore.trigger(
                "getNextLocationInfoFailed",
                rs.description
              );
            }
          },
          error() {
            RechargeStore.trigger("requestIsEnd");
          },
          timeout() {
            RechargeStore.trigger("requestIsEnd");
          }
        });
      } else {
        RechargeStore.trigger("rechargeAmountCheckFailed", checkResult.msg);
      }
      break;
    case "rechargeAmountChange":
      RechargeStore.updateAll({ rechargeAmount: payload.data.rechargeAmount });
      RechargeStore.trigger("change");
      break;
    default:
    //no op
  }
});

module.exports = RechargeStore;

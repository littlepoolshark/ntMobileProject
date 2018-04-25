var MicroEvent = require("../lib/microevent.js");
var appDispatcher = require("../dispatcher/dispatcher.js");
var ajax = require("../lib/ajax");
var cookie = require("../lib/cookie");

var UserHomeStore = {
  _all: {
    total: "----",
    totalProfit: "----",
    available: "----",
    hqAmount: "----",
    dqAmount: "----",
    hcCount: "--",
    tikectCount: "--",
    isVIPUser: false,
    sercuInfo: {},
    personInfo: {},
    bankCardInfo: {},
    zxcgOpenInfo: {}
  },
  getAll() {
    return this._all;
  },
  updateAll(source) {
    this._all = Object.assign(this._all, source);
  },
  checkIdCardVerifiedSet() {
    //检查是否已经实名认证
    return this._all.sercuInfo.idCardVerified === "yes" ? true : false;
  },
  checkDealPasswordSet() {
    //检查是否设置交易密码
    return this._all.sercuInfo.isDealPwdSet === "yes" ? true : false;
  },
  checkBankCardBind() {
    //检查是否已经绑定银行卡
    return this._all.bankCardInfo && this._all.bankCardInfo.bankId
      ? true
      : false;
  },
  checkBankCardIntegrity() {
    //检查银行卡信息是否完整（开户支行以及开户支行所在的省份和市区，）
    return (
      !!this._all.bankCardInfo &&
      !!this._all.bankCardInfo.branch &&
      !!this._all.bankCardInfo.parentAreaId &&
      !!this._all.bankCardInfo.region
    );
  },
  checkZXBankOpen() {
    let cgOpen = this._all.zxcgOpenInfo.cgOpen;
    return cgOpen === "1" || cgOpen === "3" ? true : false;
  }
};
MicroEvent.mixin(UserHomeStore);

UserHomeStore.dispatchToken = appDispatcher.register(function(payload) {
  switch (payload.actionName) {
    case "getInitailDataFromServer_userHome":
      ajax({
        ciUrl: "/user/v2/myUserInfo",
        success(rs) {
          if (rs.code === 0) {
            rs.data.isVIPUser = rs.data.investVip > 0 ? true : false;
            rs.data.iShowShareCouponEntry = rs.data.userShareCount > 0;
            UserHomeStore.updateAll(rs.data);
            UserHomeStore.trigger("change");
          } else {
            UserHomeStore.trigger("getDataFailed");
          }
        }
      });
      ajax({
        ciUrl: "/user/v2/securityCenter",
        success(rs) {
          if (rs.code === 0) {
            UserHomeStore.updateAll({
              zxcgOpenInfo: rs.data.zxcgOpenInfo
            });
            UserHomeStore.trigger("change");
          }
        }
      });
      break;
    case "getUserInfoDetail":
      ajax({
        ciUrl: "/user/v2/userInfoDetail",
        success(rs) {
          if (rs.code === 0) {
            _vds.push(["setCS2", "isNew", rs.data.personInfo.isNew]); //设置growingio的第二个字段
            _vds.push([
              "setCS3",
              "idCardVerified",
              rs.data.sercuInfo.idCardVerified
            ]); //设置growingio的第三个字段

            UserHomeStore.updateAll({
              sercuInfo: rs.data.sercuInfo,
              personInfo: rs.data.personInfo,
              accountInfo: rs.accountInfo
            });
            UserHomeStore.trigger("change");
          } else {
            UserHomeStore.trigger("getDataFailed");
          }
        }
      });
      break;
    case "getBankCardInfo":
      ajax({
        ciUrl: "/user/v2/myBankCardInfo",
        success(rs) {
          if (rs.code === 0) {
            UserHomeStore.updateAll({
              bankCardInfo: rs.data
            });
            UserHomeStore.trigger("change");
          } else {
            UserHomeStore.trigger("getDataFailed");
          }
        }
      });
      break;
    case "securityCheck":
      if (!UserHomeStore.checkZXBankOpen()) {
        UserHomeStore.trigger("ZXBankOpenCheckFailed");
      } else if (!UserHomeStore.checkDealPasswordSet()) {
        /*else if(!UserHomeStore.checkIdCardVerifiedSet()){
                UserHomeStore.trigger("idCardVerifiedCheckFailed");
            }*/ UserHomeStore.trigger(
          "dealPasswordSetCheckFailed"
        );
      } else {
        /*else if(!UserHomeStore.checkBankCardBind()){
                UserHomeStore.trigger("bindBankCardCheckFailed");
            }*/ switch (payload
          .data.operationName) {
          case "recharge":
            UserHomeStore.trigger("rechargeCheckSuccess");
            break;
          case "withdraw":
            UserHomeStore.trigger("withdrawCheckSuccess");
            break;
          case "dailyEarnIncomeExtract":
            UserHomeStore.trigger("dailyEarnIncomeExtractCheckSuccess");
            break;
          case "dailyEarnRollOut":
            UserHomeStore.trigger("dailyEarnRollOutCheckSuccess");
            break;
          case "transferDebt":
            UserHomeStore.trigger("transferDebtCheckSuccess");
            break;
          default:
            break;
        }
      }
      break;
    default:
    //no op
  }
});

module.exports = UserHomeStore;

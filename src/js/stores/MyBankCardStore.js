var MicroEvent = require("../lib/microevent.js");
var appDispatcher = require("../dispatcher/dispatcher.js");
var ajax = require("../lib/ajax.js");

var MyBankCardStore = {
  _all: {
    bankName: "",
    cardno: "",
    shortIcon: "", //银行logo图片在服务器的路径
    status: "",
    realName: "",
    idCardVerified: "no", //是否实名认证
    isBindCardAlready: false //是否已经绑卡到平安子账户
  },
  getAll() {
    return this._all;
  },
  checkForAddingBankCard() {
    return this._all.idCardVerified === "yes" ? true : false;
  },
  updateAll(source) {
    this._all = Object.assign(this._all, source);
  },
  clearAll() {
    this._all = {
      bankName: "",
      cardno: "",
      shortIcon: "",
      status: "",
      realName: "",
      idCardVerified: "no",
      isBindCardAlready: false
    };
  }
};
MicroEvent.mixin(MyBankCardStore);

appDispatcher.register(function(payload) {
  switch (payload.actionName) {
    case "getMyBankCardDetail_myBankCard":
      ajax({
        ciUrl: "/user/v2/myBankCardInfo",
        success(rs) {
          if (rs.code === 0) {
            MyBankCardStore.updateAll(rs.data);
            MyBankCardStore.trigger("change");
          }
        }
      });
      break;
    case "getUserAccountInfo_myBankCard":
      ajax({
        ciUrl: "/user/v2/userInfoDetail",
        success(rs) {
          if (rs.code === 0) {
            let personInfo = rs.data.personInfo;
            MyBankCardStore.updateAll({
              idCardVerified: rs.data.sercuInfo.idCardVerified,
              isSetDealPassword: rs.data.sercuInfo.isDealPwdSet,
              realName: personInfo.realName
            });
            MyBankCardStore.trigger("change");
          }
        }
      });
      ajax({
        ciUrl: "/user/v2/securityCenter",
        success(rs) {
          if (rs.code === 0) {
            let zxcgOpenInfo = rs.data.zxcgOpenInfo;
            MyBankCardStore.updateAll({
              leftQureyTime: zxcgOpenInfo.leftQureyTime,
              pacgOpenCode: zxcgOpenInfo.cgOpen,
              isBindCardAlready: zxcgOpenInfo.bankcardFlag === "1"
            });
            MyBankCardStore.trigger("change");
          }
        }
      });
      break;
    case "addBankCard_myBankCard":
      let validationResult = MyBankCardStore.checkForAddingBankCard();
      if (validationResult) {
        MyBankCardStore.trigger("BindCardCheckSuccess");
      } else {
        MyBankCardStore.trigger("BindCardCheckFailed");
      }
      break;
    case "unbindBankCard_myBankCard":
      ajax({
        ciUrl: "/user/v2/manager",
        data:{
          tranCode:'NETL03',
          channelType:'wx'
        },
        success(rs) {
          if (rs.code === 0) {
            let { action, orig, sign, returnurl, NOTIFYURL, wxurl } = rs.data;
            let nextLocation = `${wxurl}?action=${encodeURI(
                action
              )}&orig=${encodeURI(orig)}&sign=${encodeURI(
                sign
              )}&returnurl=${encodeURI(returnurl)}&NOTIFYURL=${encodeURI(
                NOTIFYURL
              )}`;
              MyBankCardStore.trigger("unbindBankCardSuccess",nextLocation);
          }else {
              MyBankCardStore.trigger("unbindBankCardFailed",rs.description);
          }
        }
      });
       break;
    default:
    //no op
  }
});

module.exports = MyBankCardStore;

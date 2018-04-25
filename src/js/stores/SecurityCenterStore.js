var MicroEvent = require("../lib/microevent.js");
var appDispatcher = require("../dispatcher/dispatcher.js");
var ajax = require("../lib/ajax");

var SecurityCenterStore = {
  _all: {
    mobileVerified: "yes",
    ispasswordSet: "yes",
    isDealPwdSet: "no",
    isBankCardBind: "no",
    isAuthorized: "no",
    idCardVerified: "no",
    emailVerified: "no",
    hadBindBankCard: "no",
    zxcgOpen: "no",
    leftQureyTime: 3,
    pacgOpenCode: ""
  },
  updateAll(source) {
    this._all = Object.assign(this._all, source);
  },
  checkDealPasswordSet() {
    return this._all.isDealPwdSet === "yes" ? true : false;
  },
  checkIdCardVerified() {
    return this._all.idCardVerified === "yes" ? true : false;
  },
  getAll() {
    return this._all;
  },
  clearAll() {
    this._all = {
      mobileVerified: "yes",
      ispasswordSet: "yes",
      isDealPwdSet: "no",
      isBankCardBind: "no",
      isAuthorized: "no",
      idCardVerified: "no",
      emailVerified: "no",
      hadBindBankCard: "no",
      zxcgOpen: "no",
      pacgOpenCode: ""
    };
  },
  calculateSecurityScore() {
    let basicScore,
      loginPasswordScore,
      dealPasswordScore,
      bankCardScore,
      permissionScore;
    let userScore = 0;
    basicScore =
      this._all.mobileVerified === "yes" && this._all.ispasswordSet === "yes"
        ? 25
        : 0;
    dealPasswordScore = this._all.isDealPwdSet === "yes" ? 25 : 0;
    bankCardScore = this._all.isBankCardBind === "yes" ? 25 : 0;
    bankCardScore = this._all.isBankCardBind === "yes" ? 25 : 0;
    permissionScore = this._all.isAuthorized === "yes" ? 25 : 0;
    userScore =
      basicScore + dealPasswordScore + bankCardScore + permissionScore;

    return userScore;
  }
};
MicroEvent.mixin(SecurityCenterStore);

appDispatcher.register(function(payload) {
  switch (payload.actionName) {
    case "getSecurityInfoFromServer_securityCenter":
      ajax({
        ciUrl: "/user/v2/userInfoDetail",
        success(rs) {
          if (rs.code === 0) {
            let personInfo = rs.data.personInfo;
            SecurityCenterStore.updateAll(
              Object.assign({
                mobile: personInfo.mobile,
                zxcgOpen: personInfo.zxcgOpen,
                istempuser: personInfo.istempuser
              })
            );
            if (SecurityCenterStore.checkIdCardVerified()) {
              SecurityCenterStore.updateAll({
                idcard: rs.data.personInfo.idcard,
                realName: rs.data.personInfo.realName
              });
            }
            SecurityCenterStore.trigger("change");
          } else {
            console.log(rs.description);
          }
        }
      });
      ajax({
        ciUrl: "/user/v2/securityCenter",
        success(rs) {
          let zxcgOpenInfo = rs.data.zxcgOpenInfo;
          if (rs.code === 0) {
            SecurityCenterStore.updateAll({
              isDealPwdSet: zxcgOpenInfo.passwordFlag === "1" ? "yes" : "no",
              isBankCardBind: zxcgOpenInfo.bankcardFlag === "1" ? "yes" : "no",
              isAuthorized: zxcgOpenInfo.permissionFlag === "1" ? "yes" : "no",
              hadBindBankCard: rs.data.bankInfo.bankCardVerified,
              leftQureyTime: zxcgOpenInfo.leftQureyTime,
              pacgOpenCode: zxcgOpenInfo.cgstatus,
              pamobile:rs.data.mobileVerifyInfo.pamobile
            });
            SecurityCenterStore.trigger("change");
          }
        }
      });
      break;
    case "checkIDCard_securityCenter":
      if (SecurityCenterStore.checkIdCardVerified()) {
        SecurityCenterStore.trigger("checkIdCardVerifiedSuccess");
      } else {
        SecurityCenterStore.trigger("checkIdCardVerifiedFailed");
      }
    default:
    //no op
  }
});

module.exports = SecurityCenterStore;

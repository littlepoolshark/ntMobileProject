var MicroEvent = require("../lib/microevent.js");
var appDispatcher = require("../dispatcher/dispatcher.js");
var ajax = require("../lib/ajax.js");
var cookie = require("../lib/cookie");

var upgradeToPABankStore = {
  _all: {
    isNewbie: false, //是否是新注册到农泰平台的用户
    isBindCardToPABank: false,
    loanerType: "",
    realName: "",
    enterpriseName: "",
    legalPersonName: "",
    idcard: "",
    socialCreditCode: "",
    bankId: "",
    bankName: "",
    bankCardNo: "",
    userPhoneNo: "",
    provinceText: "广东",
    cityText: "深圳市",
    subbranchBankName: "",
    subbranchBankId: "",
    IDType:'统一社会信用代码'
  },
  trimCardNo(cardNo) {
    cardNo = cardNo + "";
    return cardNo.replace(/\s+/g, "");
  },
  checkForm() {
    let validationResult = {
      success: true,
      msg: ""
    };

    let {
      realName,
      idcard,
      bankId,
      bankName,
      bankCardNo,
      userPhoneNo,
      provinceText,
      cityText,
      subbranchBankName,
      subbranchBankId
    } = this._all;

    bankCardNo = this.trimCardNo(bankCardNo); //去除格式化加入的空格

    if (realName === "") {
      validationResult = {
        success: false,
        msg: "真实姓名不能为空，请输入"
      };
    } else if (!/^[\u4e00-\u9fa5]+$/i.test(realName)) {
      validationResult = {
        success: false,
        msg: "姓名只能是中文字符，请检查"
      };
    } else if (realName.length > 10) {
      validationResult = {
        success: false,
        msg: "姓名不能超过10个字符，请重新输入"
      };
    } else if (idcard === "") {
      validationResult = {
        success: false,
        msg: "身份证号码不能为空，请输入"
      };
    } else if (bankId === "") {
      validationResult = {
        success: false,
        msg: "开户银行不能为空，请选择"
      };
    } else if (bankCardNo === "") {
      validationResult = {
        success: false,
        msg: "银行卡号不能为空，请输入"
      };
    } else if (bankCardNo.length > 20 || bankCardNo.length < 13) {
      validationResult = {
        success: false,
        msg: "银行卡号长度有误，请检查"
      };
    } else if (!/^\d+$/g.test(bankCardNo)) {
      validationResult = {
        success: false,
        msg: "银行卡号格式有误，请检查"
      };
    } else if (provinceText === "" || cityText === "") {
      validationResult = {
        success: false,
        msg: "开户行地区不能为空，请选择"
      };
    } else if (subbranchBankName === "" || subbranchBankId === "") {
      validationResult = {
        success: false,
        msg: "开户支行不能为空，请选择"
      };
    } else if (userPhoneNo === "") {
      validationResult = {
        success: false,
        msg: "手机号码不能为空，请输入"
      };
    } else if (!/1\d{10}$/i.test(userPhoneNo)) {
      validationResult = {
        success: false,
        msg: "手机号码格式有误，请检查"
      };
    }

    return validationResult;
  },
  mapCodeToLoanerType(code) {
    let mapCodeToLoanerType = {
      "1": "企业",
      "2": "个人",
      "0": "个人" //“0”代表新注册的用户，未知其用户类型，但是根据产品需求，默认其为“个人”
    };
    return mapCodeToLoanerType[code];
  },
  getAll() {
    return this._all;
  },
  updateAll(source) {
    this._all = Object.assign(this._all, source);
  },
  clearAll() {
    this._all = {
      isBindCardToPABank: false,
      loanerType: "",
      realName: "",
      enterpriseName: "",
      legalPersonName: "",
      idcard: "",
      socialCreditCode: "",
      bankId: "",
      bankName: "",
      bankCardNo: "",
      userPhoneNo: "",
      provinceText: "广东",
      cityText: "深圳市",
      subbranchBankName: "",
      subbranchBankId: "",
      IDType:'统一社会信用代码'
    };
  }
};
MicroEvent.mixin(upgradeToPABankStore);

appDispatcher.register(function(payload) {
  switch (payload.actionName) {
    case "getInitialData_upgradeToPABank":
      ajax({
        ciUrl: "/user/v2/securityCenter",
        success(rs) {
          if (rs.code === 0) {
            let cgOpenInfo = rs.data.zxcgOpenInfo;
            let mobileVerifyInfo = rs.data.mobileVerifyInfo;
            let {
              userType,
              realNameFull,
              corporation,
              idcardFull
            } = rs.data.idCardVerifyInfo;
            let loanerType = upgradeToPABankStore.mapCodeToLoanerType(userType);

            let {
              bankCardnoFull,
              bankId,
              bankName,
              branch,
              bankCode,
              provinname,
              cityname
            } = rs.data.bankInfo;

            upgradeToPABankStore.updateAll({
              isNewbie: cgOpenInfo.cgstatus === "0",//cgOpenInfo.cgstatus为“0”原意是没有开通平安子账户，在这里几乎等同于“新注册用户”的意思。
              isBindCardToPABank: cgOpenInfo.bankcardFlag === "1",
              loanerType: loanerType,
              realName: userType === "2" ? realNameFull : "",
              enterpriseName: userType === "1" ? realNameFull : "",
              legalPersonName: corporation,
              idcard: idcardFull,
              bankId: bankId,
              bankName: bankName,
              bankCardNo: bankCardnoFull,
              userPhoneNo: mobileVerifyInfo.mobileFull,
              provinceText: provinname,
              cityText: cityname,
              subbranchBankName: branch,
              subbranchBankId: bankCode
            });
            upgradeToPABankStore.trigger("change");
            upgradeToPABankStore.trigger(
              "viewChange",
              loanerType === "个人" ? "index_person" : "index_enterprise"
            );
          }
        }
      });
      break;
    case "changeFieldValue_upgradeToPABank":
      let source = {};
      source[payload.data.fieldName] = payload.data.fieldValue;
      upgradeToPABankStore.updateAll(source);
      upgradeToPABankStore.trigger("change");
      break;
    case "submitPasswordSettingForm_upgradeToPABank":
    case "submitBankCardBindingForm_upgradeToPABank":
    case "submitRegisterForm_upgradeToPABank":
      let validationResult = upgradeToPABankStore.checkForm();
      if (validationResult.success) {
        let {
          loanerType,
          realName,
          enterpriseName,
          legalPersonName,
          idcard,
          socialCreditCode,
          bankId,
          bankName,
          bankCardNo,
          userPhoneNo,
          provinceText,
          cityText,
          subbranchBankName,
          subbranchBankId,
          IDType
        } = upgradeToPABankStore.getAll();
        
        let mapFormNameToTranCode={
          'passwordForm':'NETL23',
          'bankCardForm':'NETL05',
          'registerForm':'NETL01'
        }

        let mapIDTypeToCode={
          '统一社会信用代码':'73',
          '组织机构代码':'52'
        }


        let formData = {
          tranCode:mapFormNameToTranCode[payload.data.formName],
          name: loanerType === "个人" ? realName : legalPersonName,
          companyname: enterpriseName,
          hyType: loanerType === "个人" ? "2" : "1",
          idType: loanerType === "个人" ? "1" : mapIDTypeToCode[IDType], //"1"代表居民身份证，“73”代表统一社会信用代码
          idNo: loanerType === "个人" ? idcard : socialCreditCode,
          accNo: bankCardNo,
          type: bankId,
          OutAcctIdProName: provinceText,
          OutAcctIdCitydName: cityText,
          BankName: bankName,
          BankCode: subbranchBankId,
          mobile: userPhoneNo,
          channelType: "wx",
          role:'1'
        };

        upgradeToPABankStore.trigger("registerRequestIsStarting");
        ajax({
          ciUrl: "/user/v2/manager",
          data: formData,
          success(rs) {
            if (rs.code === 0) {
              let { action, orig, sign, returnurl, NOTIFYURL, wxurl } = rs.data;
              //使用ios微信内置浏览器通过ip地址访问外网的时候，会被微信浏览器拦截到微信的安全官网，
              //因此我们中转页面只能放置到我们线上的服务器，并通过域名来访问。
              //但是很快我们就遭遇了一个问题，
              //那就是通过url带参（形如：https:www.ntjrchina.com/中转页面.html?action=xxx&orig=xxx...）来访问中转页面没有成功，而是被服务器重定向到根目录下面了
              //估计是后台返回的加密字符串中含有某些特殊转义字符（ 如：?!=()#%&等等），而这些特殊字符没有经过处理，我们是不能得到预期结果的。
              //经过后台人员的提醒，使用encodeURI全局方法进行编码后，方能正常访问
              //解决方案的灵感来源于：https://www.cnblogs.com/duanxz/archive/2013/01/11/2855870.html
              let nextLocation = `${wxurl}?action=${encodeURI(
                action
              )}&orig=${encodeURI(orig)}&sign=${encodeURI(
                sign
              )}&returnurl=${encodeURI(returnurl)}&NOTIFYURL=${encodeURI(
                NOTIFYURL
              )}`;

              upgradeToPABankStore.trigger(
                "getNextLocationInfoSuccess",
                nextLocation
              );
            } else {
              upgradeToPABankStore.trigger(
                "submitRegisterFormFailed",
                validationResult.msg
              );
            }
          },
          error:() => {
            upgradeToPABankStore.trigger("registerRequestIsEnd");
          }
        });
      } else {
        upgradeToPABankStore.trigger(
          "submitRegisterFormFailed",
          validationResult.msg
        );
      }

      break;
    default:
    //no op
  }
});

module.exports = upgradeToPABankStore;

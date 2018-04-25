let MicroEvent = require("../lib/microevent.js");
let appDispatcher = require("../dispatcher/dispatcher.js");
let ajax = require("../lib/ajax.js");

let FixedLoanIntroductionStore = {
  _all: {
    id: "",
    type: "loan_product",
    productApr: 0,
    buyProgress: 0,
    remainAmount: 0,
    repaymentLimit: 0,
    repaymentTypeUnit: "个月",
    totalAmount: 0,
    productName: "",
    bidDays: 0,
    publishTime: 0, //这个值应该是数字类型的时间戳
    status: "",
    isZXProduct: false, //是不是中信标的
    riskLevel: "A", //风险评级
    riskLevelScore: [100, 100, 100, 100, 100, 100], //风险分数，依次是"资产状况", "担保情况", "资金保障", "还款保障", "信用历史", "认证信息"
    applyNum: 0, //申请笔数
    unpaidNum: 0, //成功借款笔数
    paidNum: 0, //还清笔数,
    overdueMoney: 0, //逾期未还的金额
    attachments: [], //用于认证的附件信息列表
    saleMoney: 0, //销售额,单位元
    plantArea: 0, //种植面积，单位亩
    regFound: 0, //注册资金
    car: "empty", //	empty:空，no:没有,ycwd:有车无贷款，ycyd：有车有贷
    house: "empty", //empty:空，no:没有,yfwd:有房无贷，yfyd：有房有贷
    licenseType: "person", //借款人身份，person：个人，enterprise：企业机构
    dbcs: "", //担保措施
    dbjg: "", //担保机构
    plantingDuration: 0, //经营年限
    repayType: "xxhb" //还款方式，oneOf["xxhb","debx"],分别代表“先息后本”和“等额本息”
  },
  updateAll(source) {
    Object.assign(this._all, source);
  },
  getAll() {
    return this._all;
  },
  extractLicenseListAndUpdate(list) {
    let arr = [];
    for (let i = 0; i < list.length; i++) {
      if (arr.indexOf(list[i].typeName) === -1) {
        arr.push(list[i].typeName);
      }
    }
    this._all.licenseList = arr;
  },
  extractGuaranteeLicenseListAndUpdate(data) {
    let guaranteeLicenseList = [];
    let guaranteeLabelList = [];
    if (data.hasOwnProperty("idCard") && data.idCard !== "") {
      guaranteeLicenseList.push("担保人身份证");
    }
    if (data.hasOwnProperty("licenceCode") && data.licenceCode !== "") {
      guaranteeLicenseList.push("担保人营业执照");
    }
    for (let i = 0; i < data.introductionList.length; i++) {
      let labelText = data.introductionList[i].label;
      if (
        ["担保情况", "担保企业", "担保措施", "担保情况："].indexOf(labelText) >
        -1
      ) {
        guaranteeLabelList.push(data.introductionList[i]);
      }
    }
    Object.assign(this._all, {
      guaranteeLicenseList: guaranteeLicenseList,
      guaranteeLabelList: guaranteeLabelList
    });
  },
  processData(data) {
    data.buyProgress = data.buyProgress + "%";
    data.productApr = (data.productApr * 100).toFixed(1);
    data.remainAmount = data.remainAmount.toFixed(2);
    return data;
  }
};
MicroEvent.mixin(FixedLoanIntroductionStore);

appDispatcher.register(function(payload) {
  switch (payload.actionName) {
    case "fixedLoanIntroduction_getDataFromServer":
      ajax({
        ciUrl: "/invest/v2/loanInvestDetail",
        data: {
          loanId: payload.data.productId
        },
        success: function(rs) {
          if (rs.code === 0) {
            let data = rs.data;
            let source = {
              id: data.id,
              type: "loan_product",
              productApr: data.yearRate,
              buyProgress: data.proess,
              remainAmount: data.remainAmount,
              repaymentLimit: data.repaymentMonths,
              repaymentTypeUnit: data.loanTypeUnit,
              totalAmount: data.amount,
              productName: data.title,
              status: data.status,
              bidDays: data.bidDays,
              publishTime: data.publishTimeL,
              sysCurrentTime: data.sysCurrentTime,
              rewardRate: data.rewardRate,
              useDesc: data.useDesc,
              isSupportAdvanceRepayment:
                data.isSupportAdvanceRepayment === "yes" ? true : false,
              isZXProduct: data.isZx === "yes" ? true : false,
              vipRaiseRate: data.vipRaiseRate || 0,
              repayType: data.repayType
            };
            FixedLoanIntroductionStore.updateAll(
              FixedLoanIntroductionStore.processData(source)
            );
            FixedLoanIntroductionStore.trigger("change");

            //获取总的资质信息
            ajax({
              ciUrl: "/invest/v2/loanExtAttatchmentInfo",
              data: {
                loanId: payload.data.productId,
                status: data.status
              },
              success: function(rs) {
                if (rs.code === 0) {
                  FixedLoanIntroductionStore.extractLicenseListAndUpdate(
                    rs.data.list
                  );
                  FixedLoanIntroductionStore.trigger("change");
                }
              }
            });

            //获取担保人资质信息
            ajax({
              ciUrl: "/invest/v2/loanExtWarrantInfo",
              data: {
                loanId: payload.data.productId,
                orgId: data.warrantOrg
              },
              success: function(rs) {
                if (rs.code === 0) {
                  FixedLoanIntroductionStore.extractGuaranteeLicenseListAndUpdate(
                    rs.data
                  );
                  FixedLoanIntroductionStore.trigger("change");
                }
              }
            });
          } else {
            FixedLoanIntroductionStore.trigger("getDataFailed");
          }
        }
      });
      //获取标的借款人信息
      ajax({
        ciUrl: "/invest/v2/loanExtPersonalInfo",
        data: {
          bidId: payload.data.productId
        },
        success: function(rs) {
          if (rs.code === 0) {
            if (rs.data.hasOwnProperty("enterprise")) {
              FixedLoanIntroductionStore.updateAll({
                licenseType: "enterprise",
                companyName: rs.data.enterprise.companyName,
                corporation: rs.data.enterprise.corporation,
                loanDescr: rs.data.loanDescr,
                repaymentSource: rs.data.remark
              });
            } else {
              FixedLoanIntroductionStore.updateAll({
                licenseType: "person",
                realName: rs.data.realName,
                marriedDescr: rs.data.marriedDescr,
                genderDescr: rs.data.genderDescr,
                age: rs.data.age,
                loanDescr: rs.data.loanDescr,
                repaymentSource: rs.data.remark
              });
            }

            FixedLoanIntroductionStore.trigger("change");
          }
        }
      });

      //获取风险控制tab页所需的所有数据
      ajax({
        ciUrl: "/invest/v2/getLoanRiskDetail.do",
        data: {
          loanId: payload.data.productId
        },
        success: function(rs) {
          if (rs.code === 0) {
            let data = rs.data;
            let attachments = data.attachments
              ? data.attachments.split(",")
              : [];
            let riskLevelScore = [
              data.zcScore,
              data.dbScore,
              data.zjScore,
              data.hkScore,
              data.xyScore,
              data.rzScore
            ]; //风险分数，依次是"资产状况", "担保情况", "资金保障", "还款保障", "信用历史", "认证信息"
            FixedLoanIntroductionStore.updateAll({
              riskLevel: data.grade,
              riskLevelScore: riskLevelScore,
              applyNum: data.applyNum,
              unpaidNum: data.unpaidNum,
              paidNum: data.paidNum,
              overdueMoney: data.overdueMoney,
              attachments: attachments,
              saleMoney: data.saleMoney,
              plantArea: data.plantArea,
              regFound: data.regFound,
              car: data.car,
              house: data.house,
              dbcs: data.dbcs,
              dbjg: data.dbjg,
              plantingDuration: data.plantingDuration || 0
            });
            FixedLoanIntroductionStore.trigger("change");
          }
        }
      });
      break;
    default:
    //no op
  }
});

module.exports = FixedLoanIntroductionStore;

var MicroEvent = require("../lib/microevent.js");
var appDispatcher = require("../dispatcher/dispatcher.js");
var ajax = require("../lib/ajax.js");

var RepaymentScheduleStore = {
  _all: {
    loanInfo: {},
    list: [],
    isOpenPACG:false
  },
  getAll() {
    return this._all;
  },
  clearAll() {
    this._all = {
      loanInfo: {},
      list: []
    };
  },
  updateAll(source) {
    this._all = Object.assign(this._all, source);
  }
};
MicroEvent.mixin(RepaymentScheduleStore);

appDispatcher.register(function(payload) {
  switch (payload.actionName) {
    case "getOpenPACGInfo_rs":
      ajax({
        ciUrl:"/user/v2/securityCenter",
        success(rs){
            if(rs.code === 0){
              let cgOpen=rs.data.zxcgOpenInfo.cgOpen;
              RepaymentScheduleStore.updateAll({
                  isOpenPACG:cgOpen === "1" ||  cgOpen === "3"
                });
              RepaymentScheduleStore.trigger("change");
            }
        }
      });
      break;
    case "getRepaymentScheduleData":
      let { loanId, creditorId, productType } = payload.data;


      function processSummaryDataOfLoan(itemObj,productType) {
        let newItemObj = {};
        let {
          title,
          repaymentMonths,
          inverstAmount,
          cur_period_no,
          curRate,
          interestRate,
          vipRate,
          dsbx,
          ysbx,
          rewardRate,
          isTransfed,
          holdingDays,//针对分段式等额本金，持有天数
          arrearsAmount,//剩余本金
          repaymentType,//还款方式
          repaymentPeriod,//还款周期//twin双月还，season季季还
          isOld,
          isOldCredit,
          pType,
          borrowAgreement,
          dutyAgreement,
          dutyCedAgreement,
          creditAgreement
        } = itemObj;

        newItemObj = {
          title: title,
          repaymentMonth: repaymentMonths,
          apr: curRate, //标的基本（发标）利率
          rewardRate: rewardRate || 0, //标的奖励利率
          interestRate: interestRate, //用户所用的加息券利率
          VIPRate: vipRate || 0,
          yjbx: ysbx,
          dsbx: dsbx,
          qsNum: cur_period_no + "/" + repaymentMonths,
          investMoney: inverstAmount,
          isAllowToTransfer: isTransfed === undefined || isTransfed === true, //是否允许债权转让(isTransfed的值等于undefined对应的是后台没有返回该字段，主要发生在测试环境下)
          holdingDays,//针对分段式等额本金，持有天数
          arrearsAmount,//剩余本金
          repaymentType,//还款方式
          repaymentPeriod,//还款周期//twin双月还，season季季还
          isOldProduct:(productType !== "creditor_product" && isOld === "0") || (productType === "creditor_product" && isOldCredit === "0"),//是否是电子签章功能上线前的项目
          isCreditorProduct:productType === "creditor_product",//是不是债权转让项目
          isCedProduct:pType === 'ced',//债权转让前的产品类型或者目前的产品类型是ced
          agreementList:[
            {
              name:'借款协议',
              url:borrowAgreement
            },
            {
              name:'连带责任保证书',
              url:dutyAgreement
            }
          ]
        };

        if(productType === "creditor_product"){
          newItemObj.agreementList.splice(1,0,{
            name:'债权转让协议',
            url:creditAgreement
          })
        }

        if(pType === 'ced' || productType === "ced" ){
          newItemObj.agreementList.push({
            name:'连带责任保证书（通用版）',
            url:dutyCedAgreement
          })
        }

        return newItemObj;
      }

      function processListDataOfLoan(list) {
        let newList = [];
        newList = list.map((item, index) => {
          let {
            expectRepayTime,
            periodNum,
            curRate,
            principal,
            realInterest,
            interestAmount,
            real_repay_time,
            status,
            interestRate
          } = item;
          return {
            expectRepayTimeString: expectRepayTime,
            realRepayTimeString: real_repay_time || "",
            interest: realInterest + (interestAmount || 0),
            periodNo: periodNum,
            principal: principal,
            status: status
          };
        });
        return newList;
      }
      ajax({
        ciUrl: "/forever/v2/getUserProRepayDetail.do",
        data: {
          joinId:
            ["loan_product", "creditor_product", "glj", "ced","nyd"].indexOf(
              productType
            ) > -1
              ? creditorId
              : loanId,
          productType: productType
        },
        success(rs) {
          if (rs.code === 0) {
            RepaymentScheduleStore.updateAll({
              loanInfo: Object.assign({
                  loanId, creditorId, productType 
                },
                processSummaryDataOfLoan(rs.data.calData,productType)
              ),
              list: !!rs.data.dataList
                ? processListDataOfLoan(rs.data.dataList)
                : []
            });
            RepaymentScheduleStore.trigger("change");
          }
        }
      });
      break;
    case "transferDebtCheck_rs":
      if(RepaymentScheduleStore.getAll().isOpenPACG){
        RepaymentScheduleStore.trigger("transferDebtCheckSuccess");
      }else {
        RepaymentScheduleStore.trigger("ZXBankOpenCheckFailed");
      }
    break;
    default:
    //no op
  }
});

module.exports = RepaymentScheduleStore;

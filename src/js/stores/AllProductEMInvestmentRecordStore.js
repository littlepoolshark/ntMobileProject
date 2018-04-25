var MicroEvent = require("../lib/microevent.js");
var appDispatcher = require("../dispatcher/dispatcher.js");
var ajax = require("../lib/ajax.js");

import config from "../config";

var AllProductEMInvestmentRecordStore = {
  _all: {
    currProductType: "all", //当前视图中产品类型，oneOf（all,yyz_product,jjz_product,rich,loan_product,creditor_product,new_product）
    currListType: "hold", //当前视图中列表的类型,oneOf(apply（加入中）、hold（回款中）、success（已结清）)
    allList: [],
    allListPageIndex: 0,
    applyList: [],
    applyListPageIndex: 0,
    holdList: [],
    holdListPageIndex: 0,
    successList: [],
    successPageIndex: 0
  },
  getAll() {
    return this._all;
  },
  clearAll() {
    this._all = {
      currProductType: "all",
      currListType: "hold",
      allList: [],
      allListPageIndex: 0,
      applyList: [],
      applyListPageIndex: 0,
      holdList: [],
      holdListPageIndex: 0,
      successList: [],
      successPageIndex: 0
    };
  },
  updateList(actionType, listType, list, pageIndex) {
    switch (actionType) {
      case "paging":
        this._all[listType + "List"] = this._all[listType + "List"].concat(
          list
        );
        this._all[listType + "ListPageIndex"] = pageIndex;
        break;
      case "filter":
        this._all[listType + "List"] = list;
        this._all[listType + "ListPageIndex"] = pageIndex;
        break;
      default:
        break;
    }
  },
  getPageIndexByListType(listType) {
    return this._all[listType + "ListPageIndex"];
  },
  updateAll(source) {
    this._all = Object.assign({}, this._all, source);
  }
};
MicroEvent.mixin(AllProductEMInvestmentRecordStore);

appDispatcher.register(function(payload) {
  let {
    currProductType,
    currListType
  } = AllProductEMInvestmentRecordStore.getAll();

  function processList(list, pageIndex, productType) {
    let newList = [];

    let mapStatusToInvestStatus = {
      apply: "applying",
      hold: "repaying",
      success: "clearing"
    };

    function formatTimeStamp(timeStamp) {
      let year = new Date(timeStamp).getFullYear();
      let month =
        new Date(timeStamp).getMonth() + 1 < 10
          ? "0" + (new Date(timeStamp).getMonth() + 1)
          : new Date(timeStamp).getMonth() + 1;
      let date =
        new Date(timeStamp).getDate() < 10
          ? "0" + new Date(timeStamp).getDate()
          : new Date(timeStamp).getDate();

      return year + "-" + month + "-" + date;
    }

    if (list.length) {
      newList = list.map(function(item, index) {
        return {
          id: pageIndex * (productType === "all" ? 51 : 10) + index, //产生一个唯一标识这条记录的id
          productId: item.productId,
          productType: item.productType,
          purchaseId: item.id,
          loanId: item.loanIds,
          creditorId: item.creId,
          title: item.productTitle,
          investAmount: item.principal,
          dueInPrincipalAndInterest:
            item.status === "success"
              ? item.bxTotal
              : item.dsbx ? item.dsbx.toFixed(2) : 0, //如果该笔投资是已还清的话，取bxTotal字段
          investStatus: mapStatusToInvestStatus[item.status],
          yearRate: item.rate + "%",
          rewardRate:
            item.rewardRate && parseFloat(item.rewardRate)
              ? item.rewardRate + "%"
              : 0,
          vipRaiseRate:
            item.vipRaiseRate && parseFloat(item.vipRaiseRate)
              ? item.vipRaiseRate + "%"
              : 0,
          interestRate:
            item.interestRate && parseFloat(item.interestRate)
              ? item.interestRate + "%"
              : 0,
          redPackageAmount: item.redAmount ? item.redAmount : 0,
          deadline:
            item.status === "hold"
              ? item.curPeriod + "/" + item.totalPeriod + "期"
              : "",
          status: item.status,
          creId: item.creId,
          time:
            item.status === "success"
              ? item.repayDateL ? formatTimeStamp(item.repayDateL) : "----"
              : item.nextRepayDateL
                ? formatTimeStamp(item.nextRepayDateL)
                : "----",
          repaymentType: item.repayType,
          buy_progress: item.progress ? item.progress : 0,
          interestMonth: item.interestMonth//加息券的加息期
        };
      });
    }
    return newList;
  }

  function loadListAndUpdate(actionType, productType, listType, pageIndex) {
    ajax({
      ciUrl: "/invest/v2/dqlcDetail.do",
      data: {
        productType: productType,
        status: listType,
        reqPageNum: pageIndex + ""
      },
      success(rs) {
        if (rs.code === 0) {
          let newList = processList(
            rs.data.list,
            rs.data.pageIndex,
            productType
          );
          let newPageIndex = rs.data.pageIndex;
          AllProductEMInvestmentRecordStore.updateList(
            actionType,
            listType,
            newList,
            newPageIndex
          );
          AllProductEMInvestmentRecordStore.updateAll({
            currProductType: productType
          });
          AllProductEMInvestmentRecordStore.trigger("change");
        }
      }
    });
  }

  switch (payload.actionName) {
    case "getInitialData_allProductEMInvestmentRecord":
      loadListAndUpdate("paging", payload.data.productType, "apply", 1);
      loadListAndUpdate("paging", payload.data.productType, "hold", 1);
      loadListAndUpdate("paging", payload.data.productType, "success", 1);
      break;
    case "toggleListType_allProductEMInvestmentRecord":
      AllProductEMInvestmentRecordStore.updateAll({
        currListType: payload.data.listType
      });
      break;
    case "queryProductListByType_allProductEMInvestmentRecord":
      loadListAndUpdate("filter", payload.data.productType, "apply", 1);
      loadListAndUpdate("filter", payload.data.productType, "hold", 1);
      loadListAndUpdate("filter", payload.data.productType, "success", 1);
      break;
    case "getNextPage_allProductEMInvestmentRecord":
      let requestPageIndex =
        AllProductEMInvestmentRecordStore.getPageIndexByListType(currListType) +
        1;
      loadListAndUpdate(
        "paging",
        currProductType,
        currListType,
        requestPageIndex
      );
      break;
    default:
    //no op
  }
});

module.exports = AllProductEMInvestmentRecordStore;

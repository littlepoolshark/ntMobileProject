var MicroEvent = require("../lib/microevent.js");
var appDispatcher = require("../dispatcher/dispatcher.js");
var ajax = require("../lib/ajax.js");

var InvestmentRecordStore = {
  _all: {
    list: []
  },
  getAll() {
    return this._all;
  },
  updateAll(source) {
    this._all.list = this._all.list.concat(source);
  },
  getCurrentPageIndex() {
    return this._all.pageIndex;
  },
  clearAll() {
    this._all.list = [];
  }
};
MicroEvent.mixin(InvestmentRecordStore);

appDispatcher.register(function(payload) {
  switch (payload.actionName) {
    case "loadNextPage_new_product":
    case "loadNextPage_ttz_product":
    case "loadNextPage_yyz_product":
    case "loadNextPage_jjz_product":
      ajax({
        ciUrl: "/invest/v2/earnInvestRecords",
        data: {
          regularId: payload.data.productId,
          type: payload.data.type
        },
        success: function(rs) {
          if (rs.code === 0) {
            InvestmentRecordStore.updateAll(rs.data.list);
            InvestmentRecordStore.trigger("change");
          } else {
            InvestmentRecordStore.trigger("getDataFailed");
          }
        }
      });
      break;
    case "loadNextPage_loan_product":
    case "loadNextPage_glj":
    case "loadNextPage_ced":
    case "loadNextPage_nyd":
      ajax({
        ciUrl: "/invest/v2/loanExtInvestRecordList_v2",
        data: {
          loanId: payload.data.productId,
          reqPageNum: 1,
          maxResults: 100
        },
        success: function(rs) {
          if (rs.code === 0) {
            InvestmentRecordStore.updateAll(rs.data.list);
            InvestmentRecordStore.trigger("change");
          } else {
            InvestmentRecordStore.trigger("getDataFailed");
          }
        }
      });
      break;
    case "loadNextPage_creditor_product":
      ajax({
        ciUrl: "/invest/v2/creditorTradeRecords",
        data: {
          creditorId: payload.data.productId,
          reqPageNum: 1,
          maxResults: 100
        },
        success: function(rs) {
          if (rs.code === 0) {
            InvestmentRecordStore.updateAll(rs.data.list);
            InvestmentRecordStore.trigger("change");
          } else {
            InvestmentRecordStore.trigger("getDataFailed");
          }
        }
      });
      break;
    case "loadNextPage_rich":
    case "loadNextPage_moon":
      ajax({
        ciUrl: "/forever/v2/prosUserJoinList.do",
        data: {
          productId: payload.data.productId,
          reqPageNum: 1,
          maxResults: 100
        },
        success: function(rs) {
          if (rs.code === 0) {
            InvestmentRecordStore.updateAll(rs.data.list);
            InvestmentRecordStore.trigger("change");
          } else {
            InvestmentRecordStore.trigger("getDataFailed");
          }
        }
      });
      break;
    case "clearAllStoreData":
      InvestmentRecordStore.clearAll();
      break;
    default:
    //no op
  }
});

module.exports = InvestmentRecordStore;

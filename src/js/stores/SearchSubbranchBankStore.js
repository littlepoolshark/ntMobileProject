var MicroEvent = require("../lib/microevent.js");
var appDispatcher = require("../dispatcher/dispatcher.js");
var ajax = require("../lib/ajax.js");

var SearchSubbranchBankStore = {
  _all: {
    subbranchBankList: [],
    keyWord: ""
  },
  getAll() {
    return this._all;
  },
  updateAll(source) {
    this._all = Object.assign({}, this._all, source);
  },
  clearAll() {
    this._all = {
      subbranchBankList: [],
      keyWord: ""
    };
  }
};
MicroEvent.mixin(SearchSubbranchBankStore);

appDispatcher.register(function(payload) {
  switch (payload.actionName) {
    case "deleteKeyWord_ssb":
      SearchSubbranchBankStore.updateAll({
        keyWord: ""
      });
      SearchSubbranchBankStore.trigger("change");
      break;
    case "searchSubbranchBank_ssb":
      let { keyWord } = SearchSubbranchBankStore.getAll();

      let { cityId, bankId } = payload.data;

      SearchSubbranchBankStore.trigger("requestIsStarting");
      ajax({
        ciUrl: "/user/v2/manager",
        data: {
          functionID: "common.getBankInfoByCityAndArea",
          cityCode: cityId,
          area: keyWord,
          bankCode: String(bankId)
        },
        success(rs) {
          SearchSubbranchBankStore.trigger("requestIsEnd");
          if (rs.code === 0) {
            let newSubbranchBankList = rs.data.list.map(function(item, index) {
              return {
                text: item.bankname,
                id: item.bankno
              };
            });
            SearchSubbranchBankStore.updateAll({
              subbranchBankList: newSubbranchBankList
            });
            SearchSubbranchBankStore.trigger("searchSuccess");
          } else {
            SearchSubbranchBankStore.trigger("noSearchResult");
          }
        },
        timeout() {
          SearchSubbranchBankStore.trigger("requestIsEnd");
        },
        error: () => {
          SearchSubbranchBankStore.trigger("requestIsEnd");
        }
      });
      break;
    case "searchBankNameForEnterprise_ssb":
      SearchSubbranchBankStore.trigger("requestIsStarting");
      ajax({
        ciUrl: "/user/v2/bankInfo",
        data: {
          bankname: payload.data.keyWord
        },
        success: rs => {
          SearchSubbranchBankStore.trigger("requestIsEnd");
          if (rs.code === 0) {
            let result = rs.data.list.map(function(item, index) {
              return {
                text: item.name,
                id: item.id
              };
            });
            SearchSubbranchBankStore.updateAll({
              subbranchBankList: result
            });
            SearchSubbranchBankStore.trigger("searchSuccess");
          } else {
            SearchSubbranchBankStore.trigger("noSearchResult");
          }
        },
        timeout() {
          SearchSubbranchBankStore.trigger("requestIsEnd");
        },
        error: () => {
          SearchSubbranchBankStore.trigger("requestIsEnd");
        }
      });
      break;
    case "changeFieldValue_ssb":
      let source = {};
      source[payload.data.fieldName] = payload.data.fieldValue;
      SearchSubbranchBankStore.updateAll(source);
      SearchSubbranchBankStore.trigger("change");
      break;
    default:
    //no op
  }
});

module.exports = SearchSubbranchBankStore;

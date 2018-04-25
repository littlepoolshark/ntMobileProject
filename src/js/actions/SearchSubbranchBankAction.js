var appDispatcher = require("../dispatcher/dispatcher.js");

var SearchSubbranchBankAction = {
  deleteKeyWord() {
    appDispatcher.dispatch({
      actionName: "deleteKeyWord_ssb"
    });
  },
  searchSubbranchBank(cityId, bankId) {
    appDispatcher.dispatch({
      actionName: "searchSubbranchBank_ssb",
      data: {
        cityId,
        bankId
      }
    });
  },
  searchBankNameForEnterprise(keyWord) {
    appDispatcher.dispatch({
      actionName: "searchBankNameForEnterprise_ssb",
      data: {
        keyWord
      }
    });
  },
  changeFieldValue(fieldValue, fieldName) {
    appDispatcher.dispatch({
      actionName: "changeFieldValue_ssb",
      data: {
        fieldValue: fieldValue,
        fieldName: fieldName
      }
    });
  }
};

module.exports = SearchSubbranchBankAction;

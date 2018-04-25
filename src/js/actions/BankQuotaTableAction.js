var appDispatcher = require("../dispatcher/dispatcher.js");

var BankQuotaTableAction = {
  getBankQuotaListFormServer() {
    appDispatcher.dispatch({
      actionName: "getBankQuotaListFormServer"
    });
  }
};

module.exports = BankQuotaTableAction;

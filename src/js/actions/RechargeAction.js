var appDispatcher = require("../dispatcher/dispatcher.js");

var RechargeAction = {
  getBankCardInfoFromServer() {
    appDispatcher.dispatch({
      actionName: "getBankCardInfoFromServer_recharge"
    });
  },
  recharge_upgrade() {
    appDispatcher.dispatch({
      actionName: "submitRechargeAmount_upgrade"
    });
  },
  changeRechargeAmount(amount) {
    appDispatcher.dispatch({
      actionName: "rechargeAmountChange",
      data: {
        rechargeAmount: amount
      }
    });
  }
};

module.exports = RechargeAction;

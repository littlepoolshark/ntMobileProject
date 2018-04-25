var appDispatcher = require("../dispatcher/dispatcher.js");

var WithdrawAction = {
  getBankCardInfoFromServer() {
    appDispatcher.dispatch({
      actionName: "getBankCardInfoFromServer_withdraw"
    });
  },
  getUserBalance() {
    appDispatcher.dispatch({
      actionName: "getUserBalance_withdraw"
    });
  },
  nextStep() {
    appDispatcher.dispatch({
      actionName: "nextStep_withdraw"
    });
  },
  nextStep_upgrade() {
    appDispatcher.dispatch({
      actionName: "nextStep_withdraw_upgrade"
    });
  },
  submitWithdrawForm() {
    appDispatcher.dispatch({
      actionName: "submitWithdrawForm_withdraw"
    });
  },
  changeWithdrawAmount(withdrawAmount) {
    appDispatcher.dispatch({
      actionName: "withdrawAmountChange",
      data: {
        withdrawAmount: withdrawAmount
      }
    });
  },
  changeFieldValue(fieldName, fieldValue) {
    appDispatcher.dispatch({
      actionName: "changeFieldValue_withdraw",
      data: {
        fieldName,
        fieldValue
      }
    });
  }
};

module.exports = WithdrawAction;

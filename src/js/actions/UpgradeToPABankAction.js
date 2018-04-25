var appDispatcher = require("../dispatcher/dispatcher.js");

var UpgradeToPABankAction = {
  getInitialDataFromServer() {
    appDispatcher.dispatch({
      actionName: "getInitialData_upgradeToPABank"
    });
  },
  changeFieldValue(fieldName, fieldValue) {
    appDispatcher.dispatch({
      actionName: "changeFieldValue_upgradeToPABank",
      data: {
        fieldName,
        fieldValue
      }
    });
  },
  submitPasswordSettingForm() {
    appDispatcher.dispatch({
      actionName: "submitPasswordSettingForm_upgradeToPABank",
      data: {
        formName: "passwordForm"
      }
    });
  },
  submitBankCardBindingForm() {
    appDispatcher.dispatch({
      actionName: "submitBankCardBindingForm_upgradeToPABank",
      data: {
        formName: "bankCardForm"
      }
    });
  },
  submitRegisterForm(){
    appDispatcher.dispatch({
      actionName: "submitRegisterForm_upgradeToPABank",
      data: {
        formName: "registerForm"
      }
    });
  }
};

module.exports = UpgradeToPABankAction;

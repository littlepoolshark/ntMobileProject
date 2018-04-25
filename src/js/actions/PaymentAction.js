var appDispatcher = require("../dispatcher/dispatcher.js");

var PaymentAction = {
  storeInitialize(sourceObj) {
    appDispatcher.dispatch({
      actionName: "payment_storeInitialization",
      data: sourceObj
    });
  },
  getUnUseCouponCount(type) {
    appDispatcher.dispatch({
      actionName: "getUnUseCouponCount",
      data: {
        productType: type
      }
    });
  },
  useAllBalance() {
    appDispatcher.dispatch({
      actionName: "useAllBalance"
    });
  },
  finishedCouponSelection(
    id,
    amount,
    type,
    minimumLimit,
    incomePeriod,
    purchaseAmount
  ) {
    appDispatcher.dispatch({
      actionName: "couponChange",
      data: {
        couponId: id,
        couponAmount: amount,
        couponType: type,
        couponMinimumLimit: minimumLimit,
        incomePeriod: incomePeriod,
        purchaseAmount: purchaseAmount
      }
    });
  },
  changePurchaseAmount(purchaseAmount, isWithDotInTheEnd) {
    appDispatcher.dispatch({
      actionName: "purchaseAmountChange",
      data: {
        purchaseAmount,
        isWithDotInTheEnd
      }
    });
  },
  doNotUseCoupon(purchaseAmount) {
    appDispatcher.dispatch({
      actionName: "couponChange",
      data: {
        couponId: "",
        couponAmount: 0,
        couponType: "",
        couponMinimumLimit: 0,
        incomePeriod: 0,
        purchaseAmount: purchaseAmount
      }
    });
  },
  recharge() {
    appDispatcher.dispatch({
      actionName: "recharge_payment"
    });
  },
  /**
   * @param {string} productType 产品类型
   * @param {boolean} isSkipAutoAssignCheck 是否跳过“是否授权自动签约”的检查。场景是在用户不勾选“授权自动签约”checkbox也能购买
   */
  pay(productType,isSkipAutoAssignCheck) {
    switch (productType) {
      case "new_product":
      case "ttz_product":
      case "yyz_product":
      case "jjz_product":
        appDispatcher.dispatch({
          actionName: "payment_earnSet",  data:{
            isSkipAutoAssignCheck
          }
        });
        break;
      case "loan_product": //好采投
      case "glj": //果乐金
      case "ced": //车e贷
      case "nyd"://农易贷
        appDispatcher.dispatch({
          actionName: "payment_fixedLoan",
          data: {
            productType,
            isSkipAutoAssignCheck
          }
        });
        break;
      case "creditor_product":
        appDispatcher.dispatch({
          actionName: "payment_creditorLoan",
          data:{
            isSkipAutoAssignCheck
          }
        });
        break;
      case "rich":
      case "moon":
        appDispatcher.dispatch({
          actionName: "payment_richOrMoon",
          data:{
            isSkipAutoAssignCheck
          }
        });
        break;
      case "richOfTransfered":
      case "moonOfTransfered":
        appDispatcher.dispatch({
          actionName: "payment_richOrMoonOfTransfered",
          data:{
            isSkipAutoAssignCheck
          }
        });
        break;
      default:
        break;
    }
  },
  assignAgreement(){
    appDispatcher.dispatch({
      actionName: "assignAgreement_payment"
    });
  }
};

module.exports = PaymentAction;

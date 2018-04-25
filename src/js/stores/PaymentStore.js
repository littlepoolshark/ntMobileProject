var MicroEvent = require("../lib/microevent.js");
var appDispatcher = require("../dispatcher/dispatcher.js");
var ajax = require("../lib/ajax.js");

const MIN_PURCHASE_AMOUNT = 100; //最小购买金额

var PaymentStore = {
  _all: {
    productName: "--", //产品名称
    productType: "", //产品类型，包括new_product,ttz_product,yyz_product,jjz_product,loan_product,creditor_product,glj,ced
    productDeadline: 1, //项目期限
    purchaseAmount: 0, //用户购买金额
    couponType: "", //优惠券的类型，"interestRate"是加息券，"redPackage"是红包
    couponAmount: 0, //优惠券的额度，如果优惠券为“加息券”的话，则单位是%；如果优惠券为“红包”的话，则单位是元。
    couponId: "", //优惠券的id
    incomePeriod: 0, //加息券的加息期限，单位是“月”
    productApr: 0, //年化利率
    expectedReward: 0.0, //历史收益，是一个计算属性
    remainAmount: 0, //项目可购买金额
    userBalance: 0, //用户账户余额
    unUseCouponCount: 0, //未使用优惠券的数量
    rewardRate: 0, //标的的奖励利息
    investLimitAmount_ttz: 100000, //天天赚最高(初始)投资限额
    userInTotal_ttz: 0, //天天赚已购买（已转入）金额
    orderAmount_ttz: 0, //天天赚预约中金额
    rateList: [], //月满盈的年化利率数组
    isVIPUser: false, //用户是不是VIP用户
    vipRaiseRate: 0, //VIP加息利率
    repayType: "xxhb", //还款方式,包括"xxhb"（先息后本），"debx"（等额本息）
    //以下这几个字段是用来计算等额本息下购买债权转让预期收益所用的
    nowPeriodNo: 0, //当前期数(整数类型)
    days: 0, //当前时间与最近一期还款相差天数(整数类型)
    sumPeriodNo: 0, //投资总期限(整数类型)
    alreadyInvestedAmount:0,//用户已投金额
    riskEvaluateAmount:0,//用户风险评测得出的总额度
    repaymentPeriod:"",//双月还或者季季还,oneOf['twin','season']
    isAutoAssign:false//是否授权自动签约
  },
  getAll() {
    return this._all;
  },
  _setAll(source) {
    Object.assign(this._all, source);
  },
  /*
    * @desc 计算历史收益
    */
  _setExpectedReward() {
    function toFixedTwo(number) {
      let number_str = "" + number;
      let arr = [];
      let index = number_str.indexOf(".");
      if (index === -1) {
        //整数
        return parseFloat(number_str + ".00");
      } else {
        arr = number_str.split(".");
        if (arr[1].length === 1) {
          //小数点后面有一位数字
          return parseFloat([arr[0], arr[1] + "0"].join("."));
        } else if (arr[1].length === 2) {
          //小数点后面有两位数字
          return parseFloat([arr[0], arr[1]].join("."));
        } else {
          //小数点后面大于两位数字
          return parseFloat([arr[0], arr[1].substring(0, 2)].join("."));
        }
      }
    }
    let {
      productType,
      productDeadline,
      couponType,
      couponAmount,
      expectedReward,
      purchaseAmount,
      productApr,
      incomePeriod,
      rewardRate,
      mainMonth, //剩余未还息期限,计算债权转让历史收益专用
      minNotRateTime, //最低未还息时间,计算债权转让历史收益专用
      maxNotRateTime, //最高未还息时间,计算债权转让历史收益专用
      rateList, //月满盈的年化利率的数组
      isVIPUser,
      vipRaiseRate,
      repayType,
      nowPeriodNo, //当前期数(整数类型)
      days, //当前时间与最近一期还款相差天数(整数类型)
      sumPeriodNo,//投资总期限(整数类型)
      repaymentPeriod
    } = this._all;

    let principal_reward = 0, //本金所产生的收益
      rewardRate_reward = 0, //奖励利率所产生的收益
      coupon_reward = 0, //加息券所产生的收益
      vip_reward = 0; //vip加息所产生的收益

    const XXHB = "xxhb",
      DEBX = "debx",
      FDDEBX = "fddebx";

      // 1、当项目还款方式为“等额本息（双月还）”时，使用等额本息计算公式计算历史收益，
      // 　 其中“借款期限”字段计数值调整为=借款期限/2，“发标年化利率”字段计数值调整为=发标年化利率*2
      // 2、当项目还款方式为“等额本息（季季还）”时，使用等额本息计算公式计算历史收益，
      // 　其中“借款期限”字段计数值调整为=借款期限/3，“发标年化利率”字段计数值调整为=发标年化利率*3

      //实际上参与到预期收益的利率和期限
      let multipleNumber=1;//倍数

      if(repayType === FDDEBX){
         switch (repaymentPeriod) {
           case "twin":
           multipleNumber=2;
             break;
           case "season":
           multipleNumber=3; 
             break;
           default:
             break;
         }
      } 

      let  productApr_actual=productApr * multipleNumber,
      productDeadline_actual=productDeadline / multipleNumber,
      couponAmount_actual=couponAmount *  multipleNumber,
      incomePeriod_actual=incomePeriod / multipleNumber,
      rewardRate_actual=rewardRate *  multipleNumber,
      vipRaiseRate_actual=vipRaiseRate * multipleNumber,
      days_actual=days / multipleNumber;

    function throwAnErrorAboutRepayType(repayType) {
      throw new Error(`后台返回了一个未知的还款类型：${repayType}`);
    }

    /**
     * @param {number} principal 本金
     * @param {number} rate 年化利率
     * @param {number} deadline 投资期限
     * @param {string} repayType 还款方式
     *
     * @return {number} pricipalReward 该本金所产生的总收益
     */
    function calculateTheInComeByRepayType(
      principal,
      rate,
      deadline,
      repayType
    ) {
      let principal_reward_per_month = 0,
        principal_reward_total = 0;

      if (repayType === XXHB) {
        principal_reward_total = toFixedTwo(principal * rate / 12) * deadline;
      } else if (repayType === DEBX || repayType === FDDEBX) {
        principal_reward_per_month =
          principal *
          rate /
          12 *
          Math.pow(1 + rate / 12, deadline) /
          (Math.pow(1 + rate / 12, deadline) - 1);
        principal_reward_total =
          principal_reward_per_month * deadline - principal;
      } else {
        throwAnErrorAboutRepayType(repayType);
      }

      return principal_reward_total;
    }

    //等额本息下，债权转让的每一期收益的计算公式：N期应还利息=投资金额*（预期年化/12）*{ {1+（预期年化/12）}^还款期数 - {1+（预期年化/12）}^（N-1） } / { {1+（预期年化/12）}^还款期数  - 1
    function caculateCurrentPeriodIncome(
      pricipal,
      rate,
      sumPeriodNo,
      periodNo
    ) {
      return parseFloat(
        (
          pricipal *
          rate /
          12 *
          (Math.pow(1 + rate / 12, sumPeriodNo) -
            Math.pow(1 + rate / 12, periodNo - 1)) /
          (Math.pow(1 + rate / 12, sumPeriodNo) - 1)
        ).toFixed(2)
      );
    }

    //等额本息下，债权转让的余下所有期的收益之和
    function caculateTotalIncomeOfCreditorLoan(
      pricipal,
      rate,
      sumPeriodNo,
      days
    ) {
      
      let total_reward = 0;

      for (let i = 1; i <= sumPeriodNo; i++) {
        let currPeriodReward = caculateCurrentPeriodIncome(
          pricipal,
          rate,
          sumPeriodNo,
          i
        );
        if (i === 1) {
          currPeriodReward = parseFloat(
            (currPeriodReward * days / 30).toFixed(2)
          );
        }
        total_reward += currPeriodReward;
      }

      return parseFloat(total_reward.toFixed(2));
    }

    switch (productType) {
      case "new_product": //新手标
        principal_reward = toFixedTwo(
          purchaseAmount * productApr / 360 * productDeadline
        );
        if (!!rewardRate) {
          rewardRate_reward = toFixedTwo(
            purchaseAmount * rewardRate / 360 * productDeadline
          );
        }
        expectedReward = (principal_reward + rewardRate_reward).toFixed(2);
        break;
      case "yyz_product": //月月赚
        principal_reward = toFixedTwo(purchaseAmount * productApr / 12);
        if (!!couponAmount && couponType === "interestRate") {
          coupon_reward = toFixedTwo(purchaseAmount * couponAmount / 12);
        }
        if (!!rewardRate) {
          rewardRate_reward = toFixedTwo(purchaseAmount * rewardRate / 12);
        }
        expectedReward = (
          principal_reward +
          coupon_reward +
          rewardRate_reward
        ).toFixed(2);
        break;
      case "jjz_product": //季季赚
        principal_reward = toFixedTwo(purchaseAmount * productApr / 12) * 3;
        if (!!couponAmount && couponType === "interestRate") {
          coupon_reward = toFixedTwo(purchaseAmount * couponAmount / 12) * 3;
        }
        if (!!rewardRate) {
          rewardRate_reward = toFixedTwo(purchaseAmount * rewardRate / 12) * 3;
        }
        expectedReward = (
          principal_reward +
          coupon_reward +
          rewardRate_reward
        ).toFixed(2);
        break;
      case "rich": //丰收盈
      case "loan_product": //好采投
      case "glj": //果乐金
      case "ced": //车e贷

        //本金所产生的收益
        principal_reward = calculateTheInComeByRepayType(
          purchaseAmount,
          productApr,
          productDeadline,
          repayType
        );

        //加息券所产生的收益
        if (!!couponAmount && couponType === "interestRate") {
          //incomePeriod为0，代表该加息券没有期限限制，即与投资期限等长
          if (incomePeriod !== 0 && productDeadline > incomePeriod) {
            coupon_reward = calculateTheInComeByRepayType(
              purchaseAmount,
              couponAmount,
              incomePeriod,
              repayType
            ); //couponAmount兼顾了“红包”的面额这个语义。当优惠券的类型为加息券的时候，couponAmount代表的是年化利率，值是个浮点数
          } else {
            coupon_reward = calculateTheInComeByRepayType(
              purchaseAmount,
              couponAmount,
              productDeadline,
              repayType
            );
          }
        }

        //标的奖励所产生的收益
        if (!!rewardRate) {
          rewardRate_reward = calculateTheInComeByRepayType(
            purchaseAmount,
            rewardRate,
            productDeadline,
            repayType
          );
        }

        //vip加息所产生的收益
        if (
          ["loan_product", "glj", "ced"].indexOf(productType) > -1 &&
          isVIPUser &&
          vipRaiseRate
        ) {
          vip_reward = calculateTheInComeByRepayType(
            purchaseAmount,
            vipRaiseRate,
            productDeadline,
            repayType
          );
        }

        //总得收益=本金所产生的收益 + 加息券所产生的收益 + 标的奖励所产生的收益 + vip加息所产生的收益
        expectedReward = (
          principal_reward +
          coupon_reward +
          rewardRate_reward +
          vip_reward
        ).toFixed(2);

        break;
      case "nyd"://农易贷

   
      
        //本金所产生的收益
        principal_reward = calculateTheInComeByRepayType(
          purchaseAmount,
          productApr_actual,
          productDeadline_actual,
          repayType
        );

        //加息券所产生的收益
        if (!!couponAmount && couponType === "interestRate") {
          //incomePeriod为0，代表该加息券没有期限限制，即与投资期限等长
          if (incomePeriod !== 0 && productDeadline > incomePeriod) {
            coupon_reward = calculateTheInComeByRepayType(
              purchaseAmount,
              couponAmount_actual,
              incomePeriod_actual,
              repayType
            ); //couponAmount兼顾了“红包”的面额这个语义。当优惠券的类型为加息券的时候，couponAmount代表的是年化利率，值是个浮点数
          } else {
            coupon_reward = calculateTheInComeByRepayType(
              purchaseAmount,
              couponAmount_actual,
              productDeadline_actual,
              repayType
            );
          }
        }

        //标的奖励所产生的收益
        if (!!rewardRate) {
          rewardRate_reward = calculateTheInComeByRepayType(
            purchaseAmount,
            rewardRate_actual,
            productDeadline_actual,
            repayType
          );
        }

        //vip加息所产生的收益
        if (isVIPUser && vipRaiseRate) {
          vip_reward = calculateTheInComeByRepayType(
            purchaseAmount,
            vipRaiseRate_actual,
            productDeadline_actual,
            repayType
          );
        }

        //总得收益=本金所产生的收益 + 加息券所产生的收益 + 标的奖励所产生的收益 + vip加息所产生的收益
        expectedReward = (
          principal_reward +
          coupon_reward +
          rewardRate_reward +
          vip_reward
        ).toFixed(2);
        break;
      case "creditor_product": //债权转让
        if (repayType === XXHB) {
          let monthRate = toFixedTwo(purchaseAmount * productApr / 12);
          let dayRate = toFixedTwo(purchaseAmount * productApr / 360);

          if (rewardRate) {
            monthRate += toFixedTwo(purchaseAmount * rewardRate / 12);
            dayRate += toFixedTwo(purchaseAmount * rewardRate / 360);
            monthRate = parseFloat(monthRate.toFixed(2));
            dayRate = parseFloat(dayRate.toFixed(2));
          }
          if (isVIPUser && vipRaiseRate) {
            monthRate += toFixedTwo(purchaseAmount * vipRaiseRate / 12);
            dayRate += toFixedTwo(purchaseAmount * vipRaiseRate / 360);
            monthRate = parseFloat(monthRate.toFixed(2));
            dayRate = parseFloat(dayRate.toFixed(2));
          }
          let minProfit = toFixedTwo(
            monthRate * mainMonth + dayRate * minNotRateTime
          );
          let maxProfit = toFixedTwo(
            monthRate * mainMonth + dayRate * maxNotRateTime
          );

          expectedReward = minProfit.toFixed(2) + " ~ " + maxProfit.toFixed(2);
        } else if (repayType === DEBX || repayType === FDDEBX) {

          principal_reward = caculateTotalIncomeOfCreditorLoan(
            purchaseAmount,
            productApr_actual,
            sumPeriodNo,
            days_actual
          );

          if (rewardRate) {
            rewardRate_reward = caculateTotalIncomeOfCreditorLoan(
              purchaseAmount,
              rewardRate_actual,
              sumPeriodNo,
              days_actual
            );
          }

          if (isVIPUser && vipRaiseRate) {
            vip_reward = caculateTotalIncomeOfCreditorLoan(
              purchaseAmount,
              vipRaiseRate_actual,
              sumPeriodNo,
              days_actual
            );
          }

          //总得收益=本金所产生的收益 + 标的奖励所产生的收益 + vip加息所产生的收益
          expectedReward = (
            principal_reward +
            coupon_reward +
            rewardRate_reward +
            vip_reward
          ).toFixed(2);
        } else {
          throwAnErrorAboutRepayType(repayType);
        }

        break;
      case "moon": //月满盈
        for (let i = 0; i < rateList.length; i++) {
          principal_reward += toFixedTwo(
            purchaseAmount * rateList[i].rate / 12
          );
        }
        principal_reward = toFixedTwo(principal_reward);

        if (!!couponAmount && couponType === "interestRate") {
          if (incomePeriod !== 0 && productDeadline > incomePeriod) {
            coupon_reward =
              toFixedTwo(purchaseAmount * couponAmount / 12) * incomePeriod;
          } else {
            coupon_reward =
              toFixedTwo(purchaseAmount * couponAmount / 12) * productDeadline;
          }
        }
        if (!!rewardRate) {
          rewardRate_reward =
            toFixedTwo(purchaseAmount * rewardRate / 12) * productDeadline;
        }
        expectedReward = (
          principal_reward +
          coupon_reward +
          rewardRate_reward
        ).toFixed(2);
        break;
      default:
        break;
    }
    this._all.expectedReward = expectedReward;
  },
  _setCoupon() {
    let {
      couponType,
      couponAmount,
      purchaseAmount,
      couponMinimumLimit
    } = this._all;

    // 如果当前的优惠券的类型是红包并且购买金额小于该红包的使用最小投资额度的话，将优惠券的额度设置为0
    if (couponType === "redPackage" && purchaseAmount < couponMinimumLimit) {
      couponAmount = 0;
      couponType = "";
    }
    this._all.couponAmount = couponAmount;
    this._all.couponType = couponType;
  },
  _setTTZInvestLimitAmount() {
    let { investLimitAmount_ttz, userInTotal_ttz, orderAmount_ttz } = this._all;
    investLimitAmount_ttz =
      100000 - parseFloat(userInTotal_ttz) - parseFloat(orderAmount_ttz);
    this._all.investLimitAmount_ttz =
      investLimitAmount_ttz < 0 ? 0 : investLimitAmount_ttz;
  },
  getUserBalance() {
    let { userBalance, productType, repayType, remainAmount } = this._all;

    let loanRemainAmount = remainAmount; //标的剩余可购买的金额
    let maxUserBalance = 0; //根据购买金额的规则（是否是100元起还是必须是100元整数倍等），结合账户余额，算出最大的可用余额
    let isCreditorLoanAndDEBX =
      productType === "creditor_product" && (repayType === "debx" || repayType === "fddebx"); //是否是等额本息的债权转让

    if (isCreditorLoanAndDEBX) {
      maxUserBalance = userBalance;
    } else {
      maxUserBalance = userBalance - userBalance % MIN_PURCHASE_AMOUNT;
    }

    return maxUserBalance > loanRemainAmount
      ? loanRemainAmount
      : maxUserBalance;
  },
  paymentCheck(isSkipAutoAssignCheck) {
    let {
      remainAmount,
      userBalance,
      purchaseAmount,
      productType,
      investLimitAmount_ttz,
      hadBindBankCard,
      repayType,
      alreadyInvestedAmount,
      riskEvaluateAmount,
      isAutoAssign
    } = this._all;

    let isCreditorLoanAndDEBX =
      productType === "creditor_product" && (repayType === "debx" || repayType === "fddebx"); //是否是等额本息的债权转让

    let validationResult = {
      success: true,
      msg: ""
    };
    if (purchaseAmount === 0) {
      validationResult = {
        success: false,
        msg: "投资金额不能为空，请输入！"
      };
    } else if (purchaseAmount < MIN_PURCHASE_AMOUNT) {
      validationResult = {
        success: false,
        msg: `投资金额不能小于${MIN_PURCHASE_AMOUNT}，${MIN_PURCHASE_AMOUNT}元起投！`
      };
    } else if (!isCreditorLoanAndDEBX && purchaseAmount % MIN_PURCHASE_AMOUNT) {
      validationResult = {
        success: false,
        msg: `投资金额要求是${MIN_PURCHASE_AMOUNT}的整数倍！`
      };
    } else if (purchaseAmount > userBalance) {
      validationResult = {
        success: false,
        msg:
          "余额不足，前去充值" +
          (purchaseAmount - userBalance).toFixed(2) +
          "元？"
      };
    } else if (purchaseAmount > remainAmount) {
      validationResult = {
        success: false,
        msg: "投资金额不能大于项目可投金额！"
      };
    } else if (
      isCreditorLoanAndDEBX &&
      0 < remainAmount - purchaseAmount &&
      remainAmount - purchaseAmount < 100
    ) {
      validationResult = {
        success: false,
        msg: `购买后剩余债权金额不得小于${MIN_PURCHASE_AMOUNT}元，建议您全部购买！`
      };
    }else if(riskEvaluateAmount !== -10000 && (purchaseAmount + alreadyInvestedAmount > riskEvaluateAmount)){//riskEvaluateAmount等于-10000的时候代表着“不限额”
      validationResult = {
        success: false,
        msg: `根据您的风险测评结果，您的出借总额不可超过${riskEvaluateAmount / 10000 }万`
      };
    }else if(!isSkipAutoAssignCheck && !isAutoAssign){
      validationResult = {
        success: false,
        msg: `您还没有授权自动签约`
      };
    }

    return validationResult;
  },
  isBindBankCardCheck() {
    return this._all.hadBindBankCard === false ? false : true;
  },
  updateAll(data) {
    this._setAll(data);
    this._setExpectedReward();
    this._setTTZInvestLimitAmount();
    //this._setCoupon();
  },
  clearAll() {
    this._all.purchaseAmount = 0;
    this._all.expectedReward = 0.0;
    this._all.couponAmount = 0;
    this._all.couponType = "";
    this._all.isVIPUser = false;
    this._all.vipRaiseRate = 0;
  }
};
MicroEvent.mixin(PaymentStore);

appDispatcher.register(function(payload) {
  switch (payload.actionName) {
    case "payment_storeInitialization": //将从url传递的参数存入store
      //向后台取回“天天赚持有中金额”和“天天赚预约中金额”两个字段的值,用于天天赚的支付
      if (payload.data.productType === "ttz_product") {
        ajax({
          ciUrl: "/ttz/v2/account",
          success(rs) {
            if (rs.code === 0) {
              PaymentStore.updateAll({
                userInTotal_ttz: rs.data.ttzUseraccountTotal.userInTotal,
                orderAmount_ttz: rs.data.orderAmount.replace(/\,/g, "")
              });
              PaymentStore.trigger("change");
            }
          }
        });
      }

      //向后台请求月满盈的rateList值
      if (payload.data.productType === "moon") {
        ajax({
          ciUrl: "/forever/v2/detail.do",
          data: {
            productId: payload.data.productId
          },
          success(rs) {
            if (rs.code === 0) {
              PaymentStore.updateAll({
                rateList: rs.data.rateList
              });
              PaymentStore.trigger("change");
            }
          }
        });
      }

      //获取银行卡信息，以此来判断用户是否已经绑卡
      ajax({
        ciUrl: "/user/v2/myBankCardInfo",
        success(rs) {
          if (rs.code === 0) {
            let hadBindBankCard;
            if (rs.data === null) {
              hadBindBankCard = false;
            } else {
              hadBindBankCard = true;
            }
            PaymentStore.updateAll({
              hadBindBankCard: hadBindBankCard
            });
          }
        }
      });

      //获取用户是否授权自动签约标志位
      ajax({
        ciUrl: '/user/v2/securityCenter',
        success(rs) {
          if (rs.code === 0) {
            PaymentStore.updateAll({
              isAutoAssign: rs.data.autoStamp === "1"
            });  
          }
        }
      });

      PaymentStore.updateAll(payload.data);
      PaymentStore.trigger("change");
      break;
    case "useAllBalance":
      let maxPurchaseAmount = PaymentStore.getUserBalance();

      if (maxPurchaseAmount >= MIN_PURCHASE_AMOUNT) {
        PaymentStore.updateAll({
          purchaseAmount: maxPurchaseAmount
        });
        PaymentStore.trigger("change");
      } else {
        PaymentStore.trigger(
          "userBalanceIsNotEnough",
          `账户余额不足${MIN_PURCHASE_AMOUNT}元，请及时充值！`
        );
      }
      break;
    case "getUnUseCouponCount":
      ajax({
        ciUrl: "/user/v2/getRedPackageAndInterestTks",
        data: {
          reqPageNum: 1,
          maxResults: 1000
        },
        success(rs) {
          let type = payload.data.productType;
          let unUseCouponCount;
          if (rs.code === 0) {
            if (type === "yyz_product") {
              //因为月月赚不能使用红包，所以只统计加息券的张数
              unUseCouponCount = rs.data.list[0].interestList.length;
            } else {
              unUseCouponCount =
                rs.data.list[0].interestList.length +
                rs.data.list[0].redpackageList.length;
            }
            PaymentStore.updateAll({
              unUseCouponCount: unUseCouponCount
            });
            PaymentStore.trigger("change");
          }
        }
      });
      break;
    case "purchaseAmountChange": //用户填入投资金额
      PaymentStore.updateAll({
        purchaseAmount: payload.data.purchaseAmount,
        couponAmount: 0,
        couponType: ""
      });
      PaymentStore.trigger("change", payload.data.isWithDotInTheEnd);
      break;
    case "couponChange": //用户选择优惠券
      PaymentStore.updateAll({
        couponId: payload.data.couponId,
        couponAmount: payload.data.couponAmount,
        couponType: payload.data.couponType,
        couponMinimumLimit: payload.data.couponMinimumLimit,
        incomePeriod: payload.data.incomePeriod,
        purchaseAmount: payload.data.purchaseAmount
      });

      PaymentStore.trigger("change");
      break;
    case "recharge_payment":
      if (PaymentStore.isBindBankCardCheck()) {
        PaymentStore.trigger("BindBankCardCheckSuccess");
      } else {
        PaymentStore.trigger("hadNotBindBankCard");
      }
      break;
    case "payment_earnSet": //赚系列的支付
      let paymentCheckResult_earnSet = PaymentStore.paymentCheck(payload.data.isSkipAutoAssignCheck);
      if (paymentCheckResult_earnSet.success) {
        let {
          productType,
          productId,
          purchaseAmount,
          couponType,
          couponAmount,
          couponId
        } = PaymentStore.getAll();
        let postData = {
          regularId: productId,
          amount: purchaseAmount,
          type: productType,
          operType: "buy"
        };
        if (couponType && couponAmount) {
          if (couponType === "interestRate") {
            postData.interestId = couponId;
          } else if (couponType === "redPackage") {
            postData.redId = couponId;
          }
        }
        PaymentStore.trigger("paymentRequestIsStart");
        ajax({
          ciUrl: "/invest/v2/earnProductInvest",
          data: postData,
          success(rs) {
            PaymentStore.trigger("paymentRequestIsEnd");
            if (rs.code === 0) {
              PaymentStore.trigger("purchaseSuccess", rs.data);
            } else {
              PaymentStore.trigger("purchaseFailed", rs.description);
            }
          },
          error() {
            PaymentStore.trigger("paymentRequestIsEnd");
          }
        });
      } else {
        PaymentStore.trigger(
          "paymentCheckFailed",
          paymentCheckResult_earnSet.msg
        );
      }

      break;
    case "payment_fixedLoan": //好采投,果乐金,车e贷等直投项目的支付
      let paymentCheckResult_fixedLoan = PaymentStore.paymentCheck(payload.data.isSkipAutoAssignCheck);
      if (paymentCheckResult_fixedLoan.success) {
        let {
          productId,
          purchaseAmount,
          couponType,
          couponAmount,
          couponId
        } = PaymentStore.getAll();
        let postData = {
          investId: productId,
          amount: purchaseAmount,
          productType: payload.data.productType
        };
        if (couponType && couponAmount) {
          if (couponType === "interestRate") {
            postData.interestId = couponId;
          } else if (couponType === "redPackage") {
            postData.redpackageId = couponId;
          }
        }
        PaymentStore.trigger("paymentRequestIsStart");
        ajax({
          ciUrl: "/invest/v2/loanForBuy",
          data: postData,
          success(rs) {
            PaymentStore.trigger("paymentRequestIsEnd");
            if (rs.code === 0) {
              PaymentStore.trigger("purchaseSuccess", rs.data);
            } else {
              PaymentStore.trigger("purchaseFailed", rs.description);
            }
          },
          error() {
            PaymentStore.trigger("paymentRequestIsEnd");
          }
        });
      } else {
        PaymentStore.trigger(
          "paymentCheckFailed",
          paymentCheckResult_fixedLoan.msg
        );
      }

      break;
    case "payment_creditorLoan": //债权转让的支付
      let paymentCheckResult_creditorLoan = PaymentStore.paymentCheck(payload.data.isSkipAutoAssignCheck);
      if (paymentCheckResult_creditorLoan.success) {
        let { productId, purchaseAmount } = PaymentStore.getAll();
        let postData = {
          investId: productId,
          amount: purchaseAmount
        };
        PaymentStore.trigger("paymentRequestIsStart");
        ajax({
          ciUrl: "/invest/v2/creditorForBuy",
          data: postData,
          success(rs) {
            PaymentStore.trigger("paymentRequestIsEnd");
            if (rs.code === 0) {
              PaymentStore.trigger("purchaseSuccess", rs.data);
            } else {
              PaymentStore.trigger("purchaseFailed", rs.description);
            }
          },
          error() {
            PaymentStore.trigger("paymentRequestIsEnd");
          }
        });
      } else {
        PaymentStore.trigger(
          "paymentCheckFailed",
          paymentCheckResult_creditorLoan.msg
        );
      }
      break;
    case "payment_richOrMoon": //丰收盈和月满盈的购买
    case "payment_richOrMoonOfTransfered": //债转后丰收盈和月满盈的购买
      let paymentCheckResult_richOrMoon = PaymentStore.paymentCheck(payload.data.isSkipAutoAssignCheck);

      if (paymentCheckResult_richOrMoon.success) {
        let {
          productId,
          purchaseAmount,
          productType,
          couponType,
          couponAmount,
          couponId
        } = PaymentStore.getAll();
        let postData = {
          productId: productId,
          amount: purchaseAmount,
          type: productType
        };
        if (couponType && couponAmount) {
          if (couponType === "interestRate") {
            postData.interestId = couponId;
          } else if (couponType === "redPackage") {
            postData.redId = couponId;
          }
        }
        PaymentStore.trigger("paymentRequestIsStart");
        ajax({
          ciUrl:
            payload.actionName === "payment_richOrMoon"
              ? "/forever/v2/invest.do"
              : "/invest/v2/exitBuyForever.do",
          data: postData,
          success(rs) {
            PaymentStore.trigger("paymentRequestIsEnd");
            if (rs.code === 0) {
              PaymentStore.trigger("purchaseSuccess", rs.data);
            } else {
              PaymentStore.trigger("purchaseFailed", rs.description);
            }
          },
          error() {
            PaymentStore.trigger("paymentRequestIsEnd");
          }
        });
      } else {
        PaymentStore.trigger(
          "paymentCheckFailed",
          paymentCheckResult_richOrMoon.msg
        );
      }
      break;
    case "assignAgreement_payment":
      ajax({
        ciUrl:"/invest/v2/isSign",
        success(rs) {
          if (rs.code === 0) {
            PaymentStore.updateAll({
              isAutoAssign:true
            });
            PaymentStore.trigger("assignAgreementSuccess");
          } else {
            PaymentStore.trigger("assignAgreementFailed", rs.description);
          }
        }
      });
      break;
    default:
    //no op
  }
});

module.exports = PaymentStore;

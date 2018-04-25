var MicroEvent = require('../lib/microevent.js');
var appDispatcher = require('../dispatcher/dispatcher.js');
var ajax = require("../lib/ajax.js");

const productTypeIndexMap = {
    "yyz_product": "1",
    "jjz_product": "2",
    "moon": "3",
    "rich": "4",
    "loan_product": "5",
    "creditor_product": "6"
};

const productTypeNameMap = {
    "1": "yyz_product",
    "2": "jjz_product",
    "3": "moon",
    "4": "rich",
    "5": "loan_product",
    "6": "creditor_product"
};

var AutoPurchaseFormStore = {
    _all: {
        yearRate: "",//自动投标的最低利率
        minPeriod: 0,//
        maxPeriod: 12,//
        repaymentType: "xxhb",//默认是按月结息，到期还本
        minAmount: "",//单笔投资的最低限额
        maxAmount: "",//单笔投资的最高限额
        productType: [],//自动投资的产品类型
        reserveAmount: "",//预留金额
        validDateType: "longTerm",//有效期的类型，有“longTerm”和“custom”
        validDateStart: "",//自动投标的启动时间
        validDateEnd: ""//自动投标的禁用时间
    },
    getAll() {
        return this._all;
    },
    updateAll(source) {
        this._all = Object.assign({}, this._all, source);
    },
    checkForm() {

        let {
            yearRate,
            minPeriod,
            maxPeriod,
            repaymentType,
            minAmount,
            maxAmount,
            productType,
            reserveAmount,
            validDateType,
            validDateStart,
            validDateEnd
        } = this._all;


        let validationResult = {
            success: true,
            msg: ""
        };

        if (yearRate === "" || parseInt(yearRate) === 0) {
            validationResult = {
                success: false,
                msg: "最低利率不能为空或者0，请输入！"
            };
        } else if (minPeriod === "" || maxPeriod === "") {
            validationResult = {
                success: false,
                msg: "项目期限不能为空，请输入！"
            };
        } else if (parseInt(minPeriod)  >  parseInt(maxPeriod)) {
            validationResult = {
                success: false,
                msg: "最小月数不能大于最大月数"
            };
        } else if (minAmount === "" || maxAmount === "") {
            validationResult = {
                success: false,
                msg: "单笔投资额不能为空，请输入！"
            };
        }else if (parseInt(minAmount) < 100 || parseInt(maxAmount) < 100) {
            validationResult = {
                success: false,
                msg: "单笔投资额不能小于100元！"
            };
        } else if (parseInt(minAmount) % 100 !== 0 || parseInt(maxAmount) % 100 !== 0) {
            validationResult = {
                success: false,
                msg: "单笔投资额必须是100的整数倍！"
            };
        } else if (parseInt(minAmount) > parseInt(maxAmount) ) {
            validationResult = {
                success: false,
                msg: "最低单笔投资额不能大于最大单笔投资额！"
            };
        }else if (productType.length === 0) {
            validationResult = {
                success: false,
                msg: "投资类型不能为空，请选择！"
            };
        } else if (reserveAmount === "") {
            validationResult = {
                success: false,
                msg: "预保留金额不能为空，请输入！"
            };
        } else if (validDateType === "custom" && (validDateStart === "" || validDateEnd === "")) {
            validationResult = {
                success: false,
                msg: "请选择有效期的起止日期！"
            };
        }else if(new Date(validDateStart).getTime() > new Date(validDateEnd).getTime()){
            validationResult = {
                success: false,
                msg: "起始日期不能大于结束日期！"
            };
        }

        return validationResult;
    },
    clearAll() {
        this._all = {
            yearRate: "",
            minPeriod: 0,
            maxPeriod: 12,
            repaymentType: "xxhb",
            minAmount: "",
            maxAmount: "",
            productType: [],
            reserveAmount: "",
            validDateType: "longTerm",
            validDateStart: "",
            validDateEnd: ""
        }
    }
};
MicroEvent.mixin(AutoPurchaseFormStore);

appDispatcher.register(function (payload) {
    switch (payload.actionName) {
        case "getInitialData_autoPurchaseForm":
            ajax({
                ciUrl: "/user/v2/userAutoBidInfo",
                success(rs) {
                    if (rs.code === 0) {
                        let source = {};
                        if (rs.data) {
                            source = Object.assign(
                                {},
                                rs.data,
                                {
                                    yearRate: (rs.data.yearRate * 100).toFixed(1),
                                    productType: rs.data.productType.split(",").map((item, index) => {
                                        return productTypeIndexMap[item];
                                    }),
                                    validDateType: rs.data.startTime === null && rs.data.endTime === null ? "longTerm" : "custom",
                                    validDateStart: rs.data.startTime || "",
                                    validDateEnd: rs.data.endTime || ""
                                },
                                payload.data.formData
                            )
                        } else {
                            source = Object.assign(
                                {},
                                AutoPurchaseFormStore.getAll(),
                                payload.data.formData
                            )
                        }

                        AutoPurchaseFormStore.updateAll(source);
                        AutoPurchaseFormStore.trigger("change");
                    }
                }
            });
            break;
        case "toggleValidDateTypeTo_autoPurchaseForm":
            AutoPurchaseFormStore.updateAll({
                validDateType: payload.data.validDateType
            });
            AutoPurchaseFormStore.trigger("change");
            break;
        case "changeFieldValue_autoPurchaseForm":
            let newSource = {};
            newSource[payload.data.fieldName] = payload.data.fieldValue;
            AutoPurchaseFormStore.updateAll(newSource);
            AutoPurchaseFormStore.trigger("change");
            break;
        case "submitAutoPurchaseForm_autoPurchaseForm":
            let formCheckResult = AutoPurchaseFormStore.checkForm();
            if (formCheckResult.success) {
                let {
                    yearRate,
                    minPeriod,
                    maxPeriod,
                    repaymentType,
                    minAmount,
                    maxAmount,
                    productType,
                    reserveAmount,
                    validDateType,
                    validDateStart,
                    validDateEnd
                } = AutoPurchaseFormStore.getAll();

                let postData = {
                    yearRate: parseFloat((yearRate / 100).toFixed(3)),
                    minPeriod,
                    maxPeriod,
                    repaymentType,
                    minAmount,
                    maxAmount,
                    reserveAmount,
                    productType: productType.map((item, index) => {
                        return productTypeNameMap[item]
                    }).join(",")
                };

                if (validDateType === "custom") {
                    postData.startTime = validDateStart;
                    postData.endTime = validDateEnd;
                }

                ajax({
                    ciUrl: "/user/v2/editUserAutoBid",
                    data: postData,
                    success(rs) {
                        if (rs.code === 0) {
                            AutoPurchaseFormStore.trigger("submitAutoPurchaseFormSuccess");
                        } else {
                            AutoPurchaseFormStore.trigger("submitAutoPurchaseFormFailed", rs.description);
                        }
                    }
                });
            } else {
                AutoPurchaseFormStore.trigger("autoPurchaseFormCheckFailed", formCheckResult.msg);
            }
            break;
        case "deleteAutoPurchaseRecord_autoPurchaseForm":
            ajax({
                ciUrl: "/user/v2/updUserAutoBidStatus",
                data: {
                    status: "del"
                },
                success(rs) {
                    if (rs.code === 0) {
                        AutoPurchaseFormStore.trigger("deleteAutoPurchaseRecordSuccess");
                    } else {
                        AutoPurchaseFormStore.trigger("deleteAutoPurchaseRecordFailed", rs.description);
                    }
                }
            });
            break;
        case "openAutoPurchaseSwitch_autoPurchaseForm":
            ajax({
                ciUrl: "/user/v2/updUserAutoBidStatus",
                data: {
                    status: "off"
                },
                success(rs) {
                    if (rs.code === 0) {
                        AutoPurchaseFormStore.trigger("openAutoPurchaseSwitchSuccess");
                    } else {
                        AutoPurchaseFormStore.trigger("openAutoPurchaseSwitchFailed", rs.description);
                    }
                }
            });
            break;
        default:
        //no op
    }
});

module.exports = AutoPurchaseFormStore;
var MicroEvent = require('../lib/microevent.js');
var appDispatcher = require('../dispatcher/dispatcher.js');
var ajax = require("../lib/ajax.js");

import config from "../config";



var GetRedPackageStore = {
    _all: {
        userName: "",//发券人的手机号码
        getCouponName: "",//收券人的手机号码
        couponType: "redPackage",
        couponAmount: 0,
        couponId: "",
        totalAmountOfInvestment: "----",
        registerUserCount: "----"
    },
    _phoneNoFormatCheck(phoneNo) {
        return (/1\d{10}$/i).test(phoneNo);
    },
    checkForm() {
        let {
            getCouponName
            } = this._all;
        let validationResult = {
            success: true,
            msg: ""
        }
        if (getCouponName === "") {
            validationResult = {
                success: false,
                msg: "手机号码不能为空，请输入"
            }
        } else if (!this._phoneNoFormatCheck(getCouponName)) {
            validationResult = {
                success: false,
                msg: "手机号码格式不正确，请检查"
            }
        }
        return validationResult;
    },
    getAll() {
        return this._all;
    },
    updateAll(source) {
        this._all = Object.assign({}, this._all, source);
    },
    clearAll() {
        this._all = {
            userName: "",//发券人的手机号码
            getCouponName: "",//收券人的手机号码
            couponType: "redPackage",
            couponAmount: 0,
            couponId: "",
            totalAmountOfInvestment: "----",
            registerUserCount: "----"
        }
    }
};
MicroEvent.mixin(GetRedPackageStore);


appDispatcher.register(function (payload) {
    switch (payload.actionName) {
        case "getInitialData_getRedPackage":
            GetRedPackageStore.updateAll(payload.data);
            GetRedPackageStore.trigger("change");

            ajax({
                ciUrl: "/platinfo/v2/homePageData",
                success: function (rs) {
                    if (rs.code === 0) {
                        GetRedPackageStore.updateAll({
                            totalAmountOfInvestment: rs.data.totalAmountOfInvestment,
                            registerUserCount: rs.data.registerUserCount,
                        });
                        GetRedPackageStore.trigger("change");
                    }
                }
            });
            break;
        case "changeFieldValue_getRedPackage":
            let source = {};
            source[payload.data.fieldName] = payload.data.fieldValue;
            GetRedPackageStore.updateAll(source);
            GetRedPackageStore.trigger("change");
            break;
        case "submitGetRedPackageForm_getRedPackage":
            let validationResult = GetRedPackageStore.checkForm();
            if (validationResult.success) {
                let {
                    getCouponName,
                    couponId
                } = GetRedPackageStore.getAll();
                
                GetRedPackageStore.trigger("requestIsStarting");
                ajax({
                    ciUrl: "/user/v2/getUserShareReward",
                    data:{
                        mobile:getCouponName,
                        configId:couponId
                    },
                    success: function (rs) {
                        GetRedPackageStore.trigger("requestIsEnd");
                        if (rs.data.code === "1000" || rs.data.code === "1100") {
                            let userType=rs.data.code === "1100" ? "isANewbie" : "isNotANewbie";
                            GetRedPackageStore.trigger("getRedPackageSuccess",userType );
                        } else {
                            GetRedPackageStore.trigger("getRedPackageFailed",rs.data.msg);
                        }
                    },
                    error() {
                        GetRedPackageStore.trigger("requestIsEnd");
                    }
                });

            } else {
                GetRedPackageStore.trigger("formCheckFailed", validationResult.msg);
            }
            break;
        default:
        //no op
    }
});

module.exports = GetRedPackageStore;
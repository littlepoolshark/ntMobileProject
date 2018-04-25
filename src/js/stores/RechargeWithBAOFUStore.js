//@flow
var MicroEvent = require('../lib/microevent.js');
var appDispatcher = require('../dispatcher/dispatcher.js');
var ajax = require("../lib/ajax.js");
var cookie = require("../lib/cookie.js");

var RechargeWithBAOFUStore = {
    _all: {
        verifyCode: "",
        business_no: "",
        orderId: "",
        rechargeId: ""
    },
    rechargeFormCheck() {
        let {
            verifyCode
        } = this._all;

        let validationResult = {
            success: true,
            msg: ""
        };

        if (verifyCode === "") {
            validationResult = {
                success: false,
                msg: "验证码不能为空，请填写"
            }
        }

        return validationResult;
    },
    updateAll(source: Object) {
        this._all = Object.assign({}, this._all, source);
    },
    getAll() {
        return this._all;
    },
    clearAll() {
        this._all = {
            verifyCode: "",
            business_no: "",
            orderId: "",
            rechargeId: ""
        };
    }

};
MicroEvent.mixin(RechargeWithBAOFUStore);


appDispatcher.register(function (payload) {
    switch (payload.actionName) {
        case "getInitialData_rbfs":
            RechargeWithBAOFUStore.updateAll(payload.data);
            break;
        case "changeVerifyCode_rbfs":
            RechargeWithBAOFUStore.updateAll({
                verifyCode:payload.data.verifyCode
            });
            RechargeWithBAOFUStore.trigger("verifyCodeChange");
            break;
        case "rechargeWithBAOFU_rbfs":
            let {
                verifyCode,
                business_no,
                orderId,
                rechargeId
            } = RechargeWithBAOFUStore.getAll();

            let rechargeFormCheckResult = RechargeWithBAOFUStore.rechargeFormCheck();
            if (rechargeFormCheckResult.success) {
                RechargeWithBAOFUStore.trigger("RechargeWithBAOFUStarting");
                ajax({
                    ciUrl: "/user/v2/bfQuickRecharge",
                    data: {
                        verifyCode,
                        business_no,
                        orderId,
                        rechargeId
                    },
                    success: function (rs) {
                        if (rs.code === 0) {
                            RechargeWithBAOFUStore.trigger("RechargeWithBAOFUSuccess");
                        } else {
                            RechargeWithBAOFUStore.trigger("RechargeWithBAOFUFailed", rs.description);
                        }
                    }
                })

            } else {
                RechargeWithBAOFUStore.trigger("RechargeWithBAOFUFailed", rechargeFormCheckResult.msg);
            }
            break;
        default:
        //no op
    }
});

module.exports = RechargeWithBAOFUStore;
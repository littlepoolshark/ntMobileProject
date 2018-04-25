var MicroEvent = require('../lib/microevent.js');
var appDispatcher = require('../dispatcher/dispatcher.js');
var ajax = require("../lib/ajax.js");
var cookie = require("../lib/cookie");


var OpenRedPackageStore = {
    _all: {
        userName: "",
        couponId: "",
        applyTo: ""//适用范围的文字描述
    },
    getAll() {
        return this._all;
    },
    updateAll(source) {
        this._all = Object.assign({}, this._all, source);
    },
    clearAll() {
        this._all = {
            userName: "",
            couponId: ""
        }
    }
};
MicroEvent.mixin(OpenRedPackageStore);


appDispatcher.register(function (payload) {

    switch (payload.actionName) {
        case "getInitData_orp":
            ajax({
                ciUrl: "/user/v2/accessUserShareReward",
                data:{
                    configId:payload.data.couponId,
                },
                success(rs) {
                    if (rs.code === 0) {
                        OpenRedPackageStore.updateAll({
                            applyTo: rs.data.susInfo.userType,
                            userName:rs.data.susInfo.userName
                        });
                        OpenRedPackageStore.trigger("change");
                    }
                }
            });
            OpenRedPackageStore.updateAll({
                couponId: payload.data.couponId
            });
            OpenRedPackageStore.trigger("change");
            break;
        case "openRedPackage_orp":
            OpenRedPackageStore.trigger("isGettingRedPackage");
            ajax({
                ciUrl: "/user/v2/openUserShareReward",
                data: {
                    configId: parseInt(payload.data.couponId)
                },
                success(rs) {
                    if (rs.data.code === "0001") {
                        OpenRedPackageStore.updateAll({
                            couponAmount: rs.data.data.money,
                            couponType: rs.data.data.coupon_type === "redpackege" ? "redPackage" : "interest"
                        });
                        OpenRedPackageStore.trigger("openRedPackageSuccess");
                    } else {
                        OpenRedPackageStore.trigger("openRedPackageFailed", rs.data.msg);
                    }
                }
            });
            break;
        default:
        //no op
    }
});

module.exports = OpenRedPackageStore;
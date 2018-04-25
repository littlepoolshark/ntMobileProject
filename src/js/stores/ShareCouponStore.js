var MicroEvent = require('../lib/microevent.js');
var appDispatcher = require('../dispatcher/dispatcher.js');
var ajax = require("../lib/ajax");
var cookie = require("../lib/cookie");


var ShareCouponStore = {
    _all: {
        couponList: []
    },
    getAll() {
        return this._all;
    },
    updateAll(source) {
        this._all = Object.assign({}, this._all, source);
    }
};
MicroEvent.mixin(ShareCouponStore);


appDispatcher.register(function (payload) {
    switch (payload.actionName) {
        case "getInitialData_shareCoupon":
            ajax({
                ciUrl: "/user/v2/getUserShare",
                success: function (rs) {
                    if (rs.code === 0) {
                        ShareCouponStore.updateAll({
                            couponList: rs.data.list.map((item, index) => {
                                return {
                                    id:item.id,
                                    couponType: item.coupon_type === "redpackege" ? "redPackage" : "interest",
                                    counponAmount: item.couponValue,
                                    remaindCount: item.remainNumber,
                                    hadBeenGetCount: parseInt(item.countNumber),
                                    deadline:item.end_time || "不限",
                                    isValid:item.is_late === "no"  ? true : false,
                                    couponHint:item.coupon_type === "redpackege" ? `单笔投资≥${item.useCondition}元` : `加息期限：${item.useCondition === 0 ?  "不限" : item.useCondition + "个月" }`,
                                    useCondition:`${item.user_type}使用`
                                }
                            })
                        });
                        ShareCouponStore.trigger("change");
                    }
                }
            });
            break;
        default:
        //no op
    }
});

module.exports = ShareCouponStore;
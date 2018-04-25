var MicroEvent = require('../lib/microevent.js');
var appDispatcher = require('../dispatcher/dispatcher.js');
var ajax = require("../lib/ajax.js");

var AutoPurchaseIndexStore = {
    _all: {
        iSetAutoPurchaseRule: false,
        isAutoPurchaseSwitchOpen: false,
        minRate: "",//最低利率
        deadline: "",//项目期限
        validDate: ""//有限期限
    },
    getAll() {
        return this._all;
    },
    updateAll(source) {
        this._all = Object.assign({}, this._all, source);
    }

};
MicroEvent.mixin(AutoPurchaseIndexStore);

appDispatcher.register(function (payload) {
    switch (payload.actionName) {
        case "getInitialData_autoPurchaseIndex":
            ajax({
                ciUrl: "/user/v2/userAutoBidInfo",
                success(rs) {
                    if (rs.code === 0) {
                        let source={};
                        if (rs.data) {
                            source = {
                                iSetAutoPurchaseRule: true,
                                isAutoPurchaseSwitchOpen: rs.data.status === "on",
                                minRate: (rs.data.yearRate * 100).toFixed(1),
                                deadline: `${rs.data.minPeriod}-${rs.data.maxPeriod}`,
                                validDate:rs.data.startTime === null || rs.data.endTime === null ? "长期有效" :`${rs.data.startTime} 至 ${rs.data.endTime}`
                            }
                        }else {
                            source={
                                iSetAutoPurchaseRule:false
                            }
                        }
                        AutoPurchaseIndexStore.updateAll(source);
                        AutoPurchaseIndexStore.trigger("change");
                    }
                }
            });
            break;
        case "toggleAutoPurchaseSwitch_autoPurchaseIndex":
            let isAutoPurchaseSwitchOpen=!AutoPurchaseIndexStore.getAll().isAutoPurchaseSwitchOpen;
            ajax({
                ciUrl: "/user/v2/updUserAutoBidStatus",
                data:{
                   status:isAutoPurchaseSwitchOpen ? "off" : "on"
                },
                success(rs) {
                    if (rs.code === 0) {
                        AutoPurchaseIndexStore.updateAll({
                            isAutoPurchaseSwitchOpen
                        });
                        AutoPurchaseIndexStore.trigger("change");
                    }
                }
            }); 
        break;    
        default:
        //no op
    }
});

module.exports = AutoPurchaseIndexStore;
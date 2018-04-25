var MicroEvent = require('../lib/microevent.js');
var appDispatcher = require('../dispatcher/dispatcher.js');
var ajax = require("../lib/ajax");
var cookie = require("../lib/cookie");

import { trim } from "../lib/trims";


var SetNewMobilePhoneNoStore = {
    _all: {
        newPhoneNo: "",
        canOldPoneNoReceiveMsg: ''
    },
    checkForm() {
        let {
            newPhoneNo
        } = this._all;

        let confirmResult = {
            success: true,
            msg: ""
        };

        if (newPhoneNo === "") {
            confirmResult = {
                success: false,
                msg: "新手机号码不能为空，请输入！"
            }
        }

        return confirmResult;
    },
    updateAll(source) {
        this._all = Object.assign({}, this._all, source);
    },
    getAll() {
        return this._all;
    },
    clearAll() {
        this._all = {
            newPhoneNo: "",
            canOldPoneNoReceiveMsg: ''
        };
    }

};
MicroEvent.mixin(SetNewMobilePhoneNoStore);


appDispatcher.register(function (payload) {
    switch (payload.actionName) {
        case "changeFieldValue_mmpa":
            let source = {};
            source[payload.data.fieldName] = payload.data.fieldValue;
            SetNewMobilePhoneNoStore.updateAll(source);
            SetNewMobilePhoneNoStore.trigger("change");
            break;
        case "changeModifyType_mmpa":
            SetNewMobilePhoneNoStore.updateAll({
                canOldPoneNoReceiveMsg:payload.data.canOldPoneNoReceiveMsg
            });
            SetNewMobilePhoneNoStore.trigger("change");
            break;
        case "submitForm_mmpa":
            let confirmResult = SetNewMobilePhoneNoStore.checkForm();

            if (confirmResult.success) {
                let {
                    newPhoneNo,
                    canOldPoneNoReceiveMsg
                } = SetNewMobilePhoneNoStore.getAll();

                ajax({
                    ciUrl: "/user/v2/manager",
                    data: {
                        tranCode:'NETL19',
                        mobile: newPhoneNo,
                        flag: canOldPoneNoReceiveMsg ? 'Y' : 'N',
                        channelType:'wx'
                    },
                    success: (rs) => {
                        if (rs.code === 0) {
                            let { action, orig, sign, returnurl, NOTIFYURL, wxurl } = rs.data;
                            let nextLocation = `${wxurl}?action=${encodeURI(
                                action
                              )}&orig=${encodeURI(orig)}&sign=${encodeURI(
                                sign
                              )}&returnurl=${encodeURI(returnurl)}&NOTIFYURL=${encodeURI(
                                NOTIFYURL
                              )}`;
                             SetNewMobilePhoneNoStore.trigger("setNewMobilePhoneSuccess",nextLocation);
                        } else {
                            SetNewMobilePhoneNoStore.trigger("setNewMobilePhoneFailed", rs.description);
                        }
                    }
                })
            } else {
                SetNewMobilePhoneNoStore.trigger("formCheckFailed", confirmResult.msg);
            }

            break;
        default:
        //no op
    }
});

module.exports = SetNewMobilePhoneNoStore;
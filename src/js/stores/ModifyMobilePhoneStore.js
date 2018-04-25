var MicroEvent = require('../lib/microevent.js');
var appDispatcher = require('../dispatcher/dispatcher.js');
var ajax = require("../lib/ajax");
var cookie = require("../lib/cookie");

import { trim } from "../lib/trims";


var ModifyMobilePhoneStore = {
    _all: {
        idCardNo: "",
        loginPassword: ""
    },
    checkForm() {
        let {
            idCardNo,
            loginPassword
        } = this._all;

        let confirmResult = {
            success: true,
            msg: ""
        };

        let checkPassword_regexp = /^(?!^\d+$)(?!^[a-zA-Z]+$)[0-9a-zA-Z]{6,16}$/;//登录密码和交易密码共用同一个正则表达式来验证

        if (idCardNo === "") {
            confirmResult = {
                success: false,
                msg: "身份证号码不能为空，请输入！"
            }
        } else if (loginPassword === "") {
            confirmResult = {
                success: false,
                msg: "登录密码不能为空，请输入！"
            }
        }

        return confirmResult;
    },
    updateAll(source){
        this._all=Object.assign({},this._all,source);
    },
    getAll() {
        return this._all;
    },
    clearAll(){
        this._all={
            idCardNo:"",
            loginPassword:""
        }
    }

};
MicroEvent.mixin(ModifyMobilePhoneStore);


appDispatcher.register(function (payload) {
    switch (payload.actionName) {
        case "changeFieldValue_mmpa":
            let source = {};
            source[payload.data.fieldName] = payload.data.fieldValue;
            ModifyMobilePhoneStore.updateAll(source);
            ModifyMobilePhoneStore.trigger("change");
            break;
        case "confirmToModify_mmpa":
            let confirmResult = ModifyMobilePhoneStore.checkForm();
            if (confirmResult.success) {
                let {
                    idCardNo,
                    loginPassword
                } = ModifyMobilePhoneStore.getAll();

                ajax({
                    ciUrl: "/user/v2/modifyMobile_1",
                    data: {
                        idcard: idCardNo,
                        loginPwd: loginPassword
                    },
                    success: function (rs) {
                        if (rs.code === 0) {
                            ModifyMobilePhoneStore.trigger("idAuthenticationSuccess");
                        } else {
                            ModifyMobilePhoneStore.trigger("idAuthenticationFailed", rs.description);
                        }
                    }
                })
            } else {
                ModifyMobilePhoneStore.trigger("formCheckFailed", confirmResult.msg);
            }

            break;
        default:
        //no op
    }
});

module.exports = ModifyMobilePhoneStore;
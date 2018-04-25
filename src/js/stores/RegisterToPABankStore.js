var MicroEvent = require('../lib/microevent.js');
var appDispatcher = require('../dispatcher/dispatcher.js');
var ajax = require("../lib/ajax.js");
var cookie = require("../lib/cookie");


var registerToPABankStore = {
    _all: {
        realName: "",
        idcard: "",
        bankId: "",
        bankName: "",
        bankCardNo: "",
        userPhoneNo: "",
        provinceText: "广东",
        cityText: "深圳市",
        subbranchBankName: "",
        subbranchBankId: "",
        leftQureyTime: 3,//剩余的开通次数
        isNeedToSendVerificationCode: true //是否需要发送短信验证码（当后台返回的cgOpen字段的值为“4”的时候，不需要发送短信验证码）
    },
    trimCardNo(cardNo) {
        cardNo = cardNo + "";
        return cardNo.replace(/\s+/g, "");
    },
    checkForm() {
        let validationResult = {
            success: true,
            msg: ""
        };

        let {
            realName,
            idcard,
            bankId,
            bankName,
            bankCardNo,
            userPhoneNo,
            provinceText,
            cityText,
            subbranchBankName,
            subbranchBankId
            } = this._all;

        bankCardNo = this.trimCardNo(bankCardNo);//去除格式化加入的空格


        if (realName === "") {
            validationResult = {
                success: false,
                msg: "真实姓名不能为空，请输入"
            };
        } else if (!/^[\u4e00-\u9fa5]+$/i.test(realName)) {
            validationResult = {
                success: false,
                msg: "姓名只能是中文字符，请检查"
            };
        } else if (realName.length > 10) {
            validationResult = {
                success: false,
                msg: "姓名不能超过10个字符，请重新输入"
            };
        } else if (idcard === "") {
            validationResult = {
                success: false,
                msg: "身份证号码不能为空，请输入"
            };
        } else if (bankId === "") {
            validationResult = {
                success: false,
                msg: "开户银行不能为空，请选择"
            };
        } else if (bankCardNo === "") {
            validationResult = {
                success: false,
                msg: "银行卡号不能为空，请输入"
            };
        } else if (bankCardNo.length > 20 || bankCardNo.length < 13) {
            validationResult = {
                success: false,
                msg: "银行卡号长度有误，请检查"
            };
        } else if (!(/^\d+$/g).test(bankCardNo)) {
            validationResult = {
                success: false,
                msg: "银行卡号格式有误，请检查"
            };
        } else if (provinceText === "" || cityText === "") {
            validationResult = {
                success: false,
                msg: "开户行地区不能为空，请选择"
            };
        } else if (subbranchBankName === "" || subbranchBankId === "") {
            validationResult = {
                success: false,
                msg: "开户支行不能为空，请选择"
            };
        } else if (userPhoneNo === "") {
            validationResult = {
                success: false,
                msg: "手机号码不能为空，请输入"
            };
        } else if (!(/1\d{10}$/i).test(userPhoneNo)) {
            validationResult = {
                success: false,
                msg: "手机号码格式有误，请检查"
            };
        }

        return validationResult;
    },
    getAll() {
        return this._all;
    },
    updateAll(source) {
        this._all = Object.assign(this._all, source);
    },
    storeFormDataInLocal(){
        let {
            realName,
            userPhoneNo,
            idcard,
            bankCardNo
        }=this._all;

        let RTPAB_form={
            realName,
            userPhoneNo,
            idcard,
            bankCardNo
        };

        localStorage.setItem("RTPAB_form",JSON.stringify(RTPAB_form));
    },
    clearAll() {
        this._all = {
            realName: "",
            idcard: "",
            bankId: "",
            bankName: "",
            bankCardNo: "",
            userPhoneNo: cookie.getCookie("phoneNo"),
            provinceText: "广东",
            cityText: "深圳市",
            subbranchBankName: "",
            subbranchBankId: "",
            leftQureyTime: 3,//剩余的开通次数
            isNeedToSendVerificationCode: true
        }
    }

};
MicroEvent.mixin(registerToPABankStore);

appDispatcher.register(function (payload) {
    switch (payload.actionName) {
        case "getInitialData_registerToPABank":
          
            ajax({
                ciUrl:"/user/v2/securityCenter",
                success(rs){
                    let {
                        userPhoneNo,
                        localData,
                        queryData
                    }=payload.data;
        
                    if(rs.code === 0){
                        let certificationVerifyInfo = rs.data.certificationVerifyInfo;//这个字段是新系统（对接平安存管后的系统）返回的有关实名认证的信息
                        let certificationVerifyInfo_old = rs.data.idCardVerifyInfo;//这个字段是旧系统（对接平安存管前的系统）返回的有关实名认证的信息
                        let bankInfo_old = rs.data.bankInfo;//这个字段是旧系统（对接平安存管前的系统）返回的有关用户银行相关的信息
                        let zxcgOpenInfo = rs.data.zxcgOpenInfo;
                        let isCertificationSuccess = certificationVerifyInfo.certificationVerified === "yes";//实名认证是否已经通过   
                        let newCertificationVerifyInfo={};
                        let newBankInfo={};

                        if(isCertificationSuccess){
                            registerToPABankStore.trigger("certificationIsSuccess");
                            let {
                                username,
                                idcardno,
                                bankid,
                                bankname,
                                bankcardNo,
                                mobile
                            }=certificationVerifyInfo;

                            newCertificationVerifyInfo = {
                                realName:username,
                                idcard:idcardno,
                                bankId:bankid,
                                bankName:bankname,
                                bankCardNo:bankcardNo,
                                userPhoneNo:mobile
                            }
                        }else {
                            let {
                                idcardFull,
                                realNameFull,
                                idCardVerified
                            }=certificationVerifyInfo_old;

                            let {
                                bankId,
                                bankName,
                                bankCardNo,
                                hadSelectedNewBank
                            }=Object.assign({},localData,queryData);

                            
                            if(idCardVerified === "yes"){
                                registerToPABankStore.trigger("certificationIsSuccess_old");
                                newCertificationVerifyInfo = {
                                    realName:realNameFull,
                                    idcard:idcardFull
                                }
                            };

                            newBankInfo={
                                bankId:bankId || bankInfo_old.bankId,
                                bankName:bankName || bankInfo_old.bankName,
                                bankCardNo:hadSelectedNewBank === "true" ? bankCardNo : (bankCardNo ? bankCardNo :  bankInfo_old.bankCardnoFull)
                            }                           
                        }
                        
                        //组装来自各方的数据
                        let dataNeedToSync = Object.assign(
                            {
                                leftQureyTime:zxcgOpenInfo.leftQureyTime,
                                isNeedToSendVerificationCode: zxcgOpenInfo.cgOpen === "4" &&  zxcgOpenInfo.migration === "1" ? false : true //“migration”是用来标识是否是老客户，“0”表示是老客户，“1”表示否。
                            },
                            localData,
                            queryData,
                            newCertificationVerifyInfo,
                            newBankInfo,
                            {
                                userPhoneNo
                            }
                        );
                        registerToPABankStore.updateAll(dataNeedToSync);
                        registerToPABankStore.trigger("change");
                    }
                }
            });
            
            break;
        case "changeFieldValue_registerToPABank":
            let source = {};
            source[payload.data.fieldName] = payload.data.fieldValue;
            registerToPABankStore.updateAll(source);
            registerToPABankStore.trigger("change");
            break;
        case "submitRegisterForm_registerToPABank"://提交给宝付进行实名认证
            let validationResult = registerToPABankStore.checkForm();
            if (validationResult.success) {
                let {
                    realName,
                    idcard,
                    bankId,
                    bankName,
                    bankCardNo,
                    userPhoneNo,
                    isNeedToSendVerificationCode
                    } = registerToPABankStore.getAll();
                bankCardNo = registerToPABankStore.trimCardNo(bankCardNo);//去除格式化加入的空格
                

                registerToPABankStore.trigger("registerRequestIsStarting");
                ajax({
                    ciUrl: "/user/v2/manager",
                    data: {
                        functionID: "register.authc",
                        AcctName: realName,
                        MobilePhone: userPhoneNo,
                        IdCode: idcard,
                        RelatedAcctId: bankCardNo,
                        TranType: bankId
                    },
                    success(rs) {
                        if (rs.code === 0) {
                            registerToPABankStore.trigger("realNameCertificationSuccess",isNeedToSendVerificationCode);
                        }else if(rs.code === 10010){//这种情况属于，用户在其他终端已经成功开通过平安存管了。
                            registerToPABankStore.trigger("registerToPABankSuccessAlready");
                        }else {
                            registerToPABankStore.updateAll({
                                leftQureyTime:rs.data.leftTimes
                            });
                            registerToPABankStore.trigger("realNameCertificationFailed", rs.description);
                        }
                    }
                })

            } else {
                registerToPABankStore.trigger("submitRegisterFormFailed", validationResult.msg);
            }
            break;
        case "submitVerificationCode_registerToPABank"://提供给平安银行进行存管子账户的开通,短信验证码回填的接口
            let {
                realName,
                idcard,
                bankId,
                bankName,
                bankCardNo,
                userPhoneNo,
                provinceText,
                cityText,
                subbranchBankName,
                subbranchBankId
                } = registerToPABankStore.getAll();
            bankCardNo = registerToPABankStore.trimCardNo(bankCardNo);//去除格式化加入的空格
            let serialNo=cookie.getCookie("SerialNo_registerToPABank");
               
            registerToPABankStore.trigger("registerRequestIsStarting");
            ajax({
                ciUrl: "/user/v2/manager",
                data: {
                    functionID: "register.per.fillSmsAndconfirm",
                    AcctName: realName,
                    MobilePhone: userPhoneNo,
                    IdCode: idcard,
                    RelatedAcctId: bankCardNo,
                    TranType: bankId,
                    OutAcctIdProName:provinceText,
                    OutAcctIdCitydName:cityText,
                    BankName:bankName,
                    SerialNo:serialNo,
                    MsgCode:payload.data.verificationCode,
                    CustName:realName
                },
                success(rs) {
                    if (rs.code === 0) {
                        registerToPABankStore.trigger("registerToPABankSuccess");
                    }else {
                        //如果后台返回的是这些状态码则代表着是属于短信验证码方面的错误
                        if([10000,10001,10002].indexOf(rs.code) > -1){
                            registerToPABankStore.trigger("registerToPABankFailed", rs.description,"verificationCodeError");
                        }else if(rs.code === 10010){
                            registerToPABankStore.trigger("registerToPABankSuccessAlready");
                        }else {
                            registerToPABankStore.updateAll({
                                leftQureyTime:rs.data.leftTimes
                            });
                            registerToPABankStore.trigger("registerToPABankFailed", rs.description);
                        }
                        
                    }
                }
            })
            break;
        default:
        //no op
    }
});

module.exports = registerToPABankStore;
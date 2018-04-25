var MicroEvent = require('../lib/microevent.js');
var appDispatcher=require('../dispatcher/dispatcher.js');
var ajax=require("../lib/ajax.js");
var cookie=require("../lib/cookie");

var RegisterToZXBankStore={
    _all:{
        realName:"",
        isRealNameReadOnly:false,
        idcard:"",
        isIdcardReadOnly:false,
        bankId:"",
        bankName:"",
        idBankNameReadOnly:true,
        cardNo:"",
        isCardNoReadOnly:false,
        needModify:"yes",
        loginName:"",
        leftQureyTime:3,//剩余的开通次数
        isOpenZXShortcut:false,//是否已经开通快捷支付
        visitFrom:"",//是否是从银行卡列表返回到此页面的标志位
        showHintOfDifferentPhoneNo:false//是否显示“开通中信存管手机号与登录号码不同”的提示
    },
    trimCardNo(cardNo){
        cardNo=cardNo + "";
        return cardNo.replace(/\s+/g,"");
    },
    checkForBindCardForm(){
        let validationResult={
            success:true,
            msg:""
        };

        let {
            realName,
            idcard,
            bankId,
            cardNo,
            loginName
            }=this._all;
        cardNo=this.trimCardNo(cardNo);//去除格式化加入的空格


        if(realName === ""){
            validationResult={
                success:false,
                msg:"真实姓名不能为空，请输入"
            };
        }else if(realName.length > 30){
            validationResult={
                success:false,
                msg:"姓名过长，请重新输入"
            };
        }else if(idcard === ""){
            validationResult={
                success:false,
                msg:"身份证号码不能为空，请输入"
            };
        }else if(bankId === ""){
            validationResult={
                success:false,
                msg:"开户行不能为空，请选择"
            };
        }else if(cardNo === ""){
            validationResult={
                success:false,
                msg:"银行卡号不能为空，请输入"
            };
        }else if(cardNo.length > 20 || cardNo.length < 13){
            validationResult={
                success:false,
                msg:"银行卡号长度有误，请检查"
            };
        }else if(!(/^\d+$/g).test(cardNo)){
            validationResult={
                success:false,
                msg:"银行卡号格式有误，请检查"
            };
        }else if(loginName === ""){
            validationResult={
                success:false,
                msg:"手机号码不能为空，请输入"
            };
        }else if(!(/1\d{10}$/i).test(loginName)){
            validationResult={
                success:false,
                msg:"手机号码格式有误，请检查"
            };
        }

        return validationResult;
    },
    getAll(){
        return this._all;
    },
    updateAll(source){
        this._all=Object.assign(this._all,source);
    },
    clearAll(){
        this._all={
            realName:"",
            isRealNameReadOnly:false,
            idcard:"",
            isIdcardReadOnly:false,
            bankId:"",
            bankName:"",
            idBankNameReadOnly:true,
            cardNo:"",
            isCardNoReadOnly:false,
            needModify:"yes",
            loginName:"",
            leftQureyTime:3,//剩余的开通次数
            isOpenZXShortcut:false,//是否已经开通快捷支付
            visitFrom:"",//是否是从银行卡列表返回到此页面的标志位
            showHintOfDifferentPhoneNo:false//是否显示“开通中信存管手机号与登录号码不同”的提示
        }
    }

};
MicroEvent.mixin(RegisterToZXBankStore);

appDispatcher.register(function(payload){
    switch(payload.actionName){
        case "getInitialData_registerToZXBank":
            ajax({
                ciUrl:"/user/v2/securityCenter",
                success(rs){
                    if(rs.code === 0){
                        let bankInfo=rs.data.bankInfo;
                        let idCardVerifyInfo=rs.data.idCardVerifyInfo;
                        let zxcgOpenInfo=rs.data.zxcgOpenInfo;
                        let mobileVerifyInfo=rs.data.mobileVerifyInfo;
                        let dealPassVerifyInfo=rs.data.dealPassVerifyInfo;

                        let needModify=bankInfo.needModify;
                        let leftQureyTime=zxcgOpenInfo.leftQureyTime;

                        let dataFormQuery=payload.data ? payload.data :{};

                        if(leftQureyTime < 3 || !!dataFormQuery.hadFailed){
                            needModify="yes";
                        }
                        let dataFormServer={
                            realName:idCardVerifyInfo.realNameFull,
                            isRealNameReadOnly:idCardVerifyInfo.realNameFull === "" ? false : true,
                            idcard:idCardVerifyInfo.idcardFull,
                            isIdcardReadOnly:idCardVerifyInfo.idcardFull === "" ? false : true,
                            bankId:needModify === "yes" ? "" : bankInfo.bankId,
                            bankName:needModify === "yes" ? "" : bankInfo.bankName,
                            cardNo:needModify === "yes" ? "" : bankInfo.bankCardnoFull,
                            isCardNoReadOnly:needModify === "yes" ? false : true,
                            needModify:needModify,
                            loginName:(needModify === "yes" && bankInfo.bankId !== "") ? "" :mobileVerifyInfo.mobileFull,
                            leftQureyTime:leftQureyTime,
                            isOpenZXShortcut:(bankInfo.isActive === "no" || bankInfo.isActive === "")? false : true,
                            isZXCGOpen:zxcgOpenInfo.zxcgOpen === "yes" ? true : false ,
                            zxcgOpenFailedReason:!!zxcgOpenInfo.zxcgOpenFailedReason ? zxcgOpenInfo.zxcgOpenFailedReason : "请输入新的银行卡开通存管子账户，",
                            hadIdCardVerified:idCardVerifyInfo.idCardVerified === "yes" ? true : false,
                            hadSetDealPassword:dealPassVerifyInfo.isDealPwdSet === "yes" ? true : false,
                            hadBindBankCard:bankInfo.bankCardVerified === "yes" ? true : false
                        };

                        RegisterToZXBankStore.updateAll(Object.assign(dataFormServer,dataFormQuery));
                        RegisterToZXBankStore.trigger("change","isFirstChange");
                    }
                }
            })
            break;
        case "changeFieldValue_registerToZXBank":
            let source={};
            let originLoginName=cookie.getCookie("phoneNo");
            source[payload.data.fieldName]=payload.data.fieldValue;
            if( payload.data.fieldName === "loginName"){
                if(payload.data.fieldValue.length  ===11 && payload.data.fieldValue !== originLoginName){
                    source.showHintOfDifferentPhoneNo=true;
                }
            }
            RegisterToZXBankStore.updateAll(source);
            RegisterToZXBankStore.trigger("change");
            break;
        case "submitRegisterForm_registerToZXBank":
            let validationResult=RegisterToZXBankStore.checkForBindCardForm();
            if(validationResult.success){
                let {
                    realName,
                    idcard,
                    bankId,
                    cardNo,
                    loginName,
                    isOpenZXShortcut
                    }=RegisterToZXBankStore.getAll();
                cardNo=RegisterToZXBankStore.trimCardNo(cardNo);//去除格式化加入的空格

                RegisterToZXBankStore.trigger("registerRequestIsStarting");
                ajax({
                    ciUrl:"/user/v2/registerToZhongxin",
                    data:{
                        realName,
                        idcard,
                        bankId,
                        cardNo,
                        loginName
                    },
                    success(rs){
                        RegisterToZXBankStore.trigger("registerRequestIsEnd");
                        if(rs.code === 0){
                            if(isOpenZXShortcut){
                                RegisterToZXBankStore.trigger("registerSuccessAndHadOpenZXShortcut");
                            }else{
                                //notice：暂时不引导用户开通中金的快捷支付，故硬编码触发“registerSuccessAndHadOpenZXShortcut”事件
                                //RegisterToZXBankStore.trigger("registerSuccessButNotOpenZXShortcut");
                                RegisterToZXBankStore.trigger("registerSuccessAndHadOpenZXShortcut");
                            }
                        }else {
                            RegisterToZXBankStore.updateAll({
                                leftQureyTime:rs.data.leftQureyTime,
                                needModify:"yes",
                                isCardNoReadOnly:false,
                                bankId:"",
                                bankName:"",
                                cardNo:"",
                                loginName:"",
                                hadFailed:"yes"
                            });
                            RegisterToZXBankStore.trigger("registerZXFailed",rs.description+" 剩余开通机会"+rs.data.leftQureyTime+"次");
                        }
                    },
                    error(){
                        RegisterToZXBankStore.trigger("registerRequestIsEnd");
                    }
                })
            }else {
                RegisterToZXBankStore.trigger("submitRegisterFormFailed",validationResult.msg);
            }
            break;
        default:
        //no op
    }
});

module.exports=RegisterToZXBankStore;
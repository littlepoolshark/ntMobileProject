var MicroEvent = require('../lib/microevent.js');
var appDispatcher=require('../dispatcher/dispatcher.js');
var ajax=require("../lib/ajax.js");

import config from "../config";


//生成随机数字符串，并存放在本地cookie
function generateVerifyCode(){
    let verifyCodeStr="";
    for(let i=0;i<4;i++){
        let num=(Math.random() * 9).toFixed(0);
        verifyCodeStr += num;
    }
    return verifyCodeStr;
}



var RegisterGuideStore={
    _all:{
        loginName:"",
        password:"",
        imgVerifyCode:"",
        inviteCode:"",
        randomVerifyCode:generateVerifyCode(),
        isAgreeWithAgreement:true,
        totalAmountOfInvestment:"----",
        registerUserCount:"----"
    },
    _phoneNoFormatCheck(phoneNo){
        return (/1\d{10}$/i).test(phoneNo);
    },
    checkForm(){
        let {
            loginName,
            password,
            imgVerifyCode,
            randomVerifyCode,
            isAgreeWithAgreement
            }=this._all;
        let validationResult={
            success:true,
            msg:""
        }
        if(loginName === ""){
            validationResult={
                success:false,
                msg:"手机号码不能为空，请输入"
            }
        }else if(!this._phoneNoFormatCheck(loginName)){
            validationResult={
                success:false,
                msg:"手机号码格式不正确，请检查"
            }
        }else if(password === ""){
            validationResult={
                success:false,
                msg:"登录密码不能为空，请输入"
            }
        }else if(!/^(?!^\d+$)(?!^[a-zA-Z]+$)[0-9a-zA-Z]{6,16}$/.test(password)){//  /^(?!\D+$)(?![^a-z]+$)[a-zA-Z\d]{6,}$/是匹配字母和数字混合的字符串的正则表达式
            validationResult={
                success:false,
                msg:"格式不符，请输入6~16位数字和英文的密码组合！"
            }
        }else if(password.length < 6){
            validationResult={
                success:false,
                msg:"登录密码不能少于6个字符，请检查"
            }
        }else if(isAgreeWithAgreement === false){
            validationResult={
                success:false,
                msg:"请同意农泰金融注册服务协议"
            }
        }else if(imgVerifyCode === ""){
            validationResult={
                success:false,
                msg:"验证码不能为空，请输入"
            }
        }else if(imgVerifyCode !== randomVerifyCode){
            validationResult={
                success:false,
                msg:"验证码错误，请换一个试试"
            }
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
            loginName:"",
            password:"",
            imgVerifyCode:"",
            inviteCode:"",
            randomVerifyCode:generateVerifyCode(),
            isAgreeWithAgreement:true,
            totalAmountOfInvestment:"----",
            registerUserCount:"----"
        }
    }
};
MicroEvent.mixin(RegisterGuideStore);


appDispatcher.register(function(payload){
    switch(payload.actionName){
        case "getInitialData_registerGuide":
            RegisterGuideStore.updateAll({
                inviteCode:payload.data.inviteCode,
            });
            ajax({
                ciUrl:"/platinfo/v2/homePageData",
                success:function(rs){
                    if(rs.code === 0){
                        RegisterGuideStore.updateAll({
                            totalAmountOfInvestment:rs.data.totalAmountOfInvestment,
                            registerUserCount:rs.data.registerUserCount,
                        });
                        RegisterGuideStore.trigger("change");
                    }
                }
            });
            break;
        case "toggleCheck_registerGuide":
            RegisterGuideStore.updateAll({
                isAgreeWithAgreement: !RegisterGuideStore.getAll().isAgreeWithAgreement
            });
            RegisterGuideStore.trigger("change");
            break;
        case "changeFieldValue_registerGuide":
            let source={};
            source[payload.data.fieldName]=payload.data.fieldValue;
            RegisterGuideStore.updateAll(source);
            RegisterGuideStore.trigger("change");
            break;
        case "changeVerifyCodeImg_registerGuide":
            let randomCode=generateVerifyCode();
            RegisterGuideStore.updateAll({
                randomVerifyCode:randomCode
            });
            RegisterGuideStore.trigger("change");
            break;
        case "submitRegisterForm_registerGuide":
            let validationResult=RegisterGuideStore.checkForm();
            if(validationResult.success){
                let {
                    loginName
                    }=RegisterGuideStore.getAll();
                //主要是表单交给后台再次验证（手机号码是否已经注册，图形验证码是否正确等）
                ajax({
                    ciUrl:"/user/v2/checkReigster",
                    data:{
                        phone:loginName
                    },
                    success(rs){
                        if(rs.code === 0){
                            RegisterGuideStore.trigger("formCheckSuccess");
                        }else {
                            RegisterGuideStore.trigger("formCheckFailed",rs.description);
                        }
                    }
                })
            }else {
                RegisterGuideStore.trigger("formCheckFailed",validationResult.msg);
            }
            break;
        default:
        //no op
    }
});

module.exports=RegisterGuideStore;
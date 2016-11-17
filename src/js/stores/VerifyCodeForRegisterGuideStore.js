var MicroEvent = require('../lib/microevent.js');
var appDispatcher=require('../dispatcher/dispatcher.js');
var ajax=require("../lib/ajax.js");
var cookie=require("../lib/cookie");


var VerifyCodeForRegisterGuideStore={
    _all:{
        loginName:"",
        password:"",
        verifyCode:"",
        imgVerifyCode:""
    },
    getAll(){
        return this._all;
    },
    checkForm(){
        let {
            verifyCode
            }=this._all;
        let validationResult={
            success:true,
            msg:""
        };
        if(verifyCode === ""){
            validationResult={
                success:false,
                msg:"验证码不能为空，请输入！"
            };
        }
        return validationResult;
    },
    updateAll(source){
        this._all=Object.assign(this._all,source);
    },
    clearAll(){
    }
};
MicroEvent.mixin(VerifyCodeForRegisterGuideStore);


appDispatcher.register(function(payload){
    switch(payload.actionName){
        case "getDataFromLocation_verifyCodeForRegisterGuide":
            VerifyCodeForRegisterGuideStore.updateAll(payload.data);
            VerifyCodeForRegisterGuideStore.trigger("change");
            break;
        case "changeVerifyCode_verifyCodeForRegisterGuide":
            VerifyCodeForRegisterGuideStore.updateAll({
                verifyCode:payload.data.verifyCode
            });
            VerifyCodeForRegisterGuideStore.trigger("change");
            break;
        case "submitRegisterForm_verifyCodeForRegisterGuide":
            let validationResult=VerifyCodeForRegisterGuideStore.checkForm();
            if(validationResult.success){
                let {
                    loginName,
                    password,
                    verifyCode,
                    imgVerifyCode
                    }=VerifyCodeForRegisterGuideStore.getAll();
                let postData={
                    accountName:loginName,
                    onePwd:password,
                    phone:loginName,
                    verifyCode:verifyCode,
                    imgVerifyCode:imgVerifyCode
                };
                let ntjrSource=sessionStorage.getItem("ntjrSource");
                if(!!ntjrSource){
                    postDate.ntjrSource=ntjrSource;
                }

                ajax({
                    ciUrl:"/user/v2/userRegister",
                    data:postData,
                    success:function(rs){
                        if(rs.code === 0){
                            cookie.setCookie("token",rs.data.token,59);
                            VerifyCodeForRegisterGuideStore.trigger("registerSuccess");
                        }else {
                            VerifyCodeForRegisterGuideStore.trigger("registerFailed",rs.description);
                        }
                    }
                })

            }else {
                VerifyCodeForRegisterGuideStore.trigger("registerFailed",validationResult.msg);
            }
            break;
        default:
        //no op
    }
});

module.exports=VerifyCodeForRegisterGuideStore;
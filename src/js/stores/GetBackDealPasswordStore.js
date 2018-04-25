var MicroEvent = require('../lib/microevent.js');
var appDispatcher=require('../dispatcher/dispatcher.js');
var ajax=require("../lib/ajax");

var GetBackDealPasswordStore={
    checkForm(verificationCode,newDealPassword,confirmDealPassword){
       let validationResult={
           success:true,
           msg:""
       };
        let checkPassword_regexp=/^(?!^\d+$)(?!^[a-zA-Z]+$)[0-9a-zA-Z]{6,16}$/;//登录密码和交易密码共用同一个正则表达式来验证

       if(verificationCode === ""){
           validationResult={
               success:false,
               msg:"验证码不能为空，请输入！"
           }
       }else if(!(/^[0-9]*$/.test(verificationCode))){
           validationResult={
               success:false,
               msg:"验证码格式有误，请检查"
           }
       }else if(newDealPassword === ""){
           validationResult={
               success:false,
               msg:"新交易密码不能为空，请输入！"
           }
       }else if (newDealPassword.length < 6){
           validationResult={
               success:false,
               msg:"密码至少设置6位"
           }
       }else if (!checkPassword_regexp.test(newDealPassword)){
           validationResult={
               success:false,
               msg:"密码必须是字母和数字组合"
           }
       }else if(confirmDealPassword === ""){
           validationResult={
               success:false,
               msg:"确认交易密码不能为空，请输入"
           }
       }else if(confirmDealPassword !== newDealPassword){
           validationResult={
               success:false,
               msg:"两次输入的交易密码不一致，请检查"
           }
       }

       return  validationResult;
    }

};
MicroEvent.mixin(GetBackDealPasswordStore);


appDispatcher.register(function(payload){
    switch(payload.actionName){
        case "submitGetBackDealPasswordForm":
            let validationResult=GetBackDealPasswordStore.checkForm(payload.data.verificationCode,payload.data.newDealPassword,payload.data.confirmDealPassword);
            if(validationResult.success){
                ajax({
                    ciUrl:"/user/v2/getDealPwdBack",
                    data:{
                       dealPwd:payload.data.newDealPassword,
                       verifyCode: payload.data.verificationCode
                    },
                    success:function(rs){
                        if(rs.code === 0){
                            GetBackDealPasswordStore.trigger("submitSuccess");
                        }else {
                            GetBackDealPasswordStore.trigger("submitFailed",rs.description);
                        }
                    }
                })
            }else {
                GetBackDealPasswordStore.trigger("submitFailed",validationResult.msg);
            }

            break;
        default:
        //no op
    }
});

module.exports=GetBackDealPasswordStore;
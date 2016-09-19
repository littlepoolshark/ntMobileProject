var MicroEvent = require('../lib/microevent.js');
var appDispatcher=require('../dispatcher/dispatcher.js');
var ajax=require("../lib/ajax");
var cookie=require("../lib/cookie");

import { trim } from "../lib/trims";


var SetNewPasswordStore={
    confirmNewPassword (newLoginPassword,confirmLoginPassword,originLoginPassword){
      let confirmResult={
          success:true,
          msg:""
      };
      newLoginPassword=trim(newLoginPassword);
      confirmLoginPassword =trim(confirmLoginPassword);
      originLoginPassword =trim(originLoginPassword);

      if(originLoginPassword === ""){
          confirmResult={
              success:false,
              msg:"原始密码不能为空，请输入！"
          }
      }else if(newLoginPassword === ""){
          confirmResult={
              success:false,
              msg:"新登录密码不能为空，请输入！"
          }
      }else if(newLoginPassword.length < 6 || newLoginPassword.length > 20){
          confirmResult={
              success:false,
              msg:"新登录密码长度不符合，请检查！"
          }
      }else if(confirmLoginPassword === ""){
          confirmResult={
              success:false,
              msg:"确认密码不能为空，请输入！"
          }
      }else if(newLoginPassword !== confirmLoginPassword){
          confirmResult={
              success:false,
              msg:"您两次的输入的密码不一致！"
          }
      }

      return confirmResult;
    }

};
MicroEvent.mixin(SetNewPasswordStore);


appDispatcher.register(function(payload){
    switch(payload.actionName){
        case "submitLoginPassword_setting":
            let confirmResult=SetNewPasswordStore.confirmNewPassword(payload.data.newLoginPassword,payload.data.confirmLoginPassword);
            if(confirmResult.success){
                ajax({
                    ciUrl:"/platinfo/v2/getLoginPwdBack",
                    data:{
                        userId:cookie.getCookie("tempUserId"),
                        newPwd:payload.data.newLoginPassword,
                        verifyCode:payload.data.verificationCode
                    },
                    success:function(rs){
                        if(rs.code === 0){
                            SetNewPasswordStore.trigger("setNewPasswordSuccess");
                        }else {
                            SetNewPasswordStore.trigger("setNewPasswordFailed",rs.description);
                        }
                    }
                })
            }else {
                SetNewPasswordStore.trigger("setNewPasswordFailed",confirmResult.msg);
            }

            break;
        case "submitLoginPassword_modify":
            let {
                newLoginPassword,
                confirmLoginPassword,
                originLoginPassword
                }=payload.data;
            let confirmResult_modify=SetNewPasswordStore.confirmNewPassword(newLoginPassword,confirmLoginPassword,originLoginPassword);
            if(confirmResult_modify.success){
                ajax({
                    ciUrl:"/user/v2/modifyLoginPwd",
                    data:{
                        newPwd:newLoginPassword,
                        oldPwd:originLoginPassword
                    },
                    success:function(rs){
                        if(rs.code === 0){
                            SetNewPasswordStore.trigger("modifyLoginPasswordSuccess");
                        }else {
                            SetNewPasswordStore.trigger("modifyLoginPasswordFailed",rs.description);
                        }
                    }
                })
            }else {
                SetNewPasswordStore.trigger("modifyLoginPasswordFailed",confirmResult_modify.msg);
            }
            break;
        default:
        //no op
    }
});

module.exports=SetNewPasswordStore;
var MicroEvent = require('../lib/microevent.js');
var appDispatcher=require('../dispatcher/dispatcher.js');
var ajax=require("../lib/ajax");
var cookie=require("../lib/cookie");

var SetNewPasswordStore={
    confirmNewPassword (newPassword,confirmNewPassword){
      let confirmResult={
          success:true,
          msg:""
      };
      if(newPassword !== confirmNewPassword){
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
        case "submitNewPassword":
            let confirmResult=SetNewPasswordStore.confirmNewPassword(payload.data.newPassword,payload.data.confirmNewPassword);
            if(confirmResult.success){
                ajax({
                    ciUrl:"/platinfo/v2/getLoginPwdBack",
                    data:{
                        userId:cookie.getCookie("tempUserId"),
                        newPwd:payload.data.newPassword,
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
        default:
        //no op
    }
});

module.exports=SetNewPasswordStore;
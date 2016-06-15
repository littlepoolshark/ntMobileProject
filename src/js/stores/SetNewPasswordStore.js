var MicroEvent = require('../lib/microevent.js');
var appDispatcher=require('../dispatcher/dispatcher.js');
var ajax=require("../lib/ajax.js");

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
                    method:"GET",
                    url:"/mock/submitNewPassword.json",
                    success:function(rs){
                        if(rs.success){
                            console.log("if");
                            SetNewPasswordStore.trigger("submitSuccess");
                        }else {
                            SetNewPasswordStore.trigger("submitFailed",rs.msg);
                        }
                    }
                })
            }else {
                SetNewPasswordStore.trigger("confirmFailed",confirmResult.msg);
            }

            break;
        default:
        //no op
    }
});

module.exports=SetNewPasswordStore;
var MicroEvent = require('../lib/microevent.js');
var appDispatcher=require('../dispatcher/dispatcher.js');
//var superAgent=require("superagent");
var ajax=require("../lib/ajax.js");

var DefaultStore={
    loginCheck(account,password){
        let validationResult={
            success:true,
            msg:""
        }
        if(account === "" || password == ""){
            validationResult={
                success:false,
                msg:"账号或者密码不能为空，请填写！"
            }
        }else if(account !== "13682330541" || password !== "123456") {
            validationResult={
                success:false,
                msg:"账号或者密码不正确!"
            }
        }
        return validationResult;
    }
};
MicroEvent.mixin(DefaultStore);


appDispatcher.register(function(payload){
    switch(payload.actionName){
        case "login":
            let checkResult=DefaultStore.loginCheck(payload.data.account,payload.data.password);
            if(checkResult.success){
                ajax({
                    method:"GET",
                    url:"/mock/login.json",
                    success:function(rs){
                        if(rs.success){
                            DefaultStore.trigger("loginSuccess");
                        }else {
                            DefaultStore.trigger("loginFailed",rs.msg);
                        }
                    }
                })
            }else {
                DefaultStore.trigger("loginFailed",checkResult.msg);
            }

            break;
        default:
        //no op
    }
});

module.exports=DefaultStore;
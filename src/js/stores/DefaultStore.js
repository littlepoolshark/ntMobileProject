var MicroEvent = require('../lib/microevent.js');
var appDispatcher=require('../dispatcher/dispatcher.js');
//var superAgent=require("superagent");
var ajax=require("../lib/ajax.js");

var DefaultStore={
    loginCheck(account,password){
        if(account === "13682330541" && password === "123456"){
            return true;
        }else {
            return false;
        }
    }
};
MicroEvent.mixin(DefaultStore);


appDispatcher.register(function(payload){
    switch(payload.actionName){
        case "login":
            //console.log(DefaultStore.loginCheck(payload.data.account,payload.data.password));
            //if(!DefaultStore.loginCheck(payload.data.account,payload.data.password)){
            //    console.log("into if");
            //    DefaultStore.trigger("loginFailed");
            //}else {
            //    DefaultStore.trigger("loginSuccess");
            //}
            //superAgent.get("/mock/login.json")
            //          .set("Accept","application/json")
            //          .end(function(err,res){
            //            var loginResult=JSON.parse(res.text).success;
            //            if(loginResult){
            //                DefaultStore.trigger("loginSuccess");
            //            }else {
            //                DefaultStore.trigger("loginFailed");
            //            }
            //    })
            ajax({
                method:"GET",
                url:"/mock/login.json",
                success:function(rs){
                    var loginResult=JSON.parse(rs);
                    if(loginResult.success){
                        DefaultStore.trigger("loginSuccess");
                    }else {
                        DefaultStore.trigger("loginFailed");
                    }
                }
            })
            break;
        default:
        //no op
    }
});

module.exports=DefaultStore;
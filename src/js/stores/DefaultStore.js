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
            break;
        default:
        //no op
    }
});

module.exports=DefaultStore;
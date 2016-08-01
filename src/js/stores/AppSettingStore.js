var MicroEvent = require('../lib/microevent.js');
var appDispatcher=require('../dispatcher/dispatcher.js');
var ajax=require("../lib/ajax.js");
var cookie=require("../lib/cookie.js");

var AppSettingStore={

};
MicroEvent.mixin(AppSettingStore);

appDispatcher.register(function(payload){
    switch(payload.actionName){
        case "logout":
            ajax({
                ciUrl:"/user/v2/userLogout",
                success(rs){
                    if(rs.code === 0){
                        cookie.setCookie("token","",0);
                        AppSettingStore.trigger("logoutSuccess");
                    }
                }
            });
            break;
        default:
        //no op
    }
});

module.exports=AppSettingStore;
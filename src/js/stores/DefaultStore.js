var MicroEvent = require('../lib/microevent.js');
var appDispatcher=require('../dispatcher/dispatcher.js');

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
            console.log("into store callback");
            if(DefaultStore.loginCheck(payload.data.account,payload.data.password)){
                DefaultStore.trigger("loginFailed")
            }else {
                DefaultStore.trigger("loginSuccess")
            }

            break;
        default:
        //no op
    }
});

module.exports=DefaultStore;
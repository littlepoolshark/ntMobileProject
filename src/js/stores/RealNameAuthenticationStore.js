var MicroEvent = require('../lib/microevent.js');
var appDispatcher=require('../dispatcher/dispatcher.js');
var ajax=require("../lib/ajax");
var cookie=require("../lib/cookie");

var RealNameAuthenticationStore={
    _all:{
        realName:"",
        idCardNo:""
    },
    getAll(){
        return this._all;
    },
    updateAll(source){
        this._all=Object.assign(this._all,source);
    }
};
MicroEvent.mixin(RealNameAuthenticationStore);


appDispatcher.register(function(payload){
    switch(payload.actionName){
        case "submitAuthenticationForm":
            RealNameAuthenticationStore.updateAll(payload.data);
            let {
                realName,
                idCardNo
                }=RealNameAuthenticationStore.getAll();
            ajax({
                ciUrl:"/user/v2/secrurityRealNameAuthen",
                data:{
                    realName:realName,
                    idCard:idCardNo
                },
                success(rs){
                    if(rs.code === 0){
                        RealNameAuthenticationStore.trigger("authenticateSuccess");
                    }else {
                        RealNameAuthenticationStore.trigger("authenticateFailed",rs.description);
                    }
                }
            })
            break;
        default:
        //no op
    }
});

module.exports=RealNameAuthenticationStore;
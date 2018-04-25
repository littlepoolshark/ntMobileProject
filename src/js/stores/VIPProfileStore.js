var MicroEvent = require('../lib/microevent.js');
var appDispatcher=require('../dispatcher/dispatcher.js');
var ajax=require("../lib/ajax.js");

var VIPProfileStore={
    _all:{
        userAmount:0,//用户累计投资金额
        recUsersCount:0,//推荐用户个数
        recUsersAmount:0//推荐用户累计投资额
    },
    getAll(){
        return this._all;
    },
    updateAll(source){
        this._all=Object.assign(this._all,source);
    },
    clearAll(){
        this._all={
            userAmount:0,//用户累计投资金额
            recUsersCount:0,//推荐用户个数
            recUsersAmount:0//推荐用户累计投资额
        }
    }
};
MicroEvent.mixin(VIPProfileStore);


appDispatcher.register(function(payload){
    switch(payload.actionName){
        case "getInitialData_VIPProfile":
            ajax({
                ciUrl:"/user/userGrowing.do",
                success(rs){
                    if(rs.code === 0){
                        VIPProfileStore.updateAll(rs.data);
                        VIPProfileStore.trigger("change");
                    }
                }
            });
            break;
        default:
        //no op
    }
});

module.exports=VIPProfileStore;
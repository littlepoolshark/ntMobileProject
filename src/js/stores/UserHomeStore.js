var MicroEvent = require('../lib/microevent.js');
var appDispatcher=require('../dispatcher/dispatcher.js');
var ajax=require("../lib/ajax");
var cookie=require("../lib/cookie");

var UserHomeStore={
    _all:{
        total:"----",
        totalProfit:"----",
        available:"----",
        hqAmount:"----",
        dqAmount:"----",
        hcCount:"--",
        tikectCount:"--",
    },
    getAll(){
        return this._all;
    },
    updateAll(source){
        this._all=Object.assign(this._all,source);
    }
};
MicroEvent.mixin(UserHomeStore);


appDispatcher.register(function(payload){
    switch(payload.actionName){
        case "getInitailDataFromServer_userHome":
            ajax({
                ciUrl:"/user/v2/myUserInfo",
                success(rs){
                    if(rs.code === 0){
                        UserHomeStore.updateAll(rs.data);
                        UserHomeStore.trigger("change");
                    }else {
                        UserHomeStore.trigger("getDataFailed");
                    }
                }
            })
            break;
        default:
        //no op
    }
});

module.exports=UserHomeStore;
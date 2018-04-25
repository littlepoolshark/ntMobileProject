var MicroEvent = require('../lib/microevent.js');
var appDispatcher=require('../dispatcher/dispatcher.js');
var ajax=require("../lib/ajax.js");
var cookie=require("../lib/cookie.js");

var AppSettingStore={
    _all:{
        isRiskEvaluated:false,
        userRiskType:""
    },
    updateAll(source){
        this._all=Object.assign({},this._all,source);
    },
    getAll(){
        return this._all;
    },
    clearAll(){
        this._all={
            isRiskEvaluated:false,
            userRiskType:""
        }
    }
};
MicroEvent.mixin(AppSettingStore);

appDispatcher.register(function(payload){
    switch(payload.actionName){
        case "getInitialData_ass":
            ajax({
                ciUrl:"/questions/v2/questionList",
                success(rs){
                    if(rs.code === 0){
                        AppSettingStore.updateAll({
                            isRiskEvaluated:rs.data.isTest === 1,
                            userRiskType:rs.data.isTest === 1 ? rs.data.dataList.name : ""
                        });
                        AppSettingStore.trigger("change");
                    }
                }
            });
            break;
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
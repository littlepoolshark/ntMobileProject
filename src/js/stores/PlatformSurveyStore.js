var MicroEvent = require('../lib/microevent.js');
var appDispatcher=require('../dispatcher/dispatcher.js');
var ajax=require("../lib/ajax.js");


var PlatformSurveyStore={
    _all:{
      registerUserCount:"----",
      totalAmountOfInvestment:"----",
      safeDays:"----",
      totalProfits:"----"
    },
    getAll(){
        return this._all;
    },
    updateAll(source){
        this._all=Object.assign({},this._all,source);
    },
    clearAll(){
        this._all={
            registerUserCount:"----",
            totalAmountOfInvestment:"----",
            safeDays:"----",
            totalProfits:"----"
        };
    }
};
MicroEvent.mixin(PlatformSurveyStore);


appDispatcher.register(function(payload){
    switch(payload.actionName){
        case "getInitialData_platformSurvey":
            ajax({
                ciUrl:"/platinfo/v2/homePageData",
                success:function(rs){
                    if(rs.code === 0){
                        PlatformSurveyStore.updateAll({
                            totalAmountOfInvestment:rs.data.totalAmountOfInvestment,
                            registerUserCount:rs.data.registerUserCount,
                            safeDays:rs.data.safeDays || "----",
                            totalProfits:rs.data.totalProfits || "----"
                        });
                        PlatformSurveyStore.trigger("change");
                    }
                }
            });
            break;
        default:
        //no op
    }
});

module.exports=PlatformSurveyStore;
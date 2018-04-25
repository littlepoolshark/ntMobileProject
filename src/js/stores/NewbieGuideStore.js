var MicroEvent = require('../lib/microevent.js');
var appDispatcher=require('../dispatcher/dispatcher.js');
var ajax=require("../lib/ajax.js");

import config from "../config";

var NewbieGuideStore={
    _all:{
        taskItems:[
            {
                taskName:"openZX",
                isFirstNotFinished:true,
                isFinished:false
            },
            {
                taskName:"setDealPassword",
                isFirstNotFinished:false,
                isFinished:false
            },
            {
                taskName:"firstTimeToInvest",
                isFirstNotFinished:false,
                isFinished:false
            }
        ]
    },
    getAll(){
        return this._all;
    },
    clearAll(){
        this._all={
            taskItems:[
                {
                    taskName:"openZX",
                    isFirstNotFinished:true,
                    isFinished:false
                },
                {
                    taskName:"setDealPassword",
                    isFirstNotFinished:false,
                    isFinished:false
                },
                {
                    taskName:"firstTimeToInvest",
                    isFirstNotFinished:false,
                    isFinished:false
                }
            ]
        };
    },
    updateAll(source){
        this._all=Object.assign({},this._all,source);
    }
};
MicroEvent.mixin(NewbieGuideStore);

appDispatcher.register(function(payload){
    switch(payload.actionName){
        case "getInitialData_newbieGuide":
            ajax({
                ciUrl:"/user/v2/securityCenter",
                success(rs){
                    if(rs.code === 0){
                        let result=rs.data;
                        let hadOpenZX=result.zxcgOpenInfo.zxcgOpen === "yes" && result.zxcgOpenInfo.istempuser === "no" ? true : false;
                        let hadSetDealPassword=result.dealPassVerifyInfo.isDealPwdSet === "yes" ? true : false;
                        let hadFinishedFirstInvestment=result.zxcgOpenInfo.isNew === "no" ? true : false;

                        NewbieGuideStore.updateAll({
                            taskItems:[
                                {
                                    taskName:"openZX",
                                    isFirstNotFinished:!hadOpenZX ? true : false,
                                    isFinished:hadOpenZX
                                },
                                {
                                    taskName:"setDealPassword",
                                    isFirstNotFinished:hadOpenZX && !hadSetDealPassword ? true : false,
                                    isFinished:hadSetDealPassword
                                },
                                {
                                    taskName:"firstTimeToInvest",
                                    isFirstNotFinished:hadOpenZX && hadSetDealPassword && !hadFinishedFirstInvestment ? true : false,
                                    isFinished:hadFinishedFirstInvestment
                                }
                            ]
                        });
                        NewbieGuideStore.trigger("change");
                    }
                }
            });
            break;
        default:
        //no op
    }
});

module.exports=NewbieGuideStore;
var MicroEvent = require('../lib/microevent.js');
var appDispatcher=require('../dispatcher/dispatcher.js');
var ajax=require("../lib/ajax.js");


var RepaymentScheduleStore={
    _all:{
        loanInfo:{},
        list:[]
    },
    getAll(){
        return this._all;
    },
    clearAll(){
        this._all.list=[];
    },
    updateAll(source){
        this._all=Object.assign(this._all,source);
    }
};
MicroEvent.mixin(RepaymentScheduleStore);


appDispatcher.register(function(payload){
    switch(payload.actionName){
        case "getRepaymentScheduleData":
            ajax({
                ciUrl:"/invest/v2/myDqStatData",
                success(rs){
                    if(rs.code === 0){
                        RepaymentScheduleStore.updateAll({
                            loanInfo:rs.data.loanInfo,
                            list:rs.data.records
                        });
                        RepaymentScheduleStore.trigger("change");
                    }

                }
            })
            break;
        default:
        //no op
    }
});

module.exports=RepaymentScheduleStore;
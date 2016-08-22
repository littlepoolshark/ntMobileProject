var MicroEvent = require('../lib/microevent.js');
var appDispatcher=require('../dispatcher/dispatcher.js');
var ajax=require("../lib/ajax.js");


var FixedLoanCenterStore={
    _all:{
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
MicroEvent.mixin(FixedLoanCenterStore);


appDispatcher.register(function(payload){
    switch(payload.actionName){
        case "getFixedLoanCenterData":
            ajax({
                ciUrl:"/invest/v2/myDqStatData",
                success(rs){
                    let result=rs.data;
                    if(rs.code === 0){
                        let list=[];
                        list[0]=Object.assign({type:"earnSet"},result.lcjh);
                        list[1]=Object.assign({type:"fixedLoan"},result.xmzt);
                        list[2]=Object.assign({type:"creditorLoan"},result.zqzr);
                        FixedLoanCenterStore.updateAll({
                            list:list
                        });
                        FixedLoanCenterStore.trigger("change");
                    }
                }
            })
            break;
        default:
        //no op
    }
});

module.exports=FixedLoanCenterStore;
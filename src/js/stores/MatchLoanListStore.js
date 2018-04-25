var MicroEvent = require('../lib/microevent.js');
var appDispatcher=require('../dispatcher/dispatcher.js');
var ajax=require("../lib/ajax.js");

import config from "../config";

var MatchLoanListStore={
    _all:{
        matchLoanList:[]
    },
    getAll(){
        return this._all;
    },
    clearAll(){
        this._all={
            matchLoanList:[]
        };
    },
    updateAll(source){
       this._all=Object.assign({},this._all,source);
    }
};
MicroEvent.mixin(MatchLoanListStore);


appDispatcher.register(function(payload){
    switch(payload.actionName){
        case "getInitialData_matchLoanList":
            ajax({
                ciUrl:"/invest/v2/financialMatchDetail",
                data:{
                    maxResults:"100",
                    joinId:payload.data.purchaseId,
                    type:payload.data.productType
                },
                success(rs){
                    if(rs.code === 0){
                        MatchLoanListStore.updateAll({
                            matchLoanList:rs.data.list
                        });
                        MatchLoanListStore.trigger("change");
                    }
                }
            });
            break;
            break;
        default:
        //no op
    }
});

module.exports=MatchLoanListStore;
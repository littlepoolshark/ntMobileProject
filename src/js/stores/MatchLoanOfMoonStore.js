var MicroEvent = require('../lib/microevent.js');
var appDispatcher=require('../dispatcher/dispatcher.js');
var ajax=require("../lib/ajax.js");


var MatchLoanOfMoonStore={
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
        this._all.matchLoanList=this._all.matchLoanList.concat(source.matchLoanList);
    }
};
MicroEvent.mixin(MatchLoanOfMoonStore);


appDispatcher.register(function(payload){
    switch(payload.actionName){
        case "getInitialData_matchLoanOfMoon":
            ajax({
                ciUrl:"/forever/v2/getProMatchLoans.do",
                data:{
                    joinId:payload.data.joinId
                },
                success:function(rs){
                    if(rs.code === 0){
                        MatchLoanOfMoonStore.updateAll({
                            matchLoanList:rs.data.list
                        });
                        MatchLoanOfMoonStore.trigger("change");
                    }
                }
            });
            break;
        default:
        //no op
    }
});

module.exports=MatchLoanOfMoonStore;
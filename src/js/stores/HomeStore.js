var MicroEvent = require('../lib/microevent.js');
var appDispatcher=require('../dispatcher/dispatcher.js');
var ajax=require("../lib/ajax.js");

var HomeStore={
    _all:{
        totalAmountOfInvestment:"--",
        registerUserCount:"--",
        list:[]
    },
    _processData(){
        let list=this._all.list;
        if(list.length){
            for(let i=0;i<list.length;i++){
                list[i].productApr=(list[i].productApr * 100).toFixed(1);
                list[i].remainAmount=(list[i].remainAmount / 10000).toFixed(2);
            }
        }
    },
    setAll(source){
        Object.assign(this._all,source);
        this._processData();
    },
    getAll(){
        return this._all;
    }
};
MicroEvent.mixin(HomeStore);


appDispatcher.register(function(payload){
    switch(payload.actionName){
        case "getDataFromServer":
            ajax({
                url:"/mock/homePageData.json",
                method:"GET",
                success:function(rs){
                    if(rs.code === 0){
                        HomeStore.setAll(rs.data);
                        HomeStore.trigger("change");
                    }else {
                        HomeStore.trigger("getDataFailed");
                    }
                }
            });
            break;
        default:
        //no op
    }
});

module.exports=HomeStore;
var MicroEvent = require('../lib/microevent.js');
var appDispatcher=require('../dispatcher/dispatcher.js');
var ajax=require("../lib/ajax.js");


var HomeStore={
    _all:{
        totalAmountOfInvestment:"--",
        registerUserCount:"--",
        productList:[],
        bannerList:[]
    },
    setAll(source){
        Object.assign(this._all,source);
    },
    getAll(){
        return this._all;
    }
};
MicroEvent.mixin(HomeStore);


appDispatcher.register(function(payload){
    switch(payload.actionName){
        case "home_getDataFromServer":

            ajax({
                ciUrl:"/platinfo/v2/homePageData",
                success:function(rs){
                    if(rs.code === 0){
                        HomeStore.setAll({
                            totalAmountOfInvestment:rs.data.totalAmountOfInvestment,
                            registerUserCount:rs.data.registerUserCount,
                            productList:rs.data.list
                        });
                        HomeStore.trigger("change");
                    }else {
                        HomeStore.trigger("getDataFailed");
                    }
                }
            });

            ajax({
                ciUrl:"/platinfo/v2/articleAdvertList",
                success:function(rs){
                    if(rs.code === 0){
                        for(let i=0;i<rs.data.list.length;i++){
                            rs.data.list[i].pic="http://192.168.1.9:9090"+rs.data.list[i].pic;
                        }
                        HomeStore.setAll({
                            bannerList:rs.data.list
                        });
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
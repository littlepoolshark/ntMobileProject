var MicroEvent = require('../lib/microevent.js');
var appDispatcher=require('../dispatcher/dispatcher.js');
var ajax=require("../lib/ajax.js");

import config from "../config";

var HomeStore={
    _all:{
        totalAmountOfInvestment:"--",
        registerUserCount:"--",
        productList:[],
        bannerList:[]
    },
    processProductListData(list){
        if(list.length){
            for(let i=0;i<list.length;i++){
                list[i].productApr=(list[i].productApr * 100).toFixed(1);
                list[i].remainAmount=(list[i].remainAmount / 10000).toFixed(2);
            }
        }
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
                url:config.createFullPath("homePageData"),
                method:"GET",
                success:function(rs){
                    if(rs.code === 0){
                        HomeStore.processProductListData(rs.data.list);
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
                url:config.createFullPath("articleAdverList"),
                method:"GET",
                success:function(rs){
                    if(rs.code === 0){
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
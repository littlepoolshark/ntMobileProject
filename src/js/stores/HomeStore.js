var MicroEvent = require('../lib/microevent.js');
var appDispatcher=require('../dispatcher/dispatcher.js');
var ajax=require("../lib/ajax.js");


var HomeStore={
    _all:{
        totalAmountOfInvestment:"--",
        registerUserCount:"--",
        productList:[],
        bannerList:[{//使用“加载中”图片来占位，撑开容器的高度。
            link:"",
            pic:require("../../img/banner_placeholder_loading.png"),
            title:""
        }]
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
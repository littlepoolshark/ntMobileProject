var MicroEvent = require('../lib/microevent.js');
var appDispatcher=require('../dispatcher/dispatcher.js');
var ajax=require("../lib/ajax.js");

import cookies from "../lib/cookie";


var HomeStore={
    _all:{
        totalAmountOfInvestment:"--",
        registerUserCount:"--",
        productList:[],
        hotTopicList:[//1489389244496
            {
                link:"",
                pic:require("../../../upload/ad/1489389244496.jpg")
            },
            {
                link:"",
                pic:require("../../../upload/ad/1489389244496.jpg")
            }
        ],
        bannerList:[{//使用“加载中”图片来占位，撑开容器的高度。
            link:"",
            pic:require("../../img/banner_placeholder_loading.png"),
            title:""
        }],
        zxcgOpenInfo:{},
        businessData:{}//运营数据
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
            let isLogin=!!cookies.getCookie("token");

            if(isLogin){
                ajax({
                    ciUrl:"/user/v2/securityCenter",
                    success:function(rs){
                        if(rs.code === 0){
                            HomeStore.setAll({
                                zxcgOpenInfo:rs.data.zxcgOpenInfo
                            });
                            HomeStore.trigger("change");
                        }
                    }
                });
            }
            ajax({
                ciUrl:"/platinfo/v2/homePageData",
                success:function(rs){
                    if(rs.code === 0){
                        //统一赚系列标的status字段的值为好采投的status字段值（prepublish）
                        for(let i=0;i<rs.data.list.length;i++){
                            if(rs.data.list[i].status === "pre_publish"){
                                rs.data.list[i].status="prepublish";
                                rs.data.list[i].publishTime=rs.data.list[i].publishtimeL;
                            }
                            rs.data.list[i].vipRate=rs.data.list[i].hasOwnProperty("vipRaiseRate") ? rs.data.list[i].vipRaiseRate : 0;
                        }

                        //统一月满盈，丰收盈的status字段的值为好采投的status字段值（prepublish）
                        for(let i=0;i<rs.data.foreverList.length;i++){
                            if(rs.data.foreverList[i].status === "pre_publish"){
                                rs.data.foreverList[i].status="prepublish";
                                rs.data.foreverList[i].publishTime=rs.data.foreverList[i].publishtimeL;
                                rs.data.foreverList[i].vipRate=0;
                            }
                        }
                        HomeStore.setAll({
                            totalAmountOfInvestment:rs.data.totalAmountOfInvestment,
                            registerUserCount:rs.data.registerUserCount,
                            productList:rs.data.list.concat(rs.data.foreverList),
                            hotTopicList:rs.data.hotList
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
            //平台数据
            ajax({
                ciUrl:"/platinfo/v2/platFormData",
                success:function(rs){
                    if(rs.code === 0){
                        HomeStore.setAll({
                            businessData:rs.data
                        });
                        HomeStore.trigger("change");
                    }
                }
            });

            break;
        default:
        //no op
    }
});

module.exports=HomeStore;
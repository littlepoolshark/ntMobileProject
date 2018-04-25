var MicroEvent = require('../lib/microevent.js');
var appDispatcher=require('../dispatcher/dispatcher.js');
var ajax=require("../lib/ajax.js");
var cookie=require("../lib/cookie");


var SendRedPackageStore={
    _all:{
        userName:"",
        userPhoneNo:"",
        prizeId: "",//所中奖品的id
        drawCount:0,//用户拥有的抽奖次数
        prizeList:[],//奖品列表
        sendRedPackageRecordList:[],//红包被领取的记录列表
        activityCode:0,//0代表活动正常进行中，否则就是非正常情况（未开始，找不到活动，已经结束等等）,
        activityMsg:""
    },
    getAll(){
        return this._all;
    },
    updateAll(source){
        this._all=Object.assign(this._all,source);
    },
    clearAll(){
        this._all={
            prizeId: "",//所中奖品的id
            drawCount:0,//用户拥有的抽奖次数
            prizeList:[],//奖品列表
            sendRedPackageRecordList:[],//红包被领取的记录列表
            activityCode:0,//0代表活动正常进行中，否则就是非正常情况（未开始，找不到活动，已经结束等等）,
            activityMsg:""
        }
    }
};
MicroEvent.mixin(SendRedPackageStore);


appDispatcher.register(function(payload){
    let {
        drawCount,
        activityCode,
        activityMsg,
        }=SendRedPackageStore.getAll();
    let isLogin=!!cookie.getCookie("token") && cookie.getCookie("token") !== "(null)";

    switch(payload.actionName){
        case "getInitialData_srp":
            //获取所有奖品列表
            ajax({
                ciUrl:"/activity/getSpringGoodsGetList.do?no=C170118_1",
                success(rs){
                    SendRedPackageStore.updateAll({
                        prizeList:rs.goodsList,
                        activityCode:rs.activeStatus,
                        activityMsg:rs.activeMsg
                    });
                    SendRedPackageStore.trigger("change");
                }

            });
            if(isLogin){

                //获取用户拥有的抽奖次数
                ajax({
                    ciUrl:"/activity/getSpringLuckyChance.do?no=C170118_1",
                    success(rs){
                        if(rs.result.code === "0001"){
                            SendRedPackageStore.updateAll({
                                drawCount:rs.result.data.lotteryNum
                            });
                            SendRedPackageStore.trigger("change");
                        }
                    }

                });

                //获取用户的被领取红包的记录列表
                ajax({
                    ciUrl:"/activity/queryShareList.do",
                    success(rs){
                        if(rs.investList.length){
                            SendRedPackageStore.updateAll({
                                sendRedPackageRecordList:rs.investList
                            });
                            SendRedPackageStore.trigger("change");
                        }
                    }

                });

                //获取用户的中文名字
                ajax({
                    ciUrl:"/user/v2/securityCenter",
                    success(rs){
                        SendRedPackageStore.updateAll({
                            userName:rs.data.idCardVerifyInfo.realNameFull,
                            userPhoneNo:rs.data.mobileVerifyInfo.mobileFull
                        });
                        SendRedPackageStore.trigger("change");
                    }
                });
            }
            break;
        case "shareRedPackage_srp":
            if(activityCode !== 0){
                SendRedPackageStore.trigger("somethingWrongWithActivity",activityMsg);
            }else if(!isLogin){
                SendRedPackageStore.trigger("userIsNotLogin");
            }else {
                //SendRedPackageStore.trigger("canShareUrlNow");
                ajax({
                    ciUrl:"/activity/shareAcUrl.do",
                    success(rs){
                        if(rs.result.code === "0001"){
                            let drawCount=SendRedPackageStore.getAll().drawCount;
                            SendRedPackageStore.updateAll({
                                drawCount:drawCount+1
                            });
                            setTimeout(function(){
                                SendRedPackageStore.trigger("shareRedPackageSuccess");
                            },5000);

                        }else {
                            SendRedPackageStore.trigger("shareRedPackageFailed",rs.result.msg);
                        }
                    }
                });
            }
            break;
        case "luckyDraw_srp":
            if(activityCode !== 0){
                SendRedPackageStore.trigger("somethingWrongWithActivity",activityMsg);
            }else if(!isLogin){
                SendRedPackageStore.trigger("userIsNotLogin");
            }else {
                if(drawCount > 0){
                    SendRedPackageStore.trigger("requestIsStarting");
                    ajax({
                        ciUrl:"/activity/springFestival.do?no=C170118_1",
                        success(rs){
                            rs=rs.result;
                            if(rs.code === "0001"){
                                SendRedPackageStore.updateAll({
                                    prizeId:rs.data.id,
                                    drawCount:rs.data.lotteryNum
                                });
                                SendRedPackageStore.trigger("hitInTarget");
                            }
                        },
                        error(){
                            SendRedPackageStore.trigger("requestIsEnd");
                        }

                    });
                }
            }
            break;
        default:
        //no op
    }
});

module.exports=SendRedPackageStore;
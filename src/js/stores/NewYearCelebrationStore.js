var MicroEvent = require('../lib/microevent.js');
var appDispatcher=require('../dispatcher/dispatcher.js');
var ajax=require("../lib/ajax.js");
var cookie=require("../lib/cookie");


var NewYearCelebrationStore={
    _all:{
        prizeId: "",//所中奖品的id
        isCashCoupon:false,//用户所抽中的奖品是否是现金红包
        drawCount:0,//用户拥有的抽奖次数
        broadcastList:[],//中奖名单播报列表
        prizeList:[],//奖品列表
        myInvestmentRate:0,//我的累计投资年化
        cashCouponAmount:0,//已经领取的现金券的面额
        cashCouponAmountToConfirm:0,//等待确认的现金券面额
        hadGotCashCoupon:false,//是否已经领取过现金券
        rankingList:[],//推荐人数排行榜
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
            isCashCoupon:false,//用户所抽中的奖品是否是现金红包
            drawCount:0,//用户拥有的抽奖次数
            broadcastList:[],//中奖名单播报列表
            prizeList:[],//奖品列表
            myInvestmentRate:0,//我的累计投资年化
            cashCouponAmount:0,//已经领取的现金券的面额
            cashCouponAmountToConfirm:0,//等待确认的现金券面额
            hadGotCashCoupon:false,//是否已经领取过现金券
            rankingList:[],//推荐人数排行榜
            activityCode:0,//0代表活动正常进行中，否则就是非正常情况（未开始，找不到活动，已经结束等等）,
            activityMsg:""
        }
    }
};
MicroEvent.mixin(NewYearCelebrationStore);


appDispatcher.register(function(payload){
    let {
        drawCount,
        activityCode,
        activityMsg,
        hadGotCashCoupon
        }=NewYearCelebrationStore.getAll();
    let isLogin=!!cookie.getCookie("token");

    switch(payload.actionName){
        case "getInitialData_nyc":
            //获取中奖名单的播报列表和奖品列表
            ajax({
                ciUrl:"/activity/getGoodsGetList.do",
                success(rs){
                    NewYearCelebrationStore.updateAll({
                        broadcastList:rs.list,
                        prizeList:rs.goodsList,
                        activityCode:rs.activeStatus,
                        activityMsg:rs.activeMsg
                    });
                    NewYearCelebrationStore.trigger("change");
                }

            });
            //获取推荐人数排行榜
            ajax({
                ciUrl:"/activity/recommendInvestList.do",
                success(rs){
                    if(rs.list.length){
                        NewYearCelebrationStore.updateAll({
                            rankingList:rs.list
                        });
                        NewYearCelebrationStore.trigger("change");
                    }
                }

            });
            if(isLogin){
                //获取用户拥有的抽奖次数
                ajax({
                    ciUrl:"/activity/getLuckyChance.do",
                    success(rs){
                        if(rs.result.code === "0001"){
                            NewYearCelebrationStore.updateAll({
                                drawCount:rs.result.data.lotteryNum
                            });
                            NewYearCelebrationStore.trigger("change");
                        }
                    }

                });

                //获取用户的累计投资年化
                ajax({
                    ciUrl:"/activity/twoFestival.do",
                    success(rs){
                        if(rs.result.code === "0001"){
                            NewYearCelebrationStore.updateAll({
                                myInvestmentRate:parseFloat(rs.result.data.rateInvestment),
                                hadGotCashCoupon:rs.result.data.isGet
                            });
                            NewYearCelebrationStore.trigger("change");
                        }
                    }

                });
            }
            break;
        case "getNewestBroadcastList_nyc":
            ajax({
                ciUrl:"/activity/getGoodsGetList.do",
                success(rs){
                    NewYearCelebrationStore.updateAll({
                        broadcastList:rs.list
                    });
                    NewYearCelebrationStore.trigger("change");
                }
            });
            break;
        case "luckyDraw_nyc":
            if(activityCode !== 0){
                NewYearCelebrationStore.trigger("somethingWrongWithActivity",activityMsg);
            }else if(!isLogin){
                NewYearCelebrationStore.trigger("userIsNotLogin");
            }else {
                if(drawCount > 0){
                    NewYearCelebrationStore.trigger("requestIsStarting");
                    ajax({
                        ciUrl:"/activity/oneFestival.do",
                        success(rs){
                            rs=rs.result;
                            if(rs.code === "0001"){
                                NewYearCelebrationStore.updateAll({
                                    prizeId:rs.data.id,
                                    drawCount:rs.data.lotteryNum,
                                    isCashCoupon:rs.data.isCash
                                    //isCashCoupon:true
                                });
                                NewYearCelebrationStore.trigger("hitInTarget");
                            }
                        },
                        error(){
                            NewYearCelebrationStore.trigger("requestIsEnd");
                        }

                    });
                }else {
                    NewYearCelebrationStore.trigger("runOutOfDrawCount");
                }
            }
            break;
        case "confirmToGetCashCoupon_nyc":
            let hadGotCashCoupon=NewYearCelebrationStore.getAll().hadGotCashCoupon;
            if(activityCode !== 0){
                NewYearCelebrationStore.trigger("somethingWrongWithActivity",activityMsg);
            }else if(!isLogin){
                NewYearCelebrationStore.trigger("userIsNotLogin");
            }else if(hadGotCashCoupon){
                NewYearCelebrationStore.trigger("userHadGotCashCoupon");
            }else {
                let {
                    cashCouponName,
                    amount
                    }=payload.data;
                NewYearCelebrationStore.updateAll({
                    cashCouponAmountToConfirm:amount
                });
                NewYearCelebrationStore.trigger("confirmToGetCashCoupon",cashCouponName);
            }
            break;
        case "submitGetCouponForm_nyc":
            let cashCouponId=(NewYearCelebrationStore.getAll().cashCouponAmountToConfirm).toString();
            NewYearCelebrationStore.trigger("requestIsStarting");
            ajax({
                ciUrl:"/activity/twoFestivalClick.do",
                data:{
                    id:cashCouponId
                },
                success(rs){
                    if(rs.result.code === "0001"){
                        NewYearCelebrationStore.updateAll({
                            cashCouponAmount:parseInt(cashCouponId),
                            hadGotCashCoupon:true
                        });
                        NewYearCelebrationStore.trigger("submitGetCouponFormSuccess");
                    }
                },
                error(){
                    NewYearCelebrationStore.trigger("requestIsEnd");
                }

            });
            break;
        case "inviteMyFriend_nyc":
            if(activityCode !== 0){
                NewYearCelebrationStore.trigger("somethingWrongWithActivity",activityMsg);
            }else if(!isLogin){
                NewYearCelebrationStore.trigger("userIsNotLogin");
            }else {
                NewYearCelebrationStore.trigger("allowToJumpToInviteFriend");
            }
            break;
        default:
        //no op
    }
});

module.exports=NewYearCelebrationStore;
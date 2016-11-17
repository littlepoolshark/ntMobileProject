var MicroEvent = require('../lib/microevent.js');
var appDispatcher=require('../dispatcher/dispatcher.js');
var ajax=require("../lib/ajax.js");
var cookie=require("../lib/cookie");

var Double11Store={
    _all:{
        isOld:true,//是否是新手标
        isGet:false,//是否已经领取过
        loanInfo:{
            id:"",
            title:"------------",
            remainAmount:"----",
            yearRate:"--",
            deadline:"--",
            status:"",
            progress:0,
            systemCurrTime:new Date().getTime(),
            publishTime:new Date().getTime(),
            rewardRate:0//标的的奖励利息
        },
        rewardsInfo:{
            mobile:"----",
            name:"----",
            goodsRemainCount:"----"
        },
        broadcastList:[]
    },
    getAll(){
        return this._all;
    },
    updateBroadcastList(source){
        let broadcastList=this._all.broadcastList;
        let broadcastListLength=broadcastList.length;
        if(broadcastListLength === 0 || source.phoneNo !== broadcastList[broadcastListLength - 1].phoneNo ){
            this._all.broadcastList.push(source);
        }
    },
    updateAll(source){
        this._all=Object.assign(this._all,source);
    },
    clearAll(){
        this._all.broadcastList=[];
    }

};
MicroEvent.mixin(Double11Store);

appDispatcher.register(function(payload){
    let isLogin=!!cookie.getCookie("token");
    switch(payload.actionName){
        case "getInitialData_double11":
            ajax({
                ciUrl:"/activity/activityLoan.do",
                success(rs){
                    let result=rs.list[0];
                    let source=Object.assign(Double11Store.getAll().loanInfo,{
                        id:result.id,
                        title:result.title,
                        remainAmount:result.remain_amount,
                        yearRate:result.year_rate,
                        deadline:result.repayment_months,
                        status:result.status,
                        progress:result.progress,
                        publishTime:result.publish_time,
                        rewardRate:result.reward_rate,
                        systemCurrTime:result.now_time
                    });
                    Double11Store.updateAll(source);
                    Double11Store.trigger("change");
                }
            });
            if(isLogin){
                ajax({
                    ciUrl:"/activity/activityUserDetail.do?"+"no=A161108_01",
                    success(rs){
                        if(rs.code === "0001"){
                            Double11Store.updateAll({
                                isOld:rs.isOld === "true" ? true : false,
                                isGet:rs.isGet === "true" ? true : false,
                            });
                            Double11Store.trigger("change");
                        }
                    }
                });
            }
            break;
        case "updateBroadcastList_double11":
            ajax({
                ciUrl:"/activity/activityGoodsList.do?no=1&limit=1",
                success(rs){
                    if(rs.list.length > 0){
                        let result=rs.list[0];
                        let source={
                            phoneNo:result.mobile,
                            interestRate:result.name,
                            remainCount:result.goods_remain_num
                        };
                        /*  let source={
                         phoneNo:"136****0541",
                         interestRate:"1%加息券",
                         remainCount:9999
                         }*/
                        Double11Store.updateBroadcastList(source);
                        Double11Store.trigger("change");
                    }
                }
            });
            break;
        case "getInterestReward_double11":
            if(isLogin){
                let userId=cookie.getCookie("userId");
                let isOld=Double11Store.getAll().isOld;
                let no=isOld ? "A161108_01" : "A161108_02";
                Double11Store.trigger("getInterestRewardIsRequesting");
                ajax({
                    ciUrl:"/activity/activeGet.do?userId="+userId+"&no="+no,
                    success(rs){
                        if(rs.result.code === "0001"){
                            Double11Store.trigger("getInterestRewardSuccess");
                        }else if(rs.result.code === "0002"){
                            Double11Store.trigger("userHadGetInterestReward");
                        }else if(rs.result.code === "0000"){
                            Double11Store.trigger("userIsNotLogin");
                        }else if(rs.result.code === "0005" || rs.result.code === "0006"){
                            Double11Store.trigger("activityIsDisabled",rs.result.msg);
                        }
                    }
                })
            }else {
                Double11Store.trigger("userIsNotLogin");
            }
            break;
        default:
        //no op
    }
});

module.exports=Double11Store;
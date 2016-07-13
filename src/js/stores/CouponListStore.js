var MicroEvent = require('../lib/microevent.js');
var appDispatcher=require('../dispatcher/dispatcher.js');
var ajax=require("../lib/ajax.js");

var CouponListStore={
    _all:{
        couponList:[]
    },
    getAll(){
        return this._all.couponList;
    },
    updateAll(couponList){
        this._all.couponList=couponList
    }

};
MicroEvent.mixin(CouponListStore);

appDispatcher.register(function(payload){
    switch(payload.actionName){
        case "couponList_getDataFromSever":
            ajax({
                ciUrl:"/user/v2/getRedPackageAndInterestTks",
                data:{
                    reqPageNum:1,
                    maxResults:1000,
                    scope:payload.data.productType
                },
                success(rs){
                    let test={
                        id:1,
                        type:"redPackage",
                        couponAmount:200,
                        investmentMinLimit:5000,
                        useScope:"季季赚，好采投",
                        source:"主动派送加息券",
                        deadline:"2016-07-01"
                    }

                    let couponList=rs.data.list[0],
                        newCouponList=[],
                        interestList=couponList.interestList,
                        redPackageList=couponList.redpackageList;

                    //对加息券列表进行加工
                    if(interestList.length){
                        for(let i=0;i<interestList.length;i++){
                            newCouponList.push({
                                id:interestList[i].interestId,
                                type:"interestRate",
                                couponAmount:interestList[i].interestRate,
                                investmentMinLimit:0,
                                useScope:interestList[i].useScope,
                                source:interestList[i].activityName,
                                deadline:interestList[i].endTimeDesc
                            })
                        }
                    }

                    //对红包列表进行加工
                    if(redPackageList.length){
                        for(let i=0;i<redPackageList.length;i++){
                            newCouponList.push({
                                id:redPackageList[i].redpackageId,
                                type:"redPackage",
                                couponAmount:redPackageList[i].rpAmount,
                                investmentMinLimit:redPackageList[i].rpUseAmount,
                                useScope:redPackageList[i].useScope,
                                source:redPackageList[i].activityName,
                                deadline:redPackageList[i].endTimeDesc
                            })
                        }
                    }

                    //加工完毕，更新store
                    CouponListStore.updateAll(newCouponList);
                    CouponListStore.trigger("change");
                }
            })
            break;
        default:
        //no op
    }
});

module.exports=CouponListStore;
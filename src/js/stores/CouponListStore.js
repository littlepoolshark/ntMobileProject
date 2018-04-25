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
    },
    clearAll(){
        this._all.couponList=[];
    }

};
MicroEvent.mixin(CouponListStore);

appDispatcher.register(function(payload){
    switch(payload.actionName){
        case "couponList_getDataFromSever":
            //根据当前的产品类型获取优惠券列表
            let productTypeMap={
                yyz_product:"yyz",
                jjz_product:"jjz",
                loan_product:"sanbiao",
                moon:"moon",
                rich:"rich"
            };
            ajax({
                ciUrl:"/user/v2/getRedPackageAndInterestTks",
                data:{
                    reqPageNum:1,
                    maxResults:1000,
                    scope:productTypeMap[payload.data.productType],
                    investMoney:payload.data.purchaseAmount
                },
                success(rs){

                    let couponList=rs.data.list[0],
                        newCouponList=[],
                        interestList=couponList.interestList,
                        redPackageList=couponList.redpackageList;

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
                                deadline:redPackageList[i].endTimeDesc,
                                incomePeriod:0,
                                available:redPackageList[i].available//前台将购买的金额，购买产品的类型发送给后台，后台自己判断该优惠券可不可以用
                            })
                        }
                    }

                    //对加息券列表进行加工
                    if(interestList.length){
                        for(let i=0;i<interestList.length;i++){
                            newCouponList.push({
                                id:interestList[i].interestId,
                                type:"interestRate",
                                couponAmount:interestList[i].interestRate,
                                investmentMinLimit:interestList[i].inUseAmount,
                                useScope:interestList[i].useScope,
                                source:interestList[i].activityName,
                                deadline:interestList[i].endTimeDesc,
                                incomePeriod:interestList[i].incomePeriod,//该加息券的加息期限，单位为“月”
                                available:interestList[i].available
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
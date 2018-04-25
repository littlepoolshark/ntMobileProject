var MicroEvent = require('../lib/microevent.js');
var appDispatcher=require('../dispatcher/dispatcher.js');
var ajax=require("../lib/ajax.js");
var cookie=require("../lib/cookie.js");

var ApplyToQuiteFromMoonLoanStore={
    _all:{
        productId:"",
        dateList:[],//供预约退出的日期列表
        selectedDate:""//已经选择的预约退出日期
    },
    getAll(){
        return this._all;
    },
    upDateAll(source){
        this._all=Object.assign(this._all,source);
    }
};
MicroEvent.mixin(ApplyToQuiteFromMoonLoanStore);

appDispatcher.register(function(payload){

    let {
        productId,
        selectedDate
        }=ApplyToQuiteFromMoonLoanStore.getAll();

    switch(payload.actionName){
        case "getInitialData_atqfml":
            let {
                productId,
                selectedDate
                }=payload.data;
            ajax({
                ciUrl:"/forever/v2/getCanQuitDateList.do",
                data:{
                    joinId:productId
                },
                success(rs){
                    if(rs.code === 0){
                        ApplyToQuiteFromMoonLoanStore.upDateAll({
                            selectedDate:selectedDate,
                            dateList:rs.data.list,
                            productId:productId
                        });
                        ApplyToQuiteFromMoonLoanStore.trigger("change");
                    }
                }
            });
            break;
        case "changeQuitDate_atqfml":
            ApplyToQuiteFromMoonLoanStore.upDateAll({
                selectedDate:payload.data.selectedDate
            });
            ApplyToQuiteFromMoonLoanStore.trigger("change");
            break;
        case "quitFromMoonLoan_atqfml"://首次预约退出
            ajax({
                ciUrl:"/forever/v2/exitForever.do",
                data:{
                    joinId:productId,
                    type:"1",
                    exitDay:selectedDate
                },
                success(rs){
                    if(rs.code === 0){
                        ApplyToQuiteFromMoonLoanStore.trigger("quitFromMoonLoanSuccess");
                    }else {
                        ApplyToQuiteFromMoonLoanStore.trigger("requestFailed",rs.description);
                    }
                }
            });
            break;
        case "modifyQuitFromMoonLoan_atqfml"://修改预约退出
            ajax({
                ciUrl:"/forever/v2/exitForever.do",
                data:{
                    joinId:productId,
                    type:"2",
                    exitDay:selectedDate
                },
                success(rs){
                    if(rs.code === 0){
                        ApplyToQuiteFromMoonLoanStore.trigger("modifyQuitFromMoonLoanSuccess");
                    }else{
                        ApplyToQuiteFromMoonLoanStore.trigger("requestFailed",rs.description);
                    }
                }
            });
            break;
        case "cancelQuittingFromMoonLoan_atqfml"://取消预约退出
            ajax({
                ciUrl:"/forever/v2/exitForever.do",
                data:{
                    joinId:productId,
                    type:"3",
                    exitDay:selectedDate
                },
                success(rs){
                    if(rs.code === 0){
                        ApplyToQuiteFromMoonLoanStore.trigger("cancelQuittingFromMoonLoanSuccess");
                    }else{
                        ApplyToQuiteFromMoonLoanStore.trigger("requestFailed",rs.description);
                    }
                }
            });
            break;
        default:
        //no op
    }
});

module.exports=ApplyToQuiteFromMoonLoanStore;
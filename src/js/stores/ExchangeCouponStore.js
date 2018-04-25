var MicroEvent = require('../lib/microevent.js');
var appDispatcher=require('../dispatcher/dispatcher.js');
var ajax=require("../lib/ajax.js");

import config from "../config";

var ExchangeCouponStore={
    _all:{
        exchangeCode:""
    },
    getAll(){
        return this._all;
    },
    checkForm(){
        let validation={
            success:true,
            msg:""
        }
        let exchangeCode=this._all.exchangeCode;
        if(exchangeCode === ""){
            validation={
                success:false,
                msg:"兑换码不能为空，请输入！"
            }
        }

        return validation;
    },
    clearAll(){
        this._all={
            exchangeCode:""
        };
    },
    updateAll(source){
        this._all=Object.assign({},this._all,source);
    }
};
MicroEvent.mixin(ExchangeCouponStore);

appDispatcher.register(function(payload){

    switch(payload.actionName){
        case "exchangeCodeChange_exchangeCoupon":
            ExchangeCouponStore.updateAll({
                exchangeCode:payload.data.exchangeCode
            });
            ExchangeCouponStore.trigger("change");
            break;
        case "exchangeCodeSubmit_exchangeCoupon":
            let validation=ExchangeCouponStore.checkForm();
            if(validation.success){
                ajax({
                    ciUrl:"/channel/v2/receiveRewardByCode",
                    data:{
                        exchangeCode:ExchangeCouponStore.getAll().exchangeCode
                    },
                    success(rs){
                        if(rs.code === 0){
                            ExchangeCouponStore.trigger("exchangeCodeSubmitSuccess","兑换成功，" + rs.data.coupon);
                        }else {
                            ExchangeCouponStore.trigger("exchangeCodeSubmitFailed",rs.description);
                        }
                    }
                })
            }else {
                ExchangeCouponStore.trigger("formCheckFailed",validation.msg);
            }
            break;
        default:
        //no op
    }
});

module.exports=ExchangeCouponStore;
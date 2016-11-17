var MicroEvent = require('../lib/microevent.js');
var appDispatcher=require('../dispatcher/dispatcher.js');
var ajax=require("../lib/ajax.js");
var cookie=require("../lib/cookie.js");

var ZhongJinShortcutPayStore={
    _all:{
        rechargeAmount:""
    },
    checkForm(){
        let validationResult={
            success:true,
            msg:""
        };
        let {
            verifyCode,
            merBillNo
            }=this._all;
        if(verifyCode === ""){
            validationResult={
                success:false,
                msg:"验证码不能为空，请输入"
            }
        }else if(merBillNo === ""){
            validationResult={
                success:false,
                msg:"验证码错误或者过期，请重新获取"
            }
        }
        return validationResult;
    },
    getAll(){
        return this._all;
    },
    updateAll(source){
        Object.assign(this._all,source)
    }
};
MicroEvent.mixin(ZhongJinShortcutPayStore);


appDispatcher.register(function(payload){
    switch(payload.actionName){
        case "changeRechargeAmount_ZhongJinShortcutPay":
            ZhongJinShortcutPayStore.updateAll({
                rechargeAmount:payload.data.rechargeAmount
            });
            ZhongJinShortcutPayStore.trigger("change");
            break;
        case "submitZhongJinRechargeForm":
            ZhongJinShortcutPayStore.updateAll({
                merBillNo:cookie.getCookie("merBillNo_ZhongJinShortcutPay"),
                verifyCode:payload.data.verificationCode
            });
            let validationResult=ZhongJinShortcutPayStore.checkForm();
            if(validationResult.success){
                let {
                    rechargeAmount,
                    merBillNo,
                    verifyCode
                    }=ZhongJinShortcutPayStore.getAll();
                ajax({
                    ciUrl:"/user/v2/zxRecharge",
                    data:{
                        merBillNo:merBillNo,
                        verifyCode:verifyCode,
                        chargeAmount:rechargeAmount
                    },
                    success(rs){
                        if(rs.code === 0){
                            ZhongJinShortcutPayStore.trigger("ZhongJinRechargeSuccess");
                        }else {
                            ZhongJinShortcutPayStore.trigger("ZhongJinRechargeFailed",rs.description);
                        }
                    }
                });
            }else {
                ZhongJinShortcutPayStore.trigger("RechargeFormCheckFailed",validationResult.msg);
            }
            break;
        default:
        //no op
    }
});

module.exports=ZhongJinShortcutPayStore;
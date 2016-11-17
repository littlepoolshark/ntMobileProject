var MicroEvent = require('../lib/microevent.js');
var appDispatcher=require('../dispatcher/dispatcher.js');
var ajax=require("../lib/ajax.js");
var cookie=require("../lib/cookie");

import config from "../config";

var RechargeStore={
    _all:{
        id:"",
        bankName:"----",
        cardno:"**** **** **** ****",
        shortIcon:"",
        rechargeAmount:0,
        currRechargeType:"shortcut"//充值的类型：shortcut->网银充值，wechat->微信充值。默认是网银充值
    },
    getAll(){
        return this._all;
    },
    updateAll(source){
      this._all=Object.assign(this._all,source);
    },
    checkRechargeAmount(){
        let validationResult={
            success:true,
            msg:""
        };

        if(this._all.rechargeAmount < 10){
            validationResult={
                success:false,
                msg:"充值金额最低为10元"
            }
        }

        return validationResult;
    },
    clearAll(){
        this._all.rechargeAmount=0;
    }
};
MicroEvent.mixin(RechargeStore);


appDispatcher.register(function(payload){
    switch(payload.actionName){
        case "getBankCardInfoFromServer_recharge":
            ajax({
                ciUrl:"/user/v2/myBankCardInfo",
                success(rs){
                    if(rs.code === 0){
                        RechargeStore.updateAll(rs.data);
                        RechargeStore.trigger("change");
                    }
                }
            });

            //获取用户的全名和完整的身份证号码
            ajax({
                ciUrl:"/user/v2/securityCenter",
                success(rs){
                    if(rs.code === 0){
                        RechargeStore.updateAll({
                            idcardFull:rs.data.idCardVerifyInfo.idcardFull,
                            realNameFull:rs.data.idCardVerifyInfo.realNameFull
                        });
                        RechargeStore.trigger("change");
                    }
                }
            });
            break;
        case "submitRechargeAmount":
            let  rechargeAmountCheckResult=RechargeStore.checkRechargeAmount();
            if(rechargeAmountCheckResult.success){
                let {
                    currRechargeType,
                    rechargeAmount,
                    payType,//支付方式：1代表使用的是连连支付，2代表是使用的是中金支付
                    isActive//是否已经开通快捷支付（针对中金支付而言）
                    }=RechargeStore.getAll();
                let ua = window.navigator.userAgent.toLowerCase();

                if(currRechargeType === "wechat"){//微信充值
                    if(ua.match(/MicroMessenger/i) == 'micromessenger'){//判断用户是否在微信应用中打开
                         let openId=cookie.getCookie("openId");
                         ajax({
                                ciUrl:"/user/wechatPay.do",
                                data:{
                                     "rechargeAmount":rechargeAmount,
                                     "openId":openId
                                },
                                success(data){
                                     if(data.flag){
                                         WeixinJSBridge.invoke('getBrandWCPayRequest', {
                                             "appId":data.payInfo.appId,//公众号名称，由商户传入
                                             "timeStamp":data.payInfo.timeStamp,//时间戳，自1970年以来的秒数
                                             "nonceStr":data.payInfo.nonceStr, //随机串
                                             "package":data.payInfo.package,
                                             "signType":data.payInfo.signType,//微信签名方式：
                                             "paySign":data.payInfo.paySign//微信签名
                                         },function(res){
                                             if(res.err_msg == "get_brand_wcpay_request:ok" ) {// 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
                                                 //window.location.href = "/#/userHome";
                                                 RechargeStore.trigger("rechargeSuccess");
                                             } else {
                                                 RechargeStore.trigger("rechargeFailed","微信充值已取消");
                                             }

                                         });
                                     }else{
                                         RechargeStore.trigger("rechargeFailed",data.msg);
                                     }
                                }
                         });
                    }else {
                        RechargeStore.trigger("rechargeFailed","请在微信客户端打开");
                    }
                }else if(currRechargeType === "shortcut"){//网银充值
                    if(payType === 1){//连连支付（用户是否开通连连支付的快捷支付交由连连支付验证）
                        RechargeStore.trigger("submitShortcutForm");
                    }else if(payType === 2){//中金支付（用户是否开通中金支付的快捷支付由我们服务端来验证）
                        if(isActive === "yes"){//已经开通中金支付的快捷支付
                            RechargeStore.trigger("hadOpenZhongJinShortcut",rechargeAmount);
                        }else{//还没开通中金支付的快捷支付
                            RechargeStore.trigger("hadNotOpenZhongJinShortcut");
                        }
                    }

                }

            }else {
                RechargeStore.trigger("rechargeAmountCheckFailed",rechargeAmountCheckResult.msg);
            }
            break;
        case "rechargeAmountChange":
            RechargeStore.updateAll({rechargeAmount:payload.data.rechargeAmount});
            RechargeStore.trigger("change");
            break;
        case "rechargeTypeChange":
            RechargeStore.updateAll({currRechargeType:payload.data.rechargeType});
            RechargeStore.trigger("change");
            break;
        default:
        //no op
    }
});

module.exports=RechargeStore;
var MicroEvent = require('../lib/microevent.js');
var appDispatcher=require('../dispatcher/dispatcher.js');
var ajax=require("../lib/ajax.js");
var cookie=require("../lib/cookie.js");

var DeleteBankCardConfirmStore={
    _all:{
        bankCardId:"",
        verificationCode:""
    },
    updateAll(source){
        this._all=Object.assign(this._all,source)
    },
    checkVerificationCode(){
        let validationResult={
            success:true,
            msg:""
        }
        if(this._all.verificationCode === ""){
            validationResult={
                success:false,
                msg:"验证码不能为空，请输入！"
            }
        }
        return validationResult;
    }
};
MicroEvent.mixin(DeleteBankCardConfirmStore);


appDispatcher.register(function(payload){
    switch(payload.actionName){
        case "submitDeleteBankCardForm":
            DeleteBankCardConfirmStore.updateAll({
                bankCardId:payload.data.bankCardId,
                verificationCode:payload.data.verificationCode
            });
            let validationResult=DeleteBankCardConfirmStore.checkVerificationCode();
            if(validationResult.success){
                ajax({
                    ciUrl:"/user/v2/unbindBankcard",
                    data:{
                        backCardId:payload.data.bankCardId,
                        verifyCode:payload.data.verificationCode
                    },
                    success(rs){
                        if(rs.code === 0){
                            DeleteBankCardConfirmStore.trigger("deleteBankCardApplySuccess");
                        }else {
                            DeleteBankCardConfirmStore.trigger("deleteBankCardApplyFailed",rs.description);
                        }
                    }
                });
            }else {
                DeleteBankCardConfirmStore.trigger("deleteBankCardApplyFailed",validationResult.msg);
            }

            break;
        default:
        //no op
    }
});

module.exports=DeleteBankCardConfirmStore;
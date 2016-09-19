var MicroEvent = require('../lib/microevent.js');
var appDispatcher=require('../dispatcher/dispatcher.js');
var ajax=require("../lib/ajax.js");

var BindBankCardStore={
    _all:{
       userName:"",
       bankId:"",
       bankName:"",
       cardNo:"",
       region:"",//开户城市id
       branch:""//开户支行名称
    },
    checkForBindCardForm(){
        let validationResult={
            success:true,
            msg:""
        };

        let {
            bankName,
            cardNo
            }=this._all;
        console.log("cardNo:",cardNo);
        if(bankName === ""){
            validationResult={
                success:false,
                msg:"开户行不能为空，请选择"
            };
        }else if(cardNo === ""){
            validationResult={
                success:false,
                msg:"银行卡号不能为空，请输入"
            };
        }else if(!(/^\d+$/g.test(cardNo))){
            validationResult={
                success:false,
                msg:"银行卡号格式有误，请检查"
            };
        }

        return validationResult;
    },
    getAll(){
        return this._all;
    },
    updateAll(source){
        this._all=Object.assign(this._all,source);
    }

};
MicroEvent.mixin(BindBankCardStore);

appDispatcher.register(function(payload){
    switch(payload.actionName){
        case "getUserNameFromLocation":
            BindBankCardStore.updateAll({
                userName:payload.data.userName
            });
            BindBankCardStore.trigger("change");
            break;
        case "selectbankCard":
            BindBankCardStore.updateAll({
                bankId:payload.data.bankId,
                bankName:payload.data.bankName
            });
            BindBankCardStore.trigger("bankCardSelectionFinished");
            break;
        case "submitBankCardForm":
            BindBankCardStore.updateAll({
                cardNo:payload.data.cardNo
            });

            let validationResult=BindBankCardStore.checkForBindCardForm();
            if(validationResult.success){
                ajax({
                    ciUrl:"/user/v2/bindBankCard",
                    data:{
                        bankId:BindBankCardStore.getAll().bankId,
                        cardno:BindBankCardStore.getAll().cardNo
                    },
                    success(rs){
                        if(rs.code === 0){
                            BindBankCardStore.trigger("bindBankCardSuccess");
                        }else {
                            BindBankCardStore.trigger("bindBankCardFailed",rs.description);
                        }
                    }
                });
            }else {
                BindBankCardStore.trigger("bindBankCardFailed",validationResult.msg);
            }

            break;
        default:
        //no op
    }
});

module.exports=BindBankCardStore;
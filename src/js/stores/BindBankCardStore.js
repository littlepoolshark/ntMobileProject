var MicroEvent = require('../lib/microevent.js');
var appDispatcher=require('../dispatcher/dispatcher.js');
var ajax=require("../lib/ajax.js");

var BindBankCardStore={
    _all:{
       realName:"",
       bankId:"",
       bankName:"",
       cardNo:""
       //region:"",//开户城市id
       //branch:""//开户支行名称
    },
    trimCardNo(cardNo){
        cardNo=cardNo + "";
        return cardNo.replace(/\s+/g,"");
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
        cardNo=this.trimCardNo(cardNo);//去除格式化加入的空格

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
        }else if(cardNo.length > 20 || cardNo.length < 13){
            validationResult={
                success:false,
                msg:"银行卡号长度有误，请检查"
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
        case "getInitialDataFromLocation_bindBankCard":
            BindBankCardStore.updateAll(payload.data);
            BindBankCardStore.trigger("change");
            break;
        case "selectbankCard":
            BindBankCardStore.updateAll({
                bankId:payload.data.bankId,
                bankName:payload.data.bankName
            });
            BindBankCardStore.trigger("bankCardSelectionFinished");
            break;
        case "changeCardNo_bindBankCard":
            BindBankCardStore.updateAll({
                cardNo:payload.data.cardNo
            });
            BindBankCardStore.trigger("change");
            break;
        case "submitBankCardForm":

            let validationResult=BindBankCardStore.checkForBindCardForm();
            if(validationResult.success){
                let cardNo=BindBankCardStore.getAll().cardNo;

                ajax({
                    ciUrl:"/user/v2/bindBankCard",
                    data:{
                        bankId:BindBankCardStore.getAll().bankId,
                        cardno:BindBankCardStore.trimCardNo(cardNo)//去除格式化加入的空格
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
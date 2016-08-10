var appDispatcher=require("../dispatcher/dispatcher.js");

var MyBanKCardDetailAction={
    getMyBankCardDetail(){
        appDispatcher.dispatch({
            actionName:"getMyBankCardDetail"
        })
    },
    selectProvince(){
        appDispatcher.dispatch({
            actionName:"selectProvince_myBanKCardDetail"
        })
    },
    selectCity(){
        appDispatcher.dispatch({
            actionName:"selectCity_myBanKCardDetail"
        })
    },
    finishProvinceSelection(value,text){
        appDispatcher.dispatch({
            actionName:"selectProvinceFinish",
            data:{
                value:value,
                text:text
            }
        })
    },
    finishCitySelection(value,text){
        appDispatcher.dispatch({
            actionName:"selectCityFinish",
            data:{
                value:value,
                text:text
            }
        })
    },
    submitBankCardForm(branch){
        appDispatcher.dispatch({
            actionName:"submitBankCardForm_myBanKCardDetail",
            data:{
                branch:branch
            }
        })
    }
};

module.exports=MyBanKCardDetailAction;
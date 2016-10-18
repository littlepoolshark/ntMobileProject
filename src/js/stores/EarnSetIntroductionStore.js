let MicroEvent = require('../lib/microevent.js');
let appDispatcher=require('../dispatcher/dispatcher.js');
let ajax=require("../lib/ajax.js");


let  EarnSetIntroductionStore={
    _all:{},
    setAll(source){
        Object.assign(this._all,source);
    },
    getAll(){
        return this._all;
    },
    processData(data){
        data.buyProgress=data.buyProgress + "%";
        data.productApr=(data.productApr * 100).toFixed(1);
        data.remainAmount=data.remainAmount.toFixed(2);
        return data;
    }
};
MicroEvent.mixin(EarnSetIntroductionStore);


appDispatcher.register(function(payload){
    switch(payload.actionName){
        case "earnSetIntroduction_getDataFromServer":
            ajax({
                ciUrl:"/invest/v2/earnProductDetail",
                data:{
                    type:payload.data.type,
                    productId:payload.data.productId
                },
                success:function(rs){
                    if(rs.code === 0){
                        //用于测试：delete rs.data.type;
                        EarnSetIntroductionStore.setAll(EarnSetIntroductionStore.processData(rs.data));
                        EarnSetIntroductionStore.trigger("change");
                    }else {
                        EarnSetIntroductionStore.trigger("getDataFailed");
                    }

                }
            });

            break;
        default:
        //no op
    }
});

module.exports=EarnSetIntroductionStore;
let MicroEvent = require('../lib/microevent.js');
let appDispatcher=require('../dispatcher/dispatcher.js');
let ajax=require("../lib/ajax.js");

import config from "../config";

let  EarnSetIntroductionStore={
    _all:{
    },
    setAll(source){
        Object.assign(this._all,source);
    },
    getAll(){
        return this._all;
    },
    processData(data){
        data.buyProgress=(data.buyProgress * 100).toFixed(1)+"%";
        data.productApr=(data.productApr * 100).toFixed(1);
        data.remainAmount=data.remainAmount.toFixed(2);
        return data;
    }
};
MicroEvent.mixin(EarnSetIntroductionStore);


appDispatcher.register(function(payload){
    switch(payload.actionName){
        case "getDataFromServer":
            ajax({
                url:config.createFullPath("earnProductDetail"),
                method:"GET",
                success:function(rs){
                    if(rs.code === 0){
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
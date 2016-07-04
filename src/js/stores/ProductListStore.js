var MicroEvent = require('../lib/microevent.js');
var appDispatcher=require('../dispatcher/dispatcher.js');
var ajax=require("../lib/ajax.js");

import config from "../config";

var ProductListStore={
    _all:{
        productList:[]
    },
    getAll(){
        return this._all.productList;
    },
    updateAll(source){//to be remember,concat 不是变异方法。
        this._all.productList=this._all.productList.concat(source);
    }
};
MicroEvent.mixin(ProductListStore);


appDispatcher.register(function(payload){
    switch(payload.actionName){
        case "ProductList.getDataFromServer":
            ajax({
                url:config.createFullPath("financePlanData"),
                method:"GET",
                success:function(rs){
                    if(rs.code === 0){
                        let source=[];
                        if(rs.data.hq){
                            source=source.concat(rs.data.hq);
                        }
                        if(rs.data.lcjh){
                            source=source.concat(rs.data.lcjh);
                        }
                        if(rs.data.xmzt){
                            source=source.concat(rs.data.xmzt.list);
                        }
                        ProductListStore.updateAll(source);
                        ProductListStore.trigger("change");
                    }
                }
            })
            break;
        default:
        //no op
    }
});

module.exports=ProductListStore;
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
    clearAll(){
        this._all.productList=[];
    },
    updateAll(source){//to be remember,concat 不是变异方法。
        this._all.productList=this._all.productList.concat(source.list);
    }
};
MicroEvent.mixin(ProductListStore);


appDispatcher.register(function(payload){
    switch(payload.actionName){
        case "productList.getNextPage":
                ajax({
                    ciUrl:"/platinfo/v2/financePlanData",
                    success:function(rs){
                        if(rs.code === 0){
                            let source={},list=[];
                            rs.data.lcjh[0].isFirstChild=true;
                            rs.data.xmzt.list[0].isFirstChild=true;
                            list=list.concat(rs.data.hq,rs.data.lcjh,rs.data.xmzt.list);
                            source={
                                list:list
                            };
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
var MicroEvent = require('../lib/microevent.js');
var appDispatcher=require('../dispatcher/dispatcher.js');
var ajax=require("../lib/ajax.js");

import config from "../config";

var ProductListStore={
    _all:{
        productList:[],
        pageIndex:0
    },
    getAll(){
        return this._all.productList;
    },
    updateAll(source){//to be remember,concat 不是变异方法。
        this._all.productList=this._all.productList.concat(source.list);
        this._all.pageIndex=source.pageIndex;
    },
    getCurrPageIndex(){
        return this._all.pageIndex;
    }
};
MicroEvent.mixin(ProductListStore);


appDispatcher.register(function(payload){
    switch(payload.actionName){
        case "ProductList.getDataFromServer":
            let pageIndex=payload.data.pageIndex;

                ajax({
                    url:config.createFullPath("financePlanData"+ (pageIndex ? pageIndex : "")),
                    method:"GET",
                    success:function(rs){
                        if(rs.code === 0){
                            let source={},list=[];
                            if(rs.data.hq){
                                list=list.concat(rs.data.hq);
                            }
                            if(rs.data.lcjh){
                                list=list.concat(rs.data.lcjh);
                            }
                            if(rs.data.xmzt){
                                list=list.concat(rs.data.xmzt.list);
                            }
                            source={
                                list:list,
                                pageIndex:rs.data.xmzt.pageInex
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
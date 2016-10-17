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
                            //鉴于从该接口返回的天天赚数据有时候有type这个字段，有时候没有这个字段，先前端自动加上
                            if(!rs.data.hq.type){
                                rs.data.hq.type="ttz_product";
                            }
                            rs.data.lcjh[0].isFirstChild=true;
                            rs.data.xmzt.list[0].isFirstChild=true;
                            list=list.concat(rs.data.hq,rs.data.lcjh,rs.data.xmzt.list);
                            source={
                                list:list
                            };
                            console.log("productListStore source:",source);
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
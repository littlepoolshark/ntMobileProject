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
        case "productList.getNextPage":
            let pageIndex=ProductListStore.getCurrPageIndex()+1;

                ajax({
                    ciUrl:"/platinfo/v2/financePlanData",
                    data:{reqPageNum:pageIndex},
                    success:function(rs){
                        if(rs.code === 0){
                            let source={},list=[];
                            //在这个接口里面，由于请求第一页返回的数据跟请求其他页数返回的数据结构不一样，所以要写两个分支
                            if(pageIndex === 1){
                                list=list.concat(rs.data.hq,rs.data.lcjh,rs.data.xmzt.list);
                                source={
                                    list:list,
                                    pageIndex:rs.data.xmzt.pageIndex
                                }
                            }else {
                                source={
                                    list:rs.data.list,
                                    pageIndex:rs.data.pageIndex
                                }
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
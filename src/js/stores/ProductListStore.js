var MicroEvent = require('../lib/microevent.js');
var appDispatcher=require('../dispatcher/dispatcher.js');
var ajax=require("../lib/ajax.js");

import config from "../config";

var ProductListStore={
    _all:{
       list:[],
       transferringCount:0
    },
    getAll(){
        return this._all;
    },
    clearAll(){
        this._all={
            list:[],
            transferringCount:0
        };
    },
    updateAll(source){//to be remember,concat 不是变异方法。
        this._all=Object.assign(this._all,source);
    }
};
MicroEvent.mixin(ProductListStore);


appDispatcher.register(function(payload){
    switch(payload.actionName){
        case "productList.getNextPage":
                ajax({
                    ciUrl:"/platinfo/v2/financePlanData_2",
                    success:function(rs){
                        if(rs.code === 0){
                            let source={},list=[];

                            for(let i=0;i<rs.data.dqList.length;i++){
                                //统一赚系列标的status字段的值为好采投的status字段值（"prepublish"）
                                if(["jjz_product","yyz_product"].indexOf(rs.data.dqList[i].type) > -1 && rs.data.dqList[i].status === "pre_publish"){
                                    rs.data.dqList[i].status="prepublish";
                                }
                            }

                            list=[
                                {
                                    type:"moonList",
                                    items:rs.data.moonList
                                },
                                {
                                    type:"dqList",
                                    items:rs.data.dqList
                                },
                                {
                                    type:"xsList",
                                    items:rs.data.xsList
                                },
                                {
                                    type:"transferList",
                                    items:rs.data.transferList
                                },
                                {
                                    type:"hqList",
                                    items:rs.data.hqList
                                }
                            ];
                            source={
                                list:list,
                                transferringCount:rs.data.transferringCount
                            }
                            ProductListStore.updateAll(source);
                            ProductListStore.trigger("change");
                        }
                    }
                });


            break;
        default:
        //no op
    }
});

module.exports=ProductListStore;
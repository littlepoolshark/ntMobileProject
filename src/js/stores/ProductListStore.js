var MicroEvent = require('../lib/microevent.js');
var appDispatcher=require('../dispatcher/dispatcher.js');
var ajax=require("../lib/ajax.js");

var ProductListStore={
    _commonCardList:[],
    getAll(){
        return this._commonCardList;
    },
    setAll(commonCardList){
        this._commonCardList=this._commonCardList.concat(commonCardList);//to be remembered,concat 不是变异方法。
    }
};
MicroEvent.mixin(ProductListStore);


appDispatcher.register(function(payload){
    switch(payload.actionName){
        case "getDataFromServer":
            ajax({
                url:"/mock/productList2.json",
                method:"GET",
                success:function(rs){
                    if(rs.code === "0001"){
                        ProductListStore.setAll(rs.data);
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
var appDispatcher=require("../dispatcher/dispatcher.js");

var ProductListAction={
    getNextPage (){
        appDispatcher.dispatch({
            actionName:"productList.getNextPage",
        })
    }
};

module.exports=ProductListAction;
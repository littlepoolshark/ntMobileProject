var appDispatcher=require("../dispatcher/dispatcher.js");

var ProductListAction={
    getDataFromServer (pageIndex){
        appDispatcher.dispatch({
            actionName:"ProductList.getDataFromServer",
            data:{
                pageIndex:pageIndex
            }
        })

    }
};

module.exports=ProductListAction;
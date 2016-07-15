var appDispatcher=require("../dispatcher/dispatcher.js");

var MoreProductListAction={
    getInitialData(){
        appDispatcher.dispatch({
            actionName:"moreProductList_getFirstPage"
        })
    },
    getNextPage(currListType){
        appDispatcher.dispatch({
            actionName:"moreProductList_getNextPage",
            data:{
                currListType:currListType
            }
        })
    }
};

module.exports=MoreProductListAction;
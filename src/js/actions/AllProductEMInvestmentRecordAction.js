var appDispatcher=require("../dispatcher/dispatcher.js");

var AllProductEMInvestmentRecordAction={
    getInitialData(productType){
        appDispatcher.dispatch({
            actionName:"getInitialData_allProductEMInvestmentRecord",
            data:{
                productType
            }
        })
    },
    toggleListType(listType){
        appDispatcher.dispatch({
            actionName:"toggleListType_allProductEMInvestmentRecord",
            data:{
                listType:listType
            }
        })
    },
    getNextPage(){
        appDispatcher.dispatch({
            actionName:"getNextPage_allProductEMInvestmentRecord"
        })
    },
    queryProductListByType(productType){
        appDispatcher.dispatch({
            actionName:"queryProductListByType_allProductEMInvestmentRecord",
            data:{
                productType:productType
            }
        })
    }
};

module.exports=AllProductEMInvestmentRecordAction;
var appDispatcher=require("../dispatcher/dispatcher.js");

var EarnSetInvestmentRecordAction={
    getInitialData(){
        appDispatcher.dispatch({
            actionName:"getInitialData_earnSetInvestmentRecord"
        })
    },
    getNextPage(currListType){
        appDispatcher.dispatch({
            actionName:"getNextPage_earnSetInvestmentRecord",
            data:{
                currListType:currListType
            }
        })
    },
    queryProductListByType(currListType,productType){
        appDispatcher.dispatch({
            actionName:"queryProductListByType_earnSetInvestmentRecord",
            data:{
                currListType:currListType,
                productType:productType
            }
        })
    },
    showMatchLoanList(recordId,productType){
        appDispatcher.dispatch({
            actionName:"showMatchLoanList_earnSetInvestmentRecord",
            data:{
                productType:productType,
                recordId:recordId
            }
        })
    }
};

module.exports=EarnSetInvestmentRecordAction;
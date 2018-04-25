var appDispatcher=require("../dispatcher/dispatcher.js");

var ApplyToQuiteFromMoonLoanAction={
    getInitialData(productId,selectedDate){
        appDispatcher.dispatch({
            actionName:"getInitialData_atqfml",
            data:{
                productId,
                selectedDate
            }
        });
    },
    changeQuitDate(selectedDate){
        appDispatcher.dispatch({
            actionName:"changeQuitDate_atqfml",
            data:{
                selectedDate
            }
        });
    },
    quitFromMoonLoan(){
        appDispatcher.dispatch({
            actionName:"quitFromMoonLoan_atqfml"
        });
    },
    modifyQuitFromMoonLoan(){
        appDispatcher.dispatch({
            actionName:"modifyQuitFromMoonLoan_atqfml"
        });
    },
    cancelQuittingFromMoonLoan(){
        appDispatcher.dispatch({
            actionName:"cancelQuittingFromMoonLoan_atqfml"
        });
    }
};

module.exports=ApplyToQuiteFromMoonLoanAction;
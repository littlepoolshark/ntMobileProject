var appDispatcher=require("../dispatcher/dispatcher.js");

var MatchLoanOfMoonAction={
    getInitialData(joinId){
        appDispatcher.dispatch({
            actionName:"getInitialData_matchLoanOfMoon",
            data:{
                joinId:joinId
            }
        })
    }
};

module.exports=MatchLoanOfMoonAction;
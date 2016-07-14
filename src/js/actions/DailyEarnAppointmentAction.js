var appDispatcher=require("../dispatcher/dispatcher.js");

var DailyEarnAppointmentAction={
    changePurchaseAmount(purchaseAmount){
        appDispatcher.dispatch({
            actionName:"purchaseAmountChange",
            data:{
                purchaseAmount:purchaseAmount
            }
        })
    },
    initializeStore(data){
        appDispatcher.dispatch({
            actionName:"dailyEarnAppointment_initializeStore",
            data:data
        })
    },
    makeAnAppointment(){
        appDispatcher.dispatch({
            actionName:"cofirmTomakeAnAppointment"
        })
    }
};

module.exports=DailyEarnAppointmentAction;
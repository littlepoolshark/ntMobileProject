var appDispatcher=require("../dispatcher/dispatcher.js");

var DailyEarnAppointmentAction={
    changeAppointmentAmount(purchaseAmount){
        appDispatcher.dispatch({
            actionName:"changeAppointmentAmount",
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
    },
    useAllBalance(){
        appDispatcher.dispatch({
            actionName:"useAllBalance_dailyEarnAppointment"
        })
    }
};

module.exports=DailyEarnAppointmentAction;
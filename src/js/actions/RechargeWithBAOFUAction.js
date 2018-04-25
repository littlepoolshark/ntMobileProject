//@flow
var appDispatcher=require("../dispatcher/dispatcher.js");

var RechargeWithBAOFUAction={
    getInitialData (dataFromUrl:Object){
        appDispatcher.dispatch({
            actionName:"getInitialData_rbfs",
            data:dataFromUrl
        })
    },
    RechargeWithBAOFU (){
        appDispatcher.dispatch({
            actionName:"rechargeWithBAOFU_rbfs"
        })
    },
    changeVerifyCode(verifyCode:string){
        appDispatcher.dispatch({
            actionName:"changeVerifyCode_rbfs",
            data:{
                verifyCode
            }
        })
    }
};

module.exports=RechargeWithBAOFUAction;
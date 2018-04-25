var appDispatcher=require("../dispatcher/dispatcher.js");

var OpenRedPackageAction={
    getInitData(couponId){
        appDispatcher.dispatch({
            actionName:"getInitData_orp",
            data:{
                couponId
            }
        })
    },
    openRedPackage(couponId){
        appDispatcher.dispatch({
            actionName:"openRedPackage_orp",
            data:{
                couponId
            }
        })
    }
};

module.exports=OpenRedPackageAction;
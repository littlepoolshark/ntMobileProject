var appDispatcher=require("../dispatcher/dispatcher.js");

var AnniversaryCelebrationAction={
    getInitialData(){
        appDispatcher.dispatch({
            actionName:"getInitialData_AC"
        });
    },
    toggleWishes(){
        appDispatcher.dispatch({
            actionName:"toggleWishesTemplate_AC"
        });
    },
    sendWishesToNt(){
        appDispatcher.dispatch({
            actionName:"sendWishesToNt_AC"
        });
    },
    changeWishes(wishesText){
        appDispatcher.dispatch({
            actionName:"changeWishes_AC",
            data:{
                wishesText:wishesText
            }
        });
    },
    submitWishesText(){
        appDispatcher.dispatch({
            actionName:"submitWishesText_AC"
        });
    },
    jumpToInviteReward(){
        appDispatcher.dispatch({
            actionName:"jumpToInviteReward_AC"
        });
    }
};

module.exports=AnniversaryCelebrationAction;
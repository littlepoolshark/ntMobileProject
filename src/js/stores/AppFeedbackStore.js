//@flow
var MicroEvent = require('../lib/microevent.js');
var appDispatcher=require('../dispatcher/dispatcher.js');
var ajax=require("../lib/ajax.js");

import config from "../config";

var AppFeedbackStore={
    _all:{
        feedbackText:""
    },
    getAll(){
        return this._all;
    },
    checkForm(){
        let validation={
            success:true,
            msg:""
        }
        let feedbackText=this._all.feedbackText;
        if(feedbackText === ""){
            validation={
                success:false,
                msg:"请输入您的宝贵意见或建议"
            }
        }

        return validation;
    },
    clearAll(){
        this._all={
            feedbackText:""
        };
    },
    updateAll(source:Object){
        this._all=Object.assign({},this._all,source);
    }
};
MicroEvent.mixin(AppFeedbackStore);

appDispatcher.register(function(payload){

    switch(payload.actionName){
        case "changeFeedbackText_appFeedback":
            AppFeedbackStore.updateAll({
                feedbackText:payload.data.feedbackText
            });
            AppFeedbackStore.trigger("change");
            break;
        case "submitFeedbackText_appFeedback":
            let validation=AppFeedbackStore.checkForm();
            if(validation.success){
                ajax({
                    ciUrl:"/platinfo/v2/feedback",
                    data:{
                        content:AppFeedbackStore.getAll().feedbackText
                    },
                    success(rs){
                        if(rs.code === 0){
                            AppFeedbackStore.trigger("feedbackTextSubmitSuccess","谢谢您的宝贵建议！");
                        }else {
                            AppFeedbackStore.trigger("feedbackTextSubmitFailed",rs.description);
                        }
                    }
                })
            }else {
                AppFeedbackStore.trigger("formCheckFailed",validation.msg);
            }
            break;
        default:
        //no op
    }
});

module.exports=AppFeedbackStore;
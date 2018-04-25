var MicroEvent = require('../lib/microevent.js');
var appDispatcher=require('../dispatcher/dispatcher.js');
var ajax=require("../lib/ajax.js");
var cookie=require("../lib/cookie.js");

var wishesTemplates=[
    "一年了，一直和农泰金融一起成长，祝农泰金融未来发展蒸蒸日上。",
    "希望农泰金融一如既往地带领大家挣钱致富，祝农泰金融越来越好。",
    "不知不觉就一周年了，生日快乐么么哒，继续这么稳健务实哦~",
    "祝农泰金融收益高又稳定，哈哈，新的一年发展要更快哦~",
    "投资小白幸运和农泰金融相遇，对未来的生活有了盼头。农泰金融一周岁快乐！",
    "呀，一不留神，农泰都一周岁了！",
    "希望和农泰金融一起为中国三农发展做出贡献，祝农泰金融发展越来越好。",
    "投资选农泰，安全赚钱快。选择农泰金融，未来生活有保障，祝农泰金融生日快乐。",
    "感谢农泰金融让我今年的收成又有了盼头，祝农泰金融越来越好。"
];
var AnniversaryCelebrationStore={
    _all:{
        rankList:[],
        wishesList:[],
        hadSendWishes:false,
        wishes:wishesTemplates[0],
        currWishedIndex:0
    },
    toggleWishesTemplate(){
        let currWishedIndex=this._all.currWishedIndex ++;
        if(currWishedIndex >= 9){
            currWishedIndex=0;
        }
        this._all.wishes=wishesTemplates[currWishedIndex];
    },
    checkForm(){
        let validationResult={
            success:true,
            msg:""
        };

        let {
            wishes
            }=this._all;

        if(wishes === ""){
            validationResult={
                success:false,
                msg:"祝福语不能为空，请填写"
            };
        }

        return validationResult;
    },
    getAll(){
        return this._all;
    },
    updateAll(source){
        this._all=Object.assign(this._all,source);
    },
    clearAll(){
        this._all.hadSendWishes=false;
        this._all.currWishedIndex=0;
    }

};
MicroEvent.mixin(AnniversaryCelebrationStore);

appDispatcher.register(function(payload){
    let isLogin=!!cookie.getCookie("token");
    switch(payload.actionName){
        case "getInitialData_AC":
            ajax({
                ciUrl:"/activity/activityCommentAuditList.do?no=A161201_7",
                success(rs){
                    let source={
                        wishesList:rs.list
                    };
                    if(isLogin && rs.isComment === "already"){
                        source.hadSendWishes=true;
                    }
                    AnniversaryCelebrationStore.updateAll(source);
                    AnniversaryCelebrationStore.trigger("change");
                }
            });
            ajax({
                ciUrl:"/activity/recommendInvestList.do",
                success(rs){
                    AnniversaryCelebrationStore.updateAll({
                        rankList:rs.list
                    });
                    AnniversaryCelebrationStore.trigger("change");
                }
            });
            break;
        case "toggleWishesTemplate_AC":
            AnniversaryCelebrationStore.toggleWishesTemplate();
            AnniversaryCelebrationStore.trigger("change");
            break;
        case "sendWishesToNt_AC":
            if(isLogin){
                ajax({
                    ciUrl:"/activity/activityCommentAuditList.do?no=A161201_7",
                    success(rs){
                       if(rs.isComment === "editor"){
                           AnniversaryCelebrationStore.trigger("userHaveNotSendWishes");
                       }else if(rs.isComment === "unstart"){
                           AnniversaryCelebrationStore.trigger("activityIsNotStart");
                       }else if(rs.isComment === "over"){
                           AnniversaryCelebrationStore.trigger("activityIsOver");
                       }else if(rs.isComment === "already"){
                           AnniversaryCelebrationStore.trigger("userHadSendWishes");
                       }
                    }
                    })
            }else {
                AnniversaryCelebrationStore.trigger("isNotLogin");
            }
            break;
        case "changeWishes_AC":
            AnniversaryCelebrationStore.updateAll({
                wishes:payload.data.wishesText
            });
            AnniversaryCelebrationStore.trigger("change");
            break;
        case "submitWishesText_AC":
            let validationResult=AnniversaryCelebrationStore.checkForm();
            if(validationResult.success){
                let wishesText=AnniversaryCelebrationStore.getAll().wishes;
                AnniversaryCelebrationStore.trigger("requestIsStarting");
                ajax({
                    ciUrl:"/activity/wishComment.do",
                    data:{
                        no:"A161201_7",
                        commentDesc:wishesText
                    },
                    success(rs){
                        AnniversaryCelebrationStore.trigger("requestIsEnd");
                        if(rs.result.code === "0001"){
                            AnniversaryCelebrationStore.updateAll({
                                hadSendWishes:true
                            });
                            AnniversaryCelebrationStore.trigger("submitWishesSuccess");
                        }else {
                            AnniversaryCelebrationStore.trigger("submitWishesFailed",rs.result.msg);
                        }
                    }
                });
            }else {
                AnniversaryCelebrationStore.trigger("submitWishesFailed",validationResult.msg);
            }
            break;
        case "jumpToInviteReward_AC":
            if(isLogin){
                ajax({
                    ciUrl:"/activity/activityCommentAuditList.do?no=A161201_7",
                    success(rs){
                        if(rs.isComment === "unstart"){
                            AnniversaryCelebrationStore.trigger("activityIsNotStart");
                        }else if(rs.isComment === "over"){
                            AnniversaryCelebrationStore.trigger("activityIsOver");
                        }else if(rs.isComment === "already"){
                            AnniversaryCelebrationStore.trigger("activityIsDoing");
                        }
                    }
                })
            }else {
                AnniversaryCelebrationStore.trigger("isNotLogin");
            }
            break;
        default:
        //no op
    }
});

module.exports=AnniversaryCelebrationStore;
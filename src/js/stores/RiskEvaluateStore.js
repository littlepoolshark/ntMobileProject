let MicroEvent = require('../lib/microevent.js');
let appDispatcher=require('../dispatcher/dispatcher.js');
let ajax=require("../lib/ajax.js");


let  RiskEvaluateStore={
    _all:{
        isEvaluated:false,
        evaluateResult:"",
        totalAmount:0,//最高出借金额，单位是万
        questionList:[],
        answerMap:{}
    },
    updateAll(source){
        Object.assign(this._all,source);
    },
    getAll(){
        return this._all;
    },
    clearAll(){
        this._all={
        isEvaluated:false,
        evaluateResult:"----",
        totalAmount:0,
        questionList:[],
        answerMap:{}
        }
    }
};
MicroEvent.mixin(RiskEvaluateStore);

appDispatcher.register(function(payload){
    switch(payload.actionName){
        case "getInitialData_re":

            let isEvaluated=payload.data.isEvaluated;
            RiskEvaluateStore.updateAll({isEvaluated});
            RiskEvaluateStore.trigger("change");

            ajax({
                ciUrl:"/questions/v2/questionList",
                success:function(rs){
                    if(rs.code === 0){
                        let data=rs.data;
                        let dataToUpdata={
                            isEvaluated                            
                        };
                        if(!isEvaluated){
                            dataToUpdata.questionList=data.dataList;
                        }else{
                            dataToUpdata.evaluateResult=data.dataList.name;
                            dataToUpdata.totalAmount=data.dataList.riskEvaluation;
                        }
                        RiskEvaluateStore.updateAll(dataToUpdata);
                        RiskEvaluateStore.trigger("change");
                    }
                }
            });

            if(isEvaluated){
                ajax({
                    ciUrl:"/questions/v2/reAssign",
                    success:function(rs){
                        if(rs.code === 0){
                            RiskEvaluateStore.updateAll({
                                questionList:rs.data.dataList
                            });
                            RiskEvaluateStore.trigger("change");
                        }
                    }
                });
            }

            break;
        case "selectAnswer_re":
            let {
                questionId,
                optionId
            }=payload.data;

            RiskEvaluateStore.updateAll({
                answerMap:Object.assign({},RiskEvaluateStore.getAll().answerMap,{
                    [questionId]:optionId
                })
            });
            RiskEvaluateStore.trigger("nextQuestion");
            break;
        case "submitAnswer_re":
            let finalAnswerMap=Object.assign(RiskEvaluateStore.getAll().answerMap,{
                [payload.data.questionId]:payload.data.optionId
            });
            ajax({
                ciUrl:"/questions/v2/save",
                data:{
                    answerMap:finalAnswerMap
                },
                success:function(rs){
                    if(rs.code === 0){
                        RiskEvaluateStore.updateAll({
                            isEvaluated:true,
                            totalAmount:rs.data.dataList.riskEvaluation,
                            evaluateResult:rs.data.dataList.name
                        });
                        RiskEvaluateStore.trigger("submitAnswerSuccess");
                    }
                }
            });
            break;
        default:
        //no op
    }
});

module.exports=RiskEvaluateStore;
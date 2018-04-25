require("../../scss/page/RiskEvaluate.scss");
let RiskEvaluateAction = require("../actions/RiskEvaluateAction");
let RiskEvaluateStore = require("../stores/RiskEvaluateStore");

import React, { Component } from 'react';
import { Link } from 'react-router';
import { View, Container, Icon, NavBar, Button, Group, SlideMask } from '../UIComponents';

import classNames from "classnames";

//没有完成测评所对应的组件
function HaveNotFinishRiskEvaluate(props){
    return (
        <div id="haveNotFinishRiskEvaluate">
            <Icon classPrefix="imgIcon" name="riskEvaluate-false-flag" />
            <div className="subtitle">
                {props.children}
            </div>
            <Button  amStyle="primary" radius block onClick={props.toggleViewToEvaluate}>
                立即测评
            </Button>
        </div>
    )
}

//完成测评所对应的组件
function HadFinishRiskEvaluate(props){
    return (
        <div id="hadFinishRiskEvaluate">
            <Icon classPrefix="imgIcon" name="riskEvaluate-true-flag" />
            <div className="subtitle">
                您本次投资风险评估结果是
            </div>
            <div className="title">
                {props.evaluateResult}
            </div>
            <div className="subtitle">
                {props.children}
            </div>
            <Button  amStyle="primary" radius block>
                <Link to="productList" >{props.isFormSubmitSuccess ? "我知道了" : "立即投资"}</Link>
            </Button>
            {
                props.isFormSubmitSuccess ?
                null :
                <div className="reEvaluateBtn" onClick={props.toggleViewToEvaluate} >
                    重新评测
                </div>
            }
          
        </div>
    )
}

//风险评测问题选项组件
function RiskEvaluateQuestionnaireItemOption(props){
    let {
        activeIndex,
        selfIndex,
        questionId,
        optionId,
        optionText,
        selectHandler
    }=props;

    let isSelected= activeIndex === selfIndex;

    let iconClassName=classNames({
        "payment-checked-box":isSelected,
        "payment-uncheck-box":!isSelected
        });

    return (
        <li className="">
            <Icon classPrefix="imgIcon" name={iconClassName} onClick={selectHandler.bind(null,questionId,optionId)} />
            {optionText}
        </li>
    )
};

//风险评测问题组件
class RiskEvaluateQuestionnaireItem extends Component{
    constructor(props){
        super(props);
        this.state={
            activeIndex:0
        }
    }
    handleOptionSelect=(selectedIndex,questionId,optionId) => {
        this.setState({
            activeIndex:selectedIndex
        },() => {
            setTimeout(() => {
                this.props.selectHandler && this.props.selectHandler(questionId,optionId);
            },300)
        })
    }
    render(){
        let {
            activeIndex:questionActiveIndex,
            selfIndex,
            questionId,
            questionText,
            optionList
        }=this.props;

        if(questionActiveIndex !== selfIndex){
            return null;
        }
    
        return (
            <div className="questionnaireItem">
                <div className="hintText">请选择符合您情况的最合适答案：</div>
                <h4>{questionText}</h4>
                <ul>
                    {
                        optionList.map((item,index) => {
                            let props={
                                selfIndex:index +1,
                                activeIndex:this.state.activeIndex,
                                questionId,
                                selectHandler:this.handleOptionSelect.bind(this,index +1),
                                optionText:item.name,
                                optionId:item.id
                            }
                            return (
                                <RiskEvaluateQuestionnaireItemOption key={String(index+1)} {...props} />
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
};

//测评问卷组件
class RiskEvaluateQuestionnaire extends Component {
    constructor(props){
        super(props);
        this.state={
            questionIndex:1,
            questionList:this.props.questionList
        }
    }
    nextQuestion=() => {
        this.setState({
            questionIndex:++this.state.questionIndex
        })
    }
    prevQuestion=() => {
        let isFirstQuestion=this.state.questionIndex === 1;
        if(!isFirstQuestion){
            this.setState({
                questionIndex:--this.state.questionIndex
            })
        }
    }
    selectHandler=(selectedIndex,questionId,optionId) => {
        let totalCount=this.state.questionList.length;
        let isLastQuestion=selectedIndex === totalCount;
        if(isLastQuestion){
            RiskEvaluateAction.submitAnswer(questionId,optionId);
        }else{
            RiskEvaluateAction.selectAnswer(questionId,optionId);
        }
    }
    render(){
        let {
            questionIndex,
            questionList
        }=this.state;


        return(
            <div id="riskEvaluateQuestionnaire">
                <div className="questionnaire-header">
                    <div className="left">本问卷为了协助出借人了解自身...</div>
                    <div className="right" onClick={this.props.showMask}>查看全部</div>
                </div>
                
                <Group className="questionnaire-body">
                    {
                        questionList.map((item,index) => {
                            let props={
                                activeIndex:questionIndex,
                                selfIndex:index +1,
                                questionId:item.id,
                                questionText:item.name,
                                optionList:item.optionList,
                                selectHandler:this.selectHandler.bind(this,index+1),
                            }
                            return <RiskEvaluateQuestionnaireItem  key={String(index+1)} {...props} />
                        })
                    }
                </Group>
                <footer>
                    <div  className="prevBtn" onClick={this.prevQuestion}>上一题</div>
                    <div>{questionIndex}/{questionList.length}</div>
                </footer>
            </div>
        )
    }
    componentDidMount(){
        RiskEvaluateStore.bind("nextQuestion",() => {
            this.nextQuestion();
        });
    }
}

class RiskEvaluate extends Component {
    constructor(props){
        super(props);
        this.state={
            data:RiskEvaluateStore.getAll(),
            viewName:RiskEvaluateStore.getAll().isEvaluated ? "evaluatedView" : "unEvaluateView",
            isMaskOpen:false,
            isFormSubmitSuccess:false
        }
    }
    openMask=() => {
        this.setState({
            isMaskOpen:true
        })
    }
    closeMask=() => {
        this.setState({
            isMaskOpen:false
        })
    }
    handleNavClick=() => {
        this.context.router.goBack();
    }
    toggleViewTo=(viewName) => {
        this.setState({
            viewName
        })
    }
    viewRender(){
        let {
            questionList,
            totalAmount
        }=this.state.data;
        switch (this.state.viewName) {
            case "unEvaluateView":
                return (
                    <HaveNotFinishRiskEvaluate toggleViewToEvaluate={this.toggleViewTo.bind(this,"evaluatingView")}>
                      为给您提供有效投资方案，您需要先进行投资风险评估
                  </HaveNotFinishRiskEvaluate>
                )
            case "evaluatingView":
               return (
                <RiskEvaluateQuestionnaire questionList={questionList} showMask={this.openMask} />
               )
            case "evaluatedView":
                totalAmount=totalAmount === -1 ? "不限额" : `${totalAmount}万`
               return (
                <HadFinishRiskEvaluate 
                    {...this.state.data} 
                    toggleViewToEvaluate={this.toggleViewTo.bind(this,"evaluatingView")}
                    isFormSubmitSuccess={this.state.isFormSubmitSuccess}
                    >
                    您可在本平台的出借总额度为：{totalAmount}
                 </HadFinishRiskEvaluate>
               )
            break;
            default:
                throw new Error("unExpected viewName " + this.state.viewName);
        }
    }
    render() {
        let navLeft = {
            component: "a",
            icon: "left-nav",
            title: "返回"
          };
        
        let {
            isEvaluated,
            evaluateResult,
            totalAmount
        }=this.state.data;
        
        return (
            <View>
                 <NavBar
                    title="投资风险评测"
                    leftNav={[navLeft]}
                    amStyle="primary"
                    onAction={this.handleNavClick}
                    />
                <Container id="riskEvaluate">
                  {
                      this.viewRender()
                  }
                    <SlideMask isMaskOpen={this.state.isMaskOpen}>
                      <Group id="warmHintTextMask">
                          <section>
                          本问卷为了协助出借人了解自身对投资风险的承受能力。根据网络借贷信息中介机构业务活动管理暂行办法的第二十六条规定，网络借贷信息中介机构应当根据风险评估结果对出借人实行分级管理，设置可动态调整的出借限额和出借标的限制。
                          </section>
                          <section>
                          为保护您的合法权益，请真实、准确、完整地填写本问卷，评估结果将会作为被调查人未来投资平台融资项目的参考依据。若因存在欺诈、隐瞒或其它不实陈述而导致调查结果与实际情况不符的，本公司不承担任何责任。（以下均为单选）
                          </section>
                          <div className="hideBtn text-right" >收起</div>
                      </Group>
                </SlideMask>
                </Container>
              
            </View>
            
        );
    }
    componentDidMount(){
        
        RiskEvaluateStore.bind("change",() => {
            let data=RiskEvaluateStore.getAll();
            this.setState({
                data,
                viewName:data.isEvaluated ? "evaluatedView" : "unEvaluateView"
            })
        });

        RiskEvaluateStore.bind("submitAnswerSuccess",() => {
            this.setState({
                data:RiskEvaluateStore.getAll(),
                viewName:"evaluatedView",
                isMaskOpen:false,
                isFormSubmitSuccess:true
            })
        });

        let isEvaluated=this.props.location.query && this.props.location.query.isEvaluated;
        isEvaluated=isEvaluated === "true" ?  true : false;
        RiskEvaluateAction.getInitialData(isEvaluated);
    }
}

RiskEvaluate.contextTypes = {
    router: React.PropTypes.object.isRequired
  };

module.exports=RiskEvaluate;
require("../../scss/page/WithdrawApplySuccessHint.scss");
import React from "react";
import WithdrawApplySuccessHintStore from "../stores/WithdrawApplySuccessHintStore";
import WithdrawApplySuccessHintAction from "../actions/WithdrawApplySuccessHintAction";

//ui component
import Container from "../UIComponents/Container";
import View from "../UIComponents/View";
import Group from "../UIComponents/Group";
import Button from "../UIComponents/Button";
import NavBar from "../UIComponents/NavBar";

const withdrawReasonList=[
    {
        id:1,
        text:"急用钱，资金周转"
    },
    {
        id:2,
        text:"抢不到钱，钱投不进去"
    },
    {
        id:3,
        text:"找不到合适我的投资项目"
    },
    {
        id:4,
        text:"钱放农泰太久了不放心"
    },
    {
        id:5,
        text:"测试下提现功能是否可用"
    },
    {
        id:6,
        text:"去其他平台投资理财"
    },
    {
        id:7,
        text:"其他原因对农泰金融不满"
    }
];

const WithdrawReasonSurveyItem = (props) => {
    let {
        iselected,
        text,
        handleOnClick
    }=props;

    return (
        <li 
            className={iselected ? "active" : ""}
            onClick={handleOnClick}
        >
            <span className="virtual-radio"></span>{text}
        </li>
    )
}

const WithdrawReasonSurvey = React.createClass({
    getInitialState(){
        return {
            selectedItemId:0
        }
    },
    _handleSelectItem(selectedItemId){
        this.setState({
            selectedItemId
        },() => {
            this.props.handleWithdrawReasonSelect(selectedItemId);
        });
    },
    render(){
        return (
            <div id="withdrawReasonSurvey">
                <div className="title">
                    为了更好地提升您的服务，改善农泰投资理财体验，可以告诉我们此次提现原因吗？
                </div>
                <ul>
                    {
                        withdrawReasonList.map((item,index) => {
                            return < WithdrawReasonSurveyItem 
                                        key={item.id}
                                        iselected={this.state.selectedItemId === item.id} 
                                        text={item.text} 
                                        handleOnClick={this._handleSelectItem.bind(null,item.id)}
                                    />
                        })
                    }
                </ul>
            </div>
        )
    }
});

let WithdrawApplySuccessHint = React.createClass({
    getInitialState(){
        return WithdrawApplySuccessHintStore.getAll();
    },
    _jumpToUserHome(){
        this.context.router.push({
            pathname:"userHome"
        });
    },
    _handleNavClick() {
        if(this.state.withdrawReasonId){
            WithdrawApplySuccessHintAction.submitSurvey();
        }else {
           this._jumpToUserHome();
        }    
    },
    _handleWithdrawReasonSelect(reasonId){
        WithdrawApplySuccessHintAction.selectWithdrawReason(reasonId);
    },
    render() {
        let rightNav = {
            component: "a",
            title: '完成'
        };

        let {
            withdrawAmount,
            handlingCharge,
            acctAccount,
            withdrawReasonId,
        }=this.state;


        return (
            <View>   
                <NavBar
                    title="提现"
                    rightNav={[rightNav]}
                    amStyle="primary"
                    onAction={this._handleNavClick}
                />
            <Container id="withdrawApplySuccessHint" scrollable>
                <Group>
                    <div className="safty-guarder"></div>
                    <div className="withdraw-detail title text-center">
                        提现申请已提交，请等待银行处理
                    </div>
                    <section>
                        <div className="withdraw-detail-item">
                            <div className="subtitle">提现金额</div>
                            <div className="amount">￥{typeof withdrawAmount === "number" ? withdrawAmount.toFixed(2) : withdrawAmount}</div>
                        </div>
                        <div className="withdraw-detail-item">
                            <div className="subtitle">手续费用</div>
                            <div className="amount">￥{typeof handlingCharge === "number" ? handlingCharge.toFixed(2) : handlingCharge}</div>
                        </div>
                        <div className="withdraw-detail-item">
                            <div className="subtitle">实际到账</div>
                            <div className="amount"><strong>￥{typeof acctAccount === "number" ? acctAccount.toFixed(2) : acctAccount}</strong></div>
                        </div>
                    </section>
                </Group>
                <WithdrawReasonSurvey  handleWithdrawReasonSelect={this._handleWithdrawReasonSelect}/>    
            </Container>
            </View>
        )
    },
    componentDidMount(){

        WithdrawApplySuccessHintStore.bind("change",() => {
            this.setState(WithdrawApplySuccessHintStore.getAll());
        });

        WithdrawApplySuccessHintStore.bind("submitSurveySuccess",() => {
            this._jumpToUserHome();
        });

        WithdrawApplySuccessHintStore.bind("submitSurveyFailed",(msg) => {
            Message.broadcast(msg);
        });

        let dataFromQuery=this.props.location.query;
        if(dataFromQuery){
            let {
                acctAccount,
                handlingCharge,
                withdrawAmount,
                withdrawId
            }=dataFromQuery;
            let newData={
                acctAccount:parseFloat(acctAccount),
                handlingCharge:parseFloat(handlingCharge),
                withdrawAmount:parseFloat(withdrawAmount),
                withdrawId:parseFloat(withdrawId)            
            };
            WithdrawApplySuccessHintAction.getInitialData(newData);
        }
        
    }
});

WithdrawApplySuccessHint.contextTypes = {
    router: React.PropTypes.object.isRequired
};

module.exports = WithdrawApplySuccessHint;
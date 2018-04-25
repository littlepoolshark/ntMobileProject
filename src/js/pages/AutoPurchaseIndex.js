import "../../scss/page/AutoPurchaseIndex.scss";
import React, { Component, PropTypes } from 'react';
import { Link } from "react-router";
import AutoPurchaseIndexStore from "../stores/AutoPurchaseIndexStore";
import AutoPurchaseIndexAction from "../actions/AutoPurchaseIndexAction";

import Container from "../UIComponents/Container";
import Button from "../UIComponents/Button";
import Field from "../UIComponents/Field";
import List from "../UIComponents/List";
import Group from "../UIComponents/Group";
import Message from "../UIComponents/Message";
import NavBar from "../UIComponents/NavBar";
import Icon from "../UIComponents/Icon";
import Modal from "../UIComponents/modal/Modal";
import Switch from "../UIComponents/Switch";
import Grid from "../UIComponents/Grid";
import Col from "../UIComponents/Col";


const AutoPurchaseSwitch = (props) => {
    let {
        iSetAutoPurchaseRule,
        isAutoPurchaseSwitchOpen,
        switchHandler
    } = props;

    if (iSetAutoPurchaseRule) {
        return (
            <List>
                <List.Item
                    title="自动投标记录"
                    nested="input"
                    after={<Switch onValueChange={switchHandler} value={isAutoPurchaseSwitchOpen} amStyle="success" />}
                />
            </List>
        )
    } else {
        return (
            <Group >
                <div className="autoPurchaseHint">
                    <Icon classPrefix="imgIcon" name="autoPurchase-hint" />
                    <div>用户当前没有已启动的自动投标设置</div>
                </div>
            </Group>
        )
    }
};

AutoPurchaseSwitch.propTypes = {
    iSetAutoPurchaseRule: PropTypes.bool.isRequired,
    isAutoPurchaseSwitchOpen: PropTypes.bool.isRequired,
    switchHandler:PropTypes.func.isRequired
};


const AutoPurchaseRecord = (props) => {
    let {
        minRate,
        deadline,
        validDate,
        onClick
    }=props;

    return (
        <Group className="autoPurchaseRecord" onClick={onClick}>
            <Grid collapse={true}>
                <Col cols={2}>
                    <div className="yearRate">{minRate}<span className="unit">%</span></div>
                    <div className="subtitle">最低利率</div>
                </Col>
                <Col cols={2}>
                    <div className="deadline text-center">{deadline}<span className="unit">个月</span></div>
                    <div className="subtitle text-center">项目期限</div>
                </Col>
                <Col cols={2} className="rightNavWrapper">
                    <Icon name="right-nav" />
                </Col>
            </Grid>
            <div className="validDate">
                有限期限：{validDate}
            </div>
        </Group>
    );
};

AutoPurchaseRecord.propTypes = {
    minRate:PropTypes.string.isRequired,
    deadline:PropTypes.string.isRequired,
    validDate:PropTypes.string.isRequired,
    onClick:PropTypes.func.isRequired
};


const AutoPurchaseAgreement = (props) => {
    let {
        iSetAutoPurchaseRule,
        isAgreementChecked,
        onAgreementCheck
    }=props;

    return (
        <footer className="autoPurchaseAgreement">
            {
                iSetAutoPurchaseRule ?
                <Icon classPrefix="imgIcon" name="autoPurchase-info" /> :
                <Icon classPrefix="imgIcon" name={isAgreementChecked ? "autoPurchase-agreement-checked" : "autoPurchase-agreement-unchecked"} onClick={onAgreementCheck} />
            }
            <div>
                {
                    iSetAutoPurchaseRule ?
                    "查看" :
                    "我已阅读并同意"
                }
                <Link to="serviceAgreement_autoPurchase">《自动投标授权书》</Link>
            </div>
        </footer>
    );
};

AutoPurchaseAgreement.propTypes = {
    iSetAutoPurchaseRule: PropTypes.bool.isRequired,
    isAgreementChecked: PropTypes.bool.isRequired,
    onAgreementCheck:PropTypes.func.isRequired
};





class AutoPurchaseIndex extends Component {

    constructor(props){
        super(props);
        this.state={
            isAgreementChecked:false,
            data:AutoPurchaseIndexStore.getAll()
        };
    }
    

    _handleNavBack=({title}) => {
        if(title === "返回"){
            this.context.router.push({
                pathname:"userHome"
            });
        }else {
            this.context.router.push({
                pathname:"autoPurchaseRule"
            });
        }
        
    }

    _confirmToAutoPurchase=() => {
        if(!this.state.isAgreementChecked){
            Message.broadcast("您未勾选自动投标协议，请先确认");
        }else {
            this.context.router.push({
                pathname:"autoPurchaseForm",
                query:{
                    actionType:"add"
                }
            })
        }

    }

    _handleAgreementBtnCheck=() => {
        this.setState({
            isAgreementChecked:!this.state.isAgreementChecked
        })
    }

    _jumpToAutoPurchaseForm=() => {
         this.context.router.push({
            pathname:"autoPurchaseForm",
            query:{
                actionType:"modify"
            }
        })
    }

    _handleSwithToggle(){
        AutoPurchaseIndexAction.toggleAutoPurchaseSwitch();
    }

    render() {
        let leftNav = {
            component: "a",
            icon: 'left-nav',
            title: '返回'
        };

        let rightNav = {
            component: "a",
            title: '规则'
        };


        return (
            <Container id="autoPurchaseIndex">
                <NavBar
                    title="自动投标"
                    leftNav={[leftNav]}
                    rightNav={[rightNav]}
                    amStyle="primary"
                    onAction={this._handleNavBack}
                />

                <AutoPurchaseSwitch {...this.state.data} switchHandler={this._handleSwithToggle}/>

                {
                    this.state.data.iSetAutoPurchaseRule ?
                    <AutoPurchaseRecord {...this.state.data} onClick={this._jumpToAutoPurchaseForm}/> :
                    <div className="" style={{ padding: "0 0.9375rem", marginBottom: "0.5rem" }}>
                        <Button amStyle="primary" block radius={true} onClick={this._confirmToAutoPurchase}>添加</Button>
                    </div>
                }

                <AutoPurchaseAgreement 
                    onAgreementCheck={this._handleAgreementBtnCheck} 
                    isAgreementChecked={this.state.isAgreementChecked}
                    iSetAutoPurchaseRule={this.state.data.iSetAutoPurchaseRule}                 
                />
            </Container>
        );
    }

    componentDidMount(){
        AutoPurchaseIndexAction.getInitialData();

        AutoPurchaseIndexStore.bind("change",() => {
            this.setState({
                data:AutoPurchaseIndexStore.getAll()
            })
        });
    }
}

AutoPurchaseIndex.contextTypes = {
    router: PropTypes.object.isRequired
};

module.exports= AutoPurchaseIndex;
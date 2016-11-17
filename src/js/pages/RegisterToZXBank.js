require("../../scss/page/RegisterToZXBank.scss");
let RegisterToZXBankAction=require("../actions/RegisterToZXBankAction");
let RegisterToZXBankStore=require("../stores/RegisterToZXBankStore");
import React from "react";
import {Link} from "react-router";

//ui component
import Group from "../UIComponents/Group";
import List from "../UIComponents/List";
import Button from "../UIComponents/Button";
import Field from "../UIComponents/Field";
import Container from "../UIComponents/Container";
import Message from "../UIComponents/Message";
import Modal from "../UIComponents/modal/Modal"
import Icon from "../UIComponents/Icon";
import NavBar from "../UIComponents/NavBar";


let RegisterToZXBank=React.createClass({
    getInitialState(){
        return {
            isModalOpen:false,
            modalRole:"loading",
            modalInnerText:"",
            data:RegisterToZXBankStore.getAll()
        }
    },
    _jumpToNextLocation(){
        this.context.router.push({
            pathname:"openZhongJinShortcut"
        });
    },
    _jumpToBankList(){
        let {
            realName,
            idcard,
            bankName,
            bankId,
            cardNo,
            loginName,
            hadFailed
            }=this.state.data;
        this.context.router.push({
            pathname:"bankCardList",
            query:{
                realName,
                idcard,
                bankName,
                bankId,
                cardNo,
                loginName,
                hadFailed
            }
        });
    },
    _handleFieldValueChange(fieldName){
        let fieldValue=this.refs[fieldName].getValue();
        switch (fieldName){
            /*case "realName":
             break;*/
            case "idcard":
                fieldValue=fieldValue.replace(/[^a-z0-9]+/gi,"");
                break;
            case "cardNo":
            case "loginName":
                fieldValue=fieldValue.replace(/[^\d]/g,"");
                break;
            default:
                break;
        };
        RegisterToZXBankAction.changeFieldValue(fieldValue,fieldName);
    },
    _submitRegisterForm(leftQureyTime){
        if(leftQureyTime > 0){
            RegisterToZXBankAction.submitRegisterForm();
        }else {
            return false;
        }
    },
    _handleNavClick(){
        let beforeComponent=this.props.location.query.beforeComponent;
        if(!!beforeComponent){
            this.context.router.push({
                pathname:beforeComponent
            })
        }else {
            this.context.router.push({
                pathname:"home"
            })
        }
    },
    _handleAlertModalDismiss(){
        this.setState({
            isModalOpen:false
        })
    },
    render(){
        let {
            realName,
            idcard,
            bankName,
            cardNo,
            needModify,
            loginName,
            leftQureyTime,
            isRealNameReadOnly,
            isIdcardReadOnly,
            isCardNoReadOnly,
            hadFailed
            }=this.state.data;

        let leftNav= {
            component:"a",
            icon: 'left-nav',
            title: '返回'
        };


        return (
            <Container id="registerToZXBank" scrollable={true}>
                <NavBar
                    title="开通银行存管账户"
                    leftNav={[leftNav]}
                    amStyle="primary"
                    onAction={this._handleNavClick}
                />
                <List>
                    <List.Item nested="input" >
                        <Field
                            type="text"
                            label="姓名"
                            placeholder="请输入您的真实姓名"
                            ref="realName"
                            value={realName}
                            readOnly={isRealNameReadOnly}
                            onChange={this._handleFieldValueChange.bind(null,"realName")}
                        />
                    </List.Item>
                    <List.Item nested="input" >
                        <Field
                            type="text"
                            label="身份证号码"
                            placeholder="请输入您的身份证号码"
                            ref="idcard"
                            value={idcard}
                            readOnly={isIdcardReadOnly}
                            onChange={this._handleFieldValueChange.bind(null,"idcard")}
                        />
                    </List.Item>
                </List>

                {
                    hadFailed === "yes" ||  leftQureyTime < 3?
                        <div className="registerFailed-hint">请更换银行卡!</div> :
                        null
                }
                <List style={{marginBottom:0,marginTop:0}}>
                    <List.Item nested="input" >
                        <Field
                            type="text"
                            label="开户行"
                            placeholder="请选择开户银行"
                            ref="bankName"
                            inputAfter={
                                    bankName === "" || needModify === "yes" ?
                                    <Icon name="right-nav" style={{fontSize:"20px",color:"#c2c2c2"}} /> :
                                    null
                                    }
                            readOnly={true}
                            value={bankName}
                            onClick={bankName === "" || needModify === "yes" ? this._jumpToBankList :null}
                        />
                    </List.Item>
                    <List.Item nested="input" >
                        <Field
                            type="text"
                            label="银行卡号"
                            placeholder="请输入您名下的储蓄卡"
                            ref="cardNo"
                            value={cardNo}
                            readOnly={isCardNoReadOnly}
                            onChange={this._handleFieldValueChange.bind(null,"cardNo")}
                        />
                    </List.Item>
                </List>
                <div className="warm-hint">
                    <Icon classPrefix="imgIcon" name="attention"/>
                    <span className="warm-hint-text">应存管银行要求，银行卡一经绑定，将<strong>不可修改</strong>，请务必谨慎绑卡！</span>
                </div>

                <List style={{marginBottom:0}}>
                    <List.Item nested="input" >
                        <Field
                            type="text"
                            label="手机号码"
                            placeholder="请输入您在银行预留的手机号"
                            ref="loginName"
                            value={loginName}
                            onChange={this._handleFieldValueChange.bind(null,"loginName")}
                        />
                    </List.Item>
                </List>
                <div className="warm-hint">
                    <Icon classPrefix="imgIcon" name="attention" style={{width:"2rem"}}/>
                    <span className="warm-hint-text">如果手机号与注册手机号不一致，则在存管账户开通之后，您的<strong>登录用户名</strong>也将更换为<strong>该手机号</strong>，请特别注意！</span>
                </div>


                <div className="btn-wrapper">
                    <Button
                        amStyle="primary"
                        block={true}
                        radius={true}
                        disabled={leftQureyTime > 0 ? false : true}
                        onClick={this._submitRegisterForm.bind(null,leftQureyTime)}>
                        提交信息到银行验证
                    </Button>
                    <div className="registerCount-hint">
                        {
                            leftQureyTime > 0 ?
                                <span>您还有<strong>{leftQureyTime}</strong>次开通机会</span> :
                                <span>您开通机会已经用完，如需继续开通请联系客服！</span>
                        }

                    </div>
                </div>
                <Modal
                    title=""
                    ref="loadingModal"
                    isOpen={this.state.isModalOpen}
                    role={this.state.modalRole}
                    onDismiss={this._handleAlertModalDismiss}
                >
                    {this.state.modalInnerText}
                </Modal>
            </Container>
        )
    },
    componentDidMount(){

        let query=this.props.location.query;
        RegisterToZXBankAction.getInitialDataFromServer(query);

        RegisterToZXBankStore.bind("change",function(flag){
            let {
                leftQureyTime,
                visitFrom,
                zxcgOpenFailedReason
                }=RegisterToZXBankStore.getAll();
            let stateObj={};
            if(leftQureyTime <3 && visitFrom !== "bankCardList" && flag === "isFirstChange"){
                stateObj={
                    data:RegisterToZXBankStore.getAll(),
                    isModalOpen:true,
                    modalRole:"alert",
                    modalInnerText:zxcgOpenFailedReason + " 剩余开通机会"+leftQureyTime+"次",
                }
            }else {
                stateObj={
                    data:RegisterToZXBankStore.getAll()
                }
            }
            this.setState(stateObj)
        }.bind(this));

        RegisterToZXBankStore.bind("registerRequestIsStarting",function(){
            this.setState({
                isModalOpen:true,
                modalRole:"loading",
                modalInnerText:"处理中，请稍后..."
            })
        }.bind(this));

        RegisterToZXBankStore.bind("registerSuccessAndHadOpenZXShortcut",function(msg){
            let beforeComponent=this.props.location.query.beforeComponent;
            let locationObj={
                pathname:"registerToZXSuccessHint"
            };
            if(!!beforeComponent){
                locationObj.query={
                    beforeComponent:beforeComponent
                }
            }
            this.context.router.push(locationObj);
        }.bind(this));

        RegisterToZXBankStore.bind("registerZXFailed",function(msg){
            let {
                leftQureyTime
                }=RegisterToZXBankStore.getAll();
            let beforeComponent=this.props.location.query.beforeComponent;
            if(leftQureyTime === 0){//如果剩余的开通机会为0，则跳转到开通存管帮助页面
                let locationObj={
                    pathname:"registerToZXFailedHint"
                };
                if(!!beforeComponent){
                    locationObj.query={
                        beforeComponent:beforeComponent
                    }
                }
                this.context.router.push(locationObj);
            }else {
                this.setState({
                    data:RegisterToZXBankStore.getAll(),
                    isModalOpen:true,
                    modalRole:"alert",
                    modalInnerText:msg
                })
            }
        }.bind(this));

        RegisterToZXBankStore.bind("submitRegisterFormFailed",function(msg){
            Message.broadcast(msg)
        });


    },
    componentWillUnmount(){
        RegisterToZXBankStore.clearAll();
    }
});

RegisterToZXBank.contextTypes = {
    router:React.PropTypes.object.isRequired
};

module.exports=RegisterToZXBank;
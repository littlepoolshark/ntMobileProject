let SetDealPasswordAction=require("../actions/SetDealPasswordAction.js");
let SetDealPasswordStore=require("../stores/SetDealPasswordStore.js");

import React from "react";
import {Link} from "react-router"
import classNames from 'classnames';

import Container from "../UIComponents/Container";
import Button from "../UIComponents/Button";
import Field from "../UIComponents/Field";
import List from "../UIComponents/List";
import Group from "../UIComponents/Group";
import Message from "../UIComponents/Message";
import NavBar from "../UIComponents/NavBar";
import Icon from "../UIComponents/Icon";
import Modal from "../UIComponents/modal/Modal";


//设置或者修改交易密码页面/组件
let SetDealPassword=React.createClass({
    getInitialState(){
        let modalInnerText="";
        let beforeActionNameMap={
            "realNameAuthentication":"您已完成实名认证",
            "skipRegisteringZX":"为了不影响您的投资过程",
            "userHome":"为了不影响您的投资过程",
            "myBankCard":"为了不影响您的投资过程",
            "securityCenter":"为了不影响您的投资过程"
        };
        let beforeComponent=this.props.location.query.beforeComponent;
        let hadBeforeAction=false;
        if(beforeComponent && beforeActionNameMap.hasOwnProperty(beforeComponent)){
            hadBeforeAction=true;
            modalInnerText=<div>{beforeActionNameMap[beforeComponent]},<br/>现在设置交易密码？</div>;
        }
        if(beforeComponent === "registerToZXSuccessHint"){
            hadBeforeAction=true;
            modalInnerText="设置交易密码保障账户安全";
        }

        return {
            dealPassword:"",
            confirmDealPassword:"",
            showOriginDealPasswordField:false,
            showDealPasswordField:false,
            showConfirmDealPasswordField:false,
            isModalOpen:hadBeforeAction,
            modalInnerText:modalInnerText,
            modalType:1
        }
    },
    _handleNavBack(){
        let entryComponent=this.props.location.query.entryComponent;
        if(entryComponent){
            this.context.router.push({
                pathname:entryComponent
            })
        }else {
            this.context.router.goBack();
        }
    },
    _handleModalClose(){
        this.setState({
            isModalOpen:false
        })
    },
    _jumpToNextLocation(){
        let beforeComponent=this.props.location.query.beforeComponent;
        if(this.state.modalType === 2){
            if(beforeComponent === "registerToZXSuccessHint"){
                this.context.router.push({
                    pathname:"home"
                })
            }else {
                this.context.router.goBack();
            }

        }
    },
    _toggleEyeOfField(fieldName){
        switch (fieldName){
            case "originDealPassword":
                this.setState({
                    showOriginDealPasswordField:!this.state.showOriginDealPasswordField
                });
                break;
            case "dealPassword":
                this.setState({
                    showDealPasswordField:!this.state.showDealPasswordField
                });
                break;
            case "confirmDealPassword":
                this.setState({
                    showConfirmDealPasswordField:!this.state.showConfirmDealPasswordField
                });
                break;
            default:
                break;
        }
    },
    _handleFieldValueChange(fieldName){
        let fieldValue=this.refs[fieldName].getValue();
        switch (fieldName){
            case "dealPassword":
                if(fieldValue.length > 16){
                    fieldValue=fieldValue.slice(0,16);
                }
                this.setState({
                    dealPassword:fieldValue
                });
                break;
            case "confirmDealPassword":
                if(fieldValue.length > 16){
                    fieldValue=fieldValue.slice(0,16);
                }
                this.setState({
                    confirmDealPassword:fieldValue
                });
                break;
            default:
                break;
        };
    },
    _submitDealPassword(actionType){
        let dealPassword=this.refs.dealPassword.getValue();
        let confirmDealPassword=this.refs.confirmDealPassword.getValue();
        if(actionType === "setting"){
            SetDealPasswordAction.submitDealPasswordForSetting(dealPassword,confirmDealPassword);
        }else if(actionType === "modify"){
            let originDealPassword=this.refs.originDealPassword.getValue();
            SetDealPasswordAction.submitDealPasswordForModify(originDealPassword,dealPassword,confirmDealPassword);
        }
    },
    render (){
        let {
            actionType
            }=this.props.location.query;
        let backNav = {
            component:"a",
            icon: 'left-nav',
            title: '返回'
        };
        let {
            showOriginDealPasswordField,
            showDealPasswordField,
            showConfirmDealPasswordField,
            dealPassword,
            confirmDealPassword,
            }=this.state;
        return (
            <Container  {...this.props} scrollable={false}>
                <NavBar
                    title={actionType === "setting" ? "设置交易密码" : "修改交易密码" }
                    leftNav={[backNav]}
                    amStyle="primary"
                    onAction={this._handleNavBack}
                />
                <Group
                    header={<span><Icon name="info" style={{fontSize:"1rem",marginRight:"0.1rem"}}/>交易密码不能和登录密码相同</span>}
                    noPadded
                    style={{marginBottom:"0.2rem"}}
                >
                    <List>
                        {
                            actionType === "modify" ?
                                (
                                    <List.Item nested="input">
                                        <Field
                                            type={showOriginDealPasswordField ? "text" : "password"}
                                            label="原始密码"
                                            placeholder="请输入原交易密码"
                                            ref="originDealPassword"
                                        />
                                        <Icon
                                            name={showOriginDealPasswordField ? "eye-on" : "eye-off"}
                                            classPrefix="imgIcon"
                                            onClick={this._toggleEyeOfField.bind(null,"originDealPassword")}
                                        />
                                    </List.Item>
                                ) :
                                null
                        }

                        <List.Item nested="input">
                            <Field
                                type={showDealPasswordField ? "text" : "password"}
                                label="新密码"
                                placeholder="6-16位字母和数字组合"
                                ref="dealPassword"
                                value={dealPassword}
                                onChange={this._handleFieldValueChange.bind(null,"dealPassword")}
                            />
                            <Icon
                                name={showDealPasswordField ? "eye-on" : "eye-off"}
                                classPrefix="imgIcon"
                                onClick={this._toggleEyeOfField.bind(null,"dealPassword")}
                            />
                        </List.Item>

                        <List.Item nested="input">
                            <Field
                                type={showConfirmDealPasswordField ? "text" : "password"}
                                label="确认密码"
                                placeholder="请再次输入密码"
                                ref="confirmDealPassword"
                                value={confirmDealPassword}
                                onChange={this._handleFieldValueChange.bind(null,"confirmDealPassword")}
                            />
                            <Icon
                                name={showConfirmDealPasswordField ? "eye-on" : "eye-off"}
                                classPrefix="imgIcon"
                                onClick={this._toggleEyeOfField.bind(null,"confirmDealPassword")}
                            />
                        </List.Item>
                    </List>
                </Group>
                {
                    actionType === "modify" ?
                        (
                            <div className="cf">
                                <Link to="getBackDealPassword" className="fr" style={{marginRight:"0.975rem"}}>忘记原始密码?</Link>
                            </div>
                        ) :
                        null
                }

                <div className="" style={{padding:"0 0.9375rem",marginTop:"2rem"}}>
                    <Button amStyle="primary" block radius={true} onClick={this._submitDealPassword.bind(null,actionType)}>提交</Button>
                </div>
                <Modal
                    ref="modal"
                    isOpen={this.state.isModalOpen}
                    role="alert"
                    onDismiss={this._handleModalClose}
                    onClosed={this._jumpToNextLocation}
                >
                    {this.state.modalInnerText}
                </Modal>
            </Container>
        )
    },
    componentDidMount(){
        SetDealPasswordAction.getInitialData();

        SetDealPasswordStore.bind("setDealPasswordSuccess",function(){
            let {
                isIdCardVerified,
                hadBindBankCard,
                realName
                }=SetDealPasswordStore.getAll();

            let entryComponent=this.props.location.query.entryComponent;

            if(!isIdCardVerified){//如果没有实名认证的去引导用户实名认证
                this.context.router.push({
                    pathname:"realNameAuthentication",
                    entryComponent:entryComponent ? entryComponent : ""
                })
            }else if(!hadBindBankCard){//如果已经实名认证的，但是没有绑卡，引导用户去绑卡
                this.context.router.push({
                    pathname:"bindBankCard",
                    query:{
                        beforeComponent:"setDealPassword",
                        realName:realName,
                        entryComponent:entryComponent ? entryComponent : ""
                    }
                })
            }else {
                this.setState({
                    isModalOpen:true,
                    modalInnerText:"设置交易密码成功！",
                    modalType:2
                })
            }
        }.bind(this));

        SetDealPasswordStore.bind("setDealPasswordFailed",function(msg){
            Message.broadcast(msg)
        }.bind(this));
    }
});

SetDealPassword.contextTypes = {
    router:React.PropTypes.object.isRequired
};

module.exports=SetDealPassword;
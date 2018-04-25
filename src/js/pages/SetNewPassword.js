let SetNewPasswordAction=require("../actions/SetNewPasswordAction.js");
let SetNewPasswordStore=require("../stores/SetNewPasswordStore.js");

import React from "react";
import classNames from 'classnames';
import { Link } from "react-router";

import Container from "../UIComponents/Container";
import Button from "../UIComponents/Button";
import Field from "../UIComponents/Field";
import List from "../UIComponents/List";
import Icon from "../UIComponents/Icon";
import Group from "../UIComponents/Group";
import Modal from "../UIComponents/modal/Modal";
import Message from "../UIComponents/Message";
import NavBar from "../UIComponents/NavBar";


//设置新的登录密码页面
let SetNewPassword=React.createClass({
    getInitialState(){
        return {
            newPassword:"",
            confirmNewPassword:"",
            showOriginLoginPasswordField:false,
            showLoginPasswordField:false,
            showConfirmLoginPasswordField:false
        }
    },
    _submitNewPassword(actionType){
        let newLoginPassword=this.refs.newPassword.getValue();
        let confirmLoginPassword=this.refs.confirmNewPassword.getValue();
        let verificationCode=this.props.location.query.verificationCode;

        if(actionType === "setting"){
            SetNewPasswordAction.submitLoginPasswordForSetting(newLoginPassword,confirmLoginPassword,verificationCode);
        }else if(actionType === "modify"){
            let originLoginPassword=this.refs.originLoginPassword.getValue();
            SetNewPasswordAction.submitLoginPasswordForModify(originLoginPassword,newLoginPassword,confirmLoginPassword);
        }
    },
    _handleCloseModal(){
        this.context.router.push({
            pathname:"/"
        })
    },
    _handleNavBack(){
        this.context.router.goBack();
    },
    _toggleEyeOfField(fieldName){
        switch (fieldName){
            case "loginPassword":
                this.setState({
                    showLoginPasswordField:!this.state.showLoginPasswordField
                });
                break;
            case "confirmLoginPassword":
                this.setState({
                    showConfirmLoginPasswordField:!this.state.showConfirmLoginPasswordField
                });
                break;
            case "originLoginPassword":
                this.setState({
                    showOriginLoginPasswordField:!this.state.showOriginLoginPasswordField
                });
                break;
            default:
                break;
        }
    },
    _handleFieldValueChange(fieldName){
        let fieldValue=this.refs[fieldName].getValue();
        switch (fieldName){
            case "newPassword":
                if(fieldValue.length > 16){
                    fieldValue=fieldValue.slice(0,16);
                }
                this.setState({
                    newPassword:fieldValue
                });
                break;
            case "confirmNewPassword":
                if(fieldValue.length > 16){
                    fieldValue=fieldValue.slice(0,16);
                }
                this.setState({
                    confirmNewPassword:fieldValue
                });
                break;
            default:
                break;
        };
    },
    render (){
        let {
            showOriginLoginPasswordField,
            showLoginPasswordField,
            showConfirmLoginPasswordField
            }=this.state;

        let {
            newPassword,
            confirmNewPassword
            }=this.state;

        let backNav = {
            component:"a",
            icon: 'left-nav',
            title: '返回'
        };

        let actionType=this.props.location.query.actionType;

        return (
            <Container  {...this.props} scrollable={false}>
                <NavBar
                    title={actionType === "modify" ? "修改登录密码" : "设置登录密码" }
                    leftNav={[backNav]}
                    amStyle="primary"
                    onAction={this._handleNavBack}
                />
                <Group
                    header=""
                    noPadded
                >
                    <List>

                        {
                            actionType === "modify" ?
                                (
                                    <List.Item nested="input">
                                        <Field
                                            type={showOriginLoginPasswordField ? "text" : "password"}
                                            label="原始密码"
                                            placeholder="请输入原始登录密码"
                                            ref="originLoginPassword"
                                        />
                                        <Icon
                                            name={showOriginLoginPasswordField ? "eye-on" : "eye-off"}
                                            classPrefix="imgIcon"
                                            onClick={this._toggleEyeOfField.bind(null,"originLoginPassword")}
                                        />
                                    </List.Item>
                                ) :
                                null
                        }

                        <List.Item nested="input">
                            <Field
                                type={showLoginPasswordField ? "text" : "password"}
                                label="新登录密码"
                                placeholder="6-16位字母和数字组合"
                                ref="newPassword"
                                value={newPassword}
                                onChange={this._handleFieldValueChange.bind(null,"newPassword")}
                            />
                            <Icon
                                name={showLoginPasswordField ? "eye-on" : "eye-off"}
                                classPrefix="imgIcon"
                                onClick={this._toggleEyeOfField.bind(null,"loginPassword")}
                            />
                        </List.Item>

                        <List.Item nested="input">
                            <Field
                                type={showConfirmLoginPasswordField ? "text" : "password"}
                                label="确认密码"
                                placeholder="请再次输入密码"
                                ref="confirmNewPassword"
                                value={confirmNewPassword}
                                onChange={this._handleFieldValueChange.bind(null,"confirmNewPassword")}
                            />
                            <Icon
                                name={showConfirmLoginPasswordField ? "eye-on" : "eye-off"}
                                classPrefix="imgIcon"
                                onClick={this._toggleEyeOfField.bind(null,"confirmLoginPassword")}
                            />
                        </List.Item>
                    </List>
                </Group>
                {
                    actionType === "modify" ?
                        (
                            <div className="cf">
                                <Link
                                    to="getBackPassword"
                                    className="fr"
                                    style={{margin:"-0.625rem 0.975rem 2rem auto"}}
                                >
                                    忘记原始密码?
                                </Link>
                            </div>
                        ) :
                        null
                }
                <div className="" style={{padding:"0 0.9375rem"}}>
                    <Button amStyle="primary" block radius={true} onClick={this._submitNewPassword.bind(null,actionType)}>提交</Button>
                </div>
                <Modal
                    ref="modal"
                    isOpen={false}
                    role="alert"
                    onAction={this._handleCloseModal}
                >
                    {actionType === "modify" ? "修改"  : "重置"}登录密码成功！！
                </Modal>
            </Container>
        )
    },
    componentDidMount(){
        let modal=this.refs.modal;
        SetNewPasswordStore.bind("setNewPasswordFailed",function(msg){
            Message.broadcast(msg);
        }.bind(this));

        SetNewPasswordStore.bind("setNewPasswordSuccess",function(){
            modal.open();
        }.bind(this));

        SetNewPasswordStore.bind("modifyLoginPasswordFailed",function(msg){
            Message.broadcast(msg);
        }.bind(this));

        SetNewPasswordStore.bind("modifyLoginPasswordSuccess",function(){
            modal.open();
        }.bind(this));

    }
});

SetNewPassword.contextTypes = {
    router:React.PropTypes.object.isRequired
};

module.exports=SetNewPassword;
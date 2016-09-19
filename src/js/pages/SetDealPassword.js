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
import Icon from "../UIComponents/Icon"


//设置或者修改交易密码页面/组件
let SetDealPassword=React.createClass({
    getInitialState(){
        return {
            showOriginDealPasswordField:false,
            showDealPasswordField:false,
            showConfirmDealPasswordField:false
        }
    },
    _handleNavBack(){
        this.context.router.goBack();
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
            showConfirmDealPasswordField
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
                                        placeholder="6~20位字母，字符，符号"
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
                                placeholder="6~20位字母，字符，符号"
                                ref="dealPassword"
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
                                placeholder="6~20位字母，字符，符号"
                                ref="confirmDealPassword"
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
            </Container>
        )
    },
    componentDidMount(){
        SetDealPasswordStore.bind("setDealPasswordSuccess",function(){
            this.context.router.goBack();
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
require("../../scss/page/Default.scss");
var DefaultAction=require("../actions/DefaultAction.js");
var DefaultStore=require("../stores/DefaultStore.js");

import React from "react";
import {
    Link
} from 'react-router';

import Container from "../UIComponents/Container";
import Button from "../UIComponents/Button";
import Field from "../UIComponents/Field";
import List from "../UIComponents/List";
import Icon from "../UIComponents/Icon";
import Modal from "../UIComponents/modal/Modal";
import Group from "../UIComponents/Group";
import Message from "../UIComponents/Message";

 //登录组件
 let LoginView=React.createClass({
     _handleLogin(){
         let account=this.refs.account.getValue();
         let password=this.refs.password.getValue();
         DefaultAction.login(account,password);

     },
     render(){
         return (
             <div>
                 <List id="login-form">
                     <List.Item
                         media={<Icon name="person" />}
                         nested="input"
                     >
                         <Field type="number" label={null} placeholder="请输入您的手机号码" ref="account"></Field>
                     </List.Item>
                     <List.Item
                         media={<Icon name="info" />}
                         nested="input"
                     >
                         <Field type="text" label={null} placeholder="请输入您的登录密码" ref="password"></Field>
                     </List.Item>
                 </List>
                 <div className="cf">
                     <Link to="getBackPassword" className="fr">忘记密码？</Link>
                 </div>
                 <div className="btn-wrapper" >
                     <Button amStyle="primary" block radius={true} onClick={this._handleLogin}>登录</Button>
                 </div>
             </div>
         )
     }
 });

//注册组件
let RegisterView=React.createClass({
    _showPopupWindow(){
        this.refs.modal.open();
    },
    _handleClose(){
        this.refs.modal.close();
    },
    _getVerificationCode(){
        this.props.history.pushState(null,"/register?phoneNo=13682330541");
    },
    render(){
        return (
            <div>
                <List id="register-form">
                    <List.Item
                        media={<Icon name="person" />}
                        nested="input"
                    >
                        <Field type="number" label={null} placeholder="请输入您的手机号码" ref="account"></Field>
                    </List.Item>
                </List>
                <div><input type="checkbox" defaultChecked />同意<a href="javascript:void(0);" onClick={this._showPopupWindow}>《农泰金融注册服务协议》</a></div>
                <div className="btn-wrapper" >
                    <Button amStyle="primary" block radius={true} onClick={this._getVerificationCode}>获取验证码</Button>
                </div>
                <Modal
                    title="农泰金融服务协议"
                    ref="modal"
                    isOpen={false}
                    role="popup"
                    onDismiss={this._handleClose}
                >
                    <p>农泰金融服务协议</p>
                    <p>农泰金融服务协议</p>
                    <p>农泰金融服务协议</p>
                    <p>农泰金融服务协议</p>
                    <p>农泰金融服务协议</p>
                    <p>农泰金融服务协议</p>
                    <p>农泰金融服务协议</p>
                    <p>农泰金融服务协议</p>
                    <p>农泰金融服务协议</p>
                    <p>农泰金融服务协议</p>
                    <p>农泰金融服务协议</p>
                    <p>农泰金融服务协议</p>
                    <p>农泰金融服务协议</p>
                    <p>农泰金融服务协议</p>
                    <p>农泰金融服务协议</p>
                    <p>农泰金融服务协议</p>
                    <p>农泰金融服务协议</p>
                    <p>农泰金融服务协议</p>
                    <p>农泰金融服务协议</p>
                    <p>农泰金融服务协议</p>
                    <p>农泰金融服务协议</p>
                    <p>农泰金融服务协议</p>
                </Modal>
            </div>
        )
    }
});


//默认页面(包含登录和注册):Default component
 let Default=React.createClass({
    getInitialState(){
        return {
            loginView:true
        }
    },
    _toggleView(){
        this.setState({
            loginView:!this.state.loginView
        })
    } ,
    render (){
        return (
                <Container className="default-container" {...this.props}>
                    <div className="text-center">
                        <img src="./src/img/login_logo.png" alt="" className="ntLogo"/>
                    </div>
                    {this.state.loginView ? <LoginView handleLogin={this._handleLogin}/> : <RegisterView history={this.props.history}/> }
                    <div className="default-footer">
                        {this.state.loginView? "没有账号？" : "已有账号？"}
                        <a href="javascript:void(0)" onClick={this._toggleView}>{this.state.loginView  ? "立即注册" : "立即登录"}</a>
                    </div>
                </Container>
        )
    },
    componentDidMount(){
        console.log("into Default componentDidMount");
        DefaultStore.bind("loginFailed",function(msg){
            Message.broadcast(msg);
        }.bind(this));

        DefaultStore.bind("loginSuccess",function(){
            this.props.history.pushState(null,"/home");
        }.bind(this));
    }
});

export default Default;
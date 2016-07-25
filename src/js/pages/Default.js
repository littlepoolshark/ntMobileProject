require("../../scss/page/Default.scss");
var DefaultAction=require("../actions/DefaultAction.js");
var DefaultStore=require("../stores/DefaultStore.js");

import React from "react";
import {
    Link
} from 'react-router';

//ui component
import Container from "../UIComponents/Container";
import Button from "../UIComponents/Button";
import Field from "../UIComponents/Field";
import List from "../UIComponents/List";
import Icon from "../UIComponents/Icon";
import Modal from "../UIComponents/modal/Modal";
import Group from "../UIComponents/Group";
import Message from "../UIComponents/Message";

//utilities
import cookie from "../lib/cookie";

 //登录组件
 let LoginView=React.createClass({
     getInitialState(){
         return {
             showPassword:false
         }
     },
     _handleLogin(){
         let account=this.refs.account.getValue();
         let password=this.refs.password.getValue();
         DefaultAction.login(account,password);

     },
     _toggleOpenEye(){
         this.setState({
             showPassword:!this.state.showPassword
         })
     },
     render(){
         let imgIconClass=this.state.showPassword ? "eye-on" : "eye-off";
         let passwordInputType=this.state.showPassword ? "text" : "password";
         return (
             <div>
                 <List id="login-form">
                     <List.Item
                         media={<Icon name="phone" classPrefix="imgIcon" style={{marginTop:"-4px"}}/>}
                         nested="input"
                     >
                         <Field type="number" label={null} placeholder="请输入您的手机号码" ref="account"></Field>
                     </List.Item>
                     <List.Item
                         media={<Icon name="password" classPrefix="imgIcon" style={{marginTop:"-4px"}}/>}
                         nested="input"
                     >
                         <Field type={passwordInputType} label={null} placeholder="请输入您的登录密码" ref="password"></Field>
                         <Icon name={imgIconClass} classPrefix="imgIcon" style={{marginTop:"px"}} onClick={this._toggleOpenEye}/>
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
        let phoneNo=this.refs.account.getValue();
        DefaultAction.getVerificationCode(phoneNo);
    },
    render(){
        return (
            <div>
                <List id="register-form">
                    <List.Item
                        media={<Icon name="phone" classPrefix="imgIcon" style={{marginTop:"-4px"}}/>}
                        nested="input"
                    >
                        <Field type="number" label={null} placeholder="请输入您的手机号码" ref="account"></Field>
                    </List.Item>
                </List>
                <div>
                    <input type="checkbox" defaultChecked />
                    同意
                    <a href="javascript:void(0);" onClick={this._showPopupWindow}>《农泰金融注册服务协议》</a>
                </div>
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
                    <div className="text-center ntLogo-wrapper"></div>
                    {this.state.loginView ? <LoginView handleLogin={this._handleLogin}/> : <RegisterView history={this.props.history}/> }
                    <div className="default-footer">
                        {this.state.loginView? "没有账号？" : "已有账号？"}
                        <a href="javascript:void(0)" onClick={this._toggleView}>{this.state.loginView  ? "立即注册" : "立即登录"}</a>
                    </div>
                </Container>
        )
    },
    componentDidMount(){
        DefaultStore.bind("loginFailed",function(msg){
            Message.broadcast(msg);
        }.bind(this));

        DefaultStore.bind("loginSuccess",function(){

            this.context.router.push({
               pathname:"/home"
            })
        }.bind(this));

        DefaultStore.bind("getVerificationCodeCheckSuccess",function(phoneNo){
            this.context.router.push({
                pathname:"/register",
                query:{
                    phoneNo:phoneNo
                }
            })
        }.bind(this));

        DefaultStore.bind("getVerificationCodeCheckFailed",function(msg){
            Message.broadcast(msg);
        }.bind(this));
    }
});

Default.contextTypes = {
    router:React.PropTypes.object.isRequired
};

module.exports=Default;
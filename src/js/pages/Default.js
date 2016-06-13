require("../../scss/page/login.scss");
var DefaultAction=require("../actions/DefaultAction.js");
var DefaultStore=require("../stores/DefaultStore.js");

import React from "react";
import ReactDOM from "react-dom";
import {
    Link
} from 'react-router';

import Container from "../UIComponents/Container";
import View from "../UIComponents/View";
import NavBar from "../UIComponents/NavBar";
import Button from "../UIComponents/Button";
import Field from "../UIComponents/Field";
import List from "../UIComponents/List";
import Icon from "../UIComponents/Icon";
import Modal from "../UIComponents/modal/Modal";
import Slider from "../UIComponents/Slider";
import Group from "../UIComponents/Group";
import Grid from "../UIComponents/Grid";
import Col from "../UIComponents/Col";
import Message from "../UIComponents/Message";

//默认登录页面:Default component
 let Default=React.createClass({
    handleLogin(){
        let account=this.refs.account.getValue();
        let password=this.refs.password.getValue();
        DefaultAction.login(account,password);

    },
    handleCloseModal(){
        this.refs.alertModal.close();
    },
    render (){
        return (
                <Container className="login-Container" {...this.props}>
                    <div className="text-center"><img src="./src/img/login_logo.png" alt="" className="login-ntLogo"/></div>
                    <List id="login-form">
                        <List.Item
                            media={<Icon name="person" />}
                            nested="input"
                        >
                            <Field type="text" label={null} placeholder="请输入您的手机号码" ref="account"></Field>
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
                    <div className="loginBtn-wrapper" >
                        <Button amStyle="primary" block radius={true} onClick={this.handleLogin}>登录</Button>
                    </div>
                    <div className="registerBtn-wrapper text-center">
                        没有账号？<Link to="register">立即注册</Link>
                    </div>
                    <Message ref="msgBox"></Message>
                    <Modal
                        ref="alertModal"
                        isOpen={false}
                        role="alert"
                        onAction={this.handleCloseModal}
                    >
                        请输入你正确的账号和密码！
                    </Modal>
                </Container>
        )
    },
    componentDidMount(){
        //console.log("into componentDidMount,this refs:",this.refs);
        var _self=this;
        var alertModal=this.refs.alertModal;
        var msgBox=this.refs.msgBox;
        console.log("msgBox:",msgBox);

        DefaultStore.bind("loginFailed",function(msg){
            //alertModal.open();
            //alert(msg);
            //msgBox.style.opacity=0;
            //ReactDOM.render(<Message>您的密码错误，您还有8次机会！</Message>,document.getElementById("msgContainer"));

            msgBox.broadcast("您的密码错误，您还有8次机会！");
        }.bind(this));

        DefaultStore.bind("loginSuccess",function(){
            this.props.history.pushState(null,"/home");
        }.bind(this));
    }
});

export default Default;
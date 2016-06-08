require("../../css/test.css");
var DefaultAction=require("../actions/DefaultAction.js");
var DefaultStore=require("../stores/DefaultStore.js");

import React from "react";
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

//默认登录页面:Default component
 let Default=React.createClass({
    handleLogin(){
        let account=this.refs.account.getValue();
        let password=this.refs.password.getValue();
        //if( account !== "13682330541" || password !== "123456" ){
        //    this.refs.modal.open();
        //}else {
        //    //'props.history' and 'context.history' had been deprecated. please use 'context.router'
        //    // method pushState had been deprecated.please use push instead
        //    this.props.history.pushState(null,"/home");
        //}
        console.log("handleLogin");
        DefaultAction.login(account,password);

    },
    handleCloseModal(){
        this.refs.modal.close();
    },
    render (){
        return (
            <View id="app-index">
                <NavBar
                    amStyle="primary"
                    title="登录"
                />
                <Container scrollable>
                    <div style={{marginTop:"80px"}}>
                        <h6><span className="sam-test">这个字应该是红色的，字体大小24px</span></h6>
                        <List>
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
                    </div>
                    <div style={{padding:"10px",marginTop:"50px"}}>
                        <Button amStyle="primary" block radius={true} onClick={this.handleLogin}>登录</Button>
                    </div>
                    <Modal
                        ref="modal"
                        isOpen={false}
                        role="alert"
                        onAction={this.handleCloseModal}
                    >
                        请输入你正确的账号和密码！
                    </Modal>
                </Container>
            </View>
        )
    },
    componentDidMount(){
        DefaultStore.bind("loginFailed",function(){
            console.log("into loanPurchaseZoneStore change callback")
            this.refs.modal.open();
        }.bind(this));
    }
});

export default Default;
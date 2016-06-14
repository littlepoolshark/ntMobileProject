//var DefaultAction=require("../actions/DefaultAction.js");
//var DefaultStore=require("../stores/DefaultStore.js");

import React from "react";
import {
    Link
} from 'react-router';
import classNames from 'classnames';

import Container from "../UIComponents/Container";
import Button from "../UIComponents/Button";
import Field from "../UIComponents/Field";
import List from "../UIComponents/List";
import Icon from "../UIComponents/Icon";
import Group from "../UIComponents/Group";
import Message from "../UIComponents/Message";

//发送短信验证码
const COUNT_DOWN__DURATION=60;//倒数多少秒

let MobileVerificationCode=React.createClass({
    getInitialState(){
        return {
            active:true,
            remainSeconds:COUNT_DOWN__DURATION
        }
    },
    _handleClick(){
        if(!/^(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$/i.test("136823305411")){
            this.props.onAction();
        } else if(this.state.active){
            this._countDown();
        }else {
            return false;
        }
    },
    _countDown(){
        this.timer=setInterval(function(){
            if(this.state.remainSeconds > 1){
                this.setState({
                    active:false,
                    remainSeconds:this.state.remainSeconds - 1
                })
            }else {
                clearInterval(this.timer);
                this.setState({
                    active:true,
                    remainSeconds:COUNT_DOWN__DURATION
                })

            }

        }.bind(this),1000);
    },
    render(){
        let classes=classNames({
            "disabled":!this.state.active,
            "getVerificationcode-btn":true
        });
        let btnText=this.state.active ? "发送验证码" : (<span>{this.state.remainSeconds}秒后重发</span>)  ;
        return (
            <a href="javascript:void(0)" className={classes} onClick={this._handleClick}>{btnText}</a>
        )
    }
});


//找回密码页面
let GetBackPassword=React.createClass({
    _handleWrongPhoneNo(){
        this.refs.msgBox.broadcast("手机格式不对，请检查！");
    },
    render (){
        return (
            <Container  {...this.props} scrollable={false}>
                <Group
                    header=""
                    noPadded
                >
                    <List>
                        <List.Item
                            nested="input"
                        >
                            <Field type="number" label="手机号码" placeholder="请输入手机号码" ref="phoneNo"></Field>
                        </List.Item>
                        <List.Item
                            nested="input"

                        >
                            <Field
                                type="number"
                                label="验证码"
                                placeholder="请输入验证码"
                                ref="verificationCode"
                                inputAfter={ <MobileVerificationCode onAction={this._handleWrongPhoneNo}/>}
                            >

                            </Field>

                        </List.Item>
                    </List>
                </Group>
                <Group
                    header=""
                    noPadded
                >
                    <List>
                        <List.Item
                            nested="input"
                        >
                            <Field type="number" label="实名认证" placeholder="请输入身份证末4位" ref="idCardNo" ></Field>
                        </List.Item>
                    </List>
                </Group>
                <div className="" style={{padding:"0 0.9375rem"}}>
                    <Button amStyle="primary" block radius={true} onClick={this.handleLogin}>提交</Button>
                </div>
                <Message ref="msgBox"></Message>
            </Container>
        )
    }
});

export default GetBackPassword;
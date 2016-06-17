let GetBackPasswordAction=require("../actions/GetBackPasswordAction.js");
let GetBackPasswordStore=require("../stores/GetBackPasswordStore.js");

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
import MobileVerificationCode from "../UIComponents/MobileVerificationCode";


//找回密码页面
let GetBackPassword=React.createClass({
    _getPhoneNo(){
        return this.refs.phoneNo.getValue();
    },
    _submitVerificationCode(){
        let verificationCode=this.refs.verificationCode.getValue();
        let idCardNo=this.refs.idCardNo.getValue();
        GetBackPasswordAction.submitVerificationCode(verificationCode,idCardNo);
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
                                inputAfter={ <MobileVerificationCode phoneNo={this._getPhoneNo}/>}
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
                    <Button amStyle="primary" block radius={true} onClick={this._submitVerificationCode}>提交</Button>
                </div>
            </Container>
        )
    },
    componentDidMount(){
        GetBackPasswordStore.bind("submitSuccess",function(msg){
            this.props.history.pushState(null,"setNewPassword");
        }.bind(this));

        GetBackPasswordStore.bind("submitFailed",function(msg){
            Message.broadcast(msg);
        }.bind(this));
    }
});

export default GetBackPassword;
require("../../scss/page/GetBackPassword.scss");
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
    getInitialState(){
        return {
            phoneNo:""
        }
    },
    _getPhoneNo(){
        return this.refs.phoneNo.getValue();
    },
    _submitVerificationCode(){
        let verificationCode=this.refs.verificationCode.getValue();
        let idCardNo=this.refs.idCardNo.getValue();
        let phoneNo=this.refs.phoneNo.getValue();
        GetBackPasswordAction.submitVerificationCode(verificationCode,idCardNo,phoneNo);
    },
    _handlePhoneNoChange(){
        let phoneNo=parseInt(this.refs.phoneNo.getValue());
        phoneNo=isNaN(phoneNo) ? "" : phoneNo ;
        this.setState({
            phoneNo:phoneNo
        });
    },
    render (){
        return (
            <Container  {...this.props} scrollable={false} id="getBackPassword">
                <Group
                    header=""
                    noPadded
                >
                    <List>
                        <List.Item
                            nested="input"
                        >
                            <Field
                                type="text"
                                label="手机号码"
                                placeholder="请输入手机号码"
                                ref="phoneNo"
                                value={this.state.phoneNo}
                                onChange={this._handlePhoneNoChange}
                            />
                        </List.Item>
                        <List.Item
                            nested="input"

                        >
                            <Field
                                type="number"
                                label="验证码"
                                placeholder="请输入验证码"
                                ref="verificationCode"
                                inputAfter={ <MobileVerificationCode phoneNo={this._getPhoneNo} type={2}/>}
                            >

                            </Field>

                        </List.Item>
                    </List>
                </Group>
                <Group
                    header=""
                    noPadded
                    style={{marginBottom:0}}
                >
                    <List>
                        <List.Item
                            nested="input"
                        >
                            <Field type="number" label="实名认证" placeholder="请输入身份证末4位" ref="idCardNo" ></Field>
                        </List.Item>
                    </List>
                </Group>
                <div className="warm-hint">
                    <Icon classPrefix="imgIcon" name="attention"/>
                    如果您还没有实名认证，请输入8888!
                </div>
                <div className="" style={{padding:"0 0.9375rem"}}>
                    <Button amStyle="primary" block radius={true} onClick={this._submitVerificationCode}>提交</Button>
                </div>
            </Container>
        )
    },
    componentDidMount(){
        GetBackPasswordStore.bind("VerificationCodeCheckSuccess",function(verificationCode){
            this.context.router.push({
                pathname:"/setNewPassword",
                query:{
                    verificationCode:verificationCode,
                    actionType:"setting"
                }
            })
        }.bind(this));

        GetBackPasswordStore.bind("VerificationCodeCheckFailed",function(msg){
            Message.broadcast(msg);
        }.bind(this));

        GetBackPasswordStore.bind("submitFailed",function(msg){
            Message.broadcast(msg);
        })
    }
});

GetBackPassword.contextTypes = {
    router:React.PropTypes.object.isRequired
};

module.exports=GetBackPassword;
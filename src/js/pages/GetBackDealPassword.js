let GetBackDealPasswordAction=require("../actions/GetBackDealPasswordAction.js");
let GetBackDealPasswordStore=require("../stores/GetBackDealPasswordStore.js");

import React from "react";
import classNames from 'classnames';
import cookie from "../lib/cookie";

import Container from "../UIComponents/Container";
import Button from "../UIComponents/Button";
import Field from "../UIComponents/Field";
import List from "../UIComponents/List";
import Icon from "../UIComponents/Icon";
import Group from "../UIComponents/Group";
import Message from "../UIComponents/Message";
import MobileVerificationCode from "../UIComponents/MobileVerificationCode";



//找回交易密码页面／组件
let GetBackDealPassword=React.createClass({
    getInitialState(){
        return {
            showDealPasswordField:false,
            showConfirmDealPasswordField:false
        }
    },
    _formatPhoneNo(phoneNo){
        return phoneNo.slice(0,4) + "****" + phoneNo.slice(7);
    },
    _toggleEyeOfField(fieldName){
        switch (fieldName){
            case "newDealPassword":
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
    _submitGetBackDealPasswordForm(){
        let verificationCode=this.refs.verificationCode.getValue();
        let newDealPassword=this.refs.newDealPassword.getValue();
        let confirmDealPassword=this.refs.confirmDealPassword.getValue();

        GetBackDealPasswordAction.submitForm(verificationCode,newDealPassword,confirmDealPassword);
    },
    render (){
        let phoneNo=cookie.getCookie("phoneNo");
        let {
            showDealPasswordField,
            showConfirmDealPasswordField
            }=this.state;
        return (
            <Container  {...this.props} scrollable={false}>
                <div style={{marginTop:"10px",fontSize:"14px",textAlign:"center",color:"#666"}}>本次交易短信验证码已经发送到您的手机</div>
                <div style={{margin:"10px 0",fontSize:"20px",textAlign:"center"}}>{this._formatPhoneNo(phoneNo)}</div>

                <Group
                    header=""
                    noPadded
                    style={{marginTop:0}}
                    >
                    <List>
                        <List.Item
                            nested="input"
                            >
                            <Field
                                label="验证码"
                                placeholder="请输入验证码"
                                ref="verificationCode"
                                inputAfter={ <MobileVerificationCode phoneNo={phoneNo} autoSend={true} type="3"/>}
                                />
                        </List.Item>
                    </List>
                </Group>

                <Group
                    header="请设置新的交易密码"
                    noPadded
                >
                    <List>
                        <List.Item
                            nested="input"
                        >
                            <Field
                                type={showDealPasswordField ? "text" : "password"}
                                label="新交易密码"
                                placeholder="6～20位字母，字符，符号"
                                ref="newDealPassword"
                            />
                            <Icon
                                name={showDealPasswordField ? "eye-on" : "eye-off"}
                                classPrefix="imgIcon"
                                onClick={this._toggleEyeOfField.bind(null,"newDealPassword")}
                            />
                        </List.Item>
                        <List.Item
                            nested="input"
                        >
                            <Field
                                type={showConfirmDealPasswordField ? "text" : "password"}
                                label="确认新密码"
                                placeholder="6～20位字母，字符，符号"
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
                <div className="" style={{padding:"0 0.9375rem",marginTop:"2rem"}}>
                    <Button amStyle="primary" block radius={true} onClick={this._submitGetBackDealPasswordForm}>提交</Button>
                </div>
            </Container>
        )
    },
    componentDidMount(){
        GetBackDealPasswordStore.bind("submitSuccess",function(){
            Message.broadcast("找回交易密码成功！");
            this.context.router.push({
                pathname:"userHome"
            });
        }.bind(this));

        GetBackDealPasswordStore.bind("submitFailed",function(msg){
           Message.broadcast(msg);
        }.bind(this));
    }
});

GetBackDealPassword.contextTypes = {
    router:React.PropTypes.object.isRequired
};

module.exports=GetBackDealPassword;
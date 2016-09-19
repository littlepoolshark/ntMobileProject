//let GetBackDealPasswordAction=require("../actions/GetBackDealPasswordAction.js");
//let GetBackDealPasswordStore=require("../stores/GetBackDealPasswordStore.js");

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
    _formatPhoneNo(phoneNo){
        return phoneNo.slice(0,4) + "****" + phoneNo.slice(7);
    },
    render (){
        let phoneNo=cookie.getCookie("phoneNo");
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
                                type="number"
                                label="验证码"
                                placeholder="请输入验证码"
                                ref="newDealPassword"
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
                                type="text"
                                label="新交易密码"
                                placeholder="6～20位字母，字符，符号"
                                ref="newDealPassword"
                            />
                        </List.Item>
                        <List.Item
                            nested="input"
                        >
                            <Field
                                type="text"
                                label="确认新密码"
                                placeholder="请再输入一次"
                                ref="confirmDealPassword"
                            />
                        </List.Item>
                    </List>
                </Group>
                <div className="" style={{padding:"0 0.9375rem",marginTop:"2rem"}}>
                    <Button amStyle="primary" block radius={true}>提交</Button>
                </div>
            </Container>
        )
    },
    componentDidMount(){

    }
});

GetBackDealPassword.contextTypes = {
    router:React.PropTypes.object.isRequired
};

module.exports=GetBackDealPassword;
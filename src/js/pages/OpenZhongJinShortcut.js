let OpenZhongJinShortcutAction=require("../actions/OpenZhongJinShortcutAction.js");
let OpenZhongJinShortcutStore=require("../stores/OpenZhongJinShortcutStore.js");

import React from "react";
import classNames from 'classnames';

import Container from "../UIComponents/Container";
import Button from "../UIComponents/Button";
import Field from "../UIComponents/Field";
import List from "../UIComponents/List";
import Group from "../UIComponents/Group";
import Modal from "../UIComponents/modal/Modal"
import Message from "../UIComponents/Message";
import MobileVerificationCode from "../UIComponents/MobileVerificationCode";

//utilities
import BankCard from "./utilities/BankCard";

//lib
import cookie from "../lib/cookie";

//找回密码页面
let OpenZhongJinShortcut=React.createClass({
    getInitialState(){
        return OpenZhongJinShortcutStore.getAll();
    },
    _formatPhoneNo(phoneNo){
        return phoneNo.slice(0,3) + "****" + phoneNo.slice(7);
    },
    _openShortcutPay(){
        let verificationCode=this.refs.verificationCode.getValue();
        OpenZhongJinShortcutAction.openShortcutPay(verificationCode);
    },
    _handleVerifyCodeChange(event){
        let verificationCode=this.refs.verificationCode.getValue();
        if(verificationCode !== ""){
            verificationCode=verificationCode.replace(/[^\d]/g,"");
        }
        this.setState({
            verifyCode:verificationCode
        });
    },
    render (){
        let phoneNo=cookie.getCookie("phoneNo");
        let {
            bankName,
            cardno,
            shortIcon,
            verifyCode
            }=this.state;
        return (
            <Container  {...this.props} scrollable={false}>
                <BankCard
                    groupTitle="存管账户已成功开通，现开通快捷支付即可开始充值"
                    bankName={bankName}
                    cardno={cardno}
                    shortIcon={shortIcon}
                />
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
                                type="text"
                                label="手机号码"
                                placeholder=""
                                value={this._formatPhoneNo(phoneNo)}
                                readOnly
                            />
                        </List.Item>
                        <List.Item
                            nested="input"

                        >
                            <Field
                                type="text"
                                label="验证码"
                                placeholder="请输入验证码"
                                ref="verificationCode"
                                value={verifyCode}
                                onChange={this._handleVerifyCodeChange}
                                inputAfter={ <MobileVerificationCode phoneNo={phoneNo} autoSend={false}  type="6"/>}
                            />
                        </List.Item>
                    </List>
                </Group>
                <div className="" style={{padding:"0 0.9375rem",marginTop:"2rem"}}>
                    <Button amStyle="primary" block radius={true} onClick={this._openShortcutPay}>开通快捷支付</Button>
                </div>
            </Container>
        )
    },
    componentDidMount(){
        OpenZhongJinShortcutAction.getInitialData();

        OpenZhongJinShortcutStore.bind("change",function(){
            this.setState(OpenZhongJinShortcutStore.getAll());
        }.bind(this));

        OpenZhongJinShortcutStore.bind("openZhongJinShortcutSuccess",function(){
            Message.broadcast("快捷支付已成功开通");
            this.context.router.push({
                pathname:"userHome"
            })
        }.bind(this));

        OpenZhongJinShortcutStore.bind("openZhongJinShortcutFailed",function(msg){
            Message.broadcast(msg);
        });

        OpenZhongJinShortcutStore.bind("submitFormCheckFailed",function(msg){
            Message.broadcast(msg);
        });

    },
    componentWillUnmount(){
    }
});

OpenZhongJinShortcut.contextTypes = {
    router:React.PropTypes.object.isRequired
};

module.exports=OpenZhongJinShortcut;
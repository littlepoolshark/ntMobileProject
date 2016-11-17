let ZhongJinShortcutPayAction=require("../actions/ZhongJinShortcutPayAction.js");
let ZhongJinShortcutPayStore=require("../stores/ZhongJinShortcutPayStore.js");

import React from "react";
import classNames from 'classnames';

import Container from "../UIComponents/Container";
import Button from "../UIComponents/Button";
import Field from "../UIComponents/Field";
import List from "../UIComponents/List";
import Group from "../UIComponents/Group";
import Message from "../UIComponents/Message";
import MobileVerificationCode from "../UIComponents/MobileVerificationCode";

//lib
import cookie from "../lib/cookie";

//找回密码页面
let ZhongJinShortcutPay=React.createClass({
    getInitialState(){
        return {
            rechargeAmount:ZhongJinShortcutPayStore.getAll().rechargeAmount
        }
    },
    _formatPhoneNo(phoneNo){
        return phoneNo.slice(0,3) + "****" + phoneNo.slice(7);
    },
    _submitZhongJinPayForm(){
        let verificationCode=this.refs.verificationCode.getValue();
        ZhongJinShortcutPayAction.submitZhongJinRechargeForm(verificationCode);
    },
    render (){
        let phoneNo=cookie.getCookie("phoneNo");
        let rechargeAmount=this.state.rechargeAmount;
        return (
            <Container  {...this.props} scrollable={false}>
                <div style={{marginTop:"10px",fontSize:"14px",textAlign:"center",color:"#666"}}>本次交易需要短信，验证码正在发送到您的手机</div>
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
                                ref="verificationCode"
                                inputAfter={
                                    rechargeAmount !== "" ?
                                    <MobileVerificationCode
                                    phoneNo={phoneNo}
                                    autoSend={true}
                                    rechargeAmount={rechargeAmount}
                                    type="7"/> :
                                    null
                                }
                            />
                        </List.Item>
                    </List>
                </Group>
                <div className="" style={{padding:"0 0.9375rem",marginTop:"2rem"}}>
                    <Button amStyle="primary" block radius={true} onClick={this._submitZhongJinPayForm}>确认支付</Button>
                </div>
            </Container>
        )
    },
    componentDidMount(){

        ZhongJinShortcutPayStore.bind("change",function(){
            this.setState({
                rechargeAmount:ZhongJinShortcutPayStore.getAll().rechargeAmount
            })
        }.bind(this));

        ZhongJinShortcutPayStore.bind("ZhongJinRechargeSuccess",function(){
            Message.broadcast("充值成功！");
            this.context.router.push({
                pathname:"userHome"
            });
        }.bind(this));

        ZhongJinShortcutPayStore.bind("ZhongJinRechargeFailed",function(msg){
            Message.broadcast(msg);
        });

        ZhongJinShortcutPayStore.bind("RechargeFormCheckFailed",function(msg){
            Message.broadcast(msg);
        });

        let rechargeAmount=this.props.location.query.rechargeAmount;
        ZhongJinShortcutPayAction.changeRechargeAmount(rechargeAmount);


    },
    componentWillUnmount(){
    }
});

ZhongJinShortcutPay.contextTypes = {
    router:React.PropTypes.object.isRequired
};

module.exports=ZhongJinShortcutPay;
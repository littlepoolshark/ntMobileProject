//@flow
let RechargeWithBAOFUAction = require("../actions/RechargeWithBAOFUAction.js");
let RechargeWithBAOFUStore = require("../stores/RechargeWithBAOFUStore.js");

import React from "react";
import classNames from 'classnames';

import Container from "../UIComponents/Container";
import Button from "../UIComponents/Button";
import Field from "../UIComponents/Field";
import List from "../UIComponents/List";
import Group from "../UIComponents/Group";
import Message from "../UIComponents/Message";
import Modal from "../UIComponents/modal/Modal";
import MobileVerificationCode from "../UIComponents/MobileVerificationCode";



//找回密码页面
let RechargeWithBAOFU = React.createClass({
    getInitialState() {
        return {
            verifyCode: RechargeWithBAOFUStore.getAll().verifyCode,
            isLoadingModalOpen:false
        };
    },
    _formatPhoneNo(phoneNo: string) {
        return phoneNo.slice(0, 3) + "****" + phoneNo.slice(7);
    },

    _RechargeWithBAOFU() {
        RechargeWithBAOFUAction.RechargeWithBAOFU();
    },
    _handleFieldValueChange(fieldName: string) {
        let fieldValue = this.refs[fieldName].getValue();
        switch (fieldName) {
            case "verifyCode":
                fieldValue =fieldValue.replace(/\D/g,"");
                break;
            default:
                break;
        };

        RechargeWithBAOFUAction.changeVerifyCode(fieldValue);
    },
    render() {
        let {
            phoneNo,
            id:bankCardId,
            rechargeAmount
        }=this.props.location.query;
        

        return (
            <Container scrollable={false}>

                <div style={{ marginTop: "10px", fontSize: "14px", textAlign: "center", color: "#666" }}>本次交易短信验证码已经发送到您的手机</div>
                <div style={{ margin: "10px 0", fontSize: "20px", textAlign: "center" }}>{this._formatPhoneNo(phoneNo)}</div>
                <Group
                    header=""
                    noPadded
                    style={{ marginTop: 0 }}
                >
                    <List>
                        <List.Item
                            nested="input"

                        >
                            <Field
                                type="text"
                                label="验证码"
                                placeholder="请输入验证码"
                                ref="verifyCode"
                                value={this.state.verifyCode}
                                inputAfter={
                                    <MobileVerificationCode 
                                        phoneNo={phoneNo} 
                                        bankCardId={bankCardId}
                                        rechargeAmount={rechargeAmount}
                                        autoSend={false} 
                                        countDownOnly={true} 
                                        type="BAOFU" 
                                    />}
                                onChange={this._handleFieldValueChange.bind(null, "verifyCode")}
                            />
                        </List.Item>
                    </List>
                </Group>
                <div className="" style={{ padding: "0 0.9375rem" }}>
                    <Button amStyle="primary" block radius={true} onClick={this._RechargeWithBAOFU}>完成充值</Button>
                </div>
                    <Modal
                    title=""
                    isOpen={this.state.isLoadingModalOpen}
                    role="loading"
                >
                    处理中，请稍候...
                </Modal>
            </Container>
        )
    },
    componentDidMount() {

        let dataFromUrl: {
            business_no: string,
            orderId: string,
            rechargeId: string
        }=this.props.location.query;
        RechargeWithBAOFUAction.getInitialData(dataFromUrl);

        RechargeWithBAOFUStore.bind("RechargeWithBAOFUSuccess", function () {
            Message.broadcast("充值成功！");
            this.context.router.push({
                pathname: "userHome"
            })
        }.bind(this));

        RechargeWithBAOFUStore.bind("RechargeWithBAOFUFailed", function (msg) {
            Message.broadcast(msg);
            this.context.router.push({
                pathname: "recharge"
            })      
        }.bind(this));

        RechargeWithBAOFUStore.bind("verifyCodeChange", function () {
            this.setState({
                verifyCode: RechargeWithBAOFUStore.getAll().verifyCode
            });
        }.bind(this));

        RechargeWithBAOFUStore.bind("RechargeWithBAOFUStarting",() => {
              this.setState({
                isLoadingModalOpen: true
            });
        })

    },
    componentWillUnmount() {
        RechargeWithBAOFUStore.clearAll();
    }
});

RechargeWithBAOFU.contextTypes = {
    router: React.PropTypes.object.isRequired
};

module.exports = RechargeWithBAOFU;
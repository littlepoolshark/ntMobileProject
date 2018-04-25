require("../../scss/page/SetNewMobilePhoneNo.scss");
let SetNewMobilePhoneNoAction = require("../actions/SetNewMobilePhoneNoAction.js");
let SetNewMobilePhoneNoStore = require("../stores/SetNewMobilePhoneNoStore.js");

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
import Modal from "../UIComponents/modal/Modal";


//设置新手机号码组价
let SetNewMobilePhoneNo = React.createClass({
    getInitialState() {
        return {
            data:SetNewMobilePhoneNoStore.getAll(),
            isActionModalOpen:false
        }
    },
    _getPhoneNo() {
        return this.refs.newPhoneNo.getValue();
    },
    _formatPhoneNo(phoneNo){
        return phoneNo.slice(0,3) + ' **** ' + phoneNo.slice(-4);
    },
    _handleFieldValueChange(fieldName) {
        let fieldValue = this.refs[fieldName].getValue();
        switch (fieldName) {
            case "newPhoneNo":
                fieldValue=fieldValue.replace(/[^\d]/g,"");
                if(fieldValue.length === 1){
                    fieldValue = "1";
                }else {
                    if(fieldValue.length > 11){
                        fieldValue = fieldValue.slice(0,11);
                    }
                }
                break;
            default:
                break;
        };
        SetNewMobilePhoneNoAction.changeFieldValue(fieldName, fieldValue);
    },
    _jumpToLogin(){
        this.context.router.push({
            pathname:"/"
        })
    },
    _closeActionModal(){
        this.setState({
            isActionModalOpen:false
        })
    },
    _openActionModal(){
        this.setState({
            isActionModalOpen:true
        })
    },
    _handleModifyTypeChange(canOldPoneNoReceiveMsg){
        SetNewMobilePhoneNoAction.changeModifyType(canOldPoneNoReceiveMsg);
    },
    render() {
        let {
            newPhoneNo,
            canOldPoneNoReceiveMsg
        } = this.state.data;

        let originPhoneNo=this.props.location.query.phoneNo || '';
        let modifyTypeText=`原手机号${canOldPoneNoReceiveMsg ? '可以' : '无法'}接收验证码`;
        let isBtnEnabled=!!newPhoneNo && canOldPoneNoReceiveMsg !== '';

        return (
            <Container scrollable={false} id="setNewMobilePhoneNo">
                <Group id="phoneNoWrapper">
                    <Icon name="phone-icon" classPrefix="imgIcon" />
                    <div>你已绑定的手机号</div>
                    <strong>{this._formatPhoneNo(originPhoneNo)}</strong>
                </Group>
                <Group
                    header=""
                    noPadded
                >
                    <List.Item
                            nested="input"
                            onClick={this._openActionModal}
                        >
                            <Field
                                readOnly
                                type="text"
                                label="修改类型"
                                placeholder="请选择修改类型"
                                ref="canOldPoneNoReceiveMsg"
                                value={canOldPoneNoReceiveMsg === '' ? '' : modifyTypeText }
                                inputAfter={ <Icon
                                    name="right-nav"
                                    style={{ fontSize: "20px", color: "#c2c2c2" }}
                                  />}
                            >

                            </Field>
                    </List.Item>
                    <List>
                        <List.Item
                            nested="input"
                        >
                            <Field
                                type="text"
                                label="新手机号码"
                                placeholder="请输入新的手机号码"
                                ref="newPhoneNo"
                                value={newPhoneNo}
                                onChange={this._handleFieldValueChange.bind(null,"newPhoneNo")}
                            />
                        </List.Item>
                    </List>
                </Group>
                <div className="" style={{ padding: "0 0.9375rem" }}>
                    <Button 
                        amStyle="primary" 
                        block 
                        radius
                        disabled={!isBtnEnabled}
                        onClick={SetNewMobilePhoneNoAction.submitForm}
                    >
                        下一步
                    </Button>
                </div>
                <Modal
                    isOpen={this.state.isActionModalOpen}
                    role="actions"
                    onDismiss={this._closeActionModal}
                    btnStyle="primary"
                    >
                    <List>
                        <List.Item onClick={this._handleModifyTypeChange.bind(null, true)}>
                            原手机号可以接受验证码
                        </List.Item>
                        <List.Item
                        onClick={this._handleModifyTypeChange.bind(null, false)}
                        >
                            原手机号无法接受验证码
                        </List.Item>
                    </List>
                </Modal>
            </Container>
        )
    },
    componentDidMount() {
        SetNewMobilePhoneNoStore.bind("change", function () {
            this.setState({
                data:SetNewMobilePhoneNoStore.getAll(),
                isActionModalOpen:false
            });
        }.bind(this));

        SetNewMobilePhoneNoStore.bind("setNewMobilePhoneSuccess", function (nextLocation) {
            window.location.href=nextLocation;
        }.bind(this));

        SetNewMobilePhoneNoStore.bind("setNewMobilePhoneFailed", function (msg) {
            Message.broadcast(msg);
        });

        SetNewMobilePhoneNoStore.bind("formCheckFailed", function (msg) {
            Message.broadcast(msg);
        });
    },
    componentWillUnmount(){
        SetNewMobilePhoneNoStore.clearAll();
    }
});

SetNewMobilePhoneNo.contextTypes = {
    router: React.PropTypes.object.isRequired
};

module.exports = SetNewMobilePhoneNo;
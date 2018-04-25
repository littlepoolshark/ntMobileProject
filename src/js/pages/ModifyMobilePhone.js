let ModifyMobilePhoneAction=require("../actions/ModifyMobilePhoneAction.js");
let ModifyMobilePhoneStore=require("../stores/ModifyMobilePhoneStore.js");

import React from "react";
import { Link } from "react-router";
import classNames from 'classnames';

import Container from "../UIComponents/Container";
import Button from "../UIComponents/Button";
import Field from "../UIComponents/Field";
import List from "../UIComponents/List";
import Group from "../UIComponents/Group";
import Message from "../UIComponents/Message";
import NavBar from "../UIComponents/NavBar";
import Icon from "../UIComponents/Icon";
import Modal from "../UIComponents/modal/Modal";


//设置或者修改交易密码页面/组件
let ModifyMobilePhone = React.createClass({
    getInitialState() {
        return ModifyMobilePhoneStore.getAll();
    },
    _handleFieldValueChange(fieldName) {
        let fieldValue = this.refs[fieldName].getValue();
        switch (fieldName) {
            case "idCardNo":
                fieldName=fieldName;
                break;
            case "loginPassword":
                fieldName=fieldName;
                break;
            default:
                break;
        };
        ModifyMobilePhoneAction.changeFieldValue(fieldName,fieldValue);
    },
    _handleNavBack(){
        this.context.router.push({
            pathname:"securityCenter"
        });
    },
    _jumpToNextLocation(){
        this.context.router.push({
            pathname:"setNewMobilePhoneNo"
        });
    },
    _confirmToModify(){
        ModifyMobilePhoneAction.confirmToModify();
    },
    render() {

        let backNav = {
            component: "a",
            icon: 'left-nav',
            title: '返回'
        };
        let {
            idCardNo,
            loginPassword
            } = this.state;
        return (
            <Container  scrollable={false}>
                <NavBar
                    title="修改手机号码"
                    leftNav={[backNav]}
                    amStyle="primary"
                    onAction={this._handleNavBack}
                />
                <Group
                    noPadded
                    style={{ marginBottom: "0.2rem" }}
                >
                    <List>
                        <List.Item nested="input">
                            <Field
                                type="text"
                                label="原手机号码"
                                placeholder={this.props.location.query.oldPhoneNo}
                                disabled
                                style={{backgroundColor:"transparent"}}
                            />
                        </List.Item>
                        <List.Item nested="input">
                            <Field
                                type="text"
                                label="实名认证"
                                placeholder="请输入身份证号码"
                                ref="idCardNo"
                                value={idCardNo}
                                onChange={this._handleFieldValueChange.bind(null, "idCardNo")}
                            />
                        </List.Item>

                        <List.Item nested="input">
                            <Field
                                type="password"
                                label="登录密码"
                                placeholder="请输入登录密码"
                                ref="loginPassword"
                                value={loginPassword}
                                onChange={this._handleFieldValueChange.bind(null, "loginPassword")}
                            />
                        </List.Item>
                    </List>
                </Group>
                <div className="" style={{ padding: "0 0.9375rem", marginTop: "2rem" }}>
                    <Button amStyle="primary" block radius={true} onClick={this._confirmToModify}>提交</Button>
                </div>
            </Container>
        )
    },
    componentDidMount() {

        ModifyMobilePhoneStore.bind("change", function () {
           this.setState(ModifyMobilePhoneStore.getAll())
        }.bind(this));

        ModifyMobilePhoneStore.bind("formCheckFailed", function (msg) {
           Message.broadcast(msg);
        }.bind(this));

        ModifyMobilePhoneStore.bind("idAuthenticationSuccess", function () {
           this._jumpToNextLocation();
        }.bind(this));

        ModifyMobilePhoneStore.bind("idAuthenticationFailed", function (msg) {
            Message.broadcast(msg)
        }.bind(this));
    },
    componentWillUnmount(){
        ModifyMobilePhoneStore.clearAll();
    }
});

ModifyMobilePhone.contextTypes = {
    router: React.PropTypes.object.isRequired
};

module.exports = ModifyMobilePhone;
let SetNewPasswordAction=require("../actions/SetNewPasswordAction.js");
let SetNewPasswordStore=require("../stores/SetNewPasswordStore.js");

import React from "react";
import classNames from 'classnames';

import Container from "../UIComponents/Container";
import Button from "../UIComponents/Button";
import Field from "../UIComponents/Field";
import List from "../UIComponents/List";
import Icon from "../UIComponents/Icon";
import Group from "../UIComponents/Group";
import Modal from "../UIComponents/modal/Modal";
import Message from "../UIComponents/Message";


//设置新的登录密码页面
let SetNewPassword=React.createClass({
    _submitNewPassword(){
        let newPassword=this.refs.newPassword.getValue();
        let confirmNewPassword=this.refs.confirmNewPassword.getValue();
        let verificationCode=this.props.location.query.verificationCode;
        SetNewPasswordAction.submitNewPassword(newPassword,confirmNewPassword,verificationCode);
    },
    _handleCloseModal(){
        this.context.router.push({
            pathname:"/"
        })
    },
    render (){
        return (
            <Container  {...this.props} scrollable={false}>
                <Group
                    header=""
                    noPadded
                >
                    <List>

                        <List.Item nested="input">
                            <Field type="password" label="新登录密码" placeholder="6~16位字母，字符" ref="newPassword" ></Field>
                        </List.Item>

                        <List.Item nested="input">
                            <Field
                                type="password"
                                label="确认登录密码"
                                placeholder="再输入一次"
                                ref="confirmNewPassword"
                            >

                            </Field>

                        </List.Item>
                    </List>
                </Group>
                <div className="" style={{padding:"0 0.9375rem"}}>
                    <Button amStyle="primary" block radius={true} onClick={this._submitNewPassword}>提交</Button>
                </div>
                <Modal
                    ref="modal"
                    isOpen={false}
                    role="alert"
                    onAction={this._handleCloseModal}
                >
                    重置登录密码成功！！
                </Modal>
            </Container>
        )
    },
    componentDidMount(){
        let modal=this.refs.modal;
        SetNewPasswordStore.bind("setNewPasswordFailed",function(msg){
            Message.broadcast(msg);
        }.bind(this));

        SetNewPasswordStore.bind("setNewPasswordSuccess",function(){
            modal.open();
        }.bind(this));

    }
});

SetNewPassword.contextTypes = {
    router:React.PropTypes.object.isRequired
};

module.exports=SetNewPassword;
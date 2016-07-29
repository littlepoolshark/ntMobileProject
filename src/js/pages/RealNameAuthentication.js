let RealNameAuthenticationAction=require("../actions/RealNameAuthenticationAction.js");
let RealNameAuthenticationStore=require("../stores/RealNameAuthenticationStore.js");

import React from "react";
import classNames from 'classnames';

import Container from "../UIComponents/Container";
import Button from "../UIComponents/Button";
import Field from "../UIComponents/Field";
import List from "../UIComponents/List";
import Group from "../UIComponents/Group";
import Modal from "../UIComponents/modal/Modal";
import Message from "../UIComponents/Message";


//设置新的登录密码页面
let RealNameAuthentication=React.createClass({
    getInitialState(){
        return {
            isModalOpen:false
        }
    },
    _submitAuthenticationForm(){
        let realName=this.refs.userRealName.getValue();
        let idCardNo=this.refs.idCardNo.getValue();
        RealNameAuthenticationAction.submitAuthenticationForm(realName,idCardNo);
    },
    _jumpToNextLocation(){
        this.context.router.goBack();
    },
    _handleModalClose(){
        this.setState({
            isModalOpen:false
        });
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
                            <Field
                                type="text"
                                label="姓名"
                                placeholder="请输入您的真实姓名"
                                ref="userRealName" />
                        </List.Item>

                        <List.Item nested="input">
                            <Field
                                type="text"
                                label="身份证"
                                placeholder="请输入身份证号码"
                                ref="idCardNo"
                            />
                        </List.Item>
                    </List>
                </Group>
                <div className="" style={{padding:"0 0.9375rem",marginTop:"2rem"}}>
                    <Button amStyle="primary" block radius={true} onClick={this._submitAuthenticationForm}>完成认证</Button>
                </div>
                <Modal
                    ref="modal"
                    isOpen={this.state.isModalOpen}
                    role="alert"
                    onDismiss={this._handleModalClose}
                    onClosed={this._jumpToNextLocation}
                >
                    实名认证成功！
                </Modal>
            </Container>
        )
    },
    componentDidMount(){
        RealNameAuthenticationStore.bind("authenticateSuccess",function(){
            this.setState({
                isModalOpen:true
            });
        }.bind(this));

        RealNameAuthenticationStore.bind("authenticateFailed",function(msg){
            //Message.broadcast(msg)
            this.setState({
                isModalOpen:true
            });
        }.bind(this));
    }
});

RealNameAuthentication.contextTypes = {
    router:React.PropTypes.object.isRequired
};

module.exports=RealNameAuthentication;
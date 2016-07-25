let registerAction=require("../actions/registerAction.js");
let registerStore=require("../stores/registerStore.js");

import React from "react";
import classNames from 'classnames';

import Container from "../UIComponents/Container";
import Button from "../UIComponents/Button";
import Field from "../UIComponents/Field";
import List from "../UIComponents/List";
import Icon from "../UIComponents/Icon";
import Group from "../UIComponents/Group";
import Modal from "../UIComponents/modal/Modal"
import NavBar from "../UIComponents/NavBar";
import Message from "../UIComponents/Message";
import MobileVerificationCode from "../UIComponents/MobileVerificationCode";

function getParamObjFromUrl(){
    let hashStr=location.hash;
    let paramArr=hashStr.slice(hashStr.indexOf("?")+1).split("&");
    let paramObj={};
    for(let i=0;i<paramArr.length;i++){
        let paramObj_key=paramArr[i].split("=")[0];
        let paramObj_value=paramArr[i].split("=")[1];
        paramObj[paramObj_key]=paramObj_value;
    }
    return paramObj;
}

//找回密码页面
let Register=React.createClass({
    _formatPhoneNo(phoneNo){
        return phoneNo.slice(0,3) + "****" + phoneNo.slice(7);
    },
    _handleNavBack(obj){

        if(obj.title === "返回"){
            this.props.history.pushState(null,"/");
        }else if(obj.title === "邀请人"){
            this.refs.modal.open();
        }
    },
    _handleOnAction(data){
        if(data === ""){
            return false;
        }else {
            registerAction.fillInviterCode(data);
            return true;
        }
    },
    _handleOnDismiss(event){
        this.refs.modal.close();
    },
    _register(){
        let phoneNo=this.props.location.query.phoneNo;
        let loginPassword=this.refs.password.getValue();
        let verificationCode=this.refs.verificationCode.getValue();
        registerAction.register(phoneNo,loginPassword,verificationCode);
    },
    render (){
        let phoneNo=this.props.location.query.phoneNo;
        let backNav = {
            component:"a",
            icon: 'left-nav',
            title: '返回'
        };
        let rightNav = {
            component:"a",
            title:"邀请人",
            ref:"inviter"
        }
        return (
            <Container  {...this.props} scrollable={false}>
                <NavBar
                    title="注册"
                    leftNav={[backNav]}
                    rightNav={[rightNav]}
                    amStyle="primary"
                    onAction={this._handleNavBack}
                />
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
                                ref="verificationCode"
                                inputAfter={ <MobileVerificationCode phoneNo={phoneNo} autoSend={true} type="1"/>}
                            />
                        </List.Item>
                        <List.Item
                            nested="input"
                        >
                            <Field type="text" label="登录密码" placeholder="6~20位字符或者数字" ref="password"></Field>
                        </List.Item>
                    </List>
                </Group>
                <div className="" style={{padding:"0 0.9375rem"}}>
                    <Button amStyle="primary" block radius={true} onClick={this._register}>注册</Button>
                </div>
                <Modal role="prompt" title=""  ref="modal" onAction={this._handleOnAction} onDismiss={this._handleOnDismiss}>
                    请输入邀请人手机号码或者邀请码
                    <Field type="text"  placeholder="" ref="inviterPhoneNo" />
                </Modal>
            </Container>
        )
    },
    componentDidMount(){
        registerStore.bind("registerSuccess",function(){
            this.context.router.push({
                pathname:"/productList"
            })
        }.bind(this));

        registerStore.bind("registerFailed",function(msg){
            Message.broadcast(msg);
        });
    }
});

Register.contextTypes = {
    router:React.PropTypes.object.isRequired
};

module.exports=Register;
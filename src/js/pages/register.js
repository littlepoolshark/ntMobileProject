let RegisterAction=require("../actions/RegisterAction.js");
let RegisterStore=require("../stores/RegisterStore.js");

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
    getInitialState(){
        return {
            showLoginPasswordField:false,
            inviterCode:RegisterStore.getInviterCode()
        }
    },
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
    _handleOnAction(data,event){
        let btnTxt=event.target.innerText;
        if(btnTxt === "取消"){
            RegisterAction.clearInviterCode();
            return true;
        }else if(btnTxt === "确定" && data !== ""){
            return true;
        }else {
            return false;
        }

    },
    _handleOnDismiss(event){
        this.refs.modal.close();
    },
    _toggleEyeOfField(){
        this.setState({
            showLoginPasswordField:!this.state.showLoginPasswordField
        });
    },
    _register(){
        let phoneNo=this.props.location.query.phoneNo;
        let loginPassword=this.refs.password.getValue();
        let verificationCode=this.refs.verificationCode.getValue();
        RegisterAction.register(phoneNo,loginPassword,verificationCode);
    },
    _handleInviterCodeChange(){
        let inviterCode=this.refs.inviterPhoneNo.getValue();
        inviterCode=inviterCode.replace(/\D/g,"");
        RegisterAction.changeInviterCode(inviterCode);
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
                                inputAfter={ <MobileVerificationCode phoneNo={phoneNo} autoSend={false} countDownOnly={true} type="1"/>}
                            />
                        </List.Item>
                        <List.Item
                            nested="input"
                        >
                            <Field
                                type={this.state.showLoginPasswordField ? "text" : "password"}
                                label="登录密码"
                                placeholder="6~20位字母，字符，符号"
                                ref="password" 
                            />
                            <Icon
                                name={this.state.showLoginPasswordField ? "eye-on" : "eye-off"}
                                classPrefix="imgIcon"
                                onClick={this._toggleEyeOfField}
                            />
                        </List.Item>
                    </List>
                </Group>
                <div className="" style={{padding:"0 0.9375rem"}}>
                    <Button amStyle="primary" block radius={true} onClick={this._register}>注册</Button>
                </div>
                <Modal
                    role="prompt"
                    title=""
                    ref="modal"
                    onAction={this._handleOnAction}
                    onDismiss={this._handleOnDismiss}
                >
                    请输入邀请人手机号码或者邀请码
                    <Field
                        type="text"
                        placeholder=""
                        ref="inviterPhoneNo"
                        value={this.state.inviterCode}
                        onChange={this._handleInviterCodeChange}
                    />
                </Modal>
            </Container>
        )
    },
    componentDidMount(){

        RegisterStore.bind("registerSuccess",function(){
            this.context.router.push({
                pathname:"/productList"
            })
        }.bind(this));

        RegisterStore.bind("registerFailed",function(msg){
            Message.broadcast(msg);
        });

        RegisterStore.bind("inviterCodeChange",function(){
            this.setState({
                inviterCode:RegisterStore.getInviterCode()
            });
        }.bind(this));

        //下面这段代码必须写在对“inviterCodeChange”事件进行handler绑定之后，否则，无法进入该handler里面
        let inviteCode=this.props.location.query.inviteCode;
        if(!!inviteCode){
            RegisterAction.changeInviterCode(inviteCode);
        }
    },
    componentWillUnmount(){
        RegisterStore.clearAll();
    }
});

Register.contextTypes = {
    router:React.PropTypes.object.isRequired
};

module.exports=Register;
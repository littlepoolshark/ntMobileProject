let VerifyCodeForRegisterGuideAction=require("../actions/VerifyCodeForRegisterGuideAction.js");
let VerifyCodeForRegisterGuideStore=require("../stores/VerifyCodeForRegisterGuideStore.js");

import React from "react";
import classNames from 'classnames';

import Container from "../UIComponents/Container";
import Button from "../UIComponents/Button";
import Field from "../UIComponents/Field";
import List from "../UIComponents/List";
import Icon from "../UIComponents/Icon";
import Group from "../UIComponents/Group";
import Message from "../UIComponents/Message";
import MobileVerificationCode from "../UIComponents/MobileVerificationCode";
import NavBar from "../UIComponents/NavBar";



//找回密码页面
let VerifyCodeForRegisterGuide=React.createClass({
    getInitialState(){
        return {
            data:VerifyCodeForRegisterGuideStore.getAll()
        }
    },
    _formatPhoneNo(phoneNo){
        return phoneNo.slice(0,3) + "****" + phoneNo.slice(7);
    },
    _handleVerifyCodeChange(){
        let verifyCode=this.refs.verificationCode.getValue();
        VerifyCodeForRegisterGuideAction.changeVerifyCode(verifyCode);
    },
    _submitRegisterForm(){
        VerifyCodeForRegisterGuideAction.submitRegisterForm();
    },
    _handleNavClick(){
        this.context.router.push({
            pathname:"registerGuide"
        });
    },
    render (){

        let {
            loginName,
            verifyCode
            }=this.state.data;

        let leftNav= {
            component:"a",
            icon: 'left-nav',
            title: '返回'
        };

        return (
            <Container  {...this.props} scrollable={false}>
                <NavBar
                    title="手机验证码"
                    leftNav={[leftNav]}
                    amStyle="primary"
                    onAction={this._handleNavClick}
                />
                <div style={{marginTop:"10px",fontSize:"14px",textAlign:"center",color:"#666"}}>手机验证码正在发送到您的手机</div>
                <div style={{margin:"10px 0",fontSize:"20px",textAlign:"center"}}>{this._formatPhoneNo(loginName)}</div>
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
                                label="手机验证码"
                                placeholder="请输入验证码"
                                ref="verificationCode"
                                inputAfter={
                                     !!loginName ?
                                    <MobileVerificationCode phoneNo={loginName} autoSend={true}  type="1"/> :
                                    null
                                    }
                                onChange={this._handleVerifyCodeChange}
                                value={verifyCode}
                            />
                        </List.Item>
                    </List>
                </Group>
                <div  style={{padding:"0 0.9375rem",marginTop:"2rem"}}>
                    <Button amStyle="primary" block radius onClick={this._submitRegisterForm}>完成验证</Button>
                </div>
            </Container>
        )
    },
    componentDidMount(){
        let query=this.props.location.query;
        VerifyCodeForRegisterGuideAction.getDataFromLocation(query);

        VerifyCodeForRegisterGuideStore.bind("change",function(){
            this.setState({
                data:VerifyCodeForRegisterGuideStore.getAll()
            })
        }.bind(this));

        VerifyCodeForRegisterGuideStore.bind("registerSuccess",function(){
            this.context.router.push({
                pathname:"registerSuccessHint"
            });
        }.bind(this));

        VerifyCodeForRegisterGuideStore.bind("registerFailed",function(msg){
            Message.broadcast(msg);
        }.bind(this));

    },
    componentWillUnmount(){
       VerifyCodeForRegisterGuideStore.clearAll();
    }
});

VerifyCodeForRegisterGuide.contextTypes = {
    router:React.PropTypes.object.isRequired
};

module.exports=VerifyCodeForRegisterGuide;
require("../../scss/page/Default.scss");
var DefaultAction=require("../actions/DefaultAction.js");
var DefaultStore=require("../stores/DefaultStore.js");


import React from "react";
import classNames from "classnames";
import {
    Link
} from 'react-router';


//ui component
import Container from "../UIComponents/Container";
import Button from "../UIComponents/Button";
import Field from "../UIComponents/Field";
import List from "../UIComponents/List";
import Icon from "../UIComponents/Icon";
import Modal from "../UIComponents/modal/Modal";
import Group from "../UIComponents/Group";
import Message from "../UIComponents/Message";

//utilities
import cookie from "../lib/cookie";
import getParamObjFromUrl from "../lib/getParamObjFromUrl";
import RegisterServiceAgreement from "./ServiceAgreement_register";

 //登录组件
 let LoginView=React.createClass({
     getInitialState(){
         return {
             showPassword:false,
             showPasswordFieldToggleEye:true
         }
     },
     _handleLogin(){
         DefaultAction.login();
     },
     _toggleOpenEye(){
         this.setState({
             showPassword:!this.state.showPassword
         })
     },
     _handleAccountChange(){
         let phoneNo=parseInt(this.refs.account.getValue());//过滤非法字符
         phoneNo=isNaN(phoneNo) ? "" : phoneNo ;
         DefaultAction.changeLoginAccount(phoneNo);
     },
     _handlePasswordChange(){
         let password=this.refs.password.getValue();
         DefaultAction.changePassword(password);
     },
     _resetToEmpty(){
        this.refs.account.getFieldDOMNode().focus();
        DefaultAction.resetToEmpty();
     },
     render(){
         let {
             loginPhoneNo,
             loginPassword,
             }=this.props;
         let imgIconClass=this.state.showPassword ? "eye-on" : "eye-off";
         let passwordInputType=this.state.showPassword ? "text" : "password";
         return (
             <div>
                 <List id="login-form">
                     <List.Item
                         media={<Icon name="phone" classPrefix="imgIcon" style={{marginTop:"-4px"}}/>}
                         nested="input"
                     >
                         <Field
                             id="loginPhoneNo"
                             type="text"
                             label={null}
                             placeholder="请输入您的手机号码 "
                             ref="account"
                             value={loginPhoneNo}
                             onChange={this._handleAccountChange}
                         />
                         <Icon
                            name="round-delete-btn"
                            classPrefix="imgIcon"
                            onClick={this._resetToEmpty}
                        />
                     </List.Item>
                     <List.Item
                         media={<Icon name="password" classPrefix="imgIcon" style={{marginTop:"-4px"}}/>}
                         nested="input"
                     >
                         <Field
                             id="loginPassword"
                             type={passwordInputType}
                             label={null}
                             placeholder="请输入您的登录密码"
                             value={loginPassword}
                             ref="password"
                             onChange={this._handlePasswordChange}
                         />
                         {
                            this.state.showPasswordFieldToggleEye ?
                            <Icon
                                name={imgIconClass}
                                classPrefix="imgIcon"
                                onClick={this._toggleOpenEye}
                            /> :
                            null
                         }

                     </List.Item>
                 </List>
                 <div className="btn-wrapper" >
                     <Button amStyle="primary" block radius={true} onClick={this._handleLogin}>登 录</Button>
                 </div>
             </div>
         )
     },
     componentDidMount(){
     }
});

//注册组件
let RegisterView=React.createClass({
    _showPopupWindow(){
        this.refs.modal.open();
    },
    _handleClose(){
        this.refs.modal.close();
    },
    _handleToggleCheck(){
        DefaultAction.toggleAgreement();
    },
    _handleRegisterAccountChange(){
        let phoneNo=parseInt(this.refs.registerAccount.getValue());//过滤非法字符
        phoneNo=isNaN(phoneNo) ? "" : phoneNo ;
        DefaultAction.changeRegisterAccount(phoneNo);
    },
    _getVerificationCode(){
        DefaultAction.getVerificationCode();
    },
    render(){
        let {
            registerPhoneNo,
            isAgreement
            }=this.props;

        return (
            <div>
                <List id="register-form">
                    <List.Item
                        media={<Icon name="phone" classPrefix="imgIcon" style={{marginTop:"-4px"}}/>}
                        nested="input"
                    >
                        <Field
                            type="text"
                            label={null}
                            placeholder="请输入您的手机号码"
                            ref="registerAccount"
                            value={registerPhoneNo}
                            onChange={this._handleRegisterAccountChange}
                        />
                    </List.Item>
                </List>
                <div className="agreement-bar">
                    <Icon 
                        name={ isAgreement ? "agreement-checkbox-check" : "agreement-checkbox-uncheck" } 
                        classPrefix="imgIcon" 
                        onClick={this._handleToggleCheck}
                    />
                    同意
                    <a href="javascript:void(0);" onClick={this._showPopupWindow}>《注册服务协议》</a>
                </div>
                <div className="btn-wrapper" >
                    <Button amStyle="primary" block radius={true} onClick={this._getVerificationCode}>获取验证码</Button>
                </div>
                <Modal
                    title="注册服务协议"
                    ref="modal"
                    isOpen={false}
                    role="popup"
                    onDismiss={this._handleClose}
                >
                    <RegisterServiceAgreement />
                </Modal>
            </div>
        )
    }
});


//默认页面(包含登录和注册):Default component
 let Default=React.createClass({
    getInitialState(){
        let initViewName=this.props.location.query.view;
        return {
            data:DefaultStore.getAll(),
            isLoginView:initViewName && initViewName === "register" ? false : true
        }
    },
    _toggleView(){
        this.setState({
            isLoginView:!this.state.isLoginView
        })
    } ,
    _handleLoginSuccess(){
        let beforeComponent=this.props.location.query.beforeComponent || getParamObjFromUrl().beforeComponent;
        if(beforeComponent && beforeComponent !== "/"){
            //使用replace方法将浏览历史堆栈的当前路由替换为下一个路由
            //从而解决了一个需要登录的页面回跳后，点击'返回按钮'所出现的回跳死循环的现象(使用push就会出现这个问题)
            this.context.router.replace({
                pathname:beforeComponent
            })
        }else {
            this.context.router.push({
                pathname:"/home"
            });
        }
    },
    render (){
        let isLoginView=this.state.isLoginView;

        let defaultFooterClasses=classNames({
            "default-footer":true,
            "justify-content-center":!isLoginView,
            "justify-content-between":isLoginView
        });

        return (
                <Container className="default-container" {...this.props}>
                    <div className="text-center ntLogo-wrapper"></div>
                    {
                        isLoginView ?
                        <LoginView handleLogin={this._handleLogin} {...this.state.data} /> :
                        <RegisterView history={this.props.history} {...this.state.data} />
                    }
                    <div className={defaultFooterClasses}>
                        {
                            isLoginView?
                            <a href="javascript:void(0)" onClick={this._toggleView}>快速注册</a> :
                            null
                        }
                        { 
                             isLoginView ?
                             <Link to="getBackPassword" className="fr">忘记密码？</Link> :
                             null
                        }
                        {
                             !isLoginView ?
                             <span>已有账号？<a href="javascript:void(0)" onClick={this._toggleView}>立即登录</a></span>:
                             null   
                        } 
                    </div>
                </Container>
        )
    },
    componentDidMount(){
        let inviteCode=this.props.location.query.inviteCode
                       || getParamObjFromUrl().inviteCode
                       || sessionStorage.getItem("ntInviteCode");

        DefaultStore.bind("change",function(){
            this.setState({
                data:DefaultStore.getAll()
            })
        }.bind(this));

        DefaultStore.bind("loginFailed",function(msg){
            Message.broadcast(msg,{backgroundColor:"#fff",color:"#000"});
        }.bind(this));


        DefaultStore.bind("loginSuccess",this._handleLoginSuccess);

        DefaultStore.bind("getVerificationCodeCheckSuccess",function(phoneNo){
            let queryObj={
                phoneNo:phoneNo
            };

            if(!!inviteCode){
                queryObj.inviteCode=inviteCode;
            }
            this.context.router.push({
                pathname:"/register",
                query:queryObj
            });
        }.bind(this));

        DefaultStore.bind("getVerificationCodeCheckFailed",function(msg){
            Message.broadcast(msg,{backgroundColor:"#fff",color:"#000"});
        }.bind(this));

    },
    componentWillUnmount(){
        DefaultStore.unbind("loginSuccess",this._handleLoginSuccess);
        DefaultStore.clearAll();
    }
});

Default.contextTypes = {
    router:React.PropTypes.object.isRequired
};

module.exports=Default;
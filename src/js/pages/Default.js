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
import RegisterServiceAgreement from "./ServiceAgreement_register";

 //登录组件
 let LoginView=React.createClass({
     getInitialState(){
         return {
             showPassword:false
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
                             type="text"
                             label={null}
                             placeholder="请输入您的手机号码"
                             ref="account"
                             value={loginPhoneNo}
                             onChange={this._handleAccountChange}
                         />
                     </List.Item>
                     <List.Item
                         media={<Icon name="password" classPrefix="imgIcon" style={{marginTop:"-4px"}}/>}
                         nested="input"
                     >
                         <Field
                             type={passwordInputType}
                             label={null}
                             placeholder="请输入您的登录密码"
                             value={loginPassword}
                             ref="password"
                             onChange={this._handlePasswordChange}
                         />
                         <Icon
                             name={imgIconClass}
                             classPrefix="imgIcon"
                             style={{marginTop:"px"}}
                             onClick={this._toggleOpenEye}
                         />
                     </List.Item>
                 </List>
                 <div className="cf">
                     <Link to="getBackPassword" className="fr">忘记密码？</Link>
                 </div>
                 <div className="btn-wrapper" >
                     <Button amStyle="primary" block radius={true} onClick={this._handleLogin}>登录</Button>
                 </div>
             </div>
         )
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
    _handleToggleCheck(event){
        DefaultAction.toggleAgreement(event.target.checked);
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
            registerPhoneNo
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
                <div>
                    <input type="checkbox" defaultChecked onChange={this._handleToggleCheck} />
                    同意
                    <a href="javascript:void(0);" onClick={this._showPopupWindow}>《农泰金融注册服务协议》</a>
                </div>
                <div className="btn-wrapper" >
                    <Button amStyle="primary" block radius={true} onClick={this._getVerificationCode}>获取验证码</Button>
                </div>
                <Modal
                    title="农泰金融注册服务协议"
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
        return {
            data:DefaultStore.getAll(),
            isLoginView:true
        }
    },
    _toggleView(){
        this.setState({
            isLoginView:!this.state.isLoginView
        })
    } ,
    render (){
        let sloganClasses=classNames({
            fade:this.state.isLoginView,
            "text-center":true,
            "slogan-text":true
        });
        return (
                <Container className="default-container" {...this.props}>
                    <div className="text-center ntLogo-wrapper"></div>
                    <div className={sloganClasses}>上市公司战略投资理财平台，注册即送180红包</div>
                    {
                        this.state.isLoginView ?
                        <LoginView handleLogin={this._handleLogin} {...this.state.data} /> :
                        <RegisterView history={this.props.history} {...this.state.data} />
                    }
                    <div className="default-footer">
                        {
                            this.state.isLoginView?
                            "没有账号？" :
                            "已有账号？"
                        }
                        <a href="javascript:void(0)" onClick={this._toggleView}>{this.state.isLoginView  ? "注册领红包" : "立即登录"}</a>
                    </div>
                </Container>
        )
    },
    componentDidMount(){

        DefaultStore.bind("change",function(){
            this.setState({
                data:DefaultStore.getAll()
            })
        }.bind(this));

        DefaultStore.bind("loginFailed",function(msg){
            Message.broadcast(msg);
        }.bind(this));

        DefaultStore.bind("loginSuccess",function(){
            this.context.router.push({
               pathname:"/home"
            });
        }.bind(this));

        DefaultStore.bind("getVerificationCodeCheckSuccess",function(phoneNo){
            console.log("into getVerificationCodeCheckSuccess");
            this.context.router.push({
                pathname:"/register",
                query:{
                    phoneNo:phoneNo
                }
            });
        }.bind(this));

        DefaultStore.bind("getVerificationCodeCheckFailed",function(msg){
            Message.broadcast(msg);
        }.bind(this));

        this.setState({
            data:{
                loginPhoneNo:"",
                loginPassword:""
            }
        })

    }
});

Default.contextTypes = {
    router:React.PropTypes.object.isRequired
};

module.exports=Default;
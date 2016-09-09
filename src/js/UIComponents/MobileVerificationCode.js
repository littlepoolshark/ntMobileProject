let ajax=require("../lib/ajax");
let cookie=require("../lib/cookie");
import React from "react";
import classNames from 'classnames';


import Message from "../UIComponents/Message";
const COUNT_DOWN__DURATION=60;//倒数多少秒

let MobileVerificationCode=React.createClass({
    getDefaultProps(){
        return {
            autoSend:false,//是否自动发送获取验证码请求，进入倒计时
            countDownOnly:false//是否只进入倒计时状态，而不发送获取验证码请求
        }
    },
    getInitialState(){
        return {
            active:true,//active为true则表示可以请求获取验证码
            remainSeconds:COUNT_DOWN__DURATION
        }
    },
    _handleClick(){
        let {
            phoneNo,
            type
            }=this.props;
        let _self=this;
        phoneNo=typeof phoneNo === "function" ? phoneNo() : phoneNo ;
        if(phoneNo === ""){
            Message.broadcast("手机号码不能为空，请填写！");
        }else if(!(/1\d{10}$/i).test(phoneNo)){
            Message.broadcast("手机号码格式不对，请检查！");
        } else if(this.state.active){
            ajax({
                ciUrl:"/platinfo/v2/getVerifyCode",
                 data:{
                     phone:phoneNo,
                     type:type//验证码类型：1: 注册，2：找回登录密码 3:找回交易密码 4:绑定银行卡 5：删除银行卡
                 },
                 success:function(rs){
                     if(rs.code === 0){//发送验证码成功
                         _self._countDown();
                         Message.broadcast("验证码发送成功！");
                         cookie.setCookie("tempUserId",rs.data.userId,59);//将临时userid设置到cookie中，供需要该字段的接口使用
                     }else {//发送验证码失败
                         Message.broadcast("验证码发送失败！"+rs.description);
                     }
                 }
             })
        }else {
            return false;
        }
    },
    _countDown(){
        this.timer=setInterval(function(){
            if(this.state.remainSeconds > 1){
                this.setState({
                    active:false,
                    remainSeconds:this.state.remainSeconds - 1
                })
            }else {
                clearInterval(this.timer);
                this.setState({
                    active:true,
                    remainSeconds:COUNT_DOWN__DURATION
                })

            }

        }.bind(this),1000);
    },
    render(){
        let classes=classNames({
            "disabled":!this.state.active,
            "getVerificationcode-btn":true
        });
        let btnText=this.state.active ? "发送验证码" : (<span>{this.state.remainSeconds}秒后重发</span>)  ;
        return (
            <a href="javascript:void(0)" className={classes} onClick={this._handleClick}>{btnText}</a>
        )
    },
    componentDidMount(){
        this.props.autoSend && this._handleClick();
        this.props.countDownOnly && this._countDown();
    }
});

export default MobileVerificationCode;
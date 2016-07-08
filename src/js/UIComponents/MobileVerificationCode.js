let ajax=require("../lib/ajax");
import React from "react";
import classNames from 'classnames';

import Message from "../UIComponents/Message";
const COUNT_DOWN__DURATION=60;//倒数多少秒

let MobileVerificationCode=React.createClass({
    getDefaultProps(){
        return {
            autoSend:false//是否自动发送验证码，进入倒计时
        }
    },
    getInitialState(){
        return {
            active:true,
            remainSeconds:COUNT_DOWN__DURATION
        }
    },
    _handleClick(){
        let {
            phoneNo,
            type
            }=this.props;
        if(phoneNo === ""){
            Message.broadcast("手机号码不能为空，请填写！");
        }else if(!/^(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$/i.test(phoneNo)){
            Message.broadcast("手机号码格式不对，请检查！");
        } else if(this.state.active){
            this._countDown();
            ajax({
                ciUrl:"/platinfo/v2/getVerifyCode",
                 data:{
                     phone:phoneNo,
                     type:type
                 },
                 success:function(rs){
                     if(rs.code === 0){//发送验证码成功
                         Message.broadcast("验证码发送成功！");
                     }else {//发送验证码失败
                         Message.broadcast("验证码发送失败！");
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
    }
});

export default MobileVerificationCode;
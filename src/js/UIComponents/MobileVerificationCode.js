let ajax=require("../lib/ajax");
import React from "react";
import classNames from 'classnames';

import Message from "../UIComponents/Message";
const COUNT_DOWN__DURATION=60;//倒数多少秒

let MobileVerificationCode=React.createClass({
    getInitialState(){
        return {
            active:true,
            remainSeconds:COUNT_DOWN__DURATION
        }
    },
    _handleClick(){
        let phoneNo=this.props.phoneNo();
        if(phoneNo === ""){
            Message.broadcast("手机号码不能为空，请填写！");
        }else if(!/^(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$/i.test(phoneNo)){
            Message.broadcast("手机号码格式不对，请检查！");
        } else if(this.state.active){
            this._countDown();
            ajax({
                url:"/mock/getVerificationCode.json",
                method:"GET",
                sync:false,
                success:function(rs){
                    if(rs.code === "0001"){
                        Message.broadcast("手机验证码发送成功！");
                    }else {
                        Message.broadcast("手机验证码发送失败！");
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
    }
});

export default MobileVerificationCode;
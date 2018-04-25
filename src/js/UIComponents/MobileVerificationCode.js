let ajax = require("../lib/ajax");
let cookie = require("../lib/cookie");
import React from "react";
import classNames from 'classnames';


import Message from "../UIComponents/Message";
const COUNT_DOWN__DURATION = 60;//倒数多少秒

let MobileVerificationCode = React.createClass({
    getDefaultProps() {
        return {
            autoSend: false,//是否自动发送获取验证码请求，进入倒计时
            countDownOnly: false//是否只进入倒计时状态，而不发送获取验证码请求
        }
    },
    getInitialState() {
        return {
            active: true,//active为true则表示可以请求获取验证码
            remainSeconds: this.props.countDownDuration || COUNT_DOWN__DURATION
        }
    },
    /**
     * @note:为了能快速地达到禁止点击，必须用简单而快速的命令式编程方式
     */
    _disabledBtnImmediately(){
        let btn=this.refs.getVerificationcodeBtn;
        btn.style.pointerEvents="none";
    },
    _enableBtnImeediately(){
        let btn=this.refs.getVerificationcodeBtn;
        btn.style.pointerEvents="auto";
    },
    _handleClick() {
        let {
            phoneNo,
            type,
            rechargeAmount,
            bankCardId,
            withdrawAmount,
            _handlerOfRegisterToPABankSuccessAlready
        } = this.props;
    
        
        let _self = this;
        phoneNo = typeof phoneNo === "function" ? phoneNo() : phoneNo;
        if (phoneNo === "") {
            Message.broadcast("手机号码不能为空，请填写！");
        } else if (!(/1\d{10}$/i).test(phoneNo)) {
            Message.broadcast("手机号码格式不对，请检查！");
        } else if (this.state.active) {
            this._countDown();//用户点击“发送验证码”按钮后立即进入倒计时状态，而不是等请求得到响应到才开始倒计时            
                        
            //当type=“7”时，意味着当前请求的是中信充值验证码
            if (type === "7") {
                if (rechargeAmount !== "") {
                    ajax({
                        ciUrl: "/platinfo/v2/zxChargeMsg",
                        data: {
                            chargeAmount: rechargeAmount
                        },
                        success: function (rs) {
                            if (rs.code === 0) {
                                Message.broadcast("验证码发送成功！");
                                //中信充值时，发送验证码成功后，后台会返回短信流水号码“merBillNo”，
                                //我们需要设置到cookie中，以供 "ZhongjinShortcutPay" 组件使用
                                rs.data.merBillNo && cookie.setCookie("merBillNo_ZhongJinShortcutPay", rs.data.merBillNo, 59);
                            } else {
                                Message.broadcast(rs.description);
                            }
                        }
                    });
                }

            } else if (type === "BAOFU") {//当type=“8”时，意味着当前请求的是宝付支付的验证码
                ajax({
                    ciUrl: "/user/v2/bfQuickPreRecharge",
                    data: {
                        bankCardId,
                        amount: rechargeAmount,
                        paymentName: "BAOFUQUICK"
                    },
                    success(rs) {
                        if (rs.code === 0) {
                            Message.broadcast("验证码发送成功！");
                        } else {
                            Message.broadcast(rs.description);
                        }
                    }
                });
            }else if (type === "PACG") {//发送开通平安存管所需要的短信验证码
                ajax({
                    ciUrl: "/user/v2/manager",
                    data: {
                        functionID:"register.per.applySms",
                        MobilePhone: phoneNo
                    },
                    success(rs) {
                        if (rs.code === 0) {
                            Message.broadcast("验证码发送成功！");
                            rs.data.SerialNo && cookie.setCookie("SerialNo_registerToPABank", rs.data.SerialNo, 59);
                        } else if(rs.code === 10010){
                            _handlerOfRegisterToPABankSuccessAlready && _handlerOfRegisterToPABankSuccessAlready();
                        } else {
                            Message.broadcast(rs.description);
                        }
                    }
                });
            }else if (type === "withdraw") {//发送提现所需要的短信验证码
                ajax({
                    ciUrl: "/withdraws/v2/sendSMS.do",
                    data: {
                        amount:withdrawAmount
                    },
                    success(rs) {
                        if (rs.code === 0) {
                            Message.broadcast("验证码发送成功！");
                            cookie.setCookie("SerialNo_withdraw", rs.data.items.SerialNo, 59);
                        } else {
                            Message.broadcast(rs.description);
                        }
                    }
                });
            } else {//其余的情况统一请求这个接口
                ajax({
                    ciUrl: "/platinfo/v2/getVerifyCode",
                    data: {
                        phone: phoneNo,
                        type: type//验证码类型："1": 注册，"2"：找回登录密码 "3":找回交易密码 "4":绑定银行卡 "5"：删除银行卡 "6":开通中信快捷支付,"8":更改手机号码
                    },
                    success: function (rs) {
                        if (rs.code === 0) {//发送验证码成功
                            Message.broadcast("验证码发送成功！");
                            cookie.setCookie("tempUserId", rs.data.userId, 59);//将临时userid设置到cookie中，供需要该字段的接口使用

                            //开通中金的快捷支付时，发送验证码成功后，后台会返回“bindNo”和“token”字段，
                            //我们需要设置到cookie中，以供 "OpenZhongjinShortcut" 组件使用
                            if (type === "6") {
                                rs.data.bindNo && cookie.setCookie("bindNo_zhongjinShortcut", rs.data.bindNo, 59);
                                rs.data.token && cookie.setCookie("token_zhongjinShortcut", rs.data.token, 59);
                            }
                        } else {//发送验证码失败
                            Message.broadcast("验证码发送失败！" + rs.description);
                        }
                    }
                })
            }

        } else {
            return false;
        }
    },
    _countDown() {
        this._disabledBtnImmediately();
        if(this.timer){
            clearInterval(this.timer);     
        }
        this.timer = setInterval(function () {
            if (this.state.remainSeconds > 1) {
                this.setState({
                    active: false,
                    remainSeconds: this.state.remainSeconds - 1
                })
            } else {
                clearInterval(this.timer);
                this.setState({
                    active: true,
                    remainSeconds: this.props.countDownDuration || COUNT_DOWN__DURATION
                },() => {
                    this._enableBtnImeediately();
                })

            }

        }.bind(this), 1000);
    },
    render() {
        let classes = classNames({
            "disabled": !this.state.active,
            "getVerificationcode-btn": true
        });
        let btnText = this.state.active ? (this.timer !== undefined ? "重新获取" : "发送验证码") : (<span>{this.state.remainSeconds}秒后重发</span>);
        return (
            <a href="javascript:void(0)" className={classes} onClick={this._handleClick} ref="getVerificationcodeBtn">{btnText}</a>
        )
    },
    componentDidMount() {
        this.props.autoSend && this._handleClick();
        !!this.props.countDownOnly && this._countDown();
    },
    componentWillUnmount() {
        clearInterval(this.timer);
    }
});

export default MobileVerificationCode;
//@flow
require("../../scss/page/RegisterSuccessHint.scss");
import React, { Component } from 'react';

import View from '../UIComponents/View';
import Container from "../UIComponents/Container";
import NavBar from "../UIComponents/NavBar";
import Group from "../UIComponents/Group";
import Button from "../UIComponents/Button";
import Modal from "../UIComponents/modal/Modal";


class RegisterSuccessHint extends Component {
    state: {
        isModalOpen: boolean
    }

    constructor(props: Object) {
        super(props);
        this.state={
            isModalOpen:false
        }
    }

    _jumpToHome() {
        this.context.router.push({
            pathname: "home",
            query: {
                beforeComponent: "registerSuccessHint"
            }
        });
    }

    _jumpToCouponList() {
        this.context.router.push({
            pathname:"couponList",
            query:{
                productType:"all",
                beforeComponent:"userHome"
            }
        });
    }

    _handleDownloanBtnClick() {
        // let ua: string = navigator.userAgent;
        // let isAndroid: boolean = /android/i.test(ua) || ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1;
        // let isIOS: boolean = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        let nextLocation: string ="https://www.ntjrchina.com/mobile/app_download.jsp";

        window.location.href = nextLocation;

    }

    _handleNavClick(isHasBeforeComponent:boolean,userType:string){
        if(isHasBeforeComponent){
            if(userType === "isANewbie"){
                this.setState({
                    isModalOpen:true
                })
            }else {
                this._jumpToCouponList();
            }
        }
    }

    _jumpToLogin() {
        this.context.router.push({
            pathname:"/"
        });
    }

    render() {
        let {
            beforeComponent,
            userType,
            couponType,
            couponAmount
        }=this.props.location.query;

        let hintText:string="";
        if(!!beforeComponent){
            hintText=`恭喜您成功领取${couponAmount}${couponType === "redPackage" ? "元投资红包" : "%加息券"}！`;
        }else {
            hintText="恭喜您已经成功注册！";
        }

        let rightNav = {
            component: "a",
            title: !!beforeComponent ? "前往查看" : ""
        };

        let ua: string = navigator.userAgent;
        let isInWeChatBrowser: boolean = ua.indexOf("MicroMessenger") > -1;


        return (
            <View>
                <NavBar
                    title={ !!beforeComponent ? "领取成功" : "注册成功" }
                    rightNav={[rightNav]}
                    amStyle="primary"
                    onAction={() => { this._handleNavClick(!!beforeComponent,userType) }}

                />
                <Container id="registerSuccessHint" scrollable={true}>
                    <div className="title text-center">{hintText}</div>
                    {
                        isInWeChatBrowser ?
                            <Group>
                                <div className="subtitle text-center">关注公众号，随时随地获取投资信息</div>
                                <div className="qrCode-wrapper text-center">
                                    <img src={require("../../img/registerSuccessHint-qrCode.png")} alt="" />
                                    <div className="content text-center">长按二维码识别</div>
                                </div>
                            </Group> :
                            <div className="downloan-APP-guide">
                                <img src={require("../../img/registerSuccessHint-bg2.jpg")} alt="" className="responsive-img" />
                                <div className="title text-center">下载手机APP投标快人一步</div>
                                <div className="btn-wrapper">
                                    <Button amStyle="primary" block radius onClick={() => { this._handleDownloanBtnClick() }}>立即下载</Button>
                                </div>
                            </div>
                    }
                    {
                        isInWeChatBrowser ?
                            <img src={require("../../img/registerSuccessHint-bg.jpg")} alt="" className="bottom-bg" /> :
                            null
                    }
                    <Modal
                        isOpen={this.state.isModalOpen}
                        role="alert"
                        onDismiss={() => { this._jumpToLogin() }}
                    >
                        登录用户名和密码已发送到您的手机请注意查收
                    </Modal>
                </Container>
            </View>
        );
    }
}


RegisterSuccessHint.contextTypes = {
    router: React.PropTypes.object.isRequired
};


module.exports = RegisterSuccessHint;



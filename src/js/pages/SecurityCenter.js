require("../../scss/page/SecurityCenter.scss");
let SecurityCenterAction=require("../actions/SecurityCenterAction");
let SecurityCenterStore=require("../stores/SecurityCenterStore");
import React from "react";
import {
    Link
} from 'react-router';

import Container from "../UIComponents/Container";
import Group from "../UIComponents/Group";
import Icon from "../UIComponents/Icon";
import List from "../UIComponents/List";


//设置中心页面：SecurityCenter component
let SecurityCenter=React.createClass({
    getInitialState(){
        return SecurityCenterStore.getAll();
    },
    renderMedia(option){
        return  option === "yes" ?
                <Icon classPrefix="imgIcon" name="right-check"/> :
                <Icon classPrefix="imgIcon" name="attention"/>
    },
    _jumpToRealNameAuthentication(){
        let {
            idCardVerified,
            idcard,
            realName
            }=this.state;
        if(idCardVerified === "yes"){
            this.context.router.push({
                pathname:"realNameAuthentication",
                query:{
                    idcard:idcard,
                    realName:realName
                }
            });
        }else {
            this.context.router.push({
                pathname:"realNameAuthentication"
            });
        }
    },
    render(){
        let {
            mobileVerified,
            ispasswordSet,
            isDealPwdSet,
            idCardVerified,
            mobile
            }=this.state;
        return (
            <Container scrollable={false} id="securityCenter">
                <List>
                    <List.Item
                        href="javascript:void(0)"
                        title="实名认证"
                        media={this.renderMedia(idCardVerified)}
                        after={idCardVerified === "yes" ?  "查看" : "设置"}
                        onClick={this._jumpToRealNameAuthentication}
                    />
                    <List.Item
                        href={"#/setDealPassword/?actionType=" + (isDealPwdSet === "yes" ? "modify" : "setting")}
                        title="交易密码"
                        media={this.renderMedia(isDealPwdSet)}
                        after={isDealPwdSet === "yes" ?  "修改" : "设置"}
                    />
                    <List.Item
                        href="##"
                        title="登录密码"
                        media={this.renderMedia(ispasswordSet)}
                        after="修改"
                    />
                    <List.Item
                        title="手机认证"
                        media={this.renderMedia(mobileVerified)}
                        after={mobile}
                    />
                </List>
            </Container>
        )
    },
    componentDidMount(){
        SecurityCenterAction.getSecurityInfoFromServer();

        SecurityCenterStore.bind("change",function(){
            this.setState(SecurityCenterStore.getAll());
        }.bind(this));
    }
});

SecurityCenter.contextTypes = {
    router:React.PropTypes.object.isRequired
};

module.exports=SecurityCenter;
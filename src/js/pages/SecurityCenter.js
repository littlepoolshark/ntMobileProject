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

//安全分数变换动画
let ScoreAnimation=React.createClass({
    getInitialState(){
        return {
            score:this.props.score
        }
    },
    _scoreCount(score){
        let intervalTime=3000 / score;
        this.timer=setInterval(function(){
            if(this.state.score < score){
                this.setState({
                    score:this.state.score + 1
                })
            }else {
                clearInterval(this.timer)
            }
        }.bind(this),intervalTime);
    },
    render(){
        return (
            <span className="title">{this.state.score}</span>
        )
    },
    componentWillReceiveProps(nextProps){
        if(nextProps.score !== 0){
            this._scoreCount(nextProps.score)
        }
    }
});

//设置中心页面：SecurityCenter component
let SecurityCenter=React.createClass({
    getInitialState(){
        return {
            securityInfo:SecurityCenterStore.getAll(),
            score:SecurityCenterStore.calculateSecurityScore()
        }

    },
    renderMedia(option){
        return  option === "yes" ?
            <Icon classPrefix="imgIcon" name="right-check"/> :
            <Icon classPrefix="imgIcon" name="attention"/>
    },
    _jumpBack(){
        this.context.router.push({
            pathname:"userHome"
        });
    },
    _renderSecurityText(score){
        let securityText="";
        if(score <= 50){
            securityText="危险";
        }else if(score <=75){
            securityText="良好";
        }else {
            securityText="安全";
        }
        return securityText;
    },
    _renderWarmHintText(score){
        let warmHintText="";
        if(score <= 50){
            warmHintText="您的账户信息不完整，仍有安全风险，请立即完善！";
        }else if(score <=75){
            warmHintText="还剩一步，即可拥有完整的安全保障体系！";
        }else {
            warmHintText="您的账户已经被完美保障，请继续保持！";
        }
        return warmHintText;
    },
    _jumpToRealNameAuthentication(){
        let {
            idCardVerified,
            idcard,
            realName
            }=this.state.securityInfo;
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
    _jumpToRegisterToZXBank(){
        this.context.router.push({
            pathname:"registerToZXBank",
            query:{
                beforeComponent:"securityCenter"
            }
        });
    },
    _jumpToRegisterToZXFailedHint(){
        this.context.router.push({
            pathname:"registerToZXFailedHint",
            query:{
                beforeComponent:"securityCenter"
            }
        });
    },
    _handleZxRegisterBarClick(leftQureyTime,zxcgOpen,istempuser){
        if(zxcgOpen === "yes"){
            if(istempuser === "yes"){
                this._jumpToRegisterToZXFailedHint();
            }else {
                return null;
            }
        }else {
            if(leftQureyTime > 0){
                this._jumpToRegisterToZXBank();
            }else {
                this._jumpToRegisterToZXFailedHint();
            }
        }
    },
    render(){
        let {
            mobileVerified,
            ispasswordSet,
            isDealPwdSet,
            idCardVerified,
            zxcgOpen,//是否已开通中信存管
            mobile,
            istempuser,//是否是手动干预让它成为已经开通中信存管的
            leftQureyTime
            }=this.state.securityInfo;
        let score=this.state.score;
        let dashboardWrapperClasses=score ? "dashboard-wrapper " + "score" + score : "dashboard-wrapper";
        return (
            <Container scrollable={false} id="securityCenter">
                <div className={dashboardWrapperClasses}>
                    <div className="nav-bar">
                        <div className="nav-bar-left" onClick={this._jumpBack}>
                            <Icon name="left-nav"/>
                            <span>返回</span>
                        </div>
                        安全中心
                    </div>
                    <div className="dashboard">
                        <ScoreAnimation score={score}/>
                        <span className="subtitle">{this._renderSecurityText(score)}</span>
                        <div className="rotate-needle" id="rotateNeedle"><span className="needle-header"></span></div>
                    </div>

                    <div className="warm-hint text-center">{this._renderWarmHintText(score)}</div>
                </div>

                <List >
                    {/*<List.Item
                     href="javascript:void(0)"
                     title="实名认证"
                     media={this.renderMedia(idCardVerified)}
                     after={idCardVerified === "yes" ?  "查看" : "设置"}
                     onClick={this._jumpToRealNameAuthentication}
                     />*/}
                    <List.Item
                        href="javascript:void(0)"
                        title="银行存管账户"
                        media={this.renderMedia(zxcgOpen === "no" ? "no" : (istempuser === "yes" ? "no" : "yes"))}
                        after={zxcgOpen === "yes" && istempuser === "no" ?  "已成功开通" : (zxcgOpen  === "no" && istempuser === "no" ? "立即开通" : "未开通")}
                        onClick={this._handleZxRegisterBarClick.bind(null,leftQureyTime,zxcgOpen,istempuser)}
                    />
                    <List.Item
                        href={"#/setDealPassword/?actionType=" + (isDealPwdSet === "yes" ? "modify" : "setting")}
                        title="交易密码"
                        media={this.renderMedia(isDealPwdSet)}
                        after={isDealPwdSet === "yes" ?  "修改" : "设置"}
                    />
                    <List.Item
                        href={"#/setNewPassword/?actionType=modify"}
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
            this.setState({
                securityInfo:SecurityCenterStore.getAll(),
                score:SecurityCenterStore.calculateSecurityScore()
            });
        }.bind(this));
    },
    componentWillUnmount(){
        SecurityCenterStore.unbind("change");
        SecurityCenterStore.clearAll();
    }
});

SecurityCenter.contextTypes = {
    router:React.PropTypes.object.isRequired
};

module.exports=SecurityCenter;
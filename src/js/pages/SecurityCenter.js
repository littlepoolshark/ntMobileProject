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
        this.context.router.goBack();
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
    render(){
        let {
            mobileVerified,
            ispasswordSet,
            isDealPwdSet,
            idCardVerified,
            mobile
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
                </div>

                <List >
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
require("../../scss/page/InviteMyFriend.scss");
import React from "react";
import { hashHistory } from "react-router";
import classNames from "classnames";

//ui component
import Container from "../UIComponents/Container";
import Button from "../UIComponents/Button";
import NavBar from "../UIComponents/NavBar";

import cookie from "../lib/cookie";
import getParamObjFromUrl from "../lib/getParamObjFromUrl";

let paramObj=getParamObjFromUrl();
if(paramObj.flag === "inviter"){//如果邀请人是直接打开该页面的话，则跳转到登录页面
    hashHistory.push({
        pathname:"/",
        query:{
            view:"login",
            beforeComponent:"inviteMyFriend"
        }
    });
}else if(paramObj.flag === "beenInviter"){//如果被邀请人是直接打开该页面的话，则跳转到注册页面
    hashHistory.push({
        pathname:"/",
        query:{
            view:"register"
        }
    });
}

let InviteMyFriend=React.createClass({
    getInitialState(){
        return {
            isMaskShow:false
        }
    },
    _showShareTip(){
        this.setState({
            isMaskShow:true
        },function(){
            window.history.replaceState(null,"邀请好友","#/inviteMyFriend?flag=beenInviter");
        });
    },
    _closeShareTip(){
        this.setState({
            isMaskShow:false
        });
    },
    _handleNavClick(){
        this.context.router.push({
            pathname:"userHome"
        });
    },
    render(){
        let maskClasses=classNames({
            mask:true,
            active:this.state.isMaskShow
        });
        let leftNav= {
            component:"a",
            icon: 'left-nav',
            title: '返回'
        };
        return (
            <Container id="inviteMyFriend"  scrollable={true}>
                <NavBar
                    title="邀请好友"
                    leftNav={[leftNav]}
                    amStyle="primary"
                    onAction={this._handleNavClick}
                />
                <img src={require("../../img/invi_bg_pic.png")} alt="" style={{width:"100%",height:"auto"}}/>
                <Button className="inviteFriend-btn" block amStyle="primary" onClick={this._showShareTip}>立即邀请</Button>
                <div className={maskClasses} onClick={this._closeShareTip}>
                    <img src={require("../../img/share-guide.png")} alt="" className="share-guide-img"/>
                </div>
            </Container>
        )
    },
    componentDidMount(){
        let loginToken=cookie.getCookie("token");
        //如果用户是直接打开朋友直接分享的链接或者是没有登录token遗留在cookie中，则视为邀请注册的情况，界面跳转至注册组件
        if(!loginToken){
            this.context.router.push({
                pathname:"/",
                query:{
                    view:"register",
                    beforeComponent:"inviteMyFriend"
                }
            })
        }
    }
});

InviteMyFriend.contextTypes = {
    router:React.PropTypes.object.isRequired
};

module.exports=InviteMyFriend;
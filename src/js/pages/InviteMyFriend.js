require("../../scss/page/InviteMyFriend.scss");
import React from "react";
import classNames from "classnames";

//ui component
import Container from "../UIComponents/Container";
import Button from "../UIComponents/Button";
import NavBar from "../UIComponents/NavBar";

import cookie from "../lib/cookie";

let hasFlag=location.hash.indexOf("flag") > -1;
if(hasFlag){//如果用户是直接打开该页面的话，则跳转到登录注册页面
    window.location.href="/#/?view=register";
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
            window.history.replaceState(null,"邀请好友","#/inviteMyFriend?flag=visitedFromSinglePage");
        });
    },
    _closeShareTip(){
        this.setState({
            isMaskShow:false
        });
    },
    _handleNavClick(){
        let hasFlag=document.location.hash.indexOf("flag") > -1;
        let loginToken=cookie.getCookie("token");
        if(hasFlag && !loginToken){//如果用户是直接打开该页面的话，则跳转到登录注册页面
            this.context.router.push({
                pathname:"/"
            })
        }else {
            this.context.router.goBack();
        }
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

    }
});

InviteMyFriend.contextTypes = {
    router:React.PropTypes.object.isRequired
};

module.exports=InviteMyFriend;
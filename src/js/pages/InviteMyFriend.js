require("../../scss/page/InviteMyFriend.scss");
import React from "react";
import { hashHistory } from "react-router";
import classNames from "classnames";

//ui component
import View from "../UIComponents/View";
import Container from "../UIComponents/Container";
import Button from "../UIComponents/Button";
import NavBar from "../UIComponents/NavBar";

import cookie from "../lib/cookie";
import getParamObjFromUrl from "../lib/getParamObjFromUrl";


let InviteMyFriend=React.createClass({
    getInitialState(){
        this.inviteFlag=getParamObjFromUrl().flag;
        this.inviteCode=getParamObjFromUrl().inviteCode;
        return {
            isMaskShow:false
        }
    },
    _showShareTip(){
        let inviteCode=cookie.getCookie("phoneNo");//用户的手机号码即是邀请码
        this.setState({
            isMaskShow:true
        },function(){
            //window.history.replaceState(null,"邀请好友","#/inviteMyFriend?flag=beenInviter&inviteCode="+inviteCode);
        });
    },
    _jumpToMyInviteFriendDetail(){
        this.context.router.push({
            pathname:"myInviteFriendDetail"
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
            <View>
                <NavBar
                    title="邀请好友"
                    leftNav={[leftNav]}
                    amStyle="primary"
                    onAction={this._handleNavClick}
                />
                <Container id="inviteMyFriend"  scrollable={true}>
                    <img src={require("../../img/inviteFriend-top-bg.png")} alt="" className="responsive-img" />
                    <img src={require("../../img/inviteFriend-mid-bg.png")} alt="" className="responsive-img" onClick={this._jumpToMyInviteFriendDetail}/>
                    <img src={require("../../img/inviteFriend-foot-bg2.png")} alt="" className="responsive-img" />
                    <Button className="inviteFriend-btn" block amStyle="primary" onClick={this._showShareTip}>立即邀请</Button>
                    <div className={maskClasses} onClick={this._closeShareTip}>
                        <img src={require("../../img/share-guide.png")} alt="" className="share-guide-img"/>
                    </div>
                </Container>
            </View>
        )
    },
    componentDidMount(){
        let loginToken=cookie.getCookie("token");
        //如果用户是直接打开朋友直接分享的链接或者是没有登录token遗留在cookie中，则视为邀请注册的情况，界面跳转至注册组件
        if(!loginToken){
            if(this.inviteFlag === "beenInviter"){//如果用户没有登录，并且在url的flag标志为“beenInviter”,则带上邀请码，引导用户去注册
                this.context.router.push({
                    pathname:"registerGuide",
                    query:{
                        beforeComponent:"inviteMyFriend",
                        inviteCode:!!this.inviteCode ? this.inviteCode : ""
                    }
                })
            }else {//如果用户没有登录，并且在url的flag标志不为“beenInviter”,则带引导用户去登录，然后回跳回来
                this.context.router.push({
                    pathname:"/",
                    query:{
                        view:"login",
                        beforeComponent:"inviteMyFriend"
                    }
                })
            }
        }else {//如果用户当前已经登录了，则可视为邀请者身份，于是为url打上flag标志和附上邀请码

            let inviteCode=cookie.getCookie("phoneNo");//用户的手机号码即是邀请码
            let hasInviteCode=getParamObjFromUrl().hasOwnProperty("inviteCode");
            if(!hasInviteCode){
                window.history.replaceState(null,"邀请好友","#/inviteMyFriend?&flag=beenInviter&inviteCode="+inviteCode);//在“?”后面加上了“&”，解决了wechat对分享链接插入参数而导致链接无法访问的问题
            }
        }
    }
});

InviteMyFriend.contextTypes = {
    router:React.PropTypes.object.isRequired
};

module.exports=InviteMyFriend;
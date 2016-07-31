require("../../scss/page/InviteReward.scss");
//var BindBankCardAction=require("../actions/BindBankCardAction.js");
//var BindBankCardStore=require("../stores/BindBankCardStore.js");
//var InviteRewardAction=require("../actions/InviteRewardAction.js");
//var InviteRewardStore=require("../stores/InviteRewardStore.js");
import React from "react";
import { Link } from "react-router";

//ui component
import Container from "../UIComponents/Container";
import Group from "../UIComponents/Group";


let InviteReward=React.createClass({
    _jumpToRewardDetailList(){
        this.context.router.push({
            pathname:"rewardDetailList"
        });
    },
    _jumpToInviteMyFriend(){
        this.context.router.push({
            pathname:"inviteMyFriend"
        });
    },
    _jumpToMy2DCode(){
        this.context.router.push({
            pathname:"my2DCode"
        });
    },
    render(){

        return (
            <Container id="inviteReward"  scrollable={false}>

                <div className="rewardDetail" onClick={this._jumpToRewardDetailList}>
                    <div className="title">奖励明细</div>
                    <img src="/src/img/invi_pic_investment.png" alt=""/>
                    <div className="dashboard">
                        <div className="dashboard-item">
                            <span className="subtitle">本月已获取奖励(元)</span>
                            <span className="amount">80.00</span>
                        </div>
                        <div className="dashboard-item">
                            <span className="subtitle">累计已获取奖励(元)</span>
                            <span className="amount">800.00</span>
                        </div>
                    </div>
                </div>

                <div className="inviteFriend" onClick={this._jumpToInviteMyFriend}>
                    <img src="/src/img/invi_pic_friend.png" alt=""/>
                    <div className="title">邀请好友一起来赚钱</div>
                    <div className="subtitle">分享邀请链接给好友</div>
                </div>

                <div className="my2DCode" onClick={this._jumpToMy2DCode}>
                    <img src="/src/img/invi_pic_qr.png" alt=""/>
                    <div className="title">我的二维码</div>
                    <div className="subtitle">给推荐的好友扫一扫</div>
                </div>
            </Container>
        )
    },
    componentDidMount(){

    }
});

InviteReward.contextTypes = {
    router:React.PropTypes.object.isRequired
};

module.exports=InviteReward;
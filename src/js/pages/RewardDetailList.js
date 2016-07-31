require("../../scss/page/RewardDetailList.scss");
//var BindBankCardAction=require("../actions/BindBankCardAction.js");
//var BindBankCardStore=require("../stores/BindBankCardStore.js");
//var RewardDetailListAction=require("../actions/RewardDetailListAction.js");
//var RewardDetailListStore=require("../stores/RewardDetailListStore.js");
import React from "react";

//ui component
import Container from "../UIComponents/Container";
import Group from "../UIComponents/Group";
import Notification from "../UIComponents/Notification";

let RewardDetailListItem=React.createClass({
    render(){
        return (
            <li className="rewardDetailList-item">
                <span>2016-08-01</span>
                <span>邀请奖励</span>
                <span className="amount">20元</span>
            </li>
        )
    }
});

let RewardDetailList=React.createClass({
    getInitialState(){
        return {
            isNotificationVisible:true
        }
    },
    _closeNotification(){
        this.setState({
            isNotificationVisible:false
        });
    },
    render(){

        return (
            <Container id="rewardDetailList"  scrollable={true}>
                <Group
                    noPadded
                    >
                    <ul className="rewardDetail-list">
                        <RewardDetailListItem />
                        <RewardDetailListItem />
                        <RewardDetailListItem />
                        <RewardDetailListItem />
                        <RewardDetailListItem />
                        <RewardDetailListItem />
                        <RewardDetailListItem />
                        <RewardDetailListItem />
                        <RewardDetailListItem />
                        <RewardDetailListItem />
                        <RewardDetailListItem />
                        <RewardDetailListItem />
                        <RewardDetailListItem />
                    </ul>
                </Group>
                <Notification
                    title="温馨提示"
                    amStyle="primary"
                    visible={this.state.isNotificationVisible}
                    animated
                    onDismiss={this._closeNotification}
                    >
                    亲，每月一号发放要邀请奖励，请知悉。
                </Notification>
            </Container>
        )
    },
    componentDidMount(){

    }
});

RewardDetailList.contextTypes = {
    router:React.PropTypes.object.isRequired
};

module.exports=RewardDetailList;
require("../../scss/page/RewardDetailList.scss");
var RewardDetailListAction=require("../actions/RewardDetailListAction.js");
var RewardDetailListStore=require("../stores/RewardDetailListStore.js");
import React from "react";

//ui component
import Container from "../UIComponents/Container";
import Group from "../UIComponents/Group";
import Notification from "../UIComponents/Notification";
import Loader from "../UIComponents/Loader";

import NoDataHint from "./utilities/NoDataHint";

let RewardDetailListItem=React.createClass({
    render(){
        let {
            reward_amount,
            type,
            create_time
            }=this.props;
        return (
            <li className="rewardDetailList-item">
                <span>{create_time}</span>
                <span>{type}</span>
                <span className="amount">{reward_amount}元</span>
            </li>
        )
    }
});

let RewardDetailList=React.createClass({
    getInitialState(){
        return {
            rewardDetailList:RewardDetailListStore.getRewardDetailList(),
            isNotificationVisible:true,
            isNoDataHintShow:false
        }
    },
    _closeNotification(){
        this.setState({
            isNotificationVisible:false
        });
    },
    _handleScroll(){
        let rewardDetailList=document.getElementById("rewardDetailList");
        let offsetHeight=rewardDetailList.offsetHeight;//元素出现在视口中区域的高度
        let scrollTop=rewardDetailList.scrollTop;//元素已经滚动的距离
        let scrollHeight=rewardDetailList.scrollHeight;//元素总的内容高度

        if(scrollHeight - offsetHeight - scrollTop <= 3){
            RewardDetailListAction.getNextPage();
            Loader.show();
        }
    },
    render(){
        let {
            rewardDetailList,
            isNotificationVisible,
            isNoDataHintShow
            }=this.state;
        return (
            <Container id="rewardDetailList"  scrollable={rewardDetailList.length ? true : false} onScroll={this._handleScroll}>
                {
                    isNoDataHintShow ?
                        (
                            <NoDataHint />
                        ) :
                        (
                            <Group
                                noPadded
                            >
                                <ul className="rewardDetail-list">
                                    {
                                        this.state.rewardDetailList.map(function(item,index){
                                            return (
                                                <RewardDetailListItem  {...item} key={index}/>
                                            )
                                        })
                                    }
                                </ul>
                            </Group>
                        )

                }
            
                <Notification
                    title="温馨提示"
                    amStyle="primary"
                    visible={isNotificationVisible}
                    animated
                    onDismiss={this._closeNotification}
                    >
                    亲，每月一号发放要邀请奖励，请知悉。
                </Notification>
                <Loader amStyle="primary" rounded/>
            </Container>
        )
    },
    componentDidMount(){
        RewardDetailListAction.getNextPage();

        RewardDetailListStore.bind("change",function(){
            this.setState({
                rewardDetailList:RewardDetailListStore.getRewardDetailList()
            });
            Loader.hide();
        }.bind(this));

        RewardDetailListStore.bind("noDataTemporally",function(){
            this.setState({
                isNoDataHintShow:true
            });
            Loader.hide();
        }.bind(this));

    },
    componentWillUnmount(){
        RewardDetailListStore.clearAll();
        RewardDetailListStore.unbind("change");
        RewardDetailListStore.unbind("noDataTemporally");
    }
});

RewardDetailList.contextTypes = {
    router:React.PropTypes.object.isRequired
};

module.exports=RewardDetailList;
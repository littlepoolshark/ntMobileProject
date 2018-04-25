require("../../scss/page/MyInviteFriendDetail.scss");
let MyInviteFriendDetailAction=require("../actions/MyInviteFriendDetailAction.js");
let MyInviteFriendDetailStore=require("../stores/MyInviteFriendDetailStore.js");
import React from "react";
import classNames from "classnames";

//ui component
import Container from "../UIComponents/Container";
import Button from "../UIComponents/Button";
import NavBar from "../UIComponents/NavBar";
import Grid from "../UIComponents/Grid";
import Col from "../UIComponents/Col";
import Loader from "../UIComponents/Loader";

import cookie from "../lib/cookie";
import getParamObjFromUrl from "../lib/getParamObjFromUrl";


let MyInviteFriendDetail=React.createClass({
    getInitialState(){
        return {
            data:MyInviteFriendDetailStore.getAll()
        }
    },
    _loadMoreData(){
        let myInviteFriendListWrapper=document.getElementById("myInviteFriendListWrapper");
        let offsetHeight=myInviteFriendListWrapper.offsetHeight;//元素出现在视口中区域的高度
        let scrollTop=myInviteFriendListWrapper.scrollTop;//元素已经滚动的距离
        let scrollHeight=myInviteFriendListWrapper.scrollHeight;//元素总的内容高度

        if(scrollHeight - offsetHeight - scrollTop <= 3){
            MyInviteFriendDetailAction.getNextPage();
            Loader.show();
        }
    },
    render(){
        let {
            sharePercent,//奖励比例
            inviteFriendCount,//推荐好友数
            inviteFriendAmount,//好友累计投资金额
            myInviteFriendList
            }=this.state.data;

        let isEmpty=myInviteFriendList.length === 0;

        return (
            <Container id="myInviteFriendDetail"  scrollable={true}>
                <div className="dashboard">
                    <div className="body">
                        <div className="title text-center">当前奖励比例</div>
                        <div className="number text-center">
                            <strong>{(sharePercent * 100).toFixed(1)}</strong>
                            <span className="unit">%</span>
                        </div>
                    </div>
                    <div className="footer">
                        <Grid collapse={true}>
                            <Col cols={3} className="text-center">
                                <span className="title">推荐好友数</span>
                                <span className="number">{inviteFriendCount + "人"}</span>
                            </Col>
                            <Col cols={3} className="text-center">
                                <span className="title">好友累计投资</span>
                                <span className="number">{(inviteFriendAmount / 10000).toFixed(2) + "万"}</span>
                            </Col>
                        </Grid>
                    </div>
                </div>
                <div className="myInviteFriend-list">
                    <img src={require("../../img/inviteFriendList-bg.png")} alt="" className="responsive-img"/>
                    <div className="myInviteFriend-list-wrapper" id="myInviteFriendListWrapper" onScroll={this._loadMoreData}>
                        <table>
                            <thead>
                            <tr>
                                <th>我的好友</th>
                                <th>手机号码</th>
                                <th>注册时间</th>
                                <th>是否投资</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                isEmpty ?
                                <tr>
                                    <td colSpan="4"><em>暂时没有数据！</em></td>
                                </tr> :
                                myInviteFriendList.map((item,index) => {
                                    return (
                                        <tr key={item.id}>
                                            <td>{item.realName}</td>
                                            <td>{item.loginName}</td>
                                            <td>{item.registerDate}</td>
                                            <td>{item.isNew === "no" ? "是" : "否"}</td>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </table>
                        <Loader amStyle="primary" rounded/>
                    </div>
                </div>
            </Container>
        )
    },
    componentDidMount(){
        MyInviteFriendDetailAction.getInitialData();

        MyInviteFriendDetailStore.bind("change",function(){
            this.setState({
                data:MyInviteFriendDetailStore.getAll()
            })
        }.bind(this));
    },
    componentDidUpdate(){
        Loader.hide();
    },
    componentWillMount(){
        MyInviteFriendDetailStore.clearAll();
    }
});

MyInviteFriendDetail.contextTypes = {
    router:React.PropTypes.object.isRequired
};

module.exports=MyInviteFriendDetail;
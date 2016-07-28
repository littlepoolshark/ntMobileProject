require("../../scss/page/UserHome.scss");
let UserHomeAction=require("../actions/UserHomeAction.js");
let UserHomeStore=require("../stores/UserHomeStore.js");
import React from "react";
import {
    Link
} from 'react-router';

import Container from "../UIComponents/Container";
import Button from "../UIComponents/Button";
import Group from "../UIComponents/Group";
import Grid from "../UIComponents/Grid";
import Col from "../UIComponents/Col";
import Icon from "../UIComponents/Icon";
import List from "../UIComponents/List";


//用户中心页面：UserHome component
let UserHome=React.createClass({
    getInitialState(){
        return {
            data:UserHomeStore.getAll(),
            ishowData:true
        }
    },
    _toggleShowData(){
          this.setState({
              ishowData:!this.state.ishowData
          });
    },
    render(){
        let {
            total,
            totalProfit,
            available,
            hqAmount,
            dqAmount,
            hcCount,
            tikectCount,
            }=this.state.data;
        let ishowData=this.state.ishowData;
        return (
            <Container scrollable={false} id="userHome">
                <div className="dashboard">
                    <div className="header">
                        <Link className="message-icon-wrapper" to="messageList" >
                            <Icon  classPrefix="imgIcon" name="message"  />
                        </Link>
                        <Link to="recharge">
                            <Button  hollow radius >充值</Button>
                        </Link>
                        <Link to="messageList">
                            <Button  hollow radius >提现</Button>
                        </Link>
                    </div>
                    <div className="text-center subtitle" style={{marginTop:"20px"}}>
                        <span className="data-eye-wrapper">
                            总资产(元)
                            <Icon classPrefix="imgIcon" name={ishowData ? "white-eye-on" : "white-eye-off"} onClick={this._toggleShowData}/>
                        </span>
                    </div>
                    <div className="text-center" style={{lineHeight:1}}>
                        <strong className="amount">{ishowData ? total : "****"}</strong>
                    </div>
                    <Grid  className="sub-dashboard" style={{marginTop:"20px"}} >
                        <Col cols={3}>
                            <div className="subtitle text-center">累计收益(元)</div>
                            <div className="amount text-center">{ishowData ? totalProfit : "****"}</div>
                        </Col>
                        <Col cols={3}>
                            <Link to="messageList">
                                <div className="subtitle text-center">可用余额(元) <Icon name="right-nav" style={{fontSize:"14px"}}/></div>
                                <div className="amount text-center">{ishowData ? available : "****"}</div>
                            </Link>
                        </Col>
                    </Grid>
                </div>
                <Group noPadded={true} className="investmentRecord-entry">
                    <Grid>
                        <Col cols={2} className="investmentRecord-entry-item">
                            <Link to="dailyEarnRecord">
                                <Icon classPrefix="imgIcon" name="folder"/>
                                <span className="title">活期投资</span>
                                <span className="subtitle">{ishowData ? hqAmount : "****"}</span>
                            </Link>
                        </Col>
                        <Col cols={2} className="investmentRecord-entry-item">
                            <Link to="fixedLoanRecord">
                                <Icon classPrefix="imgIcon" name="money-package"/>
                                <span className="title">定期投资</span>
                                <span className="subtitle">{ishowData ? dqAmount : "****"}</span>
                            </Link>
                        </Col>
                        <Col cols={2} className="investmentRecord-entry-item">
                            <Link to="fixedLoanRecord">
                                <Icon classPrefix="imgIcon" name="calendar"/>
                                <span className="title">回款计划</span>
                                <span className="subtitle">本月<strong>{hcCount}</strong>笔</span>
                            </Link>
                        </Col>
                    </Grid>
                </Group>

                <List>
                    <List.Item  href="##" title="优惠券" after={(<span><strong className="coupon-count">{tikectCount}</strong>张可用</span>)}/>
                    <List.Item  href="##" title="邀请有礼"/>
                </List>

                <List>
                    <List.Item  href="##" title="设置"/>
                </List>
            </Container>
        )
    },
    componentDidMount(){
        UserHomeAction.getInitailDataFromServer();

        UserHomeStore.bind("change",function(){
            this.setState(UserHomeStore.getAll());
        }.bind(this));

    },
    componentWillUnmount(){
        UserHomeStore.unbind("change");
    }
});

UserHome.contextTypes = {
    router:React.PropTypes.object.isRequired
};

module.exports=UserHome;
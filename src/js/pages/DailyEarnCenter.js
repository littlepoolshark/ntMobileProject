require("../../scss/page/DailyEarnCenter.scss");
let DailyEarnCenterAction=require("../actions/DailyEarnCenterAction.js");
let DailyEarnCenterStore=require("../stores/DailyEarnCenterStore.js");
import React from "react";
import {
    Link
} from 'react-router';

import Container from "../UIComponents/Container";
import Button from "../UIComponents/Button";
import Group from "../UIComponents/Group";
import Grid from "../UIComponents/Grid";
import Col from "../UIComponents/Col";
import List from "../UIComponents/List";
import Message from "../UIComponents/Message";
import NavBar from "../UIComponents/NavBar";


//用户中心页面：DailyEarnCenter component
let DailyEarnCenter=React.createClass({
    getInitialState(){
        return DailyEarnCenterStore.getAll()
    },
    _jumpToDailyEarnIntroduction(productId){
        this.context.router.push({
            pathname:"earnSetIntroduction",
            query:{
                productId:productId,
                type:"ttz_product"
            }
        });
    },
    _jumpToDailyEarnRollOut(){
        this.context.router.push({
            pathname:"dailyEarnRollOut"
        });
    },
    _handleExtractBtnClick(){
        DailyEarnCenterAction.extractDailyEarnIncome()
    },
    _handleLeftNavClick(){
        this.context.router.push({
            pathname:"userHome"
        });
    },
    render(){
        let {
            ttzProductId,
            cyTotal,
            makeTotal,
            zrLixi,
            ljLixi,
            ktqMoney
            }=this.state;
        let leftNav= {
            component:"a",
            icon: 'left-nav',
            title: '返回'
        };
        return (
            <Container scrollable={false} id="dailyEarnCenter">
                <NavBar
                    title="灵活理财"
                    leftNav={[leftNav]}
                    amStyle="primary"
                    onAction={this._handleLeftNavClick}
                />

                <Group noPadded={true} className="dailyEarn-dashboard">
                    <div className="dailyEarn-holding-amount">
                        <span className="subtitle">持有中(元)</span>
                        <span className="amount">{cyTotal}</span>
                    </div>
                    <div className="dailyEarn-appointment-amount">
                        <span className="subtitle">预约中(元)</span>
                        <span className="amount">{makeTotal}</span>
                    </div>
                    <div className="dailyEarn-dashboard-footer">
                        <Grid>
                            <Col cols={3}>
                                <span className="subtitle">昨日收益(元)</span>
                                <span className="amount">{zrLixi}</span>
                            </Col>
                            <Col cols={3}>
                                <span className="subtitle">累计收益(元)</span>
                                <span className="amount">{ljLixi}</span>
                            </Col>
                        </Grid>
                    </div>
                </Group>

                <List>
                    <List.Item
                        href={null}
                        title={<span><span className="subtitle">可提取收益(元)：</span><strong className="dailyEarn-extract-amount">{ktqMoney}</strong></span>}
                        after={<Button amStyle="primary" hollow radius className="dailyEarn-extract-btn" onClick={this._handleExtractBtnClick}>提取</Button>}
                    />
                </List>

                <List>
                    <List.Item href={"#/dailyEarnInvestmentRecord"} title="投资明细" />
                </List>

                <div className="btns-wrapper">
                    <Grid collapse={true}>
                        <Col cols={3}>
                            <Button amStyle="white" block onClick={this._jumpToDailyEarnRollOut}>转出</Button>
                        </Col>
                        <Col cols={3}>
                            <Button amStyle="white" block onClick={this._jumpToDailyEarnIntroduction.bind(null,ttzProductId)}>购买</Button>
                        </Col>
                    </Grid>
                </div>
            </Container>
        )
    },
    componentDidMount(){
        DailyEarnCenterAction.getDailyEarnCenterInfo();

        DailyEarnCenterStore.bind("change",function(){
            this.setState(DailyEarnCenterStore.getAll())
        }.bind(this));

        DailyEarnCenterStore.bind("extractDailyEarnIncomeSuccess",function(){
            Message.broadcast("提取收益成功！");
        });

        DailyEarnCenterStore.bind("extractDailyEarnIncomeFailed",function(msg){
            Message.broadcast(msg);
        });

    }
});

DailyEarnCenter.contextTypes = {
    router:React.PropTypes.object.isRequired
};

module.exports=DailyEarnCenter;
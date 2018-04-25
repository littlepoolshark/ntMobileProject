require("../../scss/page/AppSetting.scss");
let AppSettingAction=require("../actions/AppSettingAction");
let AppSettingStore=require("../stores/AppSettingStore");
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


//设置中心页面：AppSetting component
let AppSetting=React.createClass({
    getInitialState(){
         return AppSettingStore.getAll();
    },
    _handleLogout(){
        AppSettingAction.logout();
    },
    _jumpToRiskEvaluate(){
        this.context.router.push({
            pathname:"riskEvaluate",
            query:{
                isEvaluated:this.state.isRiskEvaluated
            }
        })
    },
    render(){
        let {
            isRiskEvaluated,
            userRiskType
        }=this.state;

        return (
            <Container scrollable={false} id="appSetting">

                <List>
                    <List.Item
                        href="#/securityCenter"
                        title="安全中心"
                        media={<Icon classPrefix="imgIcon" name="safe-guarder"/>}
                        />
                    <List.Item
                        href="#/myBankCard"
                        title="我的银行卡"
                        media={<Icon classPrefix="imgIcon" name="bank-card"/>}
                        />
                    <List.Item
                        href="javascript:void(0)"
                        title="投资风险评测"
                        media={<Icon classPrefix="imgIcon" name="feedback-icon"/>}
                        after={userRiskType}
                        onClick={this._jumpToRiskEvaluate}
                        />
                </List>

                <List>
                    <List.Item
                        href="#/aboutUs"
                        title="关于我们"
                        media={<Icon classPrefix="imgIcon" name="person-avator"/>}
                        />
                    {/* <List.Item
                        href="##"
                        title="客服QQ"
                        media={<Icon classPrefix="imgIcon" name="qq-icon"/>}
                        />
                    <List.Item
                        href="##"
                        title="微信公众号"
                        media={<Icon classPrefix="imgIcon" name="weixin"/>}
                        />*/}
                </List>

                <a href="tel:4006322688">
                    <Group>
                        <div className="serverPhone-title">
                        <span className="icon-wrapper">
                            <Icon classPrefix="imgIcon" name="phone-call"/>
                            <span>客服电话</span>
                        </span>
                            <span className="serverPhoneNo">400-6322-688</span>
                        </div>
                        <div className="serverPhone-footer">客服服务时间：工作日9:00-18:00</div>
                    </Group>
                </a>

                 <List >
                    <List.Item
                        href="#/appFeedback"
                        title="意见反馈"
                        media={<Icon  classPrefix="imgIcon" name="feedback-icon"/>}
                        />
                </List>

                <div className="block-btn-wrapper">
                    <Button amStyle="primary" block radius onClick={this._handleLogout}>退出登录</Button>
                </div>


            </Container>
        )
    },
    componentDidMount(){
        AppSettingAction.getInitialData();

        AppSettingStore.bind("change",function(){
          this.setState(AppSettingStore.getAll())
        }.bind(this));

        AppSettingStore.bind("logoutSuccess",function(){
            this.context.router.push({
                pathname:"/",
                query:{
                    t:Math.random()
                }
            })
        }.bind(this));
    }
});

AppSetting.contextTypes = {
    router:React.PropTypes.object.isRequired
};

module.exports=AppSetting;
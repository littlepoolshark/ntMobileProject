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
    _handleLogout(){
        AppSettingAction.logout();
    },
    _refreshApp(){
        console.log("asdfsad");
        window.location.reload(true);
    },
    render(){

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
                        title="银行卡"
                        media={<Icon classPrefix="imgIcon" name="bank-card"/>}
                        />
                </List>

                <List>
                    <List.Item
                        href="##"
                        title="关于我们"
                        media={<Icon classPrefix="imgIcon" name="love-heart"/>}
                        />
                    <List.Item
                        href="##"
                        title="客服QQ"
                        media={<Icon classPrefix="imgIcon" name="qq-icon"/>}
                        />
                    <List.Item
                        href="##"
                        title="微信公众号"
                        media={<Icon classPrefix="imgIcon" name="weixin"/>}
                        />
                </List>

                <Group>
                    <div className="serverPhone-title">
                        <span className="icon-wrapper">
                            <Icon classPrefix="imgIcon" name="phone-call"/>
                            <span>客服电话</span>
                        </span>
                        <span className="serverPhoneNo">400-6322-688</span>
                    </div>
                    <div className="serverPhone-footer">客服时间：工作日9:00-18:00</div>
                </Group>

                <List onClick={this._refreshApp}>
                    <List.Item
                        href="javascript:void(0)"
                        title="刷新应用"
                        media={<Icon  name="refresh" style={{fontSize:"1rem",color:"#df4b3c",fontWeight:"bold"}}/>}
                        />
                </List>

                <div className="block-btn-wrapper">
                    <Button amStyle="primary" block radius onClick={this._handleLogout}>退出登录</Button>
                </div>


            </Container>
        )
    },
    componentDidMount(){
        AppSettingStore.bind("logoutSuccess",function(){
            this.context.router.push({
                pathname:"/"
            })
        }.bind(this));
    }
});

AppSetting.contextTypes = {
    router:React.PropTypes.object.isRequired
};

module.exports=AppSetting;
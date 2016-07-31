require("../../scss/page/AppSetting.scss");
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
    render(){

        return (
            <Container scrollable={false} id="appSetting">

                <List>
                    <List.Item
                        href="##"
                        title="安全中心"
                        media={<Icon classPrefix="imgIcon" name="love-heart"/>}
                        />
                    <List.Item
                        href="##"
                        title="银行卡"
                        media={<Icon classPrefix="imgIcon" name="love-heart"/>}
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
                            <Icon classPrefix="imgIcon" name="weixin"/>
                            <span>客服电话</span>
                        </span>
                        <span className="serverPhoneNo">400-6322-688</span>
                    </div>
                    <div className="serverPhone-footer">客服时间：工作日9:00-18:00</div>
                </Group>

                <List>
                    <List.Item
                        href="##"
                        title="检查更新"
                        media={<Icon classPrefix="imgIcon" name="love-heart"/>}
                        />
                </List>

                <div className="block-btn-wrapper">
                    <Button amStyle="primary" block radius>退出登录</Button>
                </div>


            </Container>
        )
    },
    componentDidMount(){

    }
});

AppSetting.contextTypes = {
    router:React.PropTypes.object.isRequired
};

module.exports=AppSetting;
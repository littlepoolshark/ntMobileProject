import "../../scss/page/PlatformSurvey.scss";
import PlatformSurveyAction from "../actions/PlatformSurveyAction";
import PlatformSurveyStore from "../stores/PlatformSurveyStore";
import React, { Component } from 'react';
import { Container, Slider, Grid, Col } from "../UIComponents/index";

const EXPIRATION_DATE="2017-12-31";//当前截止日期

class PlatformSurvey extends Component {
    constructor(props) {
        super(props);
        this.state = PlatformSurveyStore.getAll();
    }
    render() {
        let {
            registerUserCount,
            totalAmountOfInvestment,
            safeDays,
            totalProfits
        } = this.state;

        return (
            <Container id="platformSurvey">
                <Slider autoPlay={false} controls={false} loop={false} interval={30 * 60 * 1000}>
                    <Slider.Item >
                        <div className="content-wrapper frame1" >
                            <div className="title">平台运营数据</div>
                            <div className="frame1-row cf">
                                <div className="frame1-row-cell">
                                    <img src={require("../../img/icon_turnover.png")} alt="" className="block-icon" />
                                    <div className="digit text-center">
                                        {totalAmountOfInvestment}
                                        <br />
                                        <div className="subtitle">
                                            累计成交额（元）
                                        </div>
                                    </div>
                                </div>
                                <div className="frame1-row-cell">
                                    <img src={require("../../img/icon_register.png")} alt="" className="block-icon" />
                                    <div className="digit text-center">
                                        {registerUserCount}
                                        <br />
                                        <div className="subtitle">
                                            注册用户数（人）
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="frame1-row cf">
                                <div className="frame1-row-cell">
                                    <img src={require("../../img/icon_day.png")} alt="" className="block-icon" />
                                    <div className="digit text-center">
                                        {safeDays}
                                        <br />
                                        <div className="subtitle">
                                            安全运营天数（天）
                                    </div>
                                    </div>
                                </div>
                                <div className="frame1-row-cell">
                                    <img src={require("../../img/icon_monney.png")} alt="" className="block-icon" />
                                    <div className="digit text-center">
                                        {totalProfits}
                                        <br />
                                        <div className="subtitle">
                                            用户累计收益额（元）
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Slider.Item>
                    <Slider.Item >
                        <div className="content-wrapper frame2">
                            <div className="title">
                                每月累计成交额（亿元）<br />
                                <div className="subtitle">
                                    数据截止至{EXPIRATION_DATE}
                                </div>
                            </div>
                            <img src={require("../../img/form.png")} alt="" />
                        </div>
                    </Slider.Item>
                    <Slider.Item >
                        <div className="content-wrapper frame3">
                            <div className="title">
                                投资人分布
                                <div className="subtitle">
                                    数据截止至{EXPIRATION_DATE}
                                </div>
                            </div>
                            <Grid >
                                <Col cols={3}>
                                    <img src={require("../../img/man.png")} alt="" className="block-icon" />
                                </Col>
                                <Col cols={3}>
                                    <img src={require("../../img/women.png")} alt="" className="block-icon" />
                                </Col>
                            </Grid>
                            <img src={require("../../img/touziren.png")} alt="" />
                        </div>
                    </Slider.Item>
                    <Slider.Item >
                        <div className="content-wrapper frame4">
                            <div className="title">
                                标的占比
                                <div className="subtitle">
                                    数据截止至{EXPIRATION_DATE}
                                </div>
                            </div>
                            <img src={require("../../img/disk.png")} alt="" className="circle-chart" />
                            <img src={require("../../img/biaodi.png")} alt="" className="list-chart" />
                        </div>
                    </Slider.Item>
                    <Slider.Item >
                        <div className="content-wrapper frame5">
                            <div className="title">
                                投资终端占比<br />
                                <div className="subtitle">数据截止至{EXPIRATION_DATE}</div>
                            </div>
                            {/* <Grid >
                                <Col cols={3}>
                                    <img src={require("../../img/app.png")} alt="" className="block-icon" />
                                </Col>
                                <Col cols={3}>
                                    <div className="subtitle text-center">手机APP端</div>
                                    <div className="digit text-center">46.98%</div>
                                </Col>
                            </Grid>
                            <Grid >
                                <Col cols={3}>
                                    <img src={require("../../img/pc.png")} alt="" className="block-icon" />
                                </Col>
                                <Col cols={3}>
                                    <div className="subtitle text-center">电脑网页端</div>
                                    <div className="digit text-center"> 42.21%</div>
                                </Col>
                            </Grid>
                            <Grid >
                                <Col cols={3}>
                                    <img src={require("../../img/wechat.png")} alt="" className="block-icon" />
                                </Col>
                                <Col cols={3}>
                                    <div className="subtitle text-center">微信端</div>
                                    <div className="digit text-center"> 10.81%</div>
                                </Col>
                            </Grid> */}
                            <img src={require("../../img/app2.png")} alt="" className="block-icon1" />
                            <img src={require("../../img/pc2.png")} alt="" className="block-icon2" />
                            <img src={require("../../img/wechat2.png")} alt="" className="block-icon3" />
                        </div>
                    </Slider.Item>
                </Slider>
            </Container >
        );
    }

    componentDidMount() {
        //鉴于在qqx5浏览器中，“content-wrapper”元素的高度并不能被css属性height:100%所撑开，故使用脚本来解决此兼容问题。
        let contentWrapperHeight = window.innerHeight - 38 + "px";
        let contentWrappers = document.getElementsByClassName("content-wrapper");
        for (let i = 0; i < contentWrappers.length; i++) {
            contentWrappers[i].style.height = contentWrapperHeight;
        };


        PlatformSurveyStore.bind("change", () => {
            this.setState(PlatformSurveyStore.getAll());
        })

        PlatformSurveyAction.getInitialData();
    }
    componentWillUnmount() {
        PlatformSurveyStore.clearAll();
    }

};

module.exports = PlatformSurvey;

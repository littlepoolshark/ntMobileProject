require("../../scss/page/Home.scss");
import React from "react";
import {
    Link
} from 'react-router';

//ui component
import Container from "../UIComponents/Container";
import View from "../UIComponents/View";
import NavBar from "../UIComponents/NavBar";
import Button from "../UIComponents/Button";
import Field from "../UIComponents/Field";
import List from "../UIComponents/List";
import Icon from "../UIComponents/Icon";
import Modal from "../UIComponents/modal/Modal";
import Slider from "../UIComponents/Slider";
import Group from "../UIComponents/Group";
import Grid from "../UIComponents/Grid";
import Col from "../UIComponents/Col";

//utilites component
import DailyEarnCard from "./utilities/DailyEarnCard";

//首页:Index component
let Home=React.createClass({
    render(){
        return (
            <Container scrollable={false} style={{overflow:"scroll"}} >

                <Slider>
                    <Slider.Item>
                        <img src="./src/img/banner_01.jpg" />
                    </Slider.Item>
                    <Slider.Item>
                        <img src="./src/img/banner_02.jpg" />
                    </Slider.Item>
                    <Slider.Item>
                        <img src="./src/img/banner_04.jpg" />
                    </Slider.Item>
                </Slider>

                <Group header=""  style={{marginTop:0}}>
                    <Grid collapse={true}>
                        <Col cols={3} className="home-introduction-item">
                            <div className="platform-icon"></div>
                            <div>
                                <div className="title">平台介绍</div>
                                <div className="subtitle">上市公司战略投资</div>
                            </div>
                        </Col>
                        <Col cols={3} className="home-introduction-item">
                            <div className="invite-icon"></div>
                            <div>
                                <div className="title">邀请有礼</div>
                                <div className="subtitle" >一起赚大钱</div>
                            </div>
                        </Col>
                    </Grid>
                </Group>

                <Group className="home-earnSet-card" noSidePadded={true}>
                    <h6 className="title">
                        <span className="icon-new"></span>
                        <span>新手标</span>

                    </h6>
                    <Grid collapse={true}>
                        <Col cols={3} className="home-earnSet-card-item">
                            <div className="text-center yearRate">9.5<span className="unit">%</span></div>
                            <div className="text-center subtitle" >年化收益</div>
                        </Col>
                        <Col cols={3} className="home-earnSet-card-item">
                            <div className="subtitle">
                                <div className="subtitle-left">
                                    <span className="icon-time"></span>
                                    投资期限
                                </div>
                                <div className="subtitle-right">
                                    <span className="amount">1</span>
                                    <span className="unit">个月</span>
                                </div>
                            </div>
                            <div className="subtitle" style={{marginTop:"5px"}}>
                                <div className="subtitle-left">
                                    <span className="icon-money"></span>
                                    可投金额
                                </div>
                                <div className="subtitle-right">
                                    <span className="amount">100</span>
                                    <span className="unit">万</span>
                                </div>
                            </div>
                        </Col>
                    </Grid>
                    <div className="newbieLoan-label"></div>
                </Group>


                    <DailyEarnCard yearRate="8.0" isSoldOut={false}/>

                <div className="home-dashboard">
                    <div className="title text-center">农泰金融已累计为 <strong>168900</strong>位用户撮合交易金额（元）</div>
                    <div className="amount text-center">169,806,570</div>
                    <div className="remark"><span className="icon-insurance"></span>交易过程阳光保险全程保障</div>
                </div>
            </Container>


        )
    }
});

export default Home;
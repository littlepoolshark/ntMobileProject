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

                <Group header="" noPadded={false} style={{marginTop:0}}>
                    <Grid collapse={true}>
                        <Col cols={3}>
                            <div className="text-center">平台介绍</div>
                            <div className="text-center" style={{color:"#999",fontSize:"12px"}}>上市公司战略投资</div>
                        </Col>
                        <Col cols={3}>
                            <div className="text-center">邀请有礼</div>
                            <div className="text-center" style={{color:"#999",fontSize:"12px"}}>一起赚大钱</div>
                        </Col>
                    </Grid>
                </Group>

                <Link to="/productList">
                    <Group>
                        <h6 style={{borderBottom:"1px solid #ececec",paddingBottom:"5px"}}>天天赚</h6>
                        <Grid collapse={true}>
                            <Col cols={3} style={{borderRight:"1px solid #ececec"}}>
                                <div className="text-center">9.5%</div>
                                <div className="text-center" style={{color:"#999",fontSize:"12px"}}>年化收益</div>
                            </Col>
                            <Col cols={3}>
                                <div className="text-center"><span style={{color:"#999",fontSize:"12px"}}>投资期限</span> 1个月</div>
                                <div className="text-center"><span style={{color:"#999",fontSize:"12px"}}>可投金额</span> 0.35万</div>
                            </Col>
                        </Grid>
                    </Group>
                </Link>
                <Group>
                    <h6 style={{borderBottom:"1px solid #ececec",paddingBottom:"5px"}}>季季赚</h6>
                    <Grid collapse={true}>
                        <Col cols={3} style={{borderRight:"1px solid #ececec"}}>
                            <div className="text-center">10.5%</div>
                            <div className="text-center" style={{color:"#999",fontSize:"12px"}}>年化收益</div>
                        </Col>
                        <Col cols={3}>
                            <div className="text-center"><span style={{color:"#999",fontSize:"12px"}}>投资期限</span> 3个月</div>
                            <div className="text-center"><span style={{color:"#999",fontSize:"12px"}}>可投金额</span> 1.35万</div>
                        </Col>
                    </Grid>
                </Group>
                <Group>
                    <h6 style={{borderBottom:"1px solid #ececec",paddingBottom:"5px"}}>季季赚</h6>
                    <Grid collapse={true}>
                        <Col cols={3} style={{borderRight:"1px solid #ececec"}}>
                            <div className="text-center">10.5%</div>
                            <div className="text-center" style={{color:"#999",fontSize:"12px"}}>年化收益</div>
                        </Col>
                        <Col cols={3}>
                            <div className="text-center"><span style={{color:"#999",fontSize:"12px"}}>投资期限</span> 3个月</div>
                            <div className="text-center"><span style={{color:"#999",fontSize:"12px"}}>可投金额</span> 1.35万</div>
                        </Col>
                    </Grid>
                </Group>
            </Container>


        )
    }
});

export default Home;
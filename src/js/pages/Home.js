require("../../scss/page/Home.scss");
let HomeAction=require("../actions/HomeAction");
let HomeStore=require("../stores/HomeStore");
import React from "react";
import {
    Link
} from 'react-router';

//ui component
import Container from "../UIComponents/Container";
import Button from "../UIComponents/Button";
import Slider from "../UIComponents/Slider";
import Group from "../UIComponents/Group";
import Grid from "../UIComponents/Grid";
import Col from "../UIComponents/Col";

//utilites component
import DailyEarnCard from "./utilities/DailyEarnCard";
import HomeCommonCard from "./utilities/HomeCommonCard";
import Slogan from "./utilities/Slogan";
import mixin from "./utilities/mixin";



//首页:Index component
HomeAction.getDataFromServer();
let Home=React.createClass({
    mixins:[mixin],
    _getAllDataFromStore(){
        return HomeStore.getAll();
    },
    getInitialState(){
        return this._getAllDataFromStore();
    },
    render(){
        let {
            bannerList,
            productList,
            registerUserCount,
            totalAmountOfInvestment
            }=this.state;
        return (
            <Container scrollable={false} style={{overflow:"scroll"}} >

                <Slider>
                    {bannerList.map(function(item,index){
                        return (
                            <Slider.Item key={index + 1}>
                                <img src={item.pic} />
                            </Slider.Item>
                        )

                    })}
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

                {
                    productList.map(function(item,index){
                        if(item.type === "ttz_product"){
                            return (
                                <DailyEarnCard {...item} key={item.id}/>
                            )
                        }else {
                            return (
                                <HomeCommonCard {...item} key={item.id}/>
                            )
                        }
                    }.bind(this))
                }

                <div className="home-dashboard">
                    <div className="title text-center">农泰金融已累计为 <strong>{registerUserCount}</strong>位用户撮合交易金额（元）</div>
                    <div className="amount text-center">{totalAmountOfInvestment}</div>
                    <Slogan />
                </div>
            </Container>


        )
    },
    componentDidMount(){
        HomeStore.bind("change",function(){
            this.setState(this._getAllDataFromStore())
        }.bind(this));
    }
});

export default Home;
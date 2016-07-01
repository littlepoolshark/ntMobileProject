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
import Slogan from "./utilities/Slogan";
import productStatusMixin from "./utilities/productStatusMixin";

//除了天天赚，首页中所有标的（新手标，月月赚，季季赚和好采投）的展示都用这个组件
let  HomeCommonCard=React.createClass({
    mixins:[productStatusMixin],
    _renderCardStatus(productType,productStatus,remainAmount){
        let statusText=this.getProductStatusText(productType,productStatus);
        if(statusText !== "售罄"){
            return (
                <div className="subtitle-right">
                    <span className="amount">{remainAmount}</span>
                    <span className="unit">万</span>
                </div>
            )
        }else {
            return (
                <div className="subtitle-right">
                    <span className="amount">售罄</span>
                    <span className="unit"></span>
                </div>
            )
        }
    },
    render(){
        let {
            id,
            type,
            productName,
            productApr,
            repaymentLimit,
            repaymentTypeUnit,
            remainAmount,
            status
            }=this.props;
        let pathName=type === "loan_product" ? "fixLoanIntroduction" : "earnSetIntroduction";

        return (
            <Link to={{pathname:pathName,query:{type:type,productId:id}}}>
                <Group className="home-earnSet-card" noSidePadded={true}>
                    <h6 className="title">
                        {
                            type === "new_product" ?
                            (<span className="icon-new"></span>) :
                            (<span className="icon-redStar"></span>)
                        }
                        <span className="text">{productName}</span>
                    </h6>
                    <Grid collapse={true}>
                        <Col cols={3} className="home-earnSet-card-item">
                            <div className="text-center yearRate">{productApr}<span className="unit">%</span></div>
                            <div className="text-center subtitle" >年化收益</div>
                        </Col>
                        <Col cols={3} className="home-earnSet-card-item">
                            <div className="subtitle">
                                <div className="subtitle-left">
                                    <span className="icon-time"></span>
                                    投资期限
                                </div>
                                <div className="subtitle-right">
                                    <span className="amount">{repaymentLimit}</span>
                                    <span className="unit">{repaymentTypeUnit}</span>
                                </div>
                            </div>
                            <div className="subtitle" style={{marginTop:"5px"}}>
                                <div className="subtitle-left">
                                    <span className="icon-money"></span>
                                    可投金额
                                </div>
                                {this._renderCardStatus(type,status,remainAmount)}
                            </div>
                        </Col>
                    </Grid>
                    {
                        type === "new_product" ?
                        (<div className="newbieLoan-label"></div>)  :
                        null
                    }
                </Group>
            </Link>
        )
    }
});


//首页:Index component
HomeAction.getDataFromServer();
let Home=React.createClass({
    mixins:[productStatusMixin],
    _getAllDataFromStore(){
        return HomeStore.getAll();
    },
    getInitialState(){
        return this._getAllDataFromStore();
    },
    render(){
        return (
            <Container scrollable={false} style={{overflow:"scroll"}} >

                <Slider>
                    {this.state.bannerList.map(function(item,index){
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
                    this.state.productList.map(function(item,index){
                        if(item.type === "ttz_product"){
                            let statusText=this.getProductStatusText(item.type,item.status);
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
                    <div className="title text-center">农泰金融已累计为 <strong>{this.state.registerUserCount}</strong>位用户撮合交易金额（元）</div>
                    <div className="amount text-center">{this.state.totalAmountOfInvestment}</div>
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
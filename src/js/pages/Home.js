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
import cookie from "../lib/cookie";



//首页:Index component

let Home=React.createClass({
    mixins:[mixin],
    _getAllDataFromStore(){
        return HomeStore.getAll();
    },
    _jumpToAboutUs(){
        this.context.router.push({
            pathname:"aboutUs"
        });
    },
    _jumpToInviteMyFriend(){
        this.context.router.push({
            pathname:"inviteMyFriend"
        });
    },
    _handleBannerClick(iframeSource){
        //基于内嵌ih5的页面时，页面会被放大。而不内嵌时，页面显示正常的情况下考虑。
        //如果后台返回的链接地址跟农泰金融是同一个域名之下，则跳转到应用的内部组件中，
        //否则，就跳出当前的SPA，跳转至给链接地址
        if(!!iframeSource){
            if(iframeSource.indexOf("ntjrChina") > -1){
                this.context.router.push({
                    pathname:"BannerPageWrapper",
                    query:{
                        iframeSource:iframeSource
                    }
                });
            }else {
                window.location.href=iframeSource;
            }
        }
    },
    _handleImgLoadFailed(event){
        event.target.src=require("../../img/banner_placeholder_failed.png");
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
            <Container scrollable={true}  id="home">

                <Slider>
                    {
                        bannerList.map(function(item,index){
                            return (
                                <Slider.Item key={index + 1}>
                                    <a href="javascript:void(0);" onClick={this._handleBannerClick.bind(null,item.link)}>
                                        <img src={item.pic} onError={this._handleImgLoadFailed} />
                                    </a>
                                </Slider.Item>
                            )
                        }.bind(this))
                    }
                </Slider>

                <Group header=""  style={{margin:0}}>
                    <Grid collapse={true}>
                        <Col cols={3} className="home-introduction-item" onClick={this._jumpToAboutUs}>
                            <div className="platform-icon"></div>
                            <div>
                                <div className="title">平台介绍</div>
                                <div className="subtitle">上市公司战略投资</div>
                            </div>
                        </Col>
                        <Col cols={3} className="home-introduction-item" onClick={this._jumpToInviteMyFriend}>
                            <div className="invite-icon"></div>
                            <div>
                                <div className="title">邀请有礼</div>
                                <div className="subtitle" >一起赚大钱</div>
                            </div>
                        </Col>
                    </Grid>
                </Group>

                {
                    /* <div className="newbieGuide-bar">
                     <Link to="newbieGuide"> <img src={require("../../img/banner_newbietask_enter.png")} alt=""/></Link>
                     </div>*/
                }

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
        HomeAction.getDataFromServer();

        HomeStore.bind("change",function(){
            this.setState(this._getAllDataFromStore())
        }.bind(this));
    }
});

Home.contextTypes = {
    router:React.PropTypes.object.isRequired
};

module.exports=Home;
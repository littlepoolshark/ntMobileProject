require("../../scss/page/RegisterGuide.scss");
let RegisterGuideAction=require("../actions/RegisterGuideAction");
let RegisterGuideStore=require("../stores/RegisterGuideStore");
import React from "react";
import {Link} from "react-router";
import classNames from "classnames";

//ui component
import Group from "../UIComponents/Group";
import Grid from "../UIComponents/Grid";
import Col from "../UIComponents/Col";
import Button from "../UIComponents/Button";
import Field from "../UIComponents/Field";
import Container from "../UIComponents/Container";
import Message from "../UIComponents/Message";
import Modal from "../UIComponents/modal/Modal"
import Icon from "../UIComponents/Icon";
import Slider from "../UIComponents/Slider";

let SliderWrapper=React.createClass({
    getInitialState(){
        return {
            currIndex:0
        }
    },
    _handleAction(index,derection){
        this.setState({
            currIndex:index
        })
    },
    render(){
        let sliderPageList=this.props.sliderPageList;
        let sliderWrapperClassPrefix=this.props.wrapperClassPrefix;
        let sliderPageListLength=sliderPageList.length;
        let sliderImgList=[];
        for(let i=0;i<sliderPageListLength;i++){
            sliderImgList.push(sliderWrapperClassPrefix+" item"+(i+1));
        }
        let currIndex=this.state.currIndex;
        return (
            <div className="slider-wrapper">
                <div className="sliderPage-wrapper">
                    <div className="cutLine"></div>
                    {
                        sliderPageList.map(function(item,index){
                            let left=(100 / (sliderPageListLength-1) *  index).toFixed(0) + "%";
                            let itemClass=classNames({
                                "sliderPage-item":true,
                                "outSide-circle":true,
                                "active":currIndex === index ? true : false
                            });
                            return (
                                <span className={itemClass} style={{left:left}} key={index}>
                                    <span className="inner-circle"></span>
                                    <span className="inner-text">{item}</span>
                                </span>
                            )
                        })
                    }
                </div>
                <Slider
                    onAction={this._handleAction}
                    pager={false}
                >
                    {
                        sliderImgList.map(function(item,index){
                            return (
                                <Slider.Item key={index}>
                                    <div className={item}></div>
                                </Slider.Item>
                            )
                        })
                    }

                </Slider>
            </div>
        )
    }
});


let RegisterGuide=React.createClass({
    getInitialState(){
        return {
            data:RegisterGuideStore.getAll()
        }
    },
    _handleToggleCheck(){
        RegisterGuideAction.toggleCheck();
    },
    _getBackToTop(){
        document.getElementById("registerGuide").scrollTop=0;
    },
    _handleFieldValueChange(fieldName){
        let fieldValue=this.refs[fieldName].getValue();
        switch (fieldName){
            case "loginName":
                fieldValue=fieldValue.replace(/[^\d]/g,"");
                if(fieldValue.length === 1){
                    fieldValue="1";
                }
                if(fieldValue.length > 11){
                    fieldValue=fieldValue.slice(0,11);
                }
                break;
            case "password":
                if(fieldValue.length > 20){
                    fieldValue=fieldValue.slice(0,20);
                }
                break;
            default:
                break;
        };
        RegisterGuideAction.changeFieldValue(fieldValue,fieldName);
    },
    _changeVerifyCodeImg(){
        RegisterGuideAction.changeVerifyCodeImg();
    },
    _submitRegisterForm(){
        RegisterGuideAction.submitRegisterForm();
    },
    render(){
        let {
            loginName,
            password,
            imgVerifyCode,
            randomVerifyCode,
            isAgreeWithAgreement,
            totalAmountOfInvestment,
            registerUserCount
            }=this.state.data;
        randomVerifyCode=randomVerifyCode.split("");
        return (
            <Container id="registerGuide" scrollable={true}>
                <Group className="registerForm-section">
                    <img src={require("../../img/registerGuide-banner.jpg")} alt="" className="banner-img responsive"/>
                    <div className="register-form">
                        <Field
                            label=""
                            type="text"
                            placeholder="请输入您的手机号码"
                            value={loginName}
                            ref="loginName"
                            onChange={this._handleFieldValueChange.bind(null,"loginName")}
                        />
                        <Field
                            label=""
                            type="text"
                            placeholder="请设置登录密码"
                            value={password}
                            ref="password"
                            onChange={this._handleFieldValueChange.bind(null,"password")}
                        />
                        <div className="registerAgreement">
                            <Field
                                type="checkbox"
                                defaultChecked={isAgreeWithAgreement}
                                onChange={this._handleToggleCheck}
                            />
                            同意
                            <Link to="home">《农泰金融注册服务协议》</Link>
                        </div>
                        <Grid collapse={true}>
                            <Col cols={4}>
                                <Field
                                    label=""
                                    type="text"
                                    placeholder="请输入图形验证码"
                                    value={imgVerifyCode}
                                    ref="imgVerifyCode"
                                    onChange={this._handleFieldValueChange.bind(null,"imgVerifyCode")}
                                />
                            </Col>
                            <Col cols={2} >
                                <div onClick={this._changeVerifyCodeImg} className="verifyCodeImg-wrapper">
                                    {
                                        randomVerifyCode.map(function(item,index){
                                            return (
                                                <span key={index}>{item}</span>
                                            )
                                        })
                                    }
                                </div>
                            </Col>
                        </Grid>
                        <Button block amStyle="warning" radius id="registerBtn" onClick={this._submitRegisterForm}>注册领红包</Button>
                    </div>
                    <div className="footBg-wrapper">
                        <img src={require("../../img/clouds.png")} alt="" className="responsive"/>
                    </div>
                </Group>
                <Group className="ntShortIntroduction">
                    <div className="title text-center">谁是农泰金融</div>
                    <div className="content">
                        深圳农泰金融服务有限公司是在国家大力推动互联网金融的大政策背景下，由上市公司诺普信(股票代码：002215)战略投资成立的互联网金融企业。农泰金融也是诺普信继田田圈、农集网之后，为深耕农业市场精心打造和布局的又一家旗舰企业。公司专注于中国农业产业链金融领域，致力于为大三农产业链上的各相关方提供资金支持。
                    </div>
                    <div className="subtitle text-center"><span>平台交易额</span><br/><strong>{totalAmountOfInvestment}元</strong></div>
                    <div className="subtitle text-center"><span>注册人数</span><br/><strong>{registerUserCount}人</strong></div>
                    <div className="footerBg-wrapper">
                        <img src={require("../../img/house.png")} alt="" className="responsive"/>
                    </div>
                </Group>
                <Group className="reasonOfChoosingNT">
                    <div className="title text-center">为什么选择农泰金融</div>
                    <ul>
                        <li>
                            <div><img src={require("../../img/item-bg1.png")} alt="" className="item-bg"/></div>
                            <div>
                                <div className="subtitle"><span>实力雄厚</span></div>
                                <div className="content">
                                    上市公司战略投资<br/>
                                    顶级合作伙伴保驾护航<br/>
                                    腾讯云、大禹网络安全…<br/>
                                </div>
                                <span className="down-triangle"></span>
                            </div>
                        </li>
                        <li>
                            <div>
                                <div className="subtitle"><span>安全保障</span></div>
                                <div className="content">
                                    千万风险保证金用户保障计划<br/>
                                    完善的担保措施<br/>
                                    国内顶级律师事务所提供法律支持<br/>
                                </div>
                            </div>
                            <div>
                                <img src={require("../../img/item-bg2.png")} alt="" className="item-bg"/>
                                <span className="down-triangle"></span>
                            </div>
                        </li>
                        <li>
                            <div><img src={require("../../img/item-bg3.png")} alt="" className="item-bg"/></div>
                            <div>
                                <div className="subtitle"><span>资金第三方存管</span></div>
                                <div className="content">
                                    农泰金融不接触任何用户资金<br/>
                                    所有项目资金专款专用<br/>
                                    <span className="down-triangle"></span>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div>
                                <div className="subtitle"><span>风控技术先进</span></div>
                                <div className="content">
                                    农资行业20年交易大数据<br/>
                                    所有借款项目实地考察<br/>
                                    8道严格风控程序<br/>
                                    贷后资金用途全程掌控<br/>
                                    <span className="down-triangle"></span>
                                </div>
                            </div>
                            <div>
                                <img src={require("../../img/item-bg4.png")} alt="" className="item-bg"/>
                            </div>
                        </li>
                        <li>
                            <div><img src={require("../../img/item-bg5.png")} alt="" className="item-bg"/></div>
                            <div>
                                <div className="subtitle"><span>行业顶尖团队</span></div>
                                <div className="content">
                                    国有大型商业银行高管<br/>
                                    国内一线互联网企业专职人才<br/>
                                    <span className="down-triangle"></span>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div>
                                <div className="subtitle"><span>深耕农业  实力助农</span></div>
                                <div className="content">
                                    覆盖28个省市1000多万亩耕地<br/>
                                    提供1700多笔融资服务<br/>
                                    帮助万名农民奔向幸福生活<br/>
                                    <span className="down-triangle"></span>
                                </div>
                            </div>
                            <div>
                                <img src={require("../../img/item-bg6.png")} alt="" className="item-bg"/>
                            </div>
                        </li>
                    </ul>
                </Group>
                <Group className="productIntroduction">
                    <div className="title text-center">农泰金融有些什么理财产品？</div>
                    <SliderWrapper sliderPageList={["新手标","天天赚","月月赚","季季赚","好采投"]} wrapperClassPrefix="PI-sliderImg-wrapper"/>
                    <div className="footerBg-wrapper">
                        <img src={require("../../img/monneybag.png")} alt="" className="responsive"/>
                    </div>
                </Group>
                <Group className="InvestmentGuide">
                    <div className="title text-center">如何开始投资？</div>
                    <SliderWrapper sliderPageList={["注册","认证","充值","投资"]} wrapperClassPrefix="IG-sliderImg-wrapper"/>
                    <div className="footer-wrapper">
                        <img src={require("../../img/huojian.png")} alt="" className="responsive"/>
                        <Button block radius onClick={this._getBackToTop}>注册去投资</Button>
                    </div>
                </Group>
            </Container>
        )
    },
    componentDidMount(){

        RegisterGuideAction.getInitialData();
        RegisterGuideAction.changeVerifyCodeImg();

        RegisterGuideStore.bind("change",function(){
            this.setState({
                data:RegisterGuideStore.getAll()
            })
        }.bind(this));

        RegisterGuideStore.bind("formCheckFailed",function(msg){
            Message.broadcast(msg);
        });

        RegisterGuideStore.bind("formCheckSuccess",function(msg){
            let {
                loginName,
                password,
                imgVerifyCode,
                }=RegisterGuideStore.getAll();
            this.context.router.push({
                pathname:"verifyCodeForRegisterGuide",
                query:{
                    loginName,
                    password,
                    imgVerifyCode
                }
            })
        }.bind(this));

    },
    componentWillUnmount(){
        RegisterGuideStore.clearAll();
    }
});

RegisterGuide.contextTypes = {
    router:React.PropTypes.object.isRequired
};

module.exports=RegisterGuide;
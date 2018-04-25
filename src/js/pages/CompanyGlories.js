import "../../scss/page/CompanyQualification.scss";
import React, { Component } from 'react';
import { Container, Slider } from "../UIComponents/index";

class CompanyGlories extends Component {
    render() {
        return (
            <Container id="companyGlories">
                <Slider autoPlay={false} controls={true} loop={false} interval={30 * 60 * 1000}>
                    <Slider.Item >
                        <div className="img-wrapper">
                            <img src={require("../../img/h1.png")} alt="" style={{ width: "7.625rem", margin: "0 auto" }} />
                            <div className="subtitle">2016互联网金融典范企业奖</div>
                        </div>
                    </Slider.Item>
                    <Slider.Item >
                        <div className="img-wrapper">
                            <img src={require("../../img/h2.jpg")} alt="" />
                            <div className="subtitle">2017中国最具投资价值企业</div>
                        </div>
                    </Slider.Item>
                    <Slider.Item >
                        <div className="img-wrapper">
                            <img src={require("../../img/h3.jpg")} alt="" />
                            <div className="subtitle">2016互联网金融诚信平台奖</div>
                        </div>
                    </Slider.Item>
                    <Slider.Item >
                        <div className="img-wrapper">
                            <img src={require("../../img/h4.jpg")} alt="" />
                            <div className="subtitle">2016年度农业金融服务创新平台</div>
                        </div>
                    </Slider.Item>
                </Slider>
            </Container>
        );
    }
    
    componentDidMount(){
        //鉴于在qqx5浏览器中，“content-wrapper”元素的高度并不能被css属性height:100%所撑开，故使用脚本来解决此兼容问题。
        let contentWrapperHeight = window.innerHeight - 38 + "px";
        let contentWrappers = document.getElementsByClassName("img-wrapper");
        for (let i = 0; i < contentWrappers.length; i++) {
            contentWrappers[i].style.height = contentWrapperHeight;
        }
    }

};

module.exports=CompanyGlories;
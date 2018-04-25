import "../../scss/page/CompanyQualification.scss";
import React, { Component } from 'react';
import { Container, Slider } from "../UIComponents/index";

class CompanyQualification extends Component {
    render() {
        return (
            <Container id="companyQualification">
                <Slider autoPlay={false} controls={true} loop={false} interval={30 * 60 * 1000}>
                    <Slider.Item >
                        <div className="img-wrapper">
                            <img src={require("../../img/q2.jpg")} alt="" />
                            <div className="subtitle">营业执照</div>
                        </div>

                    </Slider.Item>
                    <Slider.Item >
                        <div className="img-wrapper">
                            <img src={require("../../img/q1.jpg")} alt="" />
                            <div className="subtitle">信息安全等级保护证书</div>
                        </div>
                    </Slider.Item>
                    <Slider.Item >
                        <div className="img-wrapper">
                            <img src={require("../../img/q3.jpg")} alt="" />
                            <div className="subtitle">软件著作权证书</div>
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

module.exports=CompanyQualification;
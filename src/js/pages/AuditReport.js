import "../../scss/page/CompanyQualification.scss";
import React, { Component } from 'react';
import { Container, Slider } from "../UIComponents/index";

class AuditReport extends Component {
    render() {
        return (
            <Container id="auditReport" >
                <Slider autoPlay={false} controls={true} loop={false} interval={30 * 60 * 1000}>
                    <Slider.Item >
                        <div className="img-wrapper">
                            <img src={require("../../img/sj1.jpg")} alt="" />
                            <div className="subtitle">审计报告-图1</div>
                        </div>

                    </Slider.Item>
                    <Slider.Item >
                        <div className="img-wrapper">
                            <img src={require("../../img/sj2.jpg")} alt="" />
                            <div className="subtitle">审计报告-图2</div>
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

module.exports=AuditReport;
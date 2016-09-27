require("../../scss/page/AboutUs.scss");
import React from "react";

import Container from "../UIComponents/Container";

//使用了iframe嵌入了安卓，ios和微信共用的html页面
let AboutUs = React.createClass({
    render() {
        return (
            <div className="frame-wrapper">
                <iframe src="https://www.ntjrchina.com/appWeb/introduce.jsp" frameborder="0"></iframe>
            </div>
        );
    }
});

module.exports=AboutUs;
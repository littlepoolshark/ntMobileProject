require("../../scss/page/BannerPageWrapper.scss");
import React from "react";


//使用了iframe嵌入了安卓，ios和微信共用的html页面
let BannerPageWrapper = React.createClass({
    render() {
        let iframeSource=this.props.location.query.iframeSource;
        return (
            <div className="frame-wrapper" id="bannerPageWrapper">
                <iframe src={iframeSource} frameborder="0" width="100%" height="100%"></iframe>
            </div>
        );
    }
});

module.exports=BannerPageWrapper;
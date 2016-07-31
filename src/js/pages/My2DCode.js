require("../../scss/page/My2DCode.scss");
import React from "react";
import classNames from "classnames";

//ui component
import Container from "../UIComponents/Container";
import Button from "../UIComponents/Button";



let My2DCode=React.createClass({

    render(){

        return (
            <Container id="my2DCode"  scrollable={true}>
                <div className="my2DCodeImg-wrapper">
                    <div className="header">
                        <img src="/src/img/qr_bg_titlecolor.png" alt=""/>
                    </div>
                    <div className="body">
                        <img src="/src/img/qr_bg.png" alt="" className="code-img"/>
                        <img src="/src/img/qr_gold.png" alt="" className="bg-img"/>
                    </div>
                </div>
                <div className="buts-wrapper">
                    <Button amStyle="primary" block radius>分享给好友</Button>
                    <Button amStyle="warning" block radius>更多农泰金融成长历程</Button>
                </div>
            </Container>
        )
    },
    componentDidMount(){

    }
});

My2DCode.contextTypes = {
    router:React.PropTypes.object.isRequired
};

module.exports=My2DCode;
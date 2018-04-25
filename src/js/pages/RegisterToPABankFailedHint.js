require("../../scss/page/RegisterToPABankFailedHint.scss");
import React from "react";

//ui component
import Container from "../UIComponents/Container";
import Group from "../UIComponents/Group";
import Button from "../UIComponents/Button";
import NavBar from "../UIComponents/NavBar";

let RegisterToPABankFailedHint=React.createClass({
    _handleNavClick(){
        let beforeComponent=this.props.location.query.beforeComponent;
        this.context.router.push({
            pathname:beforeComponent ? beforeComponent : "home"
        });
    },
    render(){
        let leftNav= {
            component:"a",
            icon: 'left-nav',
            title: '返回'
        };
        return (
            <Container id="registerToPABankFailedHint">
                <NavBar
                    title="存管帮助提示"
                    leftNav={[leftNav]}
                    amStyle="primary"
                    onAction={this._handleNavClick}
                />
                <div className="wrapper">
                    <div className="failed-emotionIcon"></div>
                    <Group>
                        <div className="title text-center">您今天的开通次数已用完<br/>请明天再次提交！</div>
                        <div className="content text-center">
                            或拨打客服电话<em>400-6322-688</em>
                        </div>
                    </Group>
                    <a href="tel:4006322688" style={{display:"block"}}><Button block amStyle="primary" radius style={{marginTop:"1rem"}}>拨打客服电话</Button></a>
                </div>

            </Container>
        )
    }
});

RegisterToPABankFailedHint.contextTypes = {
    router:React.PropTypes.object.isRequired
};

module.exports=RegisterToPABankFailedHint;
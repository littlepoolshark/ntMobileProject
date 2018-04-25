require("../../scss/page/RegisterToZXFailedHint.scss");
import React from "react";

//ui component
import Container from "../UIComponents/Container";
import Group from "../UIComponents/Group";
import Button from "../UIComponents/Button";
import NavBar from "../UIComponents/NavBar";

let RegisterToZXFailedHint=React.createClass({
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
            <Container id="registerZXFailedHint">
                <NavBar
                    title="开通存管帮助"
                    leftNav={[leftNav]}
                    amStyle="primary"
                    onAction={this._handleNavClick}
                />
                <div className="wrapper">
                    <Group>
                        <div className="title text-center">您的开通次数已用完！</div>
                        <div className="content">
                            为了不影响使用，您当前仍可正常投资与提现；<br/>
                            不过，建议您拨打客服电话<em>400-6322-688</em>，在客服的帮助下开通存管子账户。
                        </div>
                    </Group>
                    <a href="tel:4006322688"><Button block amStyle="primary" radius style={{marginTop:"2rem"}}>拨打客服电话</Button></a>
                </div>

            </Container>
        )
    }
});

RegisterToZXFailedHint.contextTypes = {
    router:React.PropTypes.object.isRequired
};

module.exports=RegisterToZXFailedHint;
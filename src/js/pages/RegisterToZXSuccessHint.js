require("../../scss/page/RegisterToZXSuccessHint.scss");
import React from "react";

//ui component
import Container from "../UIComponents/Container";
import Group from "../UIComponents/Group";
import Button from "../UIComponents/Button";
import NavBar from "../UIComponents/NavBar";

let RegisterToZXSuccessHint=React.createClass({
    _handleNavClick(hadSetDealPassword){
        if(hadSetDealPassword === "false"){
            this.context.router.push({
                pathname:"setDealPassword",
                query:{
                    actionType:"setting",
                    beforeComponent:"registerToZXSuccessHint",
                    entryComponent:"home"
                }
            })
        }else {
            this.context.router.push({
                pathname:"home"
            });
        }
    },
    render(){
        let rightNav= {
            component:"a",
            title: '完成'
        };

        let hadSetDealPassword=this.props.location.query.hadSetDealPassword;

        return (
            <Container id="registerZXSuccessHint">
                <NavBar
                    title="开通成功"
                    rightNav={[rightNav]}
                    amStyle="primary"
                    onAction={this._handleNavClick.bind(null,hadSetDealPassword)}
                />
                <div className="wrapper">
                    <Group>
                        <div className="icon-wrapper text-center"><span className="big-success-icon"></span></div>
                        <div className="title text-center">成功开通存管子账户！</div>
                        <div className="content">您在饭米粒理财的资金将完全存放到您名下的银行存管子账户，今后您将享受银行级别资金安全保障!</div>
                    </Group>
                </div>

            </Container>
        )
    }
});

RegisterToZXSuccessHint.contextTypes = {
    router:React.PropTypes.object.isRequired
};

module.exports=RegisterToZXSuccessHint;
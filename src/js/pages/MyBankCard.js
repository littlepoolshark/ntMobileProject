require("../../scss/page/MyBankCard.scss");
import React from "react";
import { Link } from "react-router";

import Container from "../UIComponents/Container";
import Group from "../UIComponents/Group";
import Icon from "../UIComponents/Icon";
import Button from "../UIComponents/Button"

let NoBankCard=React.createClass({
    render(){
        return (
            <Link to="bindBankCard">
                <div className="noBankCard-wrapper" >
                    <Icon classPrefix="imgIcon" name="money-bag" />
                    <span className="subtitle">绑定银行卡，开启财富升值之旅</span>
                    <Button amStyle="default" block radius>
                        <Icon classPrefix="imgIcon" name="plus-icon" />
                        <span className="title">添加银行卡</span>
                    </Button>
                </div>
            </Link>
        )
    }
});

let HasBankCard=React.createClass({
    render(){
        return (
            <div>
                {/*<div className="deleteCard-hint">删卡审核中...</div>*/}
                <Link to="myBankCardDetail">
                    <div className="hasBankCard-wrapper">
                        <div className="header">
                            <Icon classPrefix="imgIcon" name="money-bag" className="bankLogo"/>
                            <span className="title">中国建设银行</span>
                            <Icon  name="right-nav"/>
                        </div>
                        <div className="body">
                            <span>6225</span>
                            <span>****</span>
                            <span>****</span>
                            <span>8789</span>
                        </div>
                    </div>
                </Link>
            </div>

        )
    }
});



let MyBankCard = React.createClass({
    render() {
        return (
            <Container id="myBankCard">
                <NoBankCard/>
            </Container>
        );
    }
});

module.exports=MyBankCard;
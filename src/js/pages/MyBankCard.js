require("../../scss/page/MyBankCard.scss");
let MyBankCardAction=require("../actions/MyBankCardAction");
let MyBankCardStore=require("../stores/MyBankCardStore");
import React from "react";
import { Link } from "react-router";
import className from "classnames";

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
    _renderCardNo(cardNo){
        let cardNo_start=cardNo.slice(0,4);
        let cardNo_end=cardNo.slice(-4);
        return (
            <div className="body">
                <span>{cardNo_start}</span>
                <span>****</span>
                <span>****</span>
                <span>{cardNo_end}</span>
            </div>
        )
    },
    _jumpToBankCardDetail(status){
        if(status === "on"){
            this.context.router.push({
                pathname:"myBankCardDetail"
            })
        }else {
            return false;
        }
    },
    render(){
        let {
            bankName,
            status,
            fullCardNo,
            shortIcon
            }=this.props;
        let classes=className({
            "hasBankCard-wrapper":true,
            disabled:status === "pending" ? true : false
        });
        return (
            <div>
                {
                    status === "pending" ?
                    (
                        <div className="deleteCard-hint">删卡审核中...</div>
                    )   :
                    null
                }
                <div className={classes} onClick={this._jumpToBankCardDetail.bind(null,status)}>
                    <div className="header">
                        <img src={shortIcon} alt=""/>
                        <span className="title">{bankName}</span>
                        <Icon  name="right-nav"/>
                    </div>
                    {
                        this._renderCardNo(fullCardNo)
                    }
                </div>
            </div>

        )
    }
});

HasBankCard.contextTypes = {
    router:React.PropTypes.object.isRequired
};



let MyBankCard = React.createClass({
    getInitialState(){
        return {
            bankCardInfo:MyBankCardStore.getAll()
        }
    },
    render() {
        console.log(this.state.bankCardInfo === null || !!!this.state.bankCardInfo.id);
        return (
            <Container id="myBankCard">
                {
                    (this.state.bankCardInfo === null || !!!this.state.bankCardInfo.id) ?
                    <NoBankCard /> :
                    <HasBankCard {...this.state.bankCardInfo}/>
                }
            </Container>
        );
    },
    componentDidMount(){
        MyBankCardAction.getMyBankCardDetail();

        MyBankCardStore.bind("change",function(){
            this.setState({
                bankCardInfo:MyBankCardStore.getAll()
            })
        }.bind(this));
    }
});

module.exports=MyBankCard;
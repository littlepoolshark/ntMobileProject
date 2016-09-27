require("../../scss/page/MyBankCard.scss");
let MyBankCardAction=require("../actions/MyBankCardAction");
let MyBankCardStore=require("../stores/MyBankCardStore");
import React from "react";
/*import { Link } from "react-router";*/
import className from "classnames";

import Container from "../UIComponents/Container";
import Group from "../UIComponents/Group";
import Icon from "../UIComponents/Icon";
import Button from "../UIComponents/Button";
import Modal from "../UIComponents/modal/Modal";
import NavBar from "../UIComponents/NavBar";

let NoBankCard=React.createClass({
    _addBankCard(){
        MyBankCardAction.addBankCard();
    },
    render(){
        return (
            <div className="noBankCard-wrapper" onClick={this._addBankCard}>
                <Icon classPrefix="imgIcon" name="money-bag" />
                <span className="subtitle">绑定银行卡，开启财富升值之旅</span>
                <Button amStyle="default" block radius>
                    <Icon classPrefix="imgIcon" name="plus-icon" />
                    <span className="title">添加银行卡</span>
                </Button>
            </div>
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
                        <img src={shortIcon} alt="" style={{width:"40px",height:"auto"}}/>
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
            bankCardInfo:MyBankCardStore.getAll(),
            isModalOpen:false
        }
    },
    _jumpToNextLocation(confirm){
        if(confirm){
            this.context.router.push({
                pathname:"realNameAuthentication"
            });
        }else {
            this._handleCloseModal();
        }
    },
    _handleCloseModal(){
        this.setState({
            isModalOpen:false
        });
    },
    _handleNavClick(obj){
        this.context.router.push({
            pathname:"userHome"
        });
    },
    render() {
        let leftNav= {
            component:"a",
            icon: 'left-nav',
            title: '返回'
        };
        return (
            <Container id="myBankCard">
                <NavBar
                    title="我的银行卡"
                    leftNav={[leftNav]}
                    amStyle="primary"
                    onAction={this._handleNavClick}
                />
                {
                    (this.state.bankCardInfo === null || !!!this.state.bankCardInfo.id) ?
                    <NoBankCard /> :
                    <HasBankCard {...this.state.bankCardInfo}/>
                }

                <Modal
                    title="提示"
                    ref="modal"
                    isOpen={this.state.isModalOpen}
                    role="confirm"
                    onAction={this._jumpToNextLocation}
                >
                    为了保障您的资金安全，请先去实名认证！
                </Modal>
            </Container>
        );
    },
    componentDidMount(){
        MyBankCardAction.getMyBankCardDetail();
        MyBankCardAction.getUserAccountInfo();

        MyBankCardStore.bind("change",function(){
            this.setState({
                bankCardInfo:MyBankCardStore.getAll()
            })
        }.bind(this));

        MyBankCardStore.bind("BindCardCheckSuccess",function(){
            this.context.router.push({
                pathname:"bindBankCard",
                query:{
                    realName:MyBankCardStore.getAll().realName
                }
            })
        }.bind(this));

        MyBankCardStore.bind("BindCardCheckFailed",function(){
            this.setState({
                isModalOpen:true
            })
        }.bind(this));
    },
    componentWillUnmount(){
        MyBankCardStore.clearAll();
    }
});

MyBankCard.contextTypes = {
    router:React.PropTypes.object.isRequired
};

module.exports=MyBankCard;
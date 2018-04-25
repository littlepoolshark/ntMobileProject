require("../../scss/page/BindBankCard.scss");
var BindBankCardAction=require("../actions/BindBankCardAction.js");
var BindBankCardStore=require("../stores/BindBankCardStore.js");

import React from "react";
import {
    Link
} from 'react-router';

//ui component
import Container from "../UIComponents/Container";
import Button from "../UIComponents/Button";
import Field from "../UIComponents/Field";
import List from "../UIComponents/List";
import Icon from "../UIComponents/Icon";
import Modal from "../UIComponents/modal/Modal";
import Group from "../UIComponents/Group";
import Message from "../UIComponents/Message";
import NavBar from "../UIComponents/NavBar";


//银行卡绑定页面:BindBankCard component
let BindBankCard=React.createClass({
    getInitialState(){
        let modalInnerText="";
        let beforeActionNameMap={
            "realNameAuthentication":"您已完成实名认证",
            "setDealPassword":"您已设置交易密码",
            "skipRegisteringZX":"为了不影响您的投资过程",
            "userHome":"为了不影响您的投资过程",
            "myBankCard":"为了不影响您的投资过程",
            "securityCenter":"为了不影响您的投资过程"
        };
        let beforeComponent=this.props.location.query.beforeComponent;
        let hadBeforeAction=false;
        if(beforeComponent && beforeActionNameMap.hasOwnProperty(beforeComponent)){
            hadBeforeAction=true;
            modalInnerText=<div>{beforeActionNameMap[beforeComponent]},<br/>现在绑定银行卡？</div>;
        }

        return {
            bankCardInfo:BindBankCardStore.getAll(),
            isModalOpen:hadBeforeAction,
            modalRole:"alert",
            modalInnerText:modalInnerText,
            modalType:1
        }
    },
    _jumpToNextLocation(){
        if(this.state.modalType === 3){
            this.context.router.push({
                pathname:"myBankCard"
            });
        }
    },
    _handleModalClose(){
        this.setState({
           isModalOpen:false
        });
    },
    _submitBankCardForm(){
        BindBankCardAction.submitBankCardForm();
    },
    _handleQuestionMarkClick(){
        this.setState({
            isModalOpen:true,
            modalRole:"alert",
            modalInnerText:"为了资金安全，只允许绑定实名认证用户名下的银行卡!",
            modalType:2
        });
    },
    _handleCardNoChange(){
        let cardNo=this.refs.cardNo.getValue();
        //这段正则表达式能过滤非空格的字符，也能满足四个数字为一段的格式化要求
        cardNo=cardNo.replace(/\s/g,'').replace(/\D/g,'').replace(/(\d{4})(?=\d)/g,"$1 ");
        //cardNo=cardNo.replace(/\D/g,"");
        BindBankCardAction.changeCardNo(cardNo);
    },
    _jumpToSelectBankCard(){
        let entryComponent=this.props.location.query.entryComponent;
        let queryData=BindBankCardStore.getAll();
        queryData.beforeComponent="bindBankCard";
        queryData.entryComponent=entryComponent;
        this.context.router.push({
           pathname:"bankCardList",
           query:queryData
        });
    },
    _handleNavBack(){
        let entryComponent=this.props.location.query.entryComponent;
        if(entryComponent){
            this.context.router.push({
                pathname:entryComponent
            })
        }else {
            this.context.router.goBack();
        }
    },
    render (){

        let {
            bankName,
            realName,
            cardNo
            }=this.state.bankCardInfo;

        let backNav = {
            component:"a",
            icon: 'left-nav',
            title: '返回'
        };

        return (
            <Container srcollable={true} id="bindBankCard">
                <NavBar
                    title="添加银行卡"
                    leftNav={[backNav]}
                    amStyle="primary"
                    onAction={this._handleNavBack}
                />
                <Group
                    header="添加银行卡信息"
                    noPadded
                >
                    <List>
                        <List.Item
                            nested="input"
                        >
                            <Field
                                label="开户名"
                                placeholder="请输入开户名"
                                inputAfter={(<Icon name="questionMark" classPrefix="imgIcon" onClick={this._handleQuestionMarkClick}/>)}
                                value={decodeURI(realName)}
                                readOnly
                            />
                        </List.Item>
                        <List.Item
                            nested="input"
                            onClick={this._jumpToSelectBankCard}
                        >
                            <Field
                                label="开户行"
                                placeholder="请选择开户行"
                                inputAfter={(
                                        <Icon name="right-nav" style={{fontSize:"20px",color:"#c2c2c2"}} />
                                )}
                                readOnly
                                value={bankName}
                            />
                        </List.Item>
                        <List.Item
                            nested="input"
                        >
                            <Field
                                label="银行卡号"
                                placeholder="请输入开户银行卡号"
                                ref="cardNo"
                                value={cardNo}
                                onChange={this._handleCardNoChange}
                            />
                        </List.Item>
                    </List>
                </Group>
                <div className="warm-hint">
                    <Icon classPrefix="imgIcon" name="attention"/>
                    <span>银行卡一经绑定，将不可随意修改</span>
                </div>
                <div className="" style={{padding:"0 0.9375rem",marginTop:"2rem"}}>
                    <Button amStyle="primary" block radius={true} onClick={this._submitBankCardForm}>完成绑定</Button>
                </div>
                <Modal
                    title="提示"
                    ref="modal"
                    isOpen={this.state.isModalOpen}
                    role={this.state.modalRole}
                    onDismiss={this._handleModalClose}
                    onClosed={this._jumpToNextLocation}
                >
                    {this.state.modalInnerText}
                </Modal>
            </Container>
        )
    },
    componentDidMount(){
        let query=this.props.location.query;
        if(query.hasOwnProperty("realName")){
            query.realName=decodeURI(query.realName);
        }
        BindBankCardAction.getInitialDataFromLocation(query);


        BindBankCardStore.bind("change",function(){
            this.setState({
                bankCardInfo:BindBankCardStore.getAll()
            })
        }.bind(this));

        BindBankCardStore.bind("bindBankCardSuccess",function(){
           this.setState({
               isModalOpen:true,
               modalRole:"alert",
               modalInnerText:"绑定银行卡成功!",
               modalType:3
           })
        }.bind(this));

        BindBankCardStore.bind("bindBankCardFailed",function(msg){
            Message.broadcast(msg);
        });

        /*BindBankCardStore.bind("idCardVerifiedCheckFailed",function(){
            this.setState({
                 isModalOpen:true,
                 modalRole:"confirm",
                 modalInnerText:"您还没实名认证，去认证？"
            });
        }.bind(this));*/
    }
});

BindBankCard.contextTypes = {
    router:React.PropTypes.object.isRequired
};

module.exports=BindBankCard;
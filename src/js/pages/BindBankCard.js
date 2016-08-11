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

//银行卡绑定页面:BindBankCard component
let BindBankCard=React.createClass({
    getInitialState(){
        return {
            bankCardInfo:BindBankCardStore.getAll(),
            isModalOpen:false,
            modalRole:"confirm",
            modalContextText:""
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
    _submitBankCardForm(){
        let cardNo=this.refs.cardNo.getValue();
        BindBankCardAction.submitBankCardForm(cardNo);
    },
    _handleQuestionMarkClick(){
        this.setState({
            isModalOpen:true,
            modalRole:"alert",
            modalContextText:"为了资金安全，只允许绑定实名认证用户名下的银行卡!"
        });
    },
    _jumpToSelectBankCard(){
        this.context.router.push({
           pathname:"bankCardList"
        });
    },
    render (){

        let {
            bankName,
            userName
            }=this.state.bankCardInfo;
        return (
            <Container srcollable={true}>
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
                                value={userName}
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
                            />
                        </List.Item>
                    </List>
                </Group>
                <div className="" style={{padding:"0 0.9375rem",marginTop:"2rem"}}>
                    <Button amStyle="primary" block radius={true} onClick={this._submitBankCardForm}>完成绑定</Button>
                </div>
                <Modal
                    title="提示"
                    ref="modal"
                    isOpen={this.state.isModalOpen}
                    role={this.state.modalRole}
                    onAction={this._jumpToNextLocation}
                >
                    {this.state.modalContextText}
                </Modal>
            </Container>
        )
    },
    componentDidMount(){
        let userName=this.props.location.query.realName;
        if(userName){
            BindBankCardAction.getUserNameFromLocation(userName);
        }

        BindBankCardStore.bind("change",function(){
            this.setState({
                bankCardInfo:BindBankCardStore.getAll()
            })
        }.bind(this));

        BindBankCardStore.bind("bindBankCardSuccess",function(){
            Message.broadcast("绑卡成功！");
        });

        BindBankCardStore.bind("bindBankCardFailed",function(msg){
            Message.broadcast(msg);
        });

        BindBankCardStore.bind("idCardVerifiedCheckFailed",function(){
            this.setState({
                 isModalOpen:true,
                 modalRole:"confirm",
                 modalContextText:"您还没实名认证，去认证？"
            });
        }.bind(this));
    }
});

BindBankCard.contextTypes = {
    router:React.PropTypes.object.isRequired
};

module.exports=BindBankCard;
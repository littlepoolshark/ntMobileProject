import React from "react";
require("../../scss/page/ExchangeCoupon.scss");
let ExchangeCouponAction=require("../actions/ExchangeCouponAction");
let ExchangeCouponStore=require("../stores/ExchangeCouponStore");

import Container from "../UIComponents/Container";
import Button from "../UIComponents/Button";
import Field from "../UIComponents/Field";
import Group from "../UIComponents/Group";
import List from "../UIComponents/List";
import Message from "../UIComponents/Message";
import Modal from "../UIComponents/modal/Modal";

let ExchangeCoupon=React.createClass({
    getInitialState(){
        return {
            data:ExchangeCouponStore.getAll(),
            isModalOpen:false,
            modalInnerText:"",
            exchangeCouponSuccess:false
        };
    },
    _handleModalClose(){
        this.setState({
            isModalOpen:false,
            data:{
                exchangeCode:""
            }
        });
    },
    _handleModalOpen(modalInnerText,exchangeCouponSuccess){
        this.setState({
            isModalOpen:true,
            modalInnerText,
            exchangeCouponSuccess:exchangeCouponSuccess
        });
    },
    _handleExchangeCodeChange(){
        let exchangeCode=this.refs.exchangeCode.getValue();
        ExchangeCouponAction.changeExchangeCode(exchangeCode);
    },
    _jumpToNextLocation(){
        if(this.state.exchangeCouponSuccess){
            this.context.router.goBack();
        }
    },
    _submitExchangeCode(){
        ExchangeCouponAction.submitExchangeCode();
    },
    render(){
        return (
            <Container id="exchangeCoupon">
                <Group
                    noPadded
                >
                    <List>
                        <List.Item
                            nested="input"
                        >
                            <Field
                                label={null}
                                placeholder="请输入你的兑换码"
                                value={this.state.data.exchangeCode}
                                onChange={this._handleExchangeCodeChange}
                                ref="exchangeCode"
                            />
                        </List.Item>
                    </List>
                </Group>
                <div className="btn-wrapper">
                    <Button amStyle="primary" block radius onClick={this._submitExchangeCode}>立即兑换</Button>
                </div>
                <div className="warm-hint-text text-center">
                    兑换码将不定期在各个渠道发放，敬请关注！
                </div>
                <Modal
                    isOpen={this.state.isModalOpen}
                    role="alert"
                    onDismiss={this._handleModalClose}
                    onClosed={this._jumpToNextLocation}
                >
                    {this.state.modalInnerText}
                </Modal>
            </Container>
        )
    },
    componentDidMount(){
        ExchangeCouponStore.bind("change",function(){
            this.setState({
                data:ExchangeCouponStore.getAll()
            });
        }.bind(this));

        ExchangeCouponStore.bind("formCheckFailed",function(msg){
            Message.broadcast(msg);
        });

        ExchangeCouponStore.bind("exchangeCodeSubmitSuccess",function(msg){
            this._handleModalOpen(msg,true);
        }.bind(this));

        ExchangeCouponStore.bind("exchangeCodeSubmitFailed",function(msg){
            this._handleModalOpen(msg,false);
        }.bind(this));
    },
    componentWillUnmount(){
        ExchangeCouponStore.clearAll();
    }
});

ExchangeCoupon.contextTypes = {
    router:React.PropTypes.object.isRequired
};

module.exports=ExchangeCoupon;
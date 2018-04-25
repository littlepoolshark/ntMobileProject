require("../../scss/page/RealNameAuthentication.scss");
let RealNameAuthenticationAction=require("../actions/RealNameAuthenticationAction.js");
let RealNameAuthenticationStore=require("../stores/RealNameAuthenticationStore.js");

import React from "react";
import classNames from 'classnames';

import Container from "../UIComponents/Container";
import Button from "../UIComponents/Button";
import Field from "../UIComponents/Field";
import List from "../UIComponents/List";
import Group from "../UIComponents/Group";
import Modal from "../UIComponents/modal/Modal";
import Message from "../UIComponents/Message";
import Icon from "../UIComponents/Icon";
import NavBar from "../UIComponents/NavBar";


//设置新的登录密码页面
let RealNameAuthentication=React.createClass({
    getInitialState(){
        let entryComponent=this.props.location.query.entryComponent;
        return {
            isModalOpen:entryComponent === "securityCenter" ?  false : true,
            modalInnerText:(<div>为了不影响您的投资过程<br/>请先完成实名认证！</div>),
            modalType:1 //1：代表是提示用户进行实名认证的modal，2:代表提示用户实名认证成功的modal
        }
    },
    _submitAuthenticationForm(){
        let realName=encodeURI(this.refs.userRealName.getValue());
        let idCardNo=this.refs.idCardNo.getValue();
        RealNameAuthenticationAction.submitAuthenticationForm(realName,idCardNo);
    },
    _jumpToNextLocation(){
        if(this.state.modalType === 2){
            this.context.router.goBack();
        }
    },
    _handleModalClose(){
        this.setState({
            isModalOpen:false
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
            idcard,
            realName
            }=this.props.location.query;
        let backNav = {
            component:"a",
            icon: 'left-nav',
            title: '返回'
        };

        return (
            <Container  {...this.props} scrollable={false} id="realNameAuthentication">
                <NavBar
                    title="实名认证"
                    leftNav={[backNav]}
                    amStyle="primary"
                    onAction={this._handleNavBack}
                />
                <Group
                    header=""
                    noPadded
                    style={{marginBottom:0}}
                >
                    <List>

                        <List.Item nested="input">
                            <Field
                                type="text"
                                label="姓名"
                                placeholder="请输入您的真实姓名"
                                ref="userRealName"
                                defaultValue={realName ? realName : ""}
                                readOnly={realName ? true : false}
                            />
                        </List.Item>

                        <List.Item nested="input">
                            <Field
                                type="text"
                                label="身份证"
                                placeholder="请输入二代身份证号码"
                                ref="idCardNo"
                                defaultValue={idcard ? idcard : ""}
                                readOnly={idcard ? true : false}
                            />
                        </List.Item>
                    </List>
                </Group>
                {
                    !!this.props.location.query.idcard ?
                    null   :
                    (
                        <div className="warm-hint" >
                            <Icon classPrefix="imgIcon" name="attention"/>
                            <span>一经实名认证，便不可修改！</span>
                        </div>
                    )
                }

                {
                    !!this.props.location.query.idcard ?
                    null   :
                    (
                        <div className="" style={{padding:"0 0.9375rem",marginTop:"2rem"}}>
                            <Button amStyle="primary" block radius={true} onClick={this._submitAuthenticationForm}>完成认证</Button>
                        </div>
                    )
                }

                <Modal
                    ref="modal"
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
        RealNameAuthenticationAction.getInitialData();

        RealNameAuthenticationStore.bind("authenticateSuccess",function(){//实名认证之后的引导用户去设置交易密码或者绑卡
            let {
                realName,
                hadBindBankCard,
                hadSetDealPassword
                }=RealNameAuthenticationStore.getAll();

            let entryComponent=this.props.location.query.entryComponent;

            if( entryComponent === "securityCenter"){
                this.context.router.push({
                    pathname:"securityCenter"
                });
                return;
            }

            if(!hadSetDealPassword){
                this.context.router.push({
                    pathname:"setDealPassword",
                    query:{
                        actionType:"setting",
                        beforeComponent:"realNameAuthentication",
                        entryComponent:entryComponent ? entryComponent : ""
                    }
                });
            }else if(!hadBindBankCard){
                this.context.router.push({
                    pathname:"bindBankCard",
                    query:{
                        realName:encodeURI(realName),
                        beforeComponent:"realNameAuthentication",
                        entryComponent:entryComponent ? entryComponent : ""
                    }
                });
            }else {
                this.setState({
                    isModalOpen:true,
                    modalInnerText:"实名认证成功！",
                    modalType:2
                });
            }
        }.bind(this));


        RealNameAuthenticationStore.bind("authenticateFailed",function(msg){
            Message.broadcast(msg);
        }.bind(this));
    }
});

RealNameAuthentication.contextTypes = {
    router:React.PropTypes.object.isRequired
};

module.exports=RealNameAuthentication;
require("../../scss/page/UserHome.scss");
let UserHomeAction=require("../actions/UserHomeAction.js");
let UserHomeStore=require("../stores/UserHomeStore.js");
import React from "react";
import {
    Link
} from 'react-router';

import Container from "../UIComponents/Container";
import Button from "../UIComponents/Button";
import Group from "../UIComponents/Group";
import Grid from "../UIComponents/Grid";
import Col from "../UIComponents/Col";
import Icon from "../UIComponents/Icon";
import List from "../UIComponents/List";
import Modal from "../UIComponents/modal/Modal";


//用户中心页面：UserHome component
let UserHome=React.createClass({
    getInitialState(){
        return {
            data:UserHomeStore.getAll(),
            ishowData:true,
            isModalOpen:false,
            confirmText:"",
            nextLocation:""
        }
    },
    _toggleShowData(event){
          event.stopPropagation();
          this.setState({
              ishowData:!this.state.ishowData
          });
    },
    _jumpToNextLocation(confirm){
        if(confirm){
            let locationData={
                pathname:this.state.nextLocation,
                query:{}
            }
            if(this.state.nextLocation === "bindBankCard"){
                locationData.query.realName=UserHomeStore.getAll().personInfo.realName;
            }
            this.context.router.push(locationData);
        }else {
            this._handleModalClose();
        }

    },
    _jumpToTotalAccount(){
        this.context.router.push({
           pathname:"totalAccountDetail"
        });
    },
    _handleModalClose(){
        this.setState({
            isModalOpen:false
        });
    },
    _handleRecharge(){
        UserHomeAction.recharge();
    },
    _handleWithdraw(){
        UserHomeAction.withdraw();
    },
    _jumpToAppSetting(){
        this.context.router.push({
            pathname:"appSetting"
        });
    },
    render(){
        let {
            total,
            totalProfit,
            available,
            hqAmount,
            dqAmount,
            hcCount,
            tikectCount,
            }=this.state.data;
        let ishowData=this.state.ishowData;
        return (
            <Container scrollable={true} id="userHome">
                <div className="dashboard">
                    <div className="header cf">
                        <Link className="message-icon-wrapper fl" to="messageList" >
                            <Icon  classPrefix="imgIcon" name="message"  />
                        </Link>

                        <Button  hollow radius onClick={this._handleRecharge} className="fr">充值</Button>
                        <Button  hollow radius onClick={this._handleWithdraw} className="fr">提现</Button>
                    </div>
                    <div onClick={this._jumpToTotalAccount}>
                        <div className="text-center subtitle" style={{marginTop:"20px"}}>
                            <span className="data-eye-wrapper">
                                总资产(元)
                                <Icon classPrefix="imgIcon" name={ishowData ? "white-eye-on" : "white-eye-off"} onClick={this._toggleShowData}/>
                            </span>
                        </div>
                        <div className="text-center" style={{lineHeight:1}}>
                            <strong className="amount">{ishowData ? total : "****"}</strong>
                        </div>
                    </div>
                    <Grid  className="sub-dashboard" style={{marginTop:"20px"}} >
                        <Col cols={3}>
                            <div className="subtitle text-center">累计收益(元)</div>
                            <div className="amount text-center">{ishowData ? totalProfit : "****"}</div>
                        </Col>
                        <Col cols={3}>
                            <div className="subtitle text-center">可用余额(元)</div>
                            <div className="amount text-center">{ishowData ? available : "****"}</div>
                        </Col>
                    </Grid>
                </div>
                <Group noPadded={true} className="investmentRecord-entry">
                    <Grid>
                        <Col cols={2} className="investmentRecord-entry-item">
                            <Link to="dailyEarnCenter">
                                <Icon classPrefix="imgIcon" name="folder"/>
                                <span className="title">灵活理财</span>
                                <span className="subtitle">{ishowData ? hqAmount : "****"}</span>
                            </Link>
                        </Col>
                        <Col cols={2} className="investmentRecord-entry-item">
                            <Link to="fixedLoanCenter">
                                <Icon classPrefix="imgIcon" name="money-package"/>
                                <span className="title">定期理财</span>
                                <span className="subtitle">{ishowData ? dqAmount : "****"}</span>
                            </Link>
                        </Col>
                        <Col cols={2} className="investmentRecord-entry-item">
                            <Link to="RepaymentCalendar">
                                <Icon classPrefix="imgIcon" name="calendar"/>
                                <span className="title">回款日历</span>
                                <span className="subtitle">本月<strong>{hcCount}</strong>笔</span>
                            </Link>
                        </Col>
                    </Grid>
                </Group>

                <List>
                    <List.Item  href="#/couponList/?productType=all" title="优惠券" after={(<span><strong className="coupon-count">{tikectCount}</strong>张可用</span>)}/>
                    <List.Item  href="#/inviteReward" title="邀请有礼"/>
                </List>

                <List>
                    <List.Item  href="javascript:void(0)"  onClick={this._jumpToAppSetting} title="设置"/>
                </List>



                <Modal
                    title="提示"
                    ref="modal"
                    isOpen={this.state.isModalOpen}
                    role="confirm"
                    onAction={this._jumpToNextLocation}
                >
                    {this.state.confirmText}
                </Modal>
            </Container>
        )
    },
    componentDidMount(){
        UserHomeAction.getInitailDataFromServer();//获取页面显示所需要的数据
        UserHomeAction.getUserInfoDetail();//获取用户更加详细的数据，包括个人信息，账户信息，安全信息等。
        UserHomeAction.getBankCardInfo();//获取用户所绑定的银行卡的信息

        UserHomeStore.bind("change",function(){
            this.setState(UserHomeStore.getAll());
        }.bind(this));

        //银行卡已经绑定则跳转到充值页面/提现页面，否则调转到绑卡页面
        UserHomeStore.bind("rechargeCheckSuccess",function(){
            this.context.router.push({
                pathname:"recharge"
            });
        }.bind(this));

        UserHomeStore.bind("withdrawCheckSuccess",function(){
            this.context.router.push({
                pathname:"withdraw"
            });
        }.bind(this));

        UserHomeStore.bind("securityCheckFailed",function(){
            this.setState({
                isModalOpen:true,
                confirmText:"为了资金安全，请升级您的账户安全级别!",
                nextLocation:"securityCenter"
            })
        }.bind(this));

        UserHomeStore.bind("bankCardIsNotBind",function(){
            this.setState({
                isModalOpen:true,
                confirmText:"充值或者提现需要先绑定银行卡，去绑卡？",
                nextLocation:"bindBankCard"
            })
        }.bind(this));

        UserHomeStore.bind("bankCardIntegrityCheckFailed",function(){
            this.setState({
                isModalOpen:true,
                confirmText:"为了资金安全，提现需要完整的银行卡信息，去完善？",
                nextLocation:"myBankCardDetail"
            })
        }.bind(this));


    },
    componentWillUnmount(){
        UserHomeStore.unbind("change");
        UserHomeStore.unbind("bankCardIsBind");
        UserHomeStore.unbind("bankCardIsNotBind");
    }
});

UserHome.contextTypes = {
    router:React.PropTypes.object.isRequired
};

module.exports=UserHome;
require("../../scss/page/DailyEarnAppointment.scss");
let DailyEarnAppointmentStore=require("../stores/DailyEarnAppointmentStore");
let DailyEarnAppointmentAction=require("../actions/DailyEarnAppointmentAction");
import React from "react";

//ui component
import Group from "../UIComponents/Group";
import Container from "../UIComponents/Container";
import List from "../UIComponents/List";
import Field from "../UIComponents/Field";
import Button from "../UIComponents/Button";
import Message from "../UIComponents/Message";
import Modal from "../UIComponents/modal/Modal"

/*
 * @desc 天天赚预约页面
 *
 * @author sam liu
 * @date 2016-07-05
 */
let DailyEarnAppointment=React.createClass({
    getInitialState(){
        return {
            userInTotal:0,
            purchaseAmount:0,
            isModalOpen:false
        }
    },
    _handlePurchaseAmountChange(event){
        var purchaseAmount=parseInt(this.refs.appointmentAmount.getValue());
        purchaseAmount=isNaN(purchaseAmount) ? 0 : purchaseAmount;
        DailyEarnAppointmentAction.changeAppointmentAmount(purchaseAmount);
    },
    _confirmAppointment(){
        DailyEarnAppointmentAction.makeAnAppointment();
    },
    _useAllBalance(event){
        DailyEarnAppointmentAction.useAllBalance()
    },
    _jumpToNextLocation(confirm){

        if(confirm){//用户点击了“确定”按钮
            this.context.router.push({
                pathname:"myBankCard"
            });
        }else {//用户点击了“取消”按钮
            this.setState({
                isModalOpen:false
            });
        }
    },
    render(){
        let {
            userInTotal,
            purchaseMaximum,
            investMaximum,
            userBalance
            }=DailyEarnAppointmentStore.getAll();
        return (
            <Container id="dailyEarnAppointment" >
                <Group>
                    <div className="title">已购买金额：<strong>{userInTotal}</strong>元</div>
                    <div className="subtitle">个人投资限额：<strong>{investMaximum}</strong> 元(个人总限额：{purchaseMaximum}元)</div>
                </Group>

                <Group noPadded >
                    <div className="subtitle usableAmount"><span>账户余额：</span>{userBalance}元</div>
                    <List>
                        <List.Item nested="input">
                            <Field
                                type="text"
                                label="预约金额"
                                placeholder="请输入100的整数倍"
                                inputAfter={(<span className="useAll-btn" onClick={this._useAllBalance}>全余额</span>)}
                                ref="appointmentAmount"
                                onChange={this._handlePurchaseAmountChange}
                                value={this.state.purchaseAmount ? this.state.purchaseAmount : ""}
                            />
                        </List.Item>
                    </List>
                </Group>


                <div className="block-btn-wrapper">
                    <Button amStyle="primary" block radius onClick={this._confirmAppointment}>确认预约</Button>
                </div>

                <p className="warm-hint">
                    <span className="label">温馨提示：</span>
                    若您的预约资金在两日内未能成功排队购买天天赚，预约资金将返还至您的账户中。
                </p>

                <Modal
                    title=""
                    ref="modal"
                    isOpen={this.state.isModalOpen}
                    role="confirm"
                    onAction={this._jumpToNextLocation}
                >
                    您还未绑定银行卡，暂时不能预约。去绑卡？
                </Modal>
            </Container>
        )
    },
    componentDidMount(){
        //主要是获取用户的天天赚已购买金额
        let {
            productId,
            type,
            userBalance
            }=this.props.location.query;
        DailyEarnAppointmentAction.initializeStore({
            productId:productId,
            productType:type,
            userBalance:userBalance
        });

        DailyEarnAppointmentStore.bind("change",function(){
            this.setState({
                purchaseAmount:DailyEarnAppointmentStore.getAll().purchaseAmount,
                userInTotal:DailyEarnAppointmentStore.getAll().userInTotal
        })
        }.bind(this));

        DailyEarnAppointmentStore.bind("userBalanceIsNotEnough",function(msg){
            Message.broadcast(msg);
        });

        DailyEarnAppointmentStore.bind("appointmentSuccess",function(data){
           this.context.router.push({
               pathname:"/AppointmentSuccess",
               query:data
           })
        }.bind(this));

        DailyEarnAppointmentStore.bind("appointmentFailed",function(msg){
            Message.broadcast(msg);
        }.bind(this));

        DailyEarnAppointmentStore.bind("hadNotBindBankCard",function(){
            this.setState({
                isModalOpen:true
            })
        }.bind(this));
    },
    componentWillUnmount(){
        DailyEarnAppointmentStore.clearAll();
    }
});

DailyEarnAppointment.contextTypes = {
    router:React.PropTypes.object.isRequired
};

module.exports=DailyEarnAppointment;
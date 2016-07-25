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
            purchaseAmount:0
        }
    },
    _handlePurchaseAmountChange(event){
        var purchaseAmount=this.refs.purchaseAmount.getValue();
        purchaseAmount=purchaseAmount ? parseFloat(purchaseAmount) : 0;
        DailyEarnAppointmentAction.changePurchaseAmount(purchaseAmount);
    },
    _confirmAppointment(){
        DailyEarnAppointmentAction.makeAnAppointment();
    },
    render(){
        let {
            userInTotal,
            purchaseMaximum,
            investMaximum
            }=DailyEarnAppointmentStore.getAll();
        return (
            <Container id="dailyEarnAppointment" >
                <Group>
                    <div className="title">已购买金额：<strong>{userInTotal}</strong>元</div>
                    <div className="subtitle">个人投资限额：<strong>{investMaximum}</strong> 元(个人总限额：{purchaseMaximum}元)</div>
                </Group>

                <List>
                    <List.Item nested="input">
                        <Field
                            type="number"
                            label="预约金额"
                            placeholder="请输入100的整数倍"
                            ref="purchaseAmount"
                            onChange={this._handlePurchaseAmountChange}
                            value={this.state.purchaseAmount ? this.state.purchaseAmount : ""}
                        />
                    </List.Item>
                </List>

                <div className="block-btn-wrapper">
                    <Button amStyle="primary" block radius onClick={this._confirmAppointment}>确认预约</Button>
                </div>

                <p className="warm-hint">
                    <span className="label">温馨提示：</span>
                    若您的预约资金在两日内未能成功排队购买天天赚，预约资金将返还至您的账户中。
                </p>
            </Container>
        )
    },
    componentDidMount(){
        //主要是获取用户的天天赚已购买金额
        let {
            productId,
            type
            }=this.props.location.query;
        DailyEarnAppointmentAction.initializeStore({
            productId:productId,
            productType:type
        });

        DailyEarnAppointmentStore.bind("change",function(){
            this.setState({
                purchaseAmount:DailyEarnAppointmentStore.getAll().purchaseAmount,
                userInTotal:DailyEarnAppointmentStore.getAll().userInTotal
        })
        }.bind(this));


        DailyEarnAppointmentStore.bind("appointmentSuccess",function(data){
           this.context.router.push({
               pathname:"/AppointmentSuccess",
               query:data
           })
        }.bind(this));

        DailyEarnAppointmentStore.bind("appointmentFailed",function(msg){
            Message.broadcast(msg);
        }.bind(this));
    }
});

DailyEarnAppointment.contextTypes = {
    router:React.PropTypes.object.isRequired
};

module.exports=DailyEarnAppointment;
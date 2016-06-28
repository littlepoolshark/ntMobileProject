require("../../scss/page/DailyEarnAppointment.scss");
import React from "react";

//ui component
import Group from "../UIComponents/Group";
import Container from "../UIComponents/Container";
import List from "../UIComponents/List";
import Field from "../UIComponents/Field";
import Button from "../UIComponents/Button";

let DailyEarnAppointment=React.createClass({
    _confirmAppointment(){
        this.props.history.pushState(null,"/appointmentSuccess");
    },
    render(){
        return (
            <Container id="dailyEarnAppointment" >
                <Group>
                    <div className="title">已购买金额：<strong>2000.00</strong>元</div>
                    <div className="subtitle">个人投资限额：<strong>1000.00</strong> 元(个人总限额：100000元)</div>
                </Group>

                <List>
                    <List.Item nested="input">
                        <Field
                            type="number"
                            label="预约金额"
                            placeholder="请输入100的整数倍"
                            ref="purchaseAmount"
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
    }
});

export default  DailyEarnAppointment;
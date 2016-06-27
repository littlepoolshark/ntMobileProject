require("../../scss/page/EarnSetPayment.scss");
import React from "react";

//ui component
import Group from "../UIComponents/Group";
import List from "../UIComponents/List";
import Button from "../UIComponents/Button";
import Field from "../UIComponents/Field";
import Container from "../UIComponents/Container";

const CAN_USE_INTERESTRATE=["monthlyEarn","quarterlyEarn"];
const CAN_USE_REDPACKAGTE=["quarterlyEarn"];

let EarnSetPayment=React.createClass({
    _renderInvestmentLimit(type){
        if(type === "dailyEarn"){
            return (
                <div className="subtitle">
                    个人投资限额：<strong>10000</strong>元
                </div>
            )
        }else {
            return null;
        }
    },
    _renderInterestRate(type){
        if(CAN_USE_INTERESTRATE.indexOf(type) > -1){
            return (
                <List.Item href="#" after="查看" title="加息券" />
            )
        }else {
            return null;
        }
    },
    _renderExpectedReward(type){
        if(type !== "dailyEarn"){
            return (
                <div className="subtitle expectedReward" style={{paddingTop:"5px"}}>预期收益：<strong>1000.00</strong>元</div>
            )
        }
    },
    _renderRedPackage(type){
        if(CAN_USE_REDPACKAGTE.indexOf(type) > -1){
            return (
                <Group
                    header=""
                    noPadded
                >
                    <List>
                        <List.Item href="#" after="查看" title="红包" />
                    </List>
                </Group>
            )
        }else {
            return null;
        }
    },
    _pay(){
        this.props.history.pushState(null,"/purchaseSuccess/?type="+this.props.type);
    },
    render(){
        let type=this.props.location.query.type;
        console.log("type:",type);
        return (
            <Container id="earnSetPayment">
                <Group>
                    <h6 className="title">新手标</h6>
                    <div className="subtitle">
                        年华利率：<strong>9.5%</strong>
                    </div>
                    <div className="subtitle">
                        项目可投金额：<strong>10000</strong>元
                    </div>
                    {this._renderInvestmentLimit(type)}
                </Group>

                <Group
                    header=""
                    id="purchaseZone"
                    >
                    <div className="subtitle usableAmount">账户余额：1000.00元</div>
                    <List>
                        <List.Item
                            nested="input"
                            >
                            <Field
                                type="number"
                                label="投资金额"
                                placeholder="100元起投"
                                ref="purchaseAmount"
                                inputAfter={(<span className="useALL-btn">全余额</span>)}
                                >

                            </Field>

                        </List.Item>
                        {this._renderInterestRate(type)}
                    </List>
                    {this._renderExpectedReward(type)}
                </Group>

                {this._renderRedPackage(type)}

                <div style={{padding:"20px 15px"}}>
                    <Button amStyle="primary" block ={true} radius={true} onClick={this._pay}>确认支付</Button>
                </div>
            </Container>
        )
    }
});

export default  EarnSetPayment;
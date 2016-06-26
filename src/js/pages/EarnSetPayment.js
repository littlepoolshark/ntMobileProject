import React from "react";

//ui component
import Group from "../UIComponents/Group";
import List from "../UIComponents/List";
import Button from "../UIComponents/Button";
import Field from "../UIComponents/Field";

let EarnSetPayment=React.createClass({
    render(){
        return (
            <div>
                <Group>
                    <h6>新手标</h6>
                    <div>
                        <span className="subtitle">年华利率：</span>9.5%
                    </div>
                    <div>
                        <span className="subtitle">项目可购买金额：</span>10000元
                    </div>
                </Group>

                <Group
                    header=""
                    noPadded
                    >
                    <List>
                        <List.Item
                            nested="input"
                            >
                            <Field
                                type="number"
                                label="投资金额"
                                placeholder="100元起投"
                                ref="purchaseAmount"
                                inputAfter={(<span>全余额</span>)}
                                >

                            </Field>

                        </List.Item>
                    </List>
                </Group>

                <Group>
                    <div>
                        <span className="subtitle">账户余额：20000元</span>
                    </div>
                    <div>
                        <span className="subtitle">余额支付：</span>1000元
                    </div>
                </Group>

                <div style={{padding:"20px 15px"}}>
                    <Button amStyle="primary" block ={true} radius={true}>确认支付</Button>
                </div>
            </div>
        )
    }
});

export default  EarnSetPayment;
require("../../scss/page/DeleteBankCardConfirm.scss");
import React from "react";

import Container from "../UIComponents/Container";
import Group from "../UIComponents/Group";
import Button from "../UIComponents/Button";
import Grid from "../UIComponents/Grid";
import Col from "../UIComponents/Col";




let DeleteBankCardConfirm = React.createClass({
    render() {
        return (
            <Container id="deleteBankCardConfirm">
                <Group
                    header="请认真查看以下提示"
                    >
                    <p>1.删除银行卡必须经过农泰金融后台审核，审核周期将会在1-3个工作日，审核期间无法进行提现以及绑卡充值行为。</p>
                    <p>2.审核期间，农泰金融将依据大数据判断您的删卡行为，并可能致电您提供更详细的材料，请保持电话通畅。</p>
                    <p>3.如有任何疑问，请拨打<strong className="phoneNo">400-6322-688</strong>进行进一步了解。</p>
                </Group>
                <Grid className="btns-wrapper">
                    <Col cols={3}>
                        <Button block radius>取消</Button>
                    </Col>
                    <Col cols={3}>
                        <Button amStyle="primary" block radius>确认删除</Button>
                    </Col>
                </Grid>
            </Container>
        );
    }
});

module.exports=DeleteBankCardConfirm;
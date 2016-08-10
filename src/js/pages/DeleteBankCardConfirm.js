require("../../scss/page/DeleteBankCardConfirm.scss");
let DeleteBankCardConfirmAction=require("../actions/DeleteBankCardConfirmAction");
let DeleteBankCardConfirmStore=require("../stores/DeleteBankCardConfirmStore");
import React from "react";

import Container from "../UIComponents/Container";
import Group from "../UIComponents/Group";
import Button from "../UIComponents/Button";
import Grid from "../UIComponents/Grid";
import Col from "../UIComponents/Col";
import Field from "../UIComponents/Field";
import List from "../UIComponents/List";
import Message from "../UIComponents/Message";
import MobileVerificationCode from "../UIComponents/MobileVerificationCode";
import cookie from "../lib/cookie";




let DeleteBankCardConfirm = React.createClass({
    _jumpBack(){
        this.context.router.goBack();
    },
    _confirmToDelete(){
        let bankCardId=this.props.location.query.bankCardId;
        let verificationCode=this.refs.verificationCode.getValue();
        DeleteBankCardConfirmAction.confirmToDelete(bankCardId,verificationCode);
    },
    render() {
        let phoneNo=cookie.getCookie("phoneNo");
        return (
            <Container id="deleteBankCardConfirm">
                <Group
                    header="请认真查看以下提示"
                    >
                    <p>1.删除银行卡必须经过农泰金融后台审核，审核周期将会在1-3个工作日，审核期间无法进行提现以及绑卡充值行为。</p>
                    <p>2.审核期间，农泰金融将依据大数据判断您的删卡行为，并可能致电您提供更详细的材料，请保持电话通畅。</p>
                    <p>3.如有任何疑问，请拨打<strong className="phoneNo">400-6322-688</strong>进行进一步了解。</p>
                </Group>
                <List>
                    <List.Item
                        nested="input"
                    >
                        <Field
                            type="number"
                            label="验证码"
                            placeholder="请输入验证码"
                            ref="verificationCode"
                            inputAfter={ <MobileVerificationCode phoneNo={phoneNo} type={5}/>}
                        />
                    </List.Item>
                </List>
                <Grid className="btns-wrapper">
                    <Col cols={3}>
                        <Button block radius onClick={this._jumpBack}>取消</Button>
                    </Col>
                    <Col cols={3}>
                        <Button amStyle="primary" block radius onClick={this._confirmToDelete}>确认删除</Button>
                    </Col>
                </Grid>
            </Container>
        );
    },
    componentDidMount(){
        DeleteBankCardConfirmStore.bind("deleteBankCardApplySuccess",function(){
            this.context.router.push({
                pathname:"deleteCardApplySuccess"
            })
        }.bind(this));

        DeleteBankCardConfirmStore.bind("deleteBankCardApplyFailed",function(msg){
            Message.broadcast(msg);
        });
    }
});

DeleteBankCardConfirm.contextTypes = {
    router:React.PropTypes.object.isRequired
};

module.exports=DeleteBankCardConfirm;
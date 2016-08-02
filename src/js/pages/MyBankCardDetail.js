require("../../scss/page/MyBankCardDetail.scss");
//let MyBankCardDetailAction=require("../actions/MyBankCardDetailAction");
//let MyBankCardDetailStore=require("../stores/MyBankCardDetailStore");
import React from "react";
import {
    Link
} from 'react-router';

import Container from "../UIComponents/Container";
import Button from "../UIComponents/Button";
import Group from "../UIComponents/Group";
import Icon from "../UIComponents/Icon";
import List from "../UIComponents/List";
import Field from "../UIComponents/Field";
import NavBar from "../UIComponents/NavBar";

import BankCard from "./utilities/BankCard";


//设置中心页面：MyBankCardDetail component
let MyBankCardDetail=React.createClass({
    _handleNavDone (){
        this.context.router.push({
           pathname:"deleteBankCardConfirm"
        });
    },
    _submitBankCardForm(){
        this.context.router.push({
            pathname:"myBankCard"
        });
    },
    render(){
        let rightNav= {
            component:"a",
            title: "删除银行卡"
        };
        let bankCardInfo={
            bankName:"中国建设银行",
            shortIcon:"/src/img/choice_icon_ccb.png",
            cardno:"6225 **** **** 8789"
        }
        return (
            <Container scrollable={false} id="myBankCardDetail">
                <NavBar
                    title="银行卡详情"
                    rightNav={[rightNav]}
                    amStyle="primary"
                    onAction={this._handleNavDone}
                    />
                <BankCard {...bankCardInfo}/>
                <List>
                    <List.Item
                        nested="input"
                        >
                        <Field
                            label="开户省份"
                            placeholder="请输入"
                            inputAfter={(<Icon name="right-nav"/>)}
                            readOnly
                            />
                    </List.Item>
                    <List.Item
                        nested="input"
                        >
                        <Field
                            label="开户城市"
                            placeholder="请输入"
                            inputAfter={(<Icon name="right-nav"/>)}
                            readOnly
                            />
                    </List.Item>
                    <List.Item
                        nested="input"
                        >
                        <Field
                            label="开户城市"
                            placeholder="可以通过电话或者网上查询"
                            />
                    </List.Item>
                </List>


                <div className="block-btn-wrapper" style={{margin:"20px 15px"}}>
                    <Button amStyle="primary" block radius onClick={this._submitBankCardForm}>保存</Button>
                </div>

            </Container>
        )
    },
    componentDidMount(){

    }
});

MyBankCardDetail.contextTypes = {
    router:React.PropTypes.object.isRequired
};

module.exports=MyBankCardDetail;
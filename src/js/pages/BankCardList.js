require("../../scss/page/BankCardList.scss");
var BindBankCardAction=require("../actions/BindBankCardAction.js");
var BindBankCardStore=require("../stores/BindBankCardStore.js");
var BankCardListAction=require("../actions/BankCardListAction.js");
var BankCardListStore=require("../stores/BankCardListStore.js");
import React from "react";

//ui component
import Container from "../UIComponents/Container";
import Group from "../UIComponents/Group";
import List from "../UIComponents/List";

let BankCardList=React.createClass({
    getInitialState(){
        return {
            bankCardList:BankCardListStore.getAll()
        }
    },
    _handleSelectBankCard(bankId,bankName){
        BindBankCardAction.selectBankCard(bankId,bankName);
    },
    render(){

        return (
            <Container id="bankCardList"  scrollable={true}>
                <Group
                    header="目前支持的银行如下"
                    noPadded
                >
                    <List>
                        {
                            this.state.bankCardList.map((item, index) => {
                                return (
                                    <List.Item
                                        title={item.name}
                                        subTitle={"单笔限额"+item.singleLimit+"元，单日最高限额"+item.everydayLimit+"元"}
                                        media={<img src={item.shortIcon} className="bankCard-logo" alt=""/>}
                                        href="javascript:void(0)"
                                        key={item.id}
                                        onClick={this._handleSelectBankCard.bind(null,item.id,item.name)}
                                    />
                                );
                            })}
                    </List>
                </Group>
            </Container>
        )
    },
    componentDidMount(){
        BankCardListAction.getBankCardListFormServer();

        BankCardListStore.bind("change",function(){
            this.setState({
                bankCardList:BankCardListStore.getAll()
            })
        }.bind(this));

        BindBankCardStore.bind("bankCardSelectionFinished",function(){
            this.context.router.push({
                pathname:"bindBankCard"
            });
        }.bind(this));

    }
});

BankCardList.contextTypes = {
    router:React.PropTypes.object.isRequired
};

module.exports=BankCardList;
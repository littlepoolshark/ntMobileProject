require("../../scss/page/JournalAccount.scss");
//var BindBankCardAction=require("../actions/BindBankCardAction.js");
//var BindBankCardStore=require("../stores/BindBankCardStore.js");
//var JournalAccountAction=require("../actions/JournalAccountAction.js");
//var JournalAccountStore=require("../stores/JournalAccountStore.js");
import React from "react";

//ui component
import Container from "../UIComponents/Container";
import Group from "../UIComponents/Group";

let JournalAccountItem=React.createClass({
    render(){
        return (
            <li className="journalAccount-item">
                <div className="title">
                    <span className="amount">+10.73</span>
                    <span className="desc">天天利息结算</span>
                </div>
                <div className="subtitle">
                    <span className="date">2016-07-26 19:29:11</span>
                    <span className="available">可用余额2500000.93</span>
                </div>
            </li>
        )
    }
});

let JournalAccount=React.createClass({

    render(){

        return (
            <Container id="journalAccount"  scrollable={true}>
                <Group
                    noPadded
                    >
                    <ul className="journalAccount-list">
                        <JournalAccountItem />
                        <JournalAccountItem />
                        <JournalAccountItem />
                        <JournalAccountItem />
                        <JournalAccountItem />
                        <JournalAccountItem />
                        <JournalAccountItem />
                        <JournalAccountItem />
                        <JournalAccountItem />
                        <JournalAccountItem />
                        <JournalAccountItem />
                    </ul>
                </Group>
            </Container>
        )
    },
    componentDidMount(){

    }
});

JournalAccount.contextTypes = {
    router:React.PropTypes.object.isRequired
};

module.exports=JournalAccount;
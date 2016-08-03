require("../../scss/page/JournalAccount.scss");
var JournalAccountAction=require("../actions/JournalAccountAction.js");
var JournalAccountStore=require("../stores/JournalAccountStore.js");
import React from "react";

//ui component
import Container from "../UIComponents/Container";
import Group from "../UIComponents/Group";
import Loader from "../UIComponents/Loader";

import NoDataHint from "./utilities/NoDataHint";

let JournalAccountItem=React.createClass({
    render(){
        let {
            type,
            amount,
            happenTime,
            transTypeName,
            balance
            }=this.props;
        return (
            <li className="journalAccount-item">
                <div className="title">
                    <span className="amount">{type === "in" ? "+" : "-"}{amount}</span>
                    <span className="desc">{transTypeName}</span>
                </div>
                <div className="subtitle">
                    <span className="date">{happenTime}</span>
                    <span className="available">可用余额{balance}</span>
                </div>
            </li>
        )
    }
});

let JournalAccount=React.createClass({
    getInitialState(){
        return {
            journalAccountList:JournalAccountStore.getJournalAccountList(),
            isNoDataHintShow:false
        }
    },
    _handleScroll(){
        let journalAccount=document.getElementById("journalAccount");
        let offsetHeight=journalAccount.offsetHeight;//元素出现在视口中区域的高度
        let scrollTop=journalAccount.scrollTop;//元素已经滚动的距离
        let scrollHeight=journalAccount.scrollHeight;//元素总的内容高度

        if(scrollHeight - offsetHeight - scrollTop <= 3){
            JournalAccountAction.getNextPage();
            Loader.show();
        }
    },
    render(){
        let {
            journalAccountList,
            isNoDataHintShow
            }=this.state;
        return (
            <Container id="journalAccount"  scrollable={journalAccountList.length ? true : false} onScroll={this._handleScroll}>
                {
                    isNoDataHintShow ?
                    <NoDataHint />   :
                    <Group
                        noPadded
                    >
                        <ul className="journalAccount-list">
                            {
                                journalAccountList.map(function(item,index){
                                    return (
                                        <JournalAccountItem {...item} key={item.id}/>
                                    )
                                })
                            }
                        </ul>
                    </Group>
                }
                <Loader amStyle="primary" rounded/>
            </Container>
        )
    },
    componentDidMount(){
        JournalAccountAction.getNextPage();
        JournalAccountStore.bind("change",function(){
            this.setState({
                journalAccountList:JournalAccountStore.getJournalAccountList()
            });
            Loader.hide();
        }.bind(this));

        JournalAccountStore.bind("noDataTemporally",function(){
            this.setState({
                isNoDataHintShow:true
            });
            Loader.hide();
        }.bind(this));
    }
});

JournalAccount.contextTypes = {
    router:React.PropTypes.object.isRequired
};

module.exports=JournalAccount;
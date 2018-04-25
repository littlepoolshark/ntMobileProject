require("../../scss/page/DailyEarnInvestmentRecord.scss");
let DailyEarnInvestmentRecordAction=require("../actions/DailyEarnInvestmentRecordAction.js");
let DailyEarnInvestmentRecordStore=require("../stores/DailyEarnInvestmentRecordStore.js");
import React from "react";

//ui component
import View from "../UIComponents/View";
import Container from "../UIComponents/Container";
import Tabs from "../UIComponents/Tabs";
import NavBar from "../UIComponents/NavBar";
import Loader from "../UIComponents/Loader";
import Modal from "../UIComponents/modal/Modal";
import List from "../UIComponents/List";

import NoDataHint from "./utilities/NoDataHint";


let DealRecordItem=React.createClass({
    render(){
        let {
            date,
            desc,
            money,
            type
            }=this.props;
        return (
            <li className="dealRecord-item">
                <div className="title">
                    <span className="amount">{type === "in" ? "+" : "-"}{money}</span>
                    <span className="desc">{desc}</span>
                </div>
                <div className="subtitle">
                    <span className="date">{date}</span>
                </div>
            </li>
        )
    }
});

let DailyEarnInvestmentRecord=React.createClass({
    getInitialState(){
        return {
            data:DailyEarnInvestmentRecordStore.getAll(),
            isModalOpen:false
        }
    },
    _handleNavClick(obj){
        if(obj.title === "返回"){
            this.context.router.goBack();
        }else {
            this._handleModalOpen();
        }
    },
    _handleModalClose(){
        this.setState({
            isModalOpen:false
        });
    },
    _handleModalOpen(){
        this.setState({
            isModalOpen:true
        });
    },
    _loadMoreData(){
        let dailyEarnInvestmentRecord=document.getElementById("dailyEarnInvestmentRecord");
        let offsetHeight=dailyEarnInvestmentRecord.offsetHeight;//元素出现在视口中区域的高度
        let scrollTop=dailyEarnInvestmentRecord.scrollTop;//元素已经滚动的距离
        let scrollHeight=dailyEarnInvestmentRecord.scrollHeight;//元素总的内容高度

        if(scrollHeight - offsetHeight - scrollTop <= 3){
            DailyEarnInvestmentRecordAction.getNextPage("investmentList");
            Loader.show();
        }
    },
    render(){
        let leftNav= {
            component:"a",
            icon: 'left-nav',
            title: '返回'
        };
        let rightNav= {
            component:"a",
            title:"配标详情"
        };
        let {
            investmentDetailList,
            matchLoanDetailList,
            investmentDetailPageIndex
            }=this.state.data;

        let isEmpty=investmentDetailList.length > 0 ? false : true;

        return (
        <View>
            <NavBar
                title="交易明细"
                leftNav={[leftNav]}
                rightNav={[rightNav]}
                amStyle="primary"
                onAction={this._handleNavClick}
            />
            <Container scrollable={true}   id="dailyEarnInvestmentRecord"  onScroll={this._loadMoreData}>
                {
                    isEmpty ?
                        <NoDataHint/> :
                        <ul className="dealRecord-list">
                            {
                                investmentDetailList.map(function(item,index){
                                    return (
                                        <DealRecordItem key={investmentDetailPageIndex * 10 + index} {...item} />
                                    )
                                })
                            }
                        </ul>
                }

                <Loader amStyle="primary" rounded={true}/>
            </Container>
            <Modal
                title="配标详情"
                ref="matchLoanModal"
                isOpen={this.state.isModalOpen}
                role="popup"
                onDismiss={this._handleModalClose}
                id="matchLoanModal"
            >
                <List>
                    {
                        matchLoanDetailList.map(function(item,index){
                            return (
                                <List.Item
                                    key={index + 1}
                                    href={"#/fixedLoanIntroduction?productId="+item.loanId+"&type=loan_product"}
                                    title={item.title}
                                    after={"￥"+item.amount}
                                />
                            )
                        })
                    }
                </List>
            </Modal>
        </View>
        )
    },
    componentDidMount(){
        DailyEarnInvestmentRecordAction.getInitialData();

        DailyEarnInvestmentRecordStore.bind("change",function(){
            this.setState(DailyEarnInvestmentRecordStore.getAll())
        }.bind(this));
    },
    componentDidUpdate(){
        Loader.hide();
    },
    componentWillUnmount(){
        DailyEarnInvestmentRecordStore.unbind("change");
        DailyEarnInvestmentRecordStore.clearAll();
    }
});

DailyEarnInvestmentRecord.contextTypes = {
    router:React.PropTypes.object.isRequired
};

module.exports=DailyEarnInvestmentRecord;
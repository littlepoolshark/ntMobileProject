require("../../scss/page/DailyEarnInvestmentRecord.scss");
let DailyEarnInvestmentRecordAction=require("../actions/DailyEarnInvestmentRecordAction.js");
let DailyEarnInvestmentRecordStore=require("../stores/DailyEarnInvestmentRecordStore.js");
import React from "react";

//ui component
import Container from "../UIComponents/Container";
import Tabs from "../UIComponents/Tabs";
import NavBar from "../UIComponents/NavBar";
import Loader from "../UIComponents/Loader";
import Modal from "../UIComponents/modal/Modal";
import List from "../UIComponents/List";

import CSSCore from "../UIComponents/utils/CSSCore";


//更多理财列表页：DailyEarnInvestmentRecord component

let RecordItem=React.createClass({
    render(){
        return (
            <li>
                <span className="date">{this.props.date}</span>
                <span className="amount">￥{this.props.money}</span>
            </li>
        )
    }
})

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
    _getCurrTabType(){
        let currListType="in";//默认打开的是“投资明细”tab
        let investmentDetailList=document.getElementById("investmentDetailList");
        let rollOutDetailList=document.getElementById("rollOutDetailList");
        let incomeDetailList=document.getElementById("incomeDetailList");
        if(CSSCore.hasClass(investmentDetailList,"active")){
            currListType="in";
        }else if(CSSCore.hasClass(rollOutDetailList,"active")){
            currListType="out";
        }else if(CSSCore.hasClass(incomeDetailList,"active")){
            currListType="lixi";
        }
        return currListType;
    },
    _loadMoreData(){
        let dailyEarnInvestmentRecord=document.getElementById("dailyEarnInvestmentRecord");
        let offsetHeight=dailyEarnInvestmentRecord.offsetHeight;//元素出现在视口中区域的高度
        let scrollTop=dailyEarnInvestmentRecord.scrollTop;//元素已经滚动的距离
        let scrollHeight=dailyEarnInvestmentRecord.scrollHeight;//元素总的内容高度

        if(scrollHeight - offsetHeight - scrollTop <= 3){
            let listType=this._getCurrTabType();
            DailyEarnInvestmentRecordAction.getNextPage(listType);
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
            rollOutDetailList,
            incomeDetailList,
            matchLoanDetailList,
            investmentDetailPageIndex,
            rollOutDetailPageIndex,
            incomeDetailPageIndex,
            matchLoanDetailPageIndex
            }=this.state.data;

        return (
            <Container scrollable={true}   id="dailyEarnInvestmentRecord"  onScroll={this._loadMoreData}>
                <NavBar
                    title="灵活理财"
                    leftNav={[leftNav]}
                    rightNav={[rightNav]}
                    amStyle="primary"
                    onAction={this._handleNavClick}
                />
                <Tabs defaultActiveKey={0} >

                    <Tabs.Item
                        title="投资明细"
                        key={0}
                        navStyle={null}
                        id="investmentDetailList"
                    >
                        <ul className="detailList">
                            {
                                investmentDetailList.map(function(item,index){
                                    return (
                                        <RecordItem key={investmentDetailPageIndex * (index+1)} {...item} />
                                    )
                                })
                            }
                        </ul>
                    </Tabs.Item>
                    <Tabs.Item
                        title="退出明细"
                        key={1}
                        navStyle={null}
                        id="rollOutDetailList"
                    >
                        <ul className="detailList">
                            {
                                rollOutDetailList.map(function(item,index){
                                    return (
                                        <RecordItem key={rollOutDetailPageIndex * (index+1)} {...item} />
                                    )
                                })
                            }
                        </ul>
                    </Tabs.Item>
                    <Tabs.Item
                        title="收益明细"
                        key={2}
                        navStyle={null}
                        id="incomeDetailList"
                    >
                        <ul className="detailList">
                            {
                                incomeDetailList.map(function(item,index){
                                    return (
                                        <RecordItem key={incomeDetailPageIndex * (index+1)} {...item} />
                                    )
                                })
                            }
                        </ul>
                    </Tabs.Item>
                </Tabs>

                <Loader amStyle="primary" rounded={true}/>

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
                                        href={"#/fixedLoanIntroduction?productId="+item.loanId+"&type=loan_product"}
                                        title={item.title}
                                        after={"￥"+item.amount}
                                    />
                                )
                            })
                        }
                    </List>
                </Modal>
            </Container>
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
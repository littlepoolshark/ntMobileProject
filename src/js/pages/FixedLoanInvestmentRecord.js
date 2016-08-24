require("../../scss/page/FixedLoanInvestmentRecord.scss");
let FixedLoanInvestmentRecordAction=require("../actions/FixedLoanInvestmentRecordAction.js");
let FixedLoanInvestmentRecordStore=require("../stores/FixedLoanInvestmentRecordStore.js");
import React from "react";

//ui component
import Container from "../UIComponents/Container";
import Tabs from "../UIComponents/Tabs";
import Loader from "../UIComponents/Loader";
import Modal from "../UIComponents/modal/Modal";
import List from "../UIComponents/List";
import InvestmentRecordCard from "./utilities/InvestmentRecordCard";
import NoDataHint from "./utilities/NoDataHint";

import CSSCore from "../UIComponents/utils/CSSCore";



//理财计划明细列表页：FixedLoanInvestmentRecord component
let FixedLoanInvestmentRecord=React.createClass({
    getInitialState(){
        return {
            data:FixedLoanInvestmentRecordStore.getAll(),
            noApplyingData:false,
            noRepayingData:false,
            noClearingData:false,
        }
    },
    _handleActionModalClose(){
        this.setState({
            isActionModalOpen:false
        });
    },
   _getCurrListType(){
        let currListType="";
        let applyingList=document.getElementById("applyingList");
        let preRepayList=document.getElementById("preRepayList");
        let clearingList=document.getElementById("clearingList");
        if(CSSCore.hasClass(applyingList,"active")){
            currListType="applying";
        }else if(CSSCore.hasClass(preRepayList,"active")){
            currListType="repaying";
        }else if(CSSCore.hasClass(clearingList,"active")){
            currListType="clearing";
        }
        return currListType;
    },
    _handleCardClick(props){//跳转至回款进度详情
        this.context.router.push({
            pathname:"repaymentSchedule",
            query:{
                loanId:props.id,
                creditorId:props.creId,
                productType:"loan_product",
                status:props.status
            }
        })
    },
    _loadMoreData(){
        Loader.show();
        let dailyEarnInvestmentRecord=document.getElementById("fixedInvestmentRecord");
        let offsetHeight=dailyEarnInvestmentRecord.offsetHeight;//元素出现在视口中区域的高度
        let scrollTop=dailyEarnInvestmentRecord.scrollTop;//元素已经滚动的距离
        let scrollHeight=dailyEarnInvestmentRecord.scrollHeight;//元素总的内容高度

        if(scrollHeight - offsetHeight - scrollTop <= 3){
            let listType=this._getCurrListType();
            FixedLoanInvestmentRecordAction.getNextPage(listType);
        }
    },
    render(){
        let {
            applyingList,
            preRepayList,
            clearingList,
            applyingListPageIndex,
            preRepayListPageIndex,
            clearingListPageIndex
            }=this.state.data;

        return (
            <Container scrollable={true}   id="fixedInvestmentRecord"  onScroll={this._loadMoreData}>
                <Tabs defaultActiveKey={1} >
                    <Tabs.Item
                        title="加入中"
                        key={0}
                        navStyle={null}
                        id="applyingList"
                    >
                        {
                            !this.state.noApplyingData ?
                                applyingList.map(function(item,index){
                                    return (
                                        <InvestmentRecordCard
                                            {...item}
                                            key={(applyingListPageIndex-1)*10 + index +1}
                                            clickHandler={this._handleCardClick}
                                        />
                                    )
                                }.bind(this)) :
                                <NoDataHint/>
                        }
                    </Tabs.Item>
                    <Tabs.Item
                        title="回款中"
                        key={1}
                        navStyle={null}
                        id="preRepayList"
                    >
                        {
                            !this.state.noRepayingData ?
                            preRepayList.map(function(item,index){

                                return (
                                    <InvestmentRecordCard
                                        {...item}
                                        key={(preRepayListPageIndex-1)*10 + index +1}
                                        clickHandler={this._handleCardClick}
                                    />
                                )
                            }.bind(this)) :
                            <NoDataHint/>
                        }
                    </Tabs.Item>
                    <Tabs.Item
                        title="已结清"
                        key={2}
                        navStyle={null}
                        id="clearingList"
                    >
                        {
                            !this.state.noClearingData ?
                            clearingList.map(function(item,index){
                                return (
                                    <InvestmentRecordCard
                                        {...item}
                                        key={(clearingListPageIndex-1)*10 + index +1}
                                        clickHandler={this._handleCardClick}
                                    />
                                )
                            }.bind(this)):
                            <NoDataHint/>
                        }
                    </Tabs.Item>
                </Tabs>

                <Loader amStyle="primary" rounded={true}/>

            </Container>
        )
    },
    componentDidMount(){
        FixedLoanInvestmentRecordAction.getInitialData();

        //数据改变
        FixedLoanInvestmentRecordStore.bind("change",function(){
            this.setState({
                data:FixedLoanInvestmentRecordStore.getAll()
            })
        }.bind(this));

        //没有更多数据了
        FixedLoanInvestmentRecordStore.bind("noMoreData",function(){
            Loader.toggle();
        });

        //暂时没有数据
        FixedLoanInvestmentRecordStore.bind("noDataTemporarily",function(currListType){
            if(currListType === "repaying"){
                this.setState({
                    noRepayingData:true
                })
            }else if( currListType === "clearing"){
                this.setState({
                    noClearingData:true
                })
            }else if(currListType === "applying"){
                this.setState({
                    noApplyingData:true
                })
            }

        }.bind(this));

    },
    componentDidUpdate(){
        Loader.hide();
    },
    componentWillUnmount(){
        FixedLoanInvestmentRecordStore.clearAll();
    }
});

FixedLoanInvestmentRecord.contextTypes = {
    router:React.PropTypes.object.isRequired
};

module.exports=FixedLoanInvestmentRecord;
require("../../scss/page/EarnSetInvestmentRecord.scss");
let EarnSetInvestmentRecordAction=require("../actions/EarnSetInvestmentRecordAction.js");
let EarnSetInvestmentRecordStore=require("../stores/EarnSetInvestmentRecordStore.js");
import React from "react";

//ui component
import Container from "../UIComponents/Container";
import Tabs from "../UIComponents/Tabs";
import NavBar from "../UIComponents/NavBar";
import Loader from "../UIComponents/Loader";
import Modal from "../UIComponents/modal/Modal";
import List from "../UIComponents/List";
import View from "../UIComponents/View";
import InvestmentRecordCard from "./utilities/InvestmentRecordCard";
import NoDataHint from "./utilities/NoDataHint";

import CSSCore from "../UIComponents/utils/CSSCore";



//理财计划明细列表页：EarnSetInvestmentRecord component
let EarnSetInvestmentRecord=React.createClass({
    getInitialState(){
        return {
            isActionModalOpen:false,
            isMatchLoanModalOpen:false,
            data:EarnSetInvestmentRecordStore.getAll(),
            noRepayingData:false,
            noClearingData:false,
            noMatchLoanData:false
        }
    },
    _handleNavClick(obj){
        if(obj.title === "返回"){
            this.context.router.goBack();
        }else {
            this._handleActionModalOpen();
        }
    },
    _handleActionModalClose(){
        this.setState({
            isActionModalOpen:false
        });
    },
    _handleMatchLoanModalClose(){
        this.setState({
            isMatchLoanModalOpen:false
        });
    },
    _handleMatchLoanModalOpen(){
        this.setState({
            isMatchLoanModalOpen:true
        });
    },
    _handleActionModalOpen(){
        this.setState({
            isActionModalOpen:true
        });
    },
   _getCurrListType(){
        let currListType="";
        let preRepayList=document.getElementById("preRepayList");
        let clearingList=document.getElementById("clearingList");
        if(CSSCore.hasClass(preRepayList,"active")){
            currListType="repaying";
        }else if(CSSCore.hasClass(clearingList,"active")){
            currListType="clearing";
        }
        return currListType;
    },
    _handleQueryProductList(productType){
        let currListType=this._getCurrListType();
        EarnSetInvestmentRecordAction.queryProductListByType(currListType,productType);
    },
    _handleCardClick(props){//查看月月赚和季季赚的配标详情
        EarnSetInvestmentRecordAction.showMatchLoanList(props.id,props.productType);
    },
    _loadMoreData(){
        Loader.show();
        let dailyEarnInvestmentRecord=document.getElementById("earnSetInvestmentRecord");
        let offsetHeight=dailyEarnInvestmentRecord.offsetHeight;//元素出现在视口中区域的高度
        let scrollTop=dailyEarnInvestmentRecord.scrollTop;//元素已经滚动的距离
        let scrollHeight=dailyEarnInvestmentRecord.scrollHeight;//元素总的内容高度

        if(scrollHeight - offsetHeight - scrollTop <= 3){
            let listType=this._getCurrListType();
            EarnSetInvestmentRecordAction.getNextPage(listType);
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
            title:"筛选"
        };

        let {
            preRepayList,
            clearingList,
            matchLoanDetailList
            }=this.state.data;

        return (
                <View id="earnSetInvestmentRecordView">
                    <NavBar
                        title="理财计划投资明细"
                        leftNav={[leftNav]}
                        rightNav={[rightNav]}
                        amStyle="primary"
                        onAction={this._handleNavClick}
                    />
                    <Container scrollable={true}   id="earnSetInvestmentRecord"  onScroll={this._loadMoreData}>
                        <Tabs defaultActiveKey={0} >
                            <Tabs.Item
                                title="待结算"
                                key={0}
                                navStyle={null}
                                id="preRepayList"
                            >
                                {
                                    !this.state.noRepayingData ?
                                        preRepayList.map(function(item,index){
                                            return (
                                                <InvestmentRecordCard
                                                    {...item}
                                                    key={item.id}
                                                    clickHandler={this._handleCardClick}
                                                />
                                            )
                                        }.bind(this)) :
                                        <NoDataHint/>
                                }
                            </Tabs.Item>
                            <Tabs.Item
                                title="已结清"
                                key={1}
                                navStyle={null}
                                id="clearingList"
                            >
                                {
                                    !this.state.noClearingData ?
                                        clearingList.map(function(item,index){
                                            return (
                                                <InvestmentRecordCard
                                                    {...item}
                                                    key={item.id}
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
                    <Modal
                        title="配标详情"
                        ref="matchLoanModal"
                        isOpen={this.state.isMatchLoanModalOpen}
                        role="popup"
                        onDismiss={this._handleMatchLoanModalClose}
                        id="matchLoanModal"
                    >
                        {
                            !this.state.noMatchLoanData ?
                                matchLoanDetailList.map(function(item,index){
                                    return (
                                        <List.Item
                                            href={"#/fixedLoanIntroduction?productId="+item.loanId+"&type=loan_product"}
                                            title={item.title}
                                            after={"￥"+item.amount}
                                            key={index}
                                        />
                                    )
                                }) :
                                <NoDataHint style={{background:"#eee",marginTop:"5rem"}} />
                        }
                    </Modal>
                    <Modal
                        title=""
                        ref="actionModal"
                        isOpen={this.state.isActionModalOpen}
                        role="actions"
                        onDismiss={this._handleActionModalClose}
                        btnStyle="primary"
                        id="actionModal"
                    >
                        <List>
                            <List.Item onClick={this._handleQueryProductList.bind(null,"yyz_product")}>月月赚</List.Item>
                            <List.Item onClick={this._handleQueryProductList.bind(null,"jjz_product")}>季季赚</List.Item>
                            <List.Item className="modal-actions-alert" onClick={this._handleQueryProductList.bind(null,"all")}>所有</List.Item>
                        </List>
                    </Modal>
                </View>
        )
    },
    componentDidMount(){
        EarnSetInvestmentRecordAction.getInitialData();

        //数据改变
        EarnSetInvestmentRecordStore.bind("change",function(){
            this.setState({
                data:EarnSetInvestmentRecordStore.getAll(),
                isActionModalOpen:false
            })
        }.bind(this));


        EarnSetInvestmentRecordStore.bind("queryProductListSuccess",function(){
            this.setState({
                data:EarnSetInvestmentRecordStore.getAll(),
                noRepayingData:false,
                noClearingData:false,
                isActionModalOpen:false
            })
        }.bind(this));

        //打开配标详情列表modal窗口，展示配标详情列表
        EarnSetInvestmentRecordStore.bind("getMatchLoanListSuccess",function(){
            this.setState({
                data:EarnSetInvestmentRecordStore.getAll(),
                isMatchLoanModalOpen:true,
                noMatchLoanData:false
            })
        }.bind(this));

        //没有更多数据了
        EarnSetInvestmentRecordStore.bind("noMoreData",function(){
            Loader.toggle();
        });

        //暂时没有数据
        EarnSetInvestmentRecordStore.bind("noDataTemporarily",function(currListType){
            if(currListType === "repaying"){
                this.setState({
                    noRepayingData:true,
                    isActionModalOpen:false
                })
            }else if( currListType === "clearing"){
                this.setState({
                    noClearingData:true,
                    isActionModalOpen:false
                })
            }else if(currListType === "matchLoan"){
                this.setState({
                    noMatchLoanData:true,
                    isMatchLoanModalOpen:true
                })
            }

        }.bind(this));

    },
    componentDidUpdate(){
        Loader.hide();
    },
    componentWillUnmount(){
        EarnSetInvestmentRecordStore.clearAll();
    }
});

EarnSetInvestmentRecord.contextTypes = {
    router:React.PropTypes.object.isRequired
};

module.exports=EarnSetInvestmentRecord;
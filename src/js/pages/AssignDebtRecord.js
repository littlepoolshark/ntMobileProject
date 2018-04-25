require("../../scss/page/AssignDebtRecord.scss");
let AssignDebtRecordAction=require("../actions/AssignDebtRecordAction.js");
let AssignDebtRecordStore=require("../stores/AssignDebtRecordStore.js");
import React from "react";

//ui component
import View from "../UIComponents/View";
import NavBar from "../UIComponents/NavBar";
import Container from "../UIComponents/Container";
import Tabs from "../UIComponents/Tabs";
import Loader from "../UIComponents/Loader";

import InvestmentRecordCard from "./utilities/InvestmentRecordCard";
import NoDataHint from "./utilities/NoDataHint";




// 我的债转记录中心：AssignDebtRecord component
let AssignDebtRecord=React.createClass({
    getInitialState(){
        return {
            data:AssignDebtRecordStore.getAll()
        }
    },
    _handleNavClick(){
        this.context.router.push({
            pathname: "allProductEMInvestmentRecord"
          });
    },
    _toggleListType(tabIndex){
        let mapTabIndexToListType={
            "0":"transferring",
            "1":"transfered",
        };
        AssignDebtRecordAction.toggleListType(mapTabIndexToListType[tabIndex+""]);
    },
    _loadMoreData(){
        let assignDebtRecord=document.getElementById("assignDebtRecord");
        let offsetHeight=assignDebtRecord.offsetHeight;//元素出现在视口中区域的高度
        let scrollTop=assignDebtRecord.scrollTop;//元素已经滚动的距离
        let scrollHeight=assignDebtRecord.scrollHeight;//元素总的内容高度

        if(scrollHeight - offsetHeight - scrollTop <= 3){
            Loader.show();
            AssignDebtRecordAction.getNextPage();
        }
    },
    render(){

        let {
            transferringList,
            transferedList
            }=this.state.data;
        
        let leftNav = {
            component: "a",
            icon: "left-nav",
            title: "返回"
            };
        

        return (
            <View>
                <NavBar
                title='转让进度'
                leftNav={[leftNav]}
                amStyle="primary"
                onAction={this._handleNavClick}
                />
                <Container scrollable={true}   id="assignDebtRecord"  onScroll={this._loadMoreData}>
                    <Tabs defaultActiveKey={0} onAction={this._toggleListType} >
                        <Tabs.Item
                            title="转出中"
                            key={0}
                            navStyle={null}
                        >
                            {
                                transferringList.length ?
                                transferringList.map((item,index) =>{
                                    return (
                                        <InvestmentRecordCard
                                            {...item}
                                            key={item.id}
                                            hideTheTransferTag={true}
                                        />
                                    )
                                })  :
                                <NoDataHint/>
                            }
                        </Tabs.Item>
                        <Tabs.Item
                            title="已转出"
                            key={1}
                            navStyle={null}
                        >
                            {
                                transferedList.length ?
                                transferedList.map((item,index) =>{
                                    return (
                                        <InvestmentRecordCard
                                            {...item}
                                            key={item.id}
                                            hideTheTransferTag={true}
                                            checkContractBtn={true}
                                        />
                                    )
                                })  :
                                <NoDataHint/>
                            }
                        </Tabs.Item>
                    </Tabs>
                    <Loader amStyle="primary" rounded={true}/>
                </Container>
                </View>
        )
    },
    componentDidMount(){
        AssignDebtRecordAction.getInitialData();
        //let defaultTabIndex=this.props.location && this.props.location.query && this.props.location.query.tabIndex || 0;

        AssignDebtRecordStore.bind("change",function(){
            this.setState({
                data:AssignDebtRecordStore.getAll()
            })
        }.bind(this));


    },
    componentDidUpdate(){
        Loader.hide();
    },
    componentWillUnmount(){
        AssignDebtRecordStore.clearAll();
    }
});

AssignDebtRecord.contextTypes = {
    router:React.PropTypes.object.isRequired
};

module.exports=AssignDebtRecord;
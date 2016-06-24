require("../../scss/page/ProductList.scss");
let ProductListAction=require("../actions/ProductListAction.js");
let ProductListStore=require("../stores/ProductListStore.js");
import React from "react";

//ui component
import Container from "../UIComponents/Container";
import Tabs from "../UIComponents/Tabs";
import List from "../UIComponents/List";
import Loader from "../UIComponents/Loader";

//utilites component
import DailyEarnCard from "./utilities/DailyEarnCard";
import CommonCard from "./utilities/CommonCard";



let newbieLoanData={
    title:"新手标",
    type:"newbieLoan",
    yearRate:"15.0",
    deadline:"1",
    deadlineUnit:"个月",
    remainAmount:100000,
    isSoldOut:false
};

let monthlyEarnData={
    title:"月月赚",
    type:"monthlyEarn",
    yearRate:"9.5",
    deadline:"1",
    deadlineUnit:"个月",
    remainAmount:100000,
    isSoldOut:false
}

let quarterlyEarnData={
    title:"季季赚",
    type:"quarterlyEarn",
    yearRate:"10.5",
    deadline:"3",
    deadlineUnit:"个月",
    remainAmount:1000000,
    isSoldOut:true
}

let fixedLoanData={
    title:"好采投",
    type:"fixedLoan",
    yearRate:"10.8",
    deadline:"3",
    deadlineUnit:"个月",
    remainAmount:1000000,
    isSoldOut:false
}

let creditorRightData={
    title:"债权转让",
    type:"creditorRight",
    yearRate:"10.8",
    deadline:"5",
    deadlineUnit:"个月",
    remainAmount:800000,
    isSoldOut:true
}

//理财列表页：ProductList component
let ProductList=React.createClass({
    getInitialState(){
        ProductListAction.getDataFromServer();
        return {
            isLoading:false,
            commonCardList:ProductListStore.getAll()
        }
    },
    _loadMoreData(){
        let productList=document.getElementById("productList");
        let offsetHeight=productList.offsetHeight;//元素出现在视口中区域的高度
        let scrollTop=productList.scrollTop;//元素已经滚动的距离
        let scrollHeight=productList.scrollHeight;//元素总的内容高度
        if(scrollHeight - offsetHeight - scrollTop < 1){
            ProductListAction.getDataFromServer();
            this.setState({
                isLoading:true
            })
        }
    },
    _commonCardRender(){
        return (
            this.state.commonCardList.map(function(item,index){
                return (
                    <CommonCard  {...item}/>
                )
            })
        )
    },
    render(){
        return (
            <Container scrollable={false} style={{overflow:"scroll"}}  id="productList" onScroll={this._loadMoreData}>


                <DailyEarnCard isSoldOut={true}/>
                {this._commonCardRender()}
                <Loader amStyle="success" rounded={true} className={this.state.isLoading ? "" : "hide"}/>
            </Container>
        )
    },
    componentDidMount(){
        ProductListStore.bind("change",function(){
            let commonCardList=ProductListStore.getAll();
            this.setState({
                commonCardList:commonCardList,
                isLoading:false
            })
        }.bind(this));
    }
});

export  default ProductList;
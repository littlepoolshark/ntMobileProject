let MatchLoanListAction=require("../actions/MatchLoanListAction.js");
let MatchLoanListStore=require("../stores/MatchLoanListStore.js");
import React from "react";


import Container from "../UIComponents/Container";
import List from "../UIComponents/List";

import NoDataHint from "./utilities/NoDataHint";





//用户中心页面：MatchLoanList component
let MatchLoanList=React.createClass({
    getInitialState(){
        return {
           data:MatchLoanListStore.getAll()
        }
    },
    render(){
        let {
            matchLoanList
            }=this.state.data;
        return (
            <Container scrollable={true} id="matchLoanList" >
                <List style={{marginTop:0}}>
                {
                    matchLoanList.length ?
                        matchLoanList.map(function(item,index){
                        return (
                            <List.Item
                                href={"#/fixedLoanIntroduction?productId="+item.loanId+"&type=loan_product"}
                                title={item.title}
                                after={"￥"+item.amount}
                                key={index}
                            />
                        )
                    }) :
                    <NoDataHint style={{background:"#f4f4f4",marginTop:"5rem"}} />
                }
                </List>
            </Container>
        )
    },
    componentDidMount(){
        let {
            purchaseId,
            productType
            }=this.props.location.query;
        MatchLoanListAction.getInitialData(purchaseId,productType);

        MatchLoanListStore.bind("change",function(){
            this.setState({
                data:MatchLoanListStore.getAll()
            });
        }.bind(this))
    },
    componentWillUnmount(){
        MatchLoanListStore.unbind("change");
        MatchLoanListStore.clearAll();
    }
});

MatchLoanList.contextTypes = {
    router:React.PropTypes.object.isRequired
};

module.exports=MatchLoanList;
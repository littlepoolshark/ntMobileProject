import React from "react";
let MatchLoanOfMoonAction=require("../actions/MatchLoanOfMoonAction.js");
let MatchLoanOfMoonStore=require("../stores/MatchLoanOfMoonStore.js");

import List from "../UIComponents/List";

import NoDataHint from "./utilities/NoDataHint";

let MatchLoanOfMoon=React.createClass({
    getInitialState(){
        return {
            data:MatchLoanOfMoonStore.getAll()
        }
    },
    render(){
        let matchLoanList=this.state.data.matchLoanList;

        return(
            <div>
                {
                    matchLoanList.length ?
                        <List style={{margin:0}}>
                            {
                                matchLoanList.map((item,index) => {
                                    return (
                                        <List.Item
                                            href={"#/fixedLoanIntroduction?productId="+ item.loanId +"&type=loan_product"}
                                            title={item.title}
                                            after={"￥"+item.inverstAmount}
                                            key={item.loanId}
                                        />
                                    )
                                })
                            }
                        </List> :
                        <NoDataHint/>
                }
            </div>
        )
    },
    componentDidMount(){
        let joinId=this.props.location.query.joinId;
        MatchLoanOfMoonAction.getInitialData(joinId);

        MatchLoanOfMoonStore.bind("change",function(){
            this.setState({
                data:MatchLoanOfMoonStore.getAll()
            });
        }.bind(this));
    },
    componentWillUnmount(){
        MatchLoanOfMoonStore.clearAll();
    }
});

MatchLoanOfMoon.contextTypes = {
    router:React.PropTypes.object.isRequired
};

module.exports=MatchLoanOfMoon;
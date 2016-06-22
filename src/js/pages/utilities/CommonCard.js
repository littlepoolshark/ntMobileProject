require("../../../scss/page/CommonCard.scss");
import React from "react";
import classNames from 'classnames';

import Group from "../../UIComponents/Group";
import Grid from "../../UIComponents/Grid";
import Col from "../../UIComponents/Col";

//新手标，月月赚，季季赚，好采投和债权转让共用的card组件
const Type_To_Tag_Map ={
    newbieLoan:["tag-newbie"],
    monthlyEarn:["tag-addRate"],
    quarterlyEarn:["tag-addRate","tag-redPackage"],
    fixedLoan:["tag-addRate","tag-redPackage"],
    creditorRight:["tag-transfer"]
};

let CommonCardTitle=React.createClass({
    render(){
        let tagArr=Type_To_Tag_Map[this.props.type];
        return (
            <h6 className="title">
                <span>{this.props.title}</span>
                {
                    !this.props.isSoldOut ?
                    tagArr.map(function(item,index){
                        let classes="tag " + item;
                        return (
                            <span className={classes}></span>
                        )
                    }) : null

                }
            </h6>
        )
    }
});

let CommonCard=React.createClass({
    propTypes: {
        type: React.PropTypes.string,
        title: React.PropTypes.string,
        yearRate: React.PropTypes.string,
        deadline: React.PropTypes.string,
        deadlineUnit:React.PropTypes.string,
        remainAmount: React.PropTypes.number,
        isSoldOut:React.PropTypes.bool
    },
    getDefaultProps(){
        return {
            title:"--",
            type:"newbieLoan",
            yearRate:"--",
            deadline:"--",
            deadlineUnit:"--",
            remainAmount:0,
            isSoldOut:true
        }
    },
    _amountFormater(amount){
        return (amount / 1000).toFixed(2);
    },
    render(){
        return (
            <Group noPadded={false} className="commonCard">
                <CommonCardTitle title={this.props.title} type={this.props.type} isSoldOut={this.props.isSoldOut}/>
                <Grid collapse={true}>
                    <Col cols={4}>
                        <Grid collapse={true}>
                            <Col cols={2}>
                                <div className="subtitle text-left" >年化收益</div>
                                <div className="yearRate">{this.props.yearRate}<span className="unit">%</span></div>
                            </Col>
                            <Col cols={4}>
                                <div className="subtitle" >投资期限</div>
                                <div className="deadline">{this.props.deadline}<span className="unit">{this.props.deadlineUnit}</span></div>
                            </Col>
                        </Grid>
                    </Col>
                    <Col cols={2} className={this.props.isSoldOut ? "hide" : ""}>
                        <div className="subtitle" >可购金额</div>
                        <div className="remainAmount">{this._amountFormater(this.props.remainAmount)}<span className="unit">万</span></div>
                    </Col>
                </Grid>
                <div className={this.props.isSoldOut ? "stamp" : "stamp hide"}></div>
            </Group>
        )
    }
});

export default CommonCard ;
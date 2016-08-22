require("../../scss/page/FixedLoanCenter.scss");
var FixedLoanCenterAction=require("../actions/FixedLoanCenterAction.js");
var FixedLoanCenterStore=require("../stores/FixedLoanCenterStore.js");
import React from "react";
import { Link } from "react-router";

//ui component
import Container from "../UIComponents/Container";
import Group from "../UIComponents/Group";
import Icon from "../UIComponents/Icon";


let FixedLoanCenterItem=React.createClass({
    _renderItemIcon(type){
        let img=null;
        switch (type){
            case "earnSet":
                img=<img src="/src/img/financial_plan_round.png" alt=""/>;
                break;
            case "fixedLoan":
                img=<img src="/src/img/financial_project_round.png" alt=""/>;
                break;
            case "creditorLoan":
                img=<img src="/src/img/financial_transfer_round.png" alt=""/>;
                break;
            default:
                break;
        }
        return img;
    },
    _renderItemTitle(type){
        let title=null;
        switch (type){
            case "earnSet":
                title="理财计划";
                break;
            case "fixedLoan":
                title="项目直投";
                break;
            case "creditorLoan":
                title="债权转让";
                break;
            default:
                break;
        }
        return title;
    },
    _renderNextLocation(type){
        let nextLocation="";
        switch (type){
            case "earnSet":
                nextLocation="earnSetInvestmentRecord";
                break;
            case "fixedLoan":
                nextLocation="fixedLoanInvestmentRecord";
                break;
            case "creditorLoan":
                nextLocation="creditorLoanInvestmentRecord";
                break;
            default:
                break;
        }
        return nextLocation;
    },
    render(){
        let {
            type,
            backTotal,
            investCount,
            interestTotal,
            investMoney
            }=this.props;
        return (
            <Link to={this._renderNextLocation(type)}>
                <Group className="fixedLoanCenterItem">
                    <Icon classPrefix="imgIcon" name="redLabel"/>
                    <div className="icon-wrapper">
                        {this._renderItemIcon(type)}
                    </div>
                    <div className="item-body">
                        <div className="title">{this._renderItemTitle(type)}</div>
                        <div>
                            <span className="subtitle">持有笔数</span>
                            <span className="amount">{investCount}笔</span>
                        </div>
                        <div>
                            <span className="subtitle">投资金额</span>
                            <span className="amount">￥{investMoney}</span>
                        </div>
                        <div>
                            <span className="subtitle">待收本息</span>
                            <span className="amount">￥{backTotal}</span>
                        </div>
                        <div>
                            <span className="subtitle">累计收益</span>
                            <span className="amount"><strong>￥{interestTotal}</strong></span>
                        </div>
                    </div>
                </Group>
            </Link>
        )
    }
});

let FixedLoanCenter=React.createClass({
    getInitialState(){
        return FixedLoanCenterStore.getAll();
    },
    render(){
        return (
            <Container id="fixedLoanCenter"  scrollable={false}>
                {
                    this.state.list.map(function(item,index){
                        return (
                            <FixedLoanCenterItem {...item} key={index+1}/>
                        )
                    })
                }
            </Container>
        )
    },
    componentDidMount(){
        FixedLoanCenterAction.getFixedLoanCenterData();

        FixedLoanCenterStore.bind("change",function(){
            this.setState(FixedLoanCenterStore.getAll());
        }.bind(this));

    }
});

FixedLoanCenter.contextTypes = {
    router:React.PropTypes.object.isRequired
};

module.exports=FixedLoanCenter;
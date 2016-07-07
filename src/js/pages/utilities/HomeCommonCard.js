import React from "react";
import {
    Link
} from 'react-router';

//ui component
import Group from "../../UIComponents/Group";
import Grid from "../../UIComponents/Grid";
import Col from "../../UIComponents/Col";

//utilites component
import mixin from "./mixin";

//除了天天赚，首页中所有标的（新手标，月月赚，季季赚和好采投）的展示都用这个组件
let  HomeCommonCard=React.createClass({
    mixins:[mixin],
    _renderCardStatus(productType,productStatus,remainAmount){
        let statusText=this._getProductStatusText(productType,productStatus);
        if(statusText !== "售罄"){
            return (
                <div className="subtitle-right">
                    <span className="amount">{this._amountFormater(remainAmount)}</span>
                    <span className="unit">万</span>
                </div>
            )
        }else {
            return (
                <div className="subtitle-right">
                    <span className="amount">售罄</span>
                    <span className="unit"></span>
                </div>
            )
        }
    },
    render(){
        let {
            id,
            type,
            productName,
            productApr,
            repaymentLimit,
            repaymentTypeUnit,
            remainAmount,
            status
            }=this.props;
        //如果是赚系列的标的就跳转到赚系列共用的详情页，否则跳转到好采投和债转的详情页
        let pathName=type === "loan_product" ? "fixLoanIntroduction" : "earnSetIntroduction";

        return (
            <Link to={{pathname:pathName,query:{type:type,productId:id}}}>
                <Group className="home-earnSet-card" noSidePadded={true}>
                    <h6 className="title">
                        {
                            type === "new_product" ?
                                (<span className="icon-new"></span>) :
                                (<span className="icon-redStar"></span>)
                        }
                        <span className="text">{productName}</span>
                    </h6>
                    <Grid collapse={true}>
                        <Col cols={3} className="home-earnSet-card-item">
                            <div className="text-center yearRate">{this._yearRateFormater(productApr)}<span className="unit">%</span></div>
                            <div className="text-center subtitle" >年化收益</div>
                        </Col>
                        <Col cols={3} className="home-earnSet-card-item">
                            <div className="subtitle">
                                <div className="subtitle-left">
                                    <span className="icon-time"></span>
                                    投资期限
                                </div>
                                <div className="subtitle-right">
                                    <span className="amount">{repaymentLimit}</span>
                                    <span className="unit">{repaymentTypeUnit}</span>
                                </div>
                            </div>
                            <div className="subtitle" style={{marginTop:"5px"}}>
                                <div className="subtitle-left">
                                    <span className="icon-money"></span>
                                    可投金额
                                </div>
                                {this._renderCardStatus(type,status,remainAmount)}
                            </div>
                        </Col>
                    </Grid>
                    {
                        type === "new_product" ?
                            (<div className="newbieLoan-label"></div>)  :
                            null
                    }
                </Group>
            </Link>
        )
    }
});


export  default HomeCommonCard;
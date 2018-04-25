import React from "react";
import {
    Link
} from 'react-router';

//ui component
import Group from "../../UIComponents/Group";
import Grid from "../../UIComponents/Grid";
import Col from "../../UIComponents/Col";
import Icon from "../../UIComponents/Icon";
import Button from "../../UIComponents/Button";

//utilites component
import mixin from "./mixin";

//首页中所有标的的展示都用这个组件
let  HomeCommonCard=React.createClass({
    mixins:[mixin],
    _renderCardStatus(productType,productStatus,remainAmount,orderSwitch,publishtimeL){
        let statusText=this._getProductStatusText(productType,productStatus,orderSwitch);
        let isSoldOut=["已售罄","放款中","还款中","已结束","预发布"].indexOf(statusText) >  -1;

        if(!isSoldOut){
            return (
                <span>
                    剩余<strong>{this._amountFormater(remainAmount)}</strong>万
                </span>
            )
        }else {
            if(statusText === "预发布"){
                statusText="今天" + this._formatTimeStamp(publishtimeL) + "开售";
            }
            return (
                <span className="soldOut-btn">{statusText}</span>
            )
        }
    },
    _formatTimeStamp(timeStamp){
        let timeStr="";
        let date=new Date(timeStamp);
        let hours=date.getHours();
        let minutes=date.getMinutes();
        timeStr=(hours < 10 ? "0"+hours : hours) + ":" + (minutes < 10 ? "0"+minutes : minutes);
        return timeStr;
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
            status,
            publishtimeL,
            orderSwitch,
            rewardRate,
            minRate,//月满盈的最小年化利率
            maxRate,//月满盈的最大年化利率
            vipRate//好采投的vip加息利率（目前只有好采,果乐金投有而已）
            }=this.props;


        //如果是赚系列的标的就跳转到赚系列共用的详情页，否则跳转到好采投和债转的详情页
        let pathName="";
        switch (type){
            case "moon":
                pathName="moonLoanIntroduction";
                break;
            case "rich":
                pathName="richLoanIntroduction";
                break;
            case "loan_product":
                pathName="fixedLoanIntroduction";
                break;
            case "creditor_product":
                pathName="creditorLoanIntroduction";
                break;
            case "glj":
                pathName="gljLoanIntroduction";
                break;
            case "ced":
                pathName="cedLoanIntroduction";
                break;    
            default :
                pathName="earnSetIntroduction";
                break;
        };

        if(type ==="new_product"){//首页于2017/11/20号改版，改版后，新手标使用单独的卡片来展示
            return null;
        }

        return (
            <Link to={{pathname:pathName,query:{type:type,productId:id}}}>
                <div className="home-card">
                    <Grid collapse={true}>
                        <Col cols={4} className="home-card-item">
                            <div className="yearRate">
                                {
                                    type === "moon" ?
                                    this._yearRateFormater(minRate) + "~" + this._yearRateFormater(maxRate):
                                    ( type === "rich" ? this._yearRateFormater(minRate) : this._yearRateFormater(productApr))
                                }
                                <span className="unit">%</span>
                                {
                                    !!rewardRate ?
                                    <span className="rewardRate">+{(rewardRate * 100).toFixed(1) + "%"}</span>  :
                                    null
                                }
                            </div>
                            <div className="subtitle" >
                                <span className="productName">{productName}&nbsp;•&nbsp;</span>
                                <span className="productRate"> 历史年化</span> 
                            </div>
                        </Col>
                        <Col cols={2} className="home-card-item">
                            <div className="deadline">
                                    <span className="label">期限 </span>
                                    <span className="unit">{repaymentLimit + repaymentTypeUnit}</span>
                                    {/* {
                                         type === "moon" ?
                                         <span> | 每月可退</span>:
                                         null
                                    } */}
                            </div>
                            <div className="remainAmount">
                                {this._renderCardStatus(type,status,remainAmount,orderSwitch,publishtimeL)}
                            </div>
                        </Col>
                    </Grid>
                    {
                        vipRate ?
                        <div className="vip-rate">{"VIP+" + (vipRate * 100).toFixed(1) + "%"}</div> :
                        null
                    }
                </div>
            </Link>
        )
    }
});


export  default HomeCommonCard;
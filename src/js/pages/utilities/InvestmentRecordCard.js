require("../../../scss/page/InvestmentRecordCard.scss");
import React from "react";
import classNames from 'classnames';

import Group from "../../UIComponents/Group";
import Grid from "../../UIComponents/Grid";
import Col from "../../UIComponents/Col";
import Icon from "../../UIComponents/Icon";

/*
 *  InvestmentRecordCard component
 * 这是理财计划投资明细，好采投投资明细和债权转让投资明细共用的卡片组件
 */
let InvestmentRecordCard=React.createClass({
    _renderInterestRate(interestRate){
        if(parseFloat(interestRate) === 0 ||   !!!interestRate ){
            return  null;
        }else {
            return (
                <span className="tag-icon">{"+" + interestRate}</span>
            )
        }
    },
    _renderRedPackage(redPackageAmount){
        if(parseFloat(redPackageAmount)=== 0 || !!!redPackageAmount){
            return null;
        }else {
            return (
                <span className="tag-icon">{"+" + redPackageAmount + "元"}</span>
            )
        }
    },
    _renderCardTag(status){
        if(status === "transferring"){
            return (
                <span className="tag-transfer"></span>
            )
        }else if(status === "transfered"){
            return (
                <span className="tag-transfered"></span>
            )

        }else {
            return null;
        }
    },
    _renderCardBody(props){
        let {
            dueInPrincipalAndInterest,//待收本息
            time,//下个还款日或者结清日期
            investAmount,//投资金额t
            investStatus,//该款投资所进入的状态（applying:申请加入中；repaying:回款中；clearing：已结清）
            }=props;
        if(investStatus === "applying"){//已结清的卡片结构跟其他种情况的不一样
            return (
                <Grid collapse={true} className="body">
                    <Col cols={2} className="investMoney-cell text-left">
                        <div className="subtitle">投资金额(元)</div>
                        <div className="number">{investAmount}</div>
                    </Col>
                    <Col cols={2}  />
                    <Col cols={2} className="text-right">
                        <img src={require("../../../img/daifankuan.png")} alt=""/>
                    </Col>
                </Grid>
            )
        }else {
            return (
                <Grid collapse={true} className="body">
                    <Col cols={2} className="preRepay-cell text-left">
                        <div className="subtitle">{investStatus === "repaying" ? "待收本息" : "已收本息"}</div>
                        <div className="number"><strong>{dueInPrincipalAndInterest}</strong></div>
                    </Col>
                    <Col cols={2} className="endTime-cell text-center">
                        <div className="subtitle">{investStatus === "repaying" ? "下个还款日" : "到期日期"}</div>
                        <div className="number">{time}</div>
                    </Col>
                    <Col cols={2} className="investMoney-cell text-right">
                        <div className="subtitle">投资金额(元)</div>
                        <div className="number">{investAmount}</div>
                    </Col>
                </Grid>
            )
        }
    },
    render(){
        let {
            id,
            productType,//产品类型（yyz_product,jjz_product,loan_product和creditor_product）
            title,//标的名称
            interestRate,//加息券的年化lilv
            redPackageAmount,//红包金额
            yearRate,//标的的预期年化
            deadline,//标的的期限,或者表示还款期数目，形如 “3/6”,表示剩余期数 / 总期数
            clickHandler,
            status,
            rewardRate
            }=this.props;



        return (
                <Group className="InvestmentRecord-card" onClick={clickHandler.bind(null,this.props)}>
                    <h6 className="header">
                        <span className="title">{title}</span>
                        {
                            productType === "creditor_product" ?
                            <span className="tag-icon transfer">转</span> :
                            null
                        }
                        {this._renderInterestRate(interestRate)}
                        {this._renderRedPackage(redPackageAmount)}
                    </h6>
                    {this._renderCardBody(this.props)}
                    <Grid collapse={true} className="footer">
                        <Col cols={2} className="text-left">{yearRate}{!!rewardRate ? "+" + rewardRate : null}</Col>
                        <Col cols={2} className="text-center">{deadline}</Col>
                        <Col cols={2} className="text-right">
                            {
                                productType === "yyz_product" || productType === "new_product" ?
                                "一次性还本付息" :
                                "按月结息,到期还本"
                            }
                        </Col>
                    </Grid>
                    {this._renderCardTag(status)}
                </Group>
        )
    }
});

module.exports=InvestmentRecordCard;
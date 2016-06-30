require("../../../scss/page/DailyEarn.scss");
import React from "react";
import classNames from 'classnames';
import {
    Link
} from 'react-router';

import Group from "../../UIComponents/Group";
import Grid from "../../UIComponents/Grid";
import Col from "../../UIComponents/Col";
import Button from "../../UIComponents/Button";

//utilites component
import productStatusMixin from "./productStatusMixin";

let DailyEarnCard=React.createClass({
    mixins:[productStatusMixin],
    render(){
        let {
            type,
            productName,
            productApr,
            repaymentLimit,
            repaymentTypeUnit,
            remainAmount,
            status
            }=this.props;
        let isSoldOut=this.getProductStatusText(type,status) === "售罄" ? true : false ;
        let dailyEarnCardItemClasses =classNames({
            "dailyEarn-card-item":true,
            "soldOut":isSoldOut
        });
        return (
            <Link to={{pathname:"earnSetIntroduction",query:{type:type}}}>
                <Group className="dailyEarn-card" noSidePadded={true}>
                    <h6 className="title">
                        <span className="icon-day"></span>
                        <span>{productName}</span>
                        <span className="dailyEarn-label">银行活期的26倍</span>
                    </h6>
                    <Grid collapse={true}>
                        <Col cols={3} className="dailyEarn-card-item">
                            <div className="text-center yearRate">{productApr}<span className="unit">%</span></div>
                            <div className="text-center subtitle" >年化收益</div>
                        </Col>
                        <Col cols={3} className={dailyEarnCardItemClasses}>
                            <div className="subtitle">
                                <div className="subtitle-left">
                                    <span className="icon-time"></span>
                                    投资期限
                                </div>
                                <div className="subtitle-right">
                                    <span className="amount">{repaymentTypeUnit}</span>
                                </div>
                            </div>
                            <div className="subtitle" style={{marginTop:"5px"}}>
                                {
                                    !isSoldOut ?
                                    (
                                        <div className="subtitle-left">
                                            <span className="icon-money"></span>
                                            可投金额
                                        </div> ) : null
                                }
                                {
                                    !isSoldOut ?
                                    (
                                        <div className="subtitle-right">
                                            <span className="amount">{remainAmount}</span>
                                            <span className="unit">万</span>
                                        </div> ): null
                                }

                                {
                                    isSoldOut ?
                                    (
                                        <Button amSize="xs" amStyle="primary" radius={true} >
                                            立即预约
                                        </Button> ): null
                                }

                            </div>
                        </Col>
                    </Grid>
                </Group>
            </Link>
        )
    }
});

export  default DailyEarnCard;
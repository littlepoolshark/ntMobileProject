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
import mixin from "./mixin";

let DailyEarnCard=React.createClass({
    mixins:[mixin],
    _renderSoldOutBtn(isSoldOut,orderSwitch){
        if(isSoldOut){
            if(orderSwitch === "false"){//是否关闭预约机制，“false”代表关闭了
                return (
                    <Button amSize="xs" amStyle="primary" radius={true} disabled>
                        已售罄
                    </Button>
                )
            }else {
                return (
                    <Button amSize="xs" amStyle="primary" radius={true}>
                        立即预约
                    </Button>
                    )

            }
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
            status,
            orderSwitch
            }=this.props;
        let isSoldOut=this._getProductStatusText(type,status) === "预约" ? true : false ;
        let dailyEarnCardItemClasses =classNames({
            "dailyEarn-card-item":true,
            "soldOut":isSoldOut
        });
        return (
            <Link to={{pathname:"earnSetIntroduction",query:{type:type,productId:id}}}>
                <Group className="dailyEarn-card" noSidePadded={true}>
                    <h6 className="title">
                        <span className="icon-day"></span>
                        <span>{productName}</span>
                        {/*<span className="dailyEarn-label">银行活期的26倍</span>*/}
                    </h6>
                    <Grid collapse={true}>
                        <Col cols={3} className="dailyEarn-card-item">
                            <div className="text-center yearRate">{(productApr * 100).toFixed(1)}<span className="unit">%</span></div>
                            <div className="text-center subtitle" >历史年化</div>
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
                                            <span className="amount">{(remainAmount / 10000).toFixed(2)}</span>
                                            <span className="unit">万</span>
                                        </div> ): null
                                }

                                {
                                   this._renderSoldOutBtn(isSoldOut,orderSwitch)
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
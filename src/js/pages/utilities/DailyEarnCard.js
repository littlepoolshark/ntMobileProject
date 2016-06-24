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

let DailyEarnCard=React.createClass({
    getDefaultProps(){
        return {
            yearRate:"8.0",
            isSoldOut:false
        }
    },
    render(){
        let dailyEarnCardItemClasses =classNames({
            "dailyEarn-card-item":true,
            "soldOut":this.props.isSoldOut
        });
        return (
            <Link to={{pathname:"earnSetIntroduction/",query:{type:"dailyEarn"}}}>
                <Group className="dailyEarn-card" noSidePadded={true}>
                    <h6 className="title">
                        <span className="icon-day"></span>
                        <span>天天赚</span>
                        <span className="dailyEarn-label">银行活期的26倍</span>
                    </h6>
                    <Grid collapse={true}>
                        <Col cols={3} className="dailyEarn-card-item">
                            <div className="text-center yearRate">{this.props.yearRate}<span className="unit">%</span></div>
                            <div className="text-center subtitle" >年化收益</div>
                        </Col>
                        <Col cols={3} className={dailyEarnCardItemClasses}>
                            <div className="subtitle">
                                <div className="subtitle-left">
                                    <span className="icon-time"></span>
                                    投资期限
                                </div>
                                <div className="subtitle-right">
                                    <span className="amount">活期</span>
                                </div>
                            </div>
                            <div className="subtitle" style={{marginTop:"5px"}}>
                                {
                                    !this.props.isSoldOut ?
                                    (
                                        <div className="subtitle-left">
                                            <span className="icon-money"></span>
                                            可投金额
                                        </div> ) : null
                                }
                                {
                                    !this.props.isSoldOut ?
                                    (
                                        <div className="subtitle-right">
                                            <span className="amount">100</span>
                                            <span className="unit">万</span>
                                        </div> ): null
                                }

                                {
                                    this.props.isSoldOut ?
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
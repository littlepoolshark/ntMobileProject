import "../../../scss/page/HomeNewbieProductCard.scss";
import React from "react";
import { Link } from 'react-router';
import Group from "../../UIComponents/Group";
import Grid from "../../UIComponents/Grid";
import Col from "../../UIComponents/Col";

const HomeNewbieProdectCard = (props) => {
    let {
        id,
        type,
        productName,
        productApr,
        repaymentLimit,
        repaymentTypeUnit
    } = props;

    return (
        <Link to={{ pathname: "earnSetIntroduction", query: { type: type, productId: id } }}>
            <Group id="homeNewbieProdectCard">
                <div className="tag"></div>
                <Grid collapse={true}>
                    <Col cols={4}>
                        <div className="left">
                            <div className="title">新用户专享</div>
                            <div className="subtitle">历史年化收益(%)</div>
                        </div>
                        <div className="right product-rate">{ (productApr * 100).toFixed(1)}</div>
                    </Col>
                    <Col cols={2}>
                        <div className="subtitle">体验期{repaymentLimit}{repaymentTypeUnit}</div>
                        <div className="purchaseBtn">立即抢购</div>
                    </Col>
                </Grid>
            </Group>
        </Link>
    )

};

export default HomeNewbieProdectCard;
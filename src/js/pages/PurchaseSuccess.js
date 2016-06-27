require("../../scss/page/PurchaseSuccess.scss");
import React from "react";

//ui component
import Group from "../UIComponents/Group";
import Accordion from "../UIComponents/Accordion";
import Container from "../UIComponents/Container";

//utilities component
import InvestmentRecord from "./utilities/InvestmentRecord";


let investmentList=[
    {
        user:"黄＊＊",
        amount:"100,000",
        date:"2-16-02-04"
    },
    {
        user:"黄＊＊",
        amount:"100,000",
        date:"2-16-02-04"
    },
    {
        user:"黄＊＊",
        amount:"100,000",
        date:"2-16-02-04"
    },
    {
        user:"黄＊＊",
        amount:"100,000",
        date:"2-16-02-04"
    },
    {
        user:"黄＊＊",
        amount:"100,000",
        date:"2-16-02-04"
    },
    {
        user:"黄＊＊",
        amount:"100,000",
        date:"2-16-02-04"
    },
    {
        user:"黄＊＊",
        amount:"100,000",
        date:"2-16-02-04"
    }
];

let PurchaseSuccess=React.createClass({
    _renderStageBar(type){
        if(type === "dailyEarn"){
            return (
                <Group id="dailyEarn">
                    <div className="stage-one">
                        <div><span className="icon-success"></span></div>
                        <div className="subtitle">今天</div>
                        <div className="title">成功购买<br/>天天赚1000000元</div>
                        <div className="stage-line"></div>
                    </div>

                    <div className="stage-two">
                        <div><span className="icon-start"></span></div>
                        <div className="subtitle">2016-02-02</div>
                        <div className="title">开始计息</div>
                    </div>
                </Group>
            )
        }else {
            return (
                <Group>
                    <div className="title">
                        <span className="icon-success"></span>
                        成功购买月月赚1000元
                        <div className="subtitle">今天</div>
                    </div>
                    <div className="placeholder first-stage"></div>
                    <div className="title">
                        <span className="icon-start"></span>
                        开始计息
                        <div className="subtitle">2016-02-01</div>
                    </div>
                    <div className="placeholder second-stage"></div>
                    <div className="title">
                        <span className="icon-end"></span>
                        项目到期预计收益110.11元
                        <div className="subtitle">2016-02-05</div>
                    </div>
                </Group>
            )

        }
    },
    render(){
        let type=this.props.location.query.type;
        return (
            <Container id="purchaseSuccess" scroll={false} style={{overflowY:"scroll"}}>
                {this._renderStageBar(type)}
                <Accordion defaultActiveKey={0}>
                    <Accordion.Item
                        title="投资记录"
                        key={0}
                    >
                        <InvestmentRecord recordList={investmentList}/>
                    </Accordion.Item>
                </Accordion>
            </Container>
        )
    }
});

export default  PurchaseSuccess;
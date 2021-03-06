require("../../scss/page/PurchaseSuccess.scss");
import React from "react";

//ui component
import Group from "../UIComponents/Group";
import Container from "../UIComponents/Container";
import NavBar from "../UIComponents/NavBar";
import List from "../UIComponents/List";

//utilities component
import InvestmentRecord from "./utilities/InvestmentRecord";


let PurchaseSuccess=React.createClass({
    _renderStageBar(productType,investMoney,lixiTime,endTime,expectedReward){
        let productTypeMap={
            new_product:"新手标",
            ttz_product:"天天赚",
            yyz_product:"月月赚",
            jjz_product:"季季赚",
            loan_product:"好采投",
            creditor_product:"债权转让",
            rich:"丰收盈",
            moon:"月满盈",
            glj:"果乐金",
            ced:"车e贷"
        };
       /* if(productType === "ttz_product"){
            return (
                <Group id="dailyEarn">
                    <div className="stage-one">
                        <div><span className="icon-success"></span></div>
                        <div className="subtitle">今天</div>
                        <div className="title">成功购买<br/>天天赚{investMoney}元</div>
                        <div className="stage-line"></div>
                    </div>

                    <div className="stage-two">
                        <div><span className="icon-start"></span></div>
                        <div className="subtitle">今天</div>
                        <div className="title">开始计息</div>
                    </div>
                </Group>
            )
        }else {

        }*/
        return (
            <Group>
                <div className="title">
                    <span className="icon-success"></span>
                    成功购买{productTypeMap[productType]}{investMoney}元
                    <div className="subtitle">今天</div>
                </div>
                <div className="placeholder first-stage"></div>
                <div className="title">
                    <span className="icon-start"></span>
                    开始计息
                    <div className="subtitle">
                        { productType === "ttz_product" ? "今天" : lixiTime}
                    </div>
                </div>
                <div className="placeholder second-stage"></div>
                {
                    productType === "ttz_product" ?
                    <div className="title">
                        <span className="icon-end"></span>
                        随时可退出
                    </div> :
                    <div className="title">
                        <span className="icon-end"></span>
                        项目到期收益{expectedReward}元
                        <div className="subtitle">{endTime}</div>
                    </div>
                }

            </Group>
        )

    },
    _handleNavDone(){
        this.context.router.push({
            pathname:"/productList"
        });
    },
    _jumpToNextLocation(productType){
        let nextLocation="";
        switch (productType){
            case "ttz_product":
                nextLocation="dailyEarnInvestmentRecord";
                break;
            case "new_product":
            case "yyz_product":
            case "jjz_product":
            case "loan_product":
            case "creditor_product":
            case "glj":
            case "ced":
            case "nyd":

               /* @note:以下三个组件/页面已经被废弃了，有空可以把他们删除掉
                nextLocation="earnSetInvestmentRecord";
                nextLocation="fixedLoanInvestmentRecord";
                nextLocation="creditorLoanInvestmentRecord";*/
                nextLocation="allProductEMInvestmentRecord";
                break;
            case "moon":
                nextLocation="moonLoanInvestmentRecord";
                break;
            default:
                break;
        }
        if(productType === "moon"){
            this.context.router.push({
                pathname:nextLocation,
                query:{
                    defaultActiveKey:0
                }
            });
        }else {
            this.context.router.push({
                pathname:nextLocation,
                query:{
                    productType
                }
            });
        }
    },
    render(){
        let {
            productType,//产品类型
            investMoney,//投资金额
            lixiTime,//起息时间
            endTime,//预计到期时间
            expectedReward//收益
            }=this.props.location.query;

        let doneNav= {
            component:"a",
            title: '完成'
        };
        return (
            <Container id="purchaseSuccess" scroll={false} >
                <NavBar
                    title="购买成功"
                    rightNav={[doneNav]}
                    amStyle="primary"
                    onAction={this._handleNavDone}
                />
                {this._renderStageBar(productType,investMoney,lixiTime,endTime,expectedReward)}
                <List>
                    <List.Item
                        href="javascript:void(0)"
                        title="投资记录"
                        onClick={this._jumpToNextLocation.bind(null,productType)}
                    />
                </List>
            </Container>
        )
    }
});

PurchaseSuccess.contextTypes = {
    router:React.PropTypes.object.isRequired
};

module.exports=PurchaseSuccess;
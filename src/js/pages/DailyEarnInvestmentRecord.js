require("../../scss/page/DailyEarnInvestmentRecord.scss");
/*let DailyEarnInvestmentRecordAction=require("../actions/DailyEarnInvestmentRecordAction.js");
let DailyEarnInvestmentRecordStore=require("../stores/DailyEarnInvestmentRecordStore.js");*/
import React from "react";

//ui component
import Container from "../UIComponents/Container";
import Tabs from "../UIComponents/Tabs";
import NavBar from "../UIComponents/NavBar";
import Loader from "../UIComponents/Loader";
import CSSCore from "../UIComponents/utils/CSSCore";


//更多理财列表页：DailyEarnInvestmentRecord component

let RecordItem=React.createClass({
    render(){
        return (
            <li>
                <span className="date">2016-05-30</span>
                <span className="amount">￥100.00</span>
            </li>
        )
    }
})

let DailyEarnInvestmentRecord=React.createClass({
    render(){
        let leftNav= {
            component:"a",
            icon: 'left-nav',
            title: '返回'
        };
        let rightNav= {
            component:"a",
            title:"配标详情"
        };
        return (
            <Container scrollable={true}   id="dailyEarnInvestmentRecord"  >
                <NavBar
                    title="灵活理财"
                    leftNav={[leftNav]}
                    rightNav={[rightNav]}
                    amStyle="primary"
                    onAction={this._handleLeftNavClick}
                />
                <Tabs defaultActiveKey={0} >

                    <Tabs.Item
                        title="投资明细"
                        key={0}
                        navStyle={null}
                    >
                        <ul id="investmentRecord">
                            <RecordItem />
                            <RecordItem />
                            <RecordItem />
                            <RecordItem />
                            <RecordItem />
                            <RecordItem />
                            <RecordItem />
                        </ul>
                    </Tabs.Item>
                    <Tabs.Item
                        title="退出明细"
                        key={1}
                        navStyle={null}
                    >
                        退出明细
                    </Tabs.Item>
                    <Tabs.Item
                        title="收益明细"
                        key={2}
                        navStyle={null}
                    >
                        收益明细
                    </Tabs.Item>
                </Tabs>

                <Loader amStyle="primary" rounded={true}/>
            </Container>
        )
    },
    componentDidMount(){

    },
    componentDidUpdate(){

    },
    componentWillUnmount(){

    }
});

module.exports=DailyEarnInvestmentRecord;
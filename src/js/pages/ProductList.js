require("../../scss/page/ProductList.scss");
import React from "react";

import Container from "../UIComponents/Container";
import Tabs from "../UIComponents/Tabs";
import List from "../UIComponents/List";

//utilites component
import DailyEarnCard from "./utilities/DailyEarnCard";
import CommonCard from "./utilities/CommonCard";

let data=[
    {
        title:"项目名称",
        after:<span>新手标160101-11</span>
    },
    {
        title:"项目名称",
        after:<span>新手标160101-11</span>
    },
    {
        title:"项目名称",
        after:<span>新手标160101-11</span>
    },
    {
        title:"项目名称",
        after:<span>新手标160101-11</span>
    },
    {
        title:"退出规则",
        after:<div>1.期满一次性还本付息<br/>2.月月赚暂不支持提前退出</div>
    }
];

let newbieLoanData={
    title:"新手标",
    type:"newbieLoan",
    yearRate:"15.0",
    deadline:"1",
    deadlineUnit:"个月",
    remainAmount:100000,
    isSoldOut:false
};

let monthlyEarnData={
    title:"月月赚",
    type:"monthlyEarn",
    yearRate:"9.5",
    deadline:"1",
    deadlineUnit:"个月",
    remainAmount:100000,
    isSoldOut:false
}

let quarterlyEarnData={
    title:"季季赚",
    type:"quarterlyEarn",
    yearRate:"10.5",
    deadline:"3",
    deadlineUnit:"个月",
    remainAmount:1000000,
    isSoldOut:true
}

let fixedLoanData={
    title:"好采投",
    type:"fixedLoan",
    yearRate:"10.8",
    deadline:"3",
    deadlineUnit:"个月",
    remainAmount:1000000,
    isSoldOut:false
}

let creditorRightData={
    title:"债权转让",
    type:"creditorRight",
    yearRate:"10.8",
    deadline:"5",
    deadlineUnit:"个月",
    remainAmount:800000,
    isSoldOut:true
}

function getWindowHeight(){
    var windowHeight = 0;
    if(document.compatMode == "CSS1Compat"){
        windowHeight = document.documentElement.clientHeight;
    }else{
        windowHeight = document.body.clientHeight;
    }
    return windowHeight;
}

//理财列表页：ProductList component
let ProductList=React.createClass({
    _test(){
        let productList=document.getElementById("productList");
        let offsetHeight=productList.offsetHeight;
        let scrollTop=productList.scrollTop;
        let scrollHeight=productList.scrollHeight;
        //console.log(scrollHeight ,scrollTop,offsetHeight);
        if(scrollHeight - offsetHeight - scrollTop < 10){
            alert("加载中....");
        }
    },
    render(){
        return (
            <Container scrollable={false} style={{overflow:"scroll"}}  id="productList" onTouchEnd={this._test}>

                {/* <Tabs defaultActiveKey={0}>

                    <Tabs.Item
                        title="项目介绍"
                        key={0}
                        navStyle={null}
                    >
                        <table >
                            <tbody>
                            {
                                data.map((item,i) => {
                                    return (
                                       <tr>
                                           <td className="title">{item.title}</td>
                                           <td className="content">{item.after}</td>
                                       </tr>
                                    )
                                })
                            }
                            </tbody>
                        </table>
                    </Tabs.Item>
                    <Tabs.Item
                        title="投资记录"
                        key={1}
                        navStyle={null}
                    >
                        <table >
                            <tbody>
                            {
                                data.map((item,i) => {
                                    return (
                                        <tr>
                                            <td className="title">{item.title}</td>
                                            <td className="content">{item.after}</td>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </table>
                    </Tabs.Item>
                </Tabs>*/}
                <DailyEarnCard isSoldOut={true}/>
                <CommonCard  {...newbieLoanData}/>
                <CommonCard  {...monthlyEarnData}/>
                <CommonCard  {...quarterlyEarnData}/>
                <CommonCard  {...fixedLoanData}/>
                <CommonCard  {...creditorRightData}/>
            </Container>
        )
    }
});

export  default ProductList;
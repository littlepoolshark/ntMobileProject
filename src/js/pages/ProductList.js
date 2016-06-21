require("../../scss/page/ProductList.scss");
import React from "react";

import Tabs from "../UIComponents/Tabs";
import List from "../UIComponents/List";

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

//理财列表页：ProductList component
let ProductList=React.createClass({
    render(){
        return (
            <div id="productList">
                <Tabs defaultActiveKey={0}>

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
                </Tabs>
            </div>
        )
    }
});

export  default ProductList;
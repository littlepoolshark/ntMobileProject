require("../../scss/page/MoreProductList.scss");
let MoreProductListAction=require("../actions/MoreProductListAction.js");
let MoreProductListStore=require("../stores/MoreProductListStore.js");
import React from "react";

//ui component
import Container from "../UIComponents/Container";
import Tabs from "../UIComponents/Tabs";
import Loader from "../UIComponents/Loader";
import CSSCore from "../UIComponents/utils/CSSCore";

//utilites component
import ProductListCommonCard from "./utilities/ProductListCommonCard";



//更多理财列表页：MoreProductList component

let MoreProductList=React.createClass({
    getInitialState(){
        return MoreProductListStore.getAll();
    },
    _loadMoreData(event){
        //通过userAgent的探测来判断客户端是IOS还是Android,以便让步解决在IOS手机下面fixed特性所产生的诡异现象
        /*if(!!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){
            document.querySelector(".tabs").style.paddingTop=0;
            document.querySelector(".tabs-nav").style.position="relative";
        }*/

        let moreProductList=document.getElementById("moreProductList");
        let offsetHeight=moreProductList.offsetHeight;//元素出现在视口中区域的高度
        let scrollTop=moreProductList.scrollTop;//元素已经滚动的距离
        let scrollHeight=moreProductList.scrollHeight;//元素总的内容高度

        let currTab=document.getElementById("fixedLoanTab");
        let currListType=CSSCore.hasClass(currTab,"active") ? "fixedLoan" : "creditorLoan";

        if(scrollHeight - offsetHeight - scrollTop <= 3){
            MoreProductListAction.getNextPage(currListType);
            Loader.show();
        }
    },
    render(){
        return (
            <Container
                scrollable={true}
                id="moreProductList"
                onScroll={this._loadMoreData}
            >
                <Tabs defaultActiveKey={0} >

                    <Tabs.Item
                        title="好采投"
                        key={0}
                        navStyle={null}
                        id="fixedLoanTab"
                    >
                        {
                            this.state.fixedLoanList.map(function(item,index){
                                return <ProductListCommonCard {...item} key={item.type+item.id}/>
                            })
                        }
                    </Tabs.Item>
                    <Tabs.Item
                        title="债权转让"
                        key={1}
                        navStyle={null}
                    >
                        {
                            this.state.creditorLoanList.map(function(item,index){
                                return <ProductListCommonCard {...item} key={item.type+item.id}/>
                            })
                        }
                    </Tabs.Item>
                </Tabs>
                <Loader amStyle="primary" rounded={true}/>
            </Container>
        )
    },
    componentDidMount(){
        MoreProductListAction.getInitialData();

        MoreProductListStore.bind("change",function(){
            this.setState(MoreProductListStore.getAll())
        }.bind(this));

        //通过userAgent的探测来判断客户端是IOS还是Android,以便解决在IOS手机下面fixed特性所产生的诡异现象
    },
    componentDidUpdate(){
        Loader.hide();
    },
    componentWillUnmount(){
        MoreProductListStore.unbind("change");
        MoreProductListStore.clearAll();
    }
});

module.exports=MoreProductList;
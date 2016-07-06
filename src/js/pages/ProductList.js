require("../../scss/page/ProductList.scss");
let ProductListAction=require("../actions/ProductListAction.js");
let ProductListStore=require("../stores/ProductListStore.js");
import React from "react";

//ui component
import Container from "../UIComponents/Container";
import Tabs from "../UIComponents/Tabs";
import List from "../UIComponents/List";
import Loader from "../UIComponents/Loader";

//utilites component
import DailyEarnCard from "./utilities/DailyEarnCard";
import ProductListCommonCard from "./utilities/ProductListCommonCard";


//理财列表页：ProductList component
ProductListAction.getNextPage();
let ProductList=React.createClass({
    getInitialState(){
        return {
            productList:ProductListStore.getAll()
        }
    },
    _loadMoreData(){
        let productList=document.getElementById("productList");
        let offsetHeight=productList.offsetHeight;//元素出现在视口中区域的高度
        let scrollTop=productList.scrollTop;//元素已经滚动的距离
        let scrollHeight=productList.scrollHeight;//元素总的内容高度
        if(scrollHeight - offsetHeight - scrollTop < 1){
            ProductListAction.getNextPage();
            Loader.show();
        }
    },
    render(){
        return (
            <Container scrollable={false} style={{overflow:"scroll"}}  id="productList" onScroll={this._loadMoreData}>

                {
                    this.state.productList.map(function(item,index){
                        if(item.type === "ttz_product"){
                            return (
                                <DailyEarnCard key={item.type+item.id} {...item}/>
                            )
                        }else {
                            return (
                                <ProductListCommonCard key={item.type+item.id}  {...item}/>
                            )
                        }
                    })
                }

                <Loader amStyle="success" rounded={true} />
            </Container>
        )
    },
    componentDidMount(){
        ProductListStore.bind("change",function(){
            let productList=ProductListStore.getAll();
            this.setState({
                productList:productList
            })
        }.bind(this));
    },
    componentDidUpdate(){
        Loader.hide();
    }
});

export  default ProductList;
require("../../scss/page/ProductList.scss");
let ProductListAction=require("../actions/ProductListAction.js");
let ProductListStore=require("../stores/ProductListStore.js");
import React from "react";
import { Link } from 'react-router';

//ui component
import Container from "../UIComponents/Container";
import Tabs from "../UIComponents/Tabs";
import List from "../UIComponents/List";
import Loader from "../UIComponents/Loader";

//utilites component
import DailyEarnCard from "./utilities/DailyEarnCard";
import ProductListCommonCard from "./utilities/ProductListCommonCard";


//理财列表页：ProductList component

let ProductList=React.createClass({
    getInitialState(){
        return {
            productList:ProductListStore.getAll()
        }
    },
    render(){
        return (
            <Container scrollable={false} style={{overflow:"scroll"}}  id="productList" >

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
                <Link to="/moreProductList"><div className="checkMore-button">点击查看更多</div></Link>
            </Container>
        )
    },
    componentDidMount(){
        ProductListAction.getNextPage();

        ProductListStore.bind("change",function(){
            let productList=ProductListStore.getAll();
            this.setState({
                productList:productList
            })
        }.bind(this));
    },
    componentWillUnmount(){
        ProductListStore.unbind("change");
        ProductListStore.clearAll();
    }
});

module.exports=ProductList;
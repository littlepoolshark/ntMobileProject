require("../../scss/page/ProductList.scss");
let ProductListAction=require("../actions/ProductListAction.js");
let ProductListStore=require("../stores/ProductListStore.js");
import React from "react";
import { Link } from 'react-router';

//ui component
import Container from "../UIComponents/Container";
import Tabs from "../UIComponents/Tabs";
import List from "../UIComponents/List";
import NavBar from "../UIComponents/NavBar";
import Loader from "../UIComponents/Loader";
import Modal from "../UIComponents/modal/Modal";

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
    _handleNavClick(){

    },
    render(){
        let leftNav= {
            component:"a",
            icon: 'left-nav',
            title: '返回'
        };
        let scrollable=this.state.productList.length > 0 ? true : false;
        let isModalOpen=this.state.productList.length > 0 ? false : true;
        let checkMoreClass=this.state.productList.length > 0 ? "show" : "hide"
        return (
            <Container scrollable={scrollable}   id="productList" >
                {/*<NavBar
                    title="理财"
                    leftNav={[leftNav]}
                    amStyle="primary"
                    onAction={this._handleNavClick}
                />*/}
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
                <Link to="/moreProductList" className={checkMoreClass}><div className="checkMore-button">点击查看更多</div></Link>
                <Modal
                    title={"努力加载中..."}
                    isOpen={isModalOpen}
                    role="loading"
                >
                    <Loader />
                </Modal>
            </Container>
        )
    },
    componentDidMount(){
        ProductListAction.getNextPage();

        ProductListStore.bind("change",function(){
            let productList=ProductListStore.getAll();
            this.setState({
                productList:productList,
                isModalOpen:false,
                scrollable:true
            })
        }.bind(this));

    },
    componentWillUnmount(){
        ProductListStore.unbind("change");
        ProductListStore.clearAll();
    }
});



ProductList.contextTypes = {
    router:React.PropTypes.object.isRequired
};



module.exports=ProductList;
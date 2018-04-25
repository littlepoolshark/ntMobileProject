require("../../scss/page/ProductList.scss");
let ProductListAction=require("../actions/ProductListAction.js");
let ProductListStore=require("../stores/ProductListStore.js");
import React from "react";
import { Link } from 'react-router';
import classNames from "classnames";

//ui component
import Container from "../UIComponents/Container";
import Tabs from "../UIComponents/Tabs";
import List from "../UIComponents/List";
import NavBar from "../UIComponents/NavBar";
import Loader from "../UIComponents/Loader";
import Group from "../UIComponents/Group";
import Grid from "../UIComponents/Grid";
import Col from "../UIComponents/Col";
import Icon from "../UIComponents/Icon";

//utilites component
import DailyEarnCard from "./utilities/DailyEarnCard";
import ProductListCommonCard from "./utilities/ProductListCommonCard";
import ProductListCardWrapper from "./utilities/ProductListCardWrapper";


//投资列表页：ProductList component

let ProductList=React.createClass({
    getInitialState(){
        return {
            data:ProductListStore.getAll()
        }
    },
    _jumpToMoreProductList(iShowCreditorLoanTab){
        let locationObj={
            pathname:"moreProductList"
        };
        if(iShowCreditorLoanTab){
            locationObj.query={
                showTabName:"creditorLoan"
            }
        }
        this.context.router.push(locationObj);
    },
    render(){
        let leftNav= {
            component:"a",
            icon: 'left-nav',
            title: '返回'
        };
        let {
            list,
            transferringCount
        }=this.state.data;
        let isLoading=list.length > 0 ? false : true;
        let containerClass=classNames({
            "loading":isLoading
        });

        return (
            <Container scrollable={isLoading ? false : true}   id="productList" className={containerClass}>
                {
                    isLoading ?
                    <div className="text-center loadingImg-wrapper">
                        <img src={require("../../img/loading_productList.gif")} alt="" className="loading-img"/> <br/>
                        努力加载中......
                    </div> :
                    <div>
                        {
                            list.map(function(item,index){
                                if(item.items && item.items.length > 0){
                                    return (
                                        <ProductListCardWrapper type={item.type} key={index+1}>
                                            {
                                                item.items.map(function(item,index){
                                                    return (
                                                        <ProductListCommonCard key={item.type+item.id}  {...item} showTitleForTTZOrNewbieLoan={false}/>
                                                    )
                                                })
                                            }
                                        </ProductListCardWrapper>
                                    )
                                }else {
                                    return null;
                                }

                            })
                        }

                        {/*<Group className="transfer-card" onClick={this._jumpToMoreProductList.bind(null,true)}>
                            <Grid >
                                <Col cols={4} >
                                    <Grid collapse={true}>
                                        <Col cols={3} className="transfer-title"><Icon classPrefix="imgIcon" name="zzlc"/>债权转让</Col>
                                        <Col cols={3} className="transfer-count"><strong>{transferringCount}</strong>个项目</Col>
                                    </Grid>
                                </Col>
                                <Col cols={2}></Col>
                            </Grid>
                        </Group>*/}

                        <div className="text-center">
                            <div className="checkMore-button" onClick={this._jumpToMoreProductList.bind(null,false)}>查看全部投资项目</div>
                        </div>
                        
                    </div>
                }
            </Container>
        )
    },
    componentDidMount(){
        ProductListAction.getNextPage();

        ProductListStore.bind("change",function(){
            this.setState({
                data:ProductListStore.getAll()
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
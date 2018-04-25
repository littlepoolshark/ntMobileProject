require("../../scss/page/UserStoryList.scss");
let UserStoryListAction=require("../actions/UserStoryListAction.js");
let UserStoryListStore=require("../stores/UserStoryListStore.js");
import React from "react";
import {
    Link
} from 'react-router';

import Container from "../UIComponents/Container";
import Loader from "../UIComponents/Loader";





//用户中心页面：UserStoryList component
let UserStoryList=React.createClass({
    getInitialState(){
        return {
            data:UserStoryListStore.getAll(),
            isLoadingData:true
        }
    },
    _handleScroll(){
        let userStoryList=document.getElementById("userStoryList");
        let offsetHeight=userStoryList.offsetHeight;//元素出现在视口中区域的高度
        let scrollTop=userStoryList.scrollTop;//元素已经滚动的距离
        let scrollHeight=userStoryList.scrollHeight;//元素总的内容高度

        if(scrollHeight - offsetHeight - scrollTop <= 3){
            UserStoryListAction.getNextPage();
            Loader.show();
        }
    },
    render(){
        let userStoryList=this.state.data;
        let isLoadingData=this.state.isLoadingData;
        return (
            <Container scrollable={true} id="userStoryList" onScroll={this._handleScroll}>
                <ul className="userStoryList">
                    {
                        userStoryList.map(function(item,index){
                            return (
                                <li key={item.id}><Link to="BannerPageWrapper"  query={{iframeSource:item.link}}><img src={item.pic} alt="" className="responsive"/></Link></li>
                            )
                        }.bind(this))
                    }
                </ul>
                {
                    isLoadingData ?
                    <Loader amStyle="primary" rounded={true}/> :
                    null
                }

            </Container>
        )
    },
    componentDidMount(){
        UserStoryListAction.getNextPage();

        UserStoryListStore.bind("change",function(){
            this.setState({
                data:UserStoryListStore.getAll(),
                isLoadingData:false
            });

        }.bind(this))
    },
    componentWillUnmount(){
        UserStoryListStore.clearAll();
    }
});

UserStoryList.contextTypes = {
    router:React.PropTypes.object.isRequired
};

module.exports=UserStoryList;
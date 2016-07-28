require("../../scss/page/MessageList.scss");
let MessageListAction=require("../actions/MessageListAction.js");
let MessageListStore=require("../stores/MessageListStore.js");
import React from "react";
import {
    Link
} from 'react-router';

import Container from "../UIComponents/Container";
import Grid from "../UIComponents/Grid";
import Col from "../UIComponents/Col";
import Icon from "../UIComponents/Icon";
import Loader from "../UIComponents/Loader";
import Modal from "../UIComponents/modal/Modal";


let MessageListItem=React.createClass({
    render(){
        let {
            id,
            flag,
            title,
            createTime,
            content,
            clickHandler
            }=this.props;
        return (
            <li className="messageList-item cf" onClick={clickHandler}>
                <div className="icon-wrapper">
                    <Icon classPrefix="imgIcon" name={flag === "read" ? "letter-open" : "letter"}/>
                </div>
                <div className="messageList-item-body">
                    <div className="title">
                        <span className="title-text">{title}</span>
                        <span className="date fr">{createTime}</span>
                    </div>
                    <div className="content" dangerouslySetInnerHTML={{__html:content}} ></div>
                </div>
            </li>
        )
    }
});

//用户中心页面：MessageList component
let MessageList=React.createClass({
    getInitialState(){
        return {
            messageList:MessageListStore.getAll(),
            isModalOpen:false,
            currMessageContent:""
        }
    },
    _handleScroll(){
        let messageList=document.getElementById("messageList");
        let offsetHeight=messageList.offsetHeight;//元素出现在视口中区域的高度
        let scrollTop=messageList.scrollTop;//元素已经滚动的距离
        let scrollHeight=messageList.scrollHeight;//元素总的内容高度

        if(scrollHeight - offsetHeight - scrollTop <= 0){
            MessageListAction.getNextPage();
            Loader.show();
        }
    },
    _handleModalClose(){
        this.setState({
            isModalOpen:false
        })
    },
    _showMessageDetail(content){
        this.setState({
            isModalOpen:true,
            currMessageContent:content
        })
    },
    _handleClick(id,cotent){
        this._showMessageDetail(cotent);
        MessageListAction.readMessage(id,"1");
    },
    render(){
        return (
            <Container scrollable={true} id="messageList" onScroll={this._handleScroll}>
                <ul className="messageList">
                    {
                        this.state.messageList.map(function(item,index){
                            return (
                                <MessageListItem {...item} key={item.id} clickHandler={this._handleClick.bind(null,item.id,item.content)}/>
                            )
                        }.bind(this))
                    }
                </ul>
                <Loader amStyle="primary" rounded={true}/>
                <Modal
                    title="消息正文"
                    ref="detailModal"
                    isOpen={this.state.isModalOpen}
                    role="popup"
                    onDismiss={this._handleModalClose}
                >
                    <div className="content" dangerouslySetInnerHTML={{__html:this.state.currMessageContent}} ></div>
                </Modal>
            </Container>
        )
    },
    componentDidMount(){
        MessageListAction.getNextPage();

        MessageListStore.bind("change",function(){
            this.setState({
                messageList:MessageListStore.getAll()
            })
        }.bind(this))
    },
    componentWillUnmount(){
        MessageListStore.unbind("change");
    }
});

MessageList.contextTypes = {
    router:React.PropTypes.object.isRequired
};

module.exports=MessageList;
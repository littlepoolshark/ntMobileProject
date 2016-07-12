var DefaultStore=require("../stores/DefaultStore");
var DefaultAction=require("../actions/DefaultAction");

import React from "react";
import {
    Link
} from 'react-router';

import Button from "../UIComponents/Button";
//用户中心页面：UserHome component
let UserHome=React.createClass({
    _handleLogout(){
        DefaultAction.logout();
    },
    render(){
        return (
            <div>这是用户中心页面  <Button onClick={this._handleLogout}>退出登录</Button></div>
        )
    },
    componentDidMount(){
        DefaultStore.bind("logoutSuccess",function(){
            this.context.router.push({
                pathname:"/home"
            })
        }.bind(this));
    }
});

UserHome.contextTypes = {
    router:React.PropTypes.object.isRequired
};

export default UserHome;
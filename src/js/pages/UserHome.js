
import React from "react";
import {
    Link
} from 'react-router';
import Button from "../UIComponents/Button";
//用户中心页面：UserHome component
let UserHome=React.createClass({
    render(){
        return (
            <div>这是用户中心页面  <Button><Link to="/">回到登陆页面</Link> </Button></div>
        )
    }
});

export default UserHome;
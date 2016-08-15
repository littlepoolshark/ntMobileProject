require("../../scss/page/DailyEarnRollOutSuccess.scss");
import React from "react";

//ui component
import Group from "../UIComponents/Group";
import Container from "../UIComponents/Container";
import NavBar from "../UIComponents/NavBar";


let DailyEarnRollOutSuccess=React.createClass({
    _handleNavDone(){
        this.context.router.push({
            pathname:"dailyEarnCenter"
        });
    },
    render(){
        let doneNav= {
            component:"a",
            title: '完成'
        };
        let rollOutAmount=this.props.location.query.rollOutAmount;
        return (
            <Container id="dailyEarnRollOutSuccess" >
                <NavBar
                    title="转出成功"
                    rightNav={[doneNav]}
                    amStyle="primary"
                    onAction={this._handleNavDone}
                />
                <Group>
                    <div><span className="icon-success-green"></span></div>
                    <div className="title">天天转出已成功转出</div>
                    <div className="amount">￥{rollOutAmount}</div>
                    <div className="subtitle">到您的余额账户</div>
                </Group>
            </Container>
        )
    }
});

DailyEarnRollOutSuccess.contextTypes = {
    router:React.PropTypes.object.isRequired
};

module.exports=DailyEarnRollOutSuccess;
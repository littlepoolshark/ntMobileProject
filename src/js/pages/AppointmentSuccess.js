require("../../scss/page/AppointmentSuccess.scss");
import React from "react";

//ui component
import Group from "../UIComponents/Group";
import Container from "../UIComponents/Container";
import NavBar from "../UIComponents/NavBar";


let AppointmentSuccess=React.createClass({
    _handleNavDone(){
        this.context.router.push({
            pathname:"/productList"
        });
    },
    render(){
        let {
            investMoney
            }=this.props.location.query;
        let doneNav= {
            component:"a",
            title: '完成'
        };
        return (
            <Container id="appointmentSuccess" >
                <NavBar
                    title="预约成功"
                    rightNav={[doneNav]}
                    amStyle="primary"
                    onAction={this._handleNavDone}
                />
                <Group>
                    <div><span className="icon-success-green"></span></div>
                    <div className="title">您已经成功预约天天赚</div>
                    <div className="subtitle">预约金额：<strong>{investMoney}</strong> 元</div>
                </Group>
            </Container>
        )
    }
});

AppointmentSuccess.contextTypes = {
    router:React.PropTypes.object.isRequired
};

module.exports=AppointmentSuccess;
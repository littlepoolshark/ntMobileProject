require("../../scss/page/AppointmentSuccess.scss");
import React from "react";

//ui component
import Group from "../UIComponents/Group";
import Container from "../UIComponents/Container";


let AppointmentSuccess=React.createClass({
    render(){
        return (
            <Container id="appointmentSuccess" >
                <Group>
                    <div><span className="icon-success-green"></span></div>
                    <div className="title">您已经成功预约天天赚</div>
                    <div className="subtitle">预约金额：<strong>1000.00</strong> 元</div>
                </Group>
            </Container>
        )
    }
});

export default  AppointmentSuccess;
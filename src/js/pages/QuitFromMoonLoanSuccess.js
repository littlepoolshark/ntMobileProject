require("../../scss/page/QuitFromMoonLoanSuccess.scss");
import React from "react";

//ui component
import Group from "../UIComponents/Group";
import Container from "../UIComponents/Container";
import NavBar from "../UIComponents/NavBar";


let QuitFromMoonLoanSuccess=React.createClass({
    _handleNavDone(){
        this.context.router.push({
            pathname:"moonLoanInvestmentRecord",
            query:{
                defaultActiveKey:2
            }
        });
    },
    render(){
        let {
            actionType,
            quitDate
            }=this.props.location.query;

        let doneNav= {
            component:"a",
            title: '完成'
        };
        return (
            <Container id="quitFromMoonLoanSuccess" >
                <NavBar
                    title={ actionType === "firstApply" ? "预约成功" : "修改预约成功"}
                    rightNav={[doneNav]}
                    amStyle="primary"
                    onAction={this._handleNavDone}
                />
                <Group>
                    <div><span className="icon-success-yellow"></span></div>
                    <div className="title">
                        {
                            actionType === "firstApply" ?
                            "预约退出成功！" :
                            "修改预约成功！"
                        }
                    </div>
                    <div className="subtitle">请耐心等待退出日期</div>
                    <div className="quit-date">预约退出日期：{quitDate}</div>
                </Group>
            </Container>
        )
    }
});

QuitFromMoonLoanSuccess.contextTypes = {
    router:React.PropTypes.object.isRequired
};

module.exports=QuitFromMoonLoanSuccess;
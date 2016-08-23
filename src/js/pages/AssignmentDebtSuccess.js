require("../../scss/page/AssignmentDebtSuccess.scss");
import React from "react";

//ui component
import Group from "../UIComponents/Group";
import Container from "../UIComponents/Container";
import NavBar from "../UIComponents/NavBar";


let AssignmentDebtSuccess=React.createClass({
    _handleNavClick(){
        this.context.router.push({
            pathname:"fixedLoanInvestmentRecord"
        });
    },
    render(){
        let {
            transferPrice,//转让价格
            bqdj,//本期待结收益
            dsbx//待收本息
            }=this.props.location.state;
        console.log("this.props.location.state:",this.props.location.state);
        let rightNav= {
            component:"a",
            title: '完成'
        };
        return (
            <Container id="assignmentDebtSuccess" >
                <NavBar
                    title="债权成功"
                    rightNav={[rightNav]}
                    amStyle="primary"
                    onAction={this._handleNavClick}
                />
                <Group>
                    <div><span className="icon-success-green"></span></div>
                    <div className="title">债权已经成功转出</div>
                    <div className="subtitle">请耐心等待受让人购买</div>
                </Group>
            </Container>
        )
    }
});

AssignmentDebtSuccess.contextTypes = {
    router:React.PropTypes.object.isRequired
};

module.exports=AssignmentDebtSuccess;
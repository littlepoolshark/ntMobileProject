require("../../scss/page/AssignmentDebtSuccess.scss");
import React from "react";

//ui component
import Group from "../UIComponents/Group";
import Container from "../UIComponents/Container";
import NavBar from "../UIComponents/NavBar";


let AssignmentDebtSuccess=React.createClass({
    _handleNavClick(){
        this.context.router.replace({
            pathname:"userHome"
        });
    },
    render(){
        let {
            investMoney,//投资金额
            transferPrice,//转让价格
            bqdj,//本期待结收益
            dsbx//待收本息
            }=this.props.location.state;
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
                <Group >
                    <div><span className="icon-success-green"></span></div>
                    <div className="title">债权已经成功转出</div>
                    <div className="subtitle">请耐心等待受让人购买</div>
                    <div className="creditorLoan-summary">
                        <div className="row">
                            <span className="label">投资金额</span>
                            <span className="number">￥{investMoney}</span>
                        </div>
                        <div className="row">
                            <span className="label">待收本息</span>
                            <span className="number">￥{dsbx}</span>
                        </div>
                        <div className="row">
                            <span className="label">本期待结收益</span>
                            <span className="number">￥{bqdj}</span>
                        </div>
                        <div className="row">
                            <span className="label">转让价格</span>
                            <span className="number">￥{transferPrice}</span>
                        </div>
                    </div>
                </Group>
            </Container>
        )
    }
});

AssignmentDebtSuccess.contextTypes = {
    router:React.PropTypes.object.isRequired
};

module.exports=AssignmentDebtSuccess;
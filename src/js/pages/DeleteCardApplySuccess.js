require("../../scss/page/DeleteCardApplySuccess.scss");
import React from "react";

//ui component
import Group from "../UIComponents/Group";
import Container from "../UIComponents/Container";
import NavBar from "../UIComponents/NavBar";


let DeleteCardApplySuccess=React.createClass({
    _handleNavDone(){
        this.context.router.push({
            pathname:"myBankCard"
        });
    },
    render(){
        let doneNav= {
            component:"a",
            title: '完成'
        };
        return (
            <Container id="deleteCardApplySuccess" >
                <NavBar
                    title="提交成功"
                    rightNav={[doneNav]}
                    amStyle="primary"
                    onAction={this._handleNavDone}
                    />
                <Group>
                    <div><span className="icon-success-green"></span></div>
                    <div className="title">删卡请求已成功提交</div>
                    <div className="subtitle">请耐心等待审核</div>
                </Group>
            </Container>
        )
    }
});

DeleteCardApplySuccess.contextTypes = {
    router:React.PropTypes.object.isRequired
};

module.exports=DeleteCardApplySuccess;
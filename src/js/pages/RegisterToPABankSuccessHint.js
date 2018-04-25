require("../../scss/page/RegisterToPABankSuccessHint.scss");
import React from "react";

//ui component
import Container from "../UIComponents/Container";
import Group from "../UIComponents/Group";
import Button from "../UIComponents/Button";
import NavBar from "../UIComponents/NavBar";

let RegisterToPABankSuccessHint=React.createClass({
    _handleNavClick(){
        this.context.router.push({
            pathname:"home"
        });
    },
    _jumpToProductList(){
        this.context.router.push({
            pathname:"productList"
        });
    },
    render(){
        let rightNav= {
            component:"a",
            title: '完成'
        };

        return (
            <Container id="registerToPABankSuccessHint">
                <NavBar
                    title="开通存管子账户"
                    rightNav={[rightNav]}
                    amStyle="primary"
                    onAction={this._handleNavClick}
                />
                <div className="wrapper">
                    <Group>
                        <div className="safty-guarder"></div>
                        <div className="title text-center">
                            开户成功<br/>
                            账户资金由平安银行存管
                        </div>
                    </Group>
                </div>
                <div className="btn-wrapper">
                    <Button amStyle="primary" block radius onClick={this._jumpToProductList}>立即投资</Button>
                </div>
            </Container>
        )
    }
});

RegisterToPABankSuccessHint.contextTypes = {
    router:React.PropTypes.object.isRequired
};

module.exports=RegisterToPABankSuccessHint;
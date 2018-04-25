require("../../scss/page/SkipRegisteringZX.scss");
var SkipRegisteringZXAction=require("../actions/SkipRegisteringZXAction");
var SkipRegisteringZXStore=require("../stores/SkipRegisteringZXStore");
import React from "react";

//ui component
import Container from "../UIComponents/Container";
import Button from "../UIComponents/Button";
import NavBar from "../UIComponents/NavBar";
import Message from "../UIComponents/Message";

let SkipRegisteringZX=React.createClass({
    _handleNavClick(){
       this.context.router.goBack();
    },
    _handleSubmitSkipForm(){
        SkipRegisteringZXAction.submitSkipForm();
    },
    render(){
        let leftNav= {
            component:"a",
            icon: 'left-nav',
            title: '返回'
        };
        return (
            <Container id="skipRegisteringZX">
                <NavBar
                    title="信息确认"
                    leftNav={[leftNav]}
                    amStyle="primary"
                    onAction={this._handleNavClick}
                />
                <div className="wrapper">
                    <div className="title text-center">确认暂不开通存管子账户？</div>
                    <Button block amStyle="primary" radius style={{marginTop:"2rem"}} onClick={this._handleSubmitSkipForm}>确认</Button>
                    <div className="warm-hint">
                        <p><span className="title-badge"></span>选择暂不开通存管子账户有什么影响？</p>
                        <p>1、选择暂不开通存管子账户以后，您的充值、提现以及投资将不会受到影响。</p>
                        <p>2、您仍可在以后的投资过程中选择开通存管子账户。</p>
                    </div>
                </div>

            </Container>
        )
    },
    componentDidMount(){
        SkipRegisteringZXAction.getInitialData();

        SkipRegisteringZXStore.bind("skipRegisteringZXSuccess",function(){
            let {
                realName,
                isIdCardVerified,
                hadSetDealPassword,
                hadBindBankCard
                }=SkipRegisteringZXStore.getAll();
            if(!isIdCardVerified){
                this.context.router.push({
                    pathname:"realNameAuthentication",
                    query:{
                        beforeComponent:"skipRegisteringZX",
                        entryComponent:"userHome"
                    }
                });
            }else if(!hadSetDealPassword){
                this.context.router.push({
                    pathname:"setDealPassword",
                    query:{
                        beforeComponent:"skipRegisteringZX",
                        entryComponent:"userHome"
                    }
                });
            }else if(!hadBindBankCard){
                this.context.router.push({
                    pathname:"bindBankCard",
                    query:{
                        realName:realName,
                        beforeComponent:"skipRegisteringZX",
                        entryComponent:"userHome"
                    }
                });
            }
        }.bind(this));

        SkipRegisteringZXStore.bind("skipRegisteringZXFailed",function(){
            Message.broadcast("服务器正忙，请稍后再试！")
        }.bind(this));
    }
});

SkipRegisteringZX.contextTypes = {
    router:React.PropTypes.object.isRequired
};

module.exports=SkipRegisteringZX;
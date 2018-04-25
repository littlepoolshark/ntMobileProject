require("../../scss/page/PlatformData.scss");
import React from "react";

//ui component
import Container from "../UIComponents/Container";
import Icon from "../UIComponents/Icon";


import cookie from "../lib/cookie";
import getParamObjFromUrl from "../lib/getParamObjFromUrl";


let PlatformData=React.createClass({
    _jumpBack(){
        this.context.router.goBack();
    },
    render(){
        let {
            totalAmountOfInvestment,
            registerUserCount,
            totalDay
            }=this.props.location.query;
        return (
            <Container id="platformData"  scrollable={true}>
                <nav><Icon name="left-nav" onClick={this._jumpBack}/></nav>
                <div className="content-wrapper">
                    <img src={require("../../img/platformData-bg2.png")} alt="" className="top-bg-img"/>
                    <section className="data-group">
                        <div className="title">交易额</div>
                        <div className="subtitle">{totalAmountOfInvestment}</div>
                    </section>
                    <section className="data-group">
                        <div className="title">注册人数</div>
                        <div className="subtitle">{registerUserCount}</div>
                    </section>
                    <section className="data-group" style={{marginBottom:0}}>
                        <div className="title">运营天数</div>
                        <div className="subtitle">{totalDay}</div>
                    </section>
                    <img src={require("../../img/platformData-bg3.png")} alt="" className="bottom-bg-img"/>
                </div>
            </Container>
        )
    },
    componentDidMount(){

    }
});

PlatformData.contextTypes = {
    router:React.PropTypes.object.isRequired
};

module.exports=PlatformData;
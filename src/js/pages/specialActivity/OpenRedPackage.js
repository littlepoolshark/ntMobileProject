require("../../../scss/page/specialActivity/OpenRedPackage.scss");
let OpenRedPackageAction = require("../../actions/OpenRedPackageAction");
let OpenRedPackageStore = require("../../stores/OpenRedPackageStore");
import React, { PropTypes } from "react";
import { Link } from "react-router";
import classNames from "classnames";

//ui component
import Container from "../../UIComponents/Container";
import Message from "../../UIComponents/Message";

//lib
import mixin from "../utilities/mixin";
import TransitionEvent from '../../UIComponents/utils/TransitionEvents';
import cookie from "../../lib/cookie";
import getParamObjFromUrl from "../../lib/getParamObjFromUrl";



//红包大派送活动之打开红包页面
let OpenRedPackage = React.createClass({
    getInitialState() {
        document.title = "领取优惠礼券";
        return {
            data: OpenRedPackageStore.getAll(),
            isGetting: false,//是否正在领取中
            isRedPackageActive: true//该红包是否可以领取
        }
    },
    _openRedPackage() {
        if (!this.state.isGetting) {
            let couponId = getParamObjFromUrl().couponId || getParamObjFromUrl().configId;
            OpenRedPackageAction.openRedPackage(couponId);
        }
    },
    render() {
        let {
            userName,
            applyTo
        } = this.state.data;

        let redPackageWrapperClass = classNames({
            "redPackage-enable": this.state.isRedPackageActive,
            "redPackage-disable": !this.state.isRedPackageActive
        });


        return (
            <Container id="openRedPackage" scrollable={true}>
                <div className={`redPackage-wrapper ${this.state.isGetting ? "active" : ""}`}>
                    <div className={redPackageWrapperClass} onClick={this._openRedPackage}>
                        {
                            this.state.isRedPackageActive ?
                                <div className="title text-center">
                                    您的好友：{userName}<br />
                                    给你发了一个优惠礼券
                            </div> :
                                null
                        }
                    </div>
                    <div className="applyTo-text">{applyTo}</div>
                </div>
            </Container>
        );
    },
    componentDidMount() {

        OpenRedPackageStore.bind("change", function () {
            this.setState({
                data: OpenRedPackageStore.getAll()
            });
        }.bind(this));

        OpenRedPackageStore.bind("isGettingRedPackage", function () {
            this.setState({
                isGetting: true
            });
        }.bind(this));

        OpenRedPackageStore.bind("openRedPackageSuccess", function () {
            let {
                couponType,
                couponAmount,
                couponId,
                userName
                } = OpenRedPackageStore.getAll();


            this.context.router.push({
                pathname: "getRedPackage",
                query: {
                    couponType,
                    couponAmount,
                    couponId,
                    userName
                }
            });
        }.bind(this));

        OpenRedPackageStore.bind("openRedPackageFailed", function (msg) {
            this.setState({
                isGetting:false,
                isRedPackageActive:false
            })
        }.bind(this));


        
        let couponId = getParamObjFromUrl().couponId || getParamObjFromUrl().configId;
        OpenRedPackageAction.getInitData(couponId);

    },
    componentWillUnmount() {
    }
});

OpenRedPackage.contextTypes = {
    router: React.PropTypes.object.isRequired
};

module.exports = OpenRedPackage;
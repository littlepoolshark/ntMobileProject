require("../../../scss/page/specialActivity/GetRedPackage.scss");
let GetRedPackageAction = require("../../actions/GetRedPackageAction");
let GetRedPackageStore = require("../../stores/GetRedPackageStore");
import React from "react";
import { Link } from "react-router";
import classNames from "classnames";

//ui component
import Group from "../../UIComponents/Group";
import Field from "../../UIComponents/Field";
import Container from "../../UIComponents/Container";
import Message from "../../UIComponents/Message";
import Modal from "../../UIComponents/modal/Modal";
import NavBar from "../../UIComponents/NavBar";
import View from "../../UIComponents/View";

//lib
import getParamObjFromUrl from "../../lib/getParamObjFromUrl";



let GetRedPackage = React.createClass({
    getInitialState() {
        return {
            data: GetRedPackageStore.getAll(),
            isModalOpen: false,
            modalText: "rewardDetail",
            isGetting: false
        }
    },
    _closeModal() {
        this.setState({
            isModalOpen: false
        })
    },
    _openModal(modalText) {
        this.setState({
            isModalOpen: true,
            modalText: modalText
        })
    },
    _jumpToSendRedPackage() {
        this.context.router.push({
            pathname: "sendRedPackage"
        });
    },
    _jumpToRegister() {
        this.context.router.push({
            pathname: "/",
            query: {
                view: "register",
                inviteCode: this.state.data.inviterPhoneNo
            }
        })
    },
    _getRedPackage() {
        if (!this.state.isGetting) {
            GetRedPackageAction.getRedPackage();
        }
    },
    _handleFieldValueChange(fieldName) {
        let fieldValue = this.refs[fieldName].getValue();
        switch (fieldName) {
            case "getCouponName":
                fieldValue = fieldValue.replace(/[^\d]/g, "");
                if (fieldValue.length === 1) {
                    fieldValue = "1";
                }
                if (fieldValue.length > 11) {
                    fieldValue = fieldValue.slice(0, 11);
                }
                break;
            default:
                break;
        };
        GetRedPackageAction.changeFieldValue(fieldValue, fieldName);
    },
    _handleNavClick() {
        this.context.router.push({
            pathname: "home"
        });
    },
    render() {
        let {
            userName,//发券人的中文名字
            getCouponName,//收券人的手机号码
            couponType,
            couponAmount,
            totalAmountOfInvestment,
            registerUserCount
        } = this.state.data;


        let leftNav = {
            component: "a",
            icon: 'left-nav',
            title: '首页'
        };

        return (
            <View>
                <NavBar
                    title="恭喜您"
                    leftNav={[leftNav]}
                    amStyle="primary"
                    onAction={this._handleNavClick}
                />
                <Container id="getRedPackage" scrollable={true}>
                    <Group className="getRedPackageForm-section">
                        <div className="getRedPackage-form">
                            <div className="getRedPackage-form-header">
                                <div className="text-center">
                                    <div>恭喜您获得</div>
                                    <div className="subtitle"><strong>{couponAmount}{couponType === "redPackage" ? "元" : "%"}</strong>{couponType === "redPackage" ? "投资红包" : "加息券"}</div>
                                </div>
                            </div>
                            <div className="getRedPackage-form-body text-center">
                                <div className="title text-center">来自用户：{userName}</div>
                                <Field
                                    label=""
                                    type="text"
                                    placeholder="请输入您的手机号码"
                                    value={getCouponName}
                                    ref="getCouponName"
                                    onChange={this._handleFieldValueChange.bind(null, "getCouponName")}
                                />
                                <button className="grp-btn primary" onClick={this._getRedPackage}>立即领取</button>
                            </div>
                        </div>
                    </Group>
                    <Group className="ntShortIntroduction">
                        <div className="title text-center">谁是农泰金融</div>
                        <div className="content">
                            深圳农泰金融服务有限公司是在国家大力推动互联网金融的大政策背景下，由上市公司诺普信(股票代码：002215)战略投资成立的互联网金融企业。农泰金融也是诺普信继田田圈、农集网之后，为深耕农业市场精心打造和布局的又一家旗舰企业。公司专注于中国农业产业链金融领域，致力于为大三农产业链上的各相关方提供资金支持。
                        </div>
                        <div className="subtitle text-center"><span>平台交易额</span><br /><strong>{totalAmountOfInvestment}元</strong></div>
                        <div className="subtitle text-center"><span>注册人数</span><br /><strong>{registerUserCount}人</strong></div>
                        <div className="footerBg-wrapper">
                            <img src={require("../../../img/house.png")} alt="" className="responsive" />
                        </div>
                    </Group>
                    <Group className="reasonOfChoosingNT">
                        <div className="title text-center">为什么选择农泰金融</div>
                        <ul>
                            <li>
                                <div><img src={require("../../../img/item-bg1.png")} alt="" className="item-bg" /></div>
                                <div>
                                    <div className="subtitle"><span>实力雄厚</span></div>
                                    <div className="content">
                                        上市公司战略投资<br />
                                        顶级合作伙伴保驾护航<br />
                                        腾讯云、大禹网络安全…<br />
                                    </div>
                                    <span className="down-triangle"></span>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <div className="subtitle"><span>安全保障</span></div>
                                    <div className="content">
                                        千万风险保证金用户保障计划<br />
                                        完善的担保措施<br />
                                        国内顶级律师事务所提供法律支持<br />
                                    </div>
                                </div>
                                <div>
                                    <img src={require("../../../img/item-bg2.png")} alt="" className="item-bg" />
                                    <span className="down-triangle"></span>
                                </div>
                            </li>
                            <li>
                                <div><img src={require("../../../img/item-bg3.png")} alt="" className="item-bg" /></div>
                                <div>
                                    <div className="subtitle"><span>资金安全</span></div>
                                    <div className="content">
                                        农泰金融不接触任何用户资金<br />
                                        所有项目资金专款专用<br />
                                        <span className="down-triangle"></span>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <div className="subtitle"><span>风控技术先进</span></div>
                                    <div className="content">
                                        农资行业20年交易大数据<br />
                                        所有借款项目实地考察<br />
                                        8道严格风控程序<br />
                                        贷后资金用途全程掌控<br />
                                        <span className="down-triangle"></span>
                                    </div>
                                </div>
                                <div>
                                    <img src={require("../../../img/item-bg4.png")} alt="" className="item-bg" />
                                </div>
                            </li>
                            <li>
                                <div><img src={require("../../../img/item-bg5.png")} alt="" className="item-bg" /></div>
                                <div>
                                    <div className="subtitle"><span>行业顶尖团队</span></div>
                                    <div className="content">
                                        国有大型商业银行高管<br />
                                        国内一线互联网企业专职人才<br />
                                        <span className="down-triangle"></span>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <div className="subtitle"><span>深耕农业  实力助农</span></div>
                                    <div className="content">
                                        覆盖28个省市1000多万亩耕地<br />
                                        提供1700多笔融资服务<br />
                                        帮助万名农民奔向幸福生活<br />
                                        <span className="down-triangle"></span>
                                    </div>
                                </div>
                                <div>
                                    <img src={require("../../../img/item-bg6.png")} alt="" className="item-bg" />
                                </div>
                            </li>
                        </ul>
                    </Group>
                    <Modal
                        isOpen={this.state.isModalOpen}
                        role="alert"
                        onDismiss={this._closeModal}
                    >
                        {this.state.modalText}
                    </Modal>
                </Container>
            </View>
        )
    },
    componentDidMount() {

        GetRedPackageStore.bind("change", function () {
            this.setState({
                data: GetRedPackageStore.getAll()
            })
        }.bind(this));

        GetRedPackageStore.bind("requestIsStarting", function () {
            this.setState({
                isGetting: true
            })
        }.bind(this));

        GetRedPackageStore.bind("requestIsEnd", function () {
            this.setState({
                isGetting: false
            })
        }.bind(this));

        GetRedPackageStore.bind("getRedPackageSuccess", function (userType) {
            let {
                couponType,
                couponAmount
            } = GetRedPackageStore.getAll();

            this.context.router.push({
                pathname: "registerSuccessHint",
                query: {
                    beforeComponent: "getRedPackage",
                    userType,
                    couponType,
                    couponAmount
                }
            });
        }.bind(this));

        GetRedPackageStore.bind("getRedPackageFailed", function (msg) {
            this._openModal(msg);
        }.bind(this));

        GetRedPackageStore.bind("formCheckFailed", function (msg) {
            Message.broadcast(msg);
        }.bind(this));

        let queryObj = this.props.location.query;
        GetRedPackageAction.getInitialData(queryObj);

    },
    componentWillUnmount() {

    }
});

GetRedPackage.contextTypes = {
    router: React.PropTypes.object.isRequired
};

module.exports = GetRedPackage;
import "../../scss/page/AutoPurchaseForm.scss";
import React, { Component, PropTypes } from 'react';
import AutoPurchaseFormStore from '../stores/AutoPurchaseFormStore';
import AutoPurchaseFormAction from '../actions/AutoPurchaseFormAction';
import Container from "../UIComponents/Container";
import Button from "../UIComponents/Button";
import Field from "../UIComponents/Field";
import List from "../UIComponents/List";
import Group from "../UIComponents/Group";
import Message from "../UIComponents/Message";
import NavBar from "../UIComponents/NavBar";
import Icon from "../UIComponents/Icon";
import Modal from "../UIComponents/modal/Modal";
import DatePicker from "react-mobile-datepicker";


const productNameMap = {
    "1": "月月赚",
    "2": "季季赚",
    "3": "月满盈",
    "4": "丰收盈",
    "5": "好采投",
    "6": "债权转让"
};

class AutoPurchaseForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isDatePickerOpen: false,
            currdatePickerView: "startTime",
            isModalOpen: false,
            modalType: "add",//oneOf["add","delete"]
            data: AutoPurchaseFormStore.getAll()
        }
    }

    _handleNavClick = ({ title }) => {
        if (title === "返回") {
            this.context.router.push({
                pathname: "autoPurchaseIndex"
            });
        } else if (title === "删除") {
            this._openModal("delete");
        }

    }

    _handleDatePickerSelect = (date) => {
        function dateFormater(date) {
            let dateObj = new Date(date);
            let year = dateObj.getFullYear();
            let month = dateObj.getMonth() + 1;
            let day = dateObj.getDate();

            return `${year}-${month < 10 ? "0" + month : month}-${day < 10 ? "0" + day : day}`;
        }
        this.setState({
            isDatePickerOpen: false
        }, () => {
            let fieldName = this.state.currdatePickerView === "startTime" ? "validDateStart" : "validDateEnd";
            AutoPurchaseFormAction.changeFieldValue(fieldName, dateFormater(date));
        });
    }

    _handleDatePickerCancel = () => {
        this.setState({
            isDatePickerOpen: false
        })
    }

    _openDatePicker = (datePickerView) => {
        this.setState({
            currdatePickerView: datePickerView,
            isDatePickerOpen: true
        })
    }

    _handleToggleValidDateType(validDateType) {
        AutoPurchaseFormAction.toggleValidDateTypeTo(validDateType);
    }

    _handleFieldValueChange = (fieldName) => {
        let isDigit = function (str) { return /^\d+(\.\d+)?$/.test(str) };//是否是数字
        let isInteger = function (str) { return /\d/.test(str) };//是否是整数
        let reg = /[^\d\.]/g;//过滤除了数字和点号的字符
        let reg2= /[^\d]/g;//过滤除了数字的字符
        let fieldValue = this.refs[fieldName].value;

        let {
            minPeriod,
            maxPeriod,
            minAmount,
            maxAmount,
            validDateStart,
            validDateEnd
         } = AutoPurchaseFormStore.getAll();

        switch (fieldName) {
            case "yearRate":
                fieldValue = fieldValue.replace(reg, "");
                if(fieldValue === "."){
                    fieldValue="";
                }
                if (fieldValue.indexOf(".") > -1) {//如果是小数点后的位数大于两位的小数,则将其截断为小数点后一位
                    let integerSection=fieldValue.split(".")[0];//整数位
                    let decimalsSection=fieldValue.split(".")[1];//小数位
                    if (!!decimalsSection && decimalsSection.length > 1) {
                        fieldValue = integerSection + "." + decimalsSection.slice(0, 1);
                    }else if(decimalsSection === "" && fieldValue.length === 3 ){
                        fieldValue = integerSection + ".";
                    }
                }
                break;
            case "minPeriod":
                fieldValue = fieldValue.replace(reg2, "");
                if(fieldValue !== "" && parseInt(fieldValue) > 12){
                    fieldValue=12;           
                }else if(fieldValue !== "" && !!maxPeriod &&  fieldValue > parseInt(maxPeriod)){
                    fieldValue=maxPeriod;
                }
                break;
            case "maxPeriod":
                fieldValue = fieldValue.replace(reg2, "");
                if(parseInt(fieldValue) === 0){
                    fieldValue=1;
                }else if(fieldValue !== "" && parseInt(fieldValue) > 12){
                    fieldValue=12;           
                }
                break;
            case "minAmount":
                fieldValue = fieldValue.replace(reg2, "");
                break;
            case "maxAmount":
                fieldValue = fieldValue.replace(reg2, "");
                break;
            case "reserveAmount":
                fieldValue = fieldValue.replace(reg2,"");
                break;
            default:
                break;
        };
        AutoPurchaseFormAction.changeFieldValue(fieldName, fieldValue);
    }

    _jumpToAutoPurchaseType = () => {
        this.context.router.push({
            pathname: "autoPurchaseType",
            query: {
                actionType: this.props.location.query.actionType
            },
            state: AutoPurchaseFormStore.getAll()
        })
    }

    _SubmitAutoPurchaseForm = () => {
        AutoPurchaseFormAction.submitAutoPurchaseForm();
    }

    _handleModalOnAction = (isConfirm) => {
        let modalType = this.state.modalType;

        if (isConfirm) {
            if (modalType === "add") {
                AutoPurchaseFormAction.openAutoPurchaseSwitch();
            } else {
                AutoPurchaseFormAction.deleteAutoPurchaseRecord();
            }
        } else {
            if (modalType === "add") {
                this.context.router.push({
                    pathname: "autoPurchaseIndex"
                })
            } else {
                this._closeModal()
            }
        }
    }

    _handleSubmitBtnClick = (actionType) => {
        if (actionType === "add") {
            this._openModal("add");
        } else {
            this._SubmitAutoPurchaseForm();
        }
    }

    _openModal = (modalType) => {
        this.setState({
            isModalOpen: true,
            modalType: modalType
        })
    }

    _closeModal = () => {
        this.setState({
            isModalOpen: false
        })
    }

    render() {
        let leftNav = {
            component: "a",
            icon: 'left-nav',
            title: '返回'
        };

        let rightNav = {
            component: "a",
            title: '删除'
        }

        let {
            yearRate,
            minPeriod,
            maxPeriod,
            repaymentType,
            minAmount,
            maxAmount,
            productType,
            reserveAmount,
            validDateType,
            validDateStart,
            validDateEnd
        } = this.state.data;

        let actionType = this.props.location.query.actionType || "add";



        let productNameString = productType.map((item, index) => {
            return productNameMap[item];
        }).join("/");



        return (
            <Container id="autoPurchaseForm" scrollable>
                <NavBar
                    title={actionType === "add" ? "新增自动投标" : "修改自动投标设置"}
                    leftNav={[leftNav]}
                    rightNav={actionType === "modify" ? [rightNav] : []}
                    amStyle="primary"
                    onAction={this._handleNavClick}
                />

                <List>
                    <List.Item
                        title="最低利率（不包含奖励/VIP加息）"
                        after={
                            <div className="minRate-bar">
                                <input
                                    type="text"
                                    placeholder="输入利率"
                                    value={yearRate}
                                    ref="yearRate"
                                    onChange={this._handleFieldValueChange.bind(this, "yearRate")}
                                />
                                <span>%</span>
                            </div>
                        }
                    />
                    <List.Item
                        style={{ padding: "0 15px" }}
                        title="项目期限"
                        after={
                            <div className="deadline-bar" >
                                <input
                                    type="text"
                                    value={minPeriod}
                                    ref="minPeriod"
                                    onChange={this._handleFieldValueChange.bind(this, "minPeriod")}
                                />
                                <span>个月</span>
                                <span className="separator">至</span>
                                <input
                                    type="text"
                                    value={maxPeriod}
                                    ref="maxPeriod"
                                    onChange={this._handleFieldValueChange.bind(this, "maxPeriod")}
                                />
                                <span>个月</span>
                            </div>}
                    />
                    <List.Item
                        className="repaymentType-bar"
                        title="还款方式"
                        after="每月付息，到期还本"
                    />
                    <List.Item
                        style={{ padding: "0 15px" }}
                        title="单笔投资额（元）"
                        after={
                            <div className="minAndMaxAmount-bar" >
                                <input
                                    type="text"
                                    placeholder="最低额度"
                                    value={minAmount}
                                    ref="minAmount"
                                    onChange={this._handleFieldValueChange.bind(this, "minAmount")}
                                />
                                <span className="separator">至</span>
                                <input
                                    type="text"
                                    placeholder="最高额度"
                                    value={maxAmount}
                                    ref="maxAmount"
                                    onChange={this._handleFieldValueChange.bind(this, "maxAmount")}
                                />
                            </div>
                        }
                    />
                    <List.Item
                        className="productType-bar"
                        title="投资类型"
                        href="javascript:void(0)"
                        after={productNameString}
                        onClick={this._jumpToAutoPurchaseType}
                    />
                    <List.Item
                        className="remainAmount-bar"
                        title="预留金额（元）"
                        nested="input"
                        after={<input
                            type="text"
                            placeholder="请输入账号保留金额"
                            className="text-right"
                            value={reserveAmount}
                            ref="reserveAmount"
                            onChange={this._handleFieldValueChange.bind(this, "reserveAmount")}
                        />}
                    />
                    <List.Item
                        style={{ padding: "0 15px" }}
                        title="有效期"
                        after={(
                            <div className="validDate-bar">
                                <div>
                                    <Icon
                                        classPrefix="imgIcon"
                                        name={validDateType === "longTerm" ? "autoPurchase-agreement-checked" : "autoPurchase-agreement-unchecked"}
                                        onClick={this._handleToggleValidDateType.bind(this, "longTerm")}
                                    />
                                    长期有效
                                </div>
                                <div>
                                    <Icon
                                        classPrefix="imgIcon"
                                        name={validDateType === "custom" ? "autoPurchase-agreement-checked" : "autoPurchase-agreement-unchecked"}
                                        onClick={this._handleToggleValidDateType.bind(this, "custom")}
                                    />
                                    自定义
                                </div>
                            </div>
                        )}
                    />
                    {
                        validDateType === "custom" ?
                            (
                                <List.Item
                                    style={{ padding: "0 15px" }}
                                    title="设置日期"
                                    after={(
                                        <div className="validDateSetting-bar">
                                            <div className="validDateInput" onClick={this._openDatePicker.bind(this, "startTime")}>{!!validDateStart ? validDateStart : "默认今天"}</div>
                                            <span className="separator">至</span>
                                            <div className="validDateInput" onClick={this._openDatePicker.bind(this, "endTime")}>{!!validDateEnd ? validDateEnd : "请设置结束日"}</div>
                                        </div>
                                    )}
                                />
                            ) :
                            null
                    }

                </List>

                <div className="" style={{ padding: "0 0.9375rem" }}>
                    <Button amStyle="primary" block radius={true} onClick={this._SubmitAutoPurchaseForm}>{actionType === "add" ? "保存" : "保存修改"}</Button>
                </div>

                <DatePicker
                    value={this.state.currdatePickerView === "startTime" ? (!!validDateStart ? new Date(validDateStart) : new Date()) : (!!validDateEnd ? new Date(validDateEnd) : new Date())}
                    isOpen={this.state.isDatePickerOpen}
                    onSelect={this._handleDatePickerSelect}
                    onCancel={this._handleDatePickerCancel}
                    theme="ios"
                    dateFormat={["YYYY", "M", "D"]}
                />

                <Modal
                    title=""
                    isOpen={this.state.isModalOpen}
                    role="confirm"
                    onAction={this._handleModalOnAction}
                >
                    {
                        this.state.modalType === "add" ?
                            "保存成功，是否马上启用该自动投标方案？" :
                            "是否删除自动投标设置"
                    }
                </Modal>

            </Container>
        );
    }

    componentDidMount() {
        let isFromAutoPurchaseComponent = !!this.props.location.state;
        AutoPurchaseFormAction.getInitialData(isFromAutoPurchaseComponent ? this.props.location.state : {})

        AutoPurchaseFormStore.bind("change", () => {
            this.setState({
                data: AutoPurchaseFormStore.getAll()
            })
        });

        AutoPurchaseFormStore.bind("submitAutoPurchaseFormSuccess", () => {
            let actionType = this.props.location.query.actionType;
            if (actionType === "modify") {
                this.context.router.push({
                    pathname: "autoPurchaseIndex"
                })
            } else if (actionType === "add") {
                this._openModal("add");
            }
        });

        AutoPurchaseFormStore.bind("submitAutoPurchaseFormFailed", (msg) => {
            Message.broadcast(msg);
        });

        AutoPurchaseFormStore.bind("deleteAutoPurchaseRecordSuccess", () => {
            this.context.router.push({
                pathname: "autoPurchaseIndex"
            });
        });

        AutoPurchaseFormStore.bind("deleteAutoPurchaseRecordFailed", (msg) => {
            this._closeModal();
            Message.broadcast(msg);
        });

        AutoPurchaseFormStore.bind("openAutoPurchaseSwitchSuccess", () => {
            this.context.router.push({
                pathname: "autoPurchaseIndex"
            });
        });

        AutoPurchaseFormStore.bind("openAutoPurchaseSwitchFailed", (msg) => {
            this._closeModal();
            Message.broadcast(msg);
        });

        AutoPurchaseFormStore.bind("autoPurchaseFormCheckFailed", (msg) => {
            Message.broadcast(msg);
        });

    }

    componentWillUnmount() {
        AutoPurchaseFormStore.clearAll();
        AutoPurchaseFormStore.unbind("submitAutoPurchaseFormSuccess");
    }

};

AutoPurchaseForm.contextTypes = {
    router: PropTypes.object.isRequired
};


module.exports = AutoPurchaseForm;
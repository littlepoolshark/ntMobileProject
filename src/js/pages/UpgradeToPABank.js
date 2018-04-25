require("../../scss/page/UpgradeToPABank.scss");
let UpgradeToPABankAction = require("../actions/UpgradeToPABankAction");
let UpgradeToPABankStore = require("../stores/UpgradeToPABankStore");

import React from "react";
import { Link } from "react-router";

//ui component
import Group from "../UIComponents/Group";
import List from "../UIComponents/List";
import Button from "../UIComponents/Button";
import Field from "../UIComponents/Field";
import Container from "../UIComponents/Container";
import Message from "../UIComponents/Message";
import Modal from "../UIComponents/modal/Modal";
import Icon from "../UIComponents/Icon";
import NavBar from "../UIComponents/NavBar";
import CityPicker from "../UIComponents/CityPicker";
import LoanerTypePicker from "../UIComponents/LoanerTypePicker";
import IDTypePicker from "../UIComponents/IDTypePicker";
import BankListOfPACG from "./BankListOfPACG";
import SearchSubbranchBank from "./SearchSubbranchBank";

import cookie from "../lib/cookie";

function fieldValueFilter(fieldName, originValue) {
  switch (fieldName) {
    case "idcard":
      originValue = originValue.replace(/[^a-z0-9]+/gi, "");
      if (originValue.length > 18) {
        originValue = originValue.slice(0, 18);
      }
      break;
    case "bankCardNo":
      //这段正则表达式能过滤非空格的字符，也能满足四个数字为一段的格式化要求
      originValue = originValue
        .replace(/\s/g, "")
        .replace(/\D/g, "")
        .slice(0, 23);
      break;
    case "userPhoneNo":
      originValue = originValue.replace(/[^\d]/g, "");
      if (originValue.length === 1) {
        originValue = "1";
      }
      if (originValue.length > 11) {
        originValue = originValue.slice(0, 11);
      }
      break;
    default:
      break;
  }
  return originValue;
}

function bankCardNoFormater(bankCardNo) {
  return bankCardNo.replace(/(\d{4})(?=\d)/g, "$1 ");
}

const PersonalFormOfUpgradeToPABank = React.createClass({
  valueChangeHandler(fieldName) {
    let originValue = this.refs[fieldName].getValue();
    let newValue = fieldValueFilter(fieldName, originValue);
    this.props.emitFieldValueChange(fieldName, newValue);
  },
  render() {
    let {
      openPickerHandler,
      bankNameSelectHandler,
      subbranchBankNameSelectHandler,
      formSubmitHandler,
      isBindCardToPABank,
      isNewbie,
      loanerType,
      realName,
      userPhoneNo,
      idcard,
      bankName,
      bankCardNo, //个人银行卡号
      provinceText,
      cityText,
      subbranchBankName,
      action
    } = this.props;

    let isNextStepBtnEnabled =
      !!loanerType &&
      !!realName &&
      !!userPhoneNo &&
      !!idcard &&
      !!bankName &&
      !!bankCardNo &&
      !!provinceText &&
      !!cityText &&
      !!subbranchBankName;

    let isBankNameEditable= action === 'register' || !isBindCardToPABank;
    let isBankAreaEditable= action === 'register' || (!provinceText && !cityText);
    let isSubbranchBankNameEditable= action === 'register' || !subbranchBankName;

    return (
      <div>
        <List>
          <List.Item
            nested="input"
            onClick={
              isNewbie ? openPickerHandler.bind(null, "loanerTypePicker") : null
            }
          >
            <Field
              readOnly
              type="text"
              label="用户类型"
              placeholder="请选择用户类型"
              value={loanerType}
              inputAfter={
                isNewbie ? (
                  <Icon
                    name="right-nav"
                    style={{ fontSize: "20px", color: "#c2c2c2" }}
                  />
                ) : null
              }
            />
          </List.Item>
          <List.Item nested="input">
            <Field
              type="text"
              label="姓名"
              placeholder="请输入真实姓名"
              ref="realName"
              value={realName}
              onChange={this.valueChangeHandler.bind(null, "realName")}
              readOnly={!isNewbie}
            />
          </List.Item>
          <List.Item nested="input">
            <Field
              readOnly
              type="text"
              label="手机号码"
              placeholder="请输入银行预留的手机号"
              ref="userPhoneNo"
              value={userPhoneNo}
              readOnly
            />
          </List.Item>
          <List.Item nested="input">
            <Field
              type="text"
              label="身份证号"
              placeholder="请输入身份证号码"
              ref="idcard"
              value={idcard}
              onChange={this.valueChangeHandler.bind(null, "idcard")}
              readOnly={isBindCardToPABank}
            />
          </List.Item>
        </List>
        <List>
          <List.Item
            nested="input"
            onClick={isBankNameEditable ? bankNameSelectHandler : null}
          >
            <Field
              type="text"
              label="银行名称"
              placeholder="请选择银行"
              ref="bankName"
              inputAfter={
                isBankNameEditable ?  (
                  <Icon
                    name="right-nav"
                    style={{ fontSize: "20px", color: "#c2c2c2" }}
                  />
                ) :
                null
              }
              readOnly
              value={bankName}
            />
          </List.Item>
          <List.Item nested="input">
            <Field
              type="text"
              label="银行卡号"
              placeholder="请输入卡号"
              ref="bankCardNo"
              value={bankCardNoFormater(bankCardNo)}
              onChange={this.valueChangeHandler.bind(null, "bankCardNo")}
              readOnly={isBindCardToPABank}
            />
          </List.Item>
          <List.Item
            nested="input"
            onClick={
                isBankAreaEditable
                ? openPickerHandler.bind(null, "cityPicker")
                : null
            }
          >
            <Field
              readOnly
              type="text"
              label="开户地区"
              placeholder="请选择开户地区"
              value={
                !!provinceText && !!cityText
                  ? provinceText + " " + cityText
                  : ""
              }
              inputAfter={
                isBankAreaEditable ?  (
                  <Icon
                    name="right-nav"
                    style={{ fontSize: "20px", color: "#c2c2c2" }}
                  />
                ) :
                null
              }
            />
          </List.Item>
          <List.Item
            nested="input"
            onClick={
              isSubbranchBankNameEditable ? subbranchBankNameSelectHandler : null
            }
          >
            <Field
              readOnly
              type="text"
              label="开户行"
              placeholder="请选择开户行"
              value={subbranchBankName}
              inputAfter={
                isSubbranchBankNameEditable ?  (
                  <Icon
                    name="right-nav"
                    style={{ fontSize: "20px", color: "#c2c2c2" }}
                  />
                ) :
                null
              }
            />
          </List.Item>
        </List>

        <div className="btn-wrapper">
          <Button
            amStyle="primary"
            block
            radius
            disabled={!isNextStepBtnEnabled}
            onClick={formSubmitHandler}
          >
            下一步
          </Button>
        </div>
      </div>
    );
  }
});

const EnterpriseFormOfUpgradeToPABank = React.createClass({
  valueChangeHandler(fieldName) {
    let originValue = this.refs[fieldName].getValue();
    let newValue = fieldValueFilter(fieldName, originValue);
    this.props.emitFieldValueChange(fieldName, newValue);
  },
  render() {
    let {
      openPickerHandler,
      bankNameSelectHandler,
      subbranchBankNameSelectHandler,
      formSubmitHandler,
      isBindCardToPABank,
      isNewbie,
      loanerType,
      enterpriseName,
      legalPersonName,
      userPhoneNo,
      socialCreditCode,
      bankName,
      bankCardNo, //企业对公账号
      provinceText,
      cityText,
      subbranchBankName,
      IDType,
      action
    } = this.props;

    let isNextStepBtnEnabled =
      !!loanerType &&
      !!enterpriseName &&
      !!legalPersonName &&
      !!userPhoneNo &&
      !!idcard &&
      !!bankName &&
      !!bankCardNo &&
      !!provinceText &&
      !!cityText &&
      !!subbranchBankName &&
      !! IDType;

    let isBankNameEditable= action === 'register' || !isBindCardToPABank;
    let isBankAreaEditable= action === 'register' || (!provinceText && !cityText);
    let isSubbranchBankNameEditable= action === 'register' || !subbranchBankName;

    return (
      <div>
        <List>
          <List.Item
            nested="input"
            onClick={openPickerHandler.bind(null, "loanerTypePicker")}
          >
            <Field
              readOnly
              type="text"
              label="用户类型"
              placeholder="请选择用户类型"
              value={loanerType}
              inputAfter={
                <Icon
                  name="right-nav"
                  style={{ fontSize: "20px", color: "#c2c2c2" }}
                />
              }
            />
          </List.Item>
          <List.Item nested="input">
            <Field
              type="text"
              label="企业名称"
              placeholder="请输入企业名称"
              ref="enterpriseName"
              value={enterpriseName}
              readOnly
            />
          </List.Item>
          <List.Item nested="input">
            <Field
              type="text"
              label="法人名称"
              placeholder="请输入法人名称"
              ref="legalPersonName"
              value={legalPersonName}
            />
          </List.Item>
          <List.Item nested="input">
            <Field
              readOnly
              type="text"
              label="手机号码"
              placeholder="请输入银行预留的手机号"
              ref="userPhoneNo"
              value={userPhoneNo}
              readOnly
            />
          </List.Item>
          <List.Item
            nested="input"
            onClick={openPickerHandler.bind(null, "IDTypePicker")}
          >
            <Field
              readOnly
              type="text"
              label="证件类型"
              placeholder="请选择证件类型"
              value={IDType}
              inputAfter={ (
                  <Icon
                    name="right-nav"
                    style={{ fontSize: "20px", color: "#c2c2c2" }}
                  />
                ) 
              }
            />
          </List.Item>
          <List.Item nested="input">
            <Field
              type="text"
              label="证件号码"
              placeholder={IDType === '统一社会信用代码' ? '请输入18位统一社会信用代码' : '请输入组织机构代码'}
              ref="socialCreditCode"
              value={socialCreditCode}
              onChange={this.valueChangeHandler.bind(null, "socialCreditCode")}
            />
          </List.Item>
        </List>
        {/* <Group className="socialCreditCode-group">
          <div className="title">社会信用代码（组织机构代码）</div>
          <Field
            ref="socialCreditCode"
            value={socialCreditCode}
            placeholder="请输入9位组织机构或18位统一社会信用代码"
            onChange={this.valueChangeHandler.bind(null, "socialCreditCode")}
          />
        </Group> */}
        <List>
          <List.Item
            nested="input"
            onClick={isBankNameEditable ?  bankNameSelectHandler : null }
          >
            <Field
              type="text"
              label="银行名称"
              placeholder="请选择银行"
              ref="bankName"
              inputAfter={
                isBankNameEditable ? (
                  <Icon
                    name="right-nav"
                    style={{ fontSize: "20px", color: "#c2c2c2" }}
                  />
                ) : null 
              }
              readOnly
              value={bankName}
            />
          </List.Item>
          <List.Item nested="input">
            <Field
              type="text"
              label="企业对公账号"
              placeholder="请输入企业对公账号"
              ref="bankCardNo"
              value={bankCardNoFormater(bankCardNo)}
              onChange={this.valueChangeHandler.bind(null, "bankCardNo")}
              readOnly={isBindCardToPABank}
            />
          </List.Item>
          <List.Item
            nested="input"
            onClick={
              isBankAreaEditable
                ? openPickerHandler.bind(null, "cityPicker")
                : null
            }
          >
            <Field
              readOnly
              type="text"
              label="开户地区"
              placeholder="请选择开户地区"
              value={
                provinceText && cityText ? provinceText + " " + cityText : ""
              }
              inputAfter={
                isBankAreaEditable ? (
                  <Icon
                    name="right-nav"
                    style={{ fontSize: "20px", color: "#c2c2c2" }}
                  />
                ) : null 
              }
            />
          </List.Item>
          <List.Item
            nested="input"
            onClick={
              isSubbranchBankNameEditable ?  subbranchBankNameSelectHandler : null 
            }
          >
            <Field
              readOnly
              type="text"
              label="开户行"
              placeholder="请选择开户行"
              value={subbranchBankName}
              inputAfter={
                isSubbranchBankNameEditable ?  (
                  <Icon
                    name="right-nav"
                    style={{ fontSize: "20px", color: "#c2c2c2" }}
                  />
                ) : null
              }
            />
          </List.Item>
        </List>

        <div className="btn-wrapper">
          <Button
            amStyle="primary"
            block
            radius
            disabled={!isNextStepBtnEnabled}
            onClick={formSubmitHandler}
          >
            下一步
          </Button>
        </div>
      </div>
    );
  }
});

let UpgradeToPABank = React.createClass({
  getInitialState() {
    return {
      //通过切换试图模式来实现页面跳转,oneof["index_person","index_enterprise","bankNameSearch_person","bankNameSearch_enterprise","subbranchSearch"]
      //"index_person" => 用户类型为个人的视图，这是一级视图
      //"index_enterprise" => 用户类型为企业的视图，这是一级视图
      //"bankNameSearch_person" => 当个人类型用户点击“选择银行”栏目所进入的视图，这是二级视图
      //"bankNameSearch_enterprise" => 当企业类型用户点击“选择银行”栏目所进入的视图，这是二级视图
      //"subbranchSearch" => 当用户点击“选择开户行”栏目所进入的视图，这是二级视图
      viewSchema: "index_person",
      isModalOpen: false,
      modalTitle: "",
      modalRole: "loading",
      modalInnerText: "加载中，请稍候.....",
      isCityPickOpen: false,
      isLoanerTypePickerOpen: false,
      isIDTypePickerOpen:false,
      data: UpgradeToPABankStore.getAll()
    };
  },
  openPickerHandler(pickerName) {
    this.setState({
      isCityPickOpen: pickerName === "cityPicker",
      isLoanerTypePickerOpen: pickerName === "loanerTypePicker",
      isIDTypePickerOpen:pickerName === 'IDTypePicker'
    });
  },
  bankNameSelectHandler() {
    let loanerType = this.state.data.loanerType;
    if (loanerType === "个人") {
      this._toggleViewTo("bankNameSearch_person");
    } else {
      this._toggleViewTo("bankNameSearch_enterprise");
    }
  },
  subbranchBankNameSelectHandler() {
    let { bankName, provinceText, cityText } = this.state.data;
    if (bankName && provinceText && cityText) {
      this._toggleViewTo("subbranchSearch");
    } else {
      let hintMessage = "";
      if (bankName === "") {
        hintMessage = "银行名称不能为空，请选择！";
      } else if (provinceText === "" || cityText === "") {
        hintMessage = "开户地区不能为空，请选择！";
      }

      Message.broadcast(hintMessage);
    }
  },
  _closePicker() {
    this.setState({
      isCityPickOpen: false,
      isLoanerTypePickerOpen: false,
      isIDTypePickerOpen:false
    });
  },
  _getViewSchemaBy(loanerType) {
    return loanerType === "企业" ? "index_enterprise" : "index_person";
  },
  emitFieldValueChange(fieldName, value) {
    UpgradeToPABankAction.changeFieldValue(fieldName, value);
  },
  _handleNavClick() {
    let beforeComponent = this.props.location.query.beforeComponent;
    if (!!beforeComponent) {
      this.context.router.push({
        pathname: beforeComponent
      });
    } else {
      this.context.router.goBack();
    }
  },
  _handleCitySelected(province, city) {
    let { provinceText, cityText, subbranchBankName } = this.state.data;

    this.setState(
      {
        isCityPickOpen: false
      },
      () => {
        UpgradeToPABankAction.changeFieldValue("provinceText", province);
        UpgradeToPABankAction.changeFieldValue("cityText", city);

        let isChanged = province !== provinceText || city !== cityText;

        if (isChanged && subbranchBankName) {
          UpgradeToPABankAction.changeFieldValue("subbranchBankName", "");
        }
      }
    );
  },
  _handleLoanerTypeSelected(newLoanerType) {
    let { loanerType } = this.state.data;
    this.setState(
      {
        isLoanerTypePickerOpen: false,
        viewSchema: this._getViewSchemaBy(newLoanerType)
      },
      () => {
        if (loanerType !== newLoanerType) {
          UpgradeToPABankAction.changeFieldValue("loanerType", newLoanerType);
        }
      }
    );
  },
  _handleIDTypeSelected(newIDType) {
    let { IDType } = this.state.data;
    this.setState(
      {
        isIDTypePickerOpen: false
      },
      () => {
        if (IDType !== newIDType) {
          UpgradeToPABankAction.changeFieldValue("IDType", newIDType);
        }
      }
    );
  },
  _backFromSecondLevelView(cb) {
    let loanerType = this.state.data.loanerType;
    this.setState(
      {
        viewSchema: this._getViewSchemaBy(loanerType)
      },
      () => {
        cb && cb();
      }
    );
  },
  _handleBankNameSelected(bankId, bankName) {
    let prevBankId = this.state.data.bankId;
    this._backFromSecondLevelView(() => {
      UpgradeToPABankAction.changeFieldValue("bankId", bankId);
      UpgradeToPABankAction.changeFieldValue("bankName", bankName);

      if (bankId !== prevBankId) {
        UpgradeToPABankAction.changeFieldValue("bankCardNo", "");
      }
    });
  },
  _handleSubbranchSelected(subbranchBankId, subbranchBankName) {
    this._backFromSecondLevelView(() => {
      UpgradeToPABankAction.changeFieldValue(
        "subbranchBankId",
        subbranchBankId
      );
      UpgradeToPABankAction.changeFieldValue(
        "subbranchBankName",
        subbranchBankName
      );
    });
  },
  handleSubmitForm() {
    let action = this.props.location.query.action;
    switch (action) {
      case 'passwordSetting':
        UpgradeToPABankAction.submitPasswordSettingForm();
        break;
      case 'bindBankCard':
        UpgradeToPABankAction.submitBankCardBindingForm();
        break;
      case 'register':
        UpgradeToPABankAction.submitRegisterForm();
        break;
      default:
        throw new Error(`未知action：“${action}”`);
        break;
    }
  },
  _closeModal() {
    this.setState({
      isModalOpen: false
    });
  },
  _openModal() {
    this.setState({
      isModalOpen: true
    });
  },
  _toggleViewTo(viewSchema) {
    this.setState({
      viewSchema
    });
  },
  _viewRender() {
    let { viewSchema, data } = this.state;
    let viewSchema_back = this._getViewSchemaBy(data.loanerType);
    let action=this.props.location.query.action;

    switch (viewSchema) {
      case "index_person":
        return (
          <PersonalFormOfUpgradeToPABank
            openPickerHandler={this.openPickerHandler}
            emitFieldValueChange={this.emitFieldValueChange}
            bankNameSelectHandler={this.bankNameSelectHandler}
            subbranchBankNameSelectHandler={this.subbranchBankNameSelectHandler}
            formSubmitHandler={this.handleSubmitForm}
            action={action}
            {...data}
          />
        );
      case "index_enterprise":
        return (
          <EnterpriseFormOfUpgradeToPABank
            openPickerHandler={this.openPickerHandler}
            emitFieldValueChange={this.emitFieldValueChange}
            bankNameSelectHandler={this.bankNameSelectHandler}
            subbranchBankNameSelectHandler={this.subbranchBankNameSelectHandler}
            formSubmitHandler={this.handleSubmitForm}
            action={action}
            {...data}
          />
        );
      case "bankNameSearch_person":
        return (
          <BankListOfPACG
            handleGoBack={this._toggleViewTo.bind(this, viewSchema_back)}
            handleSelectBankCard={this._handleBankNameSelected}
          />
        );
      case "bankNameSearch_enterprise":
        return (
          <SearchSubbranchBank
            action="searchBankNameForEnterprise"
            handleGoBack={this._toggleViewTo.bind(this, viewSchema_back)}
            handleSelectSubbranch={this._handleBankNameSelected}
          />
        );
      case "subbranchSearch":
        let { bankId, cityText, provinceText } = this.state.data;
        return (
          <SearchSubbranchBank
            data={{ bankId, cityText, provinceText }}
            handleGoBack={this._toggleViewTo.bind(this, viewSchema_back)}
            handleSelectSubbranch={this._handleSubbranchSelected}
          />
        );
      default:
        return (
          <PersonalFormOfUpgradeToPABank
            openPickerHandler={this.openPickerHandler}
            emitFieldValueChange={this.emitFieldValueChange}
            bankNameSelectHandler={this.bankNameSelectHandler}
            subbranchBankNameSelectHandler={this.subbranchBankNameSelectHandler}
            {...data}
          />
        );
    }
  },
  _navbarRender() {
    let leftNav = {
      component: "a",
      icon: "left-nav",
      title: "返回"
    };

    let mapActionToTitle={
      'passwordSetting':'设置交易密码',
      'bindBankCard':'添加银行卡',
      'register':'开通银行存管子账号'
    };
    let action=this.props.location.query.action;
    let title =mapActionToTitle[action];
  
    //只有是"index_person", "index_enterprise"两种视图才显示NavBar
    if (
      ["index_person", "index_enterprise"].indexOf(this.state.viewSchema) > -1
    ) {
      return (
        <NavBar
          title={title}
          leftNav={[leftNav]}
          amStyle="primary"
          onAction={this._handleNavClick}
        />
      );
    }
    return null;
  },
  render() {
    let {
      isModalOpen,
      modalTitle,
      modalRole,
      modalInnerText,
      isCityPickOpen,
      isLoanerTypePickerOpen,
      isIDTypePickerOpen
    } = this.state;

    let isAndroid =
      /android/i.test(ua) ||
      ua.indexOf("Android") > -1 ||
      ua.indexOf("Adr") > -1;
    let isIOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

    return (
      <Container id="upgradeToPABank" scrollable={isAndroid}>
        {this._navbarRender()}
        {this._viewRender()}
        <Modal
          title={modalTitle}
          isOpen={isModalOpen}
          role={modalRole}
          onDismiss={this._closeModal}
        >
          {modalInnerText}
        </Modal>
        <CityPicker
          isOpen={isCityPickOpen}
          onFinished={this._handleCitySelected}
        />
        <LoanerTypePicker
          isOpen={isLoanerTypePickerOpen}
          onFinished={this._handleLoanerTypeSelected}
        />
        <IDTypePicker
          isOpen={isIDTypePickerOpen}
          onFinished={this._handleIDTypeSelected}
        />
      </Container>
    );
  },
  componentDidMount() {
    UpgradeToPABankAction.getInitialDataFromServer();

    UpgradeToPABankStore.bind("change", () => {
      this.setState({
        data: UpgradeToPABankStore.getAll()
      });
    });

    UpgradeToPABankStore.bind("viewChange", viewSchema => {
      this._toggleViewTo(viewSchema);
    });

    UpgradeToPABankStore.bind("registerRequestIsStarting", () => {
      this._openModal();
    });

    UpgradeToPABankStore.bind("registerRequestIsEnd", () => {
      this._closeModal();
    });

    UpgradeToPABankStore.bind("getNextLocationInfoSuccess", nextLocation => {
      window.location.href = nextLocation;
    });
  },
  componentWillUnmount() {}
});

UpgradeToPABank.contextTypes = {
  router: React.PropTypes.object.isRequired
};

module.exports = UpgradeToPABank;

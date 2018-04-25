require("../../scss/page/RegisterToPABank.scss");
let RegisterToPABankAction = require("../actions/RegisterToPABankAction");
let RegisterToPABankStore = require("../stores/RegisterToPABankStore");
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
import MobileVerificationCode from "../UIComponents/MobileVerificationCode";

import Slogan from "./utilities/Slogan";
import WarmHintOfRegisterToPABank from "./utilities/WarmHintOfRegisterToPABank";
import PABankSeviceAgreementLink from "./utilities/PABankSeviceAgreementLink";
import cookie from "../lib/cookie";

const VerificationCodeForm = React.createClass({
  getInitialState() {
    return {
      verificationCode: ""
    };
  },
  _formatPhoneNo(phoneNo) {
    return phoneNo.slice(0, 4) + "****" + phoneNo.slice(7);
  },
  _handleChange(event) {
    let inputValue = event.target.value;
    if (inputValue.length > 6) {
      inputValue = inputValue.slice(0, 6); //slice是一个非变异的方法，即它不改变母字符串，而是返回一个切割后的子字符串
    }
    inputValue = inputValue.replace(/[^\d]/g, "");

    this.setState({
      verificationCode: inputValue
    });
  },
  render() {
    let {
      userPhoneNo,
      onCloseModal,
      formSubmitHandler,
      isAutoSend,
      callbackOfMobileVerificationCode
    } = this.props;

    let { verificationCode } = this.state;

    return (
      <div className="verificationCodeForm">
        <Icon
          name="modal-closeBtn"
          classPrefix="imgIcon"
          onClick={onCloseModal}
        />
        <div className="title">
          正发送验证码至{this._formatPhoneNo(userPhoneNo)}
        </div>
        <List>
          <List.Item nested="input">
            <Field
              value={verificationCode}
              onChange={this._handleChange}
              placeholder="请输入短信验证码"
            />
            <MobileVerificationCode
              phoneNo={userPhoneNo}
              type="PACG"
              autoSend={isAutoSend}
              countDownDuration={180}
              _handlerOfRegisterToPABankSuccessAlready={
                callbackOfMobileVerificationCode
              }
            />
          </List.Item>
        </List>
        <Button
          amStyle="primary"
          block
          radius
          disabled={verificationCode ? false : true}
          onClick={formSubmitHandler.bind(null, verificationCode)}
        >
          确认开户
        </Button>
        <Slogan />
      </div>
    );
  }
});

let RegisterToPABank = React.createClass({
  getInitialState() {
    return {
      isModalOpen: false,
      modalTitle: "",
      modalRole: "loading",
      modalInnerText: "",
      isCityPickOpen: false,
      isAgreementChecked: false,
      isCertificationSuccess: false,
      isCertificationSuccess_old: false,
      data: RegisterToPABankStore.getAll()
    };
  },
  _openPicker() {
    this.setState({
      isCityPickOpen: true
    });
  },
  _closePicker() {
    this.setState({
      isCityPickOpen: false
    });
  },
  _jumpToNextLocation(pathname) {
    if (pathname) {
      this.context.router.push({
        pathname: pathname
      });
    }
  },
  _jumpToBankList() {
    let {
      realName,
      idcard,
      bankName,
      bankId,
      bankCardNo,
      provinceText,
      cityText,
      subbranchBankName,
      subbranchBankId,
      userPhoneNo
    } = this.state.data;

    let beforeComponent = "registerToPABank";

    this.context.router.push({
      pathname: "bankListOfPACG",
      query: {
        realName,
        idcard,
        bankName,
        bankId,
        bankCardNo,
        provinceText,
        cityText,
        subbranchBankName,
        subbranchBankId,
        userPhoneNo,
        beforeComponent
      }
    });
  },
  _jumpToSearchSubbranchBank() {
    let {
      realName,
      idcard,
      bankName,
      bankId,
      bankCardNo,
      provinceText,
      cityText,
      subbranchBankName,
      subbranchBankId,
      userPhoneNo
    } = this.state.data;

    if (bankId && cityText) {
      this.context.router.push({
        pathname: "searchSubbranchBank",
        query: {
          realName,
          idcard,
          bankName,
          bankId,
          bankCardNo,
          provinceText,
          cityText,
          subbranchBankName,
          subbranchBankId,
          userPhoneNo
        }
      });
    } else {
      let fieldName = "";
      if (bankId === "") {
        fieldName = "银行";
      } else if (cityText === "") {
        fieldName = "开户地区";
      } else {
        fieldName = "银行和开户地区";
      }
      Message.broadcast(`请先选择对应的${fieldName}！`);
    }
  },
  _handleFieldValueChange(fieldName) {
    let fieldValue = this.refs[fieldName].getValue();
    switch (fieldName) {
      case "idcard":
        fieldValue = fieldValue.replace(/[^a-z0-9]+/gi, "");
        if (fieldValue.length > 18) {
          fieldValue = fieldValue.slice(0, 18);
        }
        break;
      case "bankCardNo":
        //这段正则表达式能过滤非空格的字符，也能满足四个数字为一段的格式化要求
        fieldValue = fieldValue
          .replace(/\s/g, "")
          .replace(/\D/g, "")
          .replace(/(\d{4})(?=\d)/g, "$1 ")
          .slice(0, 23);
        break;
      case "userPhoneNo":
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
    }
    RegisterToPABankAction.changeFieldValue(fieldValue, fieldName);
  },
  _submitRegisterForm(leftQureyTime) {
    if (leftQureyTime > 0) {
      RegisterToPABankAction.submitRegisterForm();
    } else {
      return;
    }
  },
  _handleNavClick() {
    let beforeComponent = this.props.location.query.beforeComponent;
    if (!!beforeComponent) {
      this.context.router.push({
        pathname: beforeComponent
      });
    } else {
      this.context.router.push({
        pathname: "home"
      });
    }
  },
  _handleAlertModalDismiss() {
    this.setState({
      isModalOpen: false
    });
  },
  _handleCitySelected(province, city) {
    let { provinceText, cityText, subbranchBankName } = this.state.data;

    let isChanged = province !== provinceText || city !== cityText;

    if (isChanged && subbranchBankName) {
      RegisterToPABankAction.changeFieldValue("", "subbranchBankName");
    }

    this.setState(
      {
        isCityPickOpen: false
      },
      () => {
        RegisterToPABankAction.changeFieldValue(province, "provinceText");
        RegisterToPABankAction.changeFieldValue(city, "cityText");
      }
    );
  },
  _showPhoneNoHint() {
    this.setState({
      modalTitle: "手机号说明",
      isModalOpen: true,
      modalRole: "alert",
      modalInnerText:
        "银行预留手机号指办理该银行卡时所填写的手机号码，若没有预留、忘记或者停用，请联系银行客服更新处理。"
    });
  },
  _closeModal() {
    this.setState({
      isModalOpen: false
    });
  },
  _submitVerificationCode(verificationCode) {
    if (verificationCode && verificationCode.length === 6) {
      RegisterToPABankAction.submitVerificationCode(verificationCode);
    } else {
      Message.broadcast("验证码不正确，请检查！");
    }
  },
  _handlerToggleCheck() {
    this.setState({
      isAgreementChecked: !this.state.isAgreementChecked
    });
  },
  _handlerOfRegisterToPABankSuccessAlready() {
    Message.broadcast("您已经成功开通过存管子账户！");
    this.context.router.push({
      pathname: "userHome"
    });
  },
  render() {
    let {
      realName,
      idcard,
      bankId,
      bankName,
      bankCardNo,
      userPhoneNo,
      provinceText,
      cityText,
      subbranchBankName,
      leftQureyTime
    } = this.state.data;

    let {
      isModalOpen,
      modalTitle,
      modalRole,
      modalInnerText,
      isAgreementChecked,
      isCertificationSuccess,
      isCertificationSuccess_old
    } = this.state;

    let leftNav = {
      component: "a",
      icon: "left-nav",
      title: "返回"
    };

    let isNextStepBtnEnabled =
      realName &&
      idcard &&
      bankId &&
      bankCardNo &&
      userPhoneNo &&
      provinceText &&
      cityText &&
      subbranchBankName &&
      isAgreementChecked &&
      leftQureyTime > 0;
    let isReadOnly_realName =
      (realName && isCertificationSuccess) ||
      (realName && isCertificationSuccess_old);
    let isReadOnly_idcard =
      (idcard && isCertificationSuccess) ||
      (idcard && isCertificationSuccess_old);
    let isReadOnly_bankName = bankName && isCertificationSuccess;
    let isReadOnly_bankCardNo = bankCardNo && isCertificationSuccess;

    return (
      <Container id="registerToPABank" scrollable={true}>
        <NavBar
          title="开通存管子账户"
          leftNav={[leftNav]}
          amStyle="primary"
          onAction={this._handleNavClick}
        />
        <List>
          <List.Item nested="input">
            <Field
              type="text"
              label="姓名"
              placeholder="请输入真实姓名"
              ref="realName"
              value={realName}
              onChange={this._handleFieldValueChange.bind(null, "realName")}
              readOnly={isReadOnly_realName}
            />
          </List.Item>
          <List.Item nested="input">
            <Field
              type="text"
              label="身份证"
              placeholder="请输入身份证号码"
              ref="idcard"
              value={idcard}
              onChange={this._handleFieldValueChange.bind(null, "idcard")}
              readOnly={isReadOnly_idcard}
            />
          </List.Item>
          <List.Item nested="input">
            <Field
              type="text"
              label="银行"
              placeholder="请选择银行"
              ref="bankName"
              inputAfter={
                isReadOnly_bankName ? null : (
                  <Icon
                    name="right-nav"
                    style={{ fontSize: "20px", color: "#c2c2c2" }}
                  />
                )
              }
              readOnly={true}
              value={bankName}
              onClick={isReadOnly_bankName ? null : this._jumpToBankList}
            />
          </List.Item>
          <List.Item nested="input">
            <Field
              type="text"
              label="卡号"
              placeholder="请输入卡号"
              ref="bankCardNo"
              value={bankCardNo}
              onChange={this._handleFieldValueChange.bind(null, "bankCardNo")}
              readOnly={isReadOnly_bankCardNo}
            />
          </List.Item>
          <List.Item nested="input" onClick={this._openPicker}>
            <Field
              readOnly
              type="text"
              label="开户地区"
              placeholder="请选择开户地区"
              value={
                provinceText && cityText ? provinceText + " " + cityText : ""
              }
              inputAfter={
                <Icon
                  name="right-nav"
                  style={{ fontSize: "20px", color: "#c2c2c2" }}
                />
              }
            />
          </List.Item>
          <List.Item nested="input" onClick={this._jumpToSearchSubbranchBank}>
            <Field
              readOnly
              type="text"
              label="开户行"
              placeholder="请选择开户行"
              value={subbranchBankName}
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
              readOnly
              type="text"
              label="手机号码"
              placeholder="请输入银行预留的手机号"
              ref="userPhoneNo"
              value={userPhoneNo}
              style={{ paddingLeft: "8px" }}
            />
            <Icon
              name="rtpab-doubt"
              classPrefix="imgIcon"
              onClick={this._showPhoneNoHint}
            />
          </List.Item>
        </List>

        <div className="btn-wrapper">
          <PABankSeviceAgreementLink
            isAgreementChecked={isAgreementChecked}
            toggleCheck={this._handlerToggleCheck}
          />
          <Button
            amStyle="primary"
            block
            radius
            disabled={isNextStepBtnEnabled ? false : true}
            onClick={this._submitRegisterForm.bind(null, leftQureyTime)}
          >
            下一步
          </Button>
          <div className="registerCount-hint cf text-center">
            <span>
              您还有<strong>{leftQureyTime}</strong>次开通机会
            </span>
          </div>
        </div>
        <WarmHintOfRegisterToPABank />
        <Modal
          title={modalTitle}
          isOpen={isModalOpen}
          role={modalRole}
          onDismiss={this._handleAlertModalDismiss}
        >
          {modalInnerText}
        </Modal>
        <CityPicker
          isOpen={this.state.isCityPickOpen}
          onFinished={this._handleCitySelected}
        />
      </Container>
    );
  },
  componentDidMount() {
    RegisterToPABankStore.bind(
      "certificationIsSuccess",
      function() {
        this.setState({
          isCertificationSuccess: true
        });
      }.bind(this)
    );

    RegisterToPABankStore.bind(
      "certificationIsSuccess_old",
      function() {
        this.setState({
          isCertificationSuccess_old: true
        });
      }.bind(this)
    );

    RegisterToPABankStore.bind(
      "change",
      function() {
        this.setState({
          data: RegisterToPABankStore.getAll(),
          isCityPickOpen: false
        });
      }.bind(this)
    );

    RegisterToPABankStore.bind(
      "registerRequestIsStarting",
      function() {
        this.setState({
          modalTitle: "",
          isModalOpen: true,
          modalRole: "loading",
          modalInnerText: "处理中，请稍候..."
        });
      }.bind(this)
    );

    RegisterToPABankStore.bind("submitRegisterFormFailed", function(msg) {
      Message.broadcast(msg);
    });

    RegisterToPABankStore.bind(
      "realNameCertificationFailed",
      function(msg) {
        this.setState(
          {
            data: RegisterToPABankStore.getAll(),
            isModalOpen: false
          },
          function() {
            Message.broadcast(msg);
          }
        );
      }.bind(this)
    );

    RegisterToPABankStore.bind(
      "realNameCertificationSuccess",
      function(isNeedToSendVerificationCode) {
        let { userPhoneNo } = this.state.data;

        if (isNeedToSendVerificationCode) {
          this.setState({
            modalTitle: "",
            isModalOpen: true,
            modalRole: "loading",
            modalInnerText: (
              <VerificationCodeForm
                userPhoneNo={userPhoneNo}
                onCloseModal={this._closeModal}
                formSubmitHandler={this._submitVerificationCode}
                isAutoSend={true}
                callbackOfMobileVerificationCode={
                  this._handlerOfRegisterToPABankSuccessAlready
                }
              />
            )
          });
        } else {
          RegisterToPABankAction.submitVerificationCode("");
        }
      }.bind(this)
    );

    RegisterToPABankStore.bind(
      "registerToPABankFailed",
      function(msg, errorType) {
        let { leftQureyTime, userPhoneNo } = RegisterToPABankStore.getAll();

        if (leftQureyTime === 0) {
          //如果剩余的开通机会为0，则跳转到开通存管帮助页面
          let beforeComponent = this.props.location.query.beforeComponent;
          let locationObj = {
            pathname: "registerToPABankFailedHint"
          };
          if (!!beforeComponent) {
            locationObj.query = {
              beforeComponent: beforeComponent
            };
          }
          this.context.router.push(locationObj);
        } else {
          //如果是属于短信验证码方面的错误的话，则使用toast来展示提示信息
          if (errorType === "verificationCodeError") {
            this.setState(
              {
                modalTitle: "",
                isModalOpen: true,
                modalRole: "loading",
                modalInnerText: (
                  <VerificationCodeForm
                    userPhoneNo={userPhoneNo}
                    onCloseModal={this._closeModal}
                    formSubmitHandler={this._submitVerificationCode}
                    isAutoSend={false}
                    callbackOfMobileVerificationCode={
                      this._handlerOfRegisterToPABankSuccessAlready
                    }
                  />
                )
              },
              () => {
                Message.broadcast(msg);
              }
            );
          } else {
            this.setState({
              data: RegisterToPABankStore.getAll(),
              modalTitle: "失败原因",
              isModalOpen: true,
              modalRole: "alert",
              modalInnerText: msg + ",剩余开通机会" + leftQureyTime + "次"
            });
          }
        }
      }.bind(this)
    );

    RegisterToPABankStore.bind(
      "registerToPABankSuccess",
      function(msg) {
        this.context.router.push({
          pathname: "registerToPABankSuccessHint"
        });
      }.bind(this)
    );

    RegisterToPABankStore.bind(
      "registerToPABankSuccessAlready",
      function() {
        this._handlerOfRegisterToPABankSuccessAlready();
      }.bind(this)
    );

    let queryData = this.props.location.query || {};
    let localData = {};
    let currUserPhoneNo = cookie.getCookie("phoneNo");

    //如果本地缓存数据对应的不是当前登录进来用户，那么不把本地缓存数据更新到store里面
    if (localStorage.getItem("RTPAB_form")) {
      let dataAfterParse = JSON.parse(localStorage.getItem("RTPAB_form"));
      let prevUserPhoneNo = dataAfterParse.userPhoneNo;
      if (currUserPhoneNo === prevUserPhoneNo) {
        localData = dataAfterParse;
      }
    }
    RegisterToPABankAction.getInitialDataFromServer(
      currUserPhoneNo,
      localData,
      queryData
    );
  },
  componentWillUnmount() {
    RegisterToPABankStore.storeFormDataInLocal(); //在用户离开该页面（组件被卸载之前）将用户最后输入的姓名，身份证号和银行卡号存放在localStorage里面
    RegisterToPABankStore.clearAll();
  }
});

RegisterToPABank.contextTypes = {
  router: React.PropTypes.object.isRequired
};

module.exports = RegisterToPABank;

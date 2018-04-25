require('../../scss/page/Withdraw.scss');
let WithdrawAction = require('../actions/WithdrawAction.js');
let WithdrawStore = require('../stores/WithdrawStore.js');
import { Link } from 'react-router';

import React from 'react';
import classNames from 'classnames';

import Container from '../UIComponents/Container';
import NavBar from '../UIComponents/NavBar';
import Button from '../UIComponents/Button';
import Field from '../UIComponents/Field';
import List from '../UIComponents/List';
import Icon from '../UIComponents/Icon';
import Group from '../UIComponents/Group';
import Message from '../UIComponents/Message';
import Modal from '../UIComponents/modal/Modal';
import MobileVerificationCode from '../UIComponents/MobileVerificationCode';

import BankCard from './utilities/BankCard';
import WarmHintOfWithdraw from './utilities/WarmHintOfWithdraw';
import cookie from '../lib/cookie';
import { isAndroid } from '../lib/deviceDetect';

//提现组件
let Withdraw = React.createClass({
  getInitialState() {
    return {
      ishowWithdrawHint: false,
      data: WithdrawStore.getAll(),
      isModalOpen: false,
      showDealPasswordField: false,
      viewName: 'initial'
    };
  },
  _handleWithdrawAmountChange() {
    let reg = /[^\d\.]/g; //过滤除了数字和点号的字符
    let withdrawAmount = this.refs.withdrawAmount.getValue().replace(reg, '');
    if (withdrawAmount.indexOf('.') > -1) {
      //如果是小数点后的位数大于两位的小数,则将其截断为小数点后两位
      if (
        !!withdrawAmount.split('.')[1] &&
        withdrawAmount.split('.')[1].length > 2
      ) {
        withdrawAmount =
          withdrawAmount.split('.')[0] +
          '.' +
          withdrawAmount.split('.')[1].slice(0, 2);
      }
    }
    withdrawAmount = withdrawAmount === '' ? 0 : withdrawAmount;
    WithdrawAction.changeWithdrawAmount(parseFloat(withdrawAmount));
  },
  _handleNavClick(navObj) {
    switch (navObj.title) {
      case '返回':
        if (this.state.viewName === 'nextStep') {
          this.setState(
            {
              viewName: 'initial'
            },
            () => {
              WithdrawAction.changeWithdrawAmount(0);
            }
          );
        } else {
          this.context.router.push({
            pathname: 'userHome'
          });
        }
        break;
      case '温馨提示':
        this._showWarmHintOfWithdraw();
        break;
      default:
        break;
    }
  },
  _closeModal() {
    this.setState({
      isModalOpen: false
    });
  },
  _showWarmHintOfWithdraw() {
    this.setState({
      ishowWithdrawHint: true
    });
  },
  _hideWarmHintOfWithdraw() {
    this.setState({
      ishowWithdrawHint: false
    });
  },
  _openLoadingModal() {
    this.setState({
      isModalOpen: true
    });
  },
  _toggleEyeOfField(fieldName) {
    switch (fieldName) {
      case 'dealPassword':
        this.setState({
          showDealPasswordField: !this.state.showDealPasswordField
        });
        break;
      default:
        break;
    }
  },
  _toggleToNextStepView() {
    this.setState({
      viewName: 'nextStep'
    });
  },
  _handleFieldValueChange(fieldName) {
    let fieldValue = this.refs[fieldName].getValue();
    switch (fieldName) {
      case 'verificationCode':
        if (fieldValue.length > 6) {
          fieldValue = fieldValue.slice(0, 6);
        }
        fieldValue = fieldValue.replace(/[^\d\.]/g, '');
        break;
      case 'dealPassword':
        if (fieldValue.length > 16) {
          fieldValue = fieldValue.slice(0, 16);
        }
        break;
      default:
        break;
    }

    WithdrawAction.changeFieldValue(fieldName, fieldValue);
  },
  _renderNextStepView() {
    let { withdrawAmount, dealPassword, verificationCode } = this.state.data;

    return (
      <div>
        <List>
          <List.Item nested="input">
            <Field
              id="verificationCodeField"
              type="text"
              label="验证码"
              placeholder="请输入短信验证码"
              value={verificationCode}
              ref="verificationCode"
              onChange={this._handleFieldValueChange.bind(
                null,
                'verificationCode'
              )}
              inputAfter={
                <MobileVerificationCode
                  phoneNo={cookie.getCookie('phoneNo')}
                  type="withdraw"
                  countDownDuration={180}
                  withdrawAmount={withdrawAmount}
                />
              }
            />
          </List.Item>

          <List.Item nested="input">
            <Field
              type={this.state.showDealPasswordField ? 'text' : 'password'}
              label="交易密码"
              placeholder="请输入交易密码"
              ref="dealPassword"
              value={dealPassword}
              onChange={this._handleFieldValueChange.bind(null, 'dealPassword')}
            />
            <Icon
              name={this.state.showDealPasswordField ? 'eye-on' : 'eye-off'}
              classPrefix="imgIcon"
              onClick={this._toggleEyeOfField.bind(null, 'dealPassword')}
            />
          </List.Item>
        </List>
        <div className="forgetPassword-wrapper">
          <Link to="getBackDealPassword">忘记密码?</Link>
        </div>
      </div>
    );
  },
  render() {
    if (this.state.ishowWithdrawHint) {
      return (
        <WarmHintOfWithdraw navBarClickHandler={this._hideWarmHintOfWithdraw} />
      );
    } else {
      let {
        withdrawAmount,
        handlingCharge,
        acctAccount,
        bankCardInfo,
        available,
        dealPassword,
        verificationCode
      } = this.state.data;

      let { isModalOpen } = this.state;

      let leftNav = {
        component: 'a',
        icon: 'left-nav',
        title: '返回'
      };

      let rightNav = {
        component: 'a',
        icon: '',
        title: '温馨提示'
      };

      let currViewName = this.state.viewName;
      let isSubmitBtnEnabled = !!dealPassword && !!verificationCode;
      withdrawAmount =
        withdrawAmount === 0
          ? ''
          : currViewName === 'nextStep'
            ? parseFloat(withdrawAmount).toFixed(2)
            : withdrawAmount;

      return (
        <Container {...this.props} scrollable={isAndroid} id="withdraw">
          <NavBar
            title="提现"
            leftNav={[leftNav]}
            rightNav={[rightNav]}
            amStyle="primary"
            onAction={this._handleNavClick}
          />
          <BankCard {...bankCardInfo} />
          <Group header="" className="withdraw-form">
            <div className="title header">
              提现金额<span className="subtitle">
                (可提现金额：<strong>￥{available.toFixed(2)}</strong>)
              </span>
            </div>
            <List>
              <List.Item nested="input">
                <Field
                  readOnly={currViewName === 'nextStep'}
                  type="text"
                  label="￥"
                  placeholder="提现金额不能小于10元"
                  ref="withdrawAmount"
                  value={withdrawAmount}
                  onChange={this._handleWithdrawAmountChange}
                />
                <Icon
                  name="eye-on"
                  classPrefix="imgIcon"
                  style={{ visibility: 'hidden' }}
                />
              </List.Item>
            </List>
            {withdrawAmount ? (
              <div className="subtitle cf footer">
                <div className="fl">手续费：￥2.00</div>
                <div className="fr">
                  实际到账：<strong>￥{acctAccount.toFixed(2)}</strong>
                </div>
              </div>
            ) : null}
          </Group>

          {currViewName === 'nextStep' ? this._renderNextStepView() : null}

          <div
            className=""
            style={{ padding: '0 0.9375rem', marginTop: '2rem' }}
          >
            {currViewName === 'nextStep' ? (
              <Button
                amStyle="primary"
                block
                radius={true}
                disabled={!isSubmitBtnEnabled}
                onClick={WithdrawAction.submitWithdrawForm}
              >
                提交
              </Button>
            ) : (
              <Button
                amStyle="primary"
                block
                radius={true}
                onClick={WithdrawAction.nextStep_upgrade}
              >
                下一步
              </Button>
            )}
          </div>
          {/* {
                        this.state.ishowWithdrawHint ?
                            <a href="javascript:void(0)" className="withdraw-hint-btn text-center" onClick={this._showWarmHintOfWithdraw}>提现到账时间?</a> :
                            null
                    } */}
          <Modal role="loading" isOpen={isModalOpen}>
            正在处理中，请稍候......
          </Modal>
        </Container>
      );
    }
  },
  componentDidMount() {
    WithdrawAction.getBankCardInfoFromServer();
    WithdrawAction.getUserBalance();

    //解决了由于输入框获得焦点后，虚拟键盘会把slogan组件顶上去的细节。
    // let originHeight = window.innerHeight;
    // window.onresize = function () {
    //     let currHeight = window.innerHeight;
    //     this.setState({
    //         ishowWithdrawHint: currHeight < originHeight ? false : true
    //     });
    // }.bind(this);

    WithdrawStore.bind('connectToPABServeFailed', () => {
      Message.broadcast('服务器繁忙，请稍后再试');
      this.context.router.push({
        pathname: 'userHome'
      });
    });

    WithdrawStore.bind('requestIsStarting', () => {
      this._openLoadingModal();
    });

    WithdrawStore.bind('requestIsEnd', () => {
      this._closeModal();
    });

    WithdrawStore.bind('formCheckFailed', function(msg) {
      Message.broadcast(msg);
    });

    WithdrawStore.bind(
      'getPermissionSuccess',
      function() {
        this._toggleToNextStepView();
      }.bind(this)
    );

    WithdrawStore.bind(
      'getPermissionFailed',
      function(msg) {
        Message.broadcast(msg);
      }.bind(this)
    );

    WithdrawStore.bind('withdrawFailed', function(msg) {
      Message.broadcast(msg);
    });

    WithdrawStore.bind(
      'applyForWithdrawSuccess',
      function(withdrawId) {
        let { withdrawAmount, handlingCharge, acctAccount } = this.state.data;

        this.context.router.push({
          pathname: 'withdrawApplySuccessHint',
          query: {
            withdrawId,
            withdrawAmount,
            handlingCharge,
            acctAccount
          }
        });
      }.bind(this)
    );

    WithdrawStore.bind(
      'applyForWithdrawFailed',
      function(msg) {
        Message.broadcast(msg);
      }.bind(this)
    );

    WithdrawStore.bind(
      'change',
      function() {
        this.setState({
          data: WithdrawStore.getAll()
        });
      }.bind(this)
    );

    WithdrawStore.bind(
      'getNextLocationInfoSuccess',
      function(nextLocation) {
        window.location.href = nextLocation;
      }.bind(this)
    );

    WithdrawStore.bind(
      'getNextLocationInfoFailed',
      function(msg) {
        Message.broadcast(msg);
      }.bind(this)
    );
  },
  componentWillUnmount() {
    window.onresize = null;
    WithdrawStore.unbind('formCheckSuccess');
    WithdrawStore.unbind('formCheckFailed');

    WithdrawStore.clearAll();
  }
});

Withdraw.contextTypes = {
  router: React.PropTypes.object.isRequired
};

module.exports = Withdraw;

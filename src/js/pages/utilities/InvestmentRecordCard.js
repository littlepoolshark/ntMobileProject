require('../../../scss/page/InvestmentRecordCard.scss');
import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router';

import Group from '../../UIComponents/Group';
import Grid from '../../UIComponents/Grid';
import Col from '../../UIComponents/Col';
import Icon from '../../UIComponents/Icon';
import Button from '../../UIComponents/Button';
import Message from '../../UIComponents/Message';

/*
 *  InvestmentRecordCard component
 * 这是投资计划投资明细，好采投投资明细和债权转让投资明细共用的卡片组件
 */
let InvestmentRecordCard = React.createClass({
  _renderInterestRate(interestRate, interestMonth) {
    if (parseFloat(interestRate) === 0 || !!!interestRate) {
      return null;
    } else {
      return (
        <span className="tag-icon">
          {'+' +
            interestRate +
            ' ' +
            (interestMonth && interestMonth !== 0
              ? interestMonth + '个月'
              : '')}
        </span>
      );
    }
  },
  _renderRedPackage(redPackageAmount) {
    if (parseFloat(redPackageAmount) === 0 || !!!redPackageAmount) {
      return null;
    } else {
      return <span className="tag-icon">{'+' + redPackageAmount + '元'}</span>;
    }
  },
  _renderCardTag(status) {
    if (status === 'transferring') {
      return <span className="tag-transfer" />;
    } else if (status === 'transfered') {
      return <span className="tag-transfered" />;
    } else {
      return null;
    }
  },
  /*
    * @description  这是针对用户中心-》我的月满盈中回款中，退出中列表。这两个预约列表是具有预约和修改退出的功能的。
    */
  _renderMoonLoanApplyBtn(
    moonLoanStatus,
    canApplyToQuit,
    time,
    applyBtnHandler,
    id,
    title
  ) {
    if (
      moonLoanStatus &&
      ['holding', 'quitting'].indexOf(moonLoanStatus) > -1
    ) {
      let btnText = moonLoanStatus === 'holding' ? '预约退出' : '修改预约';
      return (
        <Button
          amStyle="primary"
          amSize="sm"
          className={!canApplyToQuit ? 'disabled' : ''}
          onClick={event => {
            event.stopPropagation();
            applyBtnHandler &&
              applyBtnHandler(moonLoanStatus, canApplyToQuit, time, id, title);
          }}
        >
          {btnText}
        </Button>
      );
    } else {
      return null;
    }
  },
  _renderCardBody(props) {
    let {
      productType,
      dueInPrincipalAndInterest, //待收本息
      time, //下个还款日或者结清日期或者月满盈的预约退出时间
      investAmount, //投资金额
      investStatus, //该款投资所进入的状态（applying:申请加入中；repaying:回款中；clearing：已结清）
      buy_progress, //月满盈的购买进度
      moonLoanStatus,
      remainBidAmount, //转让之后标的当前剩余可购买金额（转出进度组件专用）
      status
    } = props;

    if (investStatus === 'applying') {
      //加入中的卡片结构跟其他种情况的不一样
      if (status === 'transferring') {
        //转出进度组件的"转出中"tab的卡片
        return (
          <Grid collapse={true} className="body">
            <Col cols={2} className="investMoney-cell text-left">
              <div className="subtitle">投资金额(元)</div>
              <div className="number">
                <strong>{investAmount}</strong>
              </div>
            </Col>
            <Col cols={2} />
            <Col cols={2} className="text-right">
              <div className="subtitle">转让剩余金额(元)</div>
              <div className="number">{remainBidAmount}</div>
            </Col>
          </Grid>
        );
      } else {
        let loanStatusStamp = '';
        switch (productType) {
          case 'moon':
          case 'loan_product':
          case 'glj':
          case 'ced':
          case 'nyd':
            if (buy_progress && parseFloat(buy_progress) === 1) {
              loanStatusStamp = (
                <img
                  src={require('../../../img/daifankuan.png')}
                  className="stamp-img"
                  alt=""
                />
              );
            } else {
              loanStatusStamp = (
                <img
                  src={require('../../../img/daimanbiao.png')}
                  className="stamp-img"
                  alt=""
                />
              );
            }
            break;
          case 'creditor_product':
            loanStatusStamp = (
              <img
                src={require('../../../img/daicj.png')}
                className="stamp-img"
                alt=""
              />
            );
            break;
          case 'yyz_product':
          case 'jjz_product':
            loanStatusStamp = (
              <img
                src={require('../../../img/daiqixi.png')}
                className="stamp-img"
                alt=""
              />
            );
            break;
          default:
            loanStatusStamp = (
              <img
                src={require('../../../img/daimanbiao.png')}
                className="stamp-img"
                alt=""
              />
            );
            break;
        }

        return (
          <Grid collapse={true} className="body">
            <Col cols={2} className="investMoney-cell text-left">
              <div className="subtitle">投资金额(元)</div>
              <div className="number">{investAmount}</div>
            </Col>
            <Col cols={2} />
            <Col cols={2} className="text-right">
              {loanStatusStamp}
            </Col>
          </Grid>
        );
      }
    } else {
      return (
        <Grid collapse={true} className="body">
          <Col cols={2} className="preRepay-cell text-left">
            <div className="subtitle">
              {investStatus === 'repaying' ? '待收本息' : '已收本息'}
            </div>
            <div className="number">
              <strong>{dueInPrincipalAndInterest}</strong>
            </div>
          </Col>
          <Col cols={2} className="endTime-cell text-center">
            <div className="subtitle">
              {investStatus === 'repaying'
                ? moonLoanStatus === 'quitting' ? '预约退出时间' : '下个还款日'
                : status === 'transfered' ? '转出时间' : '到期时间'}
            </div>
            <div className="number">{time}</div>
          </Col>
          <Col cols={2} className="investMoney-cell text-right">
            <div className="subtitle">投资金额(元)</div>
            <div className="number">{investAmount}</div>
          </Col>
        </Grid>
      );
    }
  },
  _renderCheckContractBtn(isShowCheckContractBtn,contractUrl){
    if(isShowCheckContractBtn){
      return !!contractUrl ? 
      <a href={contractUrl}  style={{marginLeft:"auto"}}>查看合同</a>  :
      <a href="javascript:void(0)" onClick={() => { Message.broadcast('合同生成中.....') }}  style={{marginLeft:"auto"}}>查看合同</a>
    }

    return null;
  },
  render() {
    let {
      id,
      productType, //产品类型（yyz_product,jjz_product,loan_product,creditor_product,moon,glj,ced）
      title, //标的名称
      interestRate, //加息券的年化利率
      redPackageAmount, //红包金额
      yearRate, //标的的历史年化
      deadline, //标的的期限,或者表示还款期数目，形如 “3/6”,表示剩余期数 / 总期数
      clickHandler,
      status,
      rewardRate,
      creId,
      moonLoanStatus, //月满盈的列表的状态（holding，quitting ）
      canApplyToQuit, //月满盈是否可以预约的标志
      time,
      applyBtnHandler,
      repaymentType, //从后台返回的回款方式
      hideTheTransferTag,
      interestMonth,
      vipRaiseRate,
      checkContractBtn,
      contractUrl
    } = this.props;

    let repaymentTypeStr = '';
    if (repaymentType) {
      //默认显示后台返回的字段，如果没有，则前端自己显示
      repaymentTypeStr = repaymentType;
    } else {
      if (productType === 'yyz_product' || productType === 'new_product') {
        repaymentTypeStr = '一次性还本付息';
      } else {
        repaymentTypeStr = '按月结息,到期还本';
      }
    }

    //基本利率+标的奖励利率+vip加息利率
    let totalLoanRate = parseFloat(yearRate);
    if (rewardRate) {
      totalLoanRate += parseFloat(rewardRate);
    }
    if (vipRaiseRate) {
      totalLoanRate += parseFloat(vipRaiseRate);
    }
    totalLoanRate = totalLoanRate.toFixed(1) + '%';

    return (
      <Group
        className="InvestmentRecord-card"
        onClick={clickHandler && clickHandler.bind(null, this.props)}
      >
        <h6 className="header">
          <span className="title">{title}</span>
          {productType === 'creditor_product' && !hideTheTransferTag ? (
            <span className="tag-icon">转</span>
          ) : null}
          {this._renderInterestRate(interestRate, interestMonth)}
          {this._renderRedPackage(redPackageAmount)}
          {this._renderCheckContractBtn(checkContractBtn,contractUrl)}
          {/* 
            2018-03-19，月满盈，丰收盈产品下架。该产品的交易记录只可以查看，不能再操作了
            {this._renderMoonLoanApplyBtn(moonLoanStatus,canApplyToQuit,time,applyBtnHandler,id,title)} 
          */}
        </h6>
        {this._renderCardBody(this.props)}
        <Grid collapse={true} className="footer">
          <Col cols={2} className="text-left">
            {totalLoanRate}
          </Col>
          <Col cols={2} className="text-center">
            {deadline}
          </Col>
          <Col cols={2} className="text-right pay-modal">
            {repaymentTypeStr}
          </Col>
        </Grid>
        {/*this._renderCardTag(status)*/}
      </Group>
    );
  }
});

module.exports = InvestmentRecordCard;

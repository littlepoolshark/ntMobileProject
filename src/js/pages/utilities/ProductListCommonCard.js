require('../../../scss/page/CommonCard.scss');
import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router';

//ui component
import Group from '../../UIComponents/Group';
import Grid from '../../UIComponents/Grid';
import Col from '../../UIComponents/Col';
import Icon from '../../UIComponents/Icon';
import Button from '../../UIComponents/Button';

//utilities component
import mixin from './mixin';

//新手标，月月赚，季季赚，好采投和债权转让共用的card组件,目前用于投资列表页
/*const mapTypeToTagName ={
    yyz_product:["加息券"],
    jjz_product:["加息券","红包"],
    loan_product:["加息券","红包"],
    creditor_product:["转"],
    moon:["加息券","红包"],
    rich:["加息券","红包"]
};*/

let ProductListCommonCardTitle = React.createClass({
  render() {
    let { title, type, vipRaiseRate } = this.props;
    return (
      <h6 className="title">
        <span>{title}</span>
        {type === 'creditor_product' ? <span className="tag">转</span> : null}
        {vipRaiseRate ? (
          <span className="vip-rate">
            VIP{'+' + (vipRaiseRate * 100).toFixed(1) + '%'}
          </span>
        ) : null}
      </h6>
    );
  }
});

let ProductListCommonCard = React.createClass({
  mixins: [mixin],
  propTypes: {
    type: React.PropTypes.string,
    title: React.PropTypes.string,
    yearRate: React.PropTypes.string,
    deadline: React.PropTypes.string,
    deadlineUnit: React.PropTypes.string,
    remainAmount: React.PropTypes.number,
    isSoldOut: React.PropTypes.bool
  },
  getDefaultProps() {
    return {
      title: '--',
      type: 'newbieLoan',
      yearRate: '--',
      deadline: '--',
      deadlineUnit: '--',
      remainAmount: 0,
      isSoldOut: true
    };
  },
  _formatTimeStamp(timeStamp) {
    let timeStr = '';
    let date = new Date(timeStamp);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    timeStr =
      (hours < 10 ? '0' + hours : hours) +
      ':' +
      (minutes < 10 ? '0' + minutes : minutes);
    return timeStr;
  },
  _renderRemainAmount(remainAmount) {
    if (remainAmount >= 10000) {
      return (
        <div className="remainAmount">
          {this._amountFormater(remainAmount)}
          <span className="unit">万</span>
        </div>
      );
    } else {
      return (
        <div className="remainAmount">
          {remainAmount}
          <span className="unit">元</span>
        </div>
      );
    }
  },
  _renderLastCol2(type, productStatusText, isSoldOut, remainAmount) {
    if (type === 'ttz_product') {
      return (
        <div className="ttz-btn-wrapper">
          <Button amStyle="primary" radius amSize="sm" disabled={isSoldOut}>
            {productStatusText}
          </Button>
        </div>
      );
    } else {
      if (!isSoldOut) {
        return (
          <div>
            {this._renderRemainAmount(remainAmount)}
            <div className="subtitle">剩余额度</div>
          </div>
        );
      } else {
        return null;
      }
    }
  },
  _renderYearRate(type, productApr, minRate, maxRate) {
    if (type === 'moon') {
      return (
        this._yearRateFormater(minRate) + '~' + this._yearRateFormater(maxRate)
      );
    } else if (type === 'rich') {
      return this._yearRateFormater(minRate);
    } else {
      return this._yearRateFormater(productApr);
    }
  },
  render() {
    let {
      id,
      type,
      productName,
      productApr,
      repaymentLimit,
      repaymentTypeUnit,
      remainAmount,
      status,
      isFirstChild,
      rewardRate,
      publishtimeL, //预发布的时间戳
      maxRate, //月满盈的最大年化利率
      minRate, //月满盈的最小年化利率
      showTitleForTTZOrNewbieLoan,
      vipRaiseRate
    } = this.props;

    let productStatusText = this._getProductStatusText(type, status);
    let isSoldOut =
      ['已售罄', '放款中', '还款中', '已结束'].indexOf(productStatusText) > -1
        ? true
        : false;
    let pathName = '';
    switch (type) {
      case 'moon':
        pathName = 'moonLoanIntroduction';
        break;
      case 'rich':
        pathName = 'richLoanIntroduction';
        break;
      case 'loan_product':
        pathName = 'fixedLoanIntroduction';
        break;
      case 'creditor_product':
        pathName = 'creditorLoanIntroduction';
        break;
      case 'glj':
        pathName = 'gljLoanIntroduction';
        break;
      case 'ced':
        pathName = 'cedLoanIntroduction';
        break;
      case 'nyd':
        pathName ='nydLoanIntroduction';
        break;
      default:
        pathName = 'EarnSetIntroduction';
        break;
    }
    let stampClass = classNames({
      stamp: true,
      hide: !isSoldOut,
      soldOut: productStatusText === '已售罄',
      releasing: productStatusText === '放款中',
      repaying: productStatusText === '还款中',
      over: productStatusText === '已结束'
    });

    //于2018/03/19,下架了天天赚，月月赚，季季赚，月满盈和丰收盈等产品
    if (
      ['ttz_product', 'yyz_product', 'jjz_product', 'moon', 'rich'].indexOf(
        type
      ) > -1
    ) {
      return null;
    }

    return (
      <Link to={{ pathname: pathName, query: { type: type, productId: id } }}>
        <Group noPadded={false} className="commonCard">
          {['new_product', 'ttz_product'].indexOf(type) > -1 &&
          !showTitleForTTZOrNewbieLoan ? null : (
            <ProductListCommonCardTitle
              title={productName}
              type={type}
              isSoldOut={isSoldOut}
              vipRaiseRate={vipRaiseRate}
            />
          )}
          <Grid collapse={true}>
            <Col cols={4}>
              <Grid collapse={true}>
                <Col cols={2}>
                  <div className="yearRate">
                    {this._renderYearRate(type, productApr, minRate, maxRate)}
                    <span className="unit">%</span>
                    {!!rewardRate ? (
                      <span className="rewardRate">
                        {'+' + (rewardRate * 100).toFixed(1) + '%'}
                      </span>
                    ) : null}
                  </div>
                  <div className="subtitle text-left">历史年化</div>
                </Col>
                <Col cols={4}>
                  <div className="deadline">
                    {type === 'moon' ? '1~' + repaymentLimit : repaymentLimit}
                    <span className="unit">{repaymentTypeUnit}</span>
                  </div>
                  <div className="subtitle">投资期限</div>
                </Col>
              </Grid>
            </Col>
            <Col cols={2} className={isSoldOut ? 'hide' : ''}>
              {this._renderLastCol2(
                type,
                productStatusText,
                isSoldOut,
                remainAmount
              )}
            </Col>
          </Grid>
          {this._getProductStatusText(type, status) === '预发布' ? (
            <div className="prePublish-hint">
              <Icon classPrefix="imgIcon" name="clock" />
              <span>
                今天<strong>{this._formatTimeStamp(publishtimeL)}</strong>开售
              </span>
            </div>
          ) : null}
          <div className={stampClass} />
        </Group>
      </Link>
    );
  }
});

export default ProductListCommonCard;

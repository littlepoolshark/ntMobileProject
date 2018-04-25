require('../../scss/page/NewbieGuide.scss');
let NewbieGuideAction = require('../actions/NewbieGuideAction');
let NewbieGuideStore = require('../stores/NewbieGuideStore');

import React from 'react';
import { Link } from 'react-router';

import View from '../UIComponents/View';
import Container from '../UIComponents/Container';
import NavBar from '../UIComponents/NavBar';
import Icon from '../UIComponents/Icon';

let GuidePath = React.createClass({
  _drawPathLine(direction, disable) {
    let canvas = this.refs.guidePathLine;
    let context = canvas.getContext('2d');
    let basicAxleX = direction === 'rtl' ? 243.5 : 57.5;
    let pathColor = disable === true ? '#cdcdcd' : '#fec901';
    context.lineWidth = 1;
    context.strokeStyle = pathColor;

    //画线段
    context.moveTo(basicAxleX, 0);
    context.lineTo(basicAxleX, 20.5);
    context.lineTo(300 - basicAxleX, 20.5);
    context.lineTo(300 - basicAxleX, 35.5);
    context.lineCap = 'round';
    context.stroke();
    context.closePath();

    //画三角形
    context.beginPath();
    context.lineTo(300 - basicAxleX - 10, 35);
    context.lineTo(300 - basicAxleX + 10, 35);
    context.lineTo(300 - basicAxleX, 50);
    context.closePath();
    context.lineWidth = 0;
    context.fillStyle = pathColor;
    context.fill();
  },
  render() {
    return (
      <canvas
        ref="guidePathLine"
        width="300"
        height="50"
        className="guide-path"
      />
    );
  },
  componentDidMount() {
    this._drawPathLine(this.props.direction, this.props.disable);
  },
  componentWillReceiveProps(nextProps) {
    this._drawPathLine(nextProps.direction, nextProps.disable);
  }
});

let TaskItem = React.createClass({
  _jumpToNextLocation(pathname) {
    let data = {
      pathname: pathname
    };

    if (pathname === 'setDealPassword') {
      data.query = {
        actionType: 'setting'
      };
    }

    if (pathname === 'registerToPABank') {
      data.query = {
        beforeComponent: 'newbieGuide'
      };
    }

    this.context.router.push(data);
  },
  _renderItemBody(isFirstNotFinished, taskName, isFinished, rewardScore) {
    let body = null;
    let lockClasses = isFirstNotFinished ? 'lock shake' : 'lock';
    //!isFinished && isFirstNotFinished ? this._jumpToNextLocation.bind(null,"registerToPABank") : null
    //!isFinished && isFirstNotFinished ? this._jumpToNextLocation.bind(null,"setDealPassword") : null
    //!isFinished && isFirstNotFinished ? this._jumpToNextLocation.bind(null,"productList"): null
    switch (taskName) {
      case 'openZX':
        body = (
          <div className="task-item-body">
            <div className="text-section">
              <div>开通银行存管</div>
              <div
                className={
                  'isFinish-flag ' + (isFinished ? 'success' : 'warning')
                }
              >
                <Icon
                  classPrefix="imgIcon"
                  name={
                    isFinished
                      ? 'authentication-flag'
                      : 'not-authentication-flag'
                  }
                />
                <span>{isFinished ? '已开通' : '去开通'}</span>
              </div>
            </div>
            <div className="img-section" onClick={null}>
              {isFinished ? (
                <img
                  src={require('../../img/badge_bank.png')}
                  alt=""
                  className="bg-img"
                />
              ) : (
                <img
                  src={require('../../img/bg_lock.png')}
                  alt=""
                  className="bg-img"
                />
              )}
              {!isFinished ? (
                <img
                  src={require('../../img/pc_lock.png')}
                  alt=""
                  className={lockClasses}
                />
              ) : null}
            </div>
          </div>
        );
        break;
      case 'setDealPassword':
        body = (
          <div className="task-item-body">
            <div className="img-section" onClick={null}>
              {isFinished ? (
                <img
                  src={require('../../img/badge_set.png')}
                  alt=""
                  className="bg-img"
                />
              ) : (
                <img
                  src={require('../../img/bg_lock.png')}
                  alt=""
                  className="bg-img"
                />
              )}
              {!isFinished ? (
                <img
                  src={require('../../img/pc_lock.png')}
                  alt=""
                  className={lockClasses}
                />
              ) : null}
            </div>
            <div className="text-section">
              <div>设置交易密码</div>
              <div
                className={
                  'isFinish-flag ' + (isFinished ? 'success' : 'warning')
                }
              >
                <Icon
                  classPrefix="imgIcon"
                  name={
                    isFinished
                      ? 'authentication-flag'
                      : 'not-authentication-flag'
                  }
                />
                <span>{isFinished ? '已设置' : '去设置'}</span>
              </div>
            </div>
          </div>
        );
        break;
      case 'firstTimeToInvest':
        body = (
          <div className="task-item-body">
            <div className="text-section">
              <div>开始第一笔投资</div>
              <div>
                获得<strong>12%</strong>年化收益
              </div>
              <div
                className={
                  'isFinish-flag ' + (isFinished ? 'success' : 'warning')
                }
              >
                <Icon
                  classPrefix="imgIcon"
                  name={
                    isFinished
                      ? 'authentication-flag'
                      : 'not-authentication-flag'
                  }
                />
                <span>{isFinished ? '已投资' : '去投资'}</span>
              </div>
            </div>
            <div className="img-section" onClick={null}>
              {isFinished ? (
                <img
                  src={require('../../img/badge_new.png')}
                  alt=""
                  className="bg-img"
                />
              ) : (
                <img
                  src={require('../../img/bg_lock.png')}
                  alt=""
                  className="bg-img"
                />
              )}
              {!isFinished ? (
                <img
                  src={require('../../img/pc_lock.png')}
                  alt=""
                  className={lockClasses}
                />
              ) : null}
            </div>
          </div>
        );
        break;
      default:
        break;
    }
    return body;
  },
  render() {
    let { isFirstNotFinished, taskName, isFinished, taskIndex } = this.props;

    return (
      <div className="task-item">
        {this._renderItemBody(isFirstNotFinished, taskName, isFinished)}
        {taskName !== 'firstTimeToInvest' ? (
          <div className="task-item-footer">
            <GuidePath
              direction={!!(taskIndex % 2) ? 'rtl' : 'ltr'}
              disable={!isFinished}
            />
          </div>
        ) : null}
      </div>
    );
  }
});

TaskItem.contextTypes = {
  router: React.PropTypes.object.isRequired
};

let NewbieGuide = React.createClass({
  getInitialState() {
    return NewbieGuideStore.getAll();
  },
  _handleNavClick() {
    this.context.router.push({
      pathname: 'home'
    });
  },
  render() {
    let taskItems = this.state.taskItems;
    let countOfFinishedTask = taskItems.filter(function(item, index) {
      return item.isFinished === true;
    });

    let backNav = {
      component: 'a',
      icon: 'left-nav',
      title: '返回'
    };

    return (
      <View>
        <NavBar
          title="新手指引"
          leftNav={[backNav]}
          amStyle="primary"
          onAction={this._handleNavClick}
        />
        <Container scrollable={true} id="newbieGuide">
          <div className="banner-bar">
            <img src={require('../../img/task_banner.png')} alt="" />
            <div className="dashboard">
              已解锁<strong>{countOfFinishedTask.length}</strong>关
              <Icon classPrefix="imgIcon" name="gold-coin2" />
            </div>
          </div>
          <div className="content-wrapper">
            {taskItems.map(function(item, index) {
              return (
                <TaskItem key={index + 1} {...item} taskIndex={index + 1} />
              );
            })}
          </div>
        </Container>
      </View>
    );
  },
  componentDidMount() {
    NewbieGuideAction.getInitialData();

    NewbieGuideStore.bind(
      'change',
      function() {
        this.setState(NewbieGuideStore.getAll());
      }.bind(this)
    );
  },
  componentWillMount() {
    NewbieGuideStore.clearAll();
  }
});

NewbieGuide.contextTypes = {
  router: React.PropTypes.object.isRequired
};

module.exports = NewbieGuide;

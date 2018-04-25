import React from 'react';
import classNames from 'classnames';
import ClassNameMixin from './mixins/ClassNameMixin';
import Button from './Button';
import ButtonGroup from './ButtonGroup';

import cookie from "../lib/cookie";

const Tabs = React.createClass({
  mixins: [ClassNameMixin],

  propTypes: {
    classPrefix: React.PropTypes.string,
    defaultActiveKey: React.PropTypes.any,
    onAction: React.PropTypes.func,
    isTabNavScrollable:React.PropTypes.bool
  },

  getDefaultProps() {
    return {
      classPrefix: 'tabs',
    };
  },

  getInitialState() {
    let defaultActiveKey = this.props.defaultActiveKey != null ?
      this.props.defaultActiveKey :
      this.getDefaultActiveKey(this.props.children);

    return {
      activeKey: defaultActiveKey,
      previousActiveKey: null
    };
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.activeKey != null &&
      nextProps.activeKey !== this.props.activeKey) {
      this.setState({
        previousActiveKey: this.props.activeKey
      });
    }
  },

  getDefaultActiveKey(children) {
    let defaultActiveKey = null;

    React.Children.forEach(children, function(child) {
      if (defaultActiveKey == null) {
        defaultActiveKey = child.props.eventKey;
      }
    });

    return defaultActiveKey !== undefined ? defaultActiveKey : 0;
  },

  handleClick(key, disabled, e) {
    e.preventDefault();
    let activeKey = this.state.activeKey;

    if (disabled) {
      return null;
    }

    if (this.props.onAction) {
      this.props.onAction(key);
    }

    if (activeKey !== key) {
      this.setState({
        activeKey: key,
        previousActiveKey: activeKey
      });
    }
  },

  renderNav() {
    let activeKey = this.state.activeKey;
    let isTabNavScrollable=this.props.isTabNavScrollable;

    let navs = React.Children.map(this.props.children, (child, index) => {
      let {
        eventKey,
        disabled,
        navSize,
        navStyle,
      } = child.props;
      let key = index;

      eventKey = eventKey !== undefined ? eventKey : index;
      let active = eventKey === activeKey;

      return (
        <Button
          ref={'tabNav' + key}
          key={key}
          onClick={this.handleClick.bind(this, key, disabled)}
          active={active}
          disabled={disabled}
          className={active ? 'active' : null}
          amSize={navSize || 'sm'}
          amStyle={navStyle || 'primary'}
          hollow
        >
          {child.props.title}
        </Button>
      );
    });

    let slideLineWidth,slideLineLeft;
    if(!isTabNavScrollable){//如果tabNav的模式的弹性调整的话，那么slideLineWidth，slideLineLeft的计算方式如下
      let childLength=React.Children.count(this.props.children);
      slideLineWidth=childLength > 1 ? (document.body.clientWidth - 2 *15) / childLength : 0;
      slideLineLeft=slideLineWidth * activeKey + 15;
    }else {
      slideLineWidth=100;//暂时将每个按钮的宽度硬编码为"100px"
      slideLineLeft=slideLineWidth * activeKey + 15;
    }

    //因为在IOS系统中，绝对定位元素会随着页面滚动而跑位，所以采取此退让的方案来解决这个兼容性问题
    var ua = navigator.userAgent;
    let isInIOS=!!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    let buttonGroupStyle={};
    if(isInIOS){
      buttonGroupStyle.position="relative";
      buttonGroupStyle.top=0;
    }


    let btnGroupClasses=classNames(this.prefixClass('nav'),{"btn-group-scrollable":isTabNavScrollable});
    return (
      <ButtonGroup
        className={btnGroupClasses}
        justify={isTabNavScrollable ?  false : true}
        style={buttonGroupStyle}
        >
        {navs}
        <span className="slide-line" style={{width:slideLineWidth,left:slideLineLeft}}></span>
      </ButtonGroup>
    )
  },

  renderTabPanels() {
    let activeKey = this.state.activeKey;
    let panels = React.Children.map(this.props.children, (child, index) => {
      let {
        eventKey,
        children,
        ...props
      } = child.props;

      if (eventKey === undefined) {
        eventKey = index;
      }

      return (
        <Tabs.Item
          active={eventKey === activeKey}
          enventKey={eventKey}
          key={'tabPanel' + index}
          {...props}
        >
          {children}
        </Tabs.Item>
      );
    });

    return (
      <div
        className={this.prefixClass('body')}
      >
        {panels}
      </div>
    );
  },

  _isInWebViewOfNTApp(){//检测当前web app的所处的环境是否是农泰金融的安卓或者ios客户端的webview。
    let deviceType=cookie.getCookie("deviceType");
    let isInAppWebview=["ntandroid","ntios"].indexOf(deviceType.toLowerCase()) > -1;
    return isInAppWebview;
  },

  render() {
    let classSet = this.getClassSet();
    let {
      className,
      ...props
    } = this.props;

    //因为在IOS系统中，绝对定位元素会随着页面滚动而跑位，所以采取此退让的方案来解决这个兼容性问题
    var ua = navigator.userAgent;
    let isInIOS=!!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    let tabStyle={};
    if(isInIOS){
      tabStyle.paddingTop=0;
    }


    return (
      <div
        {...props}
        className={classNames(classSet, className)}
        style={tabStyle}
      >
        {this.renderNav()}
        {this.renderTabPanels()}
      </div>
    );
  }
});

Tabs.Item = React.createClass({
  mixins: [ClassNameMixin],

  propTypes: {
    classPrefix: React.PropTypes.string,
    title: React.PropTypes.node,
    eventKey: React.PropTypes.any,
    disabled: React.PropTypes.bool,
    active: React.PropTypes.bool,
    noPadded: React.PropTypes.bool,
    navSize: React.PropTypes.string,
    navStyle: React.PropTypes.string,
  },

  getDefaultProps() {
    return {
      classPrefix: 'tab',
    };
  },

  render() {
    let classSet = this.getClassSet(true);
    let {
      className,
      children,
      noPadded,
      ...props
    } = this.props;
    const elementName = 'panel';

    classSet[this.prefixClass(elementName)] = true;
    classSet[this.prefixClass(`${elementName}-no-padded`)] = noPadded;

    return (
      <div
        {...props}
        className={classNames(classSet, className)}
      >
        {children}
      </div>
    );
  }
});

export default Tabs;

// TODO: Nav 的可定制性，如允许传入 Router 的 Link 组件

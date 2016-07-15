require("./src/scss/amazeui.touch.scss");
var cookie= require("./src/js/lib/cookie");
import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import {
  Router,
  Route,
  RouterContext,
  Link,
  hashHistory,
  IndexRoute,
  RouteContext
} from 'react-router';

import Container from "./src/js/UIComponents/Container";
import Group from "./src/js/UIComponents/Group";
import NavBar from "./src/js/UIComponents/NavBar";
import TabBar from "./src/js/UIComponents/TabBar";
import View from "./src/js/UIComponents/View";



import * as Pages from './src/js/pages/index';

// 解构赋值
let {
  Default,
  ...Components
  } = Pages;

//页面中文名字的映射
const pageNameMap={
    "Home":"首页",
    "ProductList":"理财",
    "MoreProductList":"更多理财产品",
    "UserHome":"用户中心",
    "GetBackPassword":"找回登录密码",
    "SetNewPassword":"设置登录密码",
    "EarnSetIntroduction.new_product":"新手标",
    "EarnSetIntroduction.ttz_product":"天天赚",
    "EarnSetIntroduction.yyz_product":"月月赚",
    "EarnSetIntroduction.jjz_product":"季季赚",
    "Payment.newbieLoan":"支付",
    "Payment.dailyEarn":"支付",
    "Payment.monthlyEarn":"支付",
    "Payment.quarterlyEarn":"支付",
    "PurchaseSuccess":"购买成功",
    "DailyEarnAppointment":"预约天天赚",
    "CouponList":"我的优惠券"
}

//不需要显示navBar的页面
let noNavBarPage=["Home","UserHome","Register","PurchaseSuccess","AppointmentSuccess"];

//需要显示tabBar的页面
let hasTabBarPage=["home","productList","userHome"];

//需要进行登录拦截的页面
let pagesNeedToIntercept=["DailyEarnAppointment","Payment"];

const App = React.createClass({
  render() {
    let {
      location,
      params,
      children,
      ...props
      } = this.props;
    let transition = children.props.transition || 'sfr';
    let tabBarClass= classNames({
        hide:hasTabBarPage.indexOf(params.componentName) > -1 ? false : true
    })

    return (
      <Container direction="column"  >
        <Container fill={true}>
          {React.cloneElement(children, {key: location.key,params:params,location:location})}
        </Container>

        <TabBar
          amStyle="primary"
          className={tabBarClass}
        >
          <TabBar.Item
            component={Link}
            title="首页"
            icon="star"
            selected={params.componentName === 'home'}
            to="/home"
          />
          <TabBar.Item
            component={Link}
            title="理财"
            icon="list"
            selected={params.componentName === 'productList'}
            to="/productList"
          />
          <TabBar.Item
            component={Link}
            icon="person"
            title="我的"
            selected={params.componentName === 'userHome'}
            to="/userHome"
          />
        </TabBar>
      </Container>
    );
  }
});


const Page = React.createClass({
  handleNavBack(item,event){
    event.preventDefault();
    window.history.back();
  },
  render() {
    let component = this.props.params.componentName;
    let queryStr=this.props.location.query.type;

    //找到对应的组件（也可以说页面）
    if (component) {
      component = component.charAt(0).toUpperCase() + component.slice(1);
    }
    let Component = Components[component] || NotFound;
    let key=queryStr ? component + "." + queryStr : component;

    let backNav = {
      component:"a",
      icon: 'left-nav',
      title: '返回'
    };

    //根据需要，不同的页面会显示或者不显示navBar
    let navBarClass=classNames({
      "hide":noNavBarPage.indexOf(component) > -1 ? true : false
    });

    return (
      <View>
        <NavBar
          title={pageNameMap[key]}
          leftNav={[backNav]}
          amStyle="primary"
          onAction={this.handleNavBack}
          className={navBarClass}
        />
        <Component scrollable  history={this.props.history} location={this.props.location}/>
      </View>
    );
  }
});


const NotFound = React.createClass({
    render() {
        return (
            <Group
                header="404"
            >
                <h2>Not found.</h2>
            </Group>
        );
    }
});


//在进入一些需要用户登录的页面前进行拦截.
function handleOnEnter(nextState, replace){
    let componentName=nextState.params.componentName;
    let pageName=componentName.charAt(0).toUpperCase() + componentName.slice(1);
    let isLoing=!!cookie.getCookie("token");
    console.log("isLoing:",isLoing);
    if(pagesNeedToIntercept.indexOf(pageName) > -1 && !isLoing){
        replace({
            pathname:"/"
        });
    }
}

const routes = (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <Route path=":componentName" component={Page}  onEnter={handleOnEnter}/>
      <IndexRoute component={Default} />
    </Route>
  </Router>
);

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(routes, document.getElementById('app-root'));
});

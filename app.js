require("./src/scss/amazeui.touch.scss");

import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import {
  Router,
  Route,
  Link,
  hashHistory,
  IndexRoute,
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
    "ProductList":"理财计划",
    "UserHome":"用户中心",
    "GetBackPassword":"找回登录密码"
}

//不需要显示navBar的页面
let noNavBarPage=["Home","UserHome"];
//需要显示tabBar的页面
let hasTabBarPage=["home","productList","userHome"];

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
        hide:hasTabBarPage.indexOf(params.componentName) > -1 ? false :true
    })

    return (
      <Container direction="column" id="sk-container" >
        <Container
          transition={transition}
        >
          {React.cloneElement(children, {key: location.key})}
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

    if (component) {
      component = component.charAt(0).toUpperCase() + component.slice(1);
    }

    let Component = Components[component] || NotFound;
    let backNav = {
      component:"a",
      icon: 'left-nav',
      title: '返回'
    };

    let navBarClass=classNames({
      "hide":noNavBarPage.indexOf(component) > -1 ? true : false
    });

    return (
      <View>
        <NavBar
          title={pageNameMap[component]}
          leftNav={[backNav]}
          amStyle="primary"
          onAction={this.handleNavBack}
          className={navBarClass}
        />
        <Component scrollable  />
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

const routes = (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <Route path=":componentName" component={Page} />
      <IndexRoute component={Default} />
    </Route>
  </Router>
);

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(routes, document.getElementById('sk-root'));
});

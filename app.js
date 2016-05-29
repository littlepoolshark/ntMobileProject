require("./src/scss/amazeui.touch.scss");
import React from 'react';
import ReactDOM from 'react-dom';
import {
  Router,
  Route,
  Link,
  hashHistory,
  IndexRoute,
} from 'react-router';

import Container from "./src/js/Container";
import Group from "./src/js/Group";
import NavBar from "./src/js/NavBar";
import TabBar from "./src/js/TabBar";
import View from "./src/js/View";


import * as Pages from './pages';

// 解构赋值
let {
  Default,
  ...Components
  } = Pages;

  console.log("Components:",Components);

const App = React.createClass({
  render() {
    let {
      location,
      params,
      children,
      ...props
      } = this.props;
    let transition = children.props.transition || 'sfr';

    return (
      <Container direction="column" id="sk-container">
        <Container
          transition={transition}
        >
          {React.cloneElement(children, {key: location.key})}
        </Container>

        <TabBar
          amStyle="primary"
        >
          <TabBar.Item
            component={Link}
            title="首页"
            selected={!params.component}
            to="/"
          />
          <TabBar.Item
            component={Link}
            title="理财"
            badge='β'
            selected={params.component === 'about'}
            to="/about"
          />
          <TabBar.Item
            component={Link}
            title="我的"
            selected={params.component === 'about'}
            to="/about"
          />
        </TabBar>
      </Container>
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

const Detail = React.createClass({
  render() {
    let component = this.props.params.component;

    if (component) {
      component = component.charAt(0).toUpperCase() + component.slice(1);
    }

    let Component = Components[component] || NotFound;
    let backNav = {
      component: Link,
      icon: 'left-nav',
      title: '返回',
      to: '/',
    };

    return (
      <View
        id="sk-detail"
      >
        <NavBar
          title={component}
          leftNav={[backNav]}
          amStyle="primary"
        />
        <Component scrollable className="sk-demos" />
      </View>
    );
  }
});

const routes = (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <Route path=":component" component={Detail} />
      <IndexRoute component={Default} />
    </Route>
  </Router>
);

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(routes, document.getElementById('sk-root'));
});

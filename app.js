require("./src/scss/amazeui.touch.scss");
var cookie = require("./src/js/lib/cookie");
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
import config from "./src/js/config";

// 解构赋值
let {
    Default,
    NotFound,
    ...Components
    } = Pages;


const App = React.createClass({
    render() {
        let {
            location,
            params,
            children,
            ...props
            } = this.props;
        let transition = children.props.transition || 'sfr';
        let currPageName;
        if (params.componentName) {
            currPageName = params.componentName.charAt(0).toUpperCase() + params.componentName.slice(1);
        }

        let tabBarClass = classNames({
            hide: config.hasTabBarPages.indexOf(currPageName) > -1 ? false : true
        });

        return (
            <Container direction="column">
                <Container fill={true}>
                    {React.cloneElement(children, {key: location.key, params: params, location: location})}
                </Container>

                <TabBar
                    amStyle="white"
                    className={tabBarClass}
                >
                    <TabBar.Item
                        component={Link}
                        title="首页"
                        iconClassPrefix="imgIcon"
                        icon="home"
                        selectedIcon="home_active"
                        selected={params.componentName === 'home'}
                        to="/home"
                    />
                    <TabBar.Item
                        component={Link}
                        title="理财"
                        iconClassPrefix="imgIcon"
                        icon="financial-pig"
                        selectedIcon="financial-pig_active"
                        selected={params.componentName === 'productList'}
                        to="/productList"
                    />
                    <TabBar.Item
                        component={Link}
                        iconClassPrefix="imgIcon"
                        icon="person"
                        selectedIcon="person_active"
                        title="我的"
                        selected={params.componentName === 'userHome'}
                        to="/userHome"
                    />
                </TabBar>
            </Container>
        );
    },
    componentDidMount(){
        //这段代码，通过粗暴地禁用滑动事件来防止页面在微信浏览器下面的过度滑动（overscroll）
       /* document.querySelector("body").addEventListener("touchmove",function(event){
            event.preventDefault();
        });*/
    }
});


const Page = React.createClass({
    handleNavBack(item, event){
        event.preventDefault();
        window.history.back();
    },
    render() {
        let component = this.props.params.componentName;
        let queryStr = this.props.location.query.type;

        //找到对应的组件（也可以说页面）
        if (component) {
            component = component.charAt(0).toUpperCase() + component.slice(1);
        }
        let Component = Components[component] || NotFound;
        // 赚系列的页面名字的key使用命名空间来映射
        let key = (component === "EarnSetIntroduction" && queryStr   ) ? component + "." + queryStr : component;

        let backNav = {
            component: "a",
            icon: 'left-nav',
            title: '返回'
        };

        //根据需要，不同的页面会显示或者不显示navBar
        let navBarClass = classNames({
            "hide": config.noNavBarPages.indexOf(component) > -1 ? true : false
        });

        return (
            <View>
                <NavBar
                    title={config.pageNameMap[key]}
                    leftNav={[backNav]}
                    amStyle="primary"
                    onAction={this.handleNavBack}
                    className={navBarClass}
                />
                <Component scrollable history={this.props.history} location={this.props.location}/>
            </View>
        );
    }
});


//在进入一些需要用户登录的页面前进行拦截.
function handleOnEnter(nextState, replace) {
    let componentName = nextState.params.componentName;
    let pageName = componentName.charAt(0).toUpperCase() + componentName.slice(1);
    let isLoing = !!cookie.getCookie("token");
    if (config.needToInterceptPages.indexOf(pageName) > -1 && !isLoing) {
        replace({
            pathname: "/"
        });
    }
}

const routes = (
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <Route path=":componentName" component={Page} onEnter={handleOnEnter}/>
            <IndexRoute component={Default}/>
        </Route>
    </Router>
);


document.addEventListener('DOMContentLoaded', function () {
    ReactDOM.render(routes, document.getElementById('app-root'));
});

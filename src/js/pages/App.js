require("../../scss/amazeui.touch.scss");
import React from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';

// ui component
import Container from "../UIComponents/Container";
import Group from "../UIComponents/Group";
import NavBar from "../UIComponents/NavBar";
import TabBar from "../UIComponents/TabBar";
import View from "../UIComponents/View";

import config from "../config";


const App = React.createClass({
    _handleNavBack(item,event){
        event.preventDefault();
        window.history.back();
    },
    render() {
        let {
            location,
            params,
            children,
            history,
            ...props
            } = this.props;
        let transition = children.props.transition || 'sfr';
        let pathname=location.pathname;
        let currPageName;
        if(pathname !== "/"){
            pathname=pathname.indexOf("/") > -1 ? pathname.slice(1) : pathname;
            currPageName=pathname.charAt(0).toUpperCase() + pathname.slice(1);
        }else {
            currPageName=pathname;
        }

        let tabBarClass= classNames({
            hide:config.hasTabBarPages.indexOf(currPageName) > -1 ? false : true
        });
        //根据需要，不同的页面会显示或者不显示navBar
        let navBarClass=classNames({
            "hide":config.noNavBarPages.indexOf(currPageName) > -1 ? true : false
        });
        let backNav = {
            component:"a",
            icon: 'left-nav',
            title: '返回'
        };

        // 赚系列的页面名字的key使用命名空间来映射
        let queryStr=location.query.type;
        let key=(currPageName === "EarnSetIntroduction" && queryStr   )? currPageName + "." + queryStr : currPageName;


        return (
            <Container direction="column"  >
                <Container fill={true}>
                    <View>
                        <NavBar
                            title={config.pageNameMap[key]}
                            leftNav={[backNav]}
                            amStyle="primary"
                            onAction={this._handleNavBack}
                            className={navBarClass}
                        />
                        {React.cloneElement(children, {key: location.key,params:params,location:location,history:history})}
                    </View>
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
                        selected={currPageName === 'Home'}
                        to="/home"
                    />
                    <TabBar.Item
                        component={Link}
                        title="理财"
                        iconClassPrefix="imgIcon"
                        icon="financial-pig"
                        selectedIcon="financial-pig_active"
                        selected={currPageName === 'ProductList'}
                        to="/productList"
                    />
                    <TabBar.Item
                        component={Link}
                        iconClassPrefix="imgIcon"
                        icon="person"
                        selectedIcon="person_active"
                        title="我的"
                        selected={currPageName === 'UserHome'}
                        to="/userHome"
                    />
                </TabBar>
            </Container>
        );
    }
});

module.exports=App;
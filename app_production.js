import React from 'react';
import ReactDOM from 'react-dom';
import { Router, hashHistory } from 'react-router';


const PAGE_BASIC_PATH="./src/js/pages/";

const rootRoute = {
    childRoutes: [ {
        path: '/',
        component: require(PAGE_BASIC_PATH+"App"),
        indexRoute: { component:require(PAGE_BASIC_PATH+"Default")},
        childRoutes: [
            {
                path: 'home',
                getComponent(nextState, cb) {
                    require.ensure([], (require) => {
                        cb(null, require(PAGE_BASIC_PATH+"Home"));
                    })
                }
            },
            {
                path: 'productList',
                getComponent(nextState, cb) {
                    require.ensure([], (require) => {
                        cb(null, require(PAGE_BASIC_PATH+"ProductList"));
                    })
                }
            },
            {
                path: 'moreProductList',
                getComponent(nextState, cb) {
                    require.ensure([], (require) => {
                        cb(null, require(PAGE_BASIC_PATH+"MoreProductList"));
                    })
                }
            },
            {
                path: 'userHome',
                getComponent(nextState, cb) {
                    require.ensure([], (require) => {
                        cb(null, require(PAGE_BASIC_PATH+"UserHome"));
                    })
                }
            },
            {
                path: 'getBackPassword',
                getComponent(nextState, cb) {
                    require.ensure([], (require) => {
                        cb(null, require(PAGE_BASIC_PATH+"GetBackPassword"));
                    })
                }
            },
            {
                path: 'setNewPassword',
                getComponent(nextState, cb) {
                    require.ensure([], (require) => {
                        cb(null, require(PAGE_BASIC_PATH+"SetNewPassword"));
                    })
                }
            },
            {
                path: 'register',
                getComponent(nextState, cb) {
                    require.ensure([], (require) => {
                        cb(null, require(PAGE_BASIC_PATH+"Register"));
                    })
                }
            },
            {
                path: 'earnSetIntroduction',
                getComponent(nextState, cb) {
                    require.ensure([], (require) => {
                        cb(null, require(PAGE_BASIC_PATH+"EarnSetIntroduction"));
                    })
                }
            },
            {
                path: 'fixedLoanIntroduction',
                getComponent(nextState, cb) {
                    require.ensure([], (require) => {
                        cb(null, require(PAGE_BASIC_PATH+"FixedLoanIntroduction"));
                    })
                }
            },
            {
                path: 'creditorLoanIntroduction',
                getComponent(nextState, cb) {
                    require.ensure([], (require) => {
                        cb(null, require(PAGE_BASIC_PATH+"CreditorLoanIntroduction"));
                    })
                }
            },
            {
                path: 'payment',
                getComponent(nextState, cb) {
                    require.ensure([], (require) => {
                        cb(null, require(PAGE_BASIC_PATH+"Payment"));
                    })
                }
            },
            {
                path: 'purchaseSuccess',
                getComponent(nextState, cb) {
                    require.ensure([], (require) => {
                        cb(null, require(PAGE_BASIC_PATH+"PurchaseSuccess"));
                    })
                }
            },
            {
                path: 'appointmentSuccess',
                getComponent(nextState, cb) {
                    require.ensure([], (require) => {
                        cb(null, require(PAGE_BASIC_PATH+"AppointmentSuccess"));
                    })
                }
            },
            {
                path: 'dailyEarnAppointment',
                getComponent(nextState, cb) {
                    require.ensure([], (require) => {
                        cb(null, require(PAGE_BASIC_PATH+"DailyEarnAppointment"));
                    })
                }
            },
            {
                path: 'couponList',
                getComponent(nextState, cb) {
                    require.ensure([], (require) => {
                        cb(null, require(PAGE_BASIC_PATH+"CouponList"));
                    })
                }
            },
            {
                path:"*",
                getComponent(nextState, cb) {
                    require.ensure([], (require) => {
                        cb(null, require(PAGE_BASIC_PATH+"NotFound"));
                    })
                }
            }
        ]
    } ]
};

document.addEventListener('DOMContentLoaded', function() {
    ReactDOM.render(
        <Router
        history={hashHistory}
        routes={rootRoute}
    />, document.getElementById('app-root'));
});
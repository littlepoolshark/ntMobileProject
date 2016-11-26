import React from 'react';
import ReactDOM from 'react-dom';
import { Router, hashHistory } from 'react-router';
import cookie from "./src/js/lib/cookie";


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
                },
                onEnter(nextState,replace,callback){
                    let isLogin=!!cookie.getCookie("token");
                    if(!isLogin){
                        replace("/");
                    }
                    callback();
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
                path: 'messageList',
                getComponent(nextState, cb) {
                    require.ensure([], (require) => {
                        cb(null, require(PAGE_BASIC_PATH+"MessageList"));
                    })
                }
            },
            {
                path: 'recharge',
                getComponent(nextState, cb) {
                    require.ensure([], (require) => {
                        cb(null, require(PAGE_BASIC_PATH+"Recharge"));
                    })
                }
            },
            {
                path: 'bindBankCard',
                getComponent(nextState, cb) {
                    require.ensure([], (require) => {
                        cb(null, require(PAGE_BASIC_PATH+"BindBankCard"));
                    })
                }
            },
            {
                path: 'bankCardList',
                getComponent(nextState, cb) {
                    require.ensure([], (require) => {
                        cb(null, require(PAGE_BASIC_PATH+"BankCardList"));
                    })
                }
            },
            {
                path: 'realNameAuthentication',
                getComponent(nextState, cb) {
                    require.ensure([], (require) => {
                        cb(null, require(PAGE_BASIC_PATH+"RealNameAuthentication"));
                    })
                }
            },
            {
                path: 'Withdraw',
                getComponent(nextState, cb) {
                    require.ensure([], (require) => {
                        cb(null, require(PAGE_BASIC_PATH+"Withdraw"));
                    })
                }
            },
            {
                path: 'getBackDealPassword',
                getComponent(nextState, cb) {
                    require.ensure([], (require) => {
                        cb(null, require(PAGE_BASIC_PATH+"GetBackDealPassword"));
                    })
                }
            },
            {
                path: 'journalAccount',
                getComponent(nextState, cb) {
                    require.ensure([], (require) => {
                        cb(null, require(PAGE_BASIC_PATH+"JournalAccount"));
                    })
                }
            },
            {
                path: 'inviteReward',
                getComponent(nextState, cb) {
                    require.ensure([], (require) => {
                        cb(null, require(PAGE_BASIC_PATH+"InviteReward"));
                    })
                }
            },
            {
                path: 'rewardDetailList',
                getComponent(nextState, cb) {
                    require.ensure([], (require) => {
                        cb(null, require(PAGE_BASIC_PATH+"RewardDetailList"));
                    })
                }
            },
            {
                path: 'inviteMyFriend',
                getComponent(nextState, cb) {
                    require.ensure([], (require) => {
                        cb(null, require(PAGE_BASIC_PATH+"InviteMyFriend"));
                    })
                }
            },
            {
                path: 'my2DCode',
                getComponent(nextState, cb) {
                    require.ensure([], (require) => {
                        cb(null, require(PAGE_BASIC_PATH+"My2DCode"));
                    })
                }
            },
            {
                path: 'appSetting',
                getComponent(nextState, cb) {
                    require.ensure([], (require) => {
                        cb(null, require(PAGE_BASIC_PATH+"AppSetting"));
                    })
                }
            },
            {
                path: 'myBankCard',
                getComponent(nextState, cb) {
                    require.ensure([], (require) => {
                        cb(null, require(PAGE_BASIC_PATH+"MyBankCard"));
                    })
                }
            },
            {
                path: 'deleteBankCardConfirm',
                getComponent(nextState, cb) {
                    require.ensure([], (require) => {
                        cb(null, require(PAGE_BASIC_PATH+"DeleteBankCardConfirm"));
                    })
                }
            },
            {
                path: 'deleteCardApplySuccess',
                getComponent(nextState, cb) {
                    require.ensure([], (require) => {
                        cb(null, require(PAGE_BASIC_PATH+"DeleteCardApplySuccess"));
                    })
                }
            },
            {
                path: 'myBankCardDetail',
                getComponent(nextState, cb) {
                    require.ensure([], (require) => {
                        cb(null, require(PAGE_BASIC_PATH+"MyBankCardDetail"));
                    })
                }
            },
            {
                path: 'securityCenter',
                getComponent(nextState, cb) {
                    require.ensure([], (require) => {
                        cb(null, require(PAGE_BASIC_PATH+"SecurityCenter"));
                    })
                }
            },
            {
                path: 'setDealPassword',
                getComponent(nextState, cb) {
                    require.ensure([], (require) => {
                        cb(null, require(PAGE_BASIC_PATH+"SetDealPassword"));
                    })
                }
            },
            {
                path: 'totalAccountDetail',
                getComponent(nextState, cb) {
                    require.ensure([], (require) => {
                        cb(null, require(PAGE_BASIC_PATH+"TotalAccountDetail"));
                    })
                }
            },
            {
                path: 'dailyEarnCenter',
                getComponent(nextState, cb) {
                    require.ensure([], (require) => {
                        cb(null, require(PAGE_BASIC_PATH+"DailyEarnCenter"));
                    })
                }
            },
            {
                path: 'dailyEarnRollOut',
                getComponent(nextState, cb) {
                    require.ensure([], (require) => {
                        cb(null, require(PAGE_BASIC_PATH+"DailyEarnRollOut"));
                    })
                }
            },
            {
                path: 'dailyEarnRollOutSuccess',
                getComponent(nextState, cb) {
                    require.ensure([], (require) => {
                        cb(null, require(PAGE_BASIC_PATH+"DailyEarnRollOutSuccess"));
                    })
                }
            },
            {
                path: 'dailyEarnInvestmentRecord',
                getComponent(nextState, cb) {
                    require.ensure([], (require) => {
                        cb(null, require(PAGE_BASIC_PATH+"DailyEarnInvestmentRecord"));
                    })
                }
            },
            {
                path: 'repaymentCalendar',
                getComponent(nextState, cb) {
                    require.ensure([], (require) => {
                        cb(null, require(PAGE_BASIC_PATH+"RepaymentCalendar"));
                    })
                }
            },
            {
                path: 'fixedLoanCenter',
                getComponent(nextState, cb) {
                    require.ensure([], (require) => {
                        cb(null, require(PAGE_BASIC_PATH+"FixedLoanCenter"));
                    })
                }
            },
            {
                path: 'earnSetInvestmentRecord',
                getComponent(nextState, cb) {
                    require.ensure([], (require) => {
                        cb(null, require(PAGE_BASIC_PATH+"EarnSetInvestmentRecord"));
                    })
                }
            },
            {
                path: 'fixedLoanInvestmentRecord',
                getComponent(nextState, cb) {
                    require.ensure([], (require) => {
                        cb(null, require(PAGE_BASIC_PATH+"FixedLoanInvestmentRecord"));
                    })
                }
            },
            {
                path: 'creditorLoanInvestmentRecord',
                getComponent(nextState, cb) {
                    require.ensure([], (require) => {
                        cb(null, require(PAGE_BASIC_PATH+"CreditorLoanInvestmentRecord"));
                    })
                }
            },
            {
                path: 'repaymentSchedule',
                getComponent(nextState, cb) {
                    require.ensure([], (require) => {
                        cb(null, require(PAGE_BASIC_PATH+"RepaymentSchedule"));
                    })
                }
            },
            {
                path: 'assignmentOfDebt',
                getComponent(nextState, cb) {
                    require.ensure([], (require) => {
                        cb(null, require(PAGE_BASIC_PATH+"AssignmentOfDebt"));
                    })
                }
            },
            {
                path: 'assignmentDebtSuccess',
                getComponent(nextState, cb) {
                    require.ensure([], (require) => {
                        cb(null, require(PAGE_BASIC_PATH+"AssignmentDebtSuccess"));
                    })
                }
            },
            {
                path: 'newbieGuide',
                getComponent(nextState, cb) {
                    require.ensure([], (require) => {
                        cb(null, require(PAGE_BASIC_PATH+"NewbieGuide"));
                    })
                }
            },
            {
                path: 'serviceAgreement_register',
                getComponent(nextState, cb) {
                    require.ensure([], (require) => {
                        cb(null, require(PAGE_BASIC_PATH+"ServiceAgreement_register"));
                    })
                }
            },
            {
                path: 'serviceAgreement_new_product',
                getComponent(nextState, cb) {
                    require.ensure([], (require) => {
                        cb(null, require(PAGE_BASIC_PATH+"ServiceAgreement_new_product"));
                    })
                }
            },
            {
                path: 'serviceAgreement_ttz_product',
                getComponent(nextState, cb) {
                    require.ensure([], (require) => {
                        cb(null, require(PAGE_BASIC_PATH+"ServiceAgreement_ttz_product"));
                    })
                }
            },
            {
                path: 'serviceAgreement_yyz_product',
                getComponent(nextState, cb) {
                    require.ensure([], (require) => {
                        cb(null, require(PAGE_BASIC_PATH+"ServiceAgreement_yyz_product"));
                    })
                }
            },
            {
                path: 'serviceAgreement_jjz_product',
                getComponent(nextState, cb) {
                    require.ensure([], (require) => {
                        cb(null, require(PAGE_BASIC_PATH+"ServiceAgreement_jjz_product"));
                    })
                }
            },
            {
                path: 'serviceAgreement_loan_product',
                getComponent(nextState, cb) {
                    require.ensure([], (require) => {
                        cb(null, require(PAGE_BASIC_PATH+"ServiceAgreement_loan_product"));
                    })
                }
            },
            {
                path: 'serviceAgreement_creditor_product',
                getComponent(nextState, cb) {
                    require.ensure([], (require) => {
                        cb(null, require(PAGE_BASIC_PATH+"ServiceAgreement_creditor_product"));
                    })
                }
            },
            {
                path: 'aboutUs',
                getComponent(nextState, cb) {
                    require.ensure([], (require) => {
                        cb(null, require(PAGE_BASIC_PATH+"AboutUs"));
                    })
                }
            },
            {
                path: 'bannerPageWrapper',
                getComponent(nextState, cb) {
                    require.ensure([], (require) => {
                        cb(null, require(PAGE_BASIC_PATH+"BannerPageWrapper"));
                    })
                }
            },
            {
                path: 'zhongJinShortcutPay',
                getComponent(nextState, cb) {
                    require.ensure([], (require) => {
                        cb(null, require(PAGE_BASIC_PATH+"ZhongJinShortcutPay"));
                    })
                }
            },
            {
                path: 'openZhongJinShortcut',
                getComponent(nextState, cb) {
                    require.ensure([], (require) => {
                        cb(null, require(PAGE_BASIC_PATH+"OpenZhongJinShortcut"));
                    })
                }
            },
            {
                path: 'registerToZXBank',
                getComponent(nextState, cb) {
                    require.ensure([], (require) => {
                        cb(null, require(PAGE_BASIC_PATH+"RegisterToZXBank"));
                    })
                }
            },
            {
                path: 'double11',
                getComponent(nextState, cb) {
                    require.ensure([], (require) => {
                        cb(null, require(PAGE_BASIC_PATH+"specialActivity/Double11"));
                    })
                }
            },
            {
                path: 'openZXIntroduction',
                getComponent(nextState, cb) {
                    require.ensure([], (require) => {
                        cb(null, require(PAGE_BASIC_PATH+"specialActivity/OpenZXIntroduction"));
                    })
                }
            },
            {
                path: 'registerToZXFailedHint',
                getComponent(nextState, cb) {
                    require.ensure([], (require) => {
                        cb(null, require(PAGE_BASIC_PATH+"RegisterToZXFailedHint"));
                    })
                }
            },
            {
                path: 'registerToZXFailedHint',
                getComponent(nextState, cb) {
                    require.ensure([], (require) => {
                        cb(null, require(PAGE_BASIC_PATH+"RegisterToZXFailedHint"));
                    })
                }
            },
            {
                path: 'registerGuide',
                getComponent(nextState, cb) {
                    require.ensure([], (require) => {
                        cb(null, require(PAGE_BASIC_PATH+"RegisterGuide"));
                    })
                }
            },
            {
                path: 'verifyCodeForRegisterGuide',
                getComponent(nextState, cb) {
                    require.ensure([], (require) => {
                        cb(null, require(PAGE_BASIC_PATH+"VerifyCodeForRegisterGuide"));
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
        onError={function(err){console.error("error about react-router happen,error message:",err)}}
    />, document.getElementById('app-root'));
});
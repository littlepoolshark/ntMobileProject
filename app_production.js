import React from 'react';
import ReactDOM from 'react-dom';
import { Router, hashHistory } from 'react-router';
import cookie from './src/js/lib/cookie';

// 在webpack编译过程中，会静态地解析require.ensure中的模块，并将其添加到一个单独的chunk中，从而实现代码的按需加载。
// 语法如下：
// require.ensure(dependencies: String[], callback: function(require), errorCallback: function(error), chunkName: String)
// 例子如下：
// childRoutes : {
//     path: 'home',
//     getComponent(nextState, cb) {
//         require.ensure([], (require) => {
//             cb(null, require(PAGE_BASIC_PATH + "Home"));
//         },"home")
//     }
// }

const PAGE_BASIC_PATH = './src/js/pages/';
const rootRoute = {
  childRoutes: [
    {
      path: '/',
      component: require(PAGE_BASIC_PATH + 'App'),
      indexRoute: { component: require(PAGE_BASIC_PATH + 'Default') },
      childRoutes: [
        {
          path: 'home',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require(PAGE_BASIC_PATH + 'Home'));
            });
          }
        },
        {
          path: 'productList',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require(PAGE_BASIC_PATH + 'ProductList'));
            });
          }
        },
        {
          path: 'moreProductList',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require(PAGE_BASIC_PATH + 'MoreProductList'));
            });
          }
        },
        {
          path: 'userHome',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require(PAGE_BASIC_PATH + 'UserHome'));
            });
          },
          onEnter(nextState, replace, callback) {
            let isLogin = !!cookie.getCookie('token');
            if (!isLogin) {
              replace('/');
            }
            callback();
          }
        },
        {
          path: 'getBackPassword',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require(PAGE_BASIC_PATH + 'GetBackPassword'));
            });
          }
        },
        {
          path: 'setNewPassword',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require(PAGE_BASIC_PATH + 'SetNewPassword'));
            });
          }
        },
        {
          path: 'register',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require(PAGE_BASIC_PATH + 'Register'));
            });
          }
        },
        {
          path: 'earnSetIntroduction',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require(PAGE_BASIC_PATH + 'EarnSetIntroduction'));
            });
          }
        },
        {
          path: 'fixedLoanIntroduction',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require(PAGE_BASIC_PATH + 'FixedLoanIntroduction'));
            });
          }
        },
        {
          path: 'creditorLoanIntroduction',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require(PAGE_BASIC_PATH + 'CreditorLoanIntroduction'));
            });
          }
        },
        {
          path: 'payment',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require(PAGE_BASIC_PATH + 'Payment'));
            });
          }
        },
        {
          path: 'purchaseSuccess',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require(PAGE_BASIC_PATH + 'PurchaseSuccess'));
            });
          }
        },
        {
          path: 'appointmentSuccess',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require(PAGE_BASIC_PATH + 'AppointmentSuccess'));
            });
          }
        },
        {
          path: 'dailyEarnAppointment',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require(PAGE_BASIC_PATH + 'DailyEarnAppointment'));
            });
          }
        },
        {
          path: 'couponList',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require(PAGE_BASIC_PATH + 'CouponList'));
            });
          }
        },
        {
          path: 'messageList',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require(PAGE_BASIC_PATH + 'MessageList'));
            });
          }
        },
        {
          path: 'recharge',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require(PAGE_BASIC_PATH + 'Recharge'));
            });
          }
        },
        {
          path: 'bindBankCard',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require(PAGE_BASIC_PATH + 'BindBankCard'));
            });
          }
        },
        {
          path: 'bankCardList',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require(PAGE_BASIC_PATH + 'BankCardList'));
            });
          }
        },
        {
          path: 'realNameAuthentication',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require(PAGE_BASIC_PATH + 'RealNameAuthentication'));
            });
          }
        },
        {
          path: 'Withdraw',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require(PAGE_BASIC_PATH + 'Withdraw'));
            });
          }
        },
        {
          path: 'getBackDealPassword',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require(PAGE_BASIC_PATH + 'GetBackDealPassword'));
            });
          }
        },
        {
          path: 'journalAccount',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require(PAGE_BASIC_PATH + 'JournalAccount'));
            });
          }
        },
        {
          path: 'inviteReward',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require(PAGE_BASIC_PATH + 'InviteReward'));
            });
          }
        },
        {
          path: 'rewardDetailList',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require(PAGE_BASIC_PATH + 'RewardDetailList'));
            });
          }
        },
        {
          path: 'inviteMyFriend',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require(PAGE_BASIC_PATH + 'InviteMyFriend'));
            });
          }
        },
        {
          path: 'my2DCode',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require(PAGE_BASIC_PATH + 'My2DCode'));
            });
          }
        },
        {
          path: 'appSetting',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require(PAGE_BASIC_PATH + 'AppSetting'));
            });
          }
        },
        {
          path: 'myBankCard',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require(PAGE_BASIC_PATH + 'MyBankCard'));
            });
          }
        },
        {
          path: 'deleteBankCardConfirm',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require(PAGE_BASIC_PATH + 'DeleteBankCardConfirm'));
            });
          }
        },
        {
          path: 'deleteCardApplySuccess',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require(PAGE_BASIC_PATH + 'DeleteCardApplySuccess'));
            });
          }
        },
        {
          path: 'myBankCardDetail',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require(PAGE_BASIC_PATH + 'MyBankCardDetail'));
            });
          }
        },
        {
          path: 'securityCenter',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require(PAGE_BASIC_PATH + 'SecurityCenter'));
            });
          }
        },
        {
          path: 'setDealPassword',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require(PAGE_BASIC_PATH + 'SetDealPassword'));
            });
          }
        },
        {
          path: 'totalAccountDetail',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require(PAGE_BASIC_PATH + 'TotalAccountDetail'));
            });
          }
        },
        {
          path: 'dailyEarnCenter',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require(PAGE_BASIC_PATH + 'DailyEarnCenter'));
            });
          }
        },
        {
          path: 'dailyEarnRollOut',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require(PAGE_BASIC_PATH + 'DailyEarnRollOut'));
            });
          }
        },
        {
          path: 'dailyEarnRollOutSuccess',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require(PAGE_BASIC_PATH + 'DailyEarnRollOutSuccess'));
            });
          }
        },
        {
          path: 'dailyEarnInvestmentRecord',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require(PAGE_BASIC_PATH + 'DailyEarnInvestmentRecord'));
            });
          }
        },
        {
          path: 'repaymentCalendar',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require(PAGE_BASIC_PATH + 'RepaymentCalendar'));
            });
          }
        },
        {
          path: 'fixedLoanCenter',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require(PAGE_BASIC_PATH + 'FixedLoanCenter'));
            });
          }
        },
        {
          path: 'earnSetInvestmentRecord',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require(PAGE_BASIC_PATH + 'EarnSetInvestmentRecord'));
            });
          }
        },
        {
          path: 'fixedLoanInvestmentRecord',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require(PAGE_BASIC_PATH + 'FixedLoanInvestmentRecord'));
            });
          }
        },
        {
          path: 'creditorLoanInvestmentRecord',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(
                null,
                require(PAGE_BASIC_PATH + 'CreditorLoanInvestmentRecord')
              );
            });
          }
        },
        {
          path: 'repaymentSchedule',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require(PAGE_BASIC_PATH + 'RepaymentSchedule'));
            });
          }
        },
        {
          path: 'assignmentOfDebt',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require(PAGE_BASIC_PATH + 'AssignmentOfDebt'));
            });
          }
        },
        {
          path: 'assignmentDebtSuccess',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require(PAGE_BASIC_PATH + 'AssignmentDebtSuccess'));
            });
          }
        },
        {
          path: 'newbieGuide',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require(PAGE_BASIC_PATH + 'NewbieGuide'));
            });
          }
        },
        {
          path: 'serviceAgreement_register',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require(PAGE_BASIC_PATH + 'ServiceAgreement_register'));
            });
          }
        },
        {
          path: 'serviceAgreement_new_product',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(
                null,
                require(PAGE_BASIC_PATH + 'ServiceAgreement_new_product')
              );
            });
          }
        },
        {
          path: 'serviceAgreement_ttz_product',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(
                null,
                require(PAGE_BASIC_PATH + 'ServiceAgreement_ttz_product')
              );
            });
          }
        },
        {
          path: 'serviceAgreement_yyz_product',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(
                null,
                require(PAGE_BASIC_PATH + 'ServiceAgreement_yyz_product')
              );
            });
          }
        },
        {
          path: 'serviceAgreement_jjz_product',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(
                null,
                require(PAGE_BASIC_PATH + 'ServiceAgreement_jjz_product')
              );
            });
          }
        },
        {
          path: 'serviceAgreement_loan_product',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(
                null,
                require(PAGE_BASIC_PATH + 'ServiceAgreement_loan_product')
              );
            });
          },
          onEnter(nextState, replace, callback) {
            let isLogin = !!cookie.getCookie('token');
            if (!isLogin) {
              replace('/?beforeComponent=serviceAgreement_loan_product');
            }
            callback();
          }
        },
        {
          path: 'serviceAgreement_creditor_product',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(
                null,
                require(PAGE_BASIC_PATH + 'ServiceAgreement_creditor_product')
              );
            });
          },
          onEnter(nextState, replace, callback) {
            let isLogin = !!cookie.getCookie('token');
            if (!isLogin) {
              replace('/?beforeComponent=serviceAgreement_creditor_product');
            }
            callback();
          }
        },
        {
          path: 'serviceAgreement_moon',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require(PAGE_BASIC_PATH + 'ServiceAgreement_moon'));
            });
          }
        },
        {
          path: 'serviceAgreement_rich',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require(PAGE_BASIC_PATH + 'ServiceAgreement_rich'));
            });
          }
        },
        {
          path: 'aboutUs',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require(PAGE_BASIC_PATH + 'AboutUs'));
            });
          }
        },
        {
          path: 'bannerPageWrapper',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require(PAGE_BASIC_PATH + 'BannerPageWrapper'));
            });
          }
        },
        {
          path: 'zhongJinShortcutPay',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require(PAGE_BASIC_PATH + 'ZhongJinShortcutPay'));
            });
          }
        },
        {
          path: 'openZhongJinShortcut',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require(PAGE_BASIC_PATH + 'OpenZhongJinShortcut'));
            });
          }
        },
        {
          path: 'registerToZXBank',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require(PAGE_BASIC_PATH + 'RegisterToZXBank'));
            });
          }
        },
        /*    {
                    path: 'double11',
                    getComponent(nextState, cb) {
                        require.ensure([], (require) => {
                            cb(null, require(PAGE_BASIC_PATH+"specialActivity/Double11"));
                        })
                    }
                },*/
        {
          path: 'openZXIntroduction',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(
                null,
                require(PAGE_BASIC_PATH + 'specialActivity/OpenZXIntroduction')
              );
            });
          }
        },
        {
          path: 'registerToZXFailedHint',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require(PAGE_BASIC_PATH + 'RegisterToZXFailedHint'));
            });
          }
        },
        {
          path: 'registerToZXSuccessHint',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require(PAGE_BASIC_PATH + 'RegisterToZXSuccessHint'));
            });
          }
        },
        {
          path: 'registerGuide',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require(PAGE_BASIC_PATH + 'RegisterGuide'));
            });
          }
        },
        {
          path: 'verifyCodeForRegisterGuide',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require(PAGE_BASIC_PATH + 'VerifyCodeForRegisterGuide'));
            });
          }
        },
        /* {
                 path: 'anniversaryCelebration',
                 getComponent(nextState, cb) {
                     require.ensure([], (require) => {
                         cb(null, require(PAGE_BASIC_PATH+"specialActivity/AnniversaryCelebration_index"));
                     })
                 }
             },*/
        /*    {
                    path: 'anniversaryCelebration_fruitStory',
                    getComponent(nextState, cb) {
                        require.ensure([], (require) => {
                            cb(null, require(PAGE_BASIC_PATH+"specialActivity/AnniversaryCelebration_fruitStory"));
                        })
                    }
                },*/
        {
          path: 'skipRegisteringZX',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require(PAGE_BASIC_PATH + 'SkipRegisteringZX'));
            });
          }
        },
        /*    {//因为这个专题页已经下架了，所以就不打包了
                    path: 'newYearCelebration',
                    getComponent(nextState, cb) {
                        require.ensure([], (require) => {
                            cb(null, require(PAGE_BASIC_PATH+"specialActivity/NewYearCelebration"));
                        })
                    }
                },*/
        {
          path: 'platformData',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require(PAGE_BASIC_PATH + 'PlatformData'));
            });
          }
        },
        {
          path: 'securityIntroduction',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require(PAGE_BASIC_PATH + 'SecurityIntroduction'));
            });
          }
        },
        {
          path: 'userStoryList',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require(PAGE_BASIC_PATH + 'UserStoryList'));
            });
          }
        },
        {
          path: 'serviceAgreement_risk_announce',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(
                null,
                require(PAGE_BASIC_PATH + 'ServiceAgreement_risk_announce')
              );
            });
          }
        },
        {
          path: 'sendRedPackage',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(
                null,
                require(PAGE_BASIC_PATH + 'specialActivity/SendRedPackage')
              );
            });
          }
        },
        {
          path: 'openRedPackage',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(
                null,
                require(PAGE_BASIC_PATH + 'specialActivity/OpenRedPackage')
              );
            });
          }
        },
        {
          path: 'getRedPackage',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(
                null,
                require(PAGE_BASIC_PATH + 'specialActivity/GetRedPackage')
              );
            });
          }
        },
        {
          path: 'richLoanIntroduction',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require(PAGE_BASIC_PATH + 'RichLoanIntroduction'));
            });
          }
        },
        {
          path: 'moonLoanIntroduction',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require(PAGE_BASIC_PATH + 'MoonLoanIntroduction'));
            });
          }
        },
        {
          path: 'moonLoanInvestmentRecord',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require(PAGE_BASIC_PATH + 'MoonLoanInvestmentRecord'));
            });
          }
        },
        {
          path: 'applyToQuiteFromMoonLoan',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require(PAGE_BASIC_PATH + 'ApplyToQuiteFromMoonLoan'));
            });
          }
        },
        {
          path: 'quitFromMoonLoanSuccess',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require(PAGE_BASIC_PATH + 'QuitFromMoonLoanSuccess'));
            });
          }
        },
        {
          path: 'matchLoanOfMoon',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require(PAGE_BASIC_PATH + 'MatchLoanOfMoon'));
            });
          }
        },
        {
          path: 'allProductEMInvestmentRecord',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(
                null,
                require(PAGE_BASIC_PATH + 'AllProductEMInvestmentRecord')
              );
            });
          }
        },
        {
          path: 'matchLoanList',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require(PAGE_BASIC_PATH + 'MatchLoanList'));
            });
          }
        },
        {
          path: 'assignDebtRecord',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require(PAGE_BASIC_PATH + 'AssignDebtRecord'));
            });
          }
        },
        {
          path: 'vIPProfile',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require(PAGE_BASIC_PATH + 'VIPProfile'));
            });
          }
        },
        {
          path: 'myInviteFriendDetail',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require(PAGE_BASIC_PATH + 'MyInviteFriendDetail'));
            });
          }
        },
        {
          path: 'exchangeCoupon',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require(PAGE_BASIC_PATH + 'ExchangeCoupon'));
            });
          }
        },
        {
          path: 'presentGoldenApple',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(
                null,
                require(PAGE_BASIC_PATH + 'specialActivity/PresentGoldenApple')
              );
            });
          }
        },
        {
          path: 'registerSuccessHint',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require(PAGE_BASIC_PATH + 'RegisterSuccessHint'));
            });
          }
        },
        {
          path: 'appFeedback',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require(PAGE_BASIC_PATH + 'AppFeedback'));
            });
          }
        },
        {
          path: 'rechargeWithBAOFU',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require(PAGE_BASIC_PATH + 'RechargeWithBAOFU'));
            });
          }
        },

        {
          path: 'shareCoupon',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require(PAGE_BASIC_PATH + 'ShareCoupon'));
            });
          }
        },
        {
          path: 'modifyMobilePhone',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require(PAGE_BASIC_PATH + 'ModifyMobilePhone'));
            });
          }
        },
        {
          path: 'setNewMobilePhoneNo',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require(PAGE_BASIC_PATH + 'SetNewMobilePhoneNo'));
            });
          }
        },
        // {
        //     path: 'autoPurchaseIndex',
        //     getComponent(nextState, cb) {
        //         require.ensure([], (require) => {
        //             cb(null, require(PAGE_BASIC_PATH + "AutoPurchaseIndex"));
        //         })
        //     }
        // },
        // {
        //     path: 'autoPurchaseRule',
        //     getComponent(nextState, cb) {
        //         require.ensure([], (require) => {
        //             cb(null, require(PAGE_BASIC_PATH + "AutoPurchaseRule"));
        //         })
        //     }
        // },
        // {
        //     path: 'serviceAgreement_autoPurchase',
        //     getComponent(nextState, cb) {
        //         require.ensure([], (require) => {
        //             cb(null, require(PAGE_BASIC_PATH + "ServiceAgreement_autoPurchase"));
        //         })
        //     }
        // },
        // {
        //     path: 'autoPurchaseType',
        //     getComponent(nextState, cb) {
        //         require.ensure([], (require) => {
        //             cb(null, require(PAGE_BASIC_PATH + "AutoPurchaseType"));
        //         })
        //     }
        // },
        // {
        //     path: 'autoPurchaseForm',
        //     getComponent(nextState, cb) {
        //         require.ensure([], (require) => {
        //             cb(null, require(PAGE_BASIC_PATH + "AutoPurchaseForm"));
        //         })
        //     }
        // },
        {
          path: 'informationDisclosure',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require(PAGE_BASIC_PATH + 'InformationDisclosure'));
            });
          }
        },
        {
          path: 'platformSurvey',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require(PAGE_BASIC_PATH + 'PlatformSurvey'));
            });
          }
        },
        {
          path: 'operationReport',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require(PAGE_BASIC_PATH + 'OperationReport'));
            });
          }
        },
        {
          path: 'shareholderInfo',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require(PAGE_BASIC_PATH + 'ShareholderInfo'));
            });
          }
        },
        {
          path: 'companyQualification',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require(PAGE_BASIC_PATH + 'CompanyQualification'));
            });
          }
        },
        {
          path: 'companyGlories',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require(PAGE_BASIC_PATH + 'CompanyGlories'));
            });
          }
        },
        {
          path: 'managementTeam',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require(PAGE_BASIC_PATH + 'ManagementTeam'));
            });
          }
        },
        {
          path: 'organizationStructure',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require(PAGE_BASIC_PATH + 'OrganizationStructure'));
            });
          }
        },
        {
          path: 'developmentHistory',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require(PAGE_BASIC_PATH + 'DevelopmentHistory'));
            });
          }
        },
        {
          path: 'articlesOfNTLaw',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require(PAGE_BASIC_PATH + 'ArticlesOfNTLaw'));
            });
          }
        },
        {
          path: 'auditReport',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require(PAGE_BASIC_PATH + 'AuditReport'));
            });
          }
        },
        {
          path: 'registerToPABank',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require(PAGE_BASIC_PATH + 'RegisterToPABank'));
            });
          }
        },
        {
          path: 'bankListOfPACG',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require(PAGE_BASIC_PATH + 'BankListOfPACG'));
            });
          }
        },
        {
          path: 'searchSubbranchBank',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require(PAGE_BASIC_PATH + 'SearchSubbranchBank'));
            });
          }
        },
        {
          path: 'registerToPABankFailedHint',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require(PAGE_BASIC_PATH + 'RegisterToPABankFailedHint'));
            });
          }
        },
        {
          path: 'registerToPABankSuccessHint',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(
                null,
                require(PAGE_BASIC_PATH + 'RegisterToPABankSuccessHint')
              );
            });
          }
        },
        {
          path: 'withdrawApplySuccessHint',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require(PAGE_BASIC_PATH + 'WithdrawApplySuccessHint'));
            });
          }
        },
        {
          path: 'seviceAgreement_registerToPABank',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(
                null,
                require(PAGE_BASIC_PATH + 'SeviceAgreement_registerToPABank')
              );
            });
          }
        },
        {
          path: 'gljLoanIntroduction',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require(PAGE_BASIC_PATH + 'GljLoanIntroduction'));
            });
          }
        },
        {
          path: 'cedLoanIntroduction',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require(PAGE_BASIC_PATH + 'CEDLoanIntroduction'));
            });
          }
        },
        {
          path: 'upgradeToPABank',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require(PAGE_BASIC_PATH + 'UpgradeToPABank'));
            });
          }
        },
        {
          path: 'modifyOrResetDealPWForPABank',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(
                null,
                require(PAGE_BASIC_PATH + 'ModifyOrResetDealPWForPABank')
              );
            });
          }
        },
        {
          path: 'bankQuotaTable',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require(PAGE_BASIC_PATH + 'BankQuotaTable'));
            });
          }
        },
        {
            path: 'riskAnnounceHint',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require(PAGE_BASIC_PATH + "RiskAnnounceHint"));
                })
            }
         },
         {
            path: 'riskEvaluate',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require(PAGE_BASIC_PATH + "RiskEvaluate"));
                })
            }
          },
          {
              path: 'nydLoanIntroduction',
              getComponent(nextState, cb) {
                  require.ensure([], (require) => {
                      cb(null, require(PAGE_BASIC_PATH + "NYDLoanIntroduction"));
                  })
              }
          },
          {
            path: '*',
            getComponent(nextState, cb) {
              require.ensure([], require => {
                cb(null, require(PAGE_BASIC_PATH + 'NotFound'));
              });
            }
          }
      ]
    }
  ]
};

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
    <Router
      history={hashHistory}
      routes={rootRoute}
      onError={function(err) {
        console.error('error about react-router happen,error message:', err);
      }}
    />,
    document.getElementById('app-root')
  );
});

let config={
    _apiBasicPath:"/mock/",
    _apiUrlSuffix:".json",
    createFullPath(path){
        return this._apiBasicPath + path + this._apiUrlSuffix;
    },
    productNameMap:{//产品名称的映射表
        new_product:"新手标",
        ttz_product:"天天赚",
        yyz_product:"月月赚",
        jjz_product:"季季赚",
        loan_product:"好采投",
        creditor_product:"债权转让"
    },
    pageNameMap:{//组件/页面名称的映射表
        Home:"首页",
        ProductList:"理财",
        MoreProductList:"更多理财产品",
        UserHome:"用户中心",
        GetBackPassword:"找回登录密码",
        SetNewPassword:"设置登录密码",
        "EarnSetIntroduction.new_product":"新手标",
        "EarnSetIntroduction.ttz_product":"天天赚",
        "EarnSetIntroduction.yyz_product":"月月赚",
        "EarnSetIntroduction.jjz_product":"季季赚",
        FixedLoanIntroduction:"好采投",
        CreditorLoanIntroduction:"好采投.转",
        "Payment.newbieLoan":"支付",
        "Payment.dailyEarn":"支付",
        "Payment.monthlyEarn":"支付",
        "Payment.quarterlyEarn":"支付",
        PurchaseSuccess:"购买成功",
        DailyEarnAppointment:"预约天天赚",
        CouponList:"我的优惠券",
        MessageList:"我的消息",
        Recharge:"充值",
        BindBankCard:"添加银行卡",
        BankCardList:"选择开户银行",
        RealNameAuthentication:"实名认证",
        Withdraw:"提现",
        GetBackDealPassword:"找回交易密码",
        JournalAccount:"资金流水",
        InviteReward:"邀请有礼物",
        RewardDetailList:"奖励明细",
        InviteMyFriend:"邀请好友",
        My2DCode:"我的二维码",
        AppSetting:"设置和帮助",
        MyBankCard:"我的银行卡",
        DeleteBankCardConfirm:"删卡确认",
        DeleteCardApplySuccess:"提交成功",
        MyBankCardDetail:"银行卡详情",
        SecurityCenter:"安全中心",
        TotalAccountDetail:"总资产明细",
        "DailyEarnCenter":"灵活理财",
        "DailyEarnRollOut":"天天赚转出",
        "DailyEarnInvestmentRecord":"灵活理财明细",
        "RepaymentCalendar":"回款日历",
        "FixedLoanCenter":"定期投资",
        "FixedLoanInvestmentRecord":"项目直投投资明细",
        "CreditorLoanInvestmentRecord":"债权转让投资明细",
        "RepaymentSchedule":"好采投详情",
        "AssignmentOfDebt":"债权转让",
        "NewbieGuide":"新手任务",
        "ServiceAgreement_ttz_product":"天天赚服务协议",
        "ServiceAgreement_yyz_product":"月月赚服务协议",
        "ServiceAgreement_jjz_product":"季季赚服务协议",
        "ServiceAgreement_loan_product":"好采投服务协议",
        "ServiceAgreement_creditor_product":"债权转让服务协议",
        "AboutUs":"关于我们"
    },
    noNavBarPages:[//不需要显示navBar的页面
        "/",
        "Home",
        "UserHome",
        /*"ProductList",*/
        "Register",
        "PurchaseSuccess",
        "AppointmentSuccess",
        "Default",
        "DeleteCardApplySuccess",
        "MyBankCardDetail",
        "SetDealPassword",
        "TotalAccountDetail",
        "SecurityCenter",
        "DailyEarnCenter",
        "DailyEarnRollOutSuccess",
        "DailyEarnInvestmentRecord",
        "EarnSetInvestmentRecord",
        "AssignmentDebtSuccess"
    ],
    hasTabBarPages:[//需要显示tabBar的页面
        "Home",
        "ProductList",
        "UserHome"
    ],
    needToInterceptPages:[//需要进行登录拦截的页面
        "DailyEarnAppointment",
        "Payment",
        "UserHome"
    ]
}

export  default config;
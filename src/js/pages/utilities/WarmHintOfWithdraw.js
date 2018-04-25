import React from 'react';
import { View, Container, NavBar } from "../../UIComponents/index";

const WarmHintOfWithdraw = (props) => {
    let {
        navBarClickHandler
    }=props;

    let leftNav = {
        component: "a",
        icon: 'left-nav',
        title: '返回'
    };

    return (
        <View>
            <NavBar
                title="温馨提示"
                leftNav={[leftNav]}
                amStyle="primary"
                onAction={navBarClickHandler}
            />
            <Container style={{backgroundColor:"#fff",padding:"1rem"}}>
                <p>1、收到您的提现请求后，农泰金融将两小时内处理您的提现申请，具体以银行处理到账时间为准，请您注意查收。</p>
                <p>2、如果您填写的提现信息不正确可能会导致提现失败，由此产生的提现费用将不予返还。</p>
                <p>3、平台禁止洗钱、信用卡套现、虚假交易等行为，一经发现并确认，将终止该账户的使用。</p>
                <p>4、请确保您输入的提现金额，以及银行账号信息准确无误。</p>
                <p>5、每次单笔提现额度限额200万，不限制提现次数。</p>
                <p>6、当日充值的资金，需等银行方清算成功后方可申请提现。</p>
            </Container>
        </View>
    );
};

export default WarmHintOfWithdraw;
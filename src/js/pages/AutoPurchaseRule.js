import React from 'react';
import Container from "../UIComponents/Container";
import Group from "../UIComponents/Group";

const AutoPurchaseRule = () => {
    return (
        <Container scrollable={true} style={{ color: "#666", fontSize: "0.875rem" }}>
            <Group>
                <p>1. 使用自动投标功能，需先同意《自动投标协议》。</p>
                <p>2. 每个标的均有一定比例用于自动投标。当达到自动投标的比例上限后，不再通过自动投标功能进行投标</p>
                <p>3. 自动投标记录，请在交易记录中查看。</p>
                <p>4.请设置您想要进行自动投标的投资产品类型、期限、最低利率、单笔投资金额、账户保留余额。最低利率，不包括vip加息、奖励加息等。</p>
                <p>5.新标上线后，符合设置条件的用户根据排序进行自动投标。</p>
                <p>6.  每个标的每位用户只可自动投标一次。</p>
                <p>7.  自动投标排序规则如下：</p>
                <div style={{ paddingLeft: "1rem",marginTop:"1rem" }}>
                    a) 按照开启自动投标功能的时间进行排序；<br />
                    b) 修改、暂停、重新启用自动投标功能，将进行重新排序；<br />
                    c) 成功投标后，回到队尾进行重新排序；未成功投标，不进行重新排序；
                </div>
                <p style={{ color: "#cc2e33" }}>注：自动投标功能暂不支持使用红包、加息券</p>
            </Group>
        </Container>
    );
};


module.exports = AutoPurchaseRule;
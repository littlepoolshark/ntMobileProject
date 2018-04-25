require("../../scss/page/serviceAgreement.scss")
import React from "react";
import Container from "../UIComponents/Container";

function RiskAnnounceHint(){
    return (
        <Container scrollable={true} className="protocol">
            <h5>特在此提醒用户在使用饭米粒理财产品前谨慎考虑网络借贷可能面临的风险，该等风险可能包括但不限于： </h5>
            <p>（1）政策风险：即法律、法规及相关政策发生变化而导致您无法获得该产品的历史收益甚至可能遭受损失的风险；</p>

            <p>（2）信用风险：即因借款人及/或保证人等无力按时足额履约而使您遭受资金损失的风险；</p>

            <p>（3）系统及操作风险：即由于不可预测或无法控制的系统及设备故障、黑客攻击，以及由于您的不当操作、泄露账户密码等过错行为而导致损失的风险；</p>

            <p>（4）不可抗力及意外事件风险：是指因战争、自然灾害、重大政治事件等不可抗力以及其他不可预见的意外事件可能致使相关交易面临损失的任何风险；</p>

            <p>（5）流动性风险：如果用户主动发起转让，由于转让为转让人与受让人之间的交易，转让的具体结果和成交时以实际交易情况为准，饭米粒理财平台不对交易结果作出保证。平台将对成功退出部分的债权收取转让手续费。</p>

            <p>前述并不能完全揭示潜在风险的全部情形，请在做出决策前全面了解、理性决策，并自行承担全部风险</p>
        </Container>
    )
};

module.exports=RiskAnnounceHint;
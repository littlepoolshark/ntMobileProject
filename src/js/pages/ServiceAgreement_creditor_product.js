require("../../scss/page/serviceAgreement.scss")
import React from "react";
import Container from "../UIComponents/Container";

function ServiceAgreement_creditor_product(){
    return (
        <Container scrollable={true} className="protocol">
            <article className="nt-agreement-article">
                <ul className="nt-agreement-list">
                    <li className="nt-agreement-cell">甲方（债权转让人）：【      】，身份证号码：【      】，农泰金融账号：【      】 </li>
                    <li className="nt-agreement-cell">乙方（债权受让人）：【      】，身份证号码：【      】 ，农泰金融帐号：【      】</li>
                    <li className="nt-agreement-cell">根据《中华人民共和国民法通则》、《中华人民共和国合同法》等法律法规规定，甲乙双方遵循自愿、公平、诚实信用的原则，经友好协商，现就甲方向乙方转让其拥有的债权事宜达成一致意见，签订本债权转让协议。</li>
                </ul>
                <h2 className="nt-agreement-tag1">第一条  转让债权标的</h2>
                <ul className="nt-agreement-list">
                    <li className="nt-agreement-cell">1、甲方作为债权人与债务人【      】于【      】年【      】月【      】日，通过“农泰金融”平台签订了编号为【      】的《互联网金融借款协议》，该合同项下的债权由担保人提供担保，担保方式为：【      】。（详见附件一：转让债权标的原始文件）；</li>
                    <li className="nt-agreement-cell">2、甲方自愿将该合同项下的全部债权及担保权等从权利一并转让给乙方，乙方自愿受让前述全部权利。</li>
                </ul>

                <h2 className="nt-agreement-tag1">第二条  转让价款及相关事项安排</h2>
                <ul className="nt-agreement-list">
                    <li className="nt-agreement-cell">1、甲乙双方共同确认转让债权标的价格为【      】元，大写金额：【      】。</li>
                    <li className="nt-agreement-cell">2、乙方只负责管理和追偿，乙方对转让的债权不承担代偿。</li>
                </ul>

                <h2 className="nt-agreement-tag1">第三条  转让债权通知及相关变更事项安排</h2>
                <ul className="nt-agreement-list">
                    <li className="nt-agreement-cell">1、 本协议签订后，甲乙双方共同签署《债权转让通知书》，通过“农泰金融”平台通知债务人和担保人，或通过电邮、短信、邮寄方式通知给债务人和担保人。债务人和担保人拒绝签收书面通知或者邮件的，通过在“农泰金融”平台网站上，报纸上发布公告形式进行通知。</li>
                    <li className="nt-agreement-cell">2、 本协议签订后，甲乙双方共同“农泰金融”平台网站上，在进行债权人变更登记，将债权人由甲方变更为乙方。如转让债权进入诉讼或者执行程序的，由甲乙双方共同向有关人民法院办理原告或者执行申请人变更登记，将原告或者执行申请人由甲方变更为乙方。</li>
                    <li className="nt-agreement-cell">3、 如不能完成债权人（原告、执行申请人）变更，转让债权标的对外名义上仍由甲方享有，但转让债权标的实际权利应由乙方享有。甲方行使债权及从权利所取得的全部收益应当归乙方所有，甲方取得收益后全额交付给乙方，不得以任何理由隐瞒或者截留收益。</li>
                </ul>

                <h2 className="nt-agreement-tag1">第四条  债权及担保权利的转移</h2>
                <ul className="nt-agreement-list">
                    <li className="nt-agreement-cell">自本协议生效之日起，该合同项下的全部债权及担保权等从权利由甲方转移给乙方行使。</li>
                </ul>

                <h2 className="nt-agreement-tag1">第五条  陈述和保证</h2>
                <ul className="nt-agreement-list">
                    <li className="nt-agreement-cell">（一）	甲方的陈述和保证本协议生效前，转让债权标的从未转让给任何第三方，并对转让债权标的拥有合法、有效的处分权；本协议生效后，也不会再转让给任何第三方；</li>
                    <li className="nt-agreement-cell">（二）乙方的陈述和保证乙方保证，其为签署和履行本协议所提供的与本协议有关的任何文件或信息，在所有方面都是真实的，不存在故意隐瞒和欺骗的情况。</li>
                </ul>


                <h2 className="nt-agreement-tag1">第六条  违约责任</h2>
                <ul className="nt-agreement-list">
                    <li className="nt-agreement-cell">1．甲方隐瞒事实真相，致使乙方遭受经济损失的，甲方应当向乙方进行全额赔偿。</li>
                    <li className="nt-agreement-cell">2．甲方违反本协议第三条第三款约定隐瞒或者截留债权收益的，甲方除应当将所隐瞒或者截留的收益全额交付给乙方外，还应当按照所隐瞒或者截留的收益金额的双倍向乙方支付违约金。</li>
                </ul>


                <h2 className="nt-agreement-tag1">第七条  争议的解决</h2>
                <ul className="nt-agreement-list">
                    <li className="nt-agreement-cell">甲乙双方因履行本协议或与本协议有关的所有纠纷应首先以友好协商的方式解决。如果在一方书面通知另两方该争议的存在(要求开始协商)后六十(60)天内，双方仍无法通过协商达成一致，任何一方均可将该争议向本合同签订地所在辖区人民法院提起民事诉讼。</li>
                </ul>

                <h2 className="nt-agreement-tag1">第八条  未尽事宜</h2>
                <ul className="nt-agreement-list">
                    <li className="nt-agreement-cell">本协议未尽事宜，甲乙双方协商一致后，另行订立补充协议，补充协议与本协议具有同等法律效力。</li>
                </ul>

                <h2 className="nt-agreement-tag1">第九条  通知和送达</h2>
                <ul className="nt-agreement-list">
                    <li className="nt-agreement-cell">任何与本协议有关由各方发出的通知或其他通讯往来应当采用书面形式，按照本协议尾部约定的地址和电话通知和送达。</li>
                </ul>

                <h2 className="nt-agreement-tag1">第十条   生效</h2>
                <ul className="nt-agreement-list">
                    <li className="nt-agreement-cell">本协议系“农泰金融”平台上的电子合同，自甲乙双方点击“确认”按钮之时成立并生效。</li>
                </ul>

            </article>
        </Container>
    )
};

module.exports=ServiceAgreement_creditor_product;
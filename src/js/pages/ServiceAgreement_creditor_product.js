require("../../scss/page/serviceAgreement.scss")
import React from "react";

import View from "../UIComponents/View";
import NavBar from "../UIComponents/NavBar";
import Container from "../UIComponents/Container";

import AutoAssignBar from  '../pages/utilities/AutoAssignBar';

let  ServiceAgreement_creditor_product=React.createClass({

    _handleNavBack(){
        let query=(this.props.location && this.props.location.query) || {};
        if(this.props.backToPrevView){
            this.props.backToPrevView();
        }else if(query.beforeComponent ){
            if(query.beforeComponent === "/"){
                this.context.router.push({
                    pathname:"productList"
                });
            }else if(query.beforeComponent === "assignDebtRecord"){
                this.context.router.push({
                    pathname:"assignDebtRecord",
                    query:{
                        tabIndex:1
                    }
                });
            }
            
        }else {
            this.context.router.goBack();
        }
    },

    render(){

        let backNav = {
            component:"a",
            icon: 'left-nav',
            title: '返回'
        };

        let isNeedToShowAssignBtn=!!this.props.isNeedToShowAssignBtn;

        return (
                <View>
                    <NavBar
                        title="债权转让协议"
                        leftNav={[backNav]}
                        amStyle="primary"
                        onAction={this._handleNavBack}
                    />
                    <Container scrollable={true} className="protocol" style={isNeedToShowAssignBtn ? {paddingBottom:"8rem"} : null}>
                        <article className="nt-agreement-article">
                            <ul className="nt-agreement-list">
                                <li className="nt-agreement-cell">
                                    编号： 【 】
                                </li>
                                <li className="nt-agreement-cell">甲方（债权转让方）：【      】</li>
                                <li className="nt-agreement-cell">法定代表人：：【      】</li>
                                <li className="nt-agreement-cell">身份证号/营业执照号/统一社会信用代码：【      】</li>
                                <li className="nt-agreement-cell">地址：【      】</li>
                            </ul>

                            <ul className="nt-agreement-list">
                                <li className="nt-agreement-cell">乙方（债权受让方）：受让方信息见受让方签署页</li>
                            </ul>

                            <ul className="nt-agreement-list">
                                <li className="nt-agreement-cell">丙方：深圳农泰金融服务有限公司</li>
                                <li className="nt-agreement-cell">法定代表人：黄为民</li>
                                <li className="nt-agreement-cell">身份证号/营业执照号/统一社会信用代码：91440300358236624L</li>
                                <li className="nt-agreement-cell">住所：深圳市南山区深南大道9966号威盛科技大厦21层</li>
                            </ul>
                            
                            <ul class="nt-agreement-list">
                                {/*  TODO 此处应有首行缩进两字符  */}
                                <li class="indent nt-agreement-cell">
                                    转让人作为出借人与借款人签订了编号为【      】的《借款协议》，受让人愿意支付一定的价款购买转让人在前述《借款协议》项下持有的全部或部分债权，本次债权转让由深圳农泰金融服务有限公司（以下简称“农泰金融”）提供居间撮合服务，双方同意于农泰金融平台上签署本协议：
                                </li>
                            </ul>

                            <h2 className="nt-agreement-tag1">一、定义</h2>
                            <ul className="nt-agreement-list">
                                <li className="nt-agreement-cell">（一）债权转让方：指在丙方运营管理的农泰金融平台成功注册账户成为用户，可将其在农泰金融平台因出借资金形成的债权转让给第三方，具有完全民事权利及行为能力的民事主体。</li>
                                <li className="nt-agreement-cell">（二）债权受让方：指在丙方运营管理的农泰金融平台注册账户成为用户，支付一定对价后受让债权转让方对相应借款人享有的债权的民事主体。</li>
                                <li className="nt-agreement-cell">（三）平台方：深圳农泰金融服务有限公司，简称“农泰金融”。</li>
                                <li className="nt-agreement-cell">（四）借款余额：指截至丙方为甲方发布债权转让信息之日，原借款协议项下未归还的借款本金。</li>
                                <li className="nt-agreement-cell">（五）农泰金融平台/网站/APP：指丙方运营管理的包括“饭米粒”、“农泰金融”等品牌在内的互联网PC端、微信公众号以及手机APP客户端。</li>
                            </ul>

                            <h2 className="nt-agreement-tag1">二、债权转让内容</h2>
                            <h3 className="nt-agreement-tag2">（一）原借款协议基本信息</h3>
                            <ul className="nt-agreement-list">
                                <li className="nt-agreement-cell">原债权（借款）协议编号：【      】</li>
                                <li className="nt-agreement-cell">债务人名称（身份证号/营业执照号）：【      】</li>
                                <li className="nt-agreement-cell">本金：人民币（大写）【      】元整（￥【      】）   </li>
                                <li className="nt-agreement-cell">借款期限：【      】年【      】月【      】日起至【      】年【      】月【      】日。</li>
                                <li className="nt-agreement-cell">借款利率：【      】℅/年【      】℅/月【      】℅/日（勾选）  </li>
                                <li className="nt-agreement-cell">借款用途：【      】</li>
                                <li className="nt-agreement-cell">还款方式：【      】</li>
                                <li className="nt-agreement-cell">借款余额：人民币（大写）【      】元整（￥【      】）</li>
                                <li className="nt-agreement-cell">剩余还款期数：【      】期</li>
                            </ul>
                            <h3 className="nt-agreement-tag2">（二）目标转让债权：原《借款协议》项下本金为人民币（大写）【      】元整（￥【      】）的债权及对应的未付利息、违约金（若有）及其他相关权益（以下简称“标的债权”） </h3>
                            <h3 className="nt-agreement-tag2">（三）本协议签订后，自乙方通过丙方或丙方委托的第三方成功向甲方支付转让价款次日起，乙方享有所有有关借款债权的权利、利益和收益以及与上述相关的任何其他权利、诉求和利益。</h3>

                            <h2 className="nt-agreement-tag1">三、债权转让价款及支付</h2>
                            <ul className="nt-agreement-list">
                                <li className="nt-agreement-cell">（一）甲、乙方约定债权转让价款为人民币（大写）【      】元整（￥【      】）。</li>
                                <li className="nt-agreement-cell">（二）本协议签订后，乙方通过丙方或丙方委托的第三方支付给甲方。</li>
                            </ul>

                            <h2 className="nt-agreement-tag1">四、转让服务费</h2>
                            <ul className="nt-agreement-list">
                                <li className="nt-agreement-cell">丙方有权就其为甲、乙双方提供的平台服务向甲方收取转让服务费。转让服务费的计算公式为：转让服务费=债权转让价款×0.15% 。转让服务费在受让方支付的债权转让价款中一次性扣收。</li>
                            </ul>

                            <h2 className="nt-agreement-tag1">五、债权转让通知</h2>
                            <ul className="nt-agreement-list">
                                <li className="nt-agreement-cell">（一）本协议签订后，甲方应向原合同债务人告知债权转让一事或告知其向债权受让人履行债务。</li>
                                <li className="nt-agreement-cell">（二）甲方应采取适当形式告知原合同债务人，如平台站内信、邮件、短信等方式。</li>
                                <li className="nt-agreement-cell">（三）如甲方告知困难，可委托丙方代为履行债权转让通知的义务。</li>
                            </ul>

                            <h2 className="nt-agreement-tag1">六、甲方保证</h2>
                            <ul className="nt-agreement-list">
                                <li className="nt-agreement-cell">（一）甲方有权实施本协议项下的债权转让并能够独立承担民事责任，对债务人的债权真实存在、合法有效。</li>
                                <li className="nt-agreement-cell">（二）甲方对标的债权有合法完整的处分权，甲方转让标的债权的行为合法有效，并未受到任何来自司法、行政机关或其他任何第三方的限制。乙方受让标的债权后，不会因受让行为而遭受任何第三方主张权利。</li>
                                <li className="nt-agreement-cell">（三）如甲方违反上述保证，导致债权转让无效的，由甲方自行承担相关责任。因此给乙方带来损失的，还应赔偿由此给乙方带来的损失。</li>
                            </ul>

                            <h2 className="nt-agreement-tag1">七、乙方保证</h2>
                            <ul className="nt-agreement-list">
                                <li className="nt-agreement-cell">（一）自乙方通过丙方或丙方委托的第三方成功向甲方支付转让价款次日起，乙方将自动受原始借款协议等相关文件中条款和条件的约束，并享有原始借款协议等相关文件中有关甲方享有的相关权利，承担甲方应承担的责任和义务。</li>
                                <li className="nt-agreement-cell">（二）拥有完全的民事权利能力和民事行为能力签署并履行本协议。</li>
                                <li className="nt-agreement-cell">（三）保证其用于支付的受让价款资金来源合法，且拥有完整的处分权。</li>
                                <li className="nt-agreement-cell">（四）保证具有独立的风险认知能力和风险承受能力，对本次债权的转让结果和可能存在的风险已经理解并表示认可。</li>
                            </ul>

                            <h2 className="nt-agreement-tag1">八、丙方权利义务</h2>
                            <ul className="nt-agreement-list">
                                <li className="nt-agreement-cell">（一）为甲方发布债权转让信息。</li>
                                <li className="nt-agreement-cell">（二）提供债权转让及受让撮合、咨询及在线争议解决等相关服务。</li>
                                <li className="nt-agreement-cell">（三）按照约定收取债权转让服务费。</li>
                                <li className="nt-agreement-cell">（四）在乙方支付完毕债权转让款后，将相应的债权凭证（借款协议、连带责任保证书等相关文件）向乙方进行交割。</li>
                            </ul>

                            <h2 className="nt-agreement-tag1">九、风险提示</h2>
                            <h3 className="nt-agreement-tag2">（一）债权受让人应了解网络借贷可能面临的主要风险如下：</h3>
                            <ul className="nt-agreement-list">
                                <li className="nt-agreement-cell">1、政策风险：因国家法律、法规、行政规章或政策发生重大调整、变化或其他不可预知的意外事件，导致投资者本息损失。</li>
                                <li className="nt-agreement-cell">2、市场风险：资金市场供求关系的变化、货币政策、财政政策、行业政策等因素的变化，导致投资者本息损失。</li>
                                <li className="nt-agreement-cell">3、信用风险：无论何种原因，因借款方资金周转原因造成借款本息不能如期兑付，导致投资者本息损失。</li>
                                <li className="nt-agreement-cell">4、操作风险：投资者账号密码泄露或被第三人盗用，导致投资者本息损失。</li>
                                <li className="nt-agreement-cell">5、其他风险：不可抗力风险、流动性风险等，导致投资者本息损失。</li>
                            </ul>
                            <h3 className="nt-agreement-tag2">（二）债权受让人风险提示</h3>
                            <ul className="nt-agreement-list">
                                <li className="nt-agreement-cell">1、债权受让人知晓丙方平台作为依法成立的网络借贷信息中介机构，是专门从事网络借贷信息中介业务活动的金融信息中介企业；</li>
                                <li className="nt-agreement-cell">2、债权受让人知晓丙方平台主要为借款人（即贷款人）与债权受让人实现直接借贷提供信息搜集、信息公布、资信评估、信息交互、借贷撮合等服务，不提供增信服务，不设立资金池，不进行非法集资，不损害国家利益和社会公共利益；</li>
                                <li className="nt-agreement-cell">3、债权受让人了解融资项目信贷风险，认真学习相关的知识，理性谨慎量力而行，具有相应的风险认知和承受能力；</li>
                                <li className="nt-agreement-cell">4、债权受让人需了解根据《最高人民法院关于审理民间借贷案件适用法律若干问题的规定》，民间借贷年利率不超过24%的，法律予以保护；</li>
                                <li className="nt-agreement-cell">5、债权受让人知晓交易相对人的基本信息，在丙方平台上进行的决策均将由债权受让人本人亲自确认；</li>
                                <li className="nt-agreement-cell">6、债权受让人应增强自我保护能力，远离非法集资活动，谨防上当受骗，积极主动地行使自己的权利，依法维权；</li>
                                <li className="nt-agreement-cell">7、债权受让人要牢记投资有风险，树立风险意识，增强心理调节能力，避免盲目跟风。</li>
                            </ul>

                            <h2 className="nt-agreement-tag1">十、违约责任</h2>
                            <ul className="nt-agreement-list">
                                <li className="nt-agreement-cell">（一）若本协议任何一方未按本合同的规定，适当、全面地履行其义务，应承担违约责任。守约方由此产生的任何损害，均由违约方赔偿。</li>
                                <li className="nt-agreement-cell">（二）若乙方未能按本协议的规定按时支付债权转让价款，迟延一天，应支付迟延部分总价款 0.04 %作为违约金。</li>
                            </ul>

                            <h2 className="nt-agreement-tag1">十一、本协议经各方签字盖章或者通过农泰金融网站或APP等以网络在线点击确认的方式订立后生效。</h2>
                            <h2 className="nt-agreement-tag1">十二、本协议生效且乙方支付全部债权转让款后，甲方不再向债务人主张债权，由乙方作为新债权人向债务人主张债权，乙方享有甲方作为原债权人对债务人所享有的一切权利。</h2>
                            <h2 className="nt-agreement-tag1">十三、凡因本协议引起的或与本协议有关的争议或纠纷，可由三方协商解决；协商不成时，可向协议签订地深圳市南山区人民法院提起诉讼。</h2>
                            <h2 className="nt-agreement-tag1">十四、本协议由甲、乙、丙三方于【      】年【      】月【      】日签订，合同签署地为深圳市南山区。</h2>

                            <ul class="nt-agreement-list">
                                {/*  TODO 此处应有首行缩进两字符  */}
                                <li class="indent nt-agreement-cell">（以下无正文）</li>
                            </ul>

                            <ul className="nt-agreement-list">
                                <li className="nt-agreement-cell">甲方（签章）：【      】</li>
                                <li className="nt-agreement-cell">法定代表人（签字）：【      】</li>
                                <li className="nt-agreement-cell">乙方（签章）：乙方（债权受让人）签章见乙方签章页</li>
                                <li className="nt-agreement-cell">丙方（签章）：【      】</li>
                                <li className="nt-agreement-cell">法定代表人（签字）：【      】</li>
                            </ul>

                            <ul className="nt-agreement-list">
                                <li className="nt-agreement-cell">本页为编号为【      】的《债权转让协议》的乙方签章页</li>
                                <li className="nt-agreement-cell">乙方（债权受让方）信息及签章如下：</li>
                            </ul>

                            <table>
                                    <thead>
                                            <tr>
                                                <th>受让人姓名</th>
                                                <th>身份证/营业执照号码</th>
                                                <th>受让债权金额（元）</th>
                                                <th>受让价款（元）</th>
                                                <th>转让款约定支付日期</th>
                                                <th>签章</th>
                                            </tr>
                                    </thead>
                                <tbody>
                                    <tr>
                                        <td>【      】</td>
                                        <td>【      】</td>
                                        <td>【      】</td>
                                        <td>【      】</td>
                                        <td>【      】</td>
                                        <td>【      】</td>
                                    </tr>
                                </tbody>
                            </table>
                        </article>
                        {
                            isNeedToShowAssignBtn ? 
                            <AutoAssignBar assignAgreement={this.props.assignAgreement} /> :
                            null
                        }
                    </Container>
                </View>

            )
        }
});

ServiceAgreement_creditor_product.contextTypes = {
    router:React.PropTypes.object.isRequired
};

module.exports=ServiceAgreement_creditor_product;
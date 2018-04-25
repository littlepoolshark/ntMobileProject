require("../../scss/page/serviceAgreement.scss")
import React from "react";
import { Link } from "react-router";
import Container from "../UIComponents/Container";

function ServiceAgreement_rich(){
    return (
        <Container scrollable={true} className="protocol">
                <article className="nt-agreement-article">
                        <ul className="nt-agreement-list"><li className="nt-agreement-cell">尊敬的用户：本次计划旨在为农泰金融用户提供更高效、更灵活的服务，以便更好地提高出借人的资金使用效率。请在投资前仔细阅读本协议各条款，以及与本服务计划相关的全部规则。</li></ul>
                        <ul className="nt-agreement-list"><li className="nt-agreement-cell">本协议由以下各方签署</li></ul>
                        <ul className="nt-agreement-list">
                                <li className="nt-agreement-cell">甲方（投资方）：【 】</li>
                                <li className="nt-agreement-cell">身份证号： 【 】</li>
                                <li className="nt-agreement-cell">农泰金融注册用户名： 【 】</li>
                                <li className="nt-agreement-cell">乙方：深圳农泰金融服务有限公司</li>
                                <li className="nt-agreement-cell">住所：深圳市南山区深南大道9966号威盛科技大厦21层</li>
                        </ul>
                        <h4 className="nt-agreement-tag3">定义：</h4>
                        <ul className="nt-agreement-list"><li className="nt-agreement-cell">除非本合同另有规定，以下词语在本合同中定义如下：</li></ul>
                        <ul className="nt-agreement-list">
                                <li className="nt-agreement-cell">1、甲方指通过乙方平台注册账户的会员，加入本计划并通过乙方出借一定金额资金给他人的自然人。</li>
                                <li className="nt-agreement-cell">2、乙方是一家在深圳市合法成立并有效存续的有限责任公司，拥有投融资网络信息平台：农泰金融网站（网址：https://www.ntjrchina.com/，下称“本网站”或“农泰金融”）的经营权，能获取大量的投融资信息，并能有效提供投融资居间撮合、管理等服务。</li>
                                <li className="nt-agreement-cell">3、合作机构：与农泰金融建立合作关系的机构，包括但不限于：第三方支付机构、基金管理公司、小额贷款公司、商业保理公司、融资租赁公司、融资性担保公司等。</li>
                                <li className="nt-agreement-cell">4、以上各方本着实事求是、平等互利、共同发展的原则，就甲方委托乙方将资金进行分散出借、权益转让性投资或申购/赎回货币基金相关事宜，经过友好协商，在甲方充分了解并清楚知晓本服务计划相关规则的前提下，甲乙双方达成协议如下：</li>
                        </ul>

                        <ul className="nt-agreement-list">
                                <li className="nt-agreement-cell">
                                        <h4 className="nt-agreement-tag3">第1条 丰收盈服务计划描述</h4>
                                        <ul className="nt-agreement-list">
                                                <li className="nt-agreement-cell">丰收盈服务计划指甲方加入本计划后对饭米粒理财相关借款项目（ 本协议所指的“借款项目”不包括针对该借款项目的债权转让项目）在系统支持下，根据饭米粒理财有关规则，依照分散投标原则进行自动投资，并在服务期届满后由系统自动协助甲方退出，以满足甲方资金流动性的需求，进而实现灵活投资并获取收益的目的。甲方在服务期内不得撤销、取消加入，并只能根据《丰收盈服务协议书》的规定在期限结束后退出计划。</li>
                                        </ul>
                                </li>
                                <li className="nt-agreement-cell">
                                        <h4 className="nt-agreement-tag3">第2条 服务计划的加入及内容</h4>
                                        <ul className="nt-agreement-list">
                                                <li className="nt-agreement-cell">
                                                        2.1甲方同意按照如下条件加入乙方提供的丰收盈服务计划，详情如下：
                                                        <ul className="nt-agreement-list">
                                                                <li className="nt-agreement-cell">（1）加入本金数额（下称“甲方加入资金”）：（大写）【 】（小写）【 】。</li>
                                                                <li className="nt-agreement-cell">（2）历史年化：以本网站公示为准</li>
                                                                <li className="nt-agreement-cell">（3）服务期限：以配置资产的期限为准</li>
                                                                <li className="nt-agreement-cell">（4）可否提前退出：否</li>
                                                                <li className="nt-agreement-cell">（5）收益起算日：以具体匹配的项目起息时间为准</li>
                                                        </ul>
                                                </li>
                                                <li className="nt-agreement-cell">
                                                        2.2加入资金：
                                                        <ul className="nt-agreement-list">
                                                                <li className="nt-agreement-cell">甲方加入资金支付完毕，甲方即加入本服务计划。甲方可分多笔加入丰收盈服务计划，每笔加入资金须以100元及其整数倍进行交易，且在加入计划期间若计划开放额度和每人额度上限均符合的情况下可以追加资金进入计划累计，甲方最大投资规模以饭米粒理财网站公示为准。</li>
                                                        </ul>
                                                </li>
                                                <li className="nt-agreement-cell">
                                                        2.3投资范围：
                                                        <ul className="nt-agreement-list">
                                                                <li className="nt-agreement-cell">经饭米粒理财确认的合作结构推荐的产品（包括但不限于货币型基金、借款项目等），如散标、债权。为尽力达到历史年化收益率，甲方在签署本协议时，视为已经同意根据饭米粒理财有关规则并通过网站系统，对饭米粒理财借款项目进行自动投标、受让、转让相关债权等操作。甲方认可系统自动投标所达成的相关协议（包括但不限于农泰金融借款协议、债权转让协议等），及同意系统自动收付、冻结、扣划相关款项。因甲方通过本服务计划，投资的借款项目到期后，甲方无需进行退出操作，系统将自动将甲方的本金回款到存管子账户。</li>
                                                        </ul>
                                                </li>
                                                <li className="nt-agreement-cell">
                                                        2.4服务计划变更条款：
                                                        <ul className="nt-agreement-list">
                                                                <li className="nt-agreement-cell">在下列情况出现时，乙方可采取终止、暂停本期服务计划、或控制交易额度、调整历史年化收益率或其他合理措施对本服务计划进行调整，以降低甲方资金及服务计划面临的风险。
                                                                        <ul className="nt-agreement-list">
                                                                                <li className="nt-agreement-cell">（1）宏观经济变化，导致整体市场环境恶化，融资风险提高的；</li>
                                                                                <li className="nt-agreement-cell">（2）国家政策调整，导致本服务计划面临重大风险的；</li>
                                                                                <li className="nt-agreement-cell">（3）因服务计划参与资金过大、过小或资金额度短期内发生剧烈变动，导致管理成本提高或管理难度加大的；</li>
                                                                                <li className="nt-agreement-cell">（4）发生战争、地震、火山喷发、罢工、游行示威、黑客攻击、计算机病毒或政府管制等不可抗力原因导致服务计划无法持续的； 发生以上情形的，乙方应当及时通知甲方，并采取一切合理的措施最大程度地减少对甲方的损失，并应当在合理的期限内提供相关证明。</li>
                                                                        </ul>
                                                                </li>
                                                        </ul>
                                                </li>
                                                <li className="nt-agreement-cell">
                                                        2.5投资范围：
                                                        <ul className="nt-agreement-list">
                                                                <li className="nt-agreement-cell">经饭米粒理财确认的合作结构推荐的产品（包括但不限于货币型基金、借款项目等），如散标、债权。为尽力达到历史年化收益率，甲方在签署本协议时，视为已经同意根据饭米粒理财有关规则并通过网站系统，对饭米粒理财借款项目进行自动投标、受让、转让相关债权等操作。甲方认可系统自动投标所达成的相关协议（包括但不限于农泰金融借款协议、债权转让协议等），及同意系统自动收付、冻结、扣划相关款项。因甲方通过本服务计划，投资的借款项目到期后，甲方无需进行退出操作，系统将自动将甲方的本金回款到存管子账户。</li>
                                                        </ul>
                                                </li>
                                        </ul>
                                </li>
                                <li className="nt-agreement-cell">
                                        <h4 className="nt-agreement-tag3">第3条 收益结算及退出</h4>
                                        <ul className="nt-agreement-list">
                                                <li className="nt-agreement-cell">
                                                        3.1历史年化收益率计算：
                                                        <ul className="nt-agreement-list">
                                                                <li className="nt-agreement-cell">为甲方加入本计划资金的历史年化回报，以乙方平台公示的为准。甲方已经知悉、了解并同意：历史年化收益率不代表甲方最终实际收益率，甲方出借本金以及利息存在不能够按期收回的风险，在实际收益率未达到历史年化收益率的情况下，甲方仅能按实际收益率收取投资收益，乙方不对甲方加入资金的收回、可获收益金额做出任何承诺、保证。</li>
                                                        </ul>
                                                </li>
                                                <li className="nt-agreement-cell">
                                                        3.2收益计算和结算：
                                                        <ul className="nt-agreement-list">
                                                                <li className="nt-agreement-cell">按本协议3.1款及本网站公示的历史年化进行收益计算，甲方加入本服务计划次月可查看，系统每月自动计算收益并发放到甲方农泰金融账户，期限结束后将参与本金回款到饭米粒理财账户供甲方自主支配继续投资或提取（每月还息，到期还本）。</li>
                                                        </ul>
                                                </li>
                                                <li className="nt-agreement-cell">
                                                        3.3到期退出：
                                                        <ul className="nt-agreement-list">
                                                                <li className="nt-agreement-cell">甲方加入本服务计划后不可通过预约申请退出本计划，也不支持债权转让。计划到期，系统将自动将甲方本金回款到存管子账户。</li>
                                                        </ul>
                                                </li>
                                        </ul>
                                </li>
                                <li className="nt-agreement-cell">
                                        <h4 className="nt-agreement-tag3">第4条 费用说明 </h4>
                                        <ul className="nt-agreement-list">
                                                <li className="nt-agreement-cell">4.1乙方依据本协议向甲方提供服务，有权向甲方收取相应的管理费用（目前乙方仅收取管理费，如有调整乙方将在本网站公告）。</li>
                                                <li className="nt-agreement-cell">
                                                        4.2管理费的计算和收取：
                                                        <ul className="nt-agreement-list">
                                                                <li className="nt-agreement-cell">（1）乙方依据本协议对甲方加入资金进行自动投标。当计划结束时，若本次投标所得利息收入中超出丰收盈计划历史收益，则该部分的收益将作为管理费用归乙方所有。若利息收入不及历史年化收益的，则乙方不收取任何管理费用，并且乙方将补息当期计划历史年化收益金额。</li>
                                                                <li className="nt-agreement-cell">（2）历史年化收益率上限仅为乙方向甲方收取管理费的基准和依据，不代表对乙方加入本期服务计划可以取得的收益的任何预测，也不是乙方对甲方加入本期服务计划可以取得的实际收益的任何保证、承诺。</li>
                                                                <li className="nt-agreement-cell">（3）管理费的收取方式：乙方向甲方进行收益结算时，乙方自动在所得利息款项中扣除相应的管理费用后再将甲方的本息回款到甲方的账户中。</li>
                                                        </ul>
                                                </li>
                                        </ul>
                                </li>
                                <li className="nt-agreement-cell">
                                        <h4 className="nt-agreement-tag3">第5条 本协议的成立及生效 </h4>
                                        <ul className="nt-agreement-list">
                                                <li className="nt-agreement-cell">本协议以甲方按照饭米粒理财的规则，在饭米粒理财勾选“我同意《丰收盈服务协议》”或点击“购买”按钮（具体以网站显示为准）确认后即时生效。即视为甲方与乙方已达成协议并同意接受丰收盈计划服务及本协议的全部内容，以及农泰金融网站所包含的其他与本协议有关各项规则的所有约定。</li>
                                        </ul>
                                </li>
                                <li className="nt-agreement-cell">
                                        <h4 className="nt-agreement-tag3">第6条 丰收盈服务计划项目保障 </h4>
                                        <ul className="nt-agreement-list">
                                                <li className="nt-agreement-cell">6.1为降低甲方因投资标的过于集中而带来的信用违约风险，系统对甲方的加入资金根据网站有关规则按分散化的原则优先自动投标。</li>
                                                <li className="nt-agreement-cell">6.2为保证丰收盈产品项目的及时性，在甲方加入本产品时，系统即为甲方加入本产品的甲方加入资金启动优先自动投标的功能。 </li>
                                        </ul>
                                </li>
                                <li className="nt-agreement-cell">
                                        <h4 className="nt-agreement-tag3">第7条 甲、乙双方的声明和保证 </h4>
                                        <ul className="nt-agreement-list">
                                                <li className="nt-agreement-cell">7.1在签署本协议书以前，乙方已就本协议书及有关交易文件的全部条款和内容向甲方进行了详细的说明和解释，甲方已认真阅读本协议有关条款，对有关条款不存在任何疑问或异议，并对协议双方的权利、义务、责任与风险有清楚和准确的理解。。</li>
                                                <li className="nt-agreement-cell">7.2甲方保证所使用的资金为合法取得，且甲方对该等资金拥有完全且无瑕疵的处分权。 若第三方对加入资金归属、合法性等问题提出异议，由甲方自行解决，并承担因此给乙方及借款项目项下交易相对方造成的损失。</li>
                                                <li className="nt-agreement-cell">7.3甲方承诺，不得利用乙方平台进行信用卡套现、洗钱或其他违法、违纪行为，否则应依法承担由此产生的法律责任与后果。</li>
                                        </ul>
                                </li>
                                <li className="nt-agreement-cell">
                                        <h4 className="nt-agreement-tag3">第8条 意外事件  </h4>
                                        <ul className="nt-agreement-list">
                                                <li className="nt-agreement-cell">
                                                        如因司法机关或行政机关对甲方采取强制措施，导致甲方丰收盈服务计划加入资金及收益被全部或部分扣划，则甲方就对应金额将不再享有收益。但甲方仍应按照本协议第5条约定支付相关服务费用。
                                                </li>
                                        </ul>
                                </li>
                                <li className="nt-agreement-cell">
                                        <h4 className="nt-agreement-tag3">第9条 违约责任 </h4>
                                        <ul className="nt-agreement-list">
                                                <li className="nt-agreement-cell">在本合同有效期内，一方违反本合同之任何条款，致使相关方遭受损失时，违约方须赔偿因此给对方造成的一切经济损失（包括但不限于诉讼/仲裁费用、律师费用、评估费、保全及担保费、交通费、差旅费、调查费及其他实现债权所产生的费用等）；双方均有过错的，应根据双方实际过错程度，分别承担各自的违约责任。</li>
                                        </ul>
                                </li>
                                <li className="nt-agreement-cell">
                                        <h4 className="nt-agreement-tag3">第10条 关于法律适用及管辖 </h4>
                                        <ul className="nt-agreement-list">
                                                <li className="nt-agreement-cell">
                                                        10.1 适用法律：
                                                        <ul className="nt-agreement-list">
                                                                <li className="nt-agreement-cell">本协议的全部事项，包括但不限于本协议的效力、解释、履行以及争议的解决均受中国法律管辖；本协议项下任一条款如与中国法律中的强制性规范相抵触，应在该等强制性规范所不禁止的最大限度内进行解释和执行，且任何该等与强制性规范相抵触的约定不应影响本协议其他条款的效力。</li>
                                                        </ul>
                                                </li>
                                                <li className="nt-agreement-cell">
                                                        10.2管辖法院：
                                                        <ul className="nt-agreement-list">
                                                                <li className="nt-agreement-cell">凡因本协议发生的及与本协议有关的任何争议，双方应友好协商解决；协商不成时，可通过诉讼方式解决。所有争议均由乙方所在地人民法院管辖。</li>
                                                        </ul>
                                                </li>
                                        </ul>
                                </li>
                                <li className="nt-agreement-cell">
                                        <h4 className="nt-agreement-tag3">第11条 其他 </h4>
                                        <ul className="nt-agreement-list">
                                                <li className="nt-agreement-cell">11.1本丰收盈服务协议和甲方通过点击确认与乙方签署的用户注册协议等相关协议，以及乙方在本网站不时公示之交易规则、说明、公告等涉及甲乙双方权利义务的法律文件，共同构成了约束甲方接受乙方在本协议项下提供之服务时双方行为的协议之整体。</li>
                                                <li className="nt-agreement-cell">11.2本协议采用电子文本形式制成，可以有一份或者多份并且每一份具有同等法律效力，对各方均具有法律约束力。</li>
                                                <li className="nt-agreement-cell">11.3甲方自行承担本服务计划所获收益的应纳税额。</li>
                                        </ul>
                                </li>
                        </ul>
                </article>
        </Container>
    )
};

module.exports=ServiceAgreement_rich;
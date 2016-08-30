require("../../scss/page/serviceAgreement.scss")
import React from "react";
import Container from "../UIComponents/Container";

function ServiceAgreement_loan_product(){
    return (
        <Container scrollable={true} className="protocol">
                <article className="nt-agreement-article">
                        <ul className="nt-agreement-list">
                                <li className="nt-agreement-cell">甲方（出借人）：姓名【    】身份证号码【    】 用户名【    】  住所地【    】联系电话【    】</li>
                                <li className="nt-agreement-cell">乙方（借款人）：姓名【    】身份证号码【    】 用户名【    】  住所地【    】联系电话【    】</li>
                                <li className="nt-agreement-cell">丙方（平台方）：【深圳市农泰金融服务有限公司】</li>
                                <li className="nt-agreement-cell">法 定 代 表 人：陈   会</li>
                                <li className="nt-agreement-cell">住         所：深圳市南山区冲商务中心2栋3号楼22层CD单元</li>
                        </ul>
                        <h2 className="nt-agreement-tag1">一、定义：</h2>
                        <ul className="nt-agreement-list"><li className="nt-agreement-cell">除非本协议另有规定，以下词语在本协议中定义如下：</li></ul>
                        <ul className="nt-agreement-list">
                                <li className="nt-agreement-cell">1.1出借人（甲方）：指通过平台方运营管理的农泰金融平台成功注册账户的会员，可出借一定数量资金给借款人，具有完全民事权利及行为能力的自然人。</li>
                                <li className="nt-agreement-cell">1.2借款人（乙方）：指有一定的资金需求，在农泰金融平台注册账户，具有完全民事权利及行为能力的自然人。</li>
                                <li className="nt-agreement-cell">1.3借款：出借人向借款人提供的借款。</li>
                                <li className="nt-agreement-cell">1.4农泰金融平台：指平台方运营管理的PC端：www.ntjrchina.com 和APP客户端。</li>
                                <li className="nt-agreement-cell">1.5农泰金融平台账户：指出借人、借款人以自身名义在农泰金融平台注册后系统生成的账户，可以通过第三方支付机构及/或其他通道进行充值或提现。</li>
                                <li className="nt-agreement-cell">就借款人通过由平台方运营管理的农泰金融平台向出借人借款等事宜，各方根据平等、自愿的原则，达成如下协议，且本协议构成借款人、平台方签署的《农泰金融业务合作协议》不可分割的组成部分。</li>
                        </ul>

                        <ul className="nt-agreement-list">
                                <li className="nt-agreement-cell">
                                        <h4 className="nt-agreement-tag3">二、借款金额及期限</h4>
                                        <ul className="nt-agreement-list">
                                                <li className="nt-agreement-cell">借款人同意通过农泰金融平台向出借人借款如下，出借人同意通过农泰金融平台向借款人发放该等借款：</li>
                                                <li className="nt-agreement-cell">
                                                        借款详细用途 	[购买农资]
                                                        <ul className="nt-agreement-list">
                                                                <li className="nt-agreement-cell">借款本金数额（小写）：【    】</li>
                                                                <li className="nt-agreement-cell">借款本金数额（大写）：【    】</li>
                                                                <li className="nt-agreement-cell">借款预期年化  【      】%</li>
                                                                <li className="nt-agreement-cell">借款期限 	   【      】个月</li>
                                                                <li className="nt-agreement-cell">还款方式	   【      】</li>
                                                                <li className="nt-agreement-cell">从出借人出借资金划入借款人会员账户次日起计息，详情见还款计划表</li>
                                                        </ul>
                                                </li>
                                        </ul>
                                </li>
                                <li className="nt-agreement-cell">
                                        <h4 className="nt-agreement-tag3">三、各方的权利和义务</h4>
                                        <ul className="nt-agreement-list">
                                                <li className="nt-agreement-cell">
                                                        3.1甲方的权利和义务
                                                        <ul className="nt-agreement-list">
                                                                <li className="nt-agreement-cell">3.1.1甲方应按照合同约定的借款日将足额的借款本金支付给乙方。</li>
                                                                <li className="nt-agreement-cell">3.1.2甲方享有其所出借款项所带来的利息收益。</li>
                                                                <li className="nt-agreement-cell">3.1.3甲方可以根据自己的意愿进行本协议项下其对乙方债权的转让，无需经过月乙方同意。甲方对该项债权进行转让后，乙方需对债权受让人继续履行本协议下其对甲方的还款义务，不得以未接到债权转让通知为由拒绝履行还款义务。</li>
                                                                <li className="nt-agreement-cell">3.1.4如乙方的还款不足约定的本金，甲方同意各自按照其借出款项比列收取还款。</li>
                                                        </ul>
                                                </li>
                                                <li className="nt-agreement-cell">
                                                        3.2乙方的权利和义务
                                                        <ul className="nt-agreement-list">
                                                                <li className="nt-agreement-cell">3.2.1乙方必须按期足额向甲方偿还本金和利息。</li>
                                                                <li className="nt-agreement-cell">3.2.2乙方承诺所借款项不用于任何非法用途，乙方在获得借款后需将该款项直接支付给指定厂商用于购买农用物资（主要包括：农药、化肥、种子等），以保证专款专用。</li>
                                                                <li className="nt-agreement-cell">3.2.3乙方应确保其提供信息和资料的真实性，不得提供虚假信息或隐瞒重要事实。</li>
                                                        </ul>
                                                </li>
                                                <li className="nt-agreement-cell">
                                                        3.3丙方的权利和义务
                                                        <ul className="nt-agreement-list">
                                                                <li className="nt-agreement-cell">3.3.1丙方是依法设立的专门从事网络借贷信息中介业务活动的金融信息中介企业，主要以互联网为主要渠道，为甲方和乙方实现直接贷款提供信息搜集、公布、交互和资信评估、借贷撮合等服务。</li>
                                                                <li className="nt-agreement-cell">3.3.2丙方为甲方和乙方提供3.3.1款所述服务的同时，丙方有权向乙方收取平台服务费，该平台服务费的相关事宜在《农泰金融业务合作协议》和《提款申请书》中另行约定。</li>
                                                                <li className="nt-agreement-cell">3.3.3丙方须确保甲方和乙方信息采集、处理及使用的合法性和安全性，除法律法规另有规定外，丙方不得在未经甲方和乙方同意的情况下将甲方和乙方的信息用作除本款第一条外的其它用途。</li>
                                                        </ul>
                                                </li>
                                        </ul>
                                </li>
                                <li className="nt-agreement-cell">
                                        <h4 className="nt-agreement-tag3">四、借款流程</h4>
                                        <ul className="nt-agreement-list">
                                                <li className="nt-agreement-cell">
                                                        4.1 本协议成立：
                                                        <p className="nt-agreement-paragraph">
                                                                出借人按照农泰金融平台的规则，通过在农泰金融平台上对借款人发布的借款需求点击“立即投资”确认时，本协议立即成立。
                                                        </p>
                                                </li>
                                                <li className="nt-agreement-cell">
                                                        4.2 出借资金冻结：
                                                        <ul className="nt-agreement-list">
                                                                <li className="nt-agreement-cell">出借资金冻结：出借人点击“立即投资”即视为其已经向平台方发出不可撤销的授权指令，授权平台方在出借人账户中，冻结金额等同于本协议第一条所列的“借款本金数额”的资金。上述冻结在本协议生效时或本协议确定失效时解除。</li>
                                                        </ul>
                                                </li>
                                                <li className="nt-agreement-cell">
                                                        4.3 本协议生效：
                                                        <ul className="nt-agreement-list">
                                                                <li className="nt-agreement-cell">本协议在借款人发布的借款需求全部得到满足，且借款人借款需求所对应的资金已经全部冻结时立即生效。</li>
                                                        </ul>
                                                </li>
                                                <li className="nt-agreement-cell">
                                                        4.4 出借资金划转：
                                                        <ul className="nt-agreement-list">
                                                                <li className="nt-agreement-cell">本协议生效时，借款人即授权（不可撤销）平台方委托相应的第三方支付机构或资金监管机构，将金额等同于本协议第一条所列的“借款本金数额”的资金，由出借人农泰金融平台账户下对应之银行帐号划转至借款人农泰金融平台账户，借款人农泰金融平台账户收到出借人出借资金，即视为借款发放成功，借款人应按照本协议约定承担还本付息的义务。</li>
                                                        </ul>
                                                </li>
                                        </ul>
                                </li>
                                <li className="nt-agreement-cell">
                                        <h4 className="nt-agreement-tag3">五、 借款资金来源保证 </h4>
                                        <ul className="nt-agreement-list">
                                                <li className="nt-agreement-cell">出借人保证其所用于出借的资金来源合法，出借人是该资金的合法所有人，如果第三方对资金归属、合法性问题提出异议，由出借人自行解决。如出借人未能解决，则放弃享有其所出借资金所带来的利息收益。</li>
                                        </ul>
                                </li>
                                <li className="nt-agreement-cell">
                                        <h4 className="nt-agreement-tag3">六、关于保证金的约定 </h4>
                                        <ul className="nt-agreement-list">
                                                <li className="nt-agreement-cell"> 6.1 为保障出借人利益，借款人需预缴纳一定金额的保证金给甲方，保证金的受益人为甲方。</li>
                                                <li className="nt-agreement-cell"> 6.2甲方同意并委托授权丙方将6.1款所述的保证金存于农泰金融平台账户下，由丙方代为管理。</li>
                                                <li className="nt-agreement-cell"> 6.3 具体的保证金数额比例在《农泰金融业务合作协议》中确定。 </li>
                                                <li className="nt-agreement-cell"> 6.4保证金应在借款人按期并足额还款后返还给借款人，如借款人没有按期足额还款或违反本协议其它约定的，该保证金不予退换。</li>
                                        </ul>
                                </li>
                                <li className="nt-agreement-cell">
                                        <h4 className="nt-agreement-tag3">七、 偿还方式  </h4>
                                        <ul className="nt-agreement-list">
                                                <li className="nt-agreement-cell">7.1 借款人必须按照本《农泰金融借款协议》和《农泰金融业务合作协议》的约定按时、足额偿还对出借人的借款本金和利息。</li>
                                                <li className="nt-agreement-cell">7.2 借款人授权平台方委托其指定的第三方支付机构及合作银行等合作机构，按还款计划金额等同于出借人当期应收金额划转至出借人平台账户下，划转完毕即视为本期还款发放成功。为此，借款人应该保证还款日当日在其平台账户有足额的资金以供当期还款。 </li>
                                                <li className="nt-agreement-cell">7.3 出借人同意：如果还款日遇到法定节假日或公休日，其还款日期相应顺延至节假日后的第一个工作日，还款金额不变。本条例之约定不免除借款人第6.2条的义务。 </li>
                                                <li className="nt-agreement-cell">7.4 还款日期为还款月份中与借款日期对应的日期，当遇到还款月份没有对应的日期，则还款日为应还款当月的最后一日。 </li>
                                                <li className="nt-agreement-cell">7.5借款人的还款按照如下顺序清偿：逾期管理费、逾期罚息、利息、本金。 </li>
                                                <li className="nt-agreement-cell">7.6如借款人还款不足以偿还借款本金、利息和逾期违约金的，出借人同意各自按照其借出款项比例收取还款。 </li>
                                        </ul>
                                </li>
                                <li className="nt-agreement-cell">
                                        <h4 className="nt-agreement-tag3">八、 提前还款  </h4>
                                        <ul className="nt-agreement-list">
                                                <li className="nt-agreement-cell">8.1若乙方在借款期限到期前需要提前还款的，乙方仍需支付给甲方本协议第五款约定的平台服务费，该平台服务费不因乙方提前还款而减少或增加。</li>
                                                <li className="nt-agreement-cell">8.2若乙方在借款期限到期前需要提前还款的，则乙方需在除支付出借人实际借款期内的利息外还需支付给出借人额外3天的利息作为补偿金；</li>
                                                <li className="nt-agreement-cell">8.3借款期限为两个月至六个月之间（包含6个月）的借款人，可按照约定的借款期提前一个月进行还款; 借款期限为六个月以上的借款人，可按照约定的借款期提前两个月进行还款。该提前还款的期间必须是整月（具体的计算方法以《农泰金融借款协议》中的“还款计划表”的预期还款日期为标准）。</li>
                                        </ul>
                                </li>
                                <li className="nt-agreement-cell">
                                        <h4 className="nt-agreement-tag3">九、逾期还款  </h4>
                                        <ul className="nt-agreement-list">
                                                <li className="nt-agreement-cell">9.1若借款人在借款期限到期未足额还款的，除继续按借款预期年化承担利息外，借款人须按下面方式计算向出借人支付逾期罚息和向平台方支付逾期管理费：<br/>
                                                        逾期罚息=未还借款数额×逾期天数/360天×预期年化×110% <br/>
                                                        逾期管理费=未还借款数额×逾期天数×0.002/天（违约系数）
                                                </li>
                                                <li className="nt-agreement-cell">9.2 若借款人逾期还款，则借款人承担出借人、出借人债权受让人等因为实现债权而支出的（包括但不限于）律师费、诉讼费、保全费、执行费、交通费、住宿费等相关费用。</li>
                                                <li className="nt-agreement-cell">9.3借款期间内，逾期违约金的计收标准可根据农泰金融平台相关规则的变化进行相应调整。如相关规则发生变化，则农泰金融平台会在网站公示该等规则的变化。</li>
                                                <li className="nt-agreement-cell">9.4  如在约定还款日借款人未按时还款，出借人同意通过平台方将债权转让给第三方，该第三方在受让债权后，应按约定日期立即向平台方的监管账户转入等同于借款人应当还的借款本息的金额，此时第三方受让出借人对借款人的全部债权。</li>
                                                <li className="nt-agreement-cell">9.5  平台方农泰金融平台监管帐号收到上述款项后，及时按照出借人的借款本息数额，将相应款项转入到出借人农泰金融平台账户下。出借人在本协议项下的该笔借款的所有权利视为已经得到满足和实现，出借人不得再对借款人提出任何请求或主张。出借人在本协议下所享的关于当期债权的全部权利和主张，包括但不限于对借款本息、补偿金、综合服务费等所享有权利和主张，均由债权受让方享有。同时，债权受让方有权向借款人进行追偿，出借人及平台方应提供合理及必要的协助。债权受让方有权以诉讼、债权转让等方式处理债权受让方对借款人的债权。</li>
                                        </ul>
                                </li>
                                <li className="nt-agreement-cell">
                                        <h4 className="nt-agreement-tag3">十、违约责任 </h4>
                                        <ul className="nt-agreement-list">
                                                <li className="nt-agreement-cell">10.1 如果借款人擅自改变本协议第一条规定的借款用途、严重违反本协议义务、提供虚假资料、故意隐瞒重要事实或未经出借人同意擅自转让本协议项下借款债务的视为借款人恶意违约，出借人有权提前终止本协议；借款人须在出借人委平台方提出终止本协议之日起3日内，一次性支付余下的所有本金、利息，平台方再根据其与出借人之间的约定向出借人支付该资金。如借款人违约构成犯罪的，出借人、平台方有权向相关国家机关报案，追究借款人刑事责任。</li>
                                                <li className="nt-agreement-cell">10.2 发生下列任何一项或几项情形的，视为借款人严重违约：
                                                        <p>（1）借款人的任何财产遭受没收、征用、查封、扣押、冻结等可能影响其履约能力的不利事件，且不能及时提供有效补救措施的；</p>
                                                        <p>（2）借款人的财务状况出现影响其履约能力的不利变化，且不能及时提供有效补救措施的。</p>
                                                        若发生上述情形，或根据出借人合理判断借款人可能发生上述的违约事件的，出借人有权自行或委托平台方采取下列任何一项或几项救济措施：
                                                        <p>（1）立即暂缓、取消发放全部或部分借款；</p>
                                                        <p>（2）宣布已发放借款全部提前到期，借款人应立即偿还所有应付款；</p>
                                                        <p>（3）提前终止本协议；</p>
                                                        <p>（4）采取法律、法规以及本协议约定的其他救济措施。</p>
                                                </li>
                                                <li className="nt-agreement-cell">10.3 出借人保留将借款人违约失信的相关信息纳入公民征信系统、向媒体和借款人单位披露的权利。</li>
                                                <li className="nt-agreement-cell">如借款人逾期超过30天，则平台方有权将借款人个人信息（包括但不限于姓名，身份证号，住址，所在地，电话号码，欠款金额等）发布在平台上。</li>
                                        </ul>
                                </li>
                                <li className="nt-agreement-cell">
                                        <h4 className="nt-agreement-tag3">十一、 变更通知 </h4>
                                        <ul className="nt-agreement-list">
                                                <li className="nt-agreement-cell">11.1 本协议签订之日至借款全部清偿之日期间，若借款人向平台方提供的信息（包括但不限于借款人的姓名、身份证号码、住址、电子邮件等信息的变更）发生变更，则借款人应在发生变更之日起的3天内通过农泰金融平台提供更新后的信息给出借人，并提交相应的证明文件。</li>
                                                <li className="nt-agreement-cell">11.2 若因借款人未及时提供上述变更信息而导致的出借人或平台方的调查及诉讼费用应由借款人承担。</li>
                                                <li className="nt-agreement-cell">11.3 各方同意并确认，出借人可将本协议项下全部借款的债权转让予第三方，第三方可以为农泰金融平台的注册用户。</li>
                                                <li className="nt-agreement-cell">11.4 出借人根据本协议转让借款债权时，借款人不可撤销地授权平台方代为接收该等转让通知，通知方式包括但不限电话、短信、电子邮寄、邮箱。债权受让人依法承接出借人在本协议项下的权利和义务。</li>
                                        </ul>
                                </li>
                                <li className="nt-agreement-cell">
                                        <h4 className="nt-agreement-tag3">十二、法律适用及争议解决 </h4>
                                        <ul className="nt-agreement-list">
                                                <li className="nt-agreement-cell">12.1如果本协议中的任何一条或多条违反适用的法律法规，则该条将被视为无效，但该无效条款并不影响本协议其他条款的效力。</li>
                                                <li className="nt-agreement-cell">12.2本协议的签署、变更、修改、补充、有效、解释、履行和执行等均适用中华人民共和国法律。</li>
                                                <li className="nt-agreement-cell">12.3凡因本合同引起的或与本合同有关的争议或纠纷，可由双方协商解决；协商不成时，可向甲方所在地人民法院提起诉讼。</li>
                                        </ul>
                                </li>
                                <li className="nt-agreement-cell">
                                        <h4 className="nt-agreement-tag3">十三、其它约定条款 </h4>
                                        <ul className="nt-agreement-list">
                                                <li className="nt-agreement-cell">13.1 本协议以电子文本形式生成。</li>
                                                <li className="nt-agreement-cell">13.2出借人应自行承担并主动缴纳因利息收益所带来的相关税费。 </li>
                                                <li className="nt-agreement-cell">13.3 借款人将本协议下全部本金、利息、逾期违约金、平台服务费及其他相关费用全部偿还完毕之时，本协议即自动终止。</li>
                                                <li className="nt-agreement-cell">13.4本协议的任何修改、补充均须以农泰金融平台电子文本形式作出。 </li>
                                                <li className="nt-agreement-cell">13.5各方委托平台方农泰金融平台保管所有与本协议有关的书面文件或电子信息。 </li>
                                                <li className="nt-agreement-cell">13.6为了维护甲方（投资人）的利益，保障债权的实现，甲方认可并同意丙方代为其签署《抵押担保合同》、《质押担保合同》、《保证确认函》，同时承诺不会对上述三项合同提出异议。</li>
                                        </ul>
                                </li>
                        </ul>
                        <p>本《农泰金融借款协议》（以下称“本协议”）由甲、乙、丙三方于【   】年【  】月【  】日签订：</p>
                </article>
        </Container>
    )
};

module.exports=ServiceAgreement_loan_product;
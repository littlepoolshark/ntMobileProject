require('../../scss/page/serviceAgreement.scss');
import React from 'react';
import { Link } from 'react-router';

import View from '../UIComponents/View';
import NavBar from '../UIComponents/NavBar';
import Container from '../UIComponents/Container';

import AutoAssignBar from  '../pages/utilities/AutoAssignBar';

let ServiceAgreement_loan_product = React.createClass({

  _handleNavBack() {
    let query = this.props.location && this.props.location.query;
    if(this.props.backToPrevView){
      this.props.backToPrevView();
    }else if (query.beforeComponent && query.beforeComponent === '/') {
      this.context.router.push({
        pathname: 'productList'
      });
    } else {
      this.context.router.goBack();
    }
  },

  render() {
    let backNav = {
      component: 'a',
      icon: 'left-nav',
      title: '返回'
    };

    let isNeedToShowAssignBtn=!!this.props.isNeedToShowAssignBtn;

    return (
      <View>
        <NavBar
          title="借款协议"
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
              <li className="nt-agreement-cell">
                甲方（出借人）： 出借人信息见出借人签章页
              </li>
              <li className="nt-agreement-cell">
                乙方（借款人）：姓名/名称【 】用户名：【 】
              </li>
              <li className="nt-agreement-cell">
                身份证/营业执照号码/统一社会信用代码：【 】
              </li>
              <li className="nt-agreement-cell">法定代表人（如有）：【 】</li>
              <li className="nt-agreement-cell">文书送达地址：【 】</li>
              <li className="nt-agreement-cell">联系电话：【 】</li>
            </ul>

            <ul className="nt-agreement-list">
              <li className="nt-agreement-cell">丙方（平台方）:深圳农泰金融服务有限公司</li>
              <li className="nt-agreement-cell">法定代表人：黄为民</li>
              <li className="nt-agreement-cell">统一社会信用代码：91440300358236624L</li>
              <li className="nt-agreement-cell">住所：深圳市南山区深南大道 9966 号威盛科技大厦 21 层</li>
            </ul>

            <ul class="nt-agreement-list">
              {/*  TODO 此处应有首行缩进两字符  */}
              <li class="indent nt-agreement-cell">
              甲、乙、丙三方就乙方通过由丙方运营管理的农泰金融平台向甲方借款等事宜，各方根据平等、自愿的原则，达成如下协议。本协议及相关附件是借款人与平台方签署的《互联网融资居间服务协议》不可分割的组成部分。              </li>
            </ul>

            <h2 className="nt-agreement-tag1">一、定义：</h2>
            <ul className="nt-agreement-list">
              <li className="nt-agreement-cell">
                除非本协议另有规定，以下词语在本协议中定义如下：
              </li>
            </ul>
            <ul className="nt-agreement-list">
              <li className="nt-agreement-cell">
              1.1 出借人（甲方）：指在平台方运营管理的农泰金融平台成功注册账户为用户，可将一定数量资金通过平台出借给借款人，具有完全民事权利及行为能力的民事主体。              </li>
              <li className="nt-agreement-cell">
                1.2
                借款人（乙方）：指有一定的资金需求，在平台方运营管理的农泰金融平台注册账户，具有完全民事权利及行为能力的民事主体。
              </li>
              <li className="nt-agreement-cell">
                1.3
                平台方（或居间方）：深圳农泰金融服务有限公司，简称“农泰金融”。
              </li>
              <li className="nt-agreement-cell">
                1.4 借款：出借人向借款人提供的贷款。
              </li>
              <li className="nt-agreement-cell">
                1.5
                农泰金融平台：指平台方运营管理的包括“饭米粒”、“农泰金融”等品牌在内的互联网PC端、微信公众号以及手机APP客户端。
              </li>
              <li className="nt-agreement-cell">
                1.6
                农泰金融平台账户：指出借人、借款人以自身名义在农泰金融平台注册并可以通过第三方支付机构及/银行帐户进行充值或提现的第三方机构/银行账户。
              </li>
            </ul>

            <h2 className="nt-agreement-tag1">二、借款明细</h2>
            <ul className="nt-agreement-list">
              <li className="nt-agreement-cell">
                2.1 本借款协议依据编号为【
                】的《互联网融资居间服务协议》之约定签订，与该协议具有同等法律效力。
              </li>
              <li className="nt-agreement-cell">
                2.2
                借款人同意通过农泰金融平台向出借人借款如下，出借人同意通过农泰金融平台向借款人发放该等借款：
                <ul className="nt-agreement-list">
                  <li className="nt-agreement-cell">
                    2.2.1 借款用途：【
                    】，未经出借人书面同意，借款人不得将借款挪作他用。
                  </li>
                  <li className="nt-agreement-cell">
                    2.2.2 借款金额：人民币（大写）【 】元整（¥【 】）。
                  </li>
                  <li className="nt-agreement-cell">
                    2.2.3 借款期限按以下第（【 】）项执行（以下2选1）：
                    <ul className="nt-agreement-list">
                      <li className="nt-agreement-cell">
                        （1）【 】个月，自贷款发放之日计算；
                      </li>
                      <li className="nt-agreement-cell">
                        （2）【 】天，自贷款发放之日计算。
                      </li>
                      <li className="nt-agreement-cell">
                        （贷款发放日：以发放款项到账实际日为准）
                      </li>
                    </ul>
                  </li>
                  <li className="nt-agreement-cell">
                    2.2.4 借款人同意按借款金额【
                    】%为本笔借款缴纳保证金，该保证金支付至深圳农泰金融服务有限公司指定账户进行监管。
                  </li>
                  <li className="nt-agreement-cell">
                    2.2.5 本笔借款的利率按以下第（【 】）种方式执行：
                    <ul className="nt-agreement-list">
                      <li className="nt-agreement-cell">
                        （1）【 】%/年；（2）【 】%/月；（3）【 】%/日。（3选1）
                      </li>
                    </ul>
                  </li>
                  <li className="nt-agreement-cell">
                    2.2.6 本笔借款的还款付息方式按以下第（【 】）种方式执行：
                    <ul className="nt-agreement-list">
                      <li className="nt-agreement-cell">
                        （1）按月付息，到期还本；
                      </li>
                      <li className="nt-agreement-cell">
                        （2）放款时一次性付息，到期还本；
                      </li>
                      <li className="nt-agreement-cell">
                        （3）等额本息，每【 】个月为一个还款期，共分【
                        】期偿还，每期还款￥【 】元。
                      </li>
                      <li className="nt-agreement-cell">
                        （4）其他方式：【 】。
                      </li>
                      <li className="nt-agreement-cell">
                        借款人需按月/期还本或付息的，以后各期还款日为还款月当月【
                        】日（若当月无对应日期的，则以当月最后一个公历日作为还款日，丙方可于放款后以书面或短信或邮件的方式向乙方通知贷款起始日和乙方还款日）。
                      </li>
                    </ul>
                  </li>
                  <li className="nt-agreement-cell">
                    2.2.7
                    借款人同意就本笔借款向深圳农泰金融服务有限公司支付平台服务费，具体付方式及支付标准依双方签订的编号为【
                    】的《互联网融资居间服务协议》约定为准。
                  </li>
                  <li className="nt-agreement-cell">
                    2.2.8 丙方指定保证金收款账户为:
                    <ul className="nt-agreement-list">
                      <li className="nt-agreement-cell">户 名：【 】</li>
                      <li className="nt-agreement-cell">账 户：【 】</li>
                      <li className="nt-agreement-cell">开户行：【 】</li>
                    </ul>
                  </li>
                  <li className="nt-agreement-cell">
                    2.2.9 乙方指定以下账户为借款收款账户:
                    <ul className="nt-agreement-list">
                      <li className="nt-agreement-cell">户 名：【 】</li>
                      <li className="nt-agreement-cell">账 户：【 】</li>
                      <li className="nt-agreement-cell">开户行：【 】</li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>

            <h2 className="nt-agreement-tag1">三、各方的权利和义务</h2>
            <ul className="nt-agreement-list">
              <li className="nt-agreement-cell">
                3.1 甲方的权利和义务
                <ul className="nt-agreement-list">
                  <li className="nt-agreement-cell">
                    3.1.1 甲方应向丙方提供真实、准确、完整的身份等信息。
                  </li>
                  <li className="nt-agreement-cell">
                    3.1.2 了解借款项目信贷风险，确认具有相应的风险认知和承受能力。
                  </li>
                  <li className="nt-agreement-cell">
                    3.1.3 自行承担借贷产生的本息损失。
                  </li>
                  <li className="nt-agreement-cell">
                    3.1.4 甲方应保证出借资金为来源合法的自有资金。
                  </li>
                  <li className="nt-agreement-cell">
                    3.1.5 按照合同约定日期将足额的借款本金支付给乙方。
                  </li>
                  <li className="nt-agreement-cell">
                    3.1.6 甲方享有其所出借款项所带来的利息收益。
                  </li>
                  <li className="nt-agreement-cell">
                    3.1.7 如乙方的还款不足偿还甲方出借的全部本金，甲方同意各自按照其借出款项比例收取还款。
                  </li>
                </ul>
              </li>
              <li className="nt-agreement-cell">
                3.2 乙方的权利和义务
                <ul className="nt-agreement-list">
                  <li className="nt-agreement-cell">
                    3.2.1 乙方应当如实提供甲方及丙方要求提供的文件资料（包括但不限于用户信息及借款项目信息），并配合甲方及丙方对其进行的调查、审查和检查；乙方应确保其提供信息和资料的真实性、准确性、完整性，不得提供虚假信息或隐瞒重要事实。
                  </li>
                  <li className="nt-agreement-cell">
                    3.2.2 提供在所有网贷机构的未偿还借款信息。
                  </li>
                  <li className="nt-agreement-cell">
                    3.2.3 保证借款项目真实、合法，并按照约定用途使用所借款项，不得用于出借等其他目的，不得违反我国法律法规将借款资金投向法律法规禁止的借款用途。
                  </li>
                  <li className="nt-agreement-cell">
                    3.2.4 按照约定向甲方和丙方如实报告影响或可能影响甲方权益的重大信息。
                  </li>
                  <li className="nt-agreement-cell">
                    3.2.5 确保自身具有与借款金额相匹配的还款能力并按照合同约定足额向甲方偿还本金和利息。
                  </li>
                  <li className="nt-agreement-cell">
                    3.2.6 乙方承诺不通过故意变换身份、虚构融资项目、夸大融资项目收益前景等形式进行欺诈借款。
                  </li>
                   <li className="nt-agreement-cell">
                    3.2.7 乙方承诺不同时通过多个网络借贷信息中介机构，或者通过变换项目名称、对项目内容进行非实质性变更等方式，就同一借款项目进行重复融资。
                  </li>
                  <li className="nt-agreement-cell">
                    3.2.8 乙方承诺不在平台方以外的公开场所发布同一融资项目的信息。
                  </li>
                  <li className="nt-agreement-cell">
                    3.2.9 乙方承诺如发现网贷机构提供的服务中含有《暂行办法》第十条所列内容，不得进行交易。
                  </li>
                  <li className="nt-agreement-cell">
                    3.2.10 不从事法律法规和网络借贷有关监管规定禁止从事的其他活动。
                  </li>
                </ul>
              </li>
              <li className="nt-agreement-cell">
                3.3 丙方的权利和义务
                <ul className="nt-agreement-list">
                  <li className="nt-agreement-cell">
                    3.3.1
                    丙方是依法设立的专门从事网络借贷信息中介业务活动的金融信息中介企业，以互联网为主要渠道，依据法律法规及协议约定为甲方与乙方提供直接借贷信息的采集整理、甄别筛选、网上发布，以及资信评估、借贷撮合、融资咨询、在线争议解决等相关服务。
                  </li>
                  <li className="nt-agreement-cell">
                    3.3.2 丙方为甲方和乙方提供 3.3.1 款所述服务的同时，丙方有权按照本协议的约定向乙方收取平台服务费及逾期管理费等费用。
                  </li>
                  <li className="nt-agreement-cell">
                    3.3.3
                    丙方须确保甲方和乙方信息的采集、处理及使用的合法性和安全性，除法律法规另有规定或合同另有约定外，丙方不得在未经甲方和乙方同意的情况下将甲方和乙方的信息用作除本款第一条外的其它用途。
                  </li>
                  <li className="nt-agreement-cell">
                    3.3.4
                    丙方有权根据甲方委托，随时以手机短信、电话、信函、电子邮件或其他合法方式提醒并催告乙方履行还款义务。
                  </li>
                  <li className="nt-agreement-cell">
                    3.3.5
                    丙方有权代理甲方出具相应书面或电子文书，包括但不限于提前结清通知书、代偿申请书、代偿确认书、债权转让书、债权转让通知书、催款函等在本次借款项目中应由甲方出具的相关文件。
                  </li>
                  <li className="nt-agreement-cell">
                    3.3.6
                    丙方有权代理甲方委托律师事务所、催收机构等其他第三方机构开展进行贷后管理、贷款催收等与本次贷款有关的事项。
                  </li>
                  <li className="nt-agreement-cell">
                    3.3.7
                    对甲方与乙方的资格条件、信息的真实性、借款项目的真实性、合法性进行必要审核。
                  </li>
                  <li className="nt-agreement-cell">
                    3.3.8
                    采取措施防范欺诈行为，发现欺诈行为或其他损害甲方利益的情形，及时公告并终止相关网络借贷活动。
                  </li>
                  <li className="nt-agreement-cell">
                    3.3.9
                    持续开展网络借贷知识普及和风险教育活动，加强信息披露工作，引导甲方以小额分散的方式参与网络借贷，确保甲方充分知悉借贷风险。
                  </li>
                  <li className="nt-agreement-cell">
                    3.3.10
                    按照法律法规和网络借贷有关监管规定要求报送相关信息，其中网络借贷有关债权债务信息要及时向有关数据统计部门报送并登记。
                  </li>
                  <li className="nt-agreement-cell">
                    3.3.11
                    妥善保管甲方与乙方的资料和交易信息，不得删除、篡改，不得非法买卖、泄露甲方与乙方的基本信息和交易信息。
                  </li>
                  <li className="nt-agreement-cell">
                    3.3.12
                    依法履行客户身份识别、可疑交易报告、客户身份资料和交易记录保存等反洗钱和反恐怖融资义务。
                  </li>
                  <li className="nt-agreement-cell">
                    3.3.13
                    配合相关部门做好防范查处金融违法犯罪相关工作。
                  </li>
                  <li className="nt-agreement-cell">
                    3.3.14
                    按照相关要求做好互联网信息内容管理、网络与信息安全相关工作。
                  </li>
                  <li className="nt-agreement-cell">
                    3.3.15
                    不得虚构、夸大融资项目的真实性、收益前景，隐瞒融资项目的瑕疵及风险。
                  </li>
                </ul>
              </li>
            </ul>

            <h2 className="nt-agreement-tag1">四、借款流程</h2>
            <ul className="nt-agreement-list">
              <li className="nt-agreement-cell">
                4.1
                本协议生效：本协议在借款人在本协议项下的借款需求全部得到满足立即生效。
              </li>
              <li className="nt-agreement-cell">
                4.2
                出借资金划转：本协议生效时，出借人即授权（不可撤销）平台方委托相应的第三方支付机构或合作银行，将本协议约定的借款金额划至借款人指定收款账户，即视为借款发放成功，借款人应按照本协议约定承担还本付息的义务。
              </li>
              <li className="nt-agreement-cell">
                4.3
                由乙方自身原因导致出借资金划转不能及时到达乙方指定账户，并因此所产生损失及相关费用的，由乙方自行承担。
              </li>
            </ul>

            <h2 className="nt-agreement-tag1">五、借款资金来源保证</h2>
            <ul className="nt-agreement-list">
              <li className="nt-agreement-cell">
                出借人保证其所用于出借的资金来源合法，是资金的合法所有人，如果第三方对资金归属、合法性问题提出异议，由出借人自行解决。
              </li>
            </ul>

            <h2 className="nt-agreement-tag1">六、关于保证金的约定</h2>
            <ul className="nt-agreement-list">
              <li className="nt-agreement-cell">
                6.1
                为保障出借人利益，借款人需向甲方缴纳一定金额的保证金，保证金的受益人为甲方。
              </li>
              <li className="nt-agreement-cell">
                6.2 甲方同意将 6.1
                款所述保证金存于本协议第二条约定的保证金监管账户，并授权委托丙方代为管理。
              </li>
              <li className="nt-agreement-cell">
                6.3 具体的保证金数额或比例按本协议第2.2.4款执行。
              </li>
              <li className="nt-agreement-cell">
                6.4
                保证金在借款人按时足额还款后返还给借款人，如借款人没有按时足额还款或违反本协议其它约定的，丙方有权划扣保证金用于履行乙方的相应还款责任。
              </li>
            </ul>

            <h2 className="nt-agreement-tag1">七、偿还方式</h2>
            <ul className="nt-agreement-list">
              <li className="nt-agreement-cell">
                7.1
                借款人应依照本借款协议第2.2.6款的约定按时足额偿还出借人的借款本金和利息。
              </li>
              <li className="nt-agreement-cell">
                7.2
                借款人授权平台方委托其合作的第三方支付机构或银行等，按本协议约定将当期应还款金额从借款人农泰金融平台账户划转至出借人农泰金融平台账户下，划转完毕即视为本期还款发放成功。为此，借款人应保证其平台账户于还款日当日有足额资金以供当期还款。
              </li>
              <li className="nt-agreement-cell">
                7.3
                出借人同意：如果还款日遇到法定节假日或公休日，其还款日期可提前至节假日前的最后一个工作日，还款金额不变。本条款之约定不免除借款人第7.2条的义务。
              </li>
              <li className="nt-agreement-cell">
                7.4
                还款日期为还款月份中与借款发放日期对应的日期，当遇到还款月份没有对应的日期，则还款日为当月的最后一日。
              </li>
              <li className="nt-agreement-cell">
                7.5
                借款人的还款依序按照如下顺序清偿：逾期管理费、平台服务费、逾期本金、正常利息、正常本金。
              </li>
              <li className="nt-agreement-cell">
                7.6
                如借款人还款不足以偿还出借人借款本金、利息的，出借人同意各自按照其借出款项比例收取还款。
              </li>
            </ul>

            <h2 className="nt-agreement-tag1">八、提前还款</h2>
            <ul className="nt-agreement-list">
              <li className="nt-agreement-cell">
                8.1
                若乙方申请提前还款或者甲方要求乙方提前还款的，乙方仍需支付给丙方第2.2.7款所述的全部平台服务费，该平台服务费不因乙方提前还款而减少或增加。
              </li>
              <li className="nt-agreement-cell">
                8.2
                若乙方申请提前还款的，应当提前三个工作日通知。乙方除按实际用款天数支付正常的借款利息外，须以提前还款的本金为基数额外向出借人支付3天利息作为补偿。
              </li>
            </ul>

            <h2 className="nt-agreement-tag1">九、逾期还款</h2>
            <ul className="nt-agreement-list">
              <li className="nt-agreement-cell">
                9.1
                若借款人在借款期限到期未足额还款的，借款人须按以下计算方式向平台方支付逾期管理费：
              </li>
              <li className="nt-agreement-cell">
                逾期管理费=逾期金额×逾期天数×万分之六/天
              </li>
              <li className="nt-agreement-cell">
                9.2
                若借款人逾期还款，则借款人承担出借人、出借人债权受让人、担保人等因为实现债权而支出的（包括但不限于）律师费、诉讼费、保全费、执行费、交通费、住宿费等相关费用。
              </li>
              <li className="nt-agreement-cell">
                9.3
                借款期内，逾期管理费的计收标准可根据农泰金融平台相关规则的变化进行相应调整。如相关规则发生变化，则农泰金融平台应在网站进行公示。
              </li>
            </ul>

            <h2 className="nt-agreement-tag1">十、债权转让</h2>
            <ul className="nt-agreement-list">
              <li className="nt-agreement-cell">
                10.1
                各方不可撤销地同意并确认，甲方可将本协议项下全部或部分借款债权转让予第三人（债权受让人），但前述第三人应为农泰金融平台注册用户。
              </li>
              <li className="nt-agreement-cell">
                10.2
                各方不可撤销地同意并确认，若甲方转让其债权的，甲方授权丙方将债权转让交易通知担保方、借款人。丙方通过农泰金融网络平台、电子邮件、短信、快递等方式向乙方送达债权转让通知，前述通知构成合法、有效的债权转让通知。
              </li>
              <li className="nt-agreement-cell">
                10.3
                各方不可撤销地同意并确认：借款债权必须通过农泰金融平台进行转让或委托丙方通过其他方式进行。
              </li>
              <li className="nt-agreement-cell">
                10.4
                债权受让方委托丙方将债权受让相应款项转入到出借人农泰金融平台账户后，甲方在本协议下所享有关于该债权的全部权利和主张，包括但不限于借款本息及担保权益等，均由债权受让方享有。债权受让方向乙方进行追偿的，甲方及丙方应提供合理及必要的协助。债权受让方有权以诉讼、债权再次转让等方式处理受让债权。
              </li>
            </ul>

            <h2 className="nt-agreement-tag1">十一、担保</h2>
            <ul className="nt-agreement-list">
              <li className="nt-agreement-cell">
                11.1
                本借款协议项下存在担保方的，担保方对该笔借款承担连带保证责任。
              </li>
              <li className="nt-agreement-cell">
                11.2 担保方的担保范围为：本协议项下借款本金、利息等。
              </li>
              <li className="nt-agreement-cell">
                11.3 担保方的担保期限为：本协议项下借款债务履行期届满之日起两年。
              </li>
              <li className="nt-agreement-cell">
                11.4 保证责任的申请和履行
                <ul className="nt-agreement-list">
                  <li className="nt-agreement-cell">
                    11.4.1
                    乙方未按时足额支付应付款项的，甲方不可撤销地同意并授权丙方代甲方向担保方要求履行保证责任。
                  </li>
                  <li className="nt-agreement-cell">
                    11.4.2
                    在收到丙方要求后，担保方应在担保范围内向甲方代偿相关款项，代偿债务包括乙方尚未偿还的全部借款本金、利息等。
                  </li>
                  <li className="nt-agreement-cell">
                    11.4.3
                    当甲方收到担保方支付的代偿资金后，甲方不可撤销地同意并授权农泰金融以书面或电子数据方式向担保方发送《代偿债务确认书》。
                  </li>
                </ul>
              </li>
              <li className="nt-agreement-cell">
                11.5
                乙方不可撤销地授权甲方、丙方或甲方、丙方委托的第三方合作机构或银行在担保方追偿时将乙方银行还款账户中的资金直接划扣给担保方，用以偿还追偿款项。
              </li>
              <li className="nt-agreement-cell">
                11.6
                本协议项下借款本金发放成功后，甲方不可撤销地同意并授权担保方、丙方及其合法受托人可随时以短信、电话、电子邮件或其他合法方式提醒并催告借款人履行还款义务。
              </li>
              <li className="nt-agreement-cell">
                11.7
                甲方根据本协议约定转让其在本协议项下全部或部分借款债权的，担保方仍在本协议约定的担保范围内承担保证责任。
              </li>
              <li className="nt-agreement-cell">
                11.8 
                除本协议另有约定外，丙方在甲方授权范围内代表甲方处理与担保方的相关事宜。
              </li>
            </ul>

            <h2 className="nt-agreement-tag1">十二、违约责任</h2>
            <ul className="nt-agreement-list">
              <li className="nt-agreement-cell">
                12.1
                如果借款人擅自改变本协议第2.2.1款规定的借款用途，或者严重违反本协议义务、提供虚假资料、故意隐瞒重要事实等则视为借款人恶意违约，出借人有权提前终止本协议。借款人须在平台方（出借人授权委托平台方）发出终止本协议通知之日起
                3
                日内，一次性归还余下的所有本金、利息。如借款人构成犯罪的，出借人、平台方有权向相关国家机关报案，追究借款人刑事责任。
              </li>
              <li className="nt-agreement-cell">
                12.2 发生下列任何一项或几项情形的，视为借款人违约：
                <ul className="nt-agreement-list">
                  <li className="nt-agreement-cell">
                    12.2.1 借款人任意一期还款责任未履行；
                  </li>
                  <li className="nt-agreement-cell">
                    12.2.2
                    借款人主要家庭财产或经营资产遭受没收、征用、查封、扣押、冻结等可能影响其履约能力的不利事件，且不能及时提供有效补救措施的；
                  </li>
                  <li className="nt-agreement-cell">
                    12.2.3
                    借款人的财务状况出现影响其履约能力的不利变化，且不能及时提供有效补救措施的。
                  </li>
                  <li className="nt-agreement-cell">
                    借款人发生上述情形，或出借人、平台方有合理依据判断借款人可能发生上述违约事件的，出借人无条件委托平台方代为采取下列任何一项或几项救济措施：
                    <ul className="nt-agreement-list">
                      <li className="nt-agreement-cell">
                        a.要求借款人限期纠正违约；
                      </li>
                      <li className="nt-agreement-cell">
                        b.立即暂缓、取消发放全部或部分借款；
                      </li>
                      <li className="nt-agreement-cell">
                        c.要求借款人追加或更换保证人、抵押物、出质权利或要求实施或实现此协议项下借款的任何担保权利；
                      </li>
                      <li className="nt-agreement-cell">
                        d.宣布已发放借款全部提前到期，借款人应立即偿还所有应付款；
                      </li>
                      <li className="nt-agreement-cell">e.提前终止本协议；</li>
                      <li className="nt-agreement-cell">
                        f.提起诉讼或仲裁并要求借款人清偿本金利息以及债权人实现债权的全部费用；
                      </li>
                      <li className="nt-agreement-cell">
                        g.采取法律、法规以及本协议约定的其他救济措施。
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li className="nt-agreement-cell">
                12.3
                出借人、平台方保留将借款人违约失信的相关信息纳入征信系统、向媒体和借款人单位披露以及债权公告的权利。
              </li>
              <li className="nt-agreement-cell">
                如借款人逾期超过 30
                天，出借人、平台方或债权受让方均有权将借款人公司或个人信息（包括但不限于借款人姓名（名称）、身份证号（工商登记号）、住址、电话号码、欠款金额等）发布在丙方平台上。
              </li>
            </ul>

            <h2 className="nt-agreement-tag1">十三、变更通知及送达</h2>
            <ul className="nt-agreement-list">
              <li className="nt-agreement-cell">
                13.1
                本协议签订之日至借款全部清偿前，若借款人向平台方提供的相关信息（包括但不限于借款人的姓名、身份证号码、住址、电子邮件等信息）发生变更，则借款人应在发生变更之日起3
                天内向平台方提供变更后的信息，并提交相应的证明文件。
              </li>
              <li className="nt-agreement-cell">
                13.2
                本协议项下的任何文件往来、通知等均按照本协议首部乙方提供的文书送达地址、联系电话等联系方式进行送达，如乙方联系方式发生变化未及时通知丙方的，一切后果由未通知方承担。任何文件在下列日期视为送达：
                <ul className="nt-agreement-list">
                  <li className="nt-agreement-cell">
                    13.2.1
                    以邮寄方式送达的，以签收之日视为送达日；因乙方提供的送达地址不准确、拒不提供送达地址、送达地址变更未书面告知，导致文书未能被受送达人实际接收的，文书被退回之日为送达之日；
                  </li>
                  <li className="nt-agreement-cell">
                    13.2.2 传真或其他电子通讯方式，以发送之日视为送达日；
                  </li>
                  <li className="nt-agreement-cell">
                    13.2.3 专人送达，以收件人签收之日视为送达。
                  </li>
                </ul>
              </li>
            </ul>

            <h2 className="nt-agreement-tag1">十四、法律适用及争议解决</h2>
            <ul className="nt-agreement-list">
              <li className="nt-agreement-cell">
                14.1
                如果本协议中的任何一条或多条违反适用的法律法规，则该条将被视为无效，但该无效条款并不影响本协议其他条款的效力。
              </li>
              <li className="nt-agreement-cell">
                14.2
                本协议的签署、变更、修改、补充、解释、履行和执行等均适用中华人民共和国法律。
              </li>
              <li className="nt-agreement-cell">
                14.3
                凡因本合同引起的或与本合同有关的争议或纠纷，可由三方协商解决；协商不成时，三方均同意以如下第（1）种方式解决：
                <ul className="nt-agreement-list">
                  <li className="nt-agreement-cell">
                    （1）向合同签署地深圳市南山区人民法院提起诉讼。
                  </li>
                  <li className="nt-agreement-cell">
                    （2）向深圳仲裁委员会申请仲裁，仲裁庭的开庭地点选择在深圳市。
                  </li>
                  <li className="nt-agreement-cell">（3）其他方式：【 】</li>
                </ul>
              </li>
            </ul>

            <h2 className="nt-agreement-tag1">十五、其它约定条款</h2>
            <ul className="nt-agreement-list">
              <li className="nt-agreement-cell">
                15.1
                本协议（包括本协议的附件、补充协议等）经各方签字盖章或者通过农泰金融网站或APP等以网络在线点击确认的方式订立。
              </li>
              <li className="nt-agreement-cell">
                15.2 出借人应自行承担并主动缴纳因利息收益所带来的相关税费。
              </li>
              <li className="nt-agreement-cell">
                15.3
                借款人将本协议下全部本金、利息、逾期管理费、平台服务费及其他相关费用全部偿还完毕之时，本协议即自动终止。
              </li>
              <li className="nt-agreement-cell">
                15.4
                本协议项下债权转让给第三方的，不影响本协议关于债权、违约条款、管辖等约定的有效性，债权受让方可依照本协议及债权转让书向乙方追偿。
              </li>
              <li className="nt-agreement-cell">
                15.5
                各方委托平台方农泰金融平台保管所有与本协议有关的书面文件或电子信息。
              </li>
              <li className="nt-agreement-cell">
                15.6 本协议由甲、乙、丙三方于【 】年【 】月【 】日签订，合同签署地为深圳市南山区。
              </li>
              <li className="nt-agreement-cell">（以下无正文）</li>
            </ul>

            <ul className="nt-agreement-list">
              <li className="nt-agreement-cell">
                本页为编号为【 】的《借款协议》的签章页
              </li>
              <li className="nt-agreement-cell">
                甲方（签章）：甲方（出借人）签章见甲方签章页
              </li>
              <li className="nt-agreement-cell">乙方（盖章）：【 】</li>
              <li className="nt-agreement-cell">法定代表人签字（如有）：【 】</li>
              <li className="nt-agreement-cell">丙方（盖章）：【 】</li>
              <li className="nt-agreement-cell">法定代表人签字：【 】</li>
            </ul>

            <ul className="nt-agreement-list">
              <li className="nt-agreement-cell">
                本页为编号为【 】的《借款协议》的甲方签章页
              </li>
              <li className="nt-agreement-cell">
                甲方（出借人）信息及签章如下：
              </li>
            </ul>
            <table>
              <thead>
                <tr>
                  <th>出借人姓名</th>
                  <th>身份证号码</th>
                  <th>出借金额（元）</th>
                  <th>签章</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>【 】</td>
                  <td>【 】</td>
                  <td>【 】</td>
                  <td>【 】</td>
                </tr>
                <tr>
                  <td>【 】</td>
                  <td>【 】</td>
                  <td>【 】</td>
                  <td>【 】</td>
                </tr>
                <tr>
                  <td>【 】</td>
                  <td>【 】</td>
                  <td>【 】</td>
                  <td>【 】</td>
                </tr>
              </tbody>
            </table>
            <h4 className="nt-agreement-tag1">附件：风险提示书</h4>

            <h2 className="nt-agreement-tag1 text-center">风险提示书</h2>
            <ul className="nt-agreement-list">
              <li className="nt-agreement-cell">
              为便于参与网络借贷的出借人和借款人全面正确地理解网贷的风险，根据自身实际需求，谨慎网络投资和网络借款，农泰金融特此提示您在决定出借和借款前仔细阅读以下内容：
            </li>
            <li className="nt-agreement-cell" >禁止任何人利用农泰金融平台或农泰金融平台服务从事任何不符合中国法律法规或侵犯他人权益的活动，禁止在农泰金融平台进行资金套现、洗钱等违法行为，否则您在农泰金融平台的任何违法行为要独立承担全部法律责任。</li>
            <li className="nt-agreement-cell" >农泰金融平台一旦发现您在农泰金融平台从事违法活动，有权采取包括但不限于下列措施：不经通知而立即停止您对农泰金融平台的全部或部分功能的使用、警告当事人立即停止违法行为、向有关部门举报或报案等。</li>
            </ul>

            <h2 className="nt-agreement-tag1">投资有风险，请谨慎投资</h2>
            <h3 className="nt-agreement-tag1">
              一、借贷有风险，投资须谨慎。投资者可以分散投资不同资产类型、不同保障方式、不同产品期限的产品，达到降低风险的效果。
            </h3>
            <h4>网络借贷可能面临的主要风险如下：</h4>
            <ul className="nt-agreement-list">
              <li className="nt-agreement-cell">
                1、
                政策风险：因国家法律、法规、行政规章或政策发生重大调整、变化或其他不可预知的意外事件，导致投资者本息损失。
              </li>
              <li className="nt-agreement-cell">
                2、
                市场风险：资金市场供求关系的变化、货币政策、财政政策、行业政策等因素的变化，导致投资者本息损失。
              </li>
              <li className="nt-agreement-cell">
                3、
                信用风险：无论何种原因，因借款方资金周转原因造成借款本息不能如期兑付，导致投资者本息损失。
              </li>
              <li className="nt-agreement-cell">
                4、
                操作风险：投资者账号密码泄露或被第三人盗用，导致投资者本息损失。
              </li>
              <li className="nt-agreement-cell">
                5、 其他风险：不可抗力风险、流动性风险等，导致投资者本息损失。
              </li>
            </ul>
            <h3 className="nt-agreement-tag1">二、为达到防范欺诈的目的，投资人甄选P2P网络借贷平台时应重点关注以下几点：</h3>
            <ul className="nt-agreement-list">
              <li className="nt-agreement-cell">1、预期年化收益过高，已明显超出常理的平台不适宜选择。</li>
              <li className="nt-agreement-cell">2、团队金融背景不强，风控措施不严格的平台不适宜选择。</li>
              <li className="nt-agreement-cell">3、借贷资金的匹配情况模糊，先吸储再放贷、有资金池嫌疑的平台不适宜选择。</li>
              <li className="nt-agreement-cell">4、刚上线运营，尚无资金撮合经验的平台不适宜选择。</li>
            </ul>

            <h2 className="nt-agreement-tag1">出借人风险提示：</h2>
            <ul className="nt-agreement-list">
              <li className="nt-agreement-cell">1、出借人知晓平台方作为依法成立的网络借贷信息中介机构，是专门从事网络借贷信息中介业务活动的金融信息中介企业；</li>
              <li className="nt-agreement-cell">2、出借人知晓平台方主要为借款人（即贷款人）与出借人实现直接借贷提供信息搜集、信息公布、资信评估、信息交互、借贷撮合等服务，不提供增信服务，不设立资金池，不进行非法集资，不损害国家利益和社会公共利益；</li>
              <li className="nt-agreement-cell">3、出借人了解融资项目信贷风险，认真学习相关的知识，理性谨慎量力而行，具有相应的风险认知和承受能力；</li>
              <li className="nt-agreement-cell">4、出借人需了解根据《最高人民法院关于审理民间借贷案件适用法律若干问题的规定》，民间借贷年利率不超过24%的，法律予以保护;</li>
              <li className="nt-agreement-cell">5、出借人知晓借款人的基本信息，在平台上进行的出借决策均将由出借人本人亲自确认；</li>
              <li className="nt-agreement-cell">6、出借人按照“借贷自愿、诚实守信、责任自负、风险自担”的原则承担借贷风险；</li>
              <li className="nt-agreement-cell">7、出借人应增强自我保护能力，远离非法集资活动，谨防上当受骗，积极主动地行使自己的权利，依法维权；</li>
              <li className="nt-agreement-cell">8、出借人要牢记投资有风险，树立风险意识，增强心理调节能力，避免盲目跟风。</li>
            </ul>

            <h2 className="nt-agreement-tag1">借款人风险提示：</h2>
            <ul className="nt-agreement-list">
              <li className="nt-agreement-cell">1、借款人知晓平台方作为依法成立的网络借贷信息中介机构，是专门从事网络借贷信息中介业务活动的金融信息中介企业；</li>
              <li className="nt-agreement-cell">2、借款人知晓平台方主要为借款人（即贷款人）与出借人实现直接借贷提供信息搜集、信息公布、资信评估、信息交互、借贷撮合等服务，不提供增信服务，不设立资金池，不进行非法集资，不损害国家利益和社会公共利益；</li>
              <li className="nt-agreement-cell">3、借款人必须提供真实、准确、完整的用户信息及融资信息；</li>
              <li className="nt-agreement-cell">4、借款人必须按照约定用途使用借贷资金，不得用于出借等其他目的；</li>
              <li className="nt-agreement-cell">5、借款人在申请借贷时以及借贷债务完全清偿之前，必须按约定向出借人如实、持续地报告影响或可能影响出借人权益的重大信息；</li>
              <li className="nt-agreement-cell">6、借款人需谨记网络借贷应以小额为主，不能对同一项目或变更项目名称等方式在多家平台重复借款；</li>
              <li className="nt-agreement-cell">7、借款人需了解根据《最高人民法院关于审理民间借贷案件适用法律若干问题的规定》，民间借贷年利率不超过24%的，法律予以保护;</li>
              <li className="nt-agreement-cell">8、借款人需诚实守信，有借有还，再借不难，应严格履行借款合同，按时归还本金和利息，避免产生罚息和其它逾期成本；</li>
              <li className="nt-agreement-cell">9、借款人应知晓网络借贷业务正被纳入征信系统，违约行为将影响借款人的信用记录。</li>
            </ul>

            <h2 className="nt-agreement-tag1">特别声明：</h2>
            <ul class="nt-agreement-list">{/*  TODO 此处应有首行缩进两字符  */}
              <li class="indent nt-agreement-cell">本提示书旨在向借款人和出借人揭示网络借贷风险，帮助借款人和出借人评估和确定自身风险承受能力。</li>
              <li class="indent nt-agreement-cell">本提示书披露了网络借贷可能存在的主要风险因素，但无法穷尽所有风险，借款人和出借人应根据自身的风险承受能力、投资经验、财务状况等自行决定是否参与网络借贷。</li>
              <li class="indent nt-agreement-cell">对提示书有任何疑问请及时联系农泰金融平台客服，本提示书经签署即视为已充分了解自身权利义务并具备参与网络借贷的准入条件，且自愿承担因网络借贷行为带来的一切风险。</li>
            </ul>
          </article>
          {
            isNeedToShowAssignBtn ? 
            <AutoAssignBar assignAgreement={this.props.assignAgreement}/> :
            null
          }
          
        </Container>
      </View>
    );
  }
});

ServiceAgreement_loan_product.contextTypes = {
  router: React.PropTypes.object.isRequired
};

module.exports = ServiceAgreement_loan_product;

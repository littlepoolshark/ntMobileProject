require("../../scss/page/serviceAgreement.scss")
import React from "react";
import Container from "../UIComponents/Container";

function ServiceAgreement_creditor_product(){
    return (
        <Container scrollable={true} className="protocol">
                <article className="nt-agreement-article">
                        <p style={{textIndent:"1.5rem"}}>本人/本单位授权贵公司在办理下列业务（打“√”选择）时，可以根据有关规定，通过深圳前海征信中心股份有限公司、鹏元征信有限公司、好贷天下信息技术（北京）有限公司、商业性质的银行机构的信息基础数据库查询、打印、保存本人/本单位信用报告，并向深圳前海征信中心股份有限公司、鹏元征信有限公司、好贷天下信息技术（北京）有限公司、商业性质的银行机构的信用信息基础数据库提供本人/本单位基本信息和信用情况。</p>
                        <ul className="nt-agreement-list" style={{paddingLeft:"1.5rem"}}>
                                <li className="nt-agreement-cell">•	自然人/法人授权申请审查；</li>
                                <li className="nt-agreement-cell">•	自然人/法人担保资格审查；</li>
                                <li className="nt-agreement-cell">•	法人或其他组织申请借贷，需要查询法定代表人及出资人信用状况；</li>
                                <li className="nt-agreement-cell">•	法人或其他组织作为担保人，需要查询法定代表人及出资人信用状况；</li>
                                <li className="nt-agreement-cell">•	异议核查。 </li>
                        </ul>

                        <p style={{textIndent:"1.5rem"}}>本人/本单位同意，在本人/本单位发生与贵公司签署的合同、协议、承诺或其他法律性文件项下的违约时，贵公司有权根据违约情况酌情决定公开本人/本单位的违约信息，并可以根据欠款催收、债权转让等需要将有关信息提供给催收机构、资产管理公司、担保公司等第三方机构。</p>
                        <p style={{textIndent:"1.5rem"}}>以上授权期限为本人作出本授权承诺之日起至本人在贷款人处所有业务终结之日止。</p>
                        <p style={{textIndent:"1.5rem"}}>本协议以电子文本形式生成。本协议的任何修改、补充均须以农泰金融平台电子文本形式作出。</p>
                        <p style={{textIndent:"1.5rem"}}>委托人委托平台方农泰金融平台保管所有与本协议有关的书面文件或电子信息。</p>

                        <h4 className="nt-agreement-tag2" style={{textIndent:"1.5rem"}}>本人/本单位已知悉本《授权书》所有内容的意义以及由此产生的法律效力，自愿作出上述授权，本《授权书》是本人真实的意思表示，本人同意承担由此带来的一切法律后果。</h4>
                        <p>特此授权！</p>
                </article>
        </Container>
    )
};

module.exports=ServiceAgreement_creditor_product;
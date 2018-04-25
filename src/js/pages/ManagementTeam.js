import "../../scss/page/ManagementTeam.scss";
import React from 'react';
import { Container } from "../UIComponents/index";

const ManagementTeam = () => {
    return (
        <Container id="managementTeam" scrollable={true}>
            <section>
                <header>
                    <div className="title">刘刚</div>
                    <div className="subtitle">总经理</div>
                </header>
                <div className="content">
                    西南财大企业管理MBA，具有十余年的保险行业企业管理经验，历任华安保险区域分公司总经理、党委书记，前海财险总部部门总经理及广东区域负责人。
                </div>
            </section>
            <section>
                <header>
                    <div className="title">陈会</div>
                    <div className="subtitle">副总经理兼营销总监</div>
                </header>
                <div className="content">
                    农资上市公司诺普信10余年管理经验，擅长传统销售、直销、企划、管理、渠道运作和市场营销；拥有多年农村金融实践经验，参与银行等金融机构的农村市场调研、风控措施和贷款等全流程设计，对农业产业链互联网金融有独到见解和运作能力。
                </div>
            </section>
            <section>
                <header>
                    <div className="title">罗云</div>
                    <div className="subtitle">技术总监</div>
                </header>
                <div className="content">
                    中山大学计算机科学与技术专业，具有十余年系统建设经验和保险行业从业经验，先后参与了平安财产险核心系统、网上货运险系统等大型项目建设；统筹平安官网的非车险平台建设；在互联网移动应用有深刻认知，主导过多项移动应用的开发建设和应用推广，具有从前台销售、中台管理到后台技术的综合能力。
                </div>
            </section>
            {/* <section>
                <header>
                    <div className="title">江涛</div>
                    <div className="subtitle">财务总监</div>
                </header>
                <div className="content">
                    广西大学会计学专业学士，美国注册管理会计师，美国注册会计师协会会员。曾就职于平安财产保险、大地财产保险、中融人寿保险、众安保险等，具有十五年金融及互联网行业财务管理实战经验，擅长财务战略制定、资金管理、成本控制。
                </div>
            </section> */}
            <section>
                <header>
                    <div className="title">皮昊</div>
                    <div className="subtitle">营销总监</div>
                </header>
                <div className="content">
                    湖南大学毕业，曾就职于平安信托，香港亚联财和东亚银行，十五年金融从业经验，十年金融管理经验。
                </div>
            </section>
            <section>
                <header>
                    <div className="title">朱天保</div>
                    <div className="subtitle">运营总监</div>
                </header>
                <div className="content">
                    长江大学农林经济管理专业学士，曾就职于华安保险、中融人寿、精融汇等， 10余年保险金融及互联网金融领域运营实践经验，具有技术条线与业务条线共同工作经历，复合能力较强。
                </div>
            </section>
        </Container>
    );
};

module.exports=ManagementTeam;
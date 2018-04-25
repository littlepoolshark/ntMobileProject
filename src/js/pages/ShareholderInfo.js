import "../../scss/page/ShareholderInfo.scss";
import React from 'react';
import { Container } from "../UIComponents/index";

const ShareholderInfo = () => {
    return (
        <Container id="shareholderInfo" scrollable={true}>
            <img src={require("../../img/shareholder-table.png")} alt="" className="responsive-img"/>
            <section>
                <div className="title">深圳诺普信农化股份有限公司</div>
                <div className="content">
                    深圳诺普信农化股份有限公司，是一家专业从事农业植保技术研发、产品生产经营及农业技术服务的国家级高新技术企业，深圳市府认定的重点农业龙头企业，国内农药制剂领域第一家上市公司（股票代码002215）。
                </div>
            </section>
            <section>
                <div className="title">深圳市融信南方投资有限公司</div>
                <div className="content">
                    深圳市融信南方投资有限公司于2002年成立。公司经营范围包括投资兴办实业，投资管理咨询，国内贸易，园林工程设计及施工，花卉、苗木种植、水产养殖等。
                </div>
            </section>
        </Container>
    );
};

module.exports=ShareholderInfo;
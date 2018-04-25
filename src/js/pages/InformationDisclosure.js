import "../../scss/page/InformationDisclosure.scss";
import React, { Component } from 'react';
import { Tabs, List, Container } from "../UIComponents/index";


class InformationDisclosure extends Component {
    constructor(props){
        super(props);
        this.state={
            activeKey:parseInt(sessionStorage.getItem("activeKey")) || 0
        }
    }

    _recordActiveKey=(key) => {
        sessionStorage.setItem("activeKey",key);
    }

    render() {
        return (
            <Container id="informationDisclosure" scrollable={true}>
                <Tabs 
                    defaultActiveKey={this.state.activeKey} 
                    onAction={this._recordActiveKey}
                    activeKey={this.state.activeKey}
                >
                    <Tabs.Item
                        title="运营数据"
                        key={0}
                        navStyle={null}
                    >
                        <List>
                            <List.Item
                                href="#/platformSurvey"
                                title="平台概况"
                            />
                            <List.Item
                                href="#/operationReport"
                                title="运营报告"
                            />
                             <List.Item
                                href="#/auditReport"
                                title="审计报告"
                            /> 
                        </List>
                    </Tabs.Item>
                    <Tabs.Item
                        title="关于我们"
                        key={1}
                        navStyle={null}
                    >
                        <List>
                            <List.Item
                                href="#/shareholderInfo"
                                title="股东信息"
                            />
                            <List.Item
                                href="#/companyQualification"
                                title="公司资质"
                            />
                            <List.Item
                                href="#/companyGlories"
                                title="公司荣誉"
                            />
                            <List.Item
                                href="#/managementTeam"
                                title="管理团队"
                            />
                            <List.Item
                                href="#/organizationStructure"
                                title="组织架构"
                            />
                            <List.Item
                                href="#/developmentHistory"
                                title="发展历程"
                            />
                        </List>
                    </Tabs.Item>
                    <Tabs.Item
                        title="投资者教育"
                        key={2}
                        navStyle={null}
                    >
                        <List>
                            <List.Item
                                href="http://www.cbrc.gov.cn/govView_C8D68D4C980A4410B9F4E21BA593B4F2.html"                               
                                title="中国银监会办公厅关于印发网络借贷信息中介机构业务活动信息披露指引的通知"
                            />
                            <List.Item
                                href="http://www.cbrc.gov.cn/govView_4201EF03472544038242EED1878597CB.html"                               
                                title="中国银监会办公厅关于印发网络借贷资金存管业务指引的通知"
                            />
                            <List.Item
                                href="http://www.cbrc.gov.cn/govView_37D312933F1A4CECBC18F9A96293F450.html"
                                title="网络借贷信息中介机构业务活动管理暂行办法"
                            />
                            <List.Item
                                href="http://www.gov.cn/zhengce/content/2016-01/15/content_10602.htm"
                                title="国务院关于印发推进普惠金融发展规划（2016—2020年）的通知"
                            />
                            <List.Item
                                href="http://www.court.gov.cn/fabu-xiangqing-15146.html"
                                title="最高人民法院关于审理民间借贷案件适用法律若干问题的规定"
                            />
                            <List.Item
                                href="#/ArticlesOfNTLaw?articleId=1"
                                title="关于投资人和借款人之间借贷关系的合法性"
                            />
                            <List.Item
                                href="#/ArticlesOfNTLaw?articleId=2"
                                title="关于饭米粒理财提供居间撮合服务的合法性"
                            />
                            <List.Item
                                href="#/ArticlesOfNTLaw?articleId=3"
                                title="借款人通过饭米粒理财获得出借投资收益的合法性"
                            />
                            <List.Item
                                href="#/ArticlesOfNTLaw?articleId=4"
                                title="关于电子合同的合法性"
                            />
                        </List>
                    </Tabs.Item>
                </Tabs>
            </Container>
        );
    }
};

module.exports=InformationDisclosure;
import "../../scss/page/OperationReport.scss";
import React, { Component } from "react";
import { Tabs, Group, Container } from "../UIComponents/index";
import { Link } from "react-router";

const operationReports2016 = [
  {
    title: "2016年第四季度运营报告",
    coverImg: (
      <img
        src={require("../../img/2016report-banner4.jpg")}
        alt=""
        className="responsive-img"
      />
    ),
    url: "http://3c88d243297d.ih5.cn/idea/zT0W_vV#p1"
  },
  {
    title: "2016年第三季度运营报告",
    coverImg: (
      <img
        src={require("../../img/2016report-banner3.jpg")}
        alt=""
        className="responsive-img"
      />
    ),
    url: "http://3c88d243297d.ih5.cn/idea/49WZmtx#p1"
  },
  {
    title: "2016年第二季度运营报告",
    coverImg: (
      <img
        src={require("../../img/2016report-banner2.jpg")}
        alt=""
        className="responsive-img"
      />
    ),
    url:
      "http://a0a74a580720.ih5.cn/idea/dDpoW9w?vxparm=/vxid_1/senderid_63142954d073e345&source=undefined&suid=6E5857C1-FD5E-4F32-8DA5-F154C79FE854&sl=0#p1"
  },
  {
    title: "2016年第一季度运营报告",
    coverImg: (
      <img
        src={require("../../img/2016report-banner1.jpg")}
        alt=""
        className="responsive-img"
      />
    ),
    url:
      "http://a0a74a580720.ih5.cn/idea/OJfWmCC?vxparm=/vxid_1/senderid_63142954d073e345&source=undefined&suid=6E5857C1-FD5E-4F32-8DA5-F154C79FE854&sl=0#p1"
  }
];

const operationReports2017 = [
  {
    title: "2017年第四季度运营报告",
    coverImg: (
      <img
        src={require("../../img/2017report-banner4.jpg")}
        alt=""
        className="responsive-img"
      />
    ),
    url: "https://www.ntjrchina.com/output/reports4.html"
  },
  {
    title: "2017年第三季度运营报告",
    coverImg: (
      <img
        src={require("../../img/2017report-banner3.jpg")}
        alt=""
        className="responsive-img"
      />
    ),
    url: "https://www.ntjrchina.com/dist/run/report2017-3.html"
  },
  {
    title: "2017年第二季度运营报告",
    coverImg: (
      <img
        src={require("../../img/2017report-banner2.jpg")}
        alt=""
        className="responsive-img"
      />
    ),
    url: "https://www.ntjrchina.com/output/reports2.html"
  },
  {
    title: "2017年第一季度运营报告",
    coverImg: (
      <img
        src={require("../../img/2017report-banner1.jpg")}
        alt=""
        className="responsive-img"
      />
    ),
    url: "https://www.ntjrchina.com/output/reports.html"
  }
];

const operationReports2018 = [
  {
    title: "2018年第一季度运营报告",
    coverImg: (
      <img
        src={require("../../img/2018report-banner1.jpg")}
        alt=""
        className="responsive-img"
      />
    ),
    url: `${location.protocol}//${location.host}/output/reports5.html`
  }
];

const OperationReportCard = props => {
  let { title, coverClickHandler, coverImg } = props;

  return (
    <Group onClick={coverClickHandler}>
      <div
        className="title"
        style={{
          fontSize: "0.875rem",
          color: "#333",
          marginBottom: "0.975rem"
        }}
      >
        {title}
      </div>
      {coverImg}
    </Group>
  );
};

class OperationReport extends Component {
  _handleCoverClick = iframeSource => {
    //基于内嵌ih5的页面时，页面会被放大。而不内嵌时，页面显示正常的情况下考虑,
    //如果后台返回的链接地址跟农泰金融是同一个域名之下，则跳转到应用的内部组件中，
    //否则，就跳出当前的SPA，跳转至给定链接地址

    if (!!iframeSource) {
      window.location.href = iframeSource;
    }
  };

  render() {
    return (
      <Container scrollable={true} id="operationReport">
        <Tabs defaultActiveKey={0}>
          <Tabs.Item title="2018" key={0} navStyle={null}>
            {operationReports2018.map((item, index) => {
              return (
                <OperationReportCard
                  {...item}
                  coverClickHandler={this._handleCoverClick.bind(
                    null,
                    item.url
                  )}
                  key={index}
                />
              );
            })}
          </Tabs.Item>
          <Tabs.Item title="2017" key={1} navStyle={null}>
            {operationReports2017.map((item, index) => {
              return (
                <OperationReportCard
                  {...item}
                  coverClickHandler={this._handleCoverClick.bind(
                    null,
                    item.url
                  )}
                  key={index}
                />
              );
            })}
          </Tabs.Item>
          <Tabs.Item title="2016" key={2} navStyle={null}>
            {operationReports2016.map((item, index) => {
              return (
                <OperationReportCard
                  {...item}
                  coverClickHandler={this._handleCoverClick.bind(
                    null,
                    item.url
                  )}
                  key={index}
                />
              );
            })}
          </Tabs.Item>
        </Tabs>
      </Container>
    );
  }
}

OperationReport.contextTypes = {
  router: React.PropTypes.object.isRequired
};

module.exports = OperationReport;

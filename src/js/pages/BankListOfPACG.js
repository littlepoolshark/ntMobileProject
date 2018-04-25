require("../../scss/page/BankListOfPACG.scss");
var BankListOfPACGAction = require("../actions/BankListOfPACGAction.js");
var BankListOfPACGStore = require("../stores/BankListOfPACGStore.js");
import React from "react";

//ui component
import Container from "../UIComponents/Container";
import Group from "../UIComponents/Group";
import List from "../UIComponents/List";
import NavBar from "../UIComponents/NavBar";

let BankListOfPACG = React.createClass({
  getInitialState() {
    return {
      bankList: BankListOfPACGStore.getAll()
    };
  },
  _handleSelectBankCard(bankId, bankName) {
    let query = this.props.location.query;
    let beforeComponent = this.props.location.query.beforeComponent;

    if (bankId !== parseInt(query.bankId)) {
      query.bankId = bankId;
      query.bankName = bankName;
      query.bankCardNo = "";
      query.subbranchBankName = "";
      query.subbranchBankId = "";
    }

    query.hadSelectedNewBank = true;

    this.context.router.push({
      pathname: beforeComponent,
      query: query
    });
  },
  _handleSelectBankCard_upgrade(bankId, bankName) {
    this.props.handleSelectBankCard &&
      this.props.handleSelectBankCard(bankId, bankName);
  },
  _generateEverydayLimitText(everydayLimit) {
    let everydayLimitText = "";
    if (parseInt(everydayLimit) > 0) {
      everydayLimitText = "单日最高限额" + everydayLimit + "元";
    } else {
      everydayLimitText = "单日无限额";
    }
    return everydayLimitText;
  },
  _generateEverySingleDealLimitText(singleLimit) {
    let everySingleDealLimitText = "";
    if (parseInt(singleLimit) > 0) {
      everySingleDealLimitText = "单笔最高限额" + singleLimit + "元";
    } else {
      everySingleDealLimitText = "单笔无限额";
    }
    return everySingleDealLimitText;
  },
  _handleNavClick() {
    //如果用户什么都没做的点击返回按钮，则数据原封不动地返回
    let query = this.props.location.query;
    let beforeComponent = this.props.location.query.beforeComponent;

    this.context.router.push({
      pathname: beforeComponent,
      query: query
    });
  },
  _handleNavClick_upgrade() {
    this.props.handleGoBack && this.props.handleGoBack();
  },
  render() {
    let leftNav = {
      component: "a",
      icon: "left-nav",
      title: "返回"
    };

    return (
      <Container id="bankList" scrollable={true}>
        <NavBar
          title="选择发卡银行"
          leftNav={[leftNav]}
          amStyle="primary"
          onAction={this._handleNavClick_upgrade}
        />
        <Group header="目前支持的银行如下" noPadded>
          <List>
            {this.state.bankList.map((item, index) => {
              return (
                <List.Item
                  title={item.name}
                  subTitle={
                    this._generateEverySingleDealLimitText(item.singleLimit) +
                    "，" +
                    this._generateEverydayLimitText(item.everydayLimit)
                  }
                  media={
                    <img
                      src={item.shortIcon}
                      className="bankCard-logo"
                      alt=""
                    />
                  }
                  href="javascript:void(0)"
                  key={item.id}
                  onClick={this._handleSelectBankCard_upgrade.bind(
                    null,
                    item.id,
                    item.name
                  )}
                />
              );
            })}
          </List>
        </Group>
      </Container>
    );
  },
  componentDidMount() {
    BankListOfPACGAction.getBankListOfPACGFormServer();

    BankListOfPACGStore.bind(
      "change",
      function() {
        this.setState({
          bankList: BankListOfPACGStore.getAll()
        });
      }.bind(this)
    );
  }
});

BankListOfPACG.contextTypes = {
  router: React.PropTypes.object.isRequired
};

module.exports = BankListOfPACG;

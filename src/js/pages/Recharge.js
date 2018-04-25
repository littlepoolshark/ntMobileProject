require("../../scss/page/Recharge.scss");
let RechargeAction = require("../actions/RechargeAction.js");
let RechargeStore = require("../stores/RechargeStore.js");

import React from "react";
import { Link } from "react-router";
import classNames from "classnames";
import cookie from "../lib/cookie";
import getParamObjFromUrl from "../lib/getParamObjFromUrl";
import type from "../lib/type";

import Container from "../UIComponents/Container";
import Button from "../UIComponents/Button";
import Field from "../UIComponents/Field";
import List from "../UIComponents/List";
import Icon from "../UIComponents/Icon";
import Group from "../UIComponents/Group";
import Message from "../UIComponents/Message";
import Modal from "../UIComponents/modal/Modal";
import NavBar from "../UIComponents/NavBar";

let RechargeAmountSelection = React.createClass({
  getInitialState() {
    return {
      currRechargeAmount: 0
    };
  },
  _selectRechargeAmount(amount) {
    this.props.SelectionHandler && this.props.SelectionHandler(amount);
    this.setState({
      currRechargeAmount: amount
    });
  },
  render() {
    let rechargeAmountArr = [10000, 2000, 1000, 500, 100];
    let currRechargeAmount = this.state.currRechargeAmount;
    return (
      <div className="rechargeAmount-selectionBar">
        {rechargeAmountArr.map(
          function(item, index) {
            let spanClass = classNames({
              active: currRechargeAmount === item
            });
            return (
              <span
                className={spanClass}
                onClick={this._selectRechargeAmount.bind(null, item)}
                key={index}
              >
                {item}
              </span>
            );
          }.bind(this)
        )}
      </div>
    );
  }
});

//充值组件
let Recharge = React.createClass({
  getInitialState() {
    return {
      data: RechargeStore.getAll(),
      isLoadingModalOpen: false
    };
  },
  _handleRechargeSubmit() {
    RechargeAction.recharge_upgrade();
  },
  _handleRechargeAmountChange() {
    let rechargeAmount = this.refs.rechargeAmount.getValue();
    let reg = /[^\d\.]/g; //过滤除了数组和点号的字符
    rechargeAmount = rechargeAmount.replace(reg, "");
    if (rechargeAmount.indexOf(".") > -1) {
      //如果是小数点后的位数大于两位的小数,则将其截断为小数点后两位
      if (
        !!rechargeAmount.split(".")[1] &&
        rechargeAmount.split(".")[1].length > 2
      ) {
        rechargeAmount =
          rechargeAmount.split(".")[0] +
          "." +
          rechargeAmount.split(".")[1].slice(0, 2);
      }
    }
    rechargeAmount = rechargeAmount === "" ? 0 : rechargeAmount;
    RechargeAction.changeRechargeAmount(rechargeAmount);
  },
  _selectRechargeAmount(amount) {
    RechargeAction.changeRechargeAmount(amount);
  },
  _handleNavClick() {
    this.context.router.push({
      pathname: "userHome"
    });
  },
  _renderBankCard(cardNo) {
    let cardNo_start = cardNo.slice(0, 4);
    let cardNo_end = cardNo.slice(-4);
    return (
      <div className="bankCard-wrapper">
        <div className="bankCard">
          <Icon classPrefix="imgIcon" name="my-bankCard" />
          <span style={{ fontWeight: "bold" }}>{cardNo_start}</span>
          <span>****</span>
          <span>****</span>
          <span style={{ fontWeight: "bold" }}>{cardNo_end}</span>
        </div>
      </div>
    );
  },
  render() {
    let { rechargeAmount, fullCardNo } = this.state.data;

    let leftNav = {
      component: "a",
      icon: "left-nav",
      title: "返回"
    };

    return (
      <Container {...this.props} scrollable={false} id="recharge">
        <NavBar
          title="充值"
          leftNav={[leftNav]}
          amStyle="primary"
          onAction={this._handleNavClick}
        />
        {this._renderBankCard(fullCardNo)}

        <Group header="" noPadded>
          <div className="header">充值金额</div>
          <List>
            <List.Item nested="input">
              <Field
                type="number"
                label="￥"
                placeholder="充值金额10元起"
                ref="rechargeAmount"
                value={rechargeAmount ? rechargeAmount : ""}
                onChange={this._handleRechargeAmountChange}
              />
            </List.Item>
          </List>
          <div className="footer">
            <Icon classPrefix="imgIcon" name="guarder-icon" />
            资金由平安银行全面存管
          </div>
        </Group>

        <Modal title="" isOpen={this.state.isLoadingModalOpen} role="loading">
          处理中，请稍候...
        </Modal>

        <div className="" style={{ padding: "0 0.9375rem", marginTop: "2rem" }}>
          <Button
            amStyle="primary"
            block
            radius={true}
            onClick={this._handleRechargeSubmit}
          >
            完成充值
          </Button>
        </div>
        <div className="bankQuotaRemark">
          <Link to="bankQuotaTable">限额说明</Link>
        </div>
      </Container>
    );
  },
  componentDidMount() {
    let rechargeAmount = this.props.location.query.rechargeAmount;
    if (rechargeAmount !== undefined) {
      RechargeAction.changeRechargeAmount(rechargeAmount);
    }
    RechargeAction.getBankCardInfoFromServer();

    RechargeStore.bind(
      "change",
      function() {
        this.setState(RechargeStore.getAll());
      }.bind(this)
    );

    RechargeStore.bind("rechargeAmountCheckFailed", function(msg) {
      Message.broadcast(msg);
    });

    RechargeStore.bind("requestIStarting", () => {
      this.setState({
        isLoadingModalOpen: true
      });
    });

    RechargeStore.bind("requestIsEnd", () => {
      this.setState({
        isLoadingModalOpen: false
      });
    });

    RechargeStore.bind("getNextLocationInfoSuccess", nextLocation => {
      window.location.href = nextLocation;
    });

    RechargeStore.bind("getNextLocationInfoFailed", msg => {
      Message.broadcast(msg);
    });
  },
  componentWillUnmount() {
    RechargeStore.clearAll();
  }
});

Recharge.contextTypes = {
  router: React.PropTypes.object.isRequired
};

module.exports = Recharge;

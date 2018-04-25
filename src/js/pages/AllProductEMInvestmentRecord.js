require("../../scss/page/AllProductEMInvestmentRecord.scss");
let AllProductEMInvestmentRecordAction = require("../actions/AllProductEMInvestmentRecordAction.js");
let AllProductEMInvestmentRecordStore = require("../stores/AllProductEMInvestmentRecordStore.js");
import React from "react";

//ui component
import View from "../UIComponents/View";
import NavBar from "../UIComponents/NavBar";
import Container from "../UIComponents/Container";
import Tabs from "../UIComponents/Tabs";
//import Loader from "../UIComponents/Loader";
import Modal from "../UIComponents/modal/Modal";
import List from "../UIComponents/List";
import Icon from "../UIComponents/Icon";

import InvestmentRecordCard from "./utilities/InvestmentRecordCard";
import NoDataHint from "./utilities/NoDataHint";

// 除了月满盈("EM" is short for "except moon")，所有的投资产品的投资记录中心：AllProductEMInvestmentRecord component
let AllProductEMInvestmentRecord = React.createClass({
  getInitialState() {
    return {
      isActionModalOpen: false,
      data: AllProductEMInvestmentRecordStore.getAll()
    };
  },
  _handleNavClick(obj) {
    if (obj.title === "返回") {
      this.context.router.push({
        pathname: "userHome"
      });
    } else {
      this.context.router.push({
        pathname: "assignDebtRecord"
      });
    }
  },
  _handleActionModalClose() {
    this.setState({
      isActionModalOpen: false
    });
  },
  _handleMatchLoanModalClose() {
    this.setState({
      isMatchLoanModalOpen: false
    });
  },
  _handleMatchLoanModalOpen() {
    this.setState({
      isMatchLoanModalOpen: true
    });
  },
  _handleActionModalOpen() {
    this.setState({
      isActionModalOpen: true
    });
  },
  _toggleListType(tabIndex) {
    let mapTabIndexToListType = {
      "0": "apply",
      "1": "hold",
      "2": "success"
    };
    AllProductEMInvestmentRecordAction.toggleListType(
      mapTabIndexToListType[tabIndex + ""]
    );
  },
  _handleCardClick(props) {
    let {
      status,
      productType,
      productId,
      purchaseId,
      loanId,
      creditorId,
      investAmount,
      interestRate,
      interestMonth,
      creId
    } = props;

    let currProductType = this.state.data.currProductType;

    if (status === "apply") {
      //如果是加入中的状态，则跳转到对应的产品的详情页面
      let pathname = "";
      switch (productType) {
        case "new_product":
        case "yyz_product":
        case "jjz_product":
          pathname = "earnSetIntroduction";
          break;
        case "loan_product":
          pathname = "fixedLoanIntroduction";
          break;
        case "creditor_product":
          pathname = "creditorLoanIntroduction";
          break;
        case "rich":
          pathname = "richLoanIntroduction";
          break;
        case "glj":
          pathname = "gljLoanIntroduction";
          break;
        case "ced":
          pathname = "cedLoanIntroduction";
          break;
        case "nyd":
          pathname = "nydLoanIntroduction";
          break;
        default:
          break;
      }
      this.context.router.push({
        pathname: pathname,
        query: {
          type: productType,
          productId: productType === 'creditor_product' ? creId : productId
        }
      });
    } else {
      //否则再根据不同的产品类型跳转到对应的页面
      switch (productType) {
        case "new_product":
        case "yyz_product":
        case "jjz_product":
          this.context.router.push({
            pathname: "matchLoanList",
            query: {
              productType: productType,
              purchaseId: purchaseId
            }
          });
          break;
        case "rich":
        case "loan_product":
        case "creditor_product":
        case "glj":
        case "ced":
        case "nyd":
          this.context.router.push({
            pathname: "repaymentSchedule",
            query: {
              loanId,
              creditorId,
              productType,
              investAmount,
              status,
              interestMonth,
              currProductType
            }
          });
          break;
        default:
          break;
      }
    }
  },
  _handleQueryProductList(productType) {
    AllProductEMInvestmentRecordAction.queryProductListByType(productType);
  },
  _loadMoreData(event) {
    let allProductEMInvestmentRecord = document.getElementById(
      "allProductEMInvestmentRecord"
    );
    let offsetHeight = allProductEMInvestmentRecord.offsetHeight; //元素出现在视口中区域的高度
    let scrollTop = allProductEMInvestmentRecord.scrollTop; //元素已经滚动的距离
    let scrollHeight = allProductEMInvestmentRecord.scrollHeight; //元素总的内容高度

    if (scrollHeight - offsetHeight - scrollTop <= 3) {
      //Loader.show();
      AllProductEMInvestmentRecordAction.getNextPage();
    }
  },
  render() {
    let leftNav = {
      component: "a",
      icon: "left-nav",
      title: "返回"
    };
    let rightNav = {
      component: "a",
      title: "转让进度"
    };

    let { currProductType, applyList, holdList, successList } = this.state.data;

    let mapProductTypeToProductName = {
      all: "全部",
      yyz_product: "月月赚",
      jjz_product: "季季赚",
      rich: "丰收盈",
      loan_product: "好采投",
      creditor_product: "债权转让",
      new_product: "新手标",
      glj: "果乐金",
      ced: "车e贷",
      nyd: "农易贷"
    };

    return (
      <View>
        <NavBar
          title={
            <div
              className="allProductEMInvestmentRecord-navBar"
              onClick={this._handleActionModalOpen}
            >
              {mapProductTypeToProductName[currProductType]}
              <Icon name="down" />
            </div>
          }
          leftNav={[leftNav]}
          rightNav={[rightNav]}
          amStyle="primary"
          onAction={this._handleNavClick}
        />
        <Container
          scrollable={true}
          id="allProductEMInvestmentRecord"
          onScroll={this._loadMoreData}
        >
          <Tabs defaultActiveKey={1} onAction={this._toggleListType}>
            <Tabs.Item title="加入中" key={0} navStyle={null}>
              {applyList.length ? (
                applyList.map((item, index) => {
                  return (
                    <InvestmentRecordCard
                      {...item}
                      key={item.id}
                      clickHandler={this._handleCardClick.bind(null, item)}
                    />
                  );
                })
              ) : (
                <NoDataHint />
              )}
            </Tabs.Item>
            <Tabs.Item title="回款中" key={1} navStyle={null}>
              {holdList.length ? (
                holdList.map((item, index) => {
                  return (
                    <InvestmentRecordCard
                      {...item}
                      key={item.id}
                      clickHandler={this._handleCardClick.bind(null, item)}
                    />
                  );
                })
              ) : (
                <NoDataHint />
              )}
            </Tabs.Item>
            <Tabs.Item title="已结清" key={2} navStyle={null}>
              {successList.length ? (
                successList.map((item, index) => {
                  return (
                    <InvestmentRecordCard
                      {...item}
                      key={item.id}
                      clickHandler={this._handleCardClick.bind(null, item)}
                    />
                  );
                })
              ) : (
                <NoDataHint />
              )}
            </Tabs.Item>
          </Tabs>

          {/* <Loader amStyle="primary" rounded={true} /> */}
        </Container>
        <Modal
          title=""
          ref="actionModal"
          isOpen={this.state.isActionModalOpen}
          role="actions"
          onDismiss={this._handleActionModalClose}
          btnStyle="primary"
          id="actionModal"
        >
          <List>
            <List.Item onClick={this._handleQueryProductList.bind(null, "all")}>
              全部
            </List.Item>
            <List.Item
              onClick={this._handleQueryProductList.bind(null, "yyz_product")}
            >
              月月赚
            </List.Item>
            <List.Item
              onClick={this._handleQueryProductList.bind(null, "jjz_product")}
            >
              季季赚
            </List.Item>
            <List.Item
              onClick={this._handleQueryProductList.bind(null, "loan_product")}
            >
              好采投
            </List.Item>
            <List.Item
              onClick={this._handleQueryProductList.bind(
                null,
                "creditor_product"
              )}
            >
              债权转让
            </List.Item>
            <List.Item
              onClick={this._handleQueryProductList.bind(null, "rich")}
            >
              丰收盈
            </List.Item>
            <List.Item
              onClick={this._handleQueryProductList.bind(null, "new_product")}
            >
              新手标
            </List.Item>
            <List.Item onClick={this._handleQueryProductList.bind(null, "glj")}>
              果乐金
            </List.Item>
            <List.Item onClick={this._handleQueryProductList.bind(null, "ced")}>
              车e贷
            </List.Item>
            <List.Item onClick={this._handleQueryProductList.bind(null, "nyd")}>
              农易贷
            </List.Item>
          </List>
        </Modal>
      </View>
    );
  },
  componentDidMount() {
    let productType = this.props.location.query.currProductType || "all"; //默认是显示全部的的购买记录
    AllProductEMInvestmentRecordAction.getInitialData(productType);

    AllProductEMInvestmentRecordStore.bind(
      "change",
      function() {
        this.setState({
          data: AllProductEMInvestmentRecordStore.getAll(),
          isActionModalOpen: false
        });
      }.bind(this)
    );

    AllProductEMInvestmentRecordStore.bind("noMoreData", function() {
      //在谷歌浏览器的手机模拟器下，Loader.hide()(因为采取的是display：none)所以会触发onScroll事件，
      //进而触发Loader.show(),形成了死循环，界面会出现无休止的闪烁。
      //但是这个问题，在真机上不会出现（ios上也会出现）。
      //Loader.hide();
    });
  },
  componentDidUpdate() {
    //Loader.hide();
  },
  componentWillUnmount() {
    AllProductEMInvestmentRecordStore.clearAll();
  }
});

AllProductEMInvestmentRecord.contextTypes = {
  router: React.PropTypes.object.isRequired
};

module.exports = AllProductEMInvestmentRecord;

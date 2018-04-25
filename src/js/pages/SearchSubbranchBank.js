import "../../scss/page/SearchSubbranchBank.scss";
import SearchSubbranchBankAction from "../actions/SearchSubbranchBankAction";
import SearchSubbranchBankStore from "../stores/SearchSubbranchBankStore";
import React, { Component, PropTypes } from "react";
import { Icon, Field, Modal, Message } from "../UIComponents/index";
import cityMap from "../lib/provinceAndCityMap";

const SubbranchBankList = props => {
  let { data, selectHandler } = props;

  return (
    <ul className="subbranchBankList">
      {data.map((item, index) => {
        return (
          <li
            key={item.text}
            onClick={selectHandler.bind(null, item.id, item.text)}
          >
            {item.text}
          </li>
        );
      })}
    </ul>
  );
};

class SearchSubbranchBank extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isSearchResultEmpty: false,
      data: SearchSubbranchBankStore.getAll()
    };
  }

  _handleNavClick = () => {
    //如果用户什么都没做的点击返回按钮，则数据原封不动地返回
    let query = this.props.location.query;

    this.context.router.push({
      pathname: "registerToPABank",
      query: query
    });
  };

  _handleNavClick_upgrade = () => {
    this.props.handleGoBack && this.props.handleGoBack();
  };

  _handleSelectSubbranchBank = (subbranchBankId, subbranchBankName) => {
    let query = this.props.location.query;

    this.context.router.push({
      pathname: "registerToPABank",
      query: {
        ...query,
        subbranchBankId,
        subbranchBankName
      }
    });
  };

  _handleSelectSubbranchBank_upgrade = (subbranchBankId, subbranchBankName) => {
    this.props.handleSelectSubbranch &&
      this.props.handleSelectSubbranch(subbranchBankId, subbranchBankName);
  };

  _handleFieldValueChange = fieldName => {
    let fieldValue = this.refs[fieldName].getValue();
    SearchSubbranchBankAction.changeFieldValue(fieldValue, fieldName);
  };

  _deleteKeyWord = () => {
    SearchSubbranchBankAction.deleteKeyWord();
  };

  _searchSubbranchBank = () => {
    let { bankId, cityText, provinceText } =
      this.props.location.query || this.props.data;

    let cityId = cityMap.getCityIdByText(provinceText, cityText);

    if (this.state.data.keyWord) {
      SearchSubbranchBankAction.searchSubbranchBank(cityId, bankId);
    } else {
      Message.broadcast("请输入要搜索的关键字");
    }
  };

  _searchSubbranchBank_upgrade = iSearchBankName => {
    let keyWord = this.state.data.keyWord;
    if (this.state.data.keyWord) {
      if (iSearchBankName) {
        SearchSubbranchBankAction.searchBankNameForEnterprise(keyWord);
      } else {
        let { bankId, cityText, provinceText } = this.props.data;
        let cityId = cityMap.getCityIdByText(provinceText, cityText);
        SearchSubbranchBankAction.searchSubbranchBank(cityId, bankId);
      }
    } else {
      Message.broadcast("请输入要搜索的关键字");
    }
  };

  render() {
    let { keyWord, subbranchBankList } = this.state.data;

    let isEmpty = this.state.isSearchResultEmpty;
    let iSearchBankName = this.props.action === "searchBankNameForEnterprise";

    return (
      <div id="searchSubbranchBank">
        <div className="searchForm">
          <div className="navBtn" onClick={this._handleNavClick_upgrade}>
            <Icon name="left-nav" />
          </div>
          <div className="input-wrapper">
            <Field
              placeholder={`请输入关键字 如：${
                iSearchBankName ? "平安银行" : "坂田"
              }`}
              ref="keyWord"
              value={keyWord}
              onChange={this._handleFieldValueChange.bind(null, "keyWord")}
            />
            <div className="deleteBtn-wrapper" onClick={this._deleteKeyWord}>
              <Icon name="input-delete" classPrefix="imgIcon" />
            </div>
          </div>
          <div
            className="searchBtn"
            onClick={this._searchSubbranchBank_upgrade.bind(
              null,
              iSearchBankName
            )}
          >
            搜索
          </div>
        </div>
        <div className="content-wrapper">
          {!isEmpty ? (
            <SubbranchBankList
              data={subbranchBankList}
              selectHandler={this._handleSelectSubbranchBank_upgrade}
            />
          ) : (
            <div className="text-center" style={{ marginTop: "4rem" }}>
              没有搜索结果,请尝试其他关键字！
            </div>
          )}
        </div>
        <Modal title="" isOpen={this.state.isLoading} role="loading">
          查询中，请稍候......
        </Modal>
      </div>
    );
  }

  componentDidMount() {
    SearchSubbranchBankStore.bind("change", () => {
      this.setState({
        data: SearchSubbranchBankStore.getAll(),
        isLoading: false
      });
    });

    SearchSubbranchBankStore.bind("requestIsStarting", () => {
      this.setState({
        isLoading: true
      });
    });

    SearchSubbranchBankStore.bind("requestIsEnd", () => {
      this.setState({
        isLoading: false
      });
    });

    SearchSubbranchBankStore.bind("noSearchResult", () => {
      this.setState({
        isSearchResultEmpty: true
      });
    });

    SearchSubbranchBankStore.bind("searchSuccess", () => {
      this.setState({
        data: SearchSubbranchBankStore.getAll(),
        isSearchResultEmpty: false
      });
    });
  }

  componentWillUnmount() {
    SearchSubbranchBankStore.clearAll();
  }
}

SearchSubbranchBank.contextTypes = {
  router: React.PropTypes.object.isRequired
};

module.exports = SearchSubbranchBank;

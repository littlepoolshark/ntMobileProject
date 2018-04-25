import '../../scss/page/BankQuotaTable.scss';
let BankQuotaTableStore = require('../stores/BankQuotaTableStore');
let BankQuotaTableAction = require('../actions/BankQuotaTableAction');
import React from 'react';
import Container from '../UIComponents/Container';

let BankQuotaTable = React.createClass({
  getInitialState() {
    return BankQuotaTableStore.getAll();
  },
  _formatAmount(amount) {
    if (amount === null) {
      return '未知';
    } else if (amount === 0) {
      return '不限';
    } else if (typeof amount === 'number' || typeof amount === 'string') {
      amount = parseInt(amount, 10);
      return amount >= 10000 ? amount / 10000 + '万' : amount;
    }
  },
  _renderRecordList() {
    return this.state.list.map((item, index) => {
      return (
        <tr key={String(index)}>
          <td>{item.name}</td>
          <td>{this._formatAmount(item.singleLimit)}</td>
          <td>{this._formatAmount(item.everydayLimit)}</td>
          <td>{this._formatAmount(item.everymonthLimit)}</td>
        </tr>
      );
    });
  },
  render() {
    return (
      <Container id="bankQuotaTable" scrollable>
        <table>
          <thead>
            <tr>
              <th>银行</th>
              <th>单笔限额</th>
              <th>单日限额</th>
              <th>单月限额</th>
            </tr>
          </thead>
          <tbody>{this._renderRecordList()}</tbody>
        </table>
      </Container>
    );
  },
  componentDidMount() {
    BankQuotaTableAction.getBankQuotaListFormServer();
    BankQuotaTableStore.bind(
      'change',
      function() {
        this.setState(BankQuotaTableStore.getAll());
      }.bind(this)
    );
  }
});

export default BankQuotaTable;

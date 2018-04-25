var MicroEvent = require('../lib/microevent.js');
var appDispatcher = require('../dispatcher/dispatcher.js');
var ajax = require('../lib/ajax.js');

var BankQuotaTableStore = {
  _all: {
    list: []
  },
  getAll() {
    return this._all;
  },
  updateAll(list) {
    this._all.list = list;
  }
};
MicroEvent.mixin(BankQuotaTableStore);

appDispatcher.register(function(payload) {
  switch (payload.actionName) {
    case 'getBankQuotaListFormServer':
      ajax({
        ciUrl: '/user/v2/queryBankQuotaParam',
        success(rs) {
          if (rs.code === 0) {
            BankQuotaTableStore.updateAll(rs.data);
            BankQuotaTableStore.trigger('change');
          }
        }
      });
      break;
    default:
    //no op
  }
});

module.exports = BankQuotaTableStore;

import React from "react";
import List from "../UIComponents/List";
import UpgradeToPABankInterceptModal from "./utilities/UpgradeToPABankInterceptModal";

const ModifyOrResetDealPWForPABank = props => {
  return (
    <List>
      <List.Item
        href="javascript:void(0)"
        title="修改交易密码"
        onClick={() => {
          UpgradeToPABankInterceptModal.modifyDealPW();
        }}
      />
      <List.Item
        href="javascript:void(0)"
        title="重置交易密码"
        onClick={() => {
          UpgradeToPABankInterceptModal.resetDealPW();
        }}
      />
    </List>
  );
};

module.exports = ModifyOrResetDealPWForPABank;

require("../../../scss/page/BankCard.scss");
import React from "react";

import Group from "../../UIComponents/Group";
import Icon from "../../UIComponents/Icon";

// 银行卡信息展示组件
//这是无状态组件，意在整个组件树更新的时候，跳过virtual DOM的diff比较，从而提高性能。
//为了避免一定程度的浪费，react官方还在0.14版本中加入了无状态组件
function BankCard(props) {
  let { bankName, shortIcon: bankLogoUrl, fullCardNo, groupTitle } = props;

  let newCardNo = fullCardNo
    ? fullCardNo.slice(0, 5) + "  ****  " + "****  " + fullCardNo.slice(-4)
    : "";

  return (
    <Group id="bankCard" header={groupTitle ? groupTitle : ""}>
      <div className="bankCard">
        <div className="bankCard-logo">
          <Icon name="my-bankCard2" classPrefix="imgIcon" />
          提现至银行卡
        </div>
        <div className="bankCard-body">
          <div className="title">{newCardNo}</div>
        </div>
      </div>
    </Group>
  );
}

export default BankCard;

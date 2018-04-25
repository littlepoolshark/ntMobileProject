import React from 'react';
import Group from '../../UIComponents/Group';

// 还款保障组件
//这是无状态组件，意在整个组件树更新的时候，跳过virtual DOM的diff比较，从而提高性能。
//为了避免一定程度的浪费，react官方还在0.14版本中加入了无状态组件
function RepaymentDescription() {
  return (
    <Group>
      <h6>
        <span className="title-flag" />还款保障
      </h6>
      <div className="content">
        第一还款人：投资标的借款人到期还款。<br />
        第二还款人：第三方担保人本息担保。<br />
        {/* 第三还款人：深圳市农泰金融服务有限公司千万级风险准备金。 */}
      </div>
    </Group>
  );
}

export default RepaymentDescription;

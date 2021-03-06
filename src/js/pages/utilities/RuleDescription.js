import React from 'react';

//ui component
import Group from '../../UIComponents/Group';

//产品购买规则说明
let RuleDescription = React.createClass({
  propTypes: {
    type: React.PropTypes.string.isRequired
  },
  _renderCouponRule() {
    let CouponRuleText = '';
    switch (this.props.type) {
      case 'new_product':
        CouponRuleText = '不可以使用加息券，不可以使用红包';
        break;
      case 'ttz_product':
      case 'creditor_product':
        CouponRuleText = '不可以使用加息券，不可以使用红包';
        break;
      case 'yyz_product':
        CouponRuleText = '可以使用加息券，不可以使用红包';
        break;
      case 'jjz_product':
      case 'loan_product':
      case 'glj':
      case 'ced':
        CouponRuleText = '可以使用加息券，可以使用红包';
        break;
      default:
        break;
    }

    return (
      <li>
        <span className="icon-limit" />
        {CouponRuleText}
      </li>
    );
  },
  render() {
    let isSupportAdvanceRepayment = this.props.isSupportAdvanceRepayment; //好采投是否有可能提前还款，针对优质标的而言
    return (
      <Group className="rule-description">
        <ul>
          {/*["loan_product","glj","creditor_product","ced"].indexOf(this.props.type) > -1 ?
                        null :
                        (
                            <li><span className="icon-apply"></span>适用风险准备金本息垫付计划</li>
                        )*/}
          {this._renderCouponRule()}
          {isSupportAdvanceRepayment ? (
            <li>
              <span className="icon-advanceLoan" />优质标的，可能提前还款
            </li>
          ) : null}
        </ul>
      </Group>
    );
  }
});

export default RuleDescription;

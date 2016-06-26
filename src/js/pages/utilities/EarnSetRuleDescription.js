import React from "react";

//ui component
import Group from "../../UIComponents/Group";

//产品购买规则说明
let RuleDescription=React.createClass({
    propTypes:{
        type:React.PropTypes.string.isRequired
    },
    _renderCouponRule(){
        let CouponRuleText="";
        switch (this.props.type){
            case "newbieLoan":
                CouponRuleText="不可以使用加息券，不可以使用红包";
                break;
            case "dailyEarn":
                CouponRuleText="不可以使用加息券，不可以使用红包";
                break;
            case "monthlyEarn":
                CouponRuleText="可以使用加息券，不可以使用红包";
                break;
            case "quarterlyEarn":
                CouponRuleText="可以使用加息券，可以使用红包";
                break;
            default :
                break;
        }

        return (
            <li><span className="icon-limit"></span>{CouponRuleText}</li>
        )
    },
    render(){
        return (
            <Group className="rule-description">
                <ul>
                    {
                        this.props.type === "newbieLoan" ?
                            (
                                <li><span className="icon-benefit"></span>加息5.5%，合计15%的年化收益</li>
                            ) : null
                    }
                    <li><span className="icon-apply"></span>使用风险准备金本息垫付计划</li>
                    {this._renderCouponRule()}
                </ul>
            </Group>
        )
    }
});


export default  RuleDescription;

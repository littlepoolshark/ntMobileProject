import React from "react";
import Group from "../../UIComponents/Group";

// 资金保障组件
//这是无状态组件，意在整个组件树更新的时候，跳过virtual DOM的diff比较，从而提高性能。
//为了避免一定程度的浪费，react官方还在0.14版本中加入了无状态组件
function FundGuaranteeDescription(props){
    return (
        <Group>
            <h6>资金保障</h6>
            <div className="content">
                一、用户资金存放以及流转完全通过第三方存管系统，农泰金融不触碰用户交易资金。<br/>
                二、用户资金同卡进出，到期本息返还至用户账户。<br/>
            </div>
        </Group>
    )
}

export  default FundGuaranteeDescription;
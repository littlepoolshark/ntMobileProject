require("../../../scss/page/BankCard.scss");
import React from "react";

import Group from "../../UIComponents/Group";




// 银行卡信息展示组件
//这是无状态组件，意在整个组件树更新的时候，跳过virtual DOM的diff比较，从而提高性能。
//为了避免一定程度的浪费，react官方还在0.14版本中加入了无状态组件
function BankCard(props){
    let {
        bankName,
        shortIcon:bankLogoUrl,
        cardno,
        groupTitle
        }=props;
    return (
        <Group id="bankCard" header={groupTitle ? groupTitle : ""}>
            <div className="bankCard">
                <div className="bankCard-logo" >
                    <img src={bankLogoUrl} alt=""/>
                </div>
                <div className="bankCard-body">
                    <div className="title">{bankName}</div>
                    <div className="subtitle">{cardno}</div>
                </div>
            </div>
        </Group>
    )
}

export  default BankCard;
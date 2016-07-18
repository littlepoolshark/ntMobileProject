import React from "react";

import Group from "../../UIComponents/Group";




// 产品说明组件
//这是无状态组件，意在整个组件树更新的时候，跳过virtual DOM的diff比较，从而提高性能。
//为了避免一定程度的浪费，react官方还在0.14版本中加入了无状态组件
function ProductDescription(props){
    let productDescriptionText=""

    switch (props.type){
        case "new_product":
            productDescriptionText="新手标产品仅针对在农泰金融官网、手机APP、微信、WAP等平台未进行过投资(除天天赚外)的新用户，该系列为短期高收益低风险产品。平台为加入本产品的资金优先投标农泰金融优质借款标的。";
            break;
        case "ttz_product":
            productDescriptionText="天天赚是农泰金融根据投资人的委托，对农泰金融平台100%用户利益保障的借款项目和债权，在系统支持下依据分散投资标准进行自动投标、自动转让的智能投资计划。投资人的加入资金，在满足相关规则的前提下，可在任意时刻申请部分或全部退出以满足您的灵活投资需求。";
            break;
        case "yyz_product":
            productDescriptionText="月月赚是农泰金融为满足投资人多样化理财需求而推出的自动投资工具。加入月月赚的资金自动分散投资到适用于100%用户利益保障的借款项目和债权。服务期满系统将自动进行债权转让，一次性还本付息。给投资人更省心、便捷的投资体验。";
            break;
        case "jjz_product":
            productDescriptionText="季季赚是农泰金融为满足投资人多样化理财需求而推出的自动投资工具。加入季季赚的资金自动分散投资到适用于100%用户利益保障的借款项目和债权。服务期满系统将自动进行债权转让，每月还息到期还本。给投资人更省心、便捷的投资体验。";
            break;
        case "loan_product":
            productDescriptionText="这是好采投的产品说明";
            break;
        case "creditor_product":
            productDescriptionText="这是债权转让的产品说明";
            break;
        default:
            break;
    }

    return (
        <Group>
            <h6>产品说明</h6>
            <div className="content">
                {productDescriptionText}
            </div>
        </Group>
    )
}

export  default ProductDescription;
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
            productDescriptionText="债权转让交易系统是为了提高资金流动性而设计，适用于当农泰金融借款项目债权持有人";
            productDescriptionText +="需要提前转让未到期债权而获得资金流动性的场景。债权持有人可在我的定期投资记录中";
            productDescriptionText +="选择需要出让的债权，投放到债权转让交易系统，债权受让人可在债权转让交易系统中购";
            productDescriptionText +="买被转让的债权，从而完成债权转让。既满足了债权持有人的资金流动性也提供了灵活的";
            productDescriptionText +="理财期限";
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
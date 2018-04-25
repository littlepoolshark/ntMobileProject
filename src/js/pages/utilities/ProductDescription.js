import React from "react";

import Group from "../../UIComponents/Group";




// 产品说明组件
//这是无状态组件，意在整个组件树更新的时候，跳过virtual DOM的diff比较，从而提高性能。
//为了避免一定程度的浪费，react官方还在0.14版本中加入了无状态组件
function ProductDescription(props){
    let {
        totalAmount,
        productApr,
        repaymentLimit,
        preInterestDateStr,
        preRepayDateStr,
        minRate
        }=props;
    let productDescriptionText="";
    let mapTypeToTitle={
        rich:"丰收盈",
        moon:"月满盈"
    };
    let title=["rich","moon"].indexOf(props.type) > -1 ? mapTypeToTitle[props.type] : "产品说明";

    switch (props.type){
        case "new_product":
            productDescriptionText="新手标是饭米粒理财给投资者的特惠加息标的，未在饭米粒理财投资过新手标的用户皆可购买一次。加入新手标的资金会在用户认可的标的范围内，对符合要求的标的自动分撒投资，服务期结束后，新手标将会通过饭米粒理财债权转让退出，一次性还本付息。";
            break;
        case "ttz_product":
            productDescriptionText="天天赚是饭米粒理财根据投资人的委托，对饭米粒理财100%用户利益保障的借款项目和债权，在系统支持下依据分散投资标准进行自动投标、自动转让的智能投资计划。投资人的加入资金，在满足相关规则的前提下，可在任意时刻申请部分或全部退出以满足您的灵活投资需求。";
            break;
        case "yyz_product":
            productDescriptionText="月月赚是饭米粒理财为满足投资人多样化投资需求而推出的自动投资工具。加入月月赚的资金自动分散投资到适用于100%用户利益保障的借款项目和债权。服务期满系统将自动进行债权转让，一次性还本付息。给投资人更省心、便捷的投资体验。";
            break;
        case "jjz_product":
            productDescriptionText="季季赚是饭米粒理财为满足投资人多样化投资需求而推出的自动投资工具。加入季季赚的资金自动分散投资到适用于100%用户利益保障的借款项目和债权。服务期满系统将自动进行债权转让，每月还息到期还本。给投资人更省心、便捷的投资体验。";
            break;
        case "loan_product":
            productDescriptionText="这是好采投的产品说明";
            break;
        case "creditor_product":
            productDescriptionText="债权转让交易系统是为了提高资金流动性而设计，适用于当饭米粒理财借款项目债权持有人";
            productDescriptionText +="需要提前转让未到期债权而获得资金流动性的场景。债权持有人可在我的定期投资记录中";
            productDescriptionText +="选择需要出让的债权，投放到债权转让交易系统，债权受让人可在债权转让交易系统中购";
            productDescriptionText +="买被转让的债权，从而完成债权转让。既满足了债权持有人的资金流动性也提供了灵活的";
            productDescriptionText +="投资期限。当日充值金额需等银行方清算成功后，增加到账余额才能购买债权。";
            break;
        case "rich":
            productDescriptionText=(
                <div>
                    <div className="content" style={{marginBottom:"10px"}}>
                        丰收盈是饭米粒理财为出借人制定的高效自动投标计划，参与计划的投资资金，在用户认可的标的范围内，对符合要求的标的进行自动投标，每个月根据利率计算收益并发放到账户余额，期限结束后将参与本金回款到饭米粒理财账户供出借人自主支配继续投资或提取。
                    </div>
                    <div>
                        <span className="label">项目额度：</span>
                        <span className="content">{totalAmount}元</span>
                    </div>
                    <div>
                        <span className="label">历史年化：</span>
                        <span className="content">{productApr + "%"}</span>
                    </div>
                    <div>
                        <span className="label">项目期限：</span>
                        <span className="content">{repaymentLimit}个月</span>
                    </div>
                    <div>
                        <span className="label">起息时间：</span>
                        <span className="content">{preInterestDateStr}</span>
                    </div>
                    <div>
                        <span className="label">到期时间：</span>
                        <span className="content">{preRepayDateStr}</span>
                    </div>
                    <div>
                        <span className="label">还款方式：</span>
                        <span className="content">
                            {
                                repaymentLimit > 1 ?
                                "按月付息到期还本" :
                                "一次性还本付息"
                            }
                        </span>
                    </div>
                    <div>
                        <span className="label">提前退出：</span>
                        <span className="content">不可以提前退出</span>
                    </div>
                    <div>
                        <span className="label">退出到账：</span>
                        <span className="content">本金将会在到期日发放到您个人存管子账户中</span>
                    </div>
                    <div>
                        <span className="label">费用：</span>
                        <span className="content">无需管理费用和退出费用</span>
                    </div>
                </div>
            )
            break;
        case "moon":
            productDescriptionText=(
                <div>
                    <div className="content" style={{marginBottom:"10px"}}>
                        月满盈是饭米粒理财为出借人制定的高效自动投标计划，参与计划的出借人，月满盈在用户认可的标的范围内，对符合要求的标的(按月还息，到期还本)进行自动投标，每个月根据利率计算收益并发放到账户余额，期限结束后将参与本金回款到饭米粒理财账户供出借人自主支配继续投资或提取。
                    </div>
                    <div>
                        <span className="label">项目额度：</span>
                        <span className="content">{totalAmount}元</span>
                    </div>
                    <div>
                        <span className="label">计息方式：</span>
                        <span className="content">{(minRate * 100).toFixed(1) + "%"}起，逐月增息</span>
                    </div>
                    <div>
                        <span className="label">项目期限：</span>
                        <span className="content">最短持有1个月，最长{repaymentLimit}个月</span>
                    </div>
                    <div>
                        <span className="label">预计起息时间：</span>
                        <span className="content">{preInterestDateStr}，实际以项目为准</span>
                    </div>
                    <div>
                        <span className="label">预计到期时间：</span>
                        <span className="content">{preRepayDateStr}</span>
                    </div>
                    <div>
                        <span className="label">还款方式：</span>
                        <span className="content">按月付息到期还本</span>
                    </div>
                    <div>
                        <div className="label">如何退出：</div>
                        <div className="content">
                            1、持有期最短为一个月，并且整月整月增加，投资人可以持有项目到期后退出，亦可在每月申请预约退出期申请提前退出本金，提前退出等待期正常计息；
                        </div>
                        <div className="content">
                            2、购买的本金需一次性全部退出；
                        </div>
                        <div className="content">
                            3、申请预约退出操作：个人中心-月满盈-预约退出。
                        </div>
                    </div>
                    <div>
                        <span className="label">提前退出方式：</span>
                        <span className="content">系统通过债权转让方式完成提前退出，一般48小时内完成。用户持有的债权转让完成的具体时间，视交易情况而定。</span>
                    </div>
                    <div>
                        <span className="label">费用：</span>
                        <span className="content">无需管理费用和退出费用。</span>
                    </div>
                </div>
            );
            break;
        case "glj": 
            productDescriptionText="这是果乐金的产品说明";
            break;
        case "ced":
            productDescriptionText="这是车e贷的产品说明";
            break;
        case "nyd":
            productDescriptionText="这是农易贷的产品说明";
            break;
        default:
            break;
    }

    return (
        <Group>
            <h6><span className="title-flag"></span>{title}</h6>
            <div className="content">
                {productDescriptionText}
            </div>
        </Group>
    )
}

export  default ProductDescription;
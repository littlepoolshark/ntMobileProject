import React from "react";

import Group from "../../UIComponents/Group";
import Icon from "../../UIComponents/Icon";

import mixin from "./mixin";
import CountDown from "./CountDown";



// 产品说明组件
//这是无状态组件，意在整个组件树更新的时候，跳过virtual DOM的diff比较，从而提高性能。
//为了避免一定程度的浪费，react官方还在0.14版本中加入了无状态组件

function ProductIntroduction(props){

    let mapRepaymentTypeToText={
        "xxhb":"按月付息，到期还本",
        "debx":"等额本息",
        "fddebx":props.repaymentPeriod === "twin" ? "等额本息（双月还）" : (props.repaymentPeriod === "season" ? "等额本息（季季还）" : "等额本息（分段式）")
    }

    let ruleOfdebtAssignment="持有满30天后可转让";
    switch (props.repayType) {
        case "xxhb":
        case "debx":
            ruleOfdebtAssignment="持有满30天后可转让";
            break;
        case "fddebx":
            if(props.repaymentPeriod === "twin"){
                ruleOfdebtAssignment="持有满60天后可转让";
            }
            if(props.repaymentPeriod === "season"){
                ruleOfdebtAssignment="持有满90天后可转让";
            }
            break;
        default:
            break;
    }

    let productStatusText=mixin._getProductStatusText(props.type,props.status);
    let isSoldOut=["已售罄","放款中","还款中","已结束"].indexOf(productStatusText) > -1;

    //用于倒数的开始时间戳(毫秒数)，结束时间戳(毫秒数)，倒数的时间段（秒数）
    let startTimeStamp=props.sysCurrentTime || (new Date()).getTime();//先考虑后台返回的系统时间
    let endTimeStamp=props.publishTime + (props.bidDays * 24 * 60 * 60 * 1000);
    let countDownDuration=parseInt((endTimeStamp-startTimeStamp > 0 ? endTimeStamp-startTimeStamp : 0) / 1000);

    //天天赚item
    let item1= { title:"项目名称", content:props.productName };
    let item2= { title:"项目金额", content:props.productMoney };
    let item3= { title:"购买规则", content:"100元起投，且为100的整数倍" };
    let item3_ttz= { title:"购买规则", content:"100元起投，且为100的整数倍，限额10万元" };
    let item4= { title:"起息时间", content:"当日计息"};
    let item5= { title:"投资期限", content:props.repaymentLimit+props.repaymentTypeUnit };
    let item6= { title:"手续费率", content:"无手续费"};
    let item7= { title:"购买优惠", content:"暂不可以使用加息券，红包"};
    let item8= { title:"退出规则", content:"当日可退！不包含正在购买的本金"};

    //月月赚多出来或者不同于天天赚的item
    let item9= { title:"起息时间", content:props.interestDate};
    let item10= { title:"到期时间", content:props.preRepayDate};
    let item11= { title:"购买优惠", content:"可以使用加息券，不可以使用红包"};
    let item12= { title:"退出规则", content: <div>1.期满一次性还本付息<br/>2.月月赚暂不支持提前退出</div>};

    //季季赚多出来或者不同于月月赚的item
    let item13={ title:"购买优惠", content:"可以使用加息券，可以使用红包"};
    let item14= { title:"退出规则", content: <div>1.每月付息，到期付本<br/>2.季季赚暂不支持提前退出</div>};

    //好采投多出来或者不同于天天赚的item
    let item15={
                title:<div className="icon-wrapper"><Icon classPrefix="imgIcon" name="clock-end"></Icon>剩余时间</div>,
                content: countDownDuration && !isSoldOut ? (productStatusText === "预发布" ? "预发布" : <CountDown countDownDuration={countDownDuration} />) : ( productStatusText === "待发布" ?  "待发布" : "已满标")
               };
    let item16={
                title:<div className="icon-wrapper"><Icon classPrefix="imgIcon" name="grey-money-icon"></Icon>还款方式</div>,
                content:mapRepaymentTypeToText[props.repayType]
                };
    let item17={
                title:<div className="icon-wrapper"><Icon classPrefix="imgIcon" name="grey-money-icon2"></Icon>债权转让</div>,
                content:<div className="icon-wrapper">{ruleOfdebtAssignment}<Icon classPrefix="imgIcon" name="grey-questionMark" onClick={props.onQuestionMarkClick ? props.onQuestionMarkClick.bind(null,"descriptionOfCreditor") : null}></Icon></div>
                };
    let item18={
                title:<div className="icon-wrapper"><Icon classPrefix="imgIcon" name="clock-start"></Icon>起息时间</div>,
                content:"放款后的第二天"
                };

    //债权转让多出来或者不同于天天赚的item
    let item19={
                title:<div className="icon-wrapper"><Icon classPrefix="imgIcon" name="clock-start"></Icon>起息时间</div>,
                content:"满标后第二天"
                };
    let item20={
                title:<div className="icon-wrapper"><Icon classPrefix="imgIcon" name="grey-money-icon2"></Icon>二次转让</div>,
                content:<div className="icon-wrapper">{ruleOfdebtAssignment}<Icon classPrefix="imgIcon" name="grey-questionMark" onClick={props.onQuestionMarkClick ? props.onQuestionMarkClick.bind(null,"descriptionOfCreditor") : null}></Icon></div>
                };

    //新手标多出来或者不同于月月赚的item
    let item21= { title:"退出规则", content: <div>1.期满一次性还本付息<br/>2.新手标暂不支持提前退出</div>};
    let item22= { title:"购买规则", content:"100元起投，且为100的整数倍"};

    //将item组合成对应的产品介绍栏目数组
    let new_product=[item1,item2,item22,item9,item10,item5,item6,item7,item21];
    let ttz_product=[item1,item2,item3_ttz,item4,item5,item6,item7,item8];
    let yyz_product=[item1,item2,item3,item9,item10,item5,item6,item11,item12];
    let jjz_product=[item1,item2,item3,item9,item10,item5,item6,item13,item14];
    let loan_product=[item18,item16,item17,item15];
    let creditor_product=[item19,item16,item20,item15];
    let glj_product=[item18,item16,item17,item15];
    let ced_product=[item18,item16,item17,item15];
    let nyd_product=[item18,item16,item17,item15];

    //从产品类型到产品介绍栏目数组的映射
    let productIntroductionObj={
        new_product:new_product,
        ttz_product:ttz_product,
        yyz_product:yyz_product,
        jjz_product:jjz_product,
        loan_product:loan_product,
        creditor_product:creditor_product,
        glj:glj_product,
        ced:ced_product,
        nyd:nyd_product
    };


    return (
        <table >
            <tbody>
            {
                productIntroductionObj[props.type].map((item,index) => {
                    return (
                        <tr key={index+1}>
                            <td className="title">{item.title}</td>
                            <td className="content">{item.content}</td>
                        </tr>
                    )
                })
            }
            </tbody>
        </table>
        )

}

export  default ProductIntroduction;
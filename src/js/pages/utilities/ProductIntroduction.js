import React from "react";

import Group from "../../UIComponents/Group";


// 产品说明组件
//这是无状态组件，意在整个组件树更新的时候，跳过virtual DOM的diff比较，从而提高性能。
//为了避免一定程度的浪费，react官方还在0.14版本中加入了无状态组件

function ProductIntroduction(props){
    //天天赚item
    let item1= { title:"项目名称", content:props.productName };
    let item2= { title:"项目金额", content:props.productMoney };
    let item3= { title:"购买规则", content:"100元起投，且为100的整数倍" };
    let item4= { title:"起息时间", content:"当日起息"};
    let item5= { title:"投资期限", content:props.repaymentLimit+props.repaymentTypeUnit };
    let item6= { title:"手续费率", content:"无手续费"};
    let item7= { title:"购买优惠", content:"暂不可以使用加息券，红包"};
    let item8= { title:"退出规则", content:"随时退出，即时到账"};

    //月月赚多出来或者不同于天天赚的item
    let item9= { title:"起息时间", content:props.interestDate};
    let item10= { title:"到期时间", content:props.preRepayDate};
    let item11= { title:"购买优惠", content:"可以使用加息券，不可以使用红包"};
    let item12= { title:"退出规则", content: <div>1.期满一次性还本付息<br/>2.月月赚暂不支持提前退出</div>};

    //季季赚多出来或者不同于月月赚的item
    let item13={ title:"购买优惠", content:"可以使用加息券，可以使用红包"};
    let item14= { title:"退出规则", content: <div>1.每月付息，到期付本<br/>2.季季赚暂不支持提前退出</div>};

    //好采投多出来或者不同于天天赚的item
    let item15={ title:"剩余时间", content:"剩余时间"};
    let item16={ title:"还款方式", content:"按月结息，到期付本"};
    let item17={ title:"债权转让", content:"持有达到30天，且在标的到期7天前"};
    let item18={ title:"起息日期", content:"放款后的第二日"};

    //债权转让多出来或者不同于天天赚的item
    let item19={ title:"起息日期", content:"成交后的第二日"};
    let item20={ title:"二次转让", content:"持有达到30天，且在标的到期7天前"};

    //新手标多出来或者不同于月月赚的item
    let item21= { title:"退出规则", content: <div>1.期满一次性还本付息<br/>2.新手标暂不支持提前退出</div>};

    //将item组合成对应的产品介绍栏目数组
    let new_product=[item1,item2,item3,item9,item10,item5,item6,item7,item21];
    let ttz_product=[item1,item2,item3,item4,item5,item6,item7,item8];
    let yyz_product=[item1,item2,item3,item9,item10,item5,item6,item11,item12];
    let jjz_product=[item1,item2,item3,item9,item10,item5,item13,item14];
    let loan_product=[item1,item3,item15,item18,item6,item16,item17];
    let creditor_product=[item1,item3,item15,item19,item6,item16,item20];

    //从产品类型到产品介绍栏目数组的映射
    let productIntroductionObj={
        new_product:new_product,
        ttz_product:ttz_product,
        yyz_product:yyz_product,
        jjz_product:jjz_product,
        loan_product:loan_product,
        creditor_product:creditor_product
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
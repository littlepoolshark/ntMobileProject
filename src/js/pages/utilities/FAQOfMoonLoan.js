import React from "react";
import Group from "../../UIComponents/Group";

function FAQOfMoonLoan(){
    return (
        <Group>
            <section>
                <h6>1、月满盈有哪些优势？</h6>
                <div className="content">
                    您好，月满盈产品通过逐月增息以及预约退出的机制，使产品兼具高收益与灵活性特点。逐月增息：在保证灵活性的同时，年化收益率逐月递增，保障您收益的最大化；预约退出：您可以通过预约退出机制合理规划资金的使用，亦能加快债权转让的效率，实现本金尽快退出。
                </div>
            </section>
            <section>
                <h6>2、月满盈的收益计算方式是怎样的？</h6>
                <div className="content">
                    您好，我给您举一个例子，假如您投资一个期限为4个月的月满盈10000元，该月满盈第一个月历史年化为7.0%，第二个月加息0.5%后历史年化为7.5%，依次类推每月加息后，第三个月历史年化为7.8%，第四个月历史年化为8.0%，则您投资该项目获得的所有收益为：
                    <br/>10000*7.0%/12+10000*7.5%/12+10000*7.8%/12+
                    <br/>10000*8.0%/12，
                    <br/>每月利息截取两位小数，利息每月结算，每月利息将会在还息日发放到您的个人存管子账户中。
                </div>
            </section>
            <section>
                <h6>3、月满盈的资金都投给了谁？</h6>
                <div className="content">
                    您好，在您投资的标的起息后，登陆您的饭米粒理财账户，在月满盈管理即可查看到具体的债权明细。饭米粒理财始终坚持做好信息中介的职能定位，为您披露每一笔资金的去向以及每一笔借款的还款情况。
                </div>
            </section>
            <section>
                <h6>4、月满盈如何保障安全？</h6>
                <div className="content">
                    您好，月满盈投资标的都为农泰金融财实地考察、风控严选项目，借款人信用资质好，还款意愿高；同时，每一个月满盈标的都适用于用户资金安全保障计划。
                </div>
            </section>
            <section>
                <h6>5、月满盈如何预约退出？</h6>
                <div className="content">
                    您好，每月还款日后一日到下一个还款日前三日(不包括)，可以申请预约退出本金，您可以预约任何一个还款日后退出本金。申请退出的本金会在还款日后开始退出到个人账户。
                </div>
            </section>
            <section>
                <h6>6、月满盈申请退出的本金何时到账？</h6>
                <div className="content">
                    您好，系统通过债权转让方式完成提前退出本金，一般在预约还息日后48小时内完成。用户持有的债权转让完成的具体时间，视交易情况而定。
                </div>
            </section>
        </Group>
    )
};

export default FAQOfMoonLoan;
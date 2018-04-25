require("../../../scss/page/specialActivity/OpenZXIntroduction.scss");
import React from "react";
import { Tabs } from "../../UIComponents/index";

function OpenZXIntroduction(props) {
    return (
        <div id="openZXIntroduction" >
            <div className="banner-bar">
                <img className="responsive" src={require("../../../img/specialActivity/banner_openPAIntroduction.png")} alt="" />
            </div>
            <div className="introduction-bar1">
                <div className="img-wrapper">
                    <img src={require("../../../img/specialActivity/cbrc_openZXIntroduction.png")} alt="" />
                </div>
                <div className="content">
                    《网络借贷信息中介机构业务活动管理暂行办法》第二十八条规定：<br />
                    网络借贷信息中介机构应当实行自身资金与出借人和借款人资金的隔离管理，并选择符合条件的银行业金融机构作为出借人与借款人的资金存管机构。
                </div>
            </div>
            <div className="introduction-bar2">
                <div className="title text-center">什么是资金存管？</div>
                <div className="subtitle text-center">
                    为每个用户在银行开具独立资金存管子账户，<br />
                    银行根据投资人、借款人的交易指令和合同约定，<br />
                    对资金使用、划付进行管理和监督。
                </div>
                <div><img src={require("../../../img/specialActivity/screenshot1_openZXIntroduction.png")} className="responsive" alt="" /></div>
            </div>
            <div className="introduction-bar3">
                <div className="title text-center">落实监管政策，平台安全系统再升级</div>
                <div><img src={require("../../../img/specialActivity/screenshot2_openPAIntroduction.png")} alt="" className="responsive" /></div>
            </div>
            <div className="introduction-bar4">
                <div className="title text-center">平安银行存管系统操作攻略</div>
                <Tabs>
                    <Tabs.Item
                        title="开通存管"
                        key={0}
                    >
                        <dl>
                            <dt>1.（1）新注册用户：注册成功，首次进入用户中心或当您进行充值、投资或提现时，会收到开通存管提示，点击【马上开通/绑卡】。</dt>
                            <dt>（2）老用户登录：在进行充值、提现、投资时会收到开通存管提示，点击【马上开通/绑卡】。</dt>
                            <dd>
                                <div>
                                    <img src={require("../../../img/specialActivity/screenshot3_openPAIntroduction2.jpg")} alt="" className="responsive" />
                                </div>
                            </dd>
                            <dt>2.填写真实姓名、身份证号、银行卡信息及银行卡预留手机号，核实信息无误后获取验证码并输入，点击【确认开户】</dt>
                            <dd>
                                <div>
                                    <img src={require("../../../img/specialActivity/screenshot3_openPAIntroduction4.png")} alt="" className="responsive" />
                                    <img src={require("../../../img/specialActivity/screenshot3_openPAIntroduction3.jpg")} alt="" className="responsive" />                                    
                                </div>
                            </dd>
                            <dt>3.开户成功</dt>
                            <dd>
                                <div><img src={require("../../../img/specialActivity/screenshot3_openPAIntroduction5.png")} alt="" className="responsive" /></div>
                            </dd>
                        </dl>
                    </Tabs.Item>
                    <Tabs.Item
                        title="充值"
                        key={1}
                    >
                    <dl>
                            <dt>1.找到农泰金融充值入口。</dt>
                            <dd>
                                <div><img src={require("../../../img/specialActivity/recharge-tab-1.png")} alt="" className="responsive" /></div>
                            </dd>
                            <dt>2.输入充值金额（各银行单笔转账额度、每日转账额度不同）——输入验证码——充值。</dt>
                            <dd>
                                <div>
                                    <img src={require("../../../img/specialActivity/recharge-tab-2.jpg")} alt="" className="responsive" />
                                </div>
                            </dd>
                        </dl>
                    </Tabs.Item>
                    <Tabs.Item
                        title="投资"
                        key={2}
                    >
                    <dl>
                            <dt>1.在首页或投资列表中找到想要投资的标的。</dt>
                            <dd>
                                <div><img src={require("../../../img/specialActivity/investment-tab-1.jpg")} alt="" className="responsive" /></div>
                            </dd>
                            <dt>2.进入标的详情页——点击【立即抢购】。</dt>
                            <dd>
                                <div>
                                    <img src={require("../../../img/specialActivity/investment-tab-2.jpg")} alt="" className="responsive" />
                                </div>
                            </dd>
                            <dt>3.输入投资金额——选择优惠券——点击【确认支付】——购买成功。</dt>
                            <dd>
                                <div><img src={require("../../../img/specialActivity/investment-tab-3.jpg")} alt="" className="responsive" /></div>
                            </dd>
                        </dl>
                    </Tabs.Item>
                    <Tabs.Item
                        title="提现"
                        key={3}
                    >
                    <dl>
                            <dt>1.找到农泰金融提现入口。</dt>
                            <dd>
                                <div><img src={require("../../../img/specialActivity/withdraw-tab-1.jpg")} alt="" className="responsive" /></div>
                            </dd>
                            <dt>2.输入提现金额(请注意提现规则)同时获取验证码——输入验证码——立即提现。</dt>
                            <dd>
                                <div>
                                    <img src={require("../../../img/specialActivity/withdraw-tab-2.jpg")} alt="" className="responsive" />
                                </div>
                            </dd>
                        </dl>
                    </Tabs.Item>
                </Tabs>
            </div>
            <div className="introduction-bar5 warmHint">
                <div className="warmHint-header">
                    <img src={require("../../../img/specialActivity/warmHint-header.png")} alt=""/>
                </div>
                <section>
                    <div className="warmHint-title">1、为什么要开通资金存管子账户？</div>
                    <div className="warmHint-content">开通资金存管子账户，您的交易资金将直接流向平安银行，由平安银行进行存管，平台无法触碰您的账户资金；您进行的任何充值、绑卡、提现等与资金相关的操作，均在存管系统中进行资金划拨，由平安银行对您的资金信息进行管理，资金及操作更加安全无忧。</div>
                </section>
                <section>
                    <div className="warmHint-title">2、开通资金存管子账户后，充值、投资、提现会有什么影响？</div>
                    <div className="warmHint-content">充值、投资不受影响；平安银行会在收到提现申请的当日进行受理，实际到账时间以银行结算时间为准。</div>
                </section>
                <section>
                    <div className="warmHint-title">3、平安银行存管系统上线后，用户需要进行什么操作？</div>
                    <div className="warmHint-content">平安银行存管系统上线后，用户在登录饭米粒理财或进行充值、投资、提现等操作时，会收到开通或激活提示信息，按照提示完成开通或激活存管子账户即可。</div>
                </section>
                <section>
                    <div className="warmHint-title">4、平安银行存管系统，支持哪些银行卡绑定？</div>
                    <div className="warmHint-content">目前共支持19家银行绑卡：工商银行、农业银行、中国银行、建设银行、民生银行、交通银行、光大银行、广发银行、兴业银行、平安银行、浦发银行、上海银行、中国邮政储蓄银行、中信银行、招商银行、华夏银行、浙商银行、宁波银行、江苏银行。</div>
                </section>
                <section>
                    <div className="warmHint-title">5、绑定的银行卡，平安银行存管系统不支持怎么办? </div>
                    <div className="warmHint-content">若系统不支持用户绑定的银行卡类型，绑卡将会失败，您可以重新填写系统支持的银行卡类型。</div>
                </section>
                <section>
                    <div className="warmHint-title">6、登录手机号码与已绑定银行卡的预留手机号不一致怎么办？</div>
                    <div className="warmHint-content">
                        <div>① 解绑现有银行卡，重新绑定一张以现有登录手机号作为预留手机号码的银行卡。</div>
                        <div>② 修改预留手机号，去银行卡柜台将已绑定银行卡的预留手机号修改为本平台登录手机号码。</div>
                    </div>
                </section>
                <section>
                    <div className="warmHint-title">7、平安银行存管子账户开通/激活过程中，提示认证信息有误怎么办？</div>
                    <div className="warmHint-content">存管上线后，饭米粒理财将会与平安银行对接您的认证信息，信息正确才能正常开通/激活存管子账户，若您的身份信息存在填写有误或不完善的情况，系统会告知您进行信息的完善。</div>
                </section>
                <section>
                    <div className="warmHint-title">若您的问题得不到解决，请您联系在线客服或者拨打客服热线：<em>4006322688</em></div>
                </section>
            </div>
        </div>
    )
}



module.exports = OpenZXIntroduction;
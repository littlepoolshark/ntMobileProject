require("../../../scss/page/specialActivity/OpenZXIntroduction.scss");
import React from "react";

function OpenZXIntroduction(props){
    return (
        <div id="openZXIntroduction" >
            <div className="banner-bar">
                <img className="responsive" src={require("../../../img/specialActivity/banner_openZXIntroduction.jpg")} alt=""/>
            </div>
            <div className="introduction-bar1">
                <div className="img-wrapper">
                    <img src={require("../../../img/specialActivity/cbrc_openZXIntroduction.png")} alt=""/>
                </div>
                <div className="content">
                    中国银行业监督管理委员会《网络借贷信息中介机构业务活动管理暂行办法》第二十八条规定：
                    网络借贷信息中介机构应当实行自身资金与出借人和借款人资金的隔离管理，并选择符合条件的银行业金融机构作为出借人与借款人的资金存管机构。
                </div>
            </div>
            <div className="introduction-bar2">
                <div className="title text-center">什么是资金存管？</div>
                <div className="subtitle text-center">
                    为每个用户在银行开具独立资金账户，<br/>
                    银行根据投资人、借款人的交易指令和合同约定，对资金使用、划付进行管理和监督
                </div>
                <div><img src={require("../../../img/specialActivity/screenshot1_openZXIntroduction.jpg")} className="responsive" alt=""/></div>
            </div>
            <div className="introduction-bar3">
                <div className="title text-center">资金银行存管有什么优势？</div>
                <div><img src={require("../../../img/specialActivity/screenshot2_openZXIntroduction.png")} alt="" className="responsive"/></div>
            </div>
            <div className="introduction-bar4">
                <div className="title text-center">如何开通存管？</div>
                <dl>
                    <dt>1.银行存管开通指引</dt>
                    <dd>
                        <div className="content">点击“立即开通”</div>
                        <div><img src={require("../../../img/specialActivity/screenshot3_openZXIntroduction.jpg")} alt="" className="responsive"/></div>
                    </dd>
                    <dt>2.开通存管账号</dt>
                    <dd>
                        <div className="content">填写姓名、身份证号码、银行卡以及银行卡预留手机号，确认无误，点击“提交信息到银行验证”。</div>
                        <div><img src={require("../../../img/specialActivity/screenshot4_openZXIntroduction.png")} alt="" className="responsive"/></div>
                    </dd>
                    <dt>3.充值</dt>
                    <dd>
                        <div><img src={require("../../../img/specialActivity/screenshot5_openZXIntroduction.jpg")} alt="" className="responsive"/></div>
                    </dd>
                    <dt>4.投资标的</dt>
                    <dd>
                        <div className="content">选择心仪的标的，尽享财富升值。</div>
                        <div><img src={require("../../../img/specialActivity/screenshot6_openZXIntroduction.jpg")} alt="" className="responsive"/></div>
                    </dd>
                </dl>
            </div>
        </div>
    )
}



module.exports=OpenZXIntroduction;
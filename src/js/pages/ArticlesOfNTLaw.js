import "../../scss/page/ArticlesOfNTLaw.scss";
import React from 'react';
import { Container } from "../UIComponents/index";
import getParamObjFromUrl from "../lib/getParamObjFromUrl";

const ArticlesOfNTLaw = () => {

    let articleId=getParamObjFromUrl().articleId;

    let articles=null;

    switch(articleId){
        case "1":
        articles=(
            <Container id="articlesOfNTLaw">
                <div className="title">关于投资人和借款人之间借贷关系的合法性</div>
                <section className="content">《中华人民共和国合同法》第一百九十六条规定：“借款合同是借款人向贷款人借款，到期返还借款并支付利息的合同。”</section>
                <section className="content">《合同法》允许自然人等普通民事主体之间发生借贷关系，并允许出借方到期可以收回本金和符合法律规定的利息。饭米粒理财的投资人作为借款人，与贷款人之间的借贷关系受法律保护。</section>
            </Container>   
        );
        break;
        case "2":
        articles=(
            <Container id="articlesOfNTLaw">
                <div className="title">关于饭米粒理财提供居间撮合服务的合法性</div>
                <section className="content">根据《合同法》第23章关于“居间合同”的规定，特别是第424条规定的“居间合同是居间人向委托人报告订立合同的机会或者提供订立合同的媒介服务，委托人支付报酬的合同”。</section>
                <section className="content">《国务院关于鼓励和引导民间投资健康发展的若干意见》明确指出“鼓励和引导民间资本进入金融服务领域”，“鼓励民间资本发起设立金融中介服务机构”。 农泰金融是合法设立的中介服务机构，为借贷双方提供信息撮合服务，并根据法律规定有权收取相关报酬。</section>
            </Container>   
        );
        break;
        case "3":
         articles=(
            <Container id="articlesOfNTLaw">
                <div className="title">借款人通过饭米粒理财获得出借投资收益的合法性</div>
                <section className="content">《合同法》第二百零五条借款人应当按照约定的期限支付利息；</section>
                <section className="content">《合同法》第二百零六条借款人应当按照约定的期限返还借款；</section>
                <section className="content">《合同法》第二百零七条借款人未按照约定的期限返还借款的，应当按照约定或者国家有关规定支付逾期利息。</section>
                <section className="content">根据2015年9月1日起施行的《最高人民法院关于审理民间借贷案件适用法律若干问题的规定》第二十六条“借贷双方约定的利率未超过年利率24%，出借人请求借款人按照约定的利率支付利息的，人民法院应予支持”。 农泰金融推出的出借投资收益的年化利率均低于24%，是合法的利息收益，是受法律保护的</section>
            </Container>   
        );
        break;
        case "4":
         articles=(
            <Container id="articlesOfNTLaw">
                <div className="title">关于电子合同的合法性</div>
                <section className="content">《合同法》第十一条书面形式是指合同书、信件和数据电文（包括电报、电传、传真、电子数据交换和电子邮件）等可以有形地表现所载内容的形式。</section>
                <section className="content">《电子签名法》第三条民事活动中的合同或者其他文件、单证等文书，当事人可以约定使用或者不使用电子签名、数据电文。当事人约定使用电子签名、数据电文的文书，不得仅因为其采用电子签名、数据电文的形式而否定其法律效力。</section>
                <section className="content">《电子签名法》第十四条可靠的电子签名与手写签名或者盖章具有同等的法律效力。因此，电子合同与纸质合同具有同等的法律效力，接受司法认可和保护</section>
            </Container>   
        );
        break;
        default:
        break;
    }
    return articles ;
};

module.exports=ArticlesOfNTLaw;
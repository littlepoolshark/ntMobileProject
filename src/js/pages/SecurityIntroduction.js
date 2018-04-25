require("../../scss/page/SecurityIntroduction.scss");
import React from "react";

//ui component
import Container from "../UIComponents/Container";
import Slider from "../UIComponents/Slider";


let SecurityIntroduction=React.createClass({
    render(){

        return (
            <Container id="securityIntroduction">
                <Slider autoPlay={false} controls={false} loop={false} interval={30*60*1000}>
                    <Slider.Item >
                       <div className="content-wrapper" >
                           <img src={require("../../img/securityIntroduction-img3.png")} alt=""/>
                           <div>
                               <div className="title">A股上市公司“诺普信”战略投资</div>
                               <div className="subtitle">深圳诺普信农化股份有限公司(股票代码002215)，是一家专业从事农业植保技术研发、产品生产经营及农业技术服务的国家级高新技术企业，公司成立于1999年9月，目前注册资本为9.24亿元，截止2015年12月31日，总资产30.77亿元，净资产17.69亿元，是国内农药制剂领域第一家上市公司。</div>
                           </div>
                       </div>
                    </Slider.Item>
                    <Slider.Item >
                        <div className="content-wrapper">
                            <img src={require("../../img/securityIntroduction-img1.png")} alt=""/>
                            <div>
                                <div className="title">资金由银行全面存管</div>
                                <div className="subtitle">为每个用户在银行开具独立资金子账户，银行根据投资人、借款人的交易指令和合同约定，对资金使用、划付进行管理和监督。</div>
                            </div>
                        </div>
                    </Slider.Item>
                    <Slider.Item >
                        <div className="content-wrapper">
                            <img src={require("../../img/securityIntroduction-img4.png")} alt=""/>
                            <div>
                                <div className="title">全面的风控措施</div>
                                <div className="subtitle">上市公司20年交易大数据，大型国有银行风控团队19年风控经验，业内领先的8道工序风控流程，共同保障投资安全。</div>
                            </div>
                        </div>
                    </Slider.Item>
                    <Slider.Item >
                        <div className="content-wrapper">
                            <img src={require("../../img/securityIntroduction-img5.png")} alt=""/>
                            <div>
                                <div className="title">技术实力雄厚</div>
                                <div className="subtitle">国内一线互联网企业人才鼎力加盟，6重技术措施，保证投资信息安全。</div>
                            </div>
                        </div>
                    </Slider.Item>
                    <Slider.Item >
                        <div className="content-wrapper">
                            <img src={require("../../img/securityIntroduction-img2_20170919.png")} alt=""/>
                            <div>
                                <div className="title">顶级合作伙伴</div>
                            </div>
                        </div>
                    </Slider.Item>
                </Slider>
            </Container>
        )
    },
    componentDidMount(){
            //鉴于在qqx5浏览器中，“content-wrapper”元素的高度并不能被css属性height:100%所撑开，故使用脚本来解决此兼容问题。
            let contentWrapperHeight=window.innerHeight - 38 + "px";
            let contentWrappers=document.getElementsByClassName("content-wrapper");
            for(let i=0;i<contentWrappers.length;i++){
                contentWrappers[i].style.height=contentWrapperHeight;
            }
    }
});

SecurityIntroduction.contextTypes = {
    router:React.PropTypes.object.isRequired
};

module.exports=SecurityIntroduction;
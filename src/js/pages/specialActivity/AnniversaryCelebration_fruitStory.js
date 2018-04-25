require("../../../scss/page/specialActivity/FruitStory.scss");
import React from "react";
import classNames from "classnames";

//ui component
import Container from "../../UIComponents/Container";
import Tabs from "../../UIComponents/Tabs";


//水果的故事（周年庆子页面）页面
let FruitStory = React.createClass({
    getInitialState(){
        return null;
    },
    render() {

        return (
            <Container id="fruitStory" scrollable={true}>
                <Tabs defaultActiveKey={0} showBottomSlideLine={false}>

                    <Tabs.Item
                        title="橙子故事"
                        key={0}
                        navStyle={null}
                        id="fixedLoanTab"
                    >
                        <img src={require("../../../img/specialActivity/fruitStory1.jpg")} alt="" className="responsive"/>
                        <div className="content">
                            我叫骆洪森，江西赣州寻乌人，种植赣南脐橙已有15个年头。很荣幸能作为农泰金融的借款人为本次周年庆活动提供我亲手种植的赣南脐橙作为献给投资人的礼物。都说“世界脐橙看中国，中国脐橙看赣南，赣南脐橙看寻乌。”作为一名地地道道的寻乌人，我得承认，我们的脐橙真的很好吃，我这不是“王婆卖瓜”，而是市场上反馈回来的真实声音。
                        </div>
                        <img src={require("../../../img/specialActivity/fruitStory2.jpg")} alt="" className="responsive"/>
                        <div className="content">
                            我的家乡寻乌位于江西省最南端，素有稀土王国、江西南大门之美誉，因四季分明、得天独厚的风化毋质红壤土、昼夜温差极大等地理优势，造就了脐橙颜色鲜亮、果肉饱满、水分充足的特点。
                        </div>
                        <img src={require("../../../img/specialActivity/fruitStory3.jpg")} alt="" className="responsive"/>
                        <div className="content">
                            随着家乡脐橙名气越来越大，我也想进一步扩大种植面积，让更多人吃到赣南脐橙，无奈资金周转上有些困难。去年经人推荐，通过向农泰金融融资借款，从而顺利缓解了资金周转上的困难，在此，想对农泰金融真诚地说一声“谢谢”！希望农泰金融发展越来越好，帮助更多农民丰产丰收。
                        </div>
                        <div className="qrCode-wrapper text-center" style={{margin:"2.5rem 0"}}>
                            <img src={require("../../../img/specialActivity/anniversaryCelebration/qt_orange.jpg")} alt="" style={{display:"inline-block",width:"6.375rem",height:"auto"}}/>
                            <div style={{marginTop:"5px",color:"#666",fontSize:"0.75rem"}}>扫码订购农产品助农吧</div>
                        </div>
                    </Tabs.Item>
                    <Tabs.Item
                        title="苹果故事"
                        key={1}
                        navStyle={null}
                    >
                        <img src={require("../../../img/specialActivity/fruitStory4.jpg")} alt="" className="responsive"/>
                        <div className="content">
                            我叫王标，目前是一家农业领域生物公司的CEO，在农业领域工作已16年，很荣幸能推荐家乡的沂源红苹果作为本次周年庆活动的礼物。
                        </div>
                        <img src={require("../../../img/specialActivity/fruitStory5.jpg")} alt="" className="responsive"/>
                        <div className="content">
                            作为土生土长的沂源人，我深深热爱着这片土地，也知道沂源红苹果有多好，也清楚农民卖苹果的不容易，所以特别希望能帮助家乡的沂源红苹果走出去，让更多消费者品尝沂源红苹果的同时，也能帮助家乡的父老乡亲脱贫致富。令人欣慰的是，沂源红苹果正在被更多的人认可，不仅走向了“奥运会、世博会”，而且还被人民日报评定其品牌价值达146.62亿元。
                        </div>
                        <img src={require("../../../img/specialActivity/fruitStory6.jpg")} alt="" className="responsive"/>
                        <div className="content">
                            我们沂源被称为“山东屋脊”，页岩土质、温差大，日照足，再加上沂源红苹果坚持不用杀虫剂、不上激素不打蜡，采用流程化管理、可逆向追踪等科学生产技术，所以使得沂源红苹果个大、味甜、生态有机。
                        </div>
                        <div className="content">
                            大产业就需要大金融，农泰金融背靠诺普信几十年农业行业积累的大数据资源，正以饱满的农业情怀专注农业金融，为像沂源红苹果这样的特色农产品做大做强提供强有力的金融支持。未来沂源红苹果的“出走”，会更多的与农泰金融“携手并进”。祝农泰金融一周年生日快乐！祝帮助过农民朋友的投资人身体健康，心想事成！
                        </div>
                        <div className="qrCode-wrapper text-center" style={{margin:"2.5rem 0"}}>
                            <img src={require("../../../img/specialActivity/anniversaryCelebration/qr_apple.jpg")} alt="" style={{display:"inline-block",width:"6.375rem",height:"auto"}}/>
                            <div style={{marginTop:"5px",color:"#666",fontSize:"0.75rem"}}>扫码订购农产品助农吧</div>
                        </div>
                    </Tabs.Item>
                    <Tabs.Item
                        title="红枣故事"
                        key={2}
                        navStyle={null}
                    >
                        <img src={require("../../../img/specialActivity/fruitStory7.jpg")} alt="" className="responsive"/>
                        <div className="content">
                            我叫刘文伟，是土生土长的阿克苏人，很荣幸能作为农泰金融的借款人为本次周年庆活动提供我亲手种植的阿克苏大枣作为献给投资人的礼物。从记事起，红枣就一路伴随我的成长，从未离开过我的生活。家门口的枣树是我儿时最好的玩耍玩伴，也是我求学路上的唯一经济来源，如今红枣成了我成家立业的根本。种植红枣将近20年，对我而言,它已是一份事业，更是一份使命。
                        </div>

                        <img src={require("../../../img/specialActivity/fruitStory8.jpg")} alt="" className="responsive"/>
                        <div className="content">
                            别人都说我们阿克苏的红枣是“白金玉枣”，个大、皮薄、肉很厚实，吃起来特别甜。也有人叫它“中华灵果”，吃起来很健康。其实这都与我们阿克苏特殊的气候有关，我们阿克苏一年有220天无霜期，昼夜温差20多度，每颗红枣一年要晒将近3000多个小时，从而保证了红枣有充足的糖分。最为关键的是阿克苏的气候特别干燥，害虫生长不了，所以红枣不需要打农药，特别环保健康。
                        </div>
                        <img src={require("../../../img/specialActivity/fruitStory9.jpg")} alt="" className="responsive"/>
                        <div className="content">
                            为了让更多的人吃到我们阿克苏的大枣，今年我特向农泰金融申请了融资服务，喜获大丰收。真的特别感恩农泰及投资人给予我资金上的帮助。值此农泰周年庆，我谨奉上阿克苏的大枣让投资人朋友品尝，也真诚的祝愿农泰生日快乐，越办越好，多为三农作贡献！
                        </div>
                        <img src={require("../../../img/specialActivity/fruitStory10.jpg")} alt="" className="responsive"/>
                        <div className="qrCode-wrapper text-center" style={{margin:"2.5rem 0"}}>
                            <img src={require("../../../img/specialActivity/anniversaryCelebration/qr_jujube.jpg")} alt="" style={{display:"inline-block",width:"6.375rem",height:"auto"}}/>
                            <div style={{marginTop:"5px",color:"#666",fontSize:"0.75rem"}}>扫码订购农产品助农吧</div>
                        </div>
                    </Tabs.Item>
                </Tabs>
            </Container>
        );
    },
    componentDidMount(){


    }
});

FruitStory.contextTypes = {
    router:React.PropTypes.object.isRequired
};

module.exports=FruitStory;
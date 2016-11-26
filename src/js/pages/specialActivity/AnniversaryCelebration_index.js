require("../../../scss/page/specialActivity/AnniversaryCelebration.scss");
let AnniversaryCelebrationAction=require("../../actions/AnniversaryCelebrationAction");
let AnniversaryCelebrationStore=require("../../stores/AnniversaryCelebrationStore");
import React,{ PropTypes } from "react";
import { Link } from "react-router";
import classNames from "classnames";

//ui component
import Container from "../../UIComponents/Container";
import Modal from "../../UIComponents/modal/SpecialModal";
import Grid from "../../UIComponents/Grid";
import Col from "../../UIComponents/Col";
import Message from "../../UIComponents/Message";

//lib
import CountDown from "../utilities/CountDown";
import mixin from "../utilities/mixin";
import TransitionEvent from '../../UIComponents/utils/TransitionEvents';
import cookie from "../../lib/cookie";



//双11活动页面
let AnniversaryCelebration = React.createClass({
    getInitialState(){
        return {
            isModalOpen:false,
            getInterestRewardIsRequesting:false,
            modalType:1,//3:未登录提示框 2：成功领取一张加息券
            data:AnniversaryCelebrationStore.getAll()
        }
    },
    _jumpToFruitStory(){
        this.context.router.push({
            pathname:"anniversaryCelebration_fruitStory"
        })
    },
    _jumpToInviteReward(){
        AnniversaryCelebrationAction.jumpToInviteReward();
    },
    _jumpToLogin(){
        this.context.router.push({
            pathname:"/",
            query:{
                view:"login",
                beforeComponent:"anniversaryCelebration"
            }
        })
    },
    _jumpToRegister(){
        this.context.router.push({
            pathname:"/",
            query:{
                view:"register",
                beforeComponent:"anniversaryCelebration"
            }
        })
    },
    _jumpToHome(){
        this.context.router.push({
            pathname:"home"
        })
    },
    _jumpToCouponList(){
        this.context.router.push({
            pathname:"couponList"
        })
    },
    _openModal(modalType){
        this.setState({
            isModalOpen:true,
            modalType:modalType
        })
    },
    _closeModal(){
        this.setState({
            isModalOpen:false
        })
    },
    _sendWishesToNt(){
        AnniversaryCelebrationAction.sendWishesToNt();
    },
    _toggleWishes(){
        AnniversaryCelebrationAction.toggleWishes();
    },
    _handleWishesChange(){
        let wishesText=this.refs.wishesTextarea.value;
        AnniversaryCelebrationAction.changeWishes(wishesText);
    },
    _submitWishesText(){
        AnniversaryCelebrationAction.submitWishesText();
    },
    _renderInnerModal(modalType){
        if(modalType === 1){//活动规则modal
            return (
                <div className="customize-modal rules-introduction-modal">
                    <div className="customize-modal-header">
                        <span onClick={this._closeModal}></span>
                    </div>
                    <div className="customize-modal-body">
                        <div className="title text-center">
                            <img src={require("../../../img/specialActivity/anniversaryCelebration/ribbon1.png")} alt=""/>
                            <span>活动规则</span>
                            <img src={require("../../../img/specialActivity/anniversaryCelebration/ribbon2.png")} alt=""/>
                        </div>
                        <p>1、推荐好友理财除享受活动期间的两重奖励，依然还可享受平台既有的推荐奖励。</p>
                        <p>2、推荐好友理财时，被推荐人在注册时需填写推荐人的注册手机号码。</p>
                        <p>3、推荐好友活动前已注册，在活动期间首次投资（此前无投资记录）的，也可视为成功邀请。</p>
                        <p>4、推荐好友理财仅限投资平台新手标、月月赚、季季赚、好采投项目。</p>
                        <p>5、推荐好友如遇邀请人数相同的情况，则排名依据用户邀请最后一位好友完成首投时间的早晚而定，完成早的则用户排名靠前。</p>
                        <p>6、活动结束后，平台客服将以电话形式取得获奖人员的邮寄信息，并统一于7个工作内将奖品开始邮寄给各位获奖人员。</p>
                        <p>7、活动期间，通过技术手段刷数据的用户，一经查实，将取消活动资格。</p>
                    </div>
                </div>
            )
        }else if(modalType === 2){//提示用户登录或者注册的modal
            return (
                <div className="customize-modal loginOrRegister-modal">
                    <div className="customize-modal-header">
                        <span onClick={this._closeModal}></span>
                        <img src={require("../../../img/specialActivity/anniversaryCelebration/pop_comeon.png")} alt="" className="mascot"/>
                        <img src={require("../../../img/specialActivity/anniversaryCelebration/ribbon1.png")} alt="" className="ribbon1"/>
                        <img src={require("../../../img/specialActivity/anniversaryCelebration/ribbon2.png")} alt="" className="ribbon2"/>
                    </div>
                    <div className="customize-modal-body">
                        <div className="title">
                            <strong>别心急</strong><br/>
                            先注册或者登录才能送祝福哦！
                        </div>
                    </div>
                    <div className="customize-modal-footer">
                        <button className="ac-btn small" onClick={this._jumpToLogin}>马上登录</button>
                        <button className="ac-btn small" onClick={this._jumpToRegister}>马上注册</button>
                    </div>
                </div>
            )
        }else if(modalType === 3){//提示用户送祝福成功的modal
            return (
                <div className="customize-modal sendWishesSuccess-modal">
                    <div className="customize-modal-header">
                        <span onClick={this._closeModal} ></span>
                        <img src={require("../../../img/specialActivity/anniversaryCelebration/pop_ye.png")} alt="" className="mascot"/>
                        <img src={require("../../../img/specialActivity/anniversaryCelebration/ribbon1.png")} alt="" className="ribbon1"/>
                        <img src={require("../../../img/specialActivity/anniversaryCelebration/ribbon2.png")} alt="" className="ribbon2"/>
                    </div>
                    <div className="customize-modal-body">
                        <div className="title">
                            <strong>好感动，么么哒！</strong><br/>
                            人家只能以500元的大礼包相许了！
                        </div>
                    </div>
                    <div className="customize-modal-footer">
                        <button className="ac-btn" onClick={this._jumpToCouponList}>我是大礼包，求带走</button>
                    </div>
                </div>
            )
        }else if(modalType === 4){//用户填写祝福话语的modal
            return (
                <div className="customize-modal sendWishes-modal">
                    <div className="customize-modal-header">
                        <span onClick={this._closeModal} style={{zIndex:"2",top:"-1rem"}}></span>
                        <img src={require("../../../img/specialActivity/anniversaryCelebration/cake_top.png")} alt="" className="cake-top-bg"/>
                        <img src={require("../../../img/specialActivity/anniversaryCelebration/birthday.png")} alt="" className="candle"/>
                    </div>
                    <div className="customize-modal-body">
                        <div><span className="fr toggle-wished-btn" onClick={this._toggleWishes}>换个祝福</span></div>
                        <textarea ref="wishesTextarea" cols="30" rows="3" value={this.state.data.wishes} onChange={this._handleWishesChange}/>
                    </div>
                    <div className="customize-modal-footer">
                        <button className="ac-btn"  onClick={this._submitWishesText}>为农泰金融送出祝福</button>
                    </div>
                </div>
                )
        }else if(modalType === 5){
            return (
                <div className="customize-modal sendWishesSuccess-modal">
                    <div className="customize-modal-header">
                        <span onClick={this._closeModal} ></span>
                        <img src={require("../../../img/specialActivity/anniversaryCelebration/pop_comeon.png")} alt="" className="mascot"/>
                        <img src={require("../../../img/specialActivity/anniversaryCelebration/ribbon1.png")} alt="" className="ribbon1"/>
                        <img src={require("../../../img/specialActivity/anniversaryCelebration/ribbon2.png")} alt="" className="ribbon2"/>
                    </div>
                    <div className="customize-modal-body">
                        <div className="title">
                            <strong>您太客气啦！</strong><br/>
                            祝福已经送过了，抓紧时间去赚钱吧！
                        </div>
                    </div>
                    <div className="customize-modal-footer">
                        <button className="ac-btn"   onClick={this._jumpToHome}>立即去赚钱</button>
                    </div>
                </div>
            )
        }
    },
    render() {
        let {
            rankList,
            wishesList,
            hadSendWished,
            wishes
            }=this.state.data;

        return (
            <Container id="anniversaryCelebration" scrollable={true}>
                <img src={require("../../../img/specialActivity/anniversaryCelebration/banner.jpg")} alt="" className="responsive"/>
                <div className="activity-title text-center">
                    [活动一]送祝福点亮生日蜡烛，<strong>500</strong>元<br/>
                    感恩大礼包等您拿！（仅限2万份）
                </div>
                <div className="activity-card">
                    <div className="activity-card-header text-center">
                        活动期间，为农泰金融送祝福点亮生日蜡烛<br/>
                        即可获得价值500元的生日感恩大礼包。
                    </div>
                    <div className="activity-card-body">
                        <div className="cake-wrapper">
                            <img src={require("../../../img/specialActivity/anniversaryCelebration/cake.png")} alt=""/>
                        </div>
                        <div className="broadcast-section">
                            <img src={require("../../../img/specialActivity/anniversaryCelebration/flags.png")} alt="" className="responsive"/>
                            <div className="text-center broadcast-title">祝福留言榜</div>
                        </div>
                        <div className="btn-wrapper text-center">
                            <button className="ac-btn" onClick={this._sendWishesToNt}>为农泰金融送生日祝福</button>
                        </div>
                    </div>
                    <div className="activity-card-footer"></div>
                </div>
                <div className="activity-title text-center">
                    [活动二]推荐好友理财，额外享两重奖励 <br/>
                    <strong style={{fontSize:"1.125rem"}} onClick={this._openModal.bind(null,1)}>点击了解活动说明>></strong>
                </div>
                <div className="activity-card">
                    <div className="activity-card-header text-center">
                        <strong>1重礼</strong>推荐好友首投，品农泰丰收果实
                    </div>
                    <div className="activity-card-body">
                        <div className="content">
                            活动期间，推荐好友首投1000元及以上，可依据其推荐好友首投人数给予阶梯性奖励，而被邀请人首投1000元及以上还将获得年化4%的限时加息券一张。（天天赚及债转除外）
                        </div>
                        <div className="btn-wrapper text-center">
                            <button className="ac-btn" onClick={this._jumpToFruitStory}>查看水果背后的故事</button>
                        </div>
                        <div className="fruit-list cf">
                            <div className="fruit-item">
                                <div className="fruit-item-title cf">
                                    <span className="fl">2≤推荐人数≤3</span>
                                    <strong className="fr" style={{marginTop:"-3px"}}>￥78</strong>
                                </div>
                                <img src={require("../../../img/specialActivity/anniversaryCelebration/pic1.jpg")} alt="" className="responsive"/>
                                <div className="fruit-item-subtitle" style={{minHeight:"2.375rem"}}>
                                    赣南脐橙1箱(10斤)<span className="">+沂源苹果1箱(8斤)</span>
                                </div>
                            </div>
                            <div className="fruit-item">
                                <div className="fruit-item-title cf">
                                    <span className="fl">4≤推荐人数≤5</span>
                                    <strong className="fr" style={{marginTop:"-3px"}}>￥158</strong>
                                </div>
                                <img src={require("../../../img/specialActivity/anniversaryCelebration/pic2.jpg")} alt="" className="responsive"/>
                                <div className="fruit-item-subtitle">
                                    赣南脐橙1箱(10斤)+沂源苹果1箱(8斤)
                                </div>
                            </div>
                        </div>
                        <div className="fruit-list cf">
                            <div className="fruit-item">
                                <div className="fruit-item-title cf">
                                    <span className="fl">6≤推荐人数≤7</span>
                                    <strong className="fr" style={{marginTop:"-3px"}}>￥388</strong>
                                </div>
                                <img src={require("../../../img/specialActivity/anniversaryCelebration/pic3.jpg")} alt="" className="responsive"/>
                                <div className="fruit-item-subtitle">
                                    赣南脐橙1箱(10斤)+沂源苹果1箱(8斤)+阿克苏特级大枣(4斤)
                                </div>
                            </div>
                            <div className="fruit-item">
                                <div className="fruit-item-title cf">
                                    <span className="fl">推荐人数≥8</span>
                                    <strong className="fr" style={{marginTop:"-3px"}}>￥278</strong>
                                </div>
                                <img src={require("../../../img/specialActivity/anniversaryCelebration/pic4.jpg")} alt="" className="responsive"/>
                                <div className="fruit-item-subtitle">
                                    赣南脐橙1箱(20斤)+沂源苹果1箱(8斤)+阿克苏特级大枣(6斤)
                                </div>
                            </div>
                        </div>
                        <div className="firstTimeReward-bar">
                            <div className="firstTimeReward-bar-title">
                                被推荐用户<br/>
                                用户有礼
                            </div>
                            <div className="firstTimeReward-bar-imgWrapper">
                                <img src={require("../../../img/specialActivity/anniversaryCelebration/voucher.png")} alt="" className="responsive"/>
                            </div>
                            <div className="firstTimeReward-bar-subtitle">
                                投资≥1000元<br/>
                                (天天赚及债转除外)
                            </div>
                        </div>
                        <div className="inviteCount-rankList">
                            <img src={require("../../../img/specialActivity/anniversaryCelebration/flags.png")} alt="" className="responsive"/>
                            <div className="inviteCount-rankList-title text-center">推荐好友首投人脉圈</div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>排名</th>
                                        <th>推荐人</th>
                                        <th>推荐人数</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    rankList.length > 0 ?
                                    rankList.map(function(item,index){
                                        return (
                                            <tr key={index}>
                                                <td ><em>{index+1}</em></td>
                                                <td >{item.mobile}</td>
                                                <td ><em>{item.countNumber}</em></td>
                                            </tr>
                                        )
                                    })   :
                                    <tr>
                                        <td colSpan={3}><em>暂时没有数据！</em></td>
                                    </tr>
                                }
                                </tbody>
                            </table>
                        </div>
                        <div className="invite-rewardList">
                            <div className="activity-card-header text-center" >
                                <strong>2重礼</strong>推荐好友首投，赢排名奖
                            </div>
                            <div className="content">
                                活动期间，推荐好友首投1000元及以上超过10人(含10人)的用户即有资格参加“推荐好友首投排名”活动，排名奖仅取前三名。
                            </div>
                            <div className="rewardList-wrapper cf">
                                <div><img src={require("../../../img/specialActivity/anniversaryCelebration/500.png")} alt="" className="responsive" /></div>
                                <div><img src={require("../../../img/specialActivity/anniversaryCelebration/300.png")} alt="" className="responsive" /></div>
                                <div><img src={require("../../../img/specialActivity/anniversaryCelebration/200.png")} alt="" className="responsive" /></div>
                            </div>
                        </div>
                    </div>
                    <div className="activity-card-footer"></div>
                </div>
                <div className="btn-wrapper text-center" style={{marginTop:"-1rem"}}>
                    <button className="ac-btn" onClick={this._jumpToInviteReward}>马上推荐赢豪礼</button>
                </div>
                <div className="rights-declaring text-center">
                    <div className="bg-wrapper">
                        <img src={require("../../../img/specialActivity/anniversaryCelebration/butom.png")} alt="" className="responsive"/>
                    </div>
                    本活动的最终解释权归农泰金融所有 <br/>
                    如有疑问，可联系农泰金融在线客服或拨打400-6322-688
                </div>
                <Modal
                    isOpen={this.state.isModalOpen}
                    role="customize"
                >
                    {this._renderInnerModal(this.state.modalType)}
                </Modal>
            </Container>
        );
    },
    componentDidMount(){

        AnniversaryCelebrationAction.getInitialData();

        AnniversaryCelebrationStore.bind("change",function(){
            this.setState({
                data:AnniversaryCelebrationStore.getAll()
            });
        }.bind(this));

        AnniversaryCelebrationStore.bind("isNotLogin",function(){
            this._openModal(2);
        }.bind(this));

        AnniversaryCelebrationStore.bind("submitWishesSuccess",function(){
            this._openModal(3);
        }.bind(this));

        AnniversaryCelebrationStore.bind("submitWishesFailed",function(msg){
            Message.broadcast(msg);
        });

        AnniversaryCelebrationStore.bind("userHaveNotSendWishes",function(){
            this._openModal(4);
        }.bind(this));

        AnniversaryCelebrationStore.bind("userHadSendWishes",function(){
            this._openModal(5);
        }.bind(this));

        AnniversaryCelebrationStore.bind("activityIsNotStart",function(){
            Message.broadcast("对不起，活动还没有开始");
        });

        AnniversaryCelebrationStore.bind("activityIsDoing",function(){
            this.context.router.push({
                pathname:"inviteReward"
            });
        }.bind(this));

        AnniversaryCelebrationStore.bind("activityIsOver",function(){
            Message.broadcast("对不起，活动已经结束了");
        });


    }
});

AnniversaryCelebration.contextTypes = {
    router:React.PropTypes.object.isRequired
};

module.exports=AnniversaryCelebration;
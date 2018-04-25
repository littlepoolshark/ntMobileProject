require("../../../scss/page/specialActivity/NewYearCelebration.scss");
let NewYearCelebrationAction=require("../../actions/NewYearCelebrationAction");
let NewYearCelebrationStore=require("../../stores/NewYearCelebrationStore");
import React,{ PropTypes } from "react";
import { Link } from "react-router";
import classNames from "classnames";

//ui component
import Container from "../../UIComponents/Container";
import Modal from "../../UIComponents/modal/SpecialModal";
import Grid from "../../UIComponents/Grid";
import Col from "../../UIComponents/Col";
import Message from "../../UIComponents/Message";
import Tabs from "../../UIComponents/Tabs";
import NavBar from "../../UIComponents/NavBar";

//lib
import mixin from "../utilities/mixin";
import TransitionEvent from '../../UIComponents/utils/TransitionEvents';
import cookie from "../../lib/cookie";


//滚动播报栏
let Broadcast=React.createClass({
    propTypes: {
        broadcastList: PropTypes.array
    },
    getInitialState(){
        return {
            broadcastList:this.props.broadcastList,
            in:false
        }
    },
    _scroll(){

        if(this.state.in){
            let _broadcastList=[];
            let firstItem;
            for(let i=0;i<this.state.broadcastList.length;i++){
                _broadcastList[i]=this.state.broadcastList[i];
            };
            firstItem=_broadcastList.shift();
            _broadcastList.push(firstItem);
            this.setState({
                broadcastList:_broadcastList,
                in:false
            });
        }else {
            this.setState({
                in:true
            });
        }

    },
    render(){
        let ulClass=this.state.in ? "in": "out";
        return (
            <div className="broadcast-wrapper">
                {
                    this.state.broadcastList.length > 0 ?
                        <ul className={ulClass}>
                            {
                                this.state.broadcastList.map(function(item,index){
                                    return (
                                        <li key={index}>
                                           <span className="broadcast-icon"></span>
                                           <span>恭喜{item.mobile}刚刚抽中了{item.name}</span>
                                        </li>
                                    )
                                })
                            }
                        </ul> :
                        <ul className="out">
                            <li >
                                <em>暂时没有数据！</em>
                            </li>
                        </ul>
                }

            </div>
        )
    },
    componentDidMount(){
        this.timer=setInterval(function(){
            if(this.state.broadcastList.length > 1){
                this._scroll();
            }
        }.bind(this),2000);
    },
    componentWillReceiveProps(nextProps){
        this.setState({
            broadcastList:nextProps.broadcastList,
            in:nextProps.broadcastList.length > 1 ? true : false
        })
    },
    componentWillUnmount(){
        clearInterval(this.timer);
    }
});

//旋转抽奖组件
let LuckyDraw=React.createClass({
    propTypes: {
        prizeId: PropTypes.string,
        rotateDegreeMap:PropTypes.object,
        onStart:PropTypes.func,
        onFinished:PropTypes.func,
        isHitInTarget:PropTypes.bool
    },
    getInitialState(){
        this.initCircleCount=4;
        return {
            drawCount:0//第几次抽奖
        }
    },
    _rotate(){
        this.setState({
            drawCount:this.state.drawCount + 1
        })
    },
    _handleNeedleClick(event){
        this.props.onStart && this.props.onStart();
    },
    render(){
        let turntableClass=classNames({
            "lucky-draw-turntable":true,
            "active":this.state.isActive
        });
        let rotateDegree = this.props.rotateDegreeMap[this.props.prizeId] || 0;
        let lastCircleCount=this.state.drawCount * this.initCircleCount * 360 + rotateDegree  ;
        let transformValue="rotate(" + lastCircleCount + "deg)";
        return (
            <div className="lucky-draw-wrapper" >
                <div className="lucky-draw-turntable" style={{transform:transformValue}} ref="turntable"></div>
                <div className="lucky-draw-needle" onClick={this._handleNeedleClick}></div>
            </div>
        )
    },
    componentDidMount(){
        TransitionEvent.on(this.refs.turntable,function(){
            this.props.onFinished && this.props.onFinished();
        }.bind(this));
    },
    componentWillReceiveProps(nextProps){
        if(nextProps.prizeId && nextProps.isHitInTarget){
            this._rotate();
        }
    }
});

//现金券的列表(实现为无状态组件)
let CashCouponList= function (props){
        let cashCouponList=[
            {
                title:"农泰金融航空公司",
                amount:1688,
                type:"机票",
                entry:"登机口",
                condition:"登机条件",
                limitAmount:1000000,
                limitAmountStr:"100万"
            },
            {
                title:"农泰金融高速铁路公司",
                amount:868,
                type:"高铁票",
                entry:"登车口",
                condition:"登车条件",
                limitAmount:500000,
                limitAmountStr:"50万"
            },
            {
                title:"农泰金融高速铁路公司",
                amount:168,
                type:"高铁票",
                entry:"登车口",
                condition:"登车条件",
                limitAmount:100000,
                limitAmountStr:"10万"
            },
            {
                title:"农泰金融欢乐餐厅",
                amount:38,
                type:"餐饮券",
                entry:"就餐点",
                condition:"就餐条件",
                limitAmount:10000,
                limitAmountStr:"1万"
            },
            {
                title:"农泰金融欢乐餐厅",
                amount:18,
                type:"餐饮券",
                entry:"就餐点",
                condition:"就餐条件",
                limitAmount:5000,
                limitAmountStr:"5000"
            }
        ];

        let {
            onAction,
            userInvestmentRate,
            }=props;

        let isLogin=!!cookie.getCookie("token");

        return (
            <ul className="cash-coupon-list">
                {
                    cashCouponList.map((item,index) => {
                        let canGetCashCoupon=isLogin ?  (userInvestmentRate >= item.limitAmount ? true : false ): true;
                        let cashCouponName=item.amount + "元" + (item.type === "餐饮券" ? "餐饮" : item.type) + "现金券";
                        let btnClass=classNames({
                            "nyc-primary-btn":true,
                            "big-radius":true,
                            "disabled":!canGetCashCoupon
                        });
                        return (
                            <li key={index+1}>
                                <div className="logo-banner">
                                    <img src={require("../../../img/specialActivity/newYearCelebration/logo.png")} alt=""/>
                                    <span>{item.title}</span>
                                </div>
                                <div className="coupon-item-title text-center">
                                    <strong>{item.amount}</strong>元{ item.type === "餐饮券" ? "餐饮" : item.type }现金券
                                </div>
                                <div className="coupon-item-labels">
                                    <Grid collapse={true}>
                                        <Col cols={2}>
                                            <span className="coupon-item-label">{item.entry}:</span>
                                            <span className="coupon-item-content">农泰金融</span>
                                        </Col>
                                        <Col cols={4}>
                                            <span className="coupon-item-label">{item.condition}:</span>
                                            <span className="coupon-item-content">投资年化≥{item.limitAmountStr}</span>
                                        </Col>
                                    </Grid>
                                    <Grid collapse={true}>
                                        <Col cols={2}>
                                            <span className="coupon-item-label">目的地:</span>
                                            <span className="coupon-item-content">家</span>
                                        </Col>
                                        <Col cols={4}>
                                            <span className="coupon-item-label">有效期限:</span>
                                            <span className="coupon-item-content">2016-12-29至2017-01-08</span>
                                        </Col>
                                    </Grid>
                                </div>
                                <div className="btn-wrapper text-center">
                                    <button className={btnClass}  onClick={canGetCashCoupon ? onAction.bind(null,cashCouponName,item.amount) : null}>我要抢{item.type}</button>
                                </div>
                                <div className="warm-hint text-center">温馨提示：春运期间，请注意人身财产安全</div>
                            </li>
                        )
                    })
                }
            </ul>
        )
    };


//元旦，新年活动页面
let NewYearCelebration = React.createClass({
    getInitialState(){
        return {
            data:NewYearCelebrationStore.getAll(),
            isHitInTarget:false,
            isModalOpen:false,
            isRequestStarting:false,//防止用户连续点击导致的重复提交
            modalType:1,
            modalInnerText:""
        }
    },
    _closeModal(){
        this.setState({
            isModalOpen:false,
            isRequestStarting:false
        });
    },
    _openModal(modalType,modalInnerText){
        this.setState({
            isModalOpen:true,
            modalType:modalType,
            isHitInTarget:false,
            modalInnerText:modalInnerText
        })
    },
    _setRequestStatusToBeEnd(){
        this.setState({
            isRequestStarting:false
        })
    },
    beingToDraw(){
        let isRequestStarting=this.state.isRequestStarting;
        if(!isRequestStarting){
            NewYearCelebrationAction.luckyDraw();
        }
    },
    _adjustTopOfPosition(event){
        let imgHeight=event.target.offsetHeight - 2;
        event.target.style.top="-"+imgHeight+"px";
    },
    _generatePrizeNameMap(){
        let prizeList=this.state.data.prizeList;
        let prizeNameMap={};
        for(let i=0;i<prizeList.length;i++){
            prizeNameMap[prizeList[i].goodsId]=prizeList[i].name;
        }
        return prizeNameMap;
    },
    _generateRotateDegreeMap(){
        let prizeList=this.state.data.prizeList;
        let rotateDegreeMap={};
        for(let i=0;i<prizeList.length;i++){
            rotateDegreeMap[prizeList[i].goodsId]=parseInt(prizeList[i].angle);
        }
        return rotateDegreeMap;
    },
    congratulateToHitInTarget(){
       let isCashCoupon=this.state.data.isCashCoupon;
       let prizeNameMap=this._generatePrizeNameMap();
       let modalInnerText="";
       if(isCashCoupon){
           modalInnerText=<div>恭喜你，获得{prizeNameMap[this.state.data.prizeId]}!<br/>(现金券仅支持在PC端查看和使用)</div>
       }else {
           modalInnerText="恭喜你，获得" + prizeNameMap[this.state.data.prizeId];
       }
       this._openModal(2,modalInnerText);
    },
    _congratulateToGetCashCouponSuccess(){
        let modalInnerText=<div>恭喜您，领取成功!<br/>(现金券仅支持在PC端查看和使用)</div>;
        this._openModal(5,modalInnerText);
    },
    _handleGetCashCoupon(cashCouponName,cashCouponAmount){
        NewYearCelebrationAction.confirmToGetCashCoupon(cashCouponName,cashCouponAmount);
    },
    _confirmToGetCashCoupon(cashCouponName){
        let modalInnerText=<div> 现金券仅可领取一次，<br/>确认领取{cashCouponName}吗？</div>
        this._openModal(3,modalInnerText);
    },
    _hadGotCashCouponHint(){
        let modalInnerText="您已经领取过该活动奖励！";
        this._openModal(4,modalInnerText);
    },
    _handleSubmitGetCouponForm(){
        let isRequestStarting=this.state.isRequestStarting;
        if(!isRequestStarting){
            NewYearCelebrationAction.submitGetCouponForm();
        }
    },
    _handleNavClick(){
        this.context.router.push({
            pathname:"home"
        });
    },
    _jumpToLogin(){
        this.context.router.push({
            pathname:"/",
            query:{
                beforeComponent:"newYearCelebration",
                view:"login"
            }
        })
    },
    _jumpToRegister(){
        this.context.router.push({
            pathname:"/",
            query:{
                beforeComponent:"newYearCelebration",
                view:"register"
            }
        })
    },
    _jumpToInviteMyFriend(){
        this.context.router.push({
            pathname:"inviteMyFriend",
            query:{
                beforeComponent:"newYearCelebration"
            }
        })
    },
    _jumpToMyCouponList(){
        this.context.router.push({
            pathname:"couponList",
            query:{
                beforeComponent:"newYearCelebration",
                productType:"all"
            }
        })
    },
    _handleInviteFriend(){
        NewYearCelebrationAction.inviteMyFriend();
    },
    _handleConfirmHitInTarget(){
        NewYearCelebrationAction.getNewestBroadcastList();
        this._closeModal();
    },
    _renderInnerModal(modalType){
        let customizeModalFooter="";
        switch (modalType){
            case 1://提醒用户登录或者注册的modal
                customizeModalFooter= (
                    <div className="customize-modal-footer">
                        <button className="nyc-primary-btn small small-radius" onClick={this._jumpToLogin}>登录</button>
                        <button className="nyc-primary-btn small small-radius" onClick={this._jumpToRegister}>注册</button>
                    </div>);
                break;
            case 2://恭喜用户中奖的modal
                customizeModalFooter= (
                    <div className="customize-modal-footer">
                        <button className="nyc-primary-btn  small-radius" onClick={this._handleConfirmHitInTarget}>确定</button>
                    </div>);
                break;
            case 3://向用户确认领取某张现金券的modal
                customizeModalFooter= (
                    <div className="customize-modal-footer">
                        <button className="nyc-primary-btn small small-radius" onClick={this._handleSubmitGetCouponForm}>确定</button>
                        <button className="nyc-primary-btn small small-radius" onClick={this._closeModal}>取消</button>
                    </div>);
                break;
            case 4://提醒用户已经领取过现金券的modal
            case 5://提醒用户领取现金券成功的modal
                customizeModalFooter= (
                    <div className="customize-modal-footer">
                        <button className="nyc-primary-btn  small-radius" onClick={this._closeModal}>确定</button>
                    </div>);
                break;
            default:
                break;
        };
        return (
            <div className="customize-modal loginOrRegister-modal">
                <div className="customize-modal-header">
                    <span onClick={this._closeModal}></span>
                </div>
                <div className="customize-modal-body">
                    {this.state.modalInnerText}
                </div>
                {customizeModalFooter}
            </div>
        );
    },
    render() {
        let rotateDegreeMap=this._generateRotateDegreeMap();

        let {
            prizeId,
            drawCount,
            broadcastList,
            myInvestmentRate,
            rankingList
            }=this.state.data;

        let isHitInTarget=this.state.isHitInTarget;
        let isLogin=!!cookie.getCookie("token");

        let leftNav= {
            component:"a",
            icon: 'left-nav',
            title: '首页'
        };

        return (
            <Container id="newYearCelebration" scrollable={true}>
                <NavBar
                    title="聚惠迎新年"
                    leftNav={[leftNav]}
                    amStyle="primary"
                    onAction={this._handleNavClick}
                />
                <img src={require("../../../img/specialActivity/newYearCelebration/banner.jpg")} alt="" className="banner"/>
                <Tabs defaultActiveKey={0} showBottomSlideLine={false}>
                    <Tabs.Item
                        title="抽大奖"
                        key={0}
                        navStyle={null}
                    >
                        <div className="lucky-draw-tab">
                            <img src={require("../../../img/specialActivity/newYearCelebration/redbg_top.png")} alt="" onLoad={this._adjustTopOfPosition} className="top-bg-img"/>
                            <div className="title text-center">
                                <em>6888元</em>过年孝心基金等您抽<br/>
                                <strong>孝迎新年抽大奖，100%中奖</strong>
                            </div>
                            <Broadcast broadcastList={broadcastList}/>
                            <div className="luckyDraw-count-hint text-center">
                                {
                                    isLogin ?
                                    <span>您还有 <strong>{drawCount}</strong> 次抽奖机会</span>   :
                                    <span><Link to="/" query={{beforeComponent:"newYearCelebration"}}>点击登录</Link>，查看您的抽奖机会</span>
                                }

                            </div>
                            <LuckyDraw
                                rotateDegreeMap={rotateDegreeMap}
                                prizeId={prizeId}
                                isHitInTarget={isHitInTarget}
                                onStart={this.beingToDraw}
                                onFinished={this.congratulateToHitInTarget}
                            />

                            <section className="getDrawCount-strategy">
                                <img src={require("../../../img/specialActivity/newYearCelebration/raiders.png")} alt="" className="getDrawCount-strategy-title"/>
                                <div className="getDrawCount-strategy-list cf">
                                    <div className="getDrawCount-strategy-item">
                                        <div className="text-center strategy-title">
                                            老用户登录
                                        </div>
                                        <div >
                                            即享<strong>2次</strong>免费抽奖机会
                                        </div>
                                    </div>
                                    <div className="getDrawCount-strategy-item">
                                        <div className="text-center strategy-title">
                                            新用户注册
                                        </div>
                                        <div >
                                            即享<strong>1次</strong>免费抽奖机会
                                        </div>
                                    </div>
                                </div>
                                <div className="getDrawCount-strategy-list cf">
                                    <div className="getDrawCount-strategy-item">
                                        <div className="text-center strategy-title">
                                            单笔投资满<strong>5000元</strong>
                                        </div>
                                        <div>
                                            送抽奖<strong>1次</strong>,多投多抽,上不封顶 (仅限投月月赚、季季赚、好采投)
                                        </div>
                                    </div>
                                    <div className="getDrawCount-strategy-item">
                                        <div className="text-center strategy-title">
                                            邀请好友注册及实名认证
                                        </div>
                                        <div >
                                            送抽奖<strong>1次</strong>,多投多抽,上不封顶 <span className="fade">(仅限投月月赚、季季赚、好采投)</span>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <section className="rules-introduction">
                                <div className="rules-introduction-title">活动说明:</div>
                                <div className="rules-introduction-item">① 12月29日0点前注册的用户即为老用户，反之则为新用户。</div>
                                <div className="rules-introduction-item">② 抽奖所获投资红包、加息券奖励直接发放至【我的】-【优惠券】中；春节孝心基金（现金红包）仅支持PC端操作，请前往PC端【我的账户-我的奖励】查看，可直接投资或提现，届时请查收。</div>
                            </section>
                        </div>

                    </Tabs.Item>
                    <Tabs.Item
                        title="助力回家"
                        key={1}
                        navStyle={null}
                    >
                        <div className="help-to-goHome-tab">
                            <img src={require("../../../img/specialActivity/newYearCelebration/redbg_top.png")} alt="" onLoad={this._adjustTopOfPosition} className="top-bg-img"/>
                            <div className="title text-center">
                                领<em>1688元</em>机票现金券<br/>
                                <strong>春节回乡，我出钱，农泰助力回家过年</strong>
                            </div>
                            <div className="my-investment-rate text-center">
                                活动期间，我的累积投资年化：
                                {
                                    isLogin ?
                                    <strong>{myInvestmentRate}元</strong> :
                                    <Link to="/" query={{beforeComponent:"newYearCelebration"}}>登录查看</Link>
                                }
                            </div>
                            <CashCouponList
                                userInvestmentRate={myInvestmentRate}
                                onAction={this._handleGetCashCoupon}
                            />
                            <section className="rules-introduction">
                                <div className="rules-introduction-title">活动说明:</div>
                                <div className="rules-introduction-item">① 投资年化=投资金额*投资月数/12。</div>
                                <div className="rules-introduction-item">② 活动对象：农泰金融所有注册用户；参与活动产品：≥30天产品即可，不含债转项目。</div>
                                <div className="rules-introduction-item">③ 活动期间，每个用户仅限1次领奖机会。如用户成功领取当前席位奖品，将不可再领取其他席位奖品。</div>
                                <div className="rules-introduction-item">④ 用户所领取机票、高铁票、餐饮现金券将以现金红包的形式发放至用户PC端账户，用户可前往PC端【我的账户-我的奖励】查看，可直接投资或提现使用。</div>
                            </section>
                        </div>
                    </Tabs.Item>
                    <Tabs.Item
                        title="领50元红包"
                        key={2}
                        navStyle={null}
                    >
                        <div className="get-fifty-redPackage-tab">
                            <img src={require("../../../img/specialActivity/newYearCelebration/redbg_top.png")} alt="" onLoad={this._adjustTopOfPosition} className="top-bg-img"/>
                            <div className="title text-center">
                                推荐好友首投<br/>
                                <strong>领50元春节回家红包</strong>
                            </div>
                            <div className="rules-of-getting">
                                活动期间，推荐好友首投 <strong>1000元</strong> 及以上可以获得 <strong>50元投资红包1个</strong>，被推荐者也可获得限时1个月年化  <strong>4%加息券1张</strong>，多推荐多奖，上不封顶。推荐8名及以上好友首投满1000元的用户还可参加排名赢现金红包活动，排名奖励取前三名，如未达到要求则排名奖励取消。
                                <img src={require("../../../img/specialActivity/newYearCelebration/ranking.png")} alt="" className="responsive"/>
                            </div>
                            <div className="invite-count-ranking">
                                <div className="ranking-title text-center">
                                    <img src={require("../../../img/specialActivity/newYearCelebration/hero.png")} alt=""/>
                                </div>
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
                                            rankingList.length ?
                                            rankingList.map((item,index) => {
                                                index=index +1;
                                                let spanClass=classNames({
                                                    "first-place":index === 1,
                                                    "second-place":index === 2,
                                                    "third-place":index === 3
                                                });
                                                return (
                                                    <tr key={index}>
                                                        <td >
                                                           <span className={spanClass}>{index > 3 ? index : ""}</span>
                                                        </td>
                                                        <td>{item.mobile}</td>
                                                        <td>{item.countNumber}</td>
                                                    </tr>
                                                )
                                            })  :
                                            <tr>
                                                <td colSpan="3"><em>暂时没有数据！</em></td>
                                            </tr>
                                        }
                                    </tbody>
                                </table>
                                <div className="btn-wrapper text-center">
                                    <button className="nyc-second-btn" onClick={this._handleInviteFriend}>立即推荐</button>
                                </div>
                            </div>

                            <section className="rules-introduction">
                                <div className="rules-introduction-title">活动说明:</div>
                                <div className="rules-introduction-item">① 推荐好友投资时，被推荐人在注册时需填写推荐人的注册手机号码。</div>
                                <div className="rules-introduction-item">② 推荐8名及以上好友首投满1000元的用户还可参加排名赢现金红包活动，排名奖励取前三名，如未达到要求则排名奖励取消。</div>
                                <div className="rules-introduction-item">③ 推荐好友投资仅限投资平台新手标、月月赚、季季赚、好采投项目。</div>
                                <div className="rules-introduction-item">④ 推荐好友所获红包需单笔投资满3000元方可使用，仅限投资季季赚、好采投项目。</div>
                                <div className="rules-introduction-item">⑤ 排名赢现金红包活动奖励将于活动结束后7天内直接打入获奖者平台注册账号，可直接提现或投资。</div>
                                <div className="rules-introduction-item">⑥ 推荐好友如遇邀请人数相同的情况，则排名依据用户邀请最后一位好友完成首投的时间而定，早完成的用户则排名靠前。</div>
                                <div className="rules-introduction-item">⑦ 活动期间，通过技术手段刷数据的用户，一经查实，将取消活动资格。</div>
                            </section>
                        </div>
                    </Tabs.Item>
                </Tabs>
                <div className="rights-copy text-center">
                    农泰金融拥有本活动的最终解释权，如有疑问 <br/>
                    可联系农泰金融在线客服或拨打400-6322-688
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
        NewYearCelebrationAction.getInitialData();

        NewYearCelebrationStore.bind("userIsNotLogin",function(){
           this._openModal(1,"客官别急，请先登录或者注册！")
        }.bind(this));

        NewYearCelebrationStore.bind("change",function(){
            this.setState({
                data:NewYearCelebrationStore.getAll()
            })
        }.bind(this));

        NewYearCelebrationStore.bind("runOutOfDrawCount",function(){
            Message.broadcast("没有抽奖机会了，快去获取吧！");
        });

        NewYearCelebrationStore.bind("hitInTarget",function(){
            this.setState({
                data:NewYearCelebrationStore.getAll(),
                isHitInTarget:true
            })
        }.bind(this));

        NewYearCelebrationStore.bind("somethingWrongWithActivity",function(msg){
            Message.broadcast(msg);
        });

        NewYearCelebrationStore.bind("allowToJumpToInviteFriend",function(msg){
            this._jumpToInviteMyFriend();
        }.bind(this));

        NewYearCelebrationStore.bind("confirmToGetCashCoupon",function(cashCouponName){
            this._confirmToGetCashCoupon(cashCouponName);
        }.bind(this));

        NewYearCelebrationStore.bind("userHadGotCashCoupon",function(){
            this._hadGotCashCouponHint();
        }.bind(this));

        NewYearCelebrationStore.bind("submitGetCouponFormSuccess",function(){
            this._congratulateToGetCashCouponSuccess();
        }.bind(this));

        NewYearCelebrationStore.bind("requestIsStarting",function(){
            this.setState({
                isRequestStarting:true
            })
        }.bind(this));

        NewYearCelebrationStore.bind("requestIsEnd",function(){
            this.setState({
                isRequestStarting:false
            })
        }.bind(this));

    },
    componentWillUnmount(){
        NewYearCelebrationStore.clearAll();
    }
});

NewYearCelebration.contextTypes = {
    router:React.PropTypes.object.isRequired
};

module.exports=NewYearCelebration;
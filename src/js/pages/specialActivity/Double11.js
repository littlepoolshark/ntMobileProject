require("../../../scss/page/specialActivity/Double11.scss");
let Double11Action=require("../../actions/Double11Action");
let Double11Store=require("../../stores/Double11Store");
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

function Card(props){
    return (
        <div className="double11-card">
            <div className="double11-card-header">
                <span className="innerText" style={{width:props.titleWidth ? props.titleWidth : "auto"}}>{props.title}</span>
            </div>
            {props.children}
        </div>
    )
}


//标的的圆形进度条
let LoanPie=React.createClass({
    propTypes: {
        progress: PropTypes.number
    },
    getInitialState(){
      return {
          progress:0
      }
    },
   render(){
       let progress=this.state.progress;
       progress= progress === 100 ? progress : progress.toFixed(1);
       let rotateDegree=(this.state.progress * 3.6).toFixed(1);
       let rightRotateDegree=0;
       let leftRotateDegree=0;
       if(rotateDegree <= 180){
           rightRotateDegree=rotateDegree;
       }else {
           rightRotateDegree=180;
           leftRotateDegree=(rotateDegree - 180).toFixed(1);
       }

       return (
           <div className="outside-circle" id="loanPie">
               <div className="left-mask">
                   <div className="left-mask-inner" style={{transform:"rotate("+leftRotateDegree+"deg)"}}></div>
               </div>
               <div className="right-mask">
                   <div className="right-mask-inner" style={{transform:"rotate("+rightRotateDegree+"deg)"}}></div>
               </div>
               <div className="inside-circle">
                   <span>{progress}</span>%
               </div>
           </div>
       )
   },
   componentWillReceiveProps(nextProps){
       if(nextProps.progress){
           this.setState({
               progress:nextProps.progress
           })
       }
   }
});

//获奖名单滚动广播栏
let Broadcast=React.createClass({
    _updateBroadcastList(){
        Double11Action.updateBroadcastList();
    },
    render(){
        let top=(this.props.broadcastList.length -1) * (-60) + "px";
        return (
            <div className="broadcast-wrapper">
                <ul ref="broadcastList" id="broadcastList" style={{top:top}}>
                    {
                        this.props.broadcastList.map(function(item,index){
                            return (
                                <li key={index}>
                                    <div style={{marginRight:"10px"}}>
                                        <span className="broadcast-icon"></span>
                                    </div>
                                    <div>
                                        实时播报：恭喜{item.phoneNo}成功领取{item.interestRate}一张，还剩<strong>{item.remainCount}</strong>张可领取
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    },
    componentDidMount(){
        this._updateBroadcastListTimer=setInterval(function(){
            this._updateBroadcastList();
        }.bind(this),10000);

    },
    componentWillUnmount(){
        clearInterval(this._updateBroadcastListTimer);
        Double11Store.clearAll();
    }
});

//双11活动页面
let Double11 = React.createClass({
    mixins:[mixin],
    getInitialState(){
        return {
            isModalOpen:false,
            getInterestRewardIsRequesting:false,
            modalType:3,//3:未登录提示框 2：成功领取一张加息券
            data:Double11Store.getAll()
        }
    },
    _openModal(){
        this.setState({
            isModalOpen:true
        })
    },
    _closeModal(){
        this.setState({
            isModalOpen:false
        })
    },
    _jumpToFixedLoan(id,loanType){
        this.context.router.push({
            pathname:"fixedLoanIntroduction",
            query:{
                productId:id,
                type:loanType
            }
        })
    },
    _jumpToLoginComponent(){
        this.context.router.push({
            pathname:"/",
            query:{
                beforeComponent:"double11"
            }
        })
    },
    _jumpToRegisterComponent(){
        this.context.router.push({
            pathname:"/",
            query:{
                view:"register"
            }
        })
    },
    _jumpToCouponListComponent(){
        this.context.router.push({
            pathname:"couponList",
            query:{
                productType:"all"
            }
        })
    },
    _jumpToProductListComponent(){
        this.context.router.push({
            pathname:"productList"
        })
    },
    _handleGetInterestReward(){
        Double11Action.getInterestReward();
    },
    _renderInnerModal(modalType){
        if(modalType === 3){//提示用户没有登录的modal
            return (
                <div className="customize-modal">
                    <div className="customize-modal-header">
                        <span onClick={this._closeModal}></span>
                    </div>
                    <div className="customize-modal-body">
                        <img src={require("../../../img/specialActivity/modalBody3_double11.png")} alt=""/>
                    </div>
                    <div className="customize-modal-footer">
                        <Grid>
                            <Col cols={3}>
                                <button className="double11-btn" onClick={this._jumpToLoginComponent} style={{width:"6.5625rem"}} >请登录</button>
                            </Col>
                            <Col cols={3}>
                                <button className="double11-btn" onClick={this._jumpToRegisterComponent} style={{width:"6.5625rem"}} >请注册</button>
                            </Col>
                        </Grid>
                    </div>
                </div>
            )
        }else if(modalType === 2){//提示用户用户成功领取加息券的modal
            return (
                <div className="customize-modal">
                    <div className="customize-modal-header">
                        <span onClick={this._closeModal}></span>
                    </div>
                    <div className="customize-modal-body">
                        <img src={require("../../../img/specialActivity/modalBody2_double11.png")} alt=""/>
                    </div>
                    <div className="customize-modal-footer">
                        <button className="double11-btn" onClick={this._jumpToCouponListComponent}>去查看</button>
                    </div>
                </div>
            )
        }else if(modalType === 1){//提示用户已经领取过加息券的modal
            return (
                <div className="customize-modal">
                    <div className="customize-modal-header">
                        <span onClick={this._closeModal}></span>
                    </div>
                    <div className="customize-modal-body">
                        <img src={require("../../../img/specialActivity/modalBody1_double11.png")} alt=""/>
                    </div>
                    <div className="customize-modal-footer">
                        <button className="double11-btn" onClick={this._jumpToProductListComponent}>去投资</button>
                    </div>
                </div>
            )
        }
    },
    _renderDouble11PurchaseBtn(id,status,endTimeStamp,startTimeStamp){
        let loanStatusText=this._getProductStatusText("loan_product",status);
        if(loanStatusText === "预发布"){
            let countDownDuration=((endTimeStamp - startTimeStamp)/1000).toFixed(0);
            return (
                <button className="double11-btn countDown">
                    {/*<span className="white-clock-icon"></span>*/}
                    <CountDown
                        countDownDuration={countDownDuration}
                        textAfterFinish="立即抢购"
                        reload={true}
                        doNotReceiveNewProps={true}
                    />
                </button>
            )
        }else if(loanStatusText === "立即抢购"){
            return (
                <button className="double11-btn"  onClick={this._jumpToFixedLoan.bind(null,id,"loan_product")}>
                    <span>立即抢购</span>
                </button>
            )
        }else if(loanStatusText === "售罄"){
            return (
                <button className="double11-btn disabled">
                    <span>已售罄</span>
                </button>
            )
        }
    },
    render() {
        let {
            id,
            title,
            remainAmount,
            yearRate,
            deadline,
            status,
            progress,
            systemCurrTime,
            publishTime,
            rewardRate
            }=this.state.data.loanInfo;
        let {
            isOld,
            isGet
            }=this.state.data;
        let broadcastList=this.state.data.broadcastList;
        let isRequesting=this.state.getInterestRewardIsRequesting;
        let isLogin=!!cookie.getCookie("token");
        let isNewbieBtnDisabled=false,isOlderBtnDisabled=false;

        if(!isLogin){
            isNewbieBtnDisabled=false;
            isOlderBtnDisabled=false;
        }else {
            if(!isOld || isGet || isRequesting){
                isOlderBtnDisabled=true;
            }
            if(isOld || isGet || isRequesting){
                isNewbieBtnDisabled=true;
            }
        }

        let getNewbieRewardBtnClass=classNames({
            "get-reward-btn":true,
            "disabled":isNewbieBtnDisabled
        });

        let getOlderRewardBtnClass=classNames({
            "get-reward-btn":true,
            "disabled":isOlderBtnDisabled
        });

        return (
            <Container id="double11" scrollable={true}>
                <div className="banner">
                    <img src={require("../../../img/specialActivity/banner_double11.png")} alt="" className="responsive"/>
                </div>
                <div className="content-wrapper">
                    <Card title="全场最高加息1.1%">
                        <Broadcast  broadcastList={broadcastList}/>
                        <div className="interest-list">
                            <div className="left" onClick={ !isNewbieBtnDisabled ? this._handleGetInterestReward : null}>
                                <div className="interest-wrapper left">
                                    <span className={getNewbieRewardBtnClass}>{isGet && !isOld ? "已领取" : ( isRequesting ? "领取中..." :"立即领取")}</span>
                                </div>
                                <div className="subtitle">仅限 <strong>4000张</strong><br/>送完即止</div>
                            </div>
                            <div className="right" onClick={ !isOlderBtnDisabled ? this._handleGetInterestReward : null}>
                                <div className="interest-wrapper right">
                                    <span className={getOlderRewardBtnClass}>{isGet && isOld ? "已领取" : ( isRequesting ? "领取中..." : "立即领取")}</span>
                                </div>
                                <div className="subtitle">仅限 <strong>6000张</strong><br/>送完即止</div>
                            </div>
                        </div>
                    </Card>
                    <Card title="限时秒杀，收益高达11%" titleWidth="12.5rem">
                        <div className="activity-introduction">
                            活动期间，每日上午 <strong>11:11</strong>，
                            限时秒杀年化 <strong className="special">11%</strong>特惠标，每日一个，每人限投一万，先到先得。
                        </div>
                        <div className="loan-detail">
                            <div className="header text-center">{title}<span className="double11-tag">秒杀特惠标</span></div>
                            <div className="body">
                                <Grid>
                                    <Col  cols={2}>
                                        <div className="amount text-center rewardRate-wrapper" >
                                            <strong>{yearRate}</strong>%
                                            {
                                                rewardRate > 0 ?
                                                <span className="rewardRate">{"+"+rewardRate+"%"}</span>  :
                                                null
                                            }

                                        </div>
                                        <div className="subtitle text-center">预期年化率</div>
                                    </Col>
                                    <Col  cols={2}>
                                        <div className="amount text-center"><strong>{deadline}</strong>个月</div>
                                        <div className="subtitle text-center">项目期限</div>
                                    </Col>
                                    <Col  cols={2}>
                                        <div className="amount text-center">
                                            <LoanPie progress={progress}/>
                                        </div>
                                        <div className="subtitle text-center">项目进度</div>
                                    </Col>
                                </Grid>
                            </div>
                            <div className="footer">
                                <div className="text-center">
                                    {this._renderDouble11PurchaseBtn(id,status,publishTime,systemCurrTime)}
                                </div>
                                <div className="remainAmount text-center">剩余{remainAmount}元</div>
                                <div className="text-center more-btn"><Link to="productList"> 更多项目<span>></span> </Link></div>
                            </div>
                        </div>
                    </Card>
                    <Card title="投资就送红包">
                        <div className="activity-reward-title" >仅限投资平台季季赚、好采投项目</div>
                        <table className="activity-reward-list">
                            <thead>
                                <tr>
                                    <th>单笔投资额</th>
                                    <th>赠送红包</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>5000≤￥&lt;10000</td>
                                    <td>10元红包</td>
                                </tr>
                                <tr>
                                    <td>10000≤￥&lt;30000</td>
                                    <td>20元红包</td>
                                </tr>
                                <tr>
                                    <td>30000≤￥&lt;50000</td>
                                    <td>50元红包</td>
                                </tr>
                                <tr>
                                    <td>50000≤￥</td>
                                    <td>100元红包</td>
                                </tr>
                            </tbody>
                        </table>
                    </Card>
                    <div className="activity-rules">
                        <div className="activity-rules-header">
                            <span>活动详情</span>
                        </div>
                        <div className="body">
                            <div className="section">
                                <div><span className="section-badge">1</span></div>
                                <div>在2016年11月9日0点前注册的客户视为老用户，反之为新用户。</div>
                            </div>
                            <div className="section">
                                <div><span className="section-badge">2</span></div>
                                <div>加息券仅限投资平台好采投项目才可使用，债转项目不可以使用。</div>
                            </div>
                            <div className="section">
                                <div><span className="section-badge">3</span></div>
                                <div>加息券使用有效期为7天（从用户领取之日起计算），过期则作废。</div>
                            </div>
                        </div>
                    </div>
                    <div className="right-declaration">
                        <img src={require("../../../img/specialActivity/botom_bg@2x.png")} alt="" className="bgImg"/>
                        <div className="text-center">
                            本活动最终解释权归农泰金融所有<br/>
                            如有疑问，请咨询QQ在线客服或致电：400-6322-688
                        </div>
                    </div>
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
        Double11Action.getInitialData();
        Double11Action.updateBroadcastList();

        Double11Store.bind("change",function(){
            this.setState({
                data:Double11Store.getAll()
            })
        }.bind(this));


        Double11Store.bind("userIsNotLogin",function(){
            this.setState({
                isModalOpen:true,
                modalType:3
            })
        }.bind(this));

        Double11Store.bind("getInterestRewardIsRequesting",function(){
            this.setState({
                getInterestRewardIsRequesting:true
            })
        }.bind(this));


        Double11Store.bind("getInterestRewardSuccess",function(){
            this.setState({
                isModalOpen:true,
                modalType:2,
                getInterestRewardIsRequesting:false
            })
        }.bind(this));

        Double11Store.bind("userHadGetInterestReward",function(){
            this.setState({
                isModalOpen:true,
                modalType:1,
                getInterestRewardIsRequesting:false
            })
        }.bind(this));

        Double11Store.bind("activityIsDisabled",function(msg){
            Message.broadcast(msg);
            this.setState({
                getInterestRewardIsRequesting:false
            })
        });

    }
});

Double11.contextTypes = {
    router:React.PropTypes.object.isRequired
};

module.exports=Double11;
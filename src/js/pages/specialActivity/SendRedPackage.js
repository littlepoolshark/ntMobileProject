require("../../../scss/page/specialActivity/SendRedPackage.scss");
let SendRedPackageAction=require("../../actions/SendRedPackageAction");
let SendRedPackageStore=require("../../stores/SendRedPackageStore");
import React,{ PropTypes } from "react";
import { Link } from "react-router";
import classNames from "classnames";

//ui component
import Container from "../../UIComponents/Container";
import Modal from "../../UIComponents/modal/SpecialModal";
import Grid from "../../UIComponents/Grid";
import Col from "../../UIComponents/Col";
import Message from "../../UIComponents/Message";
import NavBar from "../../UIComponents/NavBar";
import SlideMask from "../../UIComponents/SlideMask";
import View from "../../UIComponents/View";

//lib
import mixin from "../utilities/mixin";
import TransitionEvent from '../../UIComponents/utils/TransitionEvents';
import cookie from "../../lib/cookie";


function showShareMenuWithJS(){
    var params = {
        "text" : "一个红包，一份情谊，领取好友红包，一起喜迎新年吧！",
        "imageUrl" : "http://img0.bdstatic.com/img/image/shouye/tangwei.jpg",
        "title" : "有人正在派发红包，快看看给你发了多少",
        "url":"https://www.ntjrchina.com/weixin/#/home",
        "description" : "测试的描述",
        "type" : $sharesdk.ContentType.Text
    };
    $sharesdk.showShareMenu(null, params, 100, 100, function (reqId, platform, state, shareInfo, error) {

        alert("state = " + state + "\n shareInfo = " + shareInfo + "\n error = " + error);

    });
}

//旋转抽奖组件
let LuckyDraw=React.createClass({
    propTypes: {
        prizeId: PropTypes.string,
        rotateDegreeMap:PropTypes.object,
        onStart:PropTypes.func,
        onFinished:PropTypes.func,
        isHitInTarget:PropTypes.bool,
        drawCount:PropTypes.number
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

        let needleClass=classNames({
            "lucky-draw-needle":true,
            "disabled":this.props.drawChanceCount < 1
        })
        let rotateDegree = this.props.rotateDegreeMap[this.props.prizeId] || 0;
        let lastCircleCount=this.state.drawCount * this.initCircleCount * 360 + rotateDegree  ;
        let transformValue="rotate(" + lastCircleCount + "deg)";

        return (
            <div className="lucky-draw-wrapper" >
                <div className="lucky-draw-turntable" style={{webkitTransform:transformValue,transform:transformValue}} ref="turntable"></div>
                <div className={needleClass} onClick={this.props.drawChanceCount >= 1 ? this._handleNeedleClick :null}></div>
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


let CustomizeModal=function(props){
    let {
        modalType,
        children,
        onDismiss
        }=props;
    let isRedBgModal=["sendRedPackageRecord","congratulation"].indexOf(modalType) > -1,
        isYellowWhiteModal=["loginHint","rulesDescription","redPackageDescription","updateAppHint"].indexOf(modalType) > -1;
    let modalClass=classNames({
        "redBg-modal":isRedBgModal,
        "yellowWhite-modal":isYellowWhiteModal,
        "customize-modal":true
    });
    return (
        <div className={modalClass}>
            <div className="customize-modal-header">
                <span onClick={onDismiss}> </span>
            </div>
            <div className="customize-modal-body">
                {children}
            </div>
        </div>
    )
}



//红包大派送活动页面
let SendRedPackage = React.createClass({
    getInitialState(){
        //localStorage.clear();
        return {
            data:SendRedPackageStore.getAll(),
            isHitInTarget:false,
            isModalOpen:false,
            isRequestStarting:false,//防止用户连续点击导致的重复提交
            modalType:"loginHint",
            isMaskOpen:false
        }
    },
    _closeModal(){
        this.setState({
            isModalOpen:false,
            isRequestStarting:false
        });
    },
    _openModal(modalType){
        this.setState({
            isModalOpen:true,
            modalType:modalType,
            isHitInTarget:false
        })
    },
    _closeMask(){
        this.setState({
            isMaskOpen:false
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
            SendRedPackageAction.luckyDraw();
        }
    },
    _shareRedPackage(){
        let isLogin=!!cookie.getCookie("token") && cookie.getCookie("token") !== "(null)";
        if(isLogin){
            this._shareUrl();
        }
        SendRedPackageAction.shareRedPackage();
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
    _isRealHitInTarget(){

        let prizeId=this.state.data.prizeId;
        let prizeList=this.state.data.prizeList;
        let notHitInPrizeId="";
        for(let i=0;i<prizeList.length;i++){
            if(!prizeList[i].amount){
                notHitInPrizeId=prizeList[i].goodsId;
            }
        }
        return parseInt(prizeId) !== parseInt(notHitInPrizeId) ;
    },
    congratulateToHitInTarget(){
        this._openModal("congratulation");
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
                beforeComponent:"sendRedPackage",
                view:"login"
            }
        })
    },
    _jumpToRegister(){
        this.context.router.push({
            pathname:"/",
            query:{
                beforeComponent:"sendRedPackage",
                view:"register"
            }
        })
    },
    _jumpToMyCouponList(){
        this.context.router.push({
            pathname:"couponList",
            query:{
                beforeComponent:"sendRedPackage",
                productType:"all"
            }
        })
    },
    _shareUrl(){
        let ua = navigator.userAgent;

        let {
            userName,
            userPhoneNo
            }=this.state.data;

        let userNameForApp="";

        if(!!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){
            userNameForApp="";
        }else {
            userNameForApp=userName ? "*"+userName.slice(1) : "";
        }

        function generateFriendName(userName,userPhoneNo){
            let friendName="";
            let userNameStr="",userPhoneNoStr="";
            userNameStr=userName ? "*"+userName.slice(1) : "";
            userPhoneNoStr="*" + userPhoneNo.slice(-3) + "用户";
            friendName=userNameStr || userPhoneNoStr;

            return friendName;
        }


        let shareInfo= {
            "text" : "一个红包，一份情谊，领取好友红包，一起喜迎新年吧！",
            "imageUrl" : "https://www.ntjrchina.com/upload/ad/openRedPackage-logo.png",
            "title" : generateFriendName(userName,userPhoneNo) + "正在派发红包，快看看给你发了多少",
            "url":"https://www.ntjrchina.com/weixin/#/openRedPackage?name=" + userNameForApp + "&inviteCode=" + userPhoneNo,
            "description" : "亿元红包大派送"
        };

        let deviceType=cookie.getCookie("deviceType");
        let isInWeChatBrowser=ua.indexOf("MicroMessenger") > -1 ;
        let isAndroid=/android/i.test(ua) || ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1;
        let isIOS=!!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        let isNewAndroidApp= !!deviceType && deviceType.toLowerCase() === "ntandroid";
        let isNewIOSApp= !!deviceType && deviceType.toLowerCase() === "ntios";
        let isOldAndroidApp=isAndroid && !isNewAndroidApp && !isInWeChatBrowser;
        let isOldIOSApp=isIOS && !isNewIOSApp && !isInWeChatBrowser;

        if(isNewAndroidApp) {
            window.AndroidWebView.showShareMenu(JSON.stringify(shareInfo));
        }else if(isNewIOSApp){
            window.webkit.messageHandlers.showShareMenu.postMessage(JSON.stringify(shareInfo));
        }else if(isOldAndroidApp || isOldIOSApp){
            this._openModal("updateAppHint");
        }else {
            this.setState({
                isMaskOpen:true
            },function(){
                document.title=generateFriendName(userName,userPhoneNo) +"正在派发红包，快看看给你发了多少？";
                window.history.replaceState(null,"农泰金融送你一个大红包 ","#/openRedPackage?name="+ (userName ? "*"+userName.slice(1) : "")  + "&inviteCode="+ userPhoneNo);
            });
        }
    },
    _renderInnerModal(modalType){
        switch (modalType){
            case "loginHint":
                return (
                    <CustomizeModal onDismiss={this._closeModal} modalType={modalType}>
                        <div className="title">您暂未登录，请登录！ </div>
                        <div className="customize-modal-footer">
                            <button className="srp-btn second small" onClick={this._jumpToLogin}>去登录</button>
                            <button className="srp-btn second small" onClick={this._jumpToRegister}>去注册</button>
                        </div>
                    </CustomizeModal>
                );
                break;
            case "rulesDescription":
                return (
                    <CustomizeModal onDismiss={this._closeModal} modalType={modalType}>
                        <div className="title">活动说明</div>
                        <div className="rules-description">
                            <p>1、所有注册用户均可分享红包给好友，且不限次数，仅限新用户领取。</p>
                            <p>2、分享红包分现金红包和投资红包两种，现金红包可直接提现，投资红包可投资返现。</p>
                            <p>3、新用户成功领取红包并注册后，将成为红包分享者好友，红包分享者可享其年化投资额0.5%分成收益。</p>
                            <p>4、用户分享红包给好友可参与抽奖，每分享1次可获抽奖机会1次，每天限量5次。</p>
                            <p>5、新用户领取红包后，需在7天内注册，逾期红包自动失效。</p>
                        </div>
                    </CustomizeModal>
                );
                break;
            case "redPackageDescription":
                return (
                    <CustomizeModal onDismiss={this._closeModal} modalType={modalType}>
                        <div className="redPackage-description">
                            <table>
                                <thead>
                                    <tr>
                                        <th>红包金额</th>
                                        <th>最低投资金额</th>
                                        <th>有效期</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1元</td>
                                        <td>100元</td>
                                        <td>60天</td>
                                    </tr>
                                    <tr>
                                        <td>5元</td>
                                        <td>500元</td>
                                        <td>60天</td>
                                    </tr>
                                    <tr>
                                        <td>10元</td>
                                        <td>1000元</td>
                                        <td>60天</td>
                                    </tr>
                                    <tr>
                                        <td>20元</td>
                                        <td>2000元</td>
                                        <td>60天</td>
                                    </tr>
                                    <tr>
                                        <td>50元</td>
                                        <td>5000元</td>
                                        <td>60天</td>
                                    </tr>
                                    <tr>
                                        <td>150元</td>
                                        <td>15000元</td>
                                        <td>60天</td>
                                    </tr>
                                    <tr>
                                        <td>500元</td>
                                        <td>50000元</td>
                                        <td>60天</td>
                                    </tr>
                                    <tr>
                                        <td>1000元</td>
                                        <td>100000元</td>
                                        <td>60天</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </CustomizeModal>
                );
                break;
            case "sendRedPackageRecord":
                return (
                    <CustomizeModal onDismiss={this._closeModal} modalType={modalType}>
                        <div className="title">被领取红包记录</div>
                        <div className="sendRedPackage-record">
                            <table>
                                <tbody>
                                {
                                    this.state.data.sendRedPackageRecordList.length ?
                                        this.state.data.sendRedPackageRecordList.map((item,index) => {
                                            return (
                                                <tr key={index+1}>
                                                    <td>{item.mobile}</td>
                                                    <td>现金红包{item.red_money}元</td>
                                                </tr>
                                            )
                                        })  :
                                        <tr>
                                            <td colspan="2"><em>暂时没有数据!!</em></td>
                                        </tr>
                                }
                                </tbody>
                            </table>
                        </div>
                    </CustomizeModal>
                );
                break;
            case "congratulation":
                let prizeNameMap=this._generatePrizeNameMap();
                return (
                    <CustomizeModal onDismiss={this._closeModal} modalType={modalType}>
                        {
                            this._isRealHitInTarget() ?
                            <div className="title">恭喜你<br/><span>抽中了{prizeNameMap[this.state.data.prizeId]}</span></div> :
                            <div className="title">很遗憾<br/><span>没有抽中奖品哦！</span></div>
                        }
                        {
                            this._isRealHitInTarget() ?
                            <div className="congratulation-hintIn">
                                <button className="srp-btn primary" onClick={this._jumpToMyCouponList}>去查看</button>
                            </div> :
                            <div className="congratulation-hintIn">
                                <button className="srp-btn primary" onClick={this._closeModal}>再接再厉</button>
                            </div>
                        }

                    </CustomizeModal>
                );
                break;
            case "updateAppHint":
                return (
                    <CustomizeModal onDismiss={this._closeModal} modalType={modalType}>
                        <div className="title">
                            亲，红包虽好，可还差一步哦！
                        </div>
                        <div className="updateApp-hint  text-center">
                            赶快下载新版APP为好友发红包吧！<br/>（或前往农泰金融微信公众号参加活动）
                        </div>
                        <div className="text-center">
                            <button className="srp-btn second" onClick={this._closeModal}>我知道了</button>
                        </div>
                    </CustomizeModal>
                );
                break;
            default:
                break;
        }
    },
    render() {
        let rotateDegreeMap=this._generateRotateDegreeMap();

        let {
            prizeId,
            drawCount,
            sendRedPackageRecordList,
            userName
            }=this.state.data;

        let isHitInTarget=this.state.isHitInTarget;
        let isLogin=!!cookie.getCookie("token");
        let leftNav= {
            component:"a",
            icon: 'left-nav',
            title: '首页'
        };

        return (
            <View id="sendRedPackage-view">

                <Container id="sendRedPackage" scrollable={true}>
                    <NavBar
                        title="亿元红包大派送"
                        leftNav={[leftNav]}
                        amStyle="primary"
                        onAction={this._handleNavClick}
                    />
                    <img src={require("../../../img/specialActivity/sendRedPackage/banner.jpg")} alt="" className="banner"/>
                    <div className="sendRedPackage-section">
                        <div className="title">
                            <img src={require("../../../img/specialActivity/sendRedPackage/title.png")} alt=""/>
                        </div>
                        <div className="subtitle text-right"><a href="javascript:void(0)" onClick={this._openModal.bind(null,"rulesDescription")}>活动说明></a></div>
                        <div className="body">
                            <div className="body-header">
                                <div><img src={require("../../../img/specialActivity/sendRedPackage/redpackage1.png")} alt="" className="responsive-img"/></div>
                                <div><img src={require("../../../img/specialActivity/sendRedPackage/redpackage2.png")} alt="" className="responsive-img"/></div>
                            </div>
                            <div className="body-footer">
                                <div className="title text-center">分享红包类别</div>
                                <div className="content">
                                    <div className="text-center">
                                        <span className="long-tag">投资红包（随机）</span><br/>
                                        <span>1元~1000元</span><br/>
                                        <a href="javascript:void(0)" onClick={this._openModal.bind(null,"redPackageDescription")}>查看详情</a>
                                    </div>
                                    <div className="text-center">
                                        <span className="long-tag">现金红包（随机）</span><br/>
                                        <span>8元、68元</span><br/>
                                        <span>168元、6888元</span>
                                    </div>
                                </div>
                                <div className="remark">
                                    ★新用户领取红包类别及金额为系统随机发放，以实际领取的为准。
                                </div>
                            </div>
                            <div className="makeup-angle top-left"></div>
                            <div className="makeup-angle top-right"></div>
                            <div className="makeup-angle bottom-left"></div>
                            <div className="makeup-angle bottom-right"></div>
                            <div className="markup-firecracker left"></div>
                            <div className="markup-firecracker right"></div>
                        </div>
                        <div className="footer text-center">
                            <button className="srp-btn primary" onClick={this._shareRedPackage}>我要发红包 </button>
                            <div className="text-center">
                            <span>
                                领取人数：
                                {
                                    isLogin ?
                                        <span>{sendRedPackageRecordList.length}人</span> :
                                        <a href="javascript:void(0)" onClick={this._jumpToLogin}>登录查看</a>
                                }
                            </span>
                                {
                                    isLogin ?
                                        <span className="check-detail-btn" onClick={this._openModal.bind(null,"sendRedPackageRecord")}>查看详情</span>  :
                                        null
                                }
                            </div>
                        </div>
                    </div>
                    <div className="luckDraw-section">
                        <div className="header">
                            <div className="left-drawCount">
                                抽奖机会：
                                {
                                    isLogin ?
                                        <span><span className="drawCount-tag">{drawCount}</span>次</span>:
                                        <a href="javascript:void(0)" onClick={this._jumpToLogin}>登录查看</a>
                                }
                            </div>
                        </div>
                        <LuckyDraw
                            drawChanceCount={drawCount}
                            rotateDegreeMap={rotateDegreeMap}
                            prizeId={prizeId}
                            isHitInTarget={isHitInTarget}
                            onStart={this.beingToDraw}
                            onFinished={this.congratulateToHitInTarget}
                        />
                    </div>
                    <div className="rights-copy text-center">
                        农泰金融拥有本活动的最终解释权，如有疑问  <br/>
                        可联系农泰金融在线客服或拨打400-6322-688<br/>
                        <img src={require("../../../img/specialActivity/sendRedPackage/bottom-bg.png")} alt="" className="responsive-img"/>
                    </div>
                    <Modal
                        isOpen={this.state.isModalOpen}
                        role="customize"
                    >
                        {this._renderInnerModal(this.state.modalType)}
                    </Modal>
                    <SlideMask isMaskOpen={this.state.isMaskOpen} onClosed={this._closeMask}>
                        <img src={require("../../../img/share-guide.png")} alt="" className="share-guide-img"/>
                    </SlideMask>
                </Container>
            </View>
        );
    },
    componentDidMount(){
        SendRedPackageAction.getInitialData();

        SendRedPackageStore.bind("change",function(){
            this.setState({
                data:SendRedPackageStore.getAll()
            })
        }.bind(this));

        SendRedPackageStore.bind("userIsNotLogin",function(){
            this._openModal("loginHint");
        }.bind(this));

        SendRedPackageStore.bind("somethingWrongWithActivity",function(msg){
           Message.broadcast(msg);
        });

        SendRedPackageStore.bind("requestIsStarting",function(){
            this.setState({
                isRequestStarting:true
            })
        }.bind(this));

        SendRedPackageStore.bind("hitInTarget",function(){
            this.setState({
                data:SendRedPackageStore.getAll(),
                isHitInTarget:true
            })
        }.bind(this));

        /*SendRedPackageStore.bind("canShareUrlNow",function(){
            this._shareUrl();
        }.bind(this));*/

        SendRedPackageStore.bind("shareRedPackageSuccess",function(msg){
            this.setState({
                data:SendRedPackageStore.getAll(),
                isRequestStarting:false
            });
        }.bind(this));

        SendRedPackageStore.bind("shareRedPackageFailed",function(msg){
            //Message.broadcast(msg);
        }.bind(this));


    },
    componentWillUnmount(){
        SendRedPackageStore.clearAll();
    }
});

SendRedPackage.contextTypes = {
    router:React.PropTypes.object.isRequired
};

module.exports=SendRedPackage;
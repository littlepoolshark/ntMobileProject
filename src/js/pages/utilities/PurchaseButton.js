import React from "react";


//ui component
import Button from "../../UIComponents/Button";
import Message from "../../UIComponents/Message";
import Modal from "../../UIComponents/modal/Modal";

//lib
import CountDown from "./CountDown";

//utilites component
import mixin from "./mixin";
let cookie=require("../../lib/cookie");
let ajax=require("../../lib/ajax");

/*
* @desc 所有产品在详情页的购买按钮。主要是根据产品的类型和状态，跳转到不同的支付页面（天天赚的预约页面和公用的支付页面）。
*
* @author sam liu
* @date 2016-07-05
*/

let PurchaseButton=React.createClass({
    mixins:[mixin],
    getInitialState(){
        return {
            isModalOpen:false,
            confirmText:"",
            type:1
        }
    },
    _formatTimeStamp(timeStamp){
        let timeStr="";
        let date=new Date(timeStamp);
        let hours=date.getHours();
        let minutes=date.getMinutes();
        timeStr=(hours < 10 ? "0"+hours : hours) + ":" + (minutes < 10 ? "0"+minutes : minutes);
        return timeStr;
    },
    _renderButtonText(){
        let {
            type,
            status,
            publishTime,
            sysCurrentTime
            }=this.props;
        let buttonText=this._getProductStatusText(type,status);
        //预发布状态下，如果服务器现在的时间距离标的发布的时间大于1分钟(等于60000毫秒)话，就显示形如"12:00开抢"
        //如果小于1分钟，则进入倒计时状态
        //note：这里存在一个问题，就是服务器现在时间还没到发布时间，后台返回的status字段的值早就变成"bidding"，也就是抢购中的状态
        if(status && status === "prepublish" && publishTime){
            if(publishTime - sysCurrentTime < 60000){
                buttonText=<CountDown countDownDuration={60} textAfterFinish="立即抢购"/>;
            }else {
                buttonText=this._formatTimeStamp(this.props.publishTime)+"开抢";
            }
        }
        return buttonText;
    },
    _handleOnClick(){
        let {
            id,
            type,
            status,
            productName,
            remainAmount,
            productApr,
            rewardRate,
            repaymentLimit,
            mainMonth,
            minNotRateTime,
            maxNotRateTime
            }=this.props;

        let _self=this;

        let productStatusText=this._getProductStatusText(type,status);
        let isLogin=!!cookie.getCookie("token");
        let locationQuery={
            type:type,
            productId:id,
            productName:productName,
            remainAmount:remainAmount,
            productApr:productApr,
            rewardRate:rewardRate,
            productDeadline:repaymentLimit,
            mainMonth:mainMonth,
            minNotRateTime:minNotRateTime,
            maxNotRateTime:maxNotRateTime
        };
        if(productStatusText === "售罄"){
            Message.broadcast("该标的已经售罄！");
        } else if(productStatusText === "预发布"){
            Message.broadcast("该标的预发布中，目前还不能购买");
        }else if(!isLogin){
            this.setState({
                isModalOpen:true,
                confirmText:"请先登录！",
                type:1
            })
        }else if(isLogin){//如果用户登录了，则检查用户是否设置了交易密码和进行了实名认证
            ajax({
                async:false,
                ciUrl:"/user/v2/securityCenter",
                success(rs){
                    if(rs.code === 0){
                        locationQuery.userBalance=rs.data.available;
                        if(rs.data.dealPassVerifyInfo.isDealPwdSet === "no" || rs.data.idCardVerifyInfo.idCardVerified === "no"){
                            _self.setState({
                                isModalOpen:true,
                                confirmText:"请先升级您账户的安全级别！",
                                type:2
                            })
                        } else if(productStatusText === "预约"){
                            _self.context.router.push({
                                pathname:"/dailyEarnAppointment",
                                query:locationQuery
                            });
                        } else {
                            _self.context.router.push({
                                pathname:"/payment",
                                query:locationQuery
                            });
                        }
                    }else {
                        alert("后台返回的描述是："+rs.description);
                    }

                }
            })
        }
    },
    _jumpToNextLocation(confirm){
        if(confirm){
            if(this.state.type === 1){//type等于1是代表没有登录的状态
                this.context.router.push({
                    pathname:"/"
                });
            }else if(this.state.type === 2){//type等于2是代表用户没有设置交易密码或者没有进行实名认证
                this.context.router.push({
                    pathname:"/securityCenter"
                });
            }

        }else {
            this._handleModalClose();
        }

    },
    _handleModalClose(){
        this.setState({
            isModalOpen:false,
            confirmText:"",
            type:1
        })

    },
    render(){

        return (
            <div className="purchaseButton-wrapper"
                 style={{
                width:"100%",
                position:"fixed",
                left:0,
                bottom:0,
                zIndex:1020
            }}>
                <Button
                    block={true}
                    amStyle="primary"
                    style={{marginBottom:0}}
                    onClick={this._handleOnClick}
                    >
                    {this._renderButtonText()}
                </Button>
                <Modal
                    title=""
                    ref="modal"
                    isOpen={this.state.isModalOpen}
                    role="confirm"
                    onAction={this._jumpToNextLocation}
                >
                   {this.state.confirmText}
                </Modal>
            </div>
        )
    }

});

PurchaseButton.contextTypes = {
    router:React.PropTypes.object.isRequired
};

export default  PurchaseButton;
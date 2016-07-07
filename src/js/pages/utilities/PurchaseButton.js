import React from "react";


//ui component
import Button from "../../UIComponents/Button";
import Message from "../../UIComponents/Message";
import Modal from "../../UIComponents/modal/Modal";

//utilites component
import mixin from "./mixin";
import cookie from "../../lib/cookie";

/*
* @desc 所有产品在详情页的购买按钮。主要是根据产品的类型和状态，跳转到不同的支付页面（天天赚的预约页面和公用的支付页面）。
*
* @author sam liu
* @date 2016-07-05
*/

let PurchaseButton=React.createClass({
    mixins:[mixin],
    _renderButtonText(){
        let buttonText=this._getProductStatusText(this.props.type,this.props.status);
        return buttonText;
    },
    _handleOnClick(){
        let productStatusText=this._getProductStatusText(this.props.type,this.props.status);
        let isLogin=!!cookie.getCookie("token");
        if(!isLogin){
            this.refs.modal.open();
        } else if(productStatusText === "售罄"){
            Message.broadcast("该标的已经售罄！");
        }else if(productStatusText === "预约"){
            //"this.props.history" and "pushState" had been deprecated,so use context.router instead
            //this.props.history.pushState(null,"DailyEarnAppointment");
            this.context.router.push({
                pathname:"/dailyEarnAppointment"
            });
        } else {
            this.context.router.push({
                pathname:"/payment",
                query:{
                    type:this.props.type
                }
            });
        }
    },
    _jumpToLogin(confim){
        if(confim){
            this.context.router.push({
                pathname:"/"
            });
        }else {
            this._handleModalClose();
        }

    },
    _handleModalClose(){
        this.refs.modal.close();
    },
    render(){

        return (
            <div className="purchaseButton-wrapper"
                 onClick={this._handleOnClick}
                 style={{
                width:"100%",
                position:"fixed",
                left:0,
                bottom:0
            }}>
                <Button
                    block={true}
                    amStyle="primary"
                    style={{marginBottom:0}}
                    >
                    {this._renderButtonText()}
                </Button>
                <Modal
                    title=""
                    ref="modal"
                    isOpen={false}
                    role="confirm"
                    onDismiss={this._handleModalClose}
                    onAction={this._jumpToLogin}
                >
                    请登录后再购买！
                </Modal>
            </div>
        )
    }

});

PurchaseButton.contextTypes = {
    router:React.PropTypes.object.isRequired
};

export default  PurchaseButton;
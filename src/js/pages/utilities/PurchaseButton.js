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
        let {
            type,
            status,
            productName,
            remainAmount,
            productApr
            }=this.props;
        let productStatusText=this._getProductStatusText(type,status);
        let isLogin=!!cookie.getCookie("token");
        let locationQuery={
            type:type,
            productName:productName,
            remainAmount:remainAmount,
            productApr:productApr
        };
        if(!isLogin){
            this.refs.modal.open();
        } else if(productStatusText === "售罄"){
            Message.broadcast("该标的已经售罄！");
        }else if(productStatusText === "预约"){
            this.context.router.push({
                pathname:"/dailyEarnAppointment"
            });
        } else {
            this.context.router.push({
                pathname:"/payment",
                query:locationQuery
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
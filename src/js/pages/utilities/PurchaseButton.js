import React from "react";

//ui component
import Button from "../../UIComponents/Button";
import Message from "../../UIComponents/Message";

//utilites component
import mixin from "./mixin";

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
        if(productStatusText === "售罄"){
            Message.broadcast("该标的已经售罄！");
        }else if(productStatusText === "预约"){
            this.props.history.pushState(null,"DailyEarnAppointment");
        } else {
            this.props.history.pushState(null,"/Payment/?type="+this.props.type);
        }
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
                    >
                    {this._renderButtonText()}
                </Button>
            </div>
        )
    }
});

export default  PurchaseButton;
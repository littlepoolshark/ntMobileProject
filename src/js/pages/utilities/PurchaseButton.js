import React from "react";

//ui component
import Button from "../../UIComponents/Button";
import Message from "../../UIComponents/Message";

//utilites component
import productStatusMixin from "./productStatusMixin";

let PurchaseButton=React.createClass({
    mixins:[productStatusMixin],
    _renderButtonText(){
        let buttonText=this.getProductStatusText(this.props.type,this.props.status);
        return buttonText;
    },
    _handleOnClick(){
        let productStatusText=this.getProductStatusText(this.props.type,this.props.status);
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
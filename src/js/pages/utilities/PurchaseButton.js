import React from "react";

//ui component
import Button from "../../UIComponents/Button";
import Message from "../../UIComponents/Message";

let PurchaseButton=React.createClass({
    propTypes:{
        isSoldOut:React.PropTypes.bool.isRequired,
        type:React.PropTypes.string.isRequired
    },
    getDefaultProps(){
        return {
            isSoldOut:false,
            type:"monthlyEarn"
        }
    },
    _renderButtonText(){
        let buttonText="";
        if(this.props.type === "dailyEarn"){
            return this.props.isSoldOut ? "预约" : "立即购买";
        }else {
            return this.props.isSoldOut ? "售罄" : "立即购买";
        }
    },
    _handleOnClick(){
        if(this.props.isSoldOut && this.props.type !== "dailyEarn"){
            Message.broadcast("该标的已经售罄！");
        }else if(this.props.isSoldOut && this.props.type === "dailyEarn"){
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
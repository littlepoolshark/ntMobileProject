/*
* This component is used for broadcasting a message when user interact with the application.
* It try to simulate the native app as possible as it can.
*
* @author sam liu
* @date 2016-06-15
*/
let microEvent=require("../lib/microevent");
let pubsub={};
let msgBoxContainer=null;
microEvent.mixin(pubsub);

import React from 'react';
import ReactDOM from 'react-dom';
import TransitionEvent from './utils/TransitionEvents';
import classNames from 'classnames';

const DEFAULT_INNER_STYLE={
    backgroundColor:"rgba(0, 0, 0, 0.5)",
    color:"#fff"
};

const Message=React.createClass({
    getInitialState(){
        return {
            "hide":true,
            "msg":"",
            "innerStyle":DEFAULT_INNER_STYLE
        }
    },
    render(){
        let {
            hide,
            msg,
            innerStyle
        }=this.state;

        let msgBoxClasses=classNames(
            "msg-box-wrapper",
            {
                "msg-hide":hide
            }
        );
        return (
            <div className={msgBoxClasses} ref="msgBox">
                <div className="msg-box" style={innerStyle}>
                    {msg}
                </div>
            </div>

        )
    },
    componentDidMount(){
        pubsub.bind("msgBox.broadcast",function(msg,innerstyle){
            this.setState({
                "hide":false,
                "msg":msg,
                "innerStyle":innerstyle || DEFAULT_INNER_STYLE
            })
        }.bind(this));
    },
    componentDidUpdate(){
        if(this.state.hide !== true){
            setTimeout(function(){
                this.setState({
                    "hide":true
                })
            }.bind(this),2000)
        }
        // dont know why,the function call stack did not into the "transitionend" event handler,
        // because of the transitionend event did not happend? the reason need to be discovery!!
        //TransitionEvent.on(this.refs.msgBox,function(){
        //    console.log("TransitionEvent");
        //    if(this.state.hide !== true){
        //        setTimeout(function(){
        //            this.setState({
        //                "hide":true
        //            })
        //        }.bind(this),2000)
        //    }
        //}.bind(this));
    }
});

Message.contextTypes = {
    router:React.PropTypes.object.isRequired
};

Message.broadcast=function(msg,innerstyle){
    if(!!!msgBoxContainer){
        createMsgBoxContainer();
    }
    pubsub.trigger("msgBox.broadcast",msg,innerstyle);
}

function createMsgBoxContainer(){
    msgBoxContainer=document.createElement("div");
    document.body.appendChild(msgBoxContainer);
    ReactDOM.render(<Message/>,msgBoxContainer);
}

export default Message;
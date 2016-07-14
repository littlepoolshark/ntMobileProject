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


const Message=React.createClass({
    getInitialState(){
        return {
            "hide":true,
            "msg":""
        }
    },
    render(){
        let msgBoxClasses=classNames({"msg-hide":this.state.hide},{"msg-box-wrapper":true});
        return (
            <div className={msgBoxClasses} ref="msgBox">
                <div className="msg-box">
                    {this.state.msg}
                </div>
            </div>

        )
    },
    componentDidMount(){
        pubsub.bind("msgBox.broadcast",function(msg){
            this.setState({
                "hide":false,
                "msg":msg
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

Message.broadcast=function(msg){
    if(!!!msgBoxContainer){
        createMsgBoxContainer();
    }
    pubsub.trigger("msgBox.broadcast",msg);
}

function createMsgBoxContainer(){
    msgBoxContainer=document.createElement("div");
    document.body.appendChild(msgBoxContainer);
    ReactDOM.render(<Message/>,msgBoxContainer);
}

export default Message;
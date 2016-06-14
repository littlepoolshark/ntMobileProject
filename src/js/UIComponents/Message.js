import React from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import TransitionEvent from './utils/TransitionEvents';
import classNames from 'classnames';

const Message=React.createClass({
    getInitialState(){
        return {
            "hide":true,
            "msg":""
        }
    },
    broadcast(msg){
        this.setState({
            "hide":false,
            msg:msg
        })
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
    componentDidUpdate(){
        TransitionEvent.on(this.refs.msgBox,function(){
            if(this.state.hide !== true){
                setTimeout(function(){
                    this.setState({
                        "hide":true
                    })
                }.bind(this),2000)
            }
        }.bind(this));
    }
});

export default Message;
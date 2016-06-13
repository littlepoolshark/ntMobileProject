import React from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
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
        this.refs.msgBox.addEventListener("webkitTransitionEnd", function(){
            alert("into transitionEnd")
            setTimeout(function(){
                this.setState({
                    "hide":true
                })
            }.bind(this),4000)
        }.bind(this));

    }
});

export default Message;
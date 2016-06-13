import React from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import classNames from 'classnames';

const Message=React.createClass({
    render(){
        return (
            <div className="msg-box-wrapper" ref="msgBox">
                <div className="msg-box">
                    {this.props.children}
                </div>
            </div>

        )
    },
    componentDidMount(){
        this.refs.msgBox.style.opacity=1;
        setTimeout(function(){
            this.refs.msgBox.style.opacity=0;
            React.unmountComponentAtNode(document.getElementById("msgContainer"));
        }.bind(this),2000)
    }
});

export default Message;
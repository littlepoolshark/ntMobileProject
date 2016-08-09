import React from "react";
import classNames from "classnames";
import TransitionEvent from './utils/TransitionEvents';

let Select=React.createClass({
    getInitialState(){
        return {
            isSelectShow:this.props.show,
            disappear:true
        }
    },
    _handleSelected(value){
        this.props.onSelect(value);
        this._closeSelectModal();
    },
    _closeSelectModal(){
        this.setState({
            disappear:true,
            isSelectShow:false
        })
    },
    _openSelectModal(){
        this.setState({
            disappear:false,
            isSelectShow:true
        })
    },
    render(){
        let {
            options,
            onSelect
            }=this.props;
        let classes=classNames({
            "select-mask":true,
            "hide":this.state.disappear,
            "out":!this.state.isSelectShow
        });
        return (
            <div className={classes} ref="selectMask">
                <div className="select-container" >
                    <ul className="select-list">
                        {
                            options.map((item,index)=>{
                                return (
                                    <li key={index} onClick={this._handleSelected.bind(null,item.value)}>{item.text}</li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        )
    },
    componentWillReceiveProps(nextProps){
        if(nextProps.isSelectShow){
            this._openSelectModal();
        }
    },
    componentDidMount(){
        TransitionEvent.on(this.refs.selectMask,function(){
            console.log("TransitionEvent");
            this.setState({
                disappear:true
            })
        }.bind(this));
    }
});

module.exports=Select;
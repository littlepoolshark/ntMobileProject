import React from "react";
import classNames from "classnames";
import TransitionEvent from './utils/TransitionEvents';

let Select=React.createClass({
    getInitialState(){
        return {
            isSelectShow:this.props.show
        }
    },
    _handleSelected(value,text){
        this.props.onSelect(value,text);
    },
    _closeSelectModal(){
        this.setState({
            isSelectShow:false
        })
    },
    _openSelectModal(){
        this.setState({
            isSelectShow:true
        })
    },
    render(){
        let {
            options
            }=this.props;
        let classes=classNames({
            "select-mask":true,
            "in":this.state.isSelectShow
        });
        return (
            <div className={classes} ref="selectMask" onClick={this._closeSelectModal}>
                <div className="select-container" >
                    <ul className="select-list">
                        {
                            options.map((item,index)=>{
                                return (
                                    <li key={index} onClick={this._handleSelected.bind(null,item.value,item.text)}>{item.text}</li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        )
    },
    componentWillReceiveProps(nextProps){
        if(nextProps.show){
            this._openSelectModal();
        }else {
            this._closeSelectModal();
        }
    },
    componentDidMount(){
        TransitionEvent.on(this.refs.selectMask,function(){
        }.bind(this));
    }
});

module.exports=Select;
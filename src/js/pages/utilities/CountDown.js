import React from "react";

let CountDown=React.createClass({
    getInitialState(){
        return {
            countDownDuration:this.props.countDownDuration //需要倒数的时间段（以秒为单位）
        }

    },
    _clearTimer(){
        if(this.timer){
            clearInterval(this.timer);
        }
    },
    _tick(){
            this.timer=setInterval(function(){
                if(this.state.countDownDuration > 0){
                    this.setState({
                        countDownDuration:this.state.countDownDuration -1
                    })
                }else {
                    this._clearTimer();
                }

            }.bind(this),1000);
    },
    render(){
        let leftseconds=this.state.countDownDuration;
        if(leftseconds > 0){
            let day =parseInt(leftseconds / ( 24 * 3600)) ;
            let hour =parseInt((leftseconds - day * 24 * 3600) / 3600);
            let minute =parseInt((leftseconds - day * 24 * 3600 - hour * 3600) / 60);
            let second =leftseconds  - day * 24 * 3600 - hour * 3600 -  minute * 60 ;

            hour= hour < 10 ? "0"+hour : hour;
            minute= minute < 10 ? "0"+minute : minute;
            second= second < 10 ? "0"+second : second;
            return (
                <span>{day ? day + "天" : ""}{hour}小时{minute}分钟{second}秒</span>
            )
        }else {
            return (
                <span>已满标</span>
            )
        }

    },
    componentDidMount(){
        this._tick();
    },
    componentWillUnmount(){
        this._clearTimer();
    }

});

export  default CountDown;
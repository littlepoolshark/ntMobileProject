require("../../scss/page/NewbieGuide.scss");
import React from "react";

import Container from "../UIComponents/Container";
import Icon from "../UIComponents/Icon";

let GuidePath=React.createClass({
    render(){
        return(
            <canvas ref="test" width="300" height="50" className="guide-path"></canvas>
        )
    },
    componentDidMount(){
        let canvas=this.refs.test;
        let context=canvas.getContext("2d");
        let basicAxleX=this.props.direction === "rtl" ? 243.5 : 57.5;
        let pathColor=this.props.disable === true ? "#cdcdcd" : "#fec901";
        context.lineWidth=1;
        context.strokeStyle=pathColor;

        //画线段
        context.moveTo(basicAxleX,0);
        context.lineTo(basicAxleX,20.5);
        context.lineTo(300-basicAxleX,20.5);
        context.lineTo(300-basicAxleX,35.5);
        context.lineCap="round";
        context.stroke();
        context.closePath();

        //画三角形
        context.beginPath();
        context.lineTo(300-basicAxleX-10,35);
        context.lineTo(300-basicAxleX+10,35);
        context.lineTo(300-basicAxleX,50);
        context.closePath();
        context.lineWidth=0;
        context.fillStyle=pathColor;
        context.fill();
    }
});

let TaskItem=React.createClass({
    _renderItemBody(taskIndex,isFinished,rewardScore){
        let body=null;
        switch (taskIndex){
            case 1:
                body=(
                    <div className="task-item-body">
                        <div className="text-section">
                            <div>完成实名认证</div>
                            <div>获得<strong>{rewardScore}</strong>积分</div>
                            <div className={"isFinish-flag " + (isFinished ? "success" : "warning")}>
                                <Icon classPrefix="imgIcon" name={isFinished ? "authentication-flag" : "not-authentication-flag"}/>
                                <span>{isFinished ? "已认证" : "未认证"}</span>
                            </div>
                        </div>
                        <div className="img-section">
                            {
                                isFinished ?
                                <img src="/src/img/badge_authentication.png" alt=""/> :
                                <img src="/src/img/bg_lock.png" alt=""/>
                            }
                        </div>
                    </div>
                );
                break;
            case 2:
                body=(
                    <div className="task-item-body">
                        <div className="img-section">
                            {
                                isFinished ?
                                    <img src="/src/img/badge_set.png" alt=""/> :
                                    <img src="/src/img/bg_lock.png" alt=""/>
                            }
                        </div>
                        <div className="text-section">
                            <div>设置交易密码</div>
                            <div>理财更安全</div>
                            <div className={"isFinish-flag " + (isFinished ? "success" : "warning")}>
                                <Icon classPrefix="imgIcon" name={isFinished ? "authentication-flag" : "not-authentication-flag"}/>
                                <span>{isFinished ? "已设置" : "未设置"}</span>
                            </div>
                        </div>
                    </div>
                );
                break;
            case 3:
                body=(
                    <div className="task-item-body">
                        <div className="text-section">
                            <div>绑定银行卡</div>
                            <div>获得<strong>{rewardScore}</strong>积分</div>
                            <div className={"isFinish-flag " + (isFinished ? "success" : "warning")}>
                                <Icon classPrefix="imgIcon" name={isFinished ? "authentication-flag" : "not-authentication-flag"}/>
                                <span>{isFinished ? "已绑定" : "未绑定"}</span>
                            </div>
                        </div>
                        <div className="img-section">
                            {
                                isFinished ?
                                <img src="/src/img/badge_card.png" alt=""/> :
                                <img src="/src/img/bg_lock.png" alt=""/>
                            }
                        </div>
                    </div>
                );
                break;
            case 4:
                body=(
                    <div className="task-item-body">
                        <div className="img-section">
                            {
                                isFinished ?
                                    <img src="/src/img/badge_new.png" alt=""/> :
                                    <img src="/src/img/bg_lock.png" alt=""/>
                            }
                        </div>
                        <div className="text-section">
                            <div>开始第一笔投资</div>
                            <div>获得<strong>{rewardScore}</strong>积分+</div>
                            <div>年化<strong>12%</strong>超高收益</div>
                            <div className={"isFinish-flag " + (isFinished ? "success" : "warning")}>
                                <Icon classPrefix="imgIcon" name={isFinished ? "authentication-flag" : "not-authentication-flag"}/>
                                <span>{isFinished ? "已投资" : "未投资"}</span>
                            </div>
                        </div>
                    </div>
                );
                break;
            default:
                break;
        }

        return body;
    },
    render(){
        let {
            taskIndex,
            isFinished,
            rewardScore
            }=this.props;
        return (
            <div className="task-item">
                {this._renderItemBody(taskIndex,isFinished,rewardScore)}
                {
                    taskIndex !== 4 ?
                    (
                        <div className="task-item-footer">
                            <GuidePath direction={!!(taskIndex % 2) ? "rtl" : "ltr"  } disable={!isFinished}/>
                        </div>
                    )   :
                    null
                }

            </div>
        )
    }
});

let NewbieGuide = React.createClass({
    render() {
        let testData=[
            {
                taskIndex:1,
                isFinished:true,
                rewardScore:50
            },
            {
                taskIndex:2,
                isFinished:true,
                rewardScore:50
            },
            {
                taskIndex:3,
                isFinished:true,
                rewardScore:50
            },
            {
                taskIndex:4,
                isFinished:false,
                rewardScore:50
            }
        ]
        return (
               <Container scrollable={true} id="newbieGuide">
                   <img src="/src/img/task_banner.png" alt=""/>
                   <div className="content-wrapper">
                       {
                           testData.map(function(item,index){
                               return (
                                   <TaskItem key={index+1} {...item}/>
                               )
                           })
                       }

                   </div>
               </Container>
        );
    }
});

module.exports=NewbieGuide;
//@flow
require("../../../scss/page/specialActivity/PresentGoldenApple.scss");
let PresentGoldenAppleAction=require("../../actions/PresentGoldenAppleAction");
let PresentGoldenAppleStore=require("../../stores/PresentGoldenAppleStore");
import React from "react";
var cookie=require("../../lib/cookie");

import Container from "../../UIComponents/Container";
import SideMark from "../../UIComponents/SlideMask";
import NtCopyRight from "../utilities/NtCopyRight";
import Icon from "../../UIComponents/Icon";
import Group from "../../UIComponents/Group";
import List from "../../UIComponents/List";
import Field from "../../UIComponents/Field";
import Message from "../../UIComponents/Message";


let PresentGoldenApple=React.createClass({
   getInitialState(){
       return {
           data:PresentGoldenAppleStore.getAll(),
           isMaskOpen:false,
           maskType:"",
           showFormCheckMsg:false,
           formCheckMsg:"",
           hadGotPrizeName:"",
           isRequestStarting:false
       }
   },
   _openMask(maskType:string):void{
       this.setState({
           isMaskOpen:true,
           maskType:maskType
       })
   },

    _closeMask(){
        this.setState({
            isMaskOpen:false,
            showFormCheckMsg:false,
            formCheckMsg:""
        })
    },

    _jumpToNextLocation(pathname:string):void{
        this.context.router.push({
            pathname:pathname
        })
    },

    _askToFillAddressForm(){
        this._openMask("addressForm");
    },

    _getRedPackage(){
        if(!this.state.isRequestStarting){
            PresentGoldenAppleAction.getRedPackage();
        }
    },

    _handleFieldValueChange(fieldName:string):void{
        let fieldValue:string=this.refs[fieldName].getValue();
        switch (fieldName){
            case "userName":
                if(fieldValue.length > 15){
                    fieldValue=fieldValue.slice(0,15);
                }
                break;
            case "phoneNo":
                fieldValue=fieldValue.replace(/[^\d]/g,"");
                if(fieldValue.length > 11){
                    fieldValue=fieldValue.slice(0,11);
                }
                break;
            case "address":
                if(fieldValue.length > 100){
                    fieldValue=fieldValue.slice(0,100);
                }
                break;
            default:
                break;
        };
        PresentGoldenAppleAction.changeFieldValue(fieldValue,fieldName);
    },

    _submitAddressForm(){
        if(!this.state.isRequestStarting){
            PresentGoldenAppleAction.submitAddressForm();
        }
    },

    _renderMask(){
        let {
            needInvest,
            nextPrize,
            invested,
            curPrize,
            grade,
            userName,
            phoneNo,
            address
            }=this.state.data;

        let {
            showFormCheckMsg,
            formCheckMsg,
            hadGotPrizeName
            }=this.state;

       switch(this.state.maskType){
           case "present-redPackage":
               return(
                   <div className="slideMask-body present-redPackage">
                       <div className="slideMask-title text-center">
                           您当前的累计投资额为 <strong>{invested}</strong> 元<br/>
                           可领取 <strong>{curPrize}</strong> 一个
                       </div>
                       <div className="img-wrapper">
                           <img src={require("../../../img/specialActivity/pga-redPackage.png")} alt=""/>
                       </div>
                       <div className="slideMask-title text-center">
                           您只需再投资 <strong>{needInvest}</strong> 元<br/>
                           即可领取 <strong>{nextPrize}</strong> 一份
                       </div>
                       <button className="pga-btn second" onClick={this._jumpToNextLocation.bind(null,"productList")}>我要投资</button>
                       <button className="pga-btn third" onClick={this._getRedPackage}>不了，我要领红包</button>
                       <Icon classPrefix="imgIcon" name="closeBtnInWrapper" onClick={this._closeMask}/>
                   </div>
               );

           case "present-apple":
               let presentAppleImg=null;
               switch (grade){
                   case "2":
                       presentAppleImg= <img src={require("../../../img/specialActivity/pga-apple-img1.png")} alt="" className="responsive-img"/>;
                       break;
                   case "3":
                       presentAppleImg= <img src={require("../../../img/specialActivity/pga-apple-img2.png")} alt="" className="responsive-img"/>;
                       break;
                   case "4":
                       presentAppleImg= <img src={require("../../../img/specialActivity/pga-apple-img3.png")} alt="" className="responsive-img"/>;
                       break;
                   default:
                       break;
               }
               return(
                   <div className="slideMask-body present-apple">
                       <div className="slideMask-title text-center">
                           您当前的累计投资额为 <strong>{invested}</strong> 元<br/>
                           可领取 <strong>{curPrize}</strong> 一份
                       </div>
                       <div className="img-wrapper">
                           {presentAppleImg}
                       </div>
                       {
                           grade !== "4"?
                           (
                               <div className="slideMask-title text-center">
                                   您只需再投资 <strong>{needInvest}</strong> 元<br/>
                                   即可领取 <strong>{nextPrize}</strong> 一份
                                </div>
                           )    :
                           null
                       }
                       {
                           grade !== "4" ?
                           (
                               <button className="pga-btn second" onClick={this._jumpToNextLocation.bind(null,"productList")}>我要投资</button>
                           )    :
                           null
                       }
                       {
                           grade !== "4" ?
                               (
                                   <button className="pga-btn third" onClick={this._askToFillAddressForm}>不了，我要领礼品</button>
                               )    :
                               (
                                   <button className="pga-btn second" onClick={this._askToFillAddressForm}>立即领取</button>
                               )
                       }
                       <Icon classPrefix="imgIcon" name="closeBtnInWrapper" onClick={this._closeMask}/>
                   </div>
               );
           case "presentAppleSuccessHint":
               return(
                   <div className="slideMask-body presentAppleSuccessHint">
                       <div className="img-wrapper">
                           <img src={require("../../../img/specialActivity/pga-getApple-hint.png")} alt=""/>
                       </div>
                       <Icon classPrefix="imgIcon" name="closeBtnInWrapper" onClick={this._closeMask}/>
                   </div>
               );
           case "presentRedPackageSuccessHint":
               return(
                   <div className="slideMask-body presentRedPackageSuccessHint">
                       <div className="img-wrapper">
                           <img src={require("../../../img/specialActivity/pga-getRedPackage-hint.png")} alt=""/>
                       </div>
                       <button className="pga-btn second" onClick={this._jumpToNextLocation.bind(null,"productList")}>立即使用赚收益</button>
                       <Icon classPrefix="imgIcon" name="closeBtnInWrapper" onClick={this._closeMask}/>
                   </div>
               );
           case "hadGotPrizeHint":
               return(
                   <div className="slideMask-body hadGotPrizeHint">
                       <div className="img-wrapper hadGotPrizeHint-box text-center">
                           <div>
                               <div>亲，您已经领取过了哦！</div>
                               <div><strong>{hadGotPrizeName}</strong></div>
                           </div>
                       </div>
                       <Icon classPrefix="imgIcon" name="closeBtnInWrapper" onClick={this._closeMask}/>
                   </div>
               );
           case "addressForm":
               return(
                   <div className="slideMask-body addressForm">
                       <div className="addressForm-title text-center">请填写邮寄地址</div>
                       <Group
                           noPadded
                       >
                           <List>
                               <List.Item
                                   nested="input"
                               >
                                   <Field
                                       label="姓名"
                                       placeholder=""
                                       value={userName}
                                       ref="userName"
                                       onChange={this._handleFieldValueChange.bind(null,"userName")}
                                   />
                               </List.Item>
                               <List.Item
                                   nested="input"
                               >
                                   <Field
                                       label="电话"
                                       placeholder=""
                                       value={phoneNo}
                                       ref="phoneNo"
                                       onChange={this._handleFieldValueChange.bind(null,"phoneNo")}
                                   />
                               </List.Item>
                               <List.Item
                                   nested="input"
                               >
                                   <Field
                                       label="地址"
                                       placeholder="例如：深圳市南山区深南大道9966号威盛科技大厦21层"
                                       type="textarea"
                                       value={address}
                                       ref="address"
                                       onChange={this._handleFieldValueChange.bind(null,"address")}
                                   />
                               </List.Item>
                           </List>
                       </Group>
                       {
                           showFormCheckMsg ?
                               <div className="formCheck-hint">{formCheckMsg}</div> :
                               null
                       }
                       <button className="pga-btn second" onClick={this._submitAddressForm}>提交</button>
                       <div className="addressForm-remark text-center">
                           如有邮寄地址变更或填错 <br/>
                           请拨打客服电话：<strong>400-6322-688</strong>
                       </div>
                       <Icon classPrefix="imgIcon" name="closeBtnInWrapper" onClick={this._closeMask}/>
                   </div>
               );
           default:
               return null;
       }
    },

    _handleGetPrizeBtnClick(){
      let isLogin=!!cookie.getCookie("token");
      if(isLogin){
          PresentGoldenAppleAction.getPrizeGrade();
      }else {
          this.context.router.push({
              pathname:"/",
              query:{
                  beforeComponent:"presentGoldenApple"
              }
          })
      }
    },

   render(){
       return (
           <Container id="presentGoldenApple" scrollable>
               <section className="product-introduction">
                   <div className="banner-wrapper">
                       <img src={require("../../../img/specialActivity/pga-banner.jpg")} alt="" className="responsive-img"/>
                       <div className="btn-wrapper">
                           <img src={require("../../../img/specialActivity/pga-date.png")} alt=""/>
                           <button className="pga-btn primary" onClick={this._handleGetPrizeBtnClick}>免费领取</button>
                       </div>
                   </div>
                   <div className="product-introduction-title">
                       <img src={require("../../../img/specialActivity/pga-title.png")} alt=""/>
                   </div>
                   <div className="product-introduction-content">
                       <img src={require("../../../img/specialActivity/pga-content.png")} alt="" className="responsive-img" />
                   </div>
               </section>
               <section className="rule-description">
                   <div className="rule-description-title">
                       <img src={require("../../../img/specialActivity/pga-title2.png")} alt=""/>
                   </div>
                   <div className="rule-description-content">
                       <p>
                           为感谢您一直以来对农泰金融的支持，我们从上千农户中优选精品---至臻黄金富士！诚邀您共庆丰收、乐享美味！活动详情如下：
                       </p>
                       <img src={require("../../../img/specialActivity/pga-table.png")} alt="" className="responsive-img"/>
                       <div className="rule-description-date">
                           活动时间：<strong>2017.4.5~4.11</strong>
                       </div>
                       <button className="pga-btn primary" style={{margin:"0 auto"}} onClick={this._handleGetPrizeBtnClick} >免费领取</button>
                   </div>
               </section>
               <NtCopyRight/>
               <SideMark isMaskOpen={this.state.isMaskOpen} cancelDismissOnGlobal={true}>
                   <div className="slideMask-wrapper">
                       {this._renderMask(this.state.maskType)}
                   </div>
               </SideMark>
           </Container>
       )
   },
    componentDidMount(){
        let isLogin=!!cookie.getCookie("token");

        if(isLogin){
            PresentGoldenAppleAction.getInitialData();
        }

        PresentGoldenAppleStore.bind("change",function(){
            this.setState({
                data:PresentGoldenAppleStore.getAll()
            })
        }.bind(this));

        PresentGoldenAppleStore.bind("userCanGetPrize",function(){
            let {
                grade
                }=PresentGoldenAppleStore.getAll();
            this.setState({
                data:PresentGoldenAppleStore.getAll()
            },() => {
                if(grade === "1"){
                    this._openMask("present-redPackage");
                }else {
                    this._openMask("present-apple");
                }
            })
        }.bind(this));

        PresentGoldenAppleStore.bind("somethingWithActivity",function(msg){
            Message.broadcast(msg);
        });

        PresentGoldenAppleStore.bind("userHadGotPrize",function(prizeName){
          this.setState({
              maskType:"hadGotPrizeHint",
              isMaskOpen:true,
              hadGotPrizeName:prizeName
          })
        }.bind(this));


        PresentGoldenAppleStore.bind("getRedPackageSuccess",function(){
            this._openMask("presentRedPackageSuccessHint");
        }.bind(this));


        PresentGoldenAppleStore.bind("addressFormCheckFailed",function(msg){
           this.setState({
               showFormCheckMsg:true,
               formCheckMsg:msg
           });
        }.bind(this));

        PresentGoldenAppleStore.bind("getGoldenAppleSuccess",function(){
            this._openMask("presentAppleSuccessHint");
            setTimeout(() => {
                this._closeMask();
            },3000);
        }.bind(this));

        PresentGoldenAppleStore.bind("getRedPackageFailed",function(msg){
            this._closeMask();
            setTimeout(() => {
                Message.broadcast(msg)
            },1500);
        }.bind(this));

        PresentGoldenAppleStore.bind("submitAddressFormFailed",function(msg){
            this._closeMask();
            setTimeout(() => {
                Message.broadcast(msg)
            },1500);
        }.bind(this));

        PresentGoldenAppleStore.bind("getGoldenAppleFailed",function(msg){
            this._closeMask();
            setTimeout(() => {
                Message.broadcast(msg)
            },2000);
        }.bind(this));

        PresentGoldenAppleStore.bind("requestIsStarting",function(){
            this.setState({
                isRequestStarting:true
            });
        }.bind(this));

        PresentGoldenAppleStore.bind("requestIsEnd",function(msg){
            this.setState({
                isRequestStarting:false
            });
        }.bind(this));
    },
    componentWillUnmount(){
        PresentGoldenAppleStore.clearAll();
        let eventList = [
            "change",
            "userCanGetPrize",
            "somethingWithActivity",
            "userHadGotPrize",
            "getRedPackageSuccess",
            "addressFormCheckFailed",
            "getGoldenAppleSuccess",
            "getRedPackageFailed",
            "submitAddressFormFailed",
            "getGoldenAppleFailed",
            "requestIsStarting",
            "requestIsEnd"
        ];
        eventList.map(function(event,index){
            PresentGoldenAppleStore.unbind(event);
        });
    }

});

PresentGoldenApple.contextTypes = {
    router:React.PropTypes.object.isRequired
};


module.exports=PresentGoldenApple;
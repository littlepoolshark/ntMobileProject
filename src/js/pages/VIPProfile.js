require("../../scss/page/VIPProfile.scss");
let VIPProfileAction=require("../actions/VIPProfileAction.js");
let VIPProfileStore=require("../stores/VIPProfileStore.js");
import React from "react";

import Container from "../UIComponents/Container";
import Group from "../UIComponents/Group";
import Icon from "../UIComponents/Icon";

import ProgressBar from "./utilities/ProgressBar";


let VIPProfile=React.createClass({
    getInitialState(){
        return VIPProfileStore.getAll();
    },
    render (){
       let {
           mobile,
           isVIPUser
           }=this.props.location.query;

        let {
            userAmount,
            recUsersCount,
            recUsersAmount
            }=this.state;

        const totalUserAmount=100000;
        const totalUsersCount=5;
        const totalRecUsersAmount=100000;

        const userAmountPercent=userAmount / totalUserAmount >= 1 ?  "100%": ( userAmount / totalUserAmount * 100 ).toFixed(1) + "%";
        const recUsersCountPercent=recUsersCount / totalUsersCount >=1 ? "100%" : ( recUsersCount / totalUsersCount * 100 ).toFixed(1) + "%";
        const recUsersAmountPercent=recUsersAmount / totalRecUsersAmount >=1 ? "100%" : ( recUsersAmount / totalRecUsersAmount * 100 ).toFixed(1) + "%";

       return (
           <Container id="VIPProfile">
                <Group className="dashboard-wrapper">
                    <div className="dashboard">
                        <Icon classPrefix="imgIcon" name="my-avator" />
                        <span className="phone-number">{mobile}</span>
                    </div>
                </Group>

               <Group className="VIP-introduction">
                   <h6><span className="title-flag"></span>VIP成长值</h6>
                   <section className="content">
                       <div className="title">方式一（立即生效）</div>
                       <div className="progressBar-wrapper">
                           <div className="subtitle">
                               <span className="label-text">本人累计投资额</span>
                               <span className="percent-text">{userAmount + "/" + totalUserAmount}元</span>
                           </div>
                           <ProgressBar hasProgressPercent={false} percent={userAmountPercent}/>
                       </div>
                   </section>
                   <section className="content">
                       <div className="title">方式二（次日生效）</div>
                       <div className="progressBar-wrapper">
                           <div className="subtitle">
                               <span className="label-text">邀请好友数</span>
                               <span className="percent-text">{recUsersCount + "/" + totalUsersCount}人</span>
                           </div>
                           <ProgressBar hasProgressPercent={false} percent={recUsersCountPercent}/>
                       </div>
                       <div className="progressBar-wrapper">
                           <div className="subtitle">
                               <span className="label-text">好友累计投资额</span>
                               <span className="percent-text">{recUsersAmount + "/" + totalRecUsersAmount}元</span>
                           </div>
                           <ProgressBar hasProgressPercent={false} percent={recUsersAmountPercent}/>
                       </div>
                   </section>
                   {
                       isVIPUser === "true" ?
                       <div className="VIP-stamp"></div> :
                       null
                   }
               </Group>

               <div className="warm-hint-text">
                   达成上述任一种方式，即可成为VIP!
               </div>
           </Container>
       )
   },
   componentDidMount(){
       VIPProfileAction.getInitialData();

       VIPProfileStore.bind("change",function(){
           this.setState(VIPProfileStore.getAll());
       }.bind(this));
   },
   componentWillUnmount(){
       VIPProfileStore.clearAll();
   }
});

module.exports=VIPProfile;
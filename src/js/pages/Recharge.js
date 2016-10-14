require("../../scss/page/Recharge.scss");
let RechargeAction=require("../actions/RechargeAction.js");
let RechargeStore=require("../stores/RechargeStore.js");

import React from "react";
import classNames from 'classnames';
import cookie from "../lib/cookie";

import Container from "../UIComponents/Container";
import Button from "../UIComponents/Button";
import Field from "../UIComponents/Field";
import List from "../UIComponents/List";
import Icon from "../UIComponents/Icon";
import Group from "../UIComponents/Group";
import Message from "../UIComponents/Message";
import Modal from "../UIComponents/modal/Modal";

import BankCard from "./utilities/BankCard";


let RechargeAmountSelection=React.createClass({
    getInitialState(){
        return {
            currRechargeAmount:0
        }
    },
    _selectRechargeAmount(amount){
        this.props.SelectionHandler && this.props.SelectionHandler(amount);
        this.setState({
            currRechargeAmount:amount
        });
    },
    render(){
        let rechargeAmountArr=[10000,2000,1000,500,100];
        let currRechargeAmount=this.state.currRechargeAmount;
        return (
            <div className="rechargeAmount-selectionBar">
                {
                    rechargeAmountArr.map(function(item,index){
                        let spanClass=classNames({
                            active:currRechargeAmount === item
                        });
                        return (
                            <span
                                className={spanClass}
                                onClick={this._selectRechargeAmount.bind(null,item)}
                                key={index}
                            >
                                {item}
                            </span>
                        )
                    }.bind(this))
                }
            </div>
        )
    }
});

//充值组件
let Recharge=React.createClass({
    getInitialState(){
        return {
            data:RechargeStore.getAll(),
            isLimitDetailModalOpen:false
        }
    },
    _handleRechargeSubmit(){
        RechargeAction.recharge();
    },
    _handleRechargeAmountChange(){
        let rechargeAmount=this.refs.rechargeAmount.getValue();
        let reg=/[^\d\.]/g;//过滤除了数组和点号的字符
        rechargeAmount=rechargeAmount.replace(reg,"");
        if(rechargeAmount.indexOf(".") > -1 ){//如果是小数点后的位数大于两位的小数,则将其截断为小数点后两位
            if(!!rechargeAmount.split(".")[1] && rechargeAmount.split(".")[1].length > 2){
                rechargeAmount=rechargeAmount.split(".")[0] + "." + rechargeAmount.split(".")[1].slice(0,2);
            }
        }
        rechargeAmount=rechargeAmount === "" ? 0 : rechargeAmount;
        RechargeAction.changeRechargeAmount(rechargeAmount);
    },
    _handleRechargeTypeChange(type){
        RechargeAction.changeRechargeType(type);
    },
    _selectRechargeAmount(amount){
        RechargeAction.changeRechargeAmount(amount);
    },
    _closeLimitDetailModal(){
        this.setState({
            isLimitDetailModalOpen:false
        })
    },
    _openLimitDetailModal(){
        this.setState({
            isLimitDetailModalOpen:true
        })
    },
    _showLimitDetailOfWCPay(){
        this._openLimitDetailModal();
    },
    render (){
        let bankCardInfo=this.state.data;
        let {
            currRechargeType,
            rechargeAmount,
            singleLimit,
            everydayLimit,
            bankName,
            fullCardNo,
            idcardFull,
            realNameFull,
            id
            }=this.state.data;
        let token=cookie.getCookie("token");
        let everydayLimitText=everydayLimit > 0 ? "单日限额"+everydayLimit+"元" : "单日无限额";
        let warmHintText="单笔限额"+singleLimit+"元，" + everydayLimitText;
        return (
            <Container  {...this.props} scrollable={false} id="recharge">
                {/*<BankCard {...bankCardInfo}/>*/}

                <Group
                    header={warmHintText}
                    className={currRechargeType === "shortcut" ? "active" : ""}
                    onClick={this._handleRechargeTypeChange.bind(null,"shortcut")}
                >
                    <div className="shortcut-pay-wrapper cf">
                        <img src={require("../../img/shortcut.png")} alt="" className="recharge-card-bg" />
                        <span className="fr">尾号{fullCardNo && fullCardNo.slice(-4)}</span>
                        <span className="fr">{bankName}</span>
                    </div>
                </Group>

                {/* <Group
                    header={<span>最高限额：50,000元  <a href="javascript:void(0);" className="showLimitDetail-btn" onClick={this._showLimitDetailOfWCPay}>支持银行及限额？</a></span>}
                    className={currRechargeType === "wechat" ? "active" : ""}
                    onClick={this._handleRechargeTypeChange.bind(null,"wechat")}
                >
                    <img src={require("../../img/wechat.png")} alt="" className="recharge-card-bg" />
                </Group>*/}

                <Group
                    header=""
                    noPadded
                >
                    <List>
                        <List.Item
                            nested="input"
                        >
                            <Field
                                type="number"
                                label="金额"
                                placeholder="充值金额10元起"
                                ref="rechargeAmount"
                                value={rechargeAmount ? rechargeAmount : ""}
                                onChange={this._handleRechargeAmountChange}
                            />
                        </List.Item>
                    </List>
                </Group>

                <RechargeAmountSelection SelectionHandler={this._selectRechargeAmount} />

                <form action="/ci/user/v2/wx_LianlianRechage" method="post" id="shortcutPaymentForm">
                    <input type="hidden"  name="bankCardId" value={id} />
                    <input type="hidden"  name="bg_color" value="7699FF" />
                    <input type="hidden"  name="id_no" value={idcardFull} />
                    <input type="hidden"  name="card_no" value={fullCardNo} />
                    <input type="hidden"  name="rechargeType" value="biddingBank" />
                    <input type="hidden"  name="acct_name"  value={realNameFull} />
                    <input type="hidden"  name="money_order" value={rechargeAmount} />
                    <input type="hidden" name="Authorization" value={token}/>
                </form>

                <Modal
                    ref="limitDetailModal"
                    isOpen={this.state.isLimitDetailModalOpen}
                    role="alert"
                    onAction={this._closeLimitDetailModal}
                >
                    暂时没做这个限额详情
                </Modal>

                <div className="" style={{padding:"0 0.9375rem",marginTop:"2rem"}}>
                    <Button amStyle="primary" block radius={true} onClick={this._handleRechargeSubmit}>完成充值</Button>
                </div>
            </Container>
        )
    },
    componentDidMount(){
        let rechargeAmount=this.props.location.query.rechargeAmount;
        if(rechargeAmount !== undefined){
            RechargeAction.changeRechargeAmount(rechargeAmount);
        }
        RechargeAction.getBankCardInfoFromServer();

        RechargeStore.bind("change",function(){
            this.setState(RechargeStore.getAll());
        }.bind(this));

        RechargeStore.bind("rechargeAmountCheckFailed",function(msg){
            Message.broadcast(msg);
        });

        //使用原生的表单提交方式来提交连连支付表单
        RechargeStore.bind("submitShortcutForm",function(){
            let shortcutForm=document.getElementById("shortcutPaymentForm");
            shortcutForm.submit();
        });

        RechargeStore.bind("rechargeSuccess",function(){
            Message.broadcast("充值成功！");
        });

        RechargeStore.bind("rechargeFailed",function(msg){
            Message.broadcast(msg);
        });
    },
    componentWillUnmount(){
        RechargeStore.clearAll();
    }
});

Recharge.contextTypes = {
    router:React.PropTypes.object.isRequired
};

module.exports=Recharge;
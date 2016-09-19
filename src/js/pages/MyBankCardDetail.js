require("../../scss/page/MyBankCardDetail.scss");
let MyBankCardDetailAction=require("../actions/MyBankCardDetailAction");
let MyBankCardDetailStore=require("../stores/MyBankCardDetailStore");
import React from "react";
import {
    Link
} from 'react-router';

import Container from "../UIComponents/Container";
import Button from "../UIComponents/Button";
import Group from "../UIComponents/Group";
import Icon from "../UIComponents/Icon";
import List from "../UIComponents/List";
import Field from "../UIComponents/Field";
import NavBar from "../UIComponents/NavBar";
import Select from "../UIComponents/Select";
import Message from "../UIComponents/Message";

import BankCard from "./utilities/BankCard";


//设置中心页面：MyBankCardDetail component
let MyBankCardDetail=React.createClass({
    getInitialState(){
        return {
            selectModalType:"province",
            isSelectModalOpen:false,
            bankCardInfo:MyBankCardDetailStore.getAll().bankCardInfo,
            provinceList:[],
            cityList:[]
        }
    },
    _jumpToDeleteBankCard (){
        this.context.router.push({
           pathname:"deleteBankCardConfirm",
           query:{
               bankCardId:MyBankCardDetailStore.getAll().bankCardInfo.id
           }
        });
    },
    _handleNavClick(obj){
        if(obj.title === "返回"){
            this.context.router.goBack();
        }else if(obj.title === "删除银行卡"){
            this._jumpToDeleteBankCard();
        }
    },
    _submitBankCardForm(){
        /*let branch=this.refs.branch.getValue();*/
        MyBankCardDetailAction.submitBankCardForm();
    },
    _onProvinceSelect(value,text){
        this.setState({
            provinceId:value,
            provinceName:text,
            isSelectModalOpen:false
        })
    },
    _selectProvince(){
        MyBankCardDetailAction.selectProvince();
    },
    _onProvinceSelect(value,text){
        MyBankCardDetailAction.finishProvinceSelection(value,text);
    },
    _selectCity(){
        MyBankCardDetailAction.selectCity();
    },
    _onCitySelect(value,text){
        MyBankCardDetailAction.finishCitySelection(value,text);
    },
    render(){
        let rightNav= {
            component:"a",
            title: "删除银行卡"
        };
        let leftNav= {
            component:"a",
            icon: 'left-nav',
            title: '返回'
        };
        let {
            bankName,
            branch,//支行名称
            cardno,
            parentAreaStr,//省份名字
            regionStr,//市区名字
            shortIcon//银行logo图片在服务器的路径
            }=this.state.bankCardInfo;

        return (
            <Container scrollable={false} id="myBankCardDetail">
                <NavBar
                    title="银行卡详情"
                    rightNav={[rightNav]}
                    leftNav={[leftNav]}
                    amStyle="primary"
                    onAction={this._handleNavClick}
                    />
                <BankCard bankName={bankName} cardno={cardno} shortIcon={shortIcon}/>
                <List>
                    <List.Item
                        nested="input"
                        >
                        <Field
                            label="开户省份"
                            placeholder="请输入"
                            inputAfter={(<Icon name="right-nav"/>)}
                            readOnly
                            value={parentAreaStr}
                            onClick={this._selectProvince}
                            />
                    </List.Item>
                    <List.Item
                        nested="input"
                        >
                        <Field
                            label="开户城市"
                            placeholder="请输入"
                            inputAfter={(<Icon name="right-nav"/>)}
                            readOnly
                            value={regionStr}
                            onClick={this._selectCity}
                            />
                    </List.Item>
                    {/*<List.Item
                        nested="input"
                        >
                        <Field
                            label="开户支行"
                            placeholder="可以通过电话或者网上查询"
                            defaultValue={branch}
                            ref="branch"
                            />
                    </List.Item>*/}
                </List>

                <div className="warm-hint">
                    <Icon classPrefix="imgIcon" name="attention"/>
                    <span>应银行要求，需要完善银行卡的省市信息才能成功打款，请认真填写。</span>
                </div>

                <div className="block-btn-wrapper" style={{margin:"20px 15px"}}>
                    <Button amStyle="primary" block radius onClick={this._submitBankCardForm}>保存</Button>
                </div>
                <Select
                    onSelect={this.state.selectModalType === "province" ? this._onProvinceSelect : this._onCitySelect}
                    options={this.state.selectModalType === "province" ? this.state.provinceList : this.state.cityList}
                    show={this.state.isSelectModalOpen}
                />
            </Container>
        )
    },
    componentDidMount(){
        MyBankCardDetailAction.getMyBankCardDetail();

        MyBankCardDetailStore.bind("change_bankCardInfo",function(){
            this.setState({
                bankCardInfo:MyBankCardDetailStore.getAll().bankCardInfo,
                isSelectModalOpen:false
            })
        }.bind(this));

        MyBankCardDetailStore.bind("change_provinceList",function(){
            this.setState({
                selectModalType:"province",
                provinceList:MyBankCardDetailStore.getAll().provinceList,
                isSelectModalOpen:true
            })
        }.bind(this));

        MyBankCardDetailStore.bind("change_cityList",function(){
            this.setState({
                selectModalType:"city",
                cityList:MyBankCardDetailStore.getAll().cityList,
                isSelectModalOpen:true
            })
        }.bind(this));

        MyBankCardDetailStore.bind("getCityListCheckFailed",function(msg){
            Message.broadcast(msg);
        });

        MyBankCardDetailStore.bind("bankCardSubmitSuccess",function(){
            this.context.router.goBack();
        }.bind(this));

        MyBankCardDetailStore.bind("bankCardSubmitFailed",function(msg){
            Message.broadcast(msg);
        });
    }
});

MyBankCardDetail.contextTypes = {
    router:React.PropTypes.object.isRequired
};

module.exports=MyBankCardDetail;
require("../../scss/page/BankCardList.scss");
var BankCardListAction=require("../actions/BankCardListAction.js");
var BankCardListStore=require("../stores/BankCardListStore.js");
import React from "react";

//ui component
import Container from "../UIComponents/Container";
import Group from "../UIComponents/Group";
import List from "../UIComponents/List";
import NavBar from "../UIComponents/NavBar";

let BankCardList=React.createClass({
    getInitialState(){
        return {
            bankCardList:BankCardListStore.getAll()
        }
    },
    _handleSelectBankCard(bankId,bankName){
        let query=this.props.location.query;
        query.visitFrom="bankCardList";
        bankId=bankId + "";//将bankId转换为字符串

        if(bankId !== query.bankId){
            query.bankId=bankId;
            query.bankName=bankName;
            query.cardNo=""
        }

        this.context.router.push({
            pathname:query.beforeComponent,
            query:query
        });
    },
    _generateEverydayLimitText(everydayLimit){
        let everydayLimitText="";
        if(parseInt(everydayLimit) > 0 ){
            everydayLimitText="单日最高限额" + everydayLimit + "元";
        }else {
            everydayLimitText="单日无限额";
        }
        return everydayLimitText;
    },
    _handleNavClick(){
        //如果用户什么都没做的点击返回按钮，则数据原封不动地返回
        let query=this.props.location.query;
        query.visitFrom="bankCardList";
        this.context.router.push({
            pathname:query.beforeComponent,
            query:query
        });
    },
    _renderTitleOfListItem(title,index){
        function _renderBankStar(index){
            if(index < 3){
                return (
                    <div className="bankStar-icon3"></div>
                )
            }else if(index < 5){
                return (
                    <div className="bankStar-icon2"></div>
                )
            }else if(index < 7){
                return (
                    <div className="bankStar-icon1"></div>
                )
            }else {
                return null;
            }
        }
        return (
            <div className="item-title-wrapper">
                <div>{title}</div>
                {
                    index < 7 ?
                    <div className="unionpay-icon"></div> :
                    null
                }
                {_renderBankStar(index)}
            </div>
        )
    },
    render(){
        let leftNav= {
            component:"a",
            icon: 'left-nav',
            title: '返回'
        };

        return (
            <Container id="bankCardList"  scrollable={true}>
                <NavBar
                    title="选择发卡银行"
                    leftNav={[leftNav]}
                    amStyle="primary"
                    onAction={this._handleNavClick}
                />
                <Group
                    header="目前支持的银行如下"
                    noPadded
                >
                    <List>
                        {
                            this.state.bankCardList.map((item, index) => {
                                return (
                                    <List.Item
                                        title={this._renderTitleOfListItem(item.name,index+1)}
                                        subTitle={"单笔限额"+item.singleLimit+"元，" + this._generateEverydayLimitText(item.everydayLimit)}
                                        media={<img src={item.shortIcon} className="bankCard-logo" alt=""/>}
                                        href="javascript:void(0)"
                                        key={item.id}
                                        onClick={this._handleSelectBankCard.bind(null,item.id,item.name)}
                                    />
                                );
                            })}
                    </List>
                </Group>
            </Container>
        )
    },
    componentDidMount(){
        BankCardListAction.getBankCardListFormServer();

        BankCardListStore.bind("change",function(){
            this.setState({
                bankCardList:BankCardListStore.getAll()
            })
        }.bind(this));

    }
});

BankCardList.contextTypes = {
    router:React.PropTypes.object.isRequired
};

module.exports=BankCardList;
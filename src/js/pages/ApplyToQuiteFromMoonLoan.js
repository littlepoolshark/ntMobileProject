require("../../scss/page/ApplyToQuiteFromMoonLoan.scss");
import React from "react";
import classNames from "classnames";
let ApplyToQuiteFromMoonLoanAction=require("../actions/ApplyToQuiteFromMoonLoanAction.js");
let ApplyToQuiteFromMoonLoanStore=require("../stores/ApplyToQuiteFromMoonLoanStore.js");


import View from "../UIComponents/View";
import NavBar from "../UIComponents/NavBar";
import Container from "../UIComponents/Container";
import Group from "../UIComponents/Group";
import Button from "../UIComponents/Button";
import Grid from "../UIComponents/Grid";
import Col from "../UIComponents/Col";
import Modal from "../UIComponents/modal/Modal";
import Message from "../UIComponents/Message";


let QuitDatePicker=React.createClass({
    getInitialState(){
        let {
            selectedDate,
            dateList
            }=this.props;
        return {
            currDate:selectedDate || "",
            dateList:dateList || []
        }
    },
    _selectQuitDate(date){
      this.setState({
          currDate:date
      },() => {
          this.props.dateSelectHandler && this.props.dateSelectHandler(date);
      })
    },
    render(){
        let {
            currDate,
            dateList
            }=this.state;
        return (
            <div className="picker-container">
                <Grid wrap="wrap">
                    {
                        dateList.length ?
                        dateList.map((item,index) => {
                            let dateCellClassList=classNames({
                                "date-cell":true,
                                "active":item === currDate
                            });
                            return (
                                <Col cols={3} key={index + 1} onClick={this._selectQuitDate.bind(null,item)}>
                                    <div className={dateCellClassList}>{item}</div>
                                </Col>
                            )
                        }):
                        null
                    }
                </Grid>
            </div>
        )
    },
    componentWillReceiveProps(nextProps){
        if(nextProps.dateList.length){
            this.setState({
                currDate:nextProps.selectedDate,
                dateList:nextProps.dateList
            })
        }
    }
});

let ApplyToQuiteFromMoonLoan=React.createClass({
    getInitialState(){
        let {
            actionType
            }=this.props.location.query;
        return {
            data:ApplyToQuiteFromMoonLoanStore.getAll(),
            viewType:actionType === "firstApply" ? "pickDate" : "confirmToQuit",//视图的类型：pickDate->选择日期，confirmToQuit->确认修改预约
            isModalOpen:false,
            modalRole:"confirm",
            hintTextOfRequireFailed:"",
            modalType:"confirmToQuit"//modal的类型：confirmToQuit->询问用户是否真的要预约退出，confirmToCancelQuit->询问用户是否真的要取消当前的预约
        }
    },
    _handleQuitDateSelected(selectedDate){
        if(selectedDate){
            ApplyToQuiteFromMoonLoanAction.changeQuitDate(selectedDate);
        }
    },
    _handleNavBack(){
        this.context.router.goBack();
    },
    _toggleView(){
      this.setState({
          viewType:"pickDate"
      })
    },
    _renderButtons(actionType){
        if(actionType === "firstApply"){//预约退出
            return (
                <div className="btns-wrapper">
                    <Button amStyle="primary" block radius onClick={this._handleOpenConfirmToQuitModal}>确定预约</Button>
                </div>
            )
        }else if(actionType === "modifyApply"){//修改预约
            if(this.state.viewType === "pickDate"){
                return (
                    <div className="btns-wrapper">
                        <Button amStyle="primary" block radius onClick={this._handleOpenConfirmToQuitModal}>确定修改</Button>
                    </div>
                    )

            }else {
                return (
                    <Grid>
                        <Col cols={3}>
                            <Button amStyle="primary"  block radius onClick={this._handleModalOpen.bind(null,"confirmToCancelQuit")}>取消预约</Button>
                        </Col>
                        <Col cols={3}>
                            <Button amStyle="primary" block radius onClick={this._toggleView}>修改预约日期</Button>
                        </Col>
                    </Grid>
                )
            }

        }
    },
    _handleOpenConfirmToQuitModal(){
        if(this.state.data.selectedDate){
            this._handleModalOpen("confirmToQuit");
        }else {
            Message.broadcast("请选择预约日期！")
        }
    },
    _handleModalOpen(modalType){
        this.setState({
            isModalOpen:true,
            modalType:modalType,
            modalRole:"confirm"
        })
    },
    _handleModalClose(){
        this.setState({
            isModalOpen:false
        })
    },
    _jumpToNextLocation(confirm){
        let {
            modalType
            }=this.state;
        let actionType=this.props.location.query.actionType;
        if(confirm){
            if(modalType === "confirmToQuit"){//首次预约退出或者修改预约
                if(actionType === "firstApply"){
                    ApplyToQuiteFromMoonLoanAction.quitFromMoonLoan();
                }else {
                    ApplyToQuiteFromMoonLoanAction.modifyQuitFromMoonLoan();
                }
            }else if(modalType === "confirmToCancelQuit"){//取消预约退出
                ApplyToQuiteFromMoonLoanAction.cancelQuittingFromMoonLoan();
            }
        }else {
            this._handleModalClose();
        }

    },
    _renderModalInnerText(hintTextOfRequireFailed,modalRole,modalType,selectedDate){
        if(modalRole === "confirm"){
            return  modalType === "confirmToCancelQuit" ? "确定取消预约？" : "确定预约" + selectedDate + "日退出？";
        }else {
            return hintTextOfRequireFailed
        }
    },
    _showHintOfRequireFailed(hintText){
        this.setState({
            modalRole:"alert",
            isModalOpen:true,
            hintTextOfRequireFailed:hintText
        });
    },
    render(){
        let {
            actionType,
            title
            }=this.props.location.query;

        let {
            dateList,
            selectedDate
            }=this.state.data;

        let {
            viewType,
            modalType,
            isModalOpen,
            modalRole,
            hintTextOfRequireFailed
            }=this.state;

        let mapActionTypeToNavBarText={
            firstApply:"预约退出",
            modifyApply:"修改预约退出"
        };
        let backNav = {
            component:"a",
            icon: 'left-nav',
            title: '返回'
        };



        return (
            <View>
                <NavBar
                    title={mapActionTypeToNavBarText[actionType]}
                    leftNav={[backNav]}
                    amStyle="primary"
                    onAction={this._handleNavBack}
                />
                <Container id="applyToQuiteFromMoonLoan">
                    <Group>
                        {title}
                    </Group>
                    <Group noPadded={true}>
                        <h6 className="title">
                            {
                                viewType ==="confirmToQuit" && actionType === "modifyApply" ?
                                "您已选择预约退出日期"  :
                                "选择预约退出日期"
                            }
                        </h6>
                        {
                            viewType ==="confirmToQuit" && actionType === "modifyApply" ?
                            <div className="single-date-cell">{selectedDate}</div> :
                            <QuitDatePicker
                                selectedDate={selectedDate}
                                dateList={dateList}
                                dateSelectHandler={this._handleQuitDateSelected}
                            />
                        }
                    </Group>
                    {
                        this._renderButtons(actionType)
                    }
                    <section className="warm-hint">
                        每月还款日后一日到下一个还款日前三日(不包括)，可以
                        申请预约/修改退出本金，还息日以及还款日前三天(包括)，
                        为平台受理预约处理期，不可以预约或者修改申请退出本
                        金。申请退出的本金会在还款日后开始退出到个人账户。
                    </section>
                    <Modal
                        title=""
                        ref="modal"
                        isOpen={isModalOpen}
                        role={modalRole}
                        onAction={this._jumpToNextLocation}
                    >
                        { this._renderModalInnerText(hintTextOfRequireFailed, modalRole, modalType, selectedDate)}
                    </Modal>
                </Container>
            </View>

        )
    },
    componentDidMount(){
        let {
            productId,
            selectedDate
            }=this.props.location.query;
        ApplyToQuiteFromMoonLoanAction.getInitialData(productId,selectedDate || "");

        ApplyToQuiteFromMoonLoanStore.bind("change",function(){
            this.setState({
                data:ApplyToQuiteFromMoonLoanStore.getAll()
            })
        }.bind(this));

        ApplyToQuiteFromMoonLoanStore.bind("quitFromMoonLoanSuccess",function(){
            this.context.router.push({
                pathname:"quitFromMoonLoanSuccess",
                query:{
                    quitDate:ApplyToQuiteFromMoonLoanStore.getAll().selectedDate,
                    actionType:"firstApply"
                }
            })
        }.bind(this));

        ApplyToQuiteFromMoonLoanStore.bind("modifyQuitFromMoonLoanSuccess",function(){
            this.context.router.push({
                pathname:"quitFromMoonLoanSuccess",
                query:{
                    quitDate:ApplyToQuiteFromMoonLoanStore.getAll().selectedDate,
                    actionType:"modifyApply"
                }
            })
        }.bind(this));


        ApplyToQuiteFromMoonLoanStore.bind("cancelQuittingFromMoonLoanSuccess",function(){
            this.context.router.push({
                pathname:"moonLoanInvestmentRecord"
            })
        }.bind(this));

        ApplyToQuiteFromMoonLoanStore.bind("requestFailed",(msg) => {
            this._showHintOfRequireFailed(msg);
        });


    }
});

ApplyToQuiteFromMoonLoan.contextTypes = {
    router:React.PropTypes.object.isRequired
};

module.exports=ApplyToQuiteFromMoonLoan;
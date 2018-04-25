require("../../scss/page/MoonLoanIntroduction.scss");
let MoonLoanIntroductionAction=require("../actions/MoonLoanIntroductionAction.js");
let MoonLoanIntroductionStore=require("../stores/MoonLoanIntroductionStore.js");
import React from "react";
import classNames from "classnames";
import CSSCore from "../UIComponents/utils/CSSCore";

//ui component
import View from "../UIComponents/View";
import NavBar from "../UIComponents/NavBar";
import Container from "../UIComponents/Container";
import Tabs from "../UIComponents/Tabs";
import Group from "../UIComponents/Group";
import Grid from "../UIComponents/Grid";
import Col from "../UIComponents/Col";
import Modal from "../UIComponents/modal/Modal";
import Icon from "../UIComponents/Icon";
import SlideMask from "../UIComponents/SlideMask";
import Chart from "chart.js";

//utilities component
import Summary from "./utilities/Summary.js";
import InvestmentRecord from "./utilities/InvestmentRecord.js"
import PurchaseButton from "./utilities/PurchaseButton.js";
import ServiceAgreement from "./utilities/ServiceAgreement";
import ProductDescription from "./utilities/ProductDescription";
import RiskAnnounce from "./utilities/RiskAnnounce";
import FAQOfMoonLoan from "./utilities/FAQOfMoonLoan";

import config from "../config";
import cookie from "../lib/cookie";
import getParamObjFromUrl from "../lib/getParamObjFromUrl";

let MoonLoanProfitChart=React.createClass({
    getInitialState(){
        return {
            selectedBarIndex:-1
        }
    },
    generateOptionsBaseOnIndex(){//根据所选的柱子的索引值来更新柱子的颜色数组，从而更新柱状图
        const bgColor="rgba(245, 227, 194,1)";
        const hoverBgColor="rgba(226, 181, 105,1)";

        let {
            labels,
            data
            }=this.props;
        data=data.map(function(item,index){
            return item * 100;
        });
        let bgColorArr=[],hoverBgColorArr=[],labelLength=labels.length;
        for(let i=0;i<labelLength;i++){
            bgColorArr[i]=i <= this.state.selectedBarIndex ? hoverBgColor : bgColor;
            hoverBgColorArr[i]=hoverBgColor;
        }
        return {
            labels,
            data,
            bgColorArr,
            hoverBgColorArr
        }
    },
    initBarChart(){
        let {
            labels,
            data,
            bgColorArr,
            hoverBgColorArr
            }=this.generateOptionsBaseOnIndex();

        let ctx=document.getElementById("moonLoanProfitChart").getContext("2d");
        let _self=this;
        this.myBarChart=new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor:bgColorArr,
                    hoverBackgroundColor:hoverBgColorArr,
                    borderWidth: 0
                }]
            },
            options: {
                legend:{
                    display:false
                },
                scales: {
                    xAxes:[{
                        gridLines:{
                            display:false
                        },
                        barPercentage:0.97,//两个柱子之间的缝隙的宽度，就是靠这两个配置控制
                        categoryPercentage:1.0,//两个柱子之间的缝隙的宽度，就是靠这两个配置控制
                    }],
                    yAxes: [{
                        ticks:{
                            min:2,
                            max:12,
                            callback:function(value){
                                return value + "%"
                            }
                        }
                    }],
                },
                hover:{
                    onHover:function(event){
                        if(event.length){
                            _self.setState({
                                selectedBarIndex:event[0]._index
                            });
                        }

                    }
                },
                tooltips: {
                    enabled: false
                }
            }
        });
    },
    updateBarChart(){
        let {
            labels,
            data,
            bgColorArr,
            hoverBgColorArr
            }=this.generateOptionsBaseOnIndex();

        this.myBarChart.data.datasets[0].backgroundColor=bgColorArr;
        this.myBarChart.update();
    },
    _calculateProfit(){
        function _toFixedTwo(number){
            let number_str=""+number;
            let arr=[];
            let index=number_str.indexOf(".");
            if(index === -1){  //整数
                return parseFloat(number_str+".00");
            }else {
                arr=number_str.split(".");
                if(arr[1].length === 1){  //小数点后面有一位数字
                    return parseFloat([arr[0],arr[1]+"0"].join("."));
                }else if(arr[1].length === 2){ //小数点后面有两位数字
                    return parseFloat([arr[0],arr[1]].join("."));
                }else { //小数点后面大于两位数字
                    return parseFloat([arr[0],arr[1].substring(0,2)].join("."));
                }
            }};
        let totalProfit=0;
        const principal=10000;
        if(this.state.selectedBarIndex > -1){
            for(let i=0;i<=this.state.selectedBarIndex;i++){
                totalProfit += _toFixedTwo(this.props.data[i] * principal / 12)
            };
        }

        return _toFixedTwo(totalProfit);
    },
    render(){
        return (
            <div className="chart-wrapper" style={{margin:"0 0 0 -10px",paddingRight:"10px",position:"relative"}}>
                <div className="xAxe-unit" style={{fontSize:"10px",position:"absolute",right:"-10px",bottom:"2px"}}>(个月)</div>
                {
                    this.state.selectedBarIndex > -1 ?
                    <div className="content" style={{margin:"0 0 15px 11px"}}>投资一万元可获利{this._calculateProfit()}元</div> :
                    null
                }
                <canvas id="moonLoanProfitChart" ></canvas>
            </div>
        )
    },
    componentDidMount(){
       this.initBarChart();
    },
    componentDidUpdate(){
       this.updateBarChart();
    }
});


let MoonLoanIntroduction=React.createClass({
    getInitialState(){
        return {
            data:MoonLoanIntroductionStore.getAll(),
            isMaskOpen:false,
            maskType:"descriptionOfRepayEarly"
        }
    },
    _handleOnScroll(event){
        let container=document.getElementById("moonLoanIntroduction");
        let offsetHeight=container.offsetHeight;
        let scrollHeight=container.scrollHeight;
        let scrollTop=container.scrollTop;
        if(scrollTop > scrollHeight-offsetHeight-1){
            this.refs.detailModal.open();
        }
    },
    _handleModalClose(){
        this.refs.detailModal.close();
    },
    _handleModalOpen(){
        this.refs.detailModal.open();
    },
    _openSlideMark(maskType){
        this.setState({
            isMaskOpen:true,
            maskType:maskType
        });
    },
    _closeSlideMark(){
        this.setState({
            isMaskOpen:false
        });
    },
    _handleNavClick(e){
        let {
            productId,
            type,
            inviteCode
            }=getParamObjFromUrl();
        let currUrl=window.location.href;
        let hasShareMark=currUrl.indexOf("shareFromApp") > -1 || currUrl.indexOf("shareFromWeixin") > -1;
        let isLogin=!!cookie.getCookie("token");

        if(e.title === "分享"){
            if(isLogin){
                let phoneNo=cookie.getCookie("phoneNo");
                window.history.replaceState(null,"","#/moonLoanIntroduction?&productId=" + productId + "&type=" + type + "&inviteCode=" + phoneNo + "&shareFromWeixin=true");//在“?”后面加上了“&”，解决了wechat对分享链接插入参数而导致链接无法访问的问题
            }else {
                window.history.replaceState(null,"","#/moonLoanIntroduction?&productId=" + productId + "&type=" + type  + "&shareFromWeixin=true");//在“?”后面加上了“&”，解决了wechat对分享链接插入参数而导致链接无法访问的问题
            }
            this._openSlideMark("shareHint");
        }else if(e.title === "返回"){
            if(hasShareMark){
                this.context.router.push({
                    pathname:"home"
                })
            }else {
                this.context.router.goBack();
            }
        }
    },
    _renderMaskInner(maskType){
        if(maskType === "descriptionOfRepayEarly"){
            return (
                <div className="description-mask">
                    <div className="body">
                        <div className="title text-center">温馨提示</div>
                        <div className="content">
                            <p>1、该标的可能会提前还款</p>
                            <p>2、提前还款会根据提前还款期数发放补偿金</p>
                        </div>
                    </div>
                    <div className="footer"><Icon classPrefix="imgIcon" name="closeBtnInWrapper"/></div>
                </div>
            )

        }else if(maskType === "shareHint"){
            return (
                <img src={require("../../img/share-guide.png")} alt="" className="share-guide-img"/>
            )
        }else {
            return null
        }
    },
    render(){
        let productionType=this.props.location.query.type;
        let modalTitle=config.productNameMap[productionType];

        let {
            productName
            }=this.state.data;

        let backNav = {
            component:"a",
            icon: 'left-nav',
            title: '返回'
        };

        let rightNav = {
            component:"a",
            title: '分享'
        }

        let {
            repaymentLimit,
            publistTimeStr,
            preInterestDateStr,
            preRepayDateStr,
            rateList
            }=this.state.data;

        let chartLabels=[],chartData=[];
        if(rateList && rateList.length){
            for(let i=0;i<rateList.length;i++){
                chartLabels.push(rateList[i].period_no);
                chartData.push(rateList[i].rate);
            }
        }

        return (
            <View>
                <NavBar
                    title={productName}
                    leftNav={[backNav]}
                    rightNav={[rightNav]}
                    amStyle="primary"
                    onAction={this._handleNavClick}
                />
                <Container scrollable={false} style={{overflow:"scroll"}}  id="moonLoanIntroduction"   onScroll={this._handleOnScroll}>
                    <Summary  {...this.state.data} onQuestionMarkClick={this._openSlideMark} />
                    <Group id="productIntroduction" className="product-introduction" >
                        <Grid>
                            <Col cols="2" className="text-center">
                                <div className="img-wrapper shengxi"></div>
                                <div className="subtitle">逐月升息</div>
                            </Col>
                            <Col cols="2" className="text-center">
                                <div className="img-wrapper jiexi"></div>
                                <div className="subtitle">按月结息</div>
                            </Col>
                            <Col cols="2" className="text-center">
                                <div className="img-wrapper ketui"></div>
                                <div className="subtitle">每月可退</div>
                            </Col>
                        </Grid>
                        <section>
                            <h6><span className="title-flag"></span>收益计算</h6>
                            <div className="label">持有1个月即可退出，持有时间越长利息越高</div>
                            {
                                rateList && rateList.length ?
                                <MoonLoanProfitChart labels={chartLabels} data={chartData}/>  :
                                null
                            }
                        </section>
                    </Group>
                    <Group>
                        <h6><span className="title-flag"></span>赎回说明</h6>
                        <div className="label">
                            持有期最短为一个月，并且整月整月增加，投资人可以持有项目到期后退出，亦可在每月申请预约退出期申请提前退出本金，预约退出等待期正常计息。
                        </div>
                        <div className="process-chart-wrapper">
                            <img src={require("../../img/process-chart.png")} alt="" className="responsive-img"/>
                        </div>
                        <div className="content">
                            每月还款日后一日到下一个还款日前三日(不包括)为预约退出窗口期，可以申请预约退出本金，还款日以及还款日前三天(包括)，为平台受理预约处理期，不可以预约或者修改申请退出本金。申请退出的本金会在还款日后开始退出到个人账户。
                        </div>
                    </Group>
                    <div  className="checkLoanDetail"  id="checkMoreDetail" onClick={this._handleModalOpen}>
                        <span className="imgIcon imgIcon-slide-up"></span>滑动或者点击查看详情
                    </div>
                    <PurchaseButton  {...this.state.data} {...this.props}/>
                    <Modal
                        title={modalTitle + "详情"}
                        ref="detailModal"
                        isOpen={false}
                        role="popup"
                        onDismiss={this._handleModalClose}
                    >
                        <Tabs defaultActiveKey={0} >

                            <Tabs.Item
                                title="项目介绍"
                                key={0}
                                navStyle={null}
                            >
                                <ProductDescription {...this.state.data}/>
                                <ServiceAgreement {...this.state.data}/>
                                <RiskAnnounce />
                            </Tabs.Item>

                            <Tabs.Item
                                title="投资记录"
                                key={1}
                                navStyle={null}
                            >
                                <InvestmentRecord {...this.state.data} />
                            </Tabs.Item>

                            <Tabs.Item
                                title="常见问题"
                                key={2}
                                navStyle={null}
                            >
                                <FAQOfMoonLoan/>
                            </Tabs.Item>

                        </Tabs>
                    </Modal>
                    <SlideMask isMaskOpen={this.state.isMaskOpen}>
                        {
                            this._renderMaskInner(this.state.maskType)
                        }
                    </SlideMask>
                </Container>
            </View>
        )
    },
    componentDidMount(){
        let id=this.props.location.query.productId;
        MoonLoanIntroductionAction.getDataFromServer(id);

        MoonLoanIntroductionStore.bind("change",function(){
            this.setState(MoonLoanIntroductionStore.getAll()) ;
        }.bind(this));

        //支持滑动查看标的详情的交互方式
        let checkMoreDetail=document.getElementById("checkMoreDetail");
        let productIntroduction=document.getElementById("productIntroduction");
        let container=document.getElementById("moonLoanIntroduction");
        if(container.scrollHeight <= container.offsetHeight){
            let paddingBottom=(container.scrollHeight  + 44) - (productIntroduction.offsetTop  + productIntroduction.offsetHeight + checkMoreDetail.offsetHeight + 15);
            checkMoreDetail.style.paddingBottom=paddingBottom + 30 + "px";//通过填充30px，撑开容器的垂直高度，使之出现滚动条
        }
    },
    componentWillUnmount(){
        MoonLoanIntroductionStore.clearAll();
    }
});

MoonLoanIntroduction.contextTypes = {
    router:React.PropTypes.object.isRequired
};

module.exports=MoonLoanIntroduction;
require("../../scss/page/MoreProductList.scss");
let MoreProductListAction=require("../actions/MoreProductListAction.js");
let MoreProductListStore=require("../stores/MoreProductListStore.js");
import React from "react";

//ui component
import Container from "../UIComponents/Container";
import Tabs from "../UIComponents/Tabs";
import Loader from "../UIComponents/Loader";
import CSSCore from "../UIComponents/utils/CSSCore";

//utilites component
import ProductListCommonCard from "./utilities/ProductListCommonCard";



//更多投资列表页：MoreProductList component

let MoreProductList=React.createClass({
    getInitialState(){
        return MoreProductListStore.getAll();
    },
    _loadMoreData(event){
        //由于event.stopPropagation方法不生效（听说这是reactjs自己的问题），
        // 所以采用这种探测的方式来达到阻止tabNav滚动事件的冒泡的效果。
        if(event.target.id !== "moreProductList") return ;

        //通过userAgent的探测来判断客户端是IOS还是Android,以便让步解决在IOS手机下面fixed特性所产生的诡异现象
        /*if(!!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){
            document.querySelector(".tabs").style.paddingTop=0;
            document.querySelector(".tabs-nav").style.position="relative";
        }*/

        let moreProductList=document.getElementById("moreProductList");
        let offsetHeight=moreProductList.offsetHeight;//元素出现在视口中区域的高度
        let scrollTop=moreProductList.scrollTop;//元素已经滚动的距离
        let scrollHeight=moreProductList.scrollHeight;//元素总的内容高度

        let tabsBody=document.getElementsByClassName("tabs-body")[0];
        let activeTabPanel=tabsBody.getElementsByClassName("active")[0];
        let currListType=activeTabPanel.getAttribute("data-type");

        if(scrollHeight - offsetHeight - scrollTop <= 3){
            MoreProductListAction.getNextPage(currListType);
            Loader.show();
        }
    },
    render(){
        let {
            moonList,
            richList,
            fixedLoanList,
            creditorLoanList,
            earnSetList,
            gljList,
            cedList,
            nydList
            }=this.state;

    let defaultActiveKey =
      this.props.location.query.showTabName === 'creditorLoan' ? 3 : 0;
    return (
      <Container
        scrollable={true}
        id="moreProductList"
        onScroll={this._loadMoreData}
      >
        <Tabs defaultActiveKey={defaultActiveKey} isTabNavScrollable={true}>
          {/* <Tabs.Item
                        title="月满盈"
                        key={0}
                        navStyle={null}
                        id="moonTab"
                        data-type="moon"
                    >
                        {
                            moonList.map(function(item,index){
                                return <ProductListCommonCard {...item} key={item.type+item.id}/>
                            })
                        }
                    </Tabs.Item>
                    <Tabs.Item
                        title="丰收盈"
                        key={1}
                        navStyle={null}
                        id="ricTab"
                        data-type="rich"
                    >
                        {
                            richList.map(function(item,index){
                                return <ProductListCommonCard {...item} key={item.type+item.id}/>
                            })
                        }
                    </Tabs.Item> */}
          <Tabs.Item
            title="好采投"
            key={2}
            navStyle={null}
            id="fixedLoanTab"
            data-type="fixedLoan"
          >
            {fixedLoanList.map(function(item, index) {
              return (
                <ProductListCommonCard {...item} key={item.type + item.id} />
              );
            })}
          </Tabs.Item>
          <Tabs.Item title="车e贷" key={3} navStyle={null} data-type="ced">
            {cedList.map(function(item, index) {
              return <ProductListCommonCard {...item} key={'ced' + item.id} />;
            })}
          </Tabs.Item>
          <Tabs.Item title="果乐金" key={4} navStyle={null} data-type="glj">
            {gljList.map(function(item, index) {
              return (
                <ProductListCommonCard {...item} key={item.type + item.id} />
              );
            })}
          </Tabs.Item>
          <Tabs.Item title="农易贷" key={5} navStyle={null} data-type="nyd">
            {nydList.map(function(item, index) {
              return (
                <ProductListCommonCard {...item} key={item.type + item.id} />
              );
            })}
          </Tabs.Item>
          <Tabs.Item
            title="债权转让"
            key={6}
            navStyle={null}
            data-type="creditorLoan"
          >
            {creditorLoanList.map(function(item, index) {
              return (
                <ProductListCommonCard {...item} key={item.type + item.id} />
              );
            })}
          </Tabs.Item>
          <Tabs.Item title="新手标" key={7} navStyle={null} data-type="earnSet">
            {earnSetList.map(function(item, index) {
              return (
                <ProductListCommonCard
                  {...item}
                  key={item.type + item.id}
                  showTitleForTTZOrNewbieLoan={true}
                />
              );
            })}
          </Tabs.Item>
        </Tabs>
        <Loader amStyle="primary" rounded={true} />
      </Container>
    );
  },
  componentDidMount() {
    MoreProductListAction.getInitialData();

        MoreProductListStore.bind("change",function(){
            this.setState(MoreProductListStore.getAll())
        }.bind(this));

    },
    componentDidUpdate(){
        Loader.hide();
    },
    componentWillUnmount(){
        MoreProductListStore.unbind("change");
        MoreProductListStore.clearAll();
    }
});

module.exports=MoreProductList;
var MicroEvent = require('../lib/microevent.js');
var appDispatcher=require('../dispatcher/dispatcher.js');
var ajax=require("../lib/ajax.js");

import config from "../config";

var MoreProductListStore={
    _all:{
        moonList:[],//月满盈列表
        richList:[],//丰收盈列表
        fixedLoanList:[],//好彩头列表
        creditorLoanList:[],//债权转让列表
        earnSetList:[],//赚系列标的列表(也叫投资计划)
        gljList:[],//果乐金列表
        cedList:[],//车e贷列表
        nydList:[],//农易贷列表
        moonPageIndex:0,
        richPageIndex:0,
        fixedLoanPageIndex:0,
        creditorLoanPageIndex:0,
        earnSetPageIndex:0,
        gljPageIndex:0,
        cedPageIndex:0,
        nydPageIndex:0
    },
    getAll(){
        return {
            moonList:this._all.moonList,
            richList:this._all.richList,
            fixedLoanList:this._all.fixedLoanList,
            creditorLoanList:this._all.creditorLoanList,
            earnSetList:this._all.earnSetList,
            gljList:this._all.gljList,
            cedList:this._all.cedList,
            nydList:this._all.nydList
        };
    },
    clearAll(){
        this._all={
            moonList:[],
            richList:[],
            fixedLoanList:[],
            creditorLoanList:[],
            earnSetList:[],
            gljList:[],
            cedList:[],
            nydList:[],
            moonPageIndex:0,
            richPageIndex:0,
            fixedLoanPageIndex:0,
            creditorLoanPageIndex:0,
            earnSetPageIndex:0,
            gljPageIndex:0,
            cedPageIndex:0,
            nydPageIndex:0
        };
    },
    getCurrPageIndex(listType){
        switch (listType){
            case "moon":
                return this._all.moonPageIndex;
            case "rich":
                return this._all.richPageIndex;
            case "fixedLoan":
                return this._all.fixedLoanPageIndex;
            case "creditorLoan":
                return this._all.creditorLoanPageIndex;
            case "earnSet":
                return this._all.earnSetPageIndex;
            case "glj":
                return this._all.gljPageIndex;
            case "ced":
                return this._all.cedPageIndex;
            case "nyd":
                return this._all.nydPageIndex
            default:
                break;
        }
    },
    updateAll(source){
        if(source.moonList){
            this._all.moonList=this._all.moonList.concat(source.moonList);
            this._all.moonPageIndex=source.moonPageIndex;
        }
        if(source.richList){
            this._all.richList=this._all.richList.concat(source.richList);
            this._all.richPageIndex=source.richPageIndex;
        }
        if(source.fixedLoanList){
            this._all.fixedLoanList=this._all.fixedLoanList.concat(source.fixedLoanList);
            this._all.fixedLoanPageIndex=source.fixedLoanPageIndex;
        }
        if(source.creditorLoanList){
            this._all.creditorLoanList=this._all.creditorLoanList.concat(source.creditorLoanList);
            this._all.creditorLoanPageIndex=source.creditorLoanPageIndex;
        }
        if(source.earnSetList){
            this._all.earnSetList=this._all.earnSetList.concat(source.earnSetList);
            this._all.earnSetPageIndex=source.earnSetPageIndex;
        }
        if(source.gljList){
            this._all.gljList=this._all.gljList.concat(source.gljList);
            this._all.gljPageIndex=source.gljPageIndex;
        }
        if(source.cedList){
            this._all.cedList=this._all.cedList.concat(source.cedList);
            this._all.cedPageIndex=source.cedPageIndex;
        }
        if(source.nydList){
            this._all.nydList=this._all.nydList.concat(source.nydList);
            this._all.nydPageIndex=source.nydPageIndex;
        }
    }
};
MicroEvent.mixin(MoreProductListStore);


appDispatcher.register(function(payload){
    switch(payload.actionName){
        case "moreProductList_getFirstPage":
            //获取月满盈列表第一页
            ajax({
                ciUrl:"/forever/v2/listAll.do",
                data:{
                    type:"moon"
                },
                success(rs){
                    if(rs.code === 0){
                        MoreProductListStore.updateAll({
                            moonList:rs.data.list,
                            moonPageIndex:rs.data.pageIndex
                        });
                        MoreProductListStore.trigger("change");
                    }
                }
            });

            //获取丰收盈列表第一页
            ajax({
                ciUrl:"/forever/v2/listAll.do",
                data:{
                    type:"rich"
                },
                success(rs){
                    if(rs.code === 0){
                        MoreProductListStore.updateAll({
                            richList:rs.data.list,
                            richPageIndex:rs.data.pageIndex
                        });
                        MoreProductListStore.trigger("change");
                    }
                }
            });

            //获取好采投列表第一页
            ajax({
                ciUrl:"/platinfo/v2/investmentList",
                success(rs){
                    if(rs.code === 0){
                        MoreProductListStore.updateAll({
                            fixedLoanList:rs.data.list,
                            fixedLoanPageIndex:rs.data.pageIndex
                        });
                        MoreProductListStore.trigger("change");
                    }
                }
            });

            //获取债权转让列表第一页
            ajax({
                ciUrl:"/invest/v2/creditorTransferList",
                success(rs){
                    if(rs.code === 0){
                        MoreProductListStore.updateAll({
                            creditorLoanList:rs.data.list,
                            creditorLoanPageIndex:rs.data.pageIndex
                        });
                        MoreProductListStore.trigger("change");
                    }
                }
            });

            //获取投资计划列表（没有分页）
            ajax({
                ciUrl:"/platinfo/v2/financePlan",
                success(rs){
                     if(rs.code === 0){
                         MoreProductListStore.updateAll({
                            earnSetList:rs.data.lcjh
                         });
                         MoreProductListStore.trigger("change");
                     }
                 }
             });

             //获取果乐金列表的第一页
             ajax({
                ciUrl:"/platinfo/v2/investmentList",
                data:{
                    productType:'glj'
                },
                success(rs){
                    if(rs.code === 0){
                        MoreProductListStore.updateAll({
                            gljList:rs.data.list,
                            gljPageIndex:rs.data.pageIndex
                        });
                        MoreProductListStore.trigger("change");
                    }
                }
            });

            //获取车e贷列表的第一页
            ajax({
                ciUrl:"/platinfo/v2/investmentList",
                data:{
                    productType:'ced'
                },
                success(rs){
                    if(rs.code === 0){
                        MoreProductListStore.updateAll({
                            cedList:rs.data.list,
                            cedPageIndex:rs.data.pageIndex
                        });
                        MoreProductListStore.trigger("change");
                    }
                }
            });

            //获取农易贷列表的第一页
            ajax({
                ciUrl:"/platinfo/v2/investmentList",
                data:{
                    productType:'nyd'
                },
                success(rs){
                    if(rs.code === 0){
                        MoreProductListStore.updateAll({
                            nydList:rs.data.list,
                            nydPageIndex:rs.data.pageIndex
                        });
                        MoreProductListStore.trigger("change");
                    }
                }
            });

            break;
        case "moreProductList_getNextPage":
            let currListType=payload.data.currListType;
            let requestPageIndex=MoreProductListStore.getCurrPageIndex(currListType) +1;

            if( currListType=== "moon"){//月满盈的下一页
                ajax({
                    ciUrl:"/forever/v2/listAll.do",
                    data:{
                        reqPageNum:requestPageIndex,
                        type:"moon"
                    },
                    success(rs){
                        if(rs.code === 0){
                            MoreProductListStore.updateAll({
                                moonList:rs.data.list,
                                moonPageIndex:rs.data.pageIndex
                            });
                            MoreProductListStore.trigger("change");
                        }
                    }
                });
            }else if( currListType=== "rich"){//丰收盈的下一页
                ajax({
                    ciUrl:"/forever/v2/listAll.do",
                    data:{
                        reqPageNum:requestPageIndex,
                        type:"rich"
                    },
                    success(rs){
                        if(rs.code === 0){
                            MoreProductListStore.updateAll({
                                richList:rs.data.list,
                                richPageIndex:rs.data.pageIndex
                            });
                            MoreProductListStore.trigger("change");
                        }
                    }
                });
            }else if( currListType=== "fixedLoan"){//好采投的下一页
                ajax({
                    ciUrl:"/platinfo/v2/investmentList",
                    data:{
                        reqPageNum:requestPageIndex
                    },
                    success(rs){
                        if(rs.code === 0){
                            MoreProductListStore.updateAll({
                                fixedLoanList:rs.data.list,
                                fixedLoanPageIndex:rs.data.pageIndex
                            });
                            MoreProductListStore.trigger("change");
                        }
                    }
                });
            }else if(currListType === "creditorLoan"){//债权转让的下一页
                ajax({
                    ciUrl:"/invest/v2/creditorTransferList",
                    data:{
                        reqPageNum:requestPageIndex
                    },
                    success(rs){
                        if(rs.code === 0){
                            MoreProductListStore.updateAll({
                                creditorLoanList:rs.data.list,
                                creditorLoanPageIndex:rs.data.pageIndex
                            });
                            MoreProductListStore.trigger("change");
                        }
                    }
                });
            }else if(currListType === "earnSet"){//投资计划的下一页(Oops,投资计划暂时没有分页)
                return ;
                /*ajax({
                    ciUrl:"/platinfo/v2/financePlan",
                    data:{
                        reqPageNum:requestPageIndex
                    },
                    success(rs){
                        if(rs.code === 0){
                            MoreProductListStore.updateAll({
                                earnSetList:rs.data.lcjh,
                                earnSetPageIndex:rs.data.pageIndex
                            });
                            MoreProductListStore.trigger("change");
                        }
                    }
                });*/
            }else if(currListType === "glj"){
                ajax({
                    ciUrl:"/platinfo/v2/investmentList",
                    data:{
                        productType:'glj',
                        reqPageNum:requestPageIndex
                    },
                    success(rs){
                        if(rs.code === 0){
                            MoreProductListStore.updateAll({
                                gljList:rs.data.list,
                                gljPageIndex:rs.data.pageIndex
                            });
                            MoreProductListStore.trigger("change");
                        }
                    }
                });
            }else if(currListType === "ced"){
                ajax({
                    ciUrl:"/platinfo/v2/investmentList",
                    data:{
                        productType:'ced',
                        reqPageNum:requestPageIndex
                    },
                    success(rs){
                        if(rs.code === 0){
                            MoreProductListStore.updateAll({
                                cedList:rs.data.list,
                                cedPageIndex:rs.data.pageIndex
                            });
                            MoreProductListStore.trigger("change");
                        }
                    }
                });
            }else if(currListType === "nyd"){
                ajax({
                    ciUrl:"/platinfo/v2/investmentList",
                    data:{
                        productType:'nyd',
                        reqPageNum:requestPageIndex
                    },
                    success(rs){
                        if(rs.code === 0){
                            MoreProductListStore.updateAll({
                                nydList:rs.data.list,
                                nydPageIndex:rs.data.pageIndex
                            });
                            MoreProductListStore.trigger("change");
                        }
                    }
                });
            }

            break;
        default:
        //no op
    }
});

module.exports=MoreProductListStore;